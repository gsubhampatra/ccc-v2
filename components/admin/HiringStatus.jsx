'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/hooks/use-toast"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getHiringStatus, updateHiringStatus } from '@/lib/api'

export default function HiringStatus() {
  const queryClient = useQueryClient()

  const { data: hiringStatus, isLoading, error } = useQuery({ 
    queryKey: ['hiringStatus'], 
    queryFn: getHiringStatus 
  })
  const updateHiringStatusMutation = useMutation({
    mutationFn: updateHiringStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hiringStatus'] })
      toast({ title: "Success", description: "Hiring status updated successfully." })
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message || "Failed to update hiring status.", variant: "destructive" })
    }
  })

  const handleUpdateHiringStatus = (newStatus) => {
    updateHiringStatusMutation.mutate({ status: newStatus })
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hiring Status {hiringStatus.status} </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          <Switch
            checked={hiringStatus.status}
            onCheckedChange={handleUpdateHiringStatus}
            disabled={updateHiringStatusMutation.isLoading}
            className={`${hiringStatus.status ? "bg-gradient" : "bg-gray-500"}`}
          />
          <span>{hiringStatus?.status ? 'Hiring Open' : 'Hiring Closed'}</span>
        </div>
        {updateHiringStatusMutation.isLoading && <p>Updating...</p>}
      </CardContent>
    </Card>
  )
}
