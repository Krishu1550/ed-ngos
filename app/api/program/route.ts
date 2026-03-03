import { NextResponse,NextRequest } from "next/server";
import initializeDatabase from "@/dbConfig/dbConfig";
import {Program} from "@/utils/DBModel";

// GET all programs
export async function GET() {
  try {
    await initializeDatabase();
    const programs = await Program.find({}).sort({ createdAt: -1 });
    return NextResponse.json(programs);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST create a program
export async function POST(req: NextRequest) {
  try {
    await initializeDatabase();
    const body = await req.json();
    const newProgram = await Program.create(body);
    return NextResponse.json(newProgram, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}