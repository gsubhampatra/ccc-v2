'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'
import { toast } from "@/hooks/use-toast"

export default function Footer() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      toast({
        title: "Success",
        description: "Your message has been sent successfully!",
      })

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        message: '',
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>

      <footer className="md:px-10 py-12 text-white bg-[#170A59]">
        <div className="container flex flex-wrap px-5 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full mb-8 lg:w-1/2 lg:mb-0"
          >
            <div className="flex items-center mb-6">

              <span className="text-2xl font-bold">NIST CCC</span>
            </div>
            <nav className="grid grid-cols-2 gap-4">
              {['Members', 'Events', 'Privacy-Policy', 'Tech', 'Blogs', 'Hiring', 'Developers', 'Gallery', 'Projects'].map((item) => (
                <motion.a
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="text-lg transition-colors duration-200 hover:text-blue-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                </motion.a>
              ))}
            </nav>
          </motion.div>
          <div

            className="w-full p-10 bg-white border shadow-xl text-sky-900 border-sky-900 lg:w-1/3 md:-mt-28 rounded-2xl"
          >
            <h2 className="mb-6 text-2xl font-bold " id='contact'>Contact Here</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-1/2 px-4 py-2 rounded-lg bg-sky-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  required
                  disabled={isSubmitting}
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-1/2 px-4 py-2 rounded-lg bg-sky-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-md bg-sky-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
                disabled={isSubmitting}
              />
              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full h-32 px-4 py-2 rounded-md resize-none bg-sky-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
                disabled={isSubmitting}
              ></textarea>
              <motion.button
                type="submit"
                className="flex items-center justify-center w-full px-4 py-2 text-white transition-colors duration-200 bg-blue-500 rounded-xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Submit'}
                <Send className="w-4 h-4 ml-2" />
              </motion.button>
            </form>
          </div>
        </div>

      </footer>
      <div
        className='p-1 bg-gradient'
      >
        <p className="text-center text-white">© 2023 NIST CCC. All rights reserved.</p>
      </div>
    </>

  )
}