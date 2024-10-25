'use client'

import { getProjects } from '@/lib/api'
import ProjectCard from '@/components/ProjectCard'
import { useEffect, useState } from 'react'

export default function ProjectsPage() {
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects()
        setProjects(data)
        setIsLoading(false)
      } catch (err) {
        setError(err)
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (isLoading) return <div className="py-10 text-center">Loading projects...</div>
  if (error) return <div className="py-10 text-center text-red-500">Error loading projects: {error.message}</div>

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500/15 to-purple-500/15">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

        <div className="container relative px-4 py-16 mx-auto">
          <div className="relative z-10 mb-16 text-center">
            <h1 className="mb-6 text-5xl font-extrabold text-gradient">
              Our Projects
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              Explore the innovative projects created by our talented members. Each project showcases our commitment to excellence and creativity in technology.
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-700"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {projects.map((project) => (
              <div className="transition duration-500 transform hover:scale-105">
                <ProjectCard key={project.id} project={project} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

