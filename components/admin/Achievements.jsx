'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "@/hooks/use-toast"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAchievements, addAchievement, deleteAchievement, updateAchievement } from '@/lib/api'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const achievementSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  date: z.string().min(1, "Date is required"),
  imageUrl: z.string().url("Must be a valid URL").min(1, "Image URL is required"),
})

export default function Achievements() {
  const [editingAchievement, setEditingAchievement] = useState(null)
  const queryClient = useQueryClient()

  const form = useForm({
    resolver: zodResolver(achievementSchema),
    defaultValues: {
      title: '',
      description: '',
      date: '',
      imageUrl: '',
    },
  })

  const { data: achievements = [] } = useQuery({ queryKey: ['achievements'], queryFn: getAchievements })

  const addAchievementMutation = useMutation({
    mutationFn: addAchievement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['achievements'] })
      toast({ title: "Success", description: "Achievement added successfully." })
      form.reset()
    },
  })

  const updateAchievementMutation = useMutation({
    mutationFn: ({ id, ...data }) => updateAchievement(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['achievements'] })
      toast({ title: "Success", description: "Achievement updated successfully." })
      setEditingAchievement(null)
      form.reset()
    },
  })

  const deleteAchievementMutation = useMutation({
    mutationFn: deleteAchievement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['achievements'] })
      toast({ title: "Success", description: "Achievement deleted successfully." })
    },
  })

  const onSubmit = (data) => {
    if (editingAchievement) {
      updateAchievementMutation.mutate({ id: editingAchievement.id, ...data })
    } else {
      addAchievementMutation.mutate(data)
    }
  }

  const handleEdit = (achievement) => {
    setEditingAchievement(achievement)
    form.reset({
      title: achievement.title,
      description: achievement.description,
      date: achievement.date,
      imageUrl: achievement.imageUrl,
    })
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-gradient">{editingAchievement ? 'Edit Achievement' : 'Add New Achievement'}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
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
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="text-white bg-gradient" type="submit">{editingAchievement ? 'Update Achievement' : 'Add Achievement'}</Button>
            {editingAchievement && (
              <Button type="button" variant="outline" onClick={() => {
                setEditingAchievement(null)
                form.reset()
              }}>
                Cancel Edit
              </Button>
            )}
          </form>
        </Form>

        <h3 className="mt-8 mb-4 text-xl font-semibold text-gradient">Existing Achievements</h3>
        <ScrollArea className="h-[400px]">
          {achievements.map((achievement) => (
            <Card key={achievement.id} className="p-4 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-semibold">{achievement.title}</h4>
                  <p className="text-sm text-gray-500">{format(new Date(achievement.date), 'MMMM d, yyyy')}</p>
                </div>
                <div>
                  <Button variant="outline" className="mr-2" onClick={() => handleEdit(achievement)}>Edit</Button>
                  <Button variant="destructive" onClick={() => deleteAchievementMutation.mutate(achievement.id)}>Delete</Button>
                </div>
              </div>
              <p className="mt-2">{achievement.description}</p>
              <img src={achievement.imageUrl} alt={achievement.title} className="object-cover w-full h-40 mt-2 rounded" />
            </Card>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
