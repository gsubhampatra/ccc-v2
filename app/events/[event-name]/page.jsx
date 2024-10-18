/*************  ✨ Codeium Command ⭐  *************/
import { useParams } from 'next/router'
import { eventDetails } from '@/lib/data/eventDetails'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

const registrationSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Must be a valid email address." }),
  phone: z.string().regex(/^\d{10}$/, { message: "Must be a valid phone number." }),
  whatsapp: z.boolean(),
  college: z.string().min(2, { message: "College name is required." }),
})

export default function EventPage() {
  const { eventName } = useParams()
  const event = eventDetails.find(event => event.name === eventName)
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registrationSchema),
  })

  if (!event) return <div>Event not found</div>

  const onSubmit = async (data) => {
    try {
      await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          whatsapp: data.whatsapp,
          college: data.college,
          eventName: event.name,
        }),
      })
      alert('Registration successful')
    } catch (error) {
      alert('Registration failed')
    }
  }

  return (
    <div className="max-w-2xl px-4 py-16 mx-auto sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 className="text-3xl font-bold">{event.name}</h1>
      <p className="mt-2 text-sm text-gray-600">{event.describe}</p>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormField>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input type="text" {...register('name')} />
            {errors.name && <FormMessage>{errors.name.message}</FormMessage>}
          </FormControl>
        </FormField>
        <FormField>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input type="email" {...register('email')} />
            {errors.email && <FormMessage>{errors.email.message}</FormMessage>}
          </FormControl>
        </FormField>
        <FormField>
          <FormLabel>Phone</FormLabel>
          <FormControl>
            <Input type="text" {...register('phone')} />
            {errors.phone && <FormMessage>{errors.phone.message}</FormMessage>}
          </FormControl>
        </FormField>
        <FormField>
          <FormLabel>WhatsApp</FormLabel>
          <FormControl>
            <Input type="checkbox" {...register('whatsapp')} />
            {errors.whatsapp && <FormMessage>{errors.whatsapp.message}</FormMessage>}
          </FormControl>
        </FormField>
        <FormField>
          <FormLabel>College</FormLabel>
          <FormControl>
            <Input type="text" {...register('college')} />
            {errors.college && <FormMessage>{errors.college.message}</FormMessage>}
          </FormControl>
        </FormField>
        <Button type="submit">Register</Button>
      </Form>
    </div>
  )
}
/******  17a288e2-f1be-47c4-913c-1d7451e16e3f  *******/
