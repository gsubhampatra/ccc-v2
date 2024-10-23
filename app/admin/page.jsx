'use client'

import { useState } from 'react'
import Sidebar from '@/components/admin/Sidebar'
import Dashboard from '@/components/admin/Dashboard'
import MembersSection from '@/components/admin/MembersSection'
import EventsSection from '@/components/admin/EventsSection'
import RegistrationsSection from '@/components/admin/RegistrationsSection'

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState('dashboard')

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />
      case 'members':
        return <MembersSection />
      case 'events':
        return <EventsSection />
      case 'registrations':
        return <RegistrationsSection />
      default:
        return null
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="flex-1 p-10 overflow-auto">
        {renderContent()}
      </div>
    </div>
  )
}
