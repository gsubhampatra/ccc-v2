'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, Linkedin } from 'lucide-react'
import { club_advisor_details, club_member_details } from '@/lib/data/memberDetails'
import { club_alumni_details } from '@/lib/data/alumniDetails'
import AOS from 'aos'
import 'aos/dist/aos.css' // Import AOS styles

export default function MembersPage() {
  const [filter, setFilter] = useState('all')

  // Initialize AOS on component mount
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in ms
      easing: 'ease-in-out', // Easing function for animations
      once: true, // Whether animation should happen only once
    })
  }, [])

  const filteredMembers = [...club_member_details, ...club_alumni_details].filter(member => {
    if (filter === 'all') return true
    if (filter === 'member') return member.status === 'member'
    if (filter === 'alumni') return member.status === 'alumni'
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
    <div className="min-h-screen px-4 py-12 my-20 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-500 to-purple-500">
      <h1 className="mb-12 text-4xl font-bold text-center text-white " data-aos="fade-up">
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

          onClick={() => setFilter('alumni')}
          variant={filter === 'alumni' ? 'default' : 'outline'}
        >
          Alumni
        </Button>
      </div>

      {/* Loop over sorted years and display members */}

      <div className='flex flex-wrap justify-center gap-5' >
        {
          club_advisor_details.map((member, index) => (
            <div key={member.id} className="mb-12" data-aos="fade-up">
              <h2 className="mb-6 text-2xl font-semibold text-white ">{member.member_type}</h2>
              <div
                key={member.id}
                className="transition-all duration-300 ease-in-out transform hover:scale-105"
                data-aos="fade-up"
                data-aos-delay={index * 100} // Staggered delay for items
              >
                <Card className="flex flex-col h-full p-6 shadow-md ">
                  <CardHeader className="flex flex-col items-center space-y-4">
                    <Avatar className="object-contain w-48 h-48">
                      <AvatarImage src={member.profile_img} alt={member.fullname} />
                      <AvatarFallback>{member.firstname[0]}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="mt-4 text-center text-gray-800">{member.fullname}</CardTitle>
                    <Badge className="bg-gradient-to-r from-blue-500 to-purple-500" >{member.member_type}</Badge>
                  </CardHeader>
                </Card>
              </div>
            </div>
          ))
        }
      </div>


      {sortedYears.map(year => (
        <div key={year} className="mb-12" data-aos="fade-up">
          <h2 className="mb-6 text-2xl font-semibold text-white ">Batch {year}</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {groupedMembers[year].map((member, index) => (
              <div
                key={member.id}
                className="transition-all duration-300 ease-in-out transform hover:scale-105"
                data-aos="fade-up"
                data-aos-delay={index * 100} // Staggered delay for items
              >
                <Card className="flex flex-col h-full shadow-md ">
                  <CardHeader className="flex flex-col items-center">
                    <Avatar className="w-32 h-32">
                      <AvatarImage src={member.profile_img} alt={member.fullname} />
                      <AvatarFallback>{member.firstname[0]}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="mt-4 text-center text-gray-800">{member.fullname}</CardTitle>
                    <Badge className="bg-gradient-to-r from-blue-500 to-purple-500" >{member.member_type}</Badge>
                  </CardHeader>
                  <CardContent className="flex-grow text-center">
                    <p className="text-sm text-gray-600">{member.description}</p>
                    <p className="mt-2 text-sm font-semibold text-gray-800">{member.desgination}</p>
                  </CardContent>
                  <CardFooter className="flex justify-center space-x-4">
                    {member.github_link && (
                      <Button variant="outline" size="icon" asChild>
                        <a href={member.github_link} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4" />
                          <span className="sr-only">GitHub</span>
                        </a>
                      </Button>
                    )}
                    {member.linkedln_link && (
                      <Button variant="outline" size="icon" asChild>
                        <a href={member.linkedln_link} target="_blank" rel="noopener noreferrer">
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
