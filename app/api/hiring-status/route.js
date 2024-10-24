import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    await ensureSingleHiringStatus();

    let hiringStatus = await prisma.hiringStatus.findFirst();

    if (!hiringStatus) {
      // If no hiring status exists, create one with default status false
      hiringStatus = await prisma.hiringStatus.create({
        data: { status: false },
      });
    }

    return NextResponse.json({ status: hiringStatus.status });
  } catch (error) {
    console.error("Error fetching hiring status:", error);
    return NextResponse.json(
      { error: "Failed to fetch hiring status" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    await ensureSingleHiringStatus();

    const { status } = await request.json();

    if (typeof status !== "boolean") {
      return NextResponse.json(
        { error: "Status must be a boolean" },
        { status: 400 }
      );
    }

    let hiringStatus = await prisma.hiringStatus.findFirst();

    if (hiringStatus) {
      // Update existing status
      hiringStatus = await prisma.hiringStatus.update({
        where: { id: hiringStatus.id },
        data: { status },
      });
    } else {
      // Create new status if it doesn't exist
      hiringStatus = await prisma.hiringStatus.create({
        data: { status },
      });
    }

    return NextResponse.json({ status: hiringStatus.status });
  } catch (error) {
    console.error("Error updating hiring status:", error);
    return NextResponse.json(
      { error: "Failed to update hiring status" },
      { status: 500 }
    );
  }
}
// Ensure only one HiringStatus record exists
async function ensureSingleHiringStatus() {
  const count = await prisma.hiringStatus.count();
  if (count > 1) {
    const allStatuses = await prisma.hiringStatus.findMany();
    const [keepStatus, ...deleteStatuses] = allStatuses;

    await prisma.hiringStatus.deleteMany({
      where: {
        id: {
          in: deleteStatuses.map((status) => status.id),
        },
      },
    });

    return keepStatus;
  }
  return null;
}

// Call this function at the beginning of both GET and PUT methods
await ensureSingleHiringStatus();
