'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "@/hooks/use-toast"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getVideos, addVideo, deleteVideo } from '@/lib/api'

export default function Videos() {
  const [newVideoId, setNewVideoId] = useState('')
  const queryClient = useQueryClient()

  const { data: videos = [] } = useQuery({ 
    queryKey: ['videos'], 
    queryFn: getVideos,
    initialData: [],
  })

  const addVideoMutation = useMutation({
    mutationFn: addVideo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['videos'] })
      toast({ title: "Success", description: "Video added successfully." })
      setNewVideoId('')
    },
  })

  const deleteVideoMutation = useMutation({
    mutationFn: deleteVideo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['videos'] })
      toast({ title: "Success", description: "Video deleted successfully." })
    },
  })

  const handleAddVideo = () => {
    if (newVideoId.trim()) {
      addVideoMutation.mutate({ videoId: newVideoId.trim() })
    }
  }

  const handleDeleteVideo = (id) => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      deleteVideoMutation.mutate(id)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Videos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex mb-4 space-x-2">
          <Input
            placeholder="YouTube Video ID"
            value={newVideoId}
            onChange={(e) => setNewVideoId(e.target.value)}
          />
          <Button onClick={handleAddVideo}>Add Video</Button>
        </div>
        <ScrollArea className="h-[200px]">
          {videos.map((video) => (
            <div key={video.id} className="flex items-center justify-between mb-2">
              <span>{video.videoId}</span>
              <Button 
                variant="destructive" 
                onClick={() => handleDeleteVideo(video.id)}
              >
                Delete
              </Button>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
