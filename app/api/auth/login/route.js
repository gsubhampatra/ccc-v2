import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { generateToken } from "@/lib/tokenUtils";

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

    const token = await generateToken({ id: admin.id, email: admin.email });

    const response = NextResponse.json({
      success: true,
      message: "Logged in successfully",
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred during login" },
      { status: 500 }
    );
  }
}
