import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registrationSchema } from '@/lib/schemas'
import { registerForEvent } from '@/lib/api'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"

export default function RegistrationsSection() {
  const form = useForm({
    resolver: zodResolver(registrationSchema),
  })

  const onSubmit = async (data) => {
    try {
      await registerForEvent(data)
      toast({ title: "Success", description: "Registered for event successfully." })
      form.reset()
    } catch (error) {
      toast({ title: "Error", description: "Failed to register for event.", variant: "destructive" })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Registrations</CardTitle>
        <CardDescription>Manage event registrations</CardDescription>
      </CardHeader>
      <CardContent>
        <h3 className="mb-4 text-lg font-semibold">New Registration</h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Add form fields here */}
            <Button className="bg-gradient" type="submit">Register</Button>
          </form>
        </Form>
        {/* Add a list or table of existing registrations here */}
      </CardContent>
    </Card>
  )
}
