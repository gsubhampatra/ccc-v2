'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registrationSchema } from '@/lib/schemas'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "@/hooks/use-toast"
import { registerForEvent, getRegistrations, updateRegistration, deleteRegistration, getEvents } from '@/lib/api'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export default function RegistrationsSection() {
  const [editingRegistration, setEditingRegistration] = useState(null)
  const queryClient = useQueryClient()

  const { data: registrations, isLoading: registrationsLoading } = useQuery({
    queryKey: ['registrations'],
    queryFn: () => getRegistrations(),
  })

  const { data: events, isLoading: eventsLoading } = useQuery({
    queryKey: ['events'],
    queryFn: getEvents,
  })

  const form = useForm({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: '',
      email: '',
      eventId: '',
      registrationDetails: '',
    },
  })

  const registerMutation = useMutation({
    mutationFn: registerForEvent,
    onSuccess: () => {
      queryClient.invalidateQueries(['registrations'])
      toast({ title: "Success", description: "Registered for event successfully." })
      form.reset()
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to register for event.", variant: "destructive" })
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, ...data }) => updateRegistration(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['registrations'])
      toast({ title: "Success", description: "Registration updated successfully." })
      setEditingRegistration(null)
      form.reset()
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update registration.", variant: "destructive" })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteRegistration,
    onSuccess: () => {
      queryClient.invalidateQueries(['registrations'])
      toast({ title: "Success", description: "Registration deleted successfully." })
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete registration.", variant: "destructive" })
    },
  })

  const onSubmit = (data) => {
    if (editingRegistration) {
      updateMutation.mutate({ id: editingRegistration.id, ...data })
    } else {
      registerMutation.mutate(data)
    }
  }

  const handleEdit = (registration) => {
    setEditingRegistration(registration)
    form.reset(registration)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this registration?')) {
      deleteMutation.mutate(id)
    }
  }

  const handleCancelEdit = () => {
    setEditingRegistration(null)
    form.reset()
  }

  if (registrationsLoading || eventsLoading) return <div>Loading...</div>

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gradient">Registrations</CardTitle>
        <CardDescription>Manage event registrations</CardDescription>
      </CardHeader>
      <CardContent>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {form.watch('registrationDetails') && Object.entries(form.watch('registrationDetails')).map(([key, value]) => (
              <FormField
                key={key}
                control={form.control}
                name={`registrationDetails.${key}`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{key.charAt(0).toUpperCase() + key.slice(1)}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            ))}
            <Button className="text-white rounded-md bg-gradient" type="submit">Submit</Button>
            {editingRegistration && <Button className="mx-2 rounded-md" variant="destructive" onClick={handleCancelEdit}>Cancel</Button>}
          </form>

        </Form>



        <h3 className="mt-8 mb-4 text-xl font-semibold">Existing Registrations</h3>
        {registrations && registrations.length > 0 ? (
          <ScrollArea className="h-[400px] w-full rounded-md border">
            <div className="p-4">
              {registrations.length > 0 && registrations.map((registration, i) => (
                <Card key={i} className="p-4 mb-4">
                  <h4 className="text-lg font-semibold">{registration.name}</h4>
                  <p className="text-sm text-gray-500">{registration.email}</p>
                  <p><strong>Event:</strong> {events?.find(e => e.id === registration.eventId)?.title || 'Unknown Event'}</p>
                  {Object.entries(registration.registrationDetails).map(([key, value]) => (
                    <p><strong>{key}:</strong> {value}</p>
                  ))}
                  <div className="flex justify-end mt-4 space-x-2">
                    <Button variant="outline" onClick={() => handleEdit(registration)}>Edit</Button>
                    <Button variant="destructive" onClick={() => handleDelete(registration.id)}>Delete</Button>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <p>No registrations found.</p>
        )}
      </CardContent>
    </Card>
  )
}
