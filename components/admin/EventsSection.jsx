'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { eventSchema } from '@/lib/schemas'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

import { toast } from "@/hooks/use-toast"
import { getEvents, addEvent, updateEvent } from '@/lib/api'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export default function EventsSection() {
    const [editingEvent, setEditingEvent] = useState(null)
    const queryClient = useQueryClient()

    const { data: events, isLoading, error } = useQuery({
        queryKey: ['events'],
        queryFn: () => getEvents(),
    })

    const form = useForm({
        resolver: zodResolver(eventSchema),
        defaultValues: {
            title: '',
            description: '',
            date: '',
            time: '',
            venue: '',
            posterUrl: '',
            registrationLink: '',
            isRegistrationOpen: false,
        },
    })

    const addMutation = useMutation({
        mutationFn: addEvent,
        onSuccess: () => {
            queryClient.invalidateQueries(['events'])
            toast({ title: "Success", description: "Event added successfully." })
            form.reset()
        },
        onError: () => {
            toast({ title: "Error", description: "Failed to add event.", variant: "destructive" })
        },
    })

    const updateMutation = useMutation({
        mutationFn: updateEvent,
        onSuccess: () => {
            queryClient.invalidateQueries(['events'])
            toast({ title: "Success", description: "Event updated successfully." })
            setEditingEvent(null)
            form.reset()
        },
        onError: () => {
            toast({ title: "Error", description: "Failed to update event.", variant: "destructive" })
        },
    })

    const onSubmit = (data) => {
        if (editingEvent) {
            updateMutation.mutate({ id: editingEvent.id, ...data })
        } else {
            addMutation.mutate(data)
        }
    }

    const handleEdit = (event) => {
        setEditingEvent(event)
        form.reset(event)
    }

    const handleCancelEdit = () => {
        setEditingEvent(null)
        form.reset()
    }

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>An error occurred: {error.message}</div>


    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-gradient" >Events</CardTitle>
                <CardDescription>Manage club events</CardDescription>
            </CardHeader>
            <CardContent>
                <h3 className="mb-4 text-lg font-semibold">Add New Event</h3>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        {/* Add form fields here */}
                        <FormField control={form.control} name="title" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="description" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea {...field} />
                                </FormControl>
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="date" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Date</FormLabel>
                                <FormControl>
                                    <Input {...field} type="date" />
                                </FormControl>
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="time" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Time</FormLabel>
                                <FormControl>
                                    <Input {...field} type="time" />
                                </FormControl>
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="registrationLink" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Registration Link</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="venue" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Venue</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="whatsappGroupUrl" render={({ field }) => (
                            <FormItem>
                                <FormLabel>WhatsApp Group URL</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="isRegistrationOpen" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Is Registration Open?</FormLabel>
                                <FormControl>
                                    <Input type="checkbox" {...field} />
                                </FormControl>
                            </FormItem>
                        )} />

                        <Button type="submit" className="bg-gradient">{editingEvent ? 'Update Event' : 'Add Event'}</Button>
                        {editingEvent && (
                            <Button type="button" className="bg-gradient" variant="outline" onClick={handleCancelEdit}>
                                Cancel Edit
                            </Button>
                        )}
                    </form>
                </Form>
                <h3 className="mt-8 mb-4 text-lg font-semibold">Existing Events</h3>
                {events && events.length > 0 ? (
                    <ul>
                        <div className="overflow-x-auto">
                            <table className="w-full table-auto">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-4 py-2">Title</th>
                                        <th className="px-4 py-2">Date</th>
                                        <th className="px-4 py-2">Time</th>
                                        <th className="px-4 py-2">Venue</th>
                                        <th className="px-4 py-2">Registration</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {events.map((event) => (
                                        <tr key={event.id} className="border-b">
                                            <td className="px-4 py-2">{event.title}</td>
                                            <td className="px-4 py-2">{event.date}</td>
                                            <td className="px-4 py-2">{event.time}</td>
                                            <td className="px-4 py-2">{event.venue}</td>
                                            <td className="px-4 py-2">
                                                {event.isRegistrationOpen ? 'Open' : 'Closed'}
                                            </td>
                                            <Button className="hover:bg-sky-200 text-gradient" onClick={() => handleEdit(event)}>Edit</Button>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </ul>
                ) : (
                    <p>No events found.</p>
                )}

            </CardContent>
        </Card>
    )
}
