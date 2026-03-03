import initializeDatabase from "@/dbConfig/dbConfig";
import User from "@/utils/User";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest ) {
try {
    const { username,
        email, password,phonenumber } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }
     if (!username || !phonenumber) {
      return NextResponse.json(
        { error: "username and phonenumber are required" },
        { status: 400 }
      );
    }

    await initializeDatabase();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }
   
 const passwordHash=await bcrypt.hash(password, 10);
    await User.create({
     username,
      email,
      passwordHash,
      phonenumber
    });

    return NextResponse.json(
      { message: "User registered successfully"+passwordHash },
      { status: 201 }
    );
  } catch (error) 
  {
  
    return NextResponse.json(
      { error: error},
      { status: 500 }
    );
  }
}
   