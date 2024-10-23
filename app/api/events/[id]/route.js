import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { eventSchema } from '@/lib/schemas'

const prisma = new PrismaClient()

export async function PUT(request, { params }) {
  const { id } = params

  try {
    const body = await request.json()
    const eventData = eventSchema.parse(body)

    const updatedEvent = await prisma.event.update({
      where: { id: id },
      data: eventData,
    })

    return NextResponse.json(updatedEvent, { status: 200 })
  } catch (error) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid event data', details: error.errors },
        { status: 400 }
      )
    } else {
      console.error('Error updating event:', error)
      return NextResponse.json(
        { error: 'Error updating event' },
        { status: 500 }
      )
    }
  }
}
