import { NextResponse,NextRequest } from "next/server";
import initializeDatabase from "@/dbConfig/dbConfig";
import {Post} from "@/utils/DBModel";

// GET all posts
export async function GET(req: NextRequest) {
  try {
    await initializeDatabase();
    
    // Optional: Filter for featured posts if ?featured=true is in URL
    const { searchParams } = new URL(req.url);
    const featured = searchParams.get("featured");
    
    const query = featured === "true" ? { featured: true } : {};
    
    const posts = await Post.find(query).sort({ date: -1 }); // Sort by newest date
    return NextResponse.json(posts);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST a new blog entry
export async function POST(req: NextRequest) {
  try {
    await initializeDatabase();
    const body = await req.json();

    // Logic: If readTime isn't provided, you could calculate it here 
    // based on body.content length (approx 200 words per minute)
    if (!body.readTime && body.content) {
      body.readTime = Math.ceil(body.content.split(/\s+/).length / 200);
    }

    const newPost = await Post.create(body);
    return NextResponse.json(newPost, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}