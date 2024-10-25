'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"

export default function AddAdmin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('/api/admin/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })
            const data = await response.json()
            if (data.success) {
                toast({ title: "Success", description: "New admin added successfully" })
                setEmail('')
                setPassword('')
            } else {
                toast({ title: "Error", description: data.message, variant: "destructive" })
            }
        } catch (error) {
            toast({ title: "Error", description: "An error occurred", variant: "destructive" })
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Add New Admin</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
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
                    <Button type="submit">Add Admin</Button>
                </form>
            </CardContent>
        </Card>
    )
}
