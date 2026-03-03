import { NextRequest, NextResponse } from "next/server";
import initializeDatabase from "@/dbConfig/dbConfig";
import {Profile} from "@/utils/DBModel";

export async function GET() {
  try {
    await initializeDatabase();
    // Fetching only public profiles for the list
    const profiles = await Profile.find({ is_public: true }).sort({ createdAt: -1 });
    return NextResponse.json(profiles);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await initializeDatabase();
    const body = await req.json();
    console.log("Body"+ JSON.stringify( body))
    if(!body)
    {
        return NextResponse.json({error:"There is No Body"},{status:400});

    }
    const newProfile = await Profile.create(body);
    console.log(newProfile)
    return NextResponse.json(newProfile, { status: 201 });
  } catch (error: any) {
    console.log( error.message );
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}