import { NextResponse, NextRequest } from "next/server";
import initializeDatabase from "@/dbConfig/dbConfig";
import { Program } from "@/utils/DBModel";
import { Enrollment } from "@/utils/DBModel"; // Create this model

export async function POST(req: NextRequest) {
  try {
    await initializeDatabase();
    const { programId, userId, userName, programTitle } = await req.json();
    console.log("EnrollmentPost: "+programId+" : "+userId+ " : "+userName+" : "+programTitle)

    // 1. Prevent double enrollment
    const existing = await Enrollment.findOne({ userId, programId });
    if (existing) {
      return NextResponse.json({ error: "Already enrolled in this program" }, { status: 400 });
    }
      if (!programId) {
       return NextResponse.json({ error: "programId is missing in request" }, { status: 400 });
    }

    // 2. Atomically find program and check seats
    const program = await Program.findOne({_id:programId});
    console.log(program);

    if (!program || program.enrolled >= program.seats) {
      return NextResponse.json({ error: "Program is full or does not exist" }, { status: 400 });
    }
  

    // 3. Create the enrollment record
    const newEnrollment = await Enrollment.create({
      userId,
      programId,
      userName,
      programTitle
    });

    // 4. Increment the enrollment count on the Program
    await Program.findByIdAndUpdate(programId, { $inc: { enrolled: 1 } });

    return NextResponse.json(newEnrollment, { status: 201 });
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {

  try 
  {
    await initializeDatabase();
    const enrollments = await Enrollment.find({}).sort({ createdAt: -1 });
    console.log(enrollments)
    return NextResponse.json(enrollments);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

}

export async function DELETE(req: NextRequest) {
  try {
    await initializeDatabase();
    
    // Get IDs from the URL (e.g., /api/enrollment?id=123&programId=456)
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const programId = searchParams.get('programId');

    if (!id || !programId) {
      return NextResponse.json({ error: "Missing required IDs" }, { status: 400 });
    }

    // 1. Delete the enrollment record
    const deletedEnrollment = await Enrollment.findByIdAndDelete(id);

    if (!deletedEnrollment) {
      return NextResponse.json({ error: "Enrollment not found" }, { status: 404 });
    }

    // 2. Decrement the enrolled count in the Program model
    // This ensures that deleting an enrollment frees up a seat!
    await Program.findByIdAndUpdate(programId, { 
      $inc: { enrolled: -1 } 
    });

    return NextResponse.json({ message: "Enrollment deleted and seat freed." });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}