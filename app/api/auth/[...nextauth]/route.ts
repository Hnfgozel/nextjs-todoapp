import NextAuth from "next-auth/next";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { Session } from "next-auth";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";


const clientId = process.env.GOOGLE_ID!;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET!;

interface UserSession {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
    id: string;
}

const handler = NextAuth({
    providers: [
        Google({
            clientId: clientId,
            clientSecret: clientSecret,
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
    }
});

export { handler as GET, handler as POST };
