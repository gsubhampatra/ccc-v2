'use client'

import { useState } from 'react'
import MembersSection from "./MembersSection"
import EventsSection from "./EventsSection"
import RegistrationsSection from "./RegistrationsSection"
import Achievements from "./Achievements"
import GalleryImages from "./GalleryImages"
import Winners from "./Winners"
import HiringStatus from "./HiringStatus"
import Videos from './Videos'
import Projects from './Projects'

const sections = [
  { name: 'Members', component: MembersSection },
  { name: 'Events', component: EventsSection },
  { name: 'Registrations', component: RegistrationsSection },
  { name: 'Achievements', component: Achievements },
  { name: 'Gallery Images', component: GalleryImages },
  { name: 'Winners', component: Winners },
  { name: 'Hiring Status', component: HiringStatus },
  { name: 'Videos', component: Videos },
  {name:'Projects', component: Projects}
]

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState('Members')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const ActiveComponent = sections.find(section => section.name === activeSection)?.component

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-grow overflow-hidden">
        {/* Sidebar for larger screens */}
        <div className="hidden w-64 p-4 overflow-y-auto md:block">
          <h2 className="mb-4 text-xl font-semibold text-gradient">Sections</h2>
          <ul className="space-y-2">
            {sections.map((section) => (
              <li key={section.name}>
                <button
                  className={`w-full p-2 text-left  rounded hover:bg-gradient hover:text-white ${activeSection === section.name ? 'bg-gradient text-white' : ''}`}
                  onClick={() => setActiveSection(section.name)}
                >
                  {section.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile sidebar toggle */}
        <button
          className="fixed z-20 p-2 bg-gray-200 rounded md:hidden top-4 left-4"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          ☰
        </button>

        {/* Mobile sidebar */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-10 p-4 overflow-y-auto bg-gray-100 md:hidden">
            <h2 className="mb-4 text-xl font-semibold tetx-gradeint">Admin Panel</h2>
            <ul className="space-y-2">
              {sections.map((section) => (
                <li key={section.name}>
                  <button
                    className={`w-full p-2 text-left rounded hover:bg-gray-200 ${activeSection === section.name ? 'bg-gray-200' : ''}`}
                    onClick={() => {
                      setActiveSection(section.name)
                      setIsSidebarOpen(false)
                    }}
                  >
                    {section.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Main content area */}

        <div className="flex-grow p-4 overflow-y-auto">
          <h1 className="w-full p-4 text-3xl font-bold text-center text-gradient">Dashboard</h1>

          {ActiveComponent && <ActiveComponent />}
        </div>
      </div>
    </div>
  )
}
