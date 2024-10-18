'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { toast } from "@/components/ui/use-toast"

// Schemas for form validation
const memberSchema = z.object({
  fullname: z.string().min(2, { message: "Name must be at least 2 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  designation: z.string().min(2, { message: "Designation is required." }),
  member_type: z.string(),
  profile_img: z.string().url({ message: "Must be a valid URL." }),
  github_link: z.string().url({ message: "Must be a valid URL." }),
  linkedln_link: z.string().url({ message: "Must be a valid URL." }),
  year: z.string().regex(/^\d{4}$/, { message: "Must be a valid year." }),
})

const eventSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  describe: z.string().min(10, { message: "Description must be at least 10 characters." }),
  date: z.string(),
  venue: z.string(),
  logo: z.string().url({ message: "Must be a valid URL." }),
})

const projectSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  image: z.string().url({ message: "Must be a valid URL." }),
  github_link: z.string().url({ message: "Must be a valid URL." }),
})

const gallerySchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  image: z.string().url({ message: "Must be a valid URL." }),
})

// Placeholder functions for API calls
const addMember = async (data) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  console.log('Member added:', data)
  return { success: true }
}

const addEvent = async (data) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  console.log('Event added:', data)
  return { success: true }
}

const addProject = async (data) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  console.log('Project added:', data)
  return { success: true }
}

const addGalleryImage = async (data) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  console.log('Gallery image added:', data)
  return { success: true }
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('members')

  const memberForm = useForm({
    resolver: zodResolver(memberSchema),
  })

  const eventForm = useForm({
    resolver: zodResolver(eventSchema),
  })

  const projectForm = useForm({
    resolver: zodResolver(projectSchema),
  })

  const galleryForm = useForm({
    resolver: zodResolver(gallerySchema),
  })

  const onMemberSubmit = async (data) => {
    try {
      await addMember(data)
      toast({ title: "Success", description: "Member added successfully." })
      memberForm.reset()
    } catch (error) {
      toast({ title: "Error", description: "Failed to add member.", variant: "destructive" })
    }
  }

  const onEventSubmit = async (data) => {
    try {
      await addEvent(data)
      toast({ title: "Success", description: "Event added successfully." })
      eventForm.reset()
    } catch (error) {
      toast({ title: "Error", description: "Failed to add event.", variant: "destructive" })
    }
  }

  const onProjectSubmit = async (data) => {
    try {
      await addProject(data)
      toast({ title: "Success", description: "Project added successfully." })
      projectForm.reset()
    } catch (error) {
      toast({ title: "Error", description: "Failed to add project.", variant: "destructive" })
    }
  }

  const onGallerySubmit = async (data) => {
    try {
      await addGalleryImage(data)
      toast({ title: "Success", description: "Gallery image added successfully." })
      galleryForm.reset()
    } catch (error) {
      toast({ title: "Error", description: "Failed to add gallery image.", variant: "destructive" })
    }
  }

  return (
    <div className="container px-12 py-10 mx-auto my-20">
      <h1 className="mb-8 text-4xl font-bold">Admin Dashboard</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
        </TabsList>
        <TabsContent value="members">
          <Card>
            <CardHeader>
              <CardTitle>Add/Edit Member</CardTitle>
              <CardDescription>Add a new member or edit existing member details.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...memberForm}>
                <form onSubmit={memberForm.handleSubmit(onMemberSubmit)} className="space-y-8">
                  <FormField
                    control={memberForm.control}
                    name="fullname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={memberForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Member description" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={memberForm.control}
                    name="designation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Designation</FormLabel>
                        <FormControl>
                          <Input placeholder="Web Developer" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={memberForm.control}
                    name="member_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Member Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select member type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="student">Student</SelectItem>
                            <SelectItem value="alumni">Alumni</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={memberForm.control}
                    name="profile_img"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Profile Image URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/image.jpg" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={memberForm.control}
                    name="github_link"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>GitHub Link</FormLabel>
                        <FormControl>
                          <Input placeholder="https://github.com/username" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={memberForm.control}
                    name="linkedln_link"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>LinkedIn Link</FormLabel>
                        <FormControl>
                          <Input placeholder="https://linkedin.com/in/username" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={memberForm.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year</FormLabel>
                        <FormControl>
                          <Input placeholder="2023" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Submit</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="events">
          <Card>
            <CardHeader>
              <CardTitle>Add/Edit Event</CardTitle>
              <CardDescription>Add a new event or edit existing event details.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...eventForm}>
                <form onSubmit={eventForm.handleSubmit(onEventSubmit)} className="space-y-8">
                  <FormField
                    control={eventForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Event Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Hackathon 2023" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={eventForm.control}
                    name="describe"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Event description" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={eventForm.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={eventForm.control}
                    name="venue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Venue</FormLabel>
                        <FormControl>
                          <Input placeholder="University Auditorium" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={eventForm.control}
                    name="logo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Logo URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/logo.png" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Submit</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="projects">
          <Card>
            <CardHeader>
              <CardTitle>Add/Edit Project</CardTitle>
              <CardDescription>Add a new project or edit existing project details.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...projectForm}>
                <form onSubmit={projectForm.handleSubmit(onProjectSubmit)} className="space-y-8">
                  <FormField
                    control={projectForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Name</FormLabel>
                        <FormControl>
                          <Input placeholder="AI Chatbot" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={projectForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Project description" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={projectForm.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/project-image.jpg" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                
                    control={projectForm.control}
                    name="github_link"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>GitHub Link</FormLabel>
                        <FormControl>
                          <Input placeholder="https://github.com/username/project" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Submit</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="gallery">
          <Card>
            <CardHeader>
              <CardTitle>Add Gallery Image</CardTitle>
              <CardDescription>Add a new image to the gallery.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...galleryForm}>
                <form onSubmit={galleryForm.handleSubmit(onGallerySubmit)} className="space-y-8">
                  <FormField
                    control={galleryForm.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Team Building Event" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={galleryForm.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/gallery-image.jpg" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Submit</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}