import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request, { params }) {
  try {
    const achievement = await prisma.achievement.findUnique({
      where: { id: params.id },
    });
    if (achievement) {
      return NextResponse.json({ success: true, achievement });
    } else {
      return NextResponse.json(
        { success: false, error: "Achievement not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch achievement" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const updatedAchievement = await prisma.achievement.update({
      where: { id: params.id },
      data: {
        title: data.title,
        description: data.description,
        date: new Date(data.date),
        imageUrl: data.imageUrl,
      },
    });
    return NextResponse.json({
      success: true,
      message: "Achievement updated successfully",
      achievement: updatedAchievement,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to update achievement" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await prisma.achievement.delete({
      where: { id: params.id },
    });
    return NextResponse.json({
      success: true,
      message: "Achievement deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to delete achievement" },
      { status: 500 }
    );
  }
}
