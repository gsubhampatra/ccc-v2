import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    const newAdmin = await prisma.admin.create({
      data: { email, password },
    });
    return NextResponse.json({
      success: true,
      message: "Admin added successfully",
    });
  } catch (error) {
    console.error("Error adding admin:", error);
    return NextResponse.json(
      { success: false, message: "Failed to add admin" },
      { status: 500 }
    );
  }
}
