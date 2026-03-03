import { NextRequest, NextResponse } from "next/server";


import initializeDatabase from "@/dbConfig/dbConfig";
import {Profile} from "@/utils/DBModel";
import mongoose from "mongoose";

type Params = { params: Promise<{ id: string }> };

export async function GET(req: NextRequest, { params }: Params) {
  try {
    await initializeDatabase();
    const { id } = await params;
    console.log("ID: "+id);
    // Determine if we are searching by ID or Slug
    const query = mongoose.Types.ObjectId.isValid(id)
      ? { _id: id }
      : { slug: id };

    const profile = await Profile.findOne(query);
    
    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }
    
    return NextResponse.json(profile);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    await initializeDatabase();
    const body = await req.json();
    const {id}= await params
    
    // We update by ID for precision
    const updated = await Profile.findByIdAndUpdate(id, body, { 
      new: true, 
      runValidators: true 
    });

    if (!updated) return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    await initializeDatabase();
    const {id}= await params
    const deleted = await Profile.findByIdAndDelete(id);
    
    if (!deleted) return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    return NextResponse.json({ message: "Profile deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}