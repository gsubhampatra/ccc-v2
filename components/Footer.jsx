'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'

export default function Footer() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log('Form submitted:', formData)
  }

  return (
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
            {['Members', 'Events', 'Privacy', 'Tech', 'Blogs', 'Hiring', 'Developer'].map((item) => (
              <motion.a
                key={item}
                href="#"
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
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-1/2 px-4 py-2 rounded-lg bg-sky-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
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
            />
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleInputChange}
              className="w-full h-32 px-4 py-2 rounded-md resize-none bg-sky-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            ></textarea>
            <motion.button
              type="submit"
              className="flex items-center justify-center w-full px-4 py-2 text-white transition-colors duration-200 bg-blue-500 rounded-xl hover:bg-blue-600"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Submit
              <Send className="w-4 h-4 ml-2" />
            </motion.button>
          </form>
        </div>
      </div>
    </footer>
  )
}