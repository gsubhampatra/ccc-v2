import { PrismaClient } from '@prisma/client'
import { eventDetails } from '../data/eventDetails.js'
import { club_member_details } from '../data/memberDetails.js'
import { admin_data } from '../data/memberDetails.js'

const prisma = new PrismaClient()

async function main() {
  // Insert events
  for (const event of eventDetails) {
    await prisma.event.create({
      data: {
        title: event.name,
        description: event.describe,
        date: event.date,
        type: event.type,
        time: event.time,
        venue: event.venue,
        posterUrl: event.logo || "",
        registrationLink: event.form_url,
        whatsappGroupUrl: event.wp_grp_url,
        isRegistrationOpen: event.is_registration_open ?? false,
      },
    })
  }

  // Insert members
  for (const member of club_member_details) {
    await prisma.member.create({
      data: {
        name: member.fullname,
        bio: member.description,
        designation: member.desgination,
        type: member.member_type,
        batch: member.year,
        profilePhoto: member.profile_img,
        github: member.github_link,
        linkedin: member.linkedln_link,
      },
    })
  }

  // Insert admins
  for (const admin of admin_data) {
    await prisma.admin.create({
      data: {
        username: admin.email,
        password: admin?.password || "", // Ensure this is properly hashed in production
      },
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
