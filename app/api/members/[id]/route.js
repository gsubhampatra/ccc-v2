import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const member = await prisma.member.findUnique({
      where: { id: id },
      include: { projects: true },
    });
    if (member) {
      return NextResponse.json({ success: true, member });
    } else {
      return NextResponse.json(
        { success: false, error: "Member not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch member" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const { id } = await params;

    const updatedMember = await prisma.member.update({
      where: { id: id },
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
      message: "Member updated successfully",
      member: updatedMember,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to update member" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await prisma.member.delete({
      where: { id: params.id },
    });
    return NextResponse.json({
      success: true,
      message: "Member deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to delete member" },
      { status: 500 }
    );
  }
}
