'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })
            const data = await response.json()

            if (data.success === true) {
                router.push('/admin')
            } else {
                toast({ title: "Error", description: data.message, variant: "destructive" })
            }
        } catch (error) {
            toast({ title: "Error", description: "An error occurred", variant: "destructive" })
        } finally {
            setLoading(false)
        }
    }

    if (!showLogin) {
        return (
            <div
                className="flex items-center justify-center min-h-screen bg-black"

            >
                <div onDoubleClick={() => setShowLogin(true)}  className="text-2xl text-gray-100 font-mono select-none">404 Not Found</div>
            </div>
        )
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Admin Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={loading}
                            />
                        </div>
                        <div>
                            <Input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={loading}
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full text-white bg-gradient"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Logging in...
                                </>
                            ) : (
                                'Login'
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
