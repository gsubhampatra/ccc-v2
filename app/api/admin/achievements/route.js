import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const achievements = await prisma.achievement.findMany()
    return NextResponse.json({ success: true, achievements })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch achievements' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const data = await request.json()
    const achievement = await prisma.achievement.create({ data })
    return NextResponse.json({ success: true, message: 'Achievement created successfully', achievement })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create achievement' }, { status: 500 })
  }
}
