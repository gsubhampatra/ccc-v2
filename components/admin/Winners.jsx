'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getWinners, addWinner, deleteWinner, getEvents, getRegistrations } from '@/lib/api'

export default function Winners() {
  const [selectedEvent, setSelectedEvent] = useState('')
  const [selectedUser, setSelectedUser] = useState('')
  const queryClient = useQueryClient()

  const { data: winners = [] } = useQuery({ queryKey: ['winners'], queryFn: getWinners })
  const { data: events = [] } = useQuery({ queryKey: ['events'], queryFn: getEvents })
  const { data: registrations = [] } = useQuery({ 
    queryKey: ['registrations', selectedEvent], 
    queryFn: () => getRegistrations(selectedEvent),
    enabled: !!selectedEvent
  })

  const addWinnerMutation = useMutation({
    mutationFn: addWinner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['winners'] })
      toast({ title: "Success", description: "Winner added successfully." })
      setSelectedUser('')
    },
  })

  const deleteWinnerMutation = useMutation({
    mutationFn: deleteWinner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['winners'] })
      toast({ title: "Success", description: "Winner deleted successfully." })
    },
  })

  const handleAddWinner = () => {
    if (selectedEvent && selectedUser) {
      addWinnerMutation.mutate({ name: selectedUser, eventId: selectedEvent })
    } else {
      toast({ title: "Error", description: "Please select both an event and a user.", variant: "destructive" })
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-gradient">Winners</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 space-y-4">
          <Select onValueChange={setSelectedEvent} value={selectedEvent}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an event" />
            </SelectTrigger>
            <SelectContent>
              {events.map((event) => (
                <SelectItem key={event.id} value={event.id}>{event.title}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select onValueChange={setSelectedUser} value={selectedUser} disabled={!selectedEvent}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a registered user" />
            </SelectTrigger>
            <SelectContent>
              {registrations.map((registration) => (
                <SelectItem key={registration.id} value={registration.name}>{registration.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button 
            onClick={handleAddWinner}
            className="w-full text-white transition-all bg-gradient hover:opacity-90 hover:scale-105"
            disabled={!selectedEvent || !selectedUser}
          >
            Add Winner
          </Button>
        </div>
        
        <h3 className="mb-4 text-xl font-semibold text-gradient">Existing Winners</h3>
        <ScrollArea className="h-[300px] w-full rounded-md border p-4">
          {winners.length > 0 && winners.map((winner) => (
            <Card key={winner.id} className="p-4 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-semibold">{winner.name}</h4>
                  <p className="text-sm text-gray-500">
                    Event: {events.find(e => e.id === winner.eventId)?.title || 'Unknown Event'}
                  </p>
                </div>
                <Button 
                  variant="destructive" 
                  onClick={() => deleteWinnerMutation.mutate(winner.id)}
                >
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
