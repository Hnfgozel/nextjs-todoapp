import { connectToDB } from '@/utils/database';
import User from '@/models/user';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    console.log("Connecting to database...");
    await connectToDB();
    console.log("Database connected.");

    const { email, password, username } = await req.json();
    console.log("Received data:", { email, password, username });

    if (!email || !password || !username) {
      console.error("Missing required fields:", { email, password, username });
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.error("User already exists with email:", email);
      return NextResponse.json({ message: 'Email already exists' }, { status: 400 });
    }

    console.log("Hashing password...");
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      username,
      password: hashedPassword,
    });

    console.log("Saving new user...");
    await newUser.save();
    console.log("User saved successfully.");

    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });

  } catch (error) {
    console.error("Error in signup API:", error);
    let errorMessage = 'Internal server error';
    if (error.name === 'ValidationError') {
      errorMessage = Object.values(error.errors).map((err) => err.message).join(', ');
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
