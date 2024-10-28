import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { addToEmailQueue } from "@/lib/emailQueue";

// Get all registrations
export async function GET(request) {
  try {
    console.log("Fetching all registrations");
    const registrations = await prisma.registration.findMany({
      include: { event: true },
    });
    return NextResponse.json(registrations);
  } catch (error) {
    console.error("Error fetching registrations:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch registrations" },
      { status: 500 }
    );
  }
}

// Register for an event
export async function POST(request) {
  try {
    const data = await request.json();
    console.log(data);
    const registration = await prisma.registration.create({
      data: {
        name: data.name,
        email: data.email,
        registrationDetails: data.registrationDetails,
        eventId: data.eventId,
      },
      include: { event: true },
    });

    addToEmailQueue({
      to: registration.email,
      subject: `Registration Confirmation for ${registration.event.title}`,
      registrationDetails: {
        ...registration.registrationDetails,
        name: registration.name,
        email: registration.email,
      },
      eventDetails: registration.event,
    });

    return NextResponse.json({
      success: true,
      message: "Registered successfully",
      registration,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, error: "Failed to register for event" },
      { status: 500 }
    );
  }
}

// Delete all registrations for an event
export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const eventId = searchParams.get("eventId");

  if (!eventId) {
    return NextResponse.json(
      { success: false, error: "Event ID is required" },
      { status: 400 }
    );
  }

  try {
    await prisma.registration.deleteMany({
      where: { eventId: eventId },
    });
    return NextResponse.json({
      success: true,
      message: "All registrations for the event deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to delete registrations" },
      { status: 500 }
    );
  }
}
