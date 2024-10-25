'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, Linkedin } from 'lucide-react'
import { clubMembers, clubAdvisors } from '@/data/clubMembers'
import { getMembers } from '@/lib/api'
import Loader from '@/components/Loader'
import AOS from 'aos'
import 'aos/dist/aos.css' // Import AOS styles

export default function MembersPage() {
  const [filter, setFilter] = useState('all')
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)

  // Initialize AOS on component mount
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in ms
      easing: 'ease-in-out', // Easing function for animations
      once: true, // Whether animation should happen only once
    })

    async function fetchMembers() {
      try {
        const fetchedMembers = await getMembers()
        setMembers(fetchedMembers)
      } catch (error) {
        console.error("Failed to fetch members:", error)
        setMembers(clubMembers)
      } finally {
        setLoading(false)
      }
    }
    
    fetchMembers()
  }, [])

  const filteredMembers = members.filter(member => {
    if (filter === 'all') return member.type !== 'faculty'
    return member.type === filter
  })

  const groupedMembers = filteredMembers.reduce((acc, member) => {
    const batch = member.batch || 'Other'
    if (!acc[batch]) {
      acc[batch] = []
    }
    acc[batch].push(member)
    return acc
  }, {})

  const sortedBatches = Object.keys(groupedMembers).sort((a, b) => b - a)

  if (loading) {
    return <Loader />
  }

  return (
    <div className="min-h-screen px-4 py-12 my-20 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-500 to-purple-500">
      <h1 className="mb-12 text-4xl font-bold text-center text-white" data-aos="fade-up">
        Our Members
      </h1>
      <div className="flex justify-center mb-8 space-x-4" data-aos="fade-up">
        <Button
          className="rounded-xl"
          onClick={() => setFilter('all')}
          variant={filter === 'all' ? 'default' : 'outline'}
        >
          All
        </Button>
        <Button
          className="rounded-xl"
          onClick={() => setFilter('member')}
          variant={filter === 'member' ? 'default' : 'outline'}
        >
          Current Members
        </Button>
        <Button
          className="rounded-xl"
          onClick={() => setFilter('alumni')}
          variant={filter === 'alumni' ? 'default' : 'outline'}
        >
          Alumni
        </Button>
      </div>

      <div className='flex flex-wrap justify-center gap-5 mb-12' data-aos="fade-up">
        {clubAdvisors.map((advisor, index) => (
          <div key={index} className="w-full md:w-1/3 lg:w-1/4">
            <Card className="flex flex-col h-full p-6 shadow-md">
              <CardHeader className="flex flex-col items-center space-y-4">
                <Avatar className="object-contain w-48 h-48">
                  <AvatarImage className='object-cover' src={advisor.profilePhoto} alt={advisor.name} />
                  <AvatarFallback>{advisor.name[0]}</AvatarFallback>
                </Avatar>
                <CardTitle className="mt-4 text-center text-gray-800">{advisor.name}</CardTitle>
                <Badge className="bg-gradient-to-r from-blue-500 to-purple-500">{advisor.position}</Badge>
              </CardHeader>
              <CardContent className="flex-grow text-center">
                <p className="text-sm text-gray-600">{advisor.bio}</p>
                <p className="mt-2 text-sm font-semibold text-gray-800">{advisor.domain}</p>
              </CardContent>
             
            </Card>
          </div>
        ))}
      </div>

      {sortedBatches.map(batch => (
        <div key={batch} className="mb-12" data-aos="fade-up">
          <h2 className="mb-6 text-2xl font-semibold text-white">Batch {batch}</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {groupedMembers[batch].map((member, index) => (
              <div
                key={member.id || index}
                className="transition-all duration-300 ease-in-out transform hover:scale-105"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <Card className="flex flex-col h-full shadow-md">
                  <CardHeader className="flex flex-col items-center">
                    <Avatar className="w-32 h-32">
                      <AvatarImage src={member.profilePhoto} alt={member.name} />
                      <AvatarFallback>{member.name[0]}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="mt-4 text-center text-gray-800">{member.name}</CardTitle>
                    <Badge className="bg-gradient-to-r from-blue-500 to-purple-500">{member.position}</Badge>
                  </CardHeader>
                  <CardContent className="flex-grow text-center">
                    <p className="text-sm text-gray-600">{member.bio}</p>
                    <p className="mt-2 text-sm font-semibold text-gray-800">{member.domain}</p>
                  </CardContent>
                  <CardFooter className="flex justify-center space-x-4">
                    {member.github && (
                      <Button variant="outline" size="icon" asChild>
                        <a href={member.github} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4" />
                          <span className="sr-only">GitHub</span>
                        </a>
                      </Button>
                    )}
                    {member.linkedin && (
                      <Button variant="outline" size="icon" asChild>
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="w-4 h-4" />
                          <span className="sr-only">LinkedIn</span>
                        </a>
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
