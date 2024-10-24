import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const members = await prisma.member.findMany({
      include: { projects: true }
    });
    return NextResponse.json({ success: true, members });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch members" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const member = await prisma.member.create({
      data: {
        name: data.name,
        bio: data.bio,
        linkedin: data.linkedin,
        github: data.github,
        profilePhoto: data.profilePhoto,
        type: data.type,
        batch: data.batch,
        designation: data.designation,
      },
    });
    return NextResponse.json({
      success: true,
      message: "Member created successfully",
      member,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create member" },
      { status: 500 }
    );
  }
}
