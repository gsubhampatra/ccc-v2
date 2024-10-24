import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const winners = await prisma.winner.findMany({
      include: { event: true },
    });
    return NextResponse.json({ success: true, winners });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch winners" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const winner = await prisma.winner.create({
      data: {
        name: data.name,
        eventId: data.eventId,
      },
      include: { event: true },
    });
    return NextResponse.json({
      success: true,
      message: "Winner created successfully",
      winner,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create winner" },
      { status: 500 }
    );
  }
}
