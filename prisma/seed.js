import { PrismaClient } from "@prisma/client";
import { clubMembers } from "../data/clubMembers.js";
import { eventDetails } from "../data/eventDetails.js";

const prisma = new PrismaClient();

async function main() {
  // for (const member of clubMembers) {
  //   await prisma.member.create({
  //     data: {
  //       name: member.name,
  //       bio: member.bio,
  //       linkedin: member.linkedin,
  //       github: member.github,
  //       profilePhoto: member.profilePhoto,
  //       type: member.type,
  //       batch: member.batch,
  //       domain: member.domain,
  //       position: member.position,
  //     },
  //   });
  // }

  for (const event of eventDetails) {
    await prisma.event.create({
      data: {
        title: event.title,
        posterUrl: event.posterUrl,
        description: event.description,
        registrationLink: event.registrationLink,
        venue: event.venue,
        date: event.date,
        time: event.time,
        isRegistrationOpen: event.isRegistrationOpen,
        whatsappGroupUrl: event.whatsappGroupUrl,
        type: event.type,
      },
    });
  }




  console.log("Seed data inserted successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
