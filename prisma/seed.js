import prisma from "@/prisma/client";
import { eventDetails } from "../data/eventDetails.js";
import { club_member_details } from "../data/memberDetails.js";
import { admin_data } from "../data/memberDetails.js";
import { club_alumni_details } from "../data/alumniDetails.js";

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
    });
  }

  // Insert members
  const allMembers = [...club_member_details, ...club_alumni_details];

  for (const member of allMembers) {
    await prisma.member.create({
      data: {
        name: member.fullname,
        bio: member.description,
        linkedin: member.linkedln_link || null,
        github: member.github_link || null,
        profilePhoto: member.profile_img,
        type: member.status === "alumni" ? "alumni" : "member",
        batch: member.year,
        domain: member.desgination,
        position: member.member_type,
      },
    });
  }

  // Insert admins
  for (const admin of admin_data) {
    await prisma.admin.create({
      data: {
        email: admin.email,
        name: admin.name,
        password: admin.password 
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
