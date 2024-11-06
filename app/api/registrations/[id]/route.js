import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Get a single registration
export async function GET(request, { params }) {
  try {
    const registration = await prisma.registration.findUnique({
      where: { id: params.id },
      include: { event: true },
    });
    if (registration) {
      return NextResponse.json({ success: true, registration });
    } else {
      return NextResponse.json(
        { success: false, error: "Registration not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch registration" },
      { status: 500 }
    );
  }
}

// Update a registration
export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const {id} = await params;
    const updatedRegistration = await prisma.registration.update({
      where: { id: id },
      data: {
        name: data.name,
        email: data.email,
        registrationDetails: data.registrationDetails,
      },
      include: { event: true },
    });
    return NextResponse.json({
      success: true,
      message: "Registration updated successfully",
      registration: updatedRegistration,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to update registration" },
      { status: 500 }
    );
  }
}

// Delete a single registration
export async function DELETE(request, { params }) {
  try {
    const {id} = params;
    await prisma.registration.delete({
      where: { id: id },
    });
    return NextResponse.json({
      success: true,
      message: "Registration deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to delete registration" },
      { status: 500 }
    );
  }
}
