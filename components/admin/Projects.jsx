'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getProjects, getMembers, addProject, updateProject, deleteProject } from '@/lib/api'

export default function Projects() {
    const queryClient = useQueryClient()
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        imageUrl: '',
        githubLink: '',
        liveDemoLink: '',
        memberId: ''
    })
    const [editingId, setEditingId] = useState(null)

    const { data: projects = [] } = useQuery({
        queryKey: ['projects'],
        queryFn: getProjects
    })

    const { data: members = [] } = useQuery({
        queryKey: ['members'],
        queryFn: getMembers
    })

    const createProjectMutation = useMutation({
        mutationFn: addProject,
        onSuccess: () => {
            queryClient.invalidateQueries(['projects'])
            resetForm()
        }
    })

    const updateProjectMutation = useMutation({
        mutationFn: (data) => updateProject(data.id, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['projects'])
            resetForm()
        }
    })

    const deleteProjectMutation = useMutation({
        mutationFn: (id) => deleteProject(id),
        onSuccess: () => {
            queryClient.invalidateQueries(['projects'])
        },
        onError: (error) => {
            console.error('Error deleting project:', error)
        }
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSelectChange = (value) => {
        setFormData({ ...formData, memberId: value })
    }

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            imageUrl: '',
            githubLink: '',
            liveDemoLink: '',
            memberId: ''
        })
        setEditingId(null)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (editingId) {
            updateProjectMutation.mutate({ ...formData, id: editingId })
        } else {
            createProjectMutation.mutate(formData)
        }
    }

    const handleEdit = (project) => {
        setFormData({
            title: project.title,
            description: project.description,
            imageUrl: project.imageUrl,
            githubLink: project.githubLink,
            liveDemoLink: project.liveDemoLink,
            memberId: project.memberId
        })
        setEditingId(project.id)
    }

    const handleDelete = (id) => {
        deleteProjectMutation.mutate(id)
    }

    return (
        <div className="container p-4 mx-auto">
            <h1 className="mb-4 text-2xl font-bold">Manage Projects</h1>

            <form onSubmit={handleSubmit} className="mb-8 space-y-4">
                <Input
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Project Title"
                    required
                />
                <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Project Description"
                    required
                />
                <Input
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    placeholder="Image URL"
                />
                <Input
                    name="githubLink"
                    value={formData.githubLink}
                    onChange={handleInputChange}
                    placeholder="GitHub Link"
                    required
                />
                <Input
                    name="liveDemoLink"
                    value={formData.liveDemoLink}
                    onChange={handleInputChange}
                    placeholder="Live Demo Link"
                />
                <Select onValueChange={handleSelectChange} value={formData.memberId}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a member" />
                    </SelectTrigger>
                    <SelectContent>
                        {members && members.map((member) => (
                            <SelectItem key={member.id} value={member.id}>
                                {member.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Button type="submit">{editingId ? 'Update' : 'Add'} Project</Button>
            </form>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Image</TableHead>
                        <TableHead>GitHub Link</TableHead>
                        <TableHead>Live Demo</TableHead>
                        <TableHead>Member</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {projects.map((project) => (
                        <TableRow key={project.id}>
                            <TableCell>{project.title}</TableCell>
                            <TableCell>{project.description}</TableCell>
                            <TableCell>
                                <img src={project.imageUrl} alt={project.title} className="object-cover w-24 h-24" />
                            </TableCell>
                            <TableCell>{project.githubLink}</TableCell>
                            <TableCell>{project.liveDemoLink}</TableCell>
                            <TableCell>{project.memberName}</TableCell>
                            <TableCell>
                                <Button onClick={() => handleEdit(project)} className="mr-2">Edit</Button>
                                <Button onClick={() => handleDelete(project.id)} variant="destructive">Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
