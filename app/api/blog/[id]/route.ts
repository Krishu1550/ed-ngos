import { NextRequest, NextResponse } from "next/server";


import initializeDatabase from "@/dbConfig/dbConfig";
import {Post} from "@/utils/DBModel"; // Adjust the import path as needed

type Params = { params:  Promise<{ id: string }>  };

// GET single post
export async function GET(req: NextRequest, { params }: Params) {
  try {
    await initializeDatabase();
    const {id}= await params
    const post = await Post.findById();
    
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    
    return NextResponse.json(post);
  } catch (error: any) {
    return NextResponse.json({ error: "Invalid ID or Server Error" }, { status: 500 });
  }
}

// PUT update post
export async function PUT(req: NextRequest, { params }: Params) {
  try {
    await initializeDatabase();
    const body = await req.json();
    
    const updatedPost = await Post.findByIdAndUpdate(params.id, body, { 
      new: true, 
      runValidators: true 
    });

    if (!updatedPost) return NextResponse.json({ error: "Post not found" }, { status: 404 });
    return NextResponse.json(updatedPost);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// DELETE post
export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    await initializeDatabase();
    const deletedPost = await Post.findByIdAndDelete(params.id);
    
    if (!deletedPost) return NextResponse.json({ error: "Post not found" }, { status: 404 });
    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}