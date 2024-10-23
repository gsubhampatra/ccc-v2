import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, eventId } = body;

    // Validate input
    if (!name || !email || !eventId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if the event exists and is open for registration
    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    if (!event.isRegistrationOpen) {
      return NextResponse.json({ error: 'Registration is closed for this event' }, { status: 400 });
    }

    // Create the registration
    const registration = await prisma.registration.create({
      data: {
        name,
        email,
        eventId,
        registrationDetails: {}, // You can add more details here if needed
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Registered for event successfully.',
      registration,
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Failed to register for event' }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get('eventId');

    if (!eventId) {
      return NextResponse.json({ error: 'Event ID is required' }, { status: 400 });
    }

    const registrations = await prisma.registration.findMany({
      where: { eventId },
    });

    return NextResponse.json({
      success: true,
      registrations,
    });
  } catch (error) {
    console.error('Fetch registrations error:', error);
    return NextResponse.json({ error: 'Failed to fetch registrations' }, { status: 500 });
  }
}
