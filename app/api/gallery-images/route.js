import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const galleryImages = await prisma.galleryImage.findMany();
    return NextResponse.json({ success: true, galleryImages });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch gallery images" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const galleryImage = await prisma.galleryImage.create({
      data: {
        imageUrl: data.imageUrl,
        description: data.description,
      },
    });
    return NextResponse.json({
      success: true,
      message: "Gallery image created successfully",
      galleryImage,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create gallery image" },
      { status: 500 }
    );
  }
}
