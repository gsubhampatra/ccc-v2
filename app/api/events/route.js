import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const events = await prisma.event.findMany()
    return NextResponse.json({ success: true, events })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch events' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const data = await request.json()
    const event = await prisma.event.create({ data })
    return NextResponse.json({ success: true, message: 'Event created successfully', event })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create event' }, { status: 500 })
  }
}
