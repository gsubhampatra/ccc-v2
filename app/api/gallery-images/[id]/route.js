import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request, { params }) {
  try {
    const galleryImage = await prisma.galleryImage.findUnique({
      where: { id: params.id },
    });
    if (galleryImage) {
      return NextResponse.json({ success: true, galleryImage });
    } else {
      return NextResponse.json(
        { success: false, error: "Gallery image not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch gallery image" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const updatedGalleryImage = await prisma.galleryImage.update({
      where: { id: params.id },
      data: {
        imageUrl: data.imageUrl,
        description: data.description,
      },
    });
    return NextResponse.json({
      success: true,
      message: "Gallery image updated successfully",
      galleryImage: updatedGalleryImage,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to update gallery image" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await prisma.galleryImage.delete({
      where: { id: params.id },
    });
    return NextResponse.json({
      success: true,
      message: "Gallery image deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to delete gallery image" },
      { status: 500 }
    );
  }
}
