'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"

export default function AddAdmin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [admins, setAdmins] = useState([])
    const [allPasswords, setAllPasswords] = useState('')

    const fetchAdmins = async () => {
        try {
            const response = await fetch('/api/admin')
            const data = await response.json()
            if (data.success) {
                setAdmins(data.data)
            }
        } catch (error) {
            toast({ title: "Error", description: "Failed to fetch admins", variant: "destructive" })
        }
    }

    useEffect(() => {
        fetchAdmins()
    }, [])

    const handleDelete = async (id) => {
        try {
            console.log(id)
            const response = await fetch(`/api/admin/add/${id}`, {
                method: 'DELETE'
            })
            const data = await response.json()
            if (data.success) {
                toast({ title: "Success", description: "Admin deleted successfully" })
                fetchAdmins()
            } else {
                toast({ title: "Error", description: data.message, variant: "destructive" })
            }
        } catch (error) {
            toast({ title: "Error", description: "Failed to delete admin", variant: "destructive" })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('/api/admin/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            })
            const data = await response.json()
            if (data.success) {
                toast({ title: "Success", description: "New admin added successfully" })
                setEmail('')
                setPassword('')
                setName('')
                fetchAdmins()
            } else {
                toast({ title: "Error", description: data.message, variant: "destructive" })
            }
        } catch (error) {
            toast({ title: "Error", description: "An error occurred", variant: "destructive" })
        }
    }

    const handleChangeAllPasswords = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('/api/admin/add', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            })
            const data = await response.json()
            if (data.success) {
                toast({ title: "Success", description: "All admin passwords updated successfully" })
                setPassword('')
            } else {
                toast({ title: "Error", description: data.message, variant: "destructive" })
            }
        } catch (error) {
            toast({ title: "Error", description: "Failed to update passwords", variant: "destructive" })
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Super Admin</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button type="submit" className="rounded-xl bg-gradient">Add Admin</Button>
                </form>

                <div className="mt-8">
                    <h3 className="mb-4 text-lg font-semibold">Current Admins</h3>
                    <div className="space-y-2">
                        {admins.map((admin, index) => (
                            <div key={index} className="flex items-center justify-between p-2 border rounded">
                                <span>{admin.email}</span>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleDelete(admin.id)}
                                >
                                    Delete
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
                <form onSubmit={handleChangeAllPasswords} className="mt-8">
                    <h3 className="mb-4 text-lg font-semibold">Change All Admin Passwords</h3>
                    <Input
                        type="password"
                        placeholder="New Password"
                        value={allPasswords}
                        onChange={(e) => setAllPasswords(e.target.value)}
                        required
                    />
                    <Button type="submit">Change All Passwords</Button>
                </form>

            </CardContent>
        </Card>
    )
}
