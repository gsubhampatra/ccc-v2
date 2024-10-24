import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request, { params }) {
  try {
    const winner = await prisma.winner.findUnique({
      where: { id: params.id },
      include: { event: true },
    });
    if (winner) {
      return NextResponse.json({ success: true, winner });
    } else {
      return NextResponse.json(
        { success: false, error: "Winner not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch winner" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const updatedWinner = await prisma.winner.update({
      where: { id: params.id },
      data: {
        name: data.name,
        eventId: data.eventId,
      },
      include: { event: true },
    });
    return NextResponse.json({
      success: true,
      message: "Winner updated successfully",
      winner: updatedWinner,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to update winner" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await prisma.winner.delete({
      where: { id: params.id },
    });
    return NextResponse.json({
      success: true,
      message: "Winner deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to delete winner" },
      { status: 500 }
    );
  }
}
