import { NextResponse, NextRequest } from "next/server";
import initializeDatabase from "@/dbConfig/dbConfig";
import { Enrollment } from "@/utils/DBModel";

export async function GET(
  req: NextRequest,
  { params }: { params:  Promise<{userId: string}> }
) {
  try {
    await initializeDatabase();
    
    const { userId } = await params;

    // Find all enrollment records matching this specific user
    const userEnrollments = await Enrollment.find({ userId })
      .sort({ createdAt: -1 });

    return NextResponse.json(userEnrollments, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}