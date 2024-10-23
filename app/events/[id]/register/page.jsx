'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"

export default function EventRegistrationPage() {
  const params = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData(e.target)
      const registrationData = {
        eventId: params.id,
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        college: formData.get('college'),
        year: formData.get('year'),
      }

      // Here you would typically make an API call to save the registration
      // await saveRegistration(registrationData)

      toast({
        title: "Registration Successful",
        description: "You have been successfully registered for the event.",
      })
      
      router.push('/events')

    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "There was an error processing your registration. Please try again.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

return (
    <div className="min-h-screen p-8 bg-blue-50">
        <Card className="max-w-2xl mx-auto my-8 shadow-xl md:my-20">
            <CardHeader>
                <CardTitle className="text-3xl text-gradient">Event Registration</CardTitle>
                <hr className='border-2 border-blue-500 ' />
            </CardHeader>
            <CardContent className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input 
                                id="name" 
                                name="name" 
                                required 
                                placeholder="Enter your full name"
                            />
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input 
                                id="email" 
                                name="email" 
                                type="email" 
                                required 
                                placeholder="Enter your email address"
                            />
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input 
                                id="phone" 
                                name="phone" 
                                required 
                                placeholder="Enter your phone number"
                            />
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="branch">Branch</Label>
                            <Input 
                                id="branch" 
                                name="branch" 
                                required 
                                placeholder="Enter your branch"
                            />
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="batch">Batch</Label>
                            <Input 
                                id="batch" 
                                name="batch" 
                                required 
                                placeholder="Enter your batch"
                            />
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="rollno">Roll No</Label>
                            <Input 
                                id="rollno" 
                                name="rollno" 
                                required 
                                placeholder="Enter your roll number"
                            />
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