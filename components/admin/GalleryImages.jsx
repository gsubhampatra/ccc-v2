'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "@/hooks/use-toast"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getGalleryImages, addGalleryImage, deleteGalleryImage } from '@/lib/api'
import { Textarea } from "@/components/ui/textarea"

export default function GalleryImages() {
  const [newImage, setNewImage] = useState({ imageUrl: '', description: '' })
  const queryClient = useQueryClient()

  const { data: galleryImages = [] } = useQuery({ queryKey: ['galleryImages'], queryFn: getGalleryImages })

  const addImageMutation = useMutation({
    mutationFn: addGalleryImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['galleryImages'] })
      toast({ title: "Success", description: "Image added successfully." })
      setNewImage({ imageUrl: '', description: '' })
    },
  })

  const deleteImageMutation = useMutation({
    mutationFn: deleteGalleryImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['galleryImages'] })
      toast({ title: "Success", description: "Image deleted successfully." })
    },
  })

  const handleAddImage = () => {
    if (newImage.imageUrl && newImage.description) {
      addImageMutation.mutate(newImage)
    } else {
      toast({ title: "Error", description: "Please provide both image URL and description.", variant: "destructive" })
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-gradient">Gallery Images</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 space-y-4">
          <Input
            placeholder="New image URL"
            value={newImage.imageUrl}
            onChange={(e) => setNewImage({ ...newImage, imageUrl: e.target.value })}
            className="w-full"
          />
          <Textarea
            placeholder="Image description"
            value={newImage.description}
            onChange={(e) => setNewImage({ ...newImage, description: e.target.value })}
            className="w-full"
          />
          <Button 
            onClick={handleAddImage}
            className="w-full text-white transition-all bg-gradient hover:opacity-90 hover:scale-105"
          >
            Add Image
          </Button>
        </div>
        <h3 className="mb-4 text-xl font-semibold text-gradient">Existing Gallery Images</h3>
        <ScrollArea className="h-[400px] w-full rounded-md border p-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            { galleryImages.length > 0 && galleryImages.map((image) => (
              <Card key={image.id} className="overflow-hidden">
                <img 
                  src={image.imageUrl} 
                  alt={image.description} 
                  className="object-cover w-full h-48"
                />
                <CardContent className="p-4">
                  <p className="mb-2 text-sm">{image.description}</p>
                  <Button 
                    variant="destructive" 
                    onClick={() => deleteImageMutation.mutate(image.id)}
                    className="w-full"
                  >
                    Delete
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
