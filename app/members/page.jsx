'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, Linkedin } from 'lucide-react'
import { club_member_details } from '@/lib/data/memberDetails'

export default function MembersPage() {
  const [filter, setFilter] = useState('all')

  const filteredMembers = club_member_details.filter(member => {
    if (filter === 'all') return true
    if (filter === 'student') return member.member === 'student'
    if (filter === 'alumni') return member.member === 'alumni'
    return true
  })

  const groupedMembers = filteredMembers.reduce((acc, member) => {
    const year = member.year
    if (!acc[year]) {
      acc[year] = []
    }
    acc[year].push(member)
    return acc
  }, {})

  const sortedYears = Object.keys(groupedMembers).sort((a, b) => b - a)

  return (
    <div className="min-h-screen px-4 py-12 bg-gradient-to-r from-blue-500 to-purple-500 sm:px-6 lg:px-8">
      <motion.h1 
        className="mb-12 text-4xl font-bold text-center text-white"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Our Members
      </motion.h1>
      <div className="flex justify-center mb-8 space-x-4">
        <Button 
          onClick={() => setFilter('all')} 
          variant={filter === 'all' ? 'default' : 'outline'}
        >
          All
        </Button>
        <Button 
          onClick={() => setFilter('student')} 
          variant={filter === 'student' ? 'default' : 'outline'}
        >
          Students
        </Button>
        <Button 
          onClick={() => setFilter('alumni')} 
          variant={filter === 'alumni' ? 'default' : 'outline'}
        >
          Alumni
        </Button>
      </div>
      {sortedYears.map(year => (
        <div key={year} className="mb-12">
          <h2 className="mb-6 text-2xl font-semibold text-white">Batch {year}</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {groupedMembers[year].map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="flex flex-col h-full">
                  <CardHeader className="flex flex-col items-center">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={member.profile_img} alt={member.fullname} />
                      <AvatarFallback>{member.firstname[0]}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="mt-4 text-center">{member.fullname}</CardTitle>
                    <Badge>{member.member_type}</Badge>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-center text-gray-600">{member.description}</p>
                    <p className="mt-2 text-sm font-semibold text-center">{member.desgination}</p>
                  </CardContent>
                  <CardFooter className="flex justify-center space-x-4">
                    <Button variant="outline" size="icon" asChild>
                      <a href={member.github_link} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4" />
                        <span className="sr-only">GitHub</span>
                      </a>
                    </Button>
                    <Button variant="outline" size="icon" asChild>
                      <a href={member.linkedln_link} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="w-4 h-4" />
                        <span className="sr-only">LinkedIn</span>
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}