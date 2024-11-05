import * as z from "zod";

export const memberSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  bio: z.string().min(10, { message: "Bio must be at least 10 characters." }),
  domain: z.string().min(2, { message: "Domain is required." }),
  position: z.string(),
  type: z.string(),
  github: z.string().url({ message: "Must be a valid URL." }),
  linkedin: z.string().url({ message: "Must be a valid URL." }),
  batch: z.string().regex(/^\d{4}$/, { message: "Must be a valid year." }),
});

export const eventSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  description: z
    .string()
    .min(5, { message: "Description must be at least 5 characters." }),
  date: z.string(),
  time: z.string(),
  venue: z.string().min(2, { message: "Venue is required." }),
  whatsappGroupUrl: z.string().url({ message: "Must be a valid URL." }),
  posterUrl: z.string().url({ message: "Must be a valid URL." }),
  isRegistrationOpen: z.boolean(),
  type: z.string(),
});

export const registrationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  branch: z.string().min(2, "Branch must be at least 2 characters"),
  batch: z.string().min(4, "Batch must be at least 4 characters"),
  rollno: z.string().min(4, "Roll number must be at least 4 characters"),
  utrNumber: z.string()
    .length(12, "UTR number must be exactly 12 digits")
    .regex(/^\d+$/, "UTR number must contain only digits"),
  busStop: z.string().optional(),
  eventId: z.string(),
});
