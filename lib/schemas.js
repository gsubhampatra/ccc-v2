import * as z from 'zod'

export const memberSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    bio: z.string().min(10, { message: "Bio must be at least 10 characters." }),
    designation: z.string().min(2, { message: "Designation is required." }),
    type: z.string(),
    profilePhoto: z.string().url({ message: "Must be a valid URL." }),
    github: z.string().url({ message: "Must be a valid URL." }),
    linkedin: z.string().url({ message: "Must be a valid URL." }),
    batch: z.string().regex(/^\d{4}$/, { message: "Must be a valid year." }),
})

export const eventSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  date: z.string().date({ message: "Must be a valid date." }),
  time: z.string(),
  venue: z.string().min(2, { message: "Venue is required." }),
  isRegistrationOpen: z.boolean(),
  type: z.string(),
  
})

export const registrationSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Must be a valid email address." }),
  eventId: z.string(),
})
