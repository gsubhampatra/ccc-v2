'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const gallery1 = [
  {
    id: 1,
    name: "Hackathon",
    img: "https://i.ibb.co/pynGFT8/IMG-2996.jpg",
  },
  {
    id: 2,
    name: "Hackathon",
    img: "https://i.ibb.co/3vkwsdt/20230420-180819.jpg",
  },
  {
    id: 3,
    name: "Hackathon",
    img: "https://i.postimg.cc/yxqsYL19/IMG-20230420-WA0022-min.jpg",
  },
  {
    id: 4,
    name: "Hackathon",
    img: "https://i.ibb.co/WB3mjhb/20230419-172639.jpg",
  },
]

const gallery2 = [
  {
    id: 5,
    name: "Teacher",
    img: "https://i.ibb.co/YjXyGZj/teacher-1.jpg",
  },
  {
    id: 6,
    name: "Group Photo",
    img: "https://i.ibb.co/0jmhg8y/IMG20230901135053.jpg",
  },
  {
    id: 7,
    name: "Landscape",
    img: "https://i.ibb.co/LSSRk4h/20220918-165055.jpg",
  },
  {
    id: 8,
    name: "Group Activity",
    img: "https://i.ibb.co/ZVGW8WV/IMG-20220918-163823-6.jpg",
  },
]

export default function GalleryPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const galleryRef = useRef(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    setIsLoaded(true)
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const heroVariants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1.5, ease: 'easeOut' } },
  }

  const galleryVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i * 0.1 },
    }),
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <motion.div
        className="relative h-screen overflow-hidden"
        initial="hidden"
        animate={isLoaded ? 'visible' : 'hidden'}
        variants={heroVariants}
      >
        <img
          src="https://i.ibb.co/jkHGfyW/cccfull.jpg"
          alt="Hero Image"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <h1 className="text-6xl font-bold text-white">Our Gallery</h1>
        </div>
      </motion.div>

      <div className="container px-4 py-16 mx-auto">
        <h2 className="mb-8 text-4xl font-bold text-center">Hackathon Moments</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4" ref={galleryRef}>
          {gallery1.map((item, index) => (
            <motion.div
              key={item.id}
              custom={index}
              initial="hidden"
              animate={scrollY > (galleryRef.current?.offsetTop || 0) - 400 ? 'visible' : 'hidden'}
              variants={galleryVariants}
              className="relative overflow-hidden rounded-lg shadow-lg"
            >
              <img src={item.img} alt={item.name} className="object-cover w-full h-64" />
              <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 bg-black bg-opacity-50 opacity-0 hover:opacity-100">
                <p className="text-xl font-semibold text-white">{item.name}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="container px-4 py-16 mx-auto">
        <h2 className="mb-8 text-4xl font-bold text-center">More Memories</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {gallery2.map((item, index) => (
            <motion.div
              key={item.id}
              custom={index}
              initial="hidden"
              animate={scrollY > (galleryRef.current?.offsetTop || 0) + 100 ? 'visible' : 'hidden'}
              variants={galleryVariants}
              className="relative overflow-hidden rounded-lg shadow-lg"
            >
              <img src={item.img} alt={item.name} className="object-cover object-center w-full h-64 " />
              <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 bg-black bg-opacity-50 opacity-0 hover:opacity-100">
                <p className="text-xl font-semibold text-white">{item.name}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}