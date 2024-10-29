'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { eventSchema } from '@/lib/schemas'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "@/hooks/use-toast"
import { getEvents, addEvent, updateEvent, deleteEvent } from '@/lib/api'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export default function EventsSection() {
    const [editingEvent, setEditingEvent] = useState(null)
    const queryClient = useQueryClient()

    const { data: events, isLoading, error } = useQuery({
        queryKey: ['events'],
        queryFn: getEvents,
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
            whatsappGroupUrl: '',
            isRegistrationOpen: false,
            type: '',
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
        mutationFn: ({ id, ...data }) => updateEvent(id, data),
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

    const deleteMutation = useMutation({
        mutationFn: deleteEvent,
        onSuccess: () => {
            queryClient.invalidateQueries(['events'])
            toast({ title: "Success", description: "Event deleted successfully." })
        },
        onError: () => {
            toast({ title: "Error", description: "Failed to delete event.", variant: "destructive" })
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
        form.reset({
            ...event
        })
    }

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            deleteMutation.mutate(id)
        }
    }

    const handleCancelEdit = () => {
        setEditingEvent(null)
        form.reset()
    }

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>An error occurred: {error.message}</div>

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-gradient">Events</CardTitle>
                <CardDescription>Manage club events</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <FormField control={form.control} name="title" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="type" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Type</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </div>
                        <FormField control={form.control} name="description" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <FormField control={form.control} name="date" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Date</FormLabel>
                                    <FormControl>
                                        <Input type="text" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="time" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Time</FormLabel>
                                    <FormControl>
                                        <Input type="text" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="venue" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Venue</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </div>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <FormField control={form.control} name="posterUrl" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Poster URL</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                           
                        </div>
                        <FormField control={form.control} name="whatsappGroupUrl" render={({ field }) => (
                            <FormItem>
                                <FormLabel>WhatsApp Group URL</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="isRegistrationOpen" render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
                                <div className="space-y-0.5">
                                    <FormLabel className="text-base">Registration Open</FormLabel>
                                    <FormDescription>
                                        Toggle to open or close event registration
                                    </FormDescription>
                                </div>
                                <FormControl>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )} />
                        <div className="flex justify-end space-x-2">
                            {editingEvent && (
                                <Button type="button" variant="outline" onClick={handleCancelEdit}>
                                    Cancel Edit
                                </Button>
                            )}
                            <Button type="submit" className="bg-gradient rounded-xl">
                                {editingEvent ? 'Update Event' : 'Add Event'}
                            </Button>
                        </div>
                    </form>
                </Form>

                <h3 className="mt-8 mb-4 text-xl font-semibold">Existing Events</h3>
                {events && events.length > 0 ? (
                    <ScrollArea className="h-[400px] w-full rounded-md border">
                        <div className="p-4">
                            {events.map((event) => (
                                <Card key={event.id} className="p-4 mb-4">
                                    <h4 className="text-lg font-semibold">{event.title}</h4>
                                    <p className="text-sm text-gray-500">{event.type}</p>
                                    <p>{event.description}</p>
                                    <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                                        <p><strong>Date:</strong> {event.date}</p>
                                        <p><strong>Time:</strong> {event.time}</p>
                                        <p><strong>Venue:</strong> {event.venue}</p>
                                        <p><strong>Registration:</strong> {event.isRegistrationOpen ? 'Open' : 'Closed'}</p>
                                    </div>
                                    <div className="flex justify-end mt-4 space-x-2">
                                        <Button variant="outline" onClick={() => handleEdit(event)}>Edit</Button>
                                        <Button variant="destructive" onClick={() => handleDelete(event.id)}>Delete</Button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </ScrollArea>
                ) : (
                    <p>No events found.</p>
                )}
            </CardContent>
        </Card>
    )
}
