'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "@/hooks/use-toast"
import { registerForEvent, getRegistrations, updateRegistration, deleteRegistration, getEvents } from '@/lib/api'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as XLSX from 'xlsx'
import { Label } from '../ui/label'

export default function RegistrationsSection() {
  const [loading, setLoading] = useState(false)
  const [editingRegistration, setEditingRegistration] = useState(null)
  const [selectedEventId, setSelectedEventId] = useState('all')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    branch: '',
    batch: '',
    rollno: '',
    busStop: '',
    utrNumber: '',
    eventId: '',
    registrationDetails: {}
  })

  const queryClient = useQueryClient()

  const { data: registrations, isLoading: registrationsLoading } = useQuery({
    queryKey: ['registrations'],
    queryFn: () => getRegistrations(),
  })

  const { data: events, isLoading: eventsLoading } = useQuery({
    queryKey: ['events'],
    queryFn: getEvents,
  })

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle event selection
  const handleEventSelect = (value) => {
    setFormData(prev => ({
      ...prev,
      eventId: value
    }))
  }

  // Handle create submission
  const handleCreate = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (!formData.eventId) {
        throw new Error("Please select an event")
      }

      const newRegistrationData = {
        eventId: formData.eventId,
        name: formData.name,
        email: formData.email,
        registrationDetails: {
          phone: formData.phone,
          branch: formData.branch,
          batch: formData.batch,
          rollno: formData.rollno,
          utrNumber: formData.utrNumber,
          busStop: formData.busStop || null,
        },
      }

      await registerForEvent(newRegistrationData)
      
      queryClient.invalidateQueries(['registrations'])
      toast({ title: "Success", description: "Registration created successfully" })
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        branch: '',
        batch: '',
        rollno: '',
        busStop: '',
        utrNumber: '',
        eventId: '',
        registrationDetails: {}
      })
    } catch (error) {
      toast({ 
        title: "Error", 
        description: error.message || "Failed to create registration",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  // Handle edit
  const handleEdit = (registration) => {
    setEditingRegistration(registration)
    setFormData({
      name: registration.name,
      email: registration.email,
      eventId: registration.eventId,
      phone: registration.registrationDetails?.phone || '',
      branch: registration.registrationDetails?.branch || '',
      batch: registration.registrationDetails?.batch || '',
      rollno: registration.registrationDetails?.rollno || '',
      busStop: registration.registrationDetails?.busStop || '',
      utrNumber: registration.registrationDetails?.utrNumber || '',
      registrationDetails: registration.registrationDetails || {}
    })
  }

  // Handle update
  const handleUpdate = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const updatedData = {
        id: editingRegistration.id,
        ...formData
      }

      const updatedRegistrationData = {
        eventId: formData.eventId,
        name: formData.name,
        email: formData.email,
        registrationDetails: {
          phone: formData.phone,
          branch: formData.branch,
          batch: formData.batch,
          rollno: formData.rollno,
          utrNumber: formData.utrNumber,
          busStop: formData.busStop || null,
        },
      }
      await updateRegistration(editingRegistration.id, updatedRegistrationData)
      
      queryClient.invalidateQueries(['registrations'])
      toast({ title: "Success", description: "Registration updated successfully" })
      
      // Reset form and editing state
      setEditingRegistration(null)
      setFormData({
        name: '',
        email: '',
        phone: '',
        branch: '',
        batch: '',
        rollno: '',
        busStop: '',
        utrNumber: '',
        eventId: '',
        registrationDetails: {}
      })
    } catch (error) {
      toast({ 
        title: "Error", 
        description: error.message || "Failed to update registration",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this registration?')) {
      try {
        await deleteRegistration(id)
        queryClient.invalidateQueries(['registrations'])
        toast({ title: "Success", description: "Registration deleted successfully" })
      } catch (error) {
        toast({
          title: "Error",
          description: error.message || "Failed to delete registration",
          variant: "destructive"
        })
      }
    }
  }

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingRegistration(null)
    setFormData({
      name: '',
      email: '',
      phone: '',
      branch: '',
      batch: '',
      rollno: '',
      busStop: '',
      utrNumber: '',
      eventId: '',
      registrationDetails: {}
    })
  }

  if (registrationsLoading || eventsLoading) return <div>Loading...</div>

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gradient">Registrations</CardTitle>
        <CardDescription>Manage event registrations</CardDescription>
      </CardHeader>
      <CardContent>

        {/* Form */}
        <form onSubmit={editingRegistration ? handleUpdate : handleCreate} className="space-y-4">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter full name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="example@nist.edu"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter phone number"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="branch">Branch</Label>
              <Input
                name="branch"
                value={formData.branch}
                onChange={handleInputChange}
                placeholder="Enter branch"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="batch">Batch</Label>
              <Input
                name="batch"
                value={formData.batch}
                onChange={handleInputChange}
                placeholder="Enter batch"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rollno">Roll No</Label>
              <Input
                name="rollno"
                value={formData.rollno}
                onChange={handleInputChange}
                placeholder="Enter roll number"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="busStop">Bus Stop (Optional)</Label>
              <Input
                name="busStop"
                value={formData.busStop}
                onChange={handleInputChange}
                placeholder="Enter bus stop if local"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="utrNumber">UTR Number</Label>
              <Input
                name="utrNumber"
                value={formData.utrNumber}
                onChange={handleInputChange}
                placeholder="Enter 12-digit UTR number"
                required
              />
            </div>

            {!editingRegistration && (
              <div className="space-y-2">
                <Label htmlFor="eventId">Event</Label>
                <Select
                  value={formData.eventId}
                  onValueChange={(value) => handleInputChange({ target: { name: 'eventId', value } })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an event" />
                  </SelectTrigger>
                  <SelectContent>
                    {events?.map(event => (
                      <SelectItem key={event.id} value={event.id}>
                        {event.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Button 
              type="submit" 
              className="text-white rounded-md bg-gradient"
              disabled={loading}
            >
              {loading ? 'Processing...' : editingRegistration ? 'Update' : 'Create'}
            </Button>
            
            {editingRegistration && (
              <Button 
                type="button"
                variant="destructive"
                onClick={handleCancelEdit}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>

        {/* Registrations List */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <Select
              value={selectedEventId}
              onValueChange={setSelectedEventId}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by Event" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Events</SelectItem>
                {events?.map(event => (
                  <SelectItem key={event.id} value={event.id}>
                    {event.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button 
              onClick={() => exportToExcel(registrations, events)}
              className="bg-green-600 hover:bg-green-700"
            >
              Export to Excel
            </Button>
          </div>
          <div className="mb-4 text-xl font-bold text-gradient">
            Total Registrations: {registrations?.filter(reg => selectedEventId === 'all' ? true : reg.eventId === selectedEventId).length || 0}
          </div>

          <ScrollArea className="h-[400px] w-full rounded-md border">
            <div className="p-4">
              {registrations
                ?.filter(reg => selectedEventId === 'all' ? true : reg.eventId === selectedEventId)
                .map((registration) => (
                  <Card key={registration.id} className="p-4 mb-4">
                    <h4 className="text-lg font-semibold">{registration.name}</h4>
                    <p className="text-sm text-gray-500">{registration.email}</p>
                    <p>
                      <strong>Event:</strong> {events?.find(e => e.id === registration.eventId)?.title || 'Unknown Event'}
                    </p>
                    {Object.entries(registration.registrationDetails || {}).map(([key, value]) => (
                      <p key={key}>
                        <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                      </p>
                    ))}
                    <div className="flex justify-end mt-4 space-x-2">
                      <Button variant="outline" onClick={() => handleEdit(registration)}>
                        Edit
                      </Button>
                      <Button variant="destructive" onClick={() => handleDelete(registration.id)}>
                        Delete
                      </Button>
                    </div>
                  </Card>
                ))}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  )
}
