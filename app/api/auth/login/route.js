import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    const admin = await prisma.admin.findFirst({ where: { email } });

    if (!admin || admin.password !== password) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }
    const token = admin.email;

    const response = NextResponse.json({
      success: true,
      message: "Logged in successfully",
    });
    response.cookies.set("ccc-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred" },
      { status: 500 }
    );
  }
}
