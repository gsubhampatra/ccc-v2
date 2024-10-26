import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/tokenUtils";

export async function POST(request) {
  try {
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    try {
      verifyToken(token);
    } catch {
      return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
    }

    const { email, password } = await request.json();
    const newAdmin = await prisma.admin.create({
      data: { email, password },
    });
    return NextResponse.json({ success: true, message: "Admin added successfully" });
  } catch (error) {
    console.error("Error adding admin:", error);
    return NextResponse.json({ success: false, message: "Failed to add admin" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    try {
      verifyToken(token);
    } catch {
      return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
    }

    const { password } = await request.json();
    
    await prisma.admin.updateMany({
      data: {
        password: password
      }
    });

    return NextResponse.json({ success: true, message: "All admin passwords updated successfully" });
  } catch (error) {
    console.error("Error updating admin passwords:", error);
    return NextResponse.json({ success: false, message: "Failed to update admin passwords" }, { status: 500 });
  }
}
