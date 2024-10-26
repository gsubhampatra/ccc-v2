import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const admins = await prisma.admin.findMany({
      select: {
        id: true,
        email: true,
      },
    });
    return NextResponse.json({
      success: true,
      data: admins,
    });
  } catch (error) {
    console.error("Error fetching admins:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch admins" },
      { status: 500 }
    );
  }
}

