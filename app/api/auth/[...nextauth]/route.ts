import NextAuth from "next-auth/next";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import bcrypt from "bcrypt";

const clientId = process.env.GOOGLE_ID!;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET!;

const handler = NextAuth({
    providers: [
        Google({
            clientId: clientId,
            clientSecret: clientSecret,
        }),
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                await connectToDB();
                
                const user = await User.findOne({ email: credentials?.email });
                if (!user) {
                    throw new Error("No user found with the given email");
                }

                const isPasswordValid = await bcrypt.compare(credentials?.password, user.password);
                if (!isPasswordValid) {
                    throw new Error("Invalid password");
                }

                return { id: user._id, name: user.username, email: user.email };
            },
        }),
    ],
    callbacks: {
        async session({ session }) {
            if (!session || !session.user) {
                return session;
            }

            const sessionUser = await User.findOne({ email: session.user.email });

            if (!sessionUser) {
                return session;
            }

            return {
                ...session,
                user: {
                    ...session.user,
                    id: sessionUser._id.toString(),
                },
                expires: new Date().toISOString(),
            };
        },
        async signIn({ profile }) {
            try {
                await connectToDB();

                if (profile && profile.email) {
                    const userExists = await User.findOne({ email: profile.email });

                    if (!userExists && profile.name) {
                        await User.create({
                            email: profile.email,
                            username: profile.name.replace(" ", "").toLowerCase(),
                        });
                    }
                }

                return true;
            } catch (error) {
                console.log("Error checking if user exists: ", error instanceof Error ? error.message : error);
                return false;
            }
        },
    },
    pages: {
        signIn: '/auth/login', // Path to your login page
    },
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
