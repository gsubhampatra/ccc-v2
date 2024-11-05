'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import { Confetti } from "@/components/ui/confetti"
import { registrationSchema } from '@/lib/schemas'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export default function EventRegistrationPage() {
    const params = useParams()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [event, setEvent] = useState(null)
    const [registered, setRegistered] = useState(false)
    const [registrationData, setRegistrationData] = useState(null)

    const form = useForm({
        resolver: zodResolver(registrationSchema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            branch: '',
            batch: '',
            rollno: '',
            busStop: '',
            utrNumber: '',
            eventId: params.id
        }
    })

    useEffect(() => {
        const currentEvent = params.id
        if (currentEvent) {
            setEvent(currentEvent)
            // Check if already registered
            const storedRegistrations = JSON.parse(localStorage.getItem('eventRegistrations') || '{}')
            if (storedRegistrations[currentEvent]) {
                setRegistered(true)
                setRegistrationData(storedRegistrations[currentEvent])
            }
        } else {
            router.push('/events')
        }
    }, [params.id, router])

    const onSubmit = async (data) => {
        setLoading(true)

        try {
            const newRegistrationData = {
                eventId: params.id,
                name: data.name,
                email: data.email,
                registrationDetails: {
                    phone: data.phone,
                    branch: data.branch,
                    batch: data.batch,
                    rollno: data.rollno,
                    utrNumber: data.utrNumber,
                    busStop: data.busStop || null,
                },
            }

            const response = await fetch('/api/registrations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newRegistrationData),
            })

            if (!response.ok) {
                throw new Error('Registration failed')
            }

            // Save to localStorage
            const storedRegistrations = JSON.parse(localStorage.getItem('eventRegistrations') || '{}')
            storedRegistrations[params.id] = newRegistrationData
            localStorage.setItem('eventRegistrations', JSON.stringify(storedRegistrations))

            setRegistrationData(newRegistrationData)
            setRegistered(true)

            toast({
                title: "Registration Successful",
                description: "You have been successfully registered for the event.",
            })

        } catch (error) {
            toast({
                title: "Registration Failed",
                description: error.message || "There was an error processing your registration. Please try again.",
                variant: "destructive"
            })
        } finally {
            setLoading(false)
        }
    }

    if (!event) {
        return <div>Loading...</div>
    }

    if (registered && registrationData) {
        return (
            <div className="min-h-screen p-8 bg-blue-50">
                <Confetti />
                <Card className="max-w-2xl mx-auto my-8 shadow-xl md:my-20">
                    <CardHeader>
                        <CardTitle className="text-3xl text-gradient">Registration Successful!</CardTitle>
                        <hr className='border-2 border-blue-500' />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="p-4 text-center rounded-lg bg-gradient">
                            <h3 className="mb-4 text-xl font-semibold text-white">Registration Details</h3>
                            <div className="text-left text-white">
                                <p><span className="font-semibold">Name:</span> {registrationData.name}</p>
                                <p><span className="font-semibold">Email:</span> {registrationData.email}</p>
                                <p><span className="font-semibold">Phone:</span> {registrationData.registrationDetails.phone}</p>
                                <p><span className="font-semibold">Branch:</span> {registrationData.registrationDetails.branch}</p>
                                <p><span className="font-semibold">Batch:</span> {registrationData.registrationDetails.batch}</p>
                                <p><span className="font-semibold">Roll No:</span> {registrationData.registrationDetails.rollno}</p>
                                <p><span className="font-semibold">UTR Number:</span> {registrationData.registrationDetails.utrNumber}</p>
                            </div>
                        </div>
                        <Button
                            onClick={() => router.push('/events')}
                            className="w-full transition-all bg-gradient hover:bg-gradient hover:scale-105"
                        >
                            Back to Events
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen p-8 bg-blue-50">
            <Card className="max-w-2xl mx-auto my-8 shadow-xl md:my-20">
                <CardHeader>
                    <CardTitle className="text-3xl text-gradient">Register For the Event</CardTitle>
                    <hr className='border-2 border-blue-500' />
                </CardHeader>
                <CardContent className="space-y-4">
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    {...form.register('name')}
                                    placeholder="Enter your full name"
                                />
                                {form.formState.errors.name && (
                                    <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    {...form.register('email')}
                                    type="email"
                                    placeholder="example@nist.edu"
                                />
                                {form.formState.errors.email && (
                                    <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input
                                    {...form.register('phone')}
                                    placeholder="Enter your phone number"
                                />
                                {form.formState.errors.phone && (
                                    <p className="text-sm text-red-500">{form.formState.errors.phone.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="branch">Branch</Label>
                                <Input
                                    {...form.register('branch')}
                                    placeholder="Enter your branch"
                                />
                                {form.formState.errors.branch && (
                                    <p className="text-sm text-red-500">{form.formState.errors.branch.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="batch">Batch</Label>
                                <Input
                                    {...form.register('batch')}
                                    placeholder="Enter your batch"
                                />
                                {form.formState.errors.batch && (
                                    <p className="text-sm text-red-500">{form.formState.errors.batch.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="rollno">Roll No</Label>
                                <Input
                                    {...form.register('rollno')}
                                    placeholder="Enter your roll number"
                                />
                                {form.formState.errors.rollno && (
                                    <p className="text-sm text-red-500">{form.formState.errors.rollno.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="busStop">Bus Stop (Optional)</Label>
                                <Input
                                    {...form.register('busStop')}
                                    placeholder="Enter your bus stop if you're a local"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="utrNumber">UTR Number (12 digits)</Label>
                                <Input
                                    {...form.register('utrNumber', {
                                        pattern: {
                                            value: /^\d{12}$/,
                                            message: "UTR number must be exactly 12 digits"
                                        }
                                    })}
                                    placeholder="Enter 12-digit UTR number"
                                />
                                {form.formState.errors.utrNumber && (
                                    <p className="text-sm text-red-500">{form.formState.errors.utrNumber.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-lg">
                                <img 
                                    src="https://i.ibb.co/Srvsd02/Whats-App-Image-2024-11-05-at-12-40-04-PM.jpg" 
                                    alt="Payment QR Code"
                                    width={200}
                                    height={200}
                                    className="mb-2"
                                />
                                <p className="text-sm text-gray-500 text-center">
                                    Scan this QR code to make the payment
                                </p>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full transition-all bg-gradient hover:bg-gradient hover:scale-105"
                            disabled={loading}
                        >
                            {loading ? 'Submitting...' : 'Register for Event'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
