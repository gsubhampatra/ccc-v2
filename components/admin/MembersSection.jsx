'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "@/hooks/use-toast"
import { addMember, getMembers, updateMember, deleteMember } from '@/lib/api'
import { memberSchema } from '@/lib/schemas'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export default function MembersSection() {
    const [editingMember, setEditingMember] = useState(null)
    const queryClient = useQueryClient()

    const { data: members, isLoading, error } = useQuery({
        queryKey: ['members'],
        queryFn: getMembers,
    })

    const form = useForm({
        resolver: zodResolver(memberSchema),
        defaultValues: {
            name: '',
            bio: '',
            domain: '',
            type: '',
            position: '',
            profilePhoto: '',
            github: '',
            linkedin: '',
            batch: '',
        },
    })

    const addMutation = useMutation({
        mutationFn: addMember,
        onSuccess: () => {
            queryClient.invalidateQueries(['members'])
            toast({ title: "Success", description: "Member added successfully." })
            form.reset()
        },
        onError: () => {
            toast({ title: "Error", description: "Failed to add member.", variant: "destructive" })
        },
    })

    const updateMutation = useMutation({
        mutationFn: ({ id, ...data }) => updateMember(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['members'])
            toast({ title: "Success", description: "Member updated successfully." })
            setEditingMember(null)
            form.reset()
        },
        onError: () => {
            toast({ title: "Error", description: "Failed to update member.", variant: "destructive" })
        },
    })

    const deleteMutation = useMutation({
        mutationFn: deleteMember,
        onSuccess: () => {
            queryClient.invalidateQueries(['members'])
            toast({ title: "Success", description: "Member deleted successfully." })
        },
        onError: () => {
            toast({ title: "Error", description: "Failed to delete member.", variant: "destructive" })
        },
    })

    const onSubmit = (data) => {
        if (editingMember) {
            updateMutation.mutate({ id: editingMember.id, ...data })
        } else {
            addMutation.mutate(data)
        }
    }

    const handleEdit = (member) => {
        setEditingMember(member)
        form.reset(member)
    }

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this member?')) {
            deleteMutation.mutate(id)
        }
    }

    const handleCancelEdit = () => {
        setEditingMember(null)
        form.reset()
    }

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>An error occurred: {error.message}</div>

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-gradient">Members</CardTitle>
                <CardDescription>Manage club members</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Member name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="domain"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Designation</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Member Domain" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="bio"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bio</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Member bio" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Type</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select member type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="member">Member</SelectItem>
                                                <SelectItem value="alumni">Alumni</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="batch"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Batch</FormLabel>
                                        <FormControl>
                                            <Input placeholder="2023" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div>
                            <FormField
                                control={form.control}
                                name="position"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Position</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter position" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="profilePhoto"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Profile Photo URL</FormLabel>
                                        <FormControl>
                                            <Input placeholder="https://example.com/photo.jpg" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="github"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>GitHub URL</FormLabel>
                                        <FormControl>
                                            <Input placeholder="https://github.com/username" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="linkedin"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>LinkedIn URL</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://linkedin.com/in/username" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                     
                        <div className="flex justify-end space-x-2">
                            {editingMember && (
                                <Button type="button" variant="outline" onClick={handleCancelEdit}>
                                    Cancel Edit
                                </Button>
                            )}
                            <Button className="bg-gradient" type="submit">
                                {editingMember ? 'Update Member' : 'Add Member'}
                            </Button>
                        </div>
                    </form>
                </Form>

                <h3 className="mt-8 mb-4 text-xl font-semibold">Existing Members</h3>
                {members && members.length > 0 ? (
                    <ScrollArea className="h-[400px] w-full rounded-md border">
                        <div className="p-4">
                            {members.map((member) => (
                                <Card key={member.id} className="p-4 mb-4">
                                    <div className="flex flex-row items-center justify-evenly">
                                    <img src={member.profilePhoto || 'https://img.freepik.com/premium-photo/technical-writer-digital-avatar-generative-ai_934475-9296.jpg'} alt={member.name} width={100} height={100} className="rounded-full" />
                                    <div>
                                    <div className="flex flex-col">
                                        <h4 className="text-lg font-semibold">{member.name}</h4>
                                        <p className="text-sm text-gray-500">{member.domain}</p>
                                    </div>

                                    <p className="max-w-xs text-sm line-clamp-1">{member.bio}</p>
                                    <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                                        <p><strong>Position:</strong> {member.position}</p>
                                        <p><strong>Type:</strong> {member.type}</p>
                                        <p><strong>Batch:</strong> {member.batch}</p>
                                    </div>
                                    </div>
                                    </div>
                                    <div className="flex justify-end mt-4 space-x-2">
                                        <Button variant="outline" onClick={() => handleEdit(member)}>Edit</Button>
                                        <Button variant="destructive" onClick={() => handleDelete(member.id)}>Delete</Button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </ScrollArea>
                ) : (
                    <p>No members found.</p>
                )}
            </CardContent>
        </Card>
    )
}