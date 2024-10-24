'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Clock } from 'lucide-react'
import { eventDetails } from '@/lib/data/eventDetails'
import Link from 'next/link'
import { getEvents } from '@/lib/api'

export default function EventsPage() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const fetchedEvents = await getEvents()
        setEvents(fetchedEvents)
      } catch (error) {
        console.error("Failed to fetch events from API, using local data:", error)
        setEvents(eventDetails)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen px-4 py-12 bg-gray-100 md:my-10 sm:px-6 lg:px-8">
      <motion.h1 
        className="mb-12 text-4xl font-bold text-center text-gradient"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Our Events
      </motion.h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.1 }}
          >
            <Card className="flex flex-col h-full shadow-md hover:shadow-xl hover:shadow-purple-300 shadow-purple-200">
              <CardHeader>
                <div className="relative h-48 mb-4">
                  <img
                    src={event?.posterUrl || event?.logo}
                    alt={event.name}
                    className="absolute inset-0 object-cover w-full h-full rounded-t-lg"
                  />
                </div>
                <h1 className="text-xl font-bold text-gradient" >{event.name}</h1>
                <CardDescription>{event.short_desc}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="mb-4 text-sm text-gray-600">{event?.description}</p>
                <div className="flex items-center mb-2">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-sm">{event.date}</span>
                </div>
                {event.time && (
                  <div className="flex items-center mb-2">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="text-sm">{event.time}</span>
                  </div>
                )}
                <div className="flex items-center mb-2">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="text-sm">{event.venue}</span>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <Badge variant="secondary">{event.event_type}</Badge>
                {event?.is_registration_open || event?.isRegistrationOpen ? (
                  <Button className="mt-4 text-white transition-all bg-gradient hover:text-sky-50 hover:shadow-lg hover:scale-105" asChild>
                    <Link href={`/events/${event.id}/register`}>
                      Register Now
                    </Link>
                  </Button>
                ) : (
                  <Button className="mt-4" variant="destructive">
                    Registration Closed
                  </Button>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
