'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Clock } from 'lucide-react'
import { eventDetails } from '@/data/eventDetails'
import Link from 'next/link'
import { getEvents } from '@/lib/api'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Loader from '@/components/Loader'

export default function EventsPage() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    })

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
    return <Loader />
  }

  return (
    <div className="min-h-screen px-4 py-12 bg-purple-50 md:my-16 sm:px-6 lg:px-8">
      <h1
        className="mb-12 text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600"
        data-aos="fade-down"
      >
        Our Events
      </h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event, index) => (
          <Card
            key={event.id}
            className="overflow-hidden transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <CardHeader className="p-0">
              <div className="relative h-48">
                <img
                  src={event.posterUrl}
                  alt={event.title}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                  <CardTitle className="absolute bottom-0 left-0 p-4 text-xl font-bold text-white">
                    {event.title}
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <p className="mb-4 text-sm text-gray-600 line-clamp-3">{event.description}</p>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{event.date}</span>
                </div>
                {event.time && (
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{event.time}</span>
                  </div>
                )}
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{event.venue}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between p-4 bg-gray-50">
              <Badge className={event.type === 'Previous' ? 'bg-gray-500 text-white rounded-xl' : 'bg-gradient rounded-xl text-white'}>
                {event.type}
              </Badge>
              {event.isRegistrationOpen ? (
                <Button
                  className="text-white transition-all rounded-md bg-gradient"
                  asChild
                >
                  <Link href={`/events/${event.id}/register`}>
                    Register Now
                  </Link>
                </Button>
              ) : (
                <Button variant="outline" disabled>
                  Registration Closed
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
