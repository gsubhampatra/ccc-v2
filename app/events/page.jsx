'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Clock } from 'lucide-react'
import { eventDetails } from '@/lib/data/eventDetails'


export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState(null)

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
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
        {eventDetails.map((event, index) => (
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
                    src={event.logo}
                    alt={event.name}
                    className="absolute inset-0 object-cover w-full h-full rounded-t-lg"
                  />
                </div>
                <h1 className="text-xl font-bold text-gradient" >{event.name}</h1>
                <CardDescription>{event.short_desc}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="mb-4 text-sm text-gray-600">{event.describe}</p>
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
                <Button 
                  onClick={() => setSelectedEvent(selectedEvent === event.id ? null : event.id)}
                >
                  {selectedEvent === event.id ? 'Hide Details' : 'Show Details'}
                </Button>
              </CardFooter>
              {selectedEvent === event.id && (
                <motion.div 
                  className="px-4 pb-4"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-sm text-gray-600">{event.describe}</p>
                  {event.form_url && (
                    <Button className="mt-4" variant="outline" asChild>
                      <a href={event.form_url} target="_blank" rel="noopener noreferrer">
                        Register Now
                      </a>
                    </Button>
                  )}
                </motion.div>
              )}
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}