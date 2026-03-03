import { NextRequest, NextResponse } from "next/server";
import initializeDatabase from "@/dbConfig/dbConfig";
import {Program} from "@/utils/DBModel";

type Params = { params: { id: string } };

// GET by ID
export async function GET(req: NextRequest, { params }: Params) {
  try {
    await initializeDatabase();
    const program = await Program.findById(params.id);
    if (!program) return NextResponse.json({ error: "Not Found" }, { status: 404 });
    return NextResponse.json(program);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT update by ID
export async function PUT(req: NextRequest, { params }: Params) {
  try {
    await initializeDatabase();
    const body = await req.json();
    const updated = await Program.findByIdAndUpdate(params.id, body, { new: true });
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// DELETE by ID
export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    await initializeDatabase();
    await Program.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}