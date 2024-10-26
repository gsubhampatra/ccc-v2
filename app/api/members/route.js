import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const members = await prisma.member.findMany({
      include: { projects: true },
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
    // Extract github username from URL if present
    const githubUsername = data.github ? data.github.split("/").pop() : "";

    // Set profile photo URL using github username if available
    if (githubUsername) {
      data.profilePhoto = `https://avatars.githubusercontent.com/${githubUsername}`;
    }
    const member = await prisma.member.create({
      data: {
        name: data.name,
        bio: data.bio,
        linkedin: data.linkedin,
        github: data.github,
        profilePhoto: data.profilePhoto,
        type: data.type,
        batch: data.batch,
        domain: data.domain,
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
