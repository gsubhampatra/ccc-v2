'use client'

import { getProjects } from '@/lib/api'
import ProjectCard from '@/components/ProjectCard'
import { useEffect, useState } from 'react'
import Loader from '@/components/Loader'

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

  if (isLoading) return <Loader />
  if (error) return <div className="py-10 text-center text-red-500">Error loading projects: {error.message}</div>

  return (
    <div className="min-h-screen my-10 bg-slate-50 md:py-16">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="container relative px-4 mx-auto">
          <div className="relative z-10 mb-10 text-center">
            <h1 className="mb-6 text-3xl font-extrabold md:text-4xl text-gradient">
              Our Projects
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              Explore the innovative projects created by our talented members. Each project showcases our commitment to excellence and creativity in technology.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 px-4 py-8 mx-auto md:mx-10 md:px-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {projects.map((project,i) => (
              <div key={i} className="transition duration-500 transform hover:scale-102">
                <ProjectCard key={project.id} project={project} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

