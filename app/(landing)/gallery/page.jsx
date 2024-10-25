'use client'

import { useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { getGalleryImages } from '@/lib/api'
import { galleryImages as fallbackImages } from '@/data/imageGallery'

export default function GalleryPage() {
  const [images, setImages] = useState([])

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    })

    const fetchImages = async () => {
      try {
        const data = await getGalleryImages()
        setImages(data.galleryImages || [])
        if (data.galleryImages.length === 0) {
          setImages(fallbackImages)
        }
      } catch (error) {
        console.error('Error fetching images:', error)
        setImages(fallbackImages)
      }
    }

    fetchImages()
  }, [])

  return (
    <div className="min-h-screen py-20 bg-gradient">
      <div className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-opacity-70">
          <h1 className="mb-4 text-6xl font-bold text-white" data-aos="fade-down">Our Gallery</h1>
          <p className="text-2xl text-white" data-aos="fade-up">Capturing Moments, Creating Memories</p>
          <iframe className="z-10 object-cover w-3/4 h-3/4"
            width="640" height="360" src="https://www.youtube.com/embed/wSp1sAXZUMs?autoplay=1" title="2 Days Workshop On Cloud Computing, NIST Cloud Computing Club" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" ></iframe>
        </div>
      </div>

      <div className="container px-4 py-16 mx-auto">
        <h2 className="mb-8 text-4xl font-bold text-center text-white" data-aos="fade-up">Memorable Moments</h2>
        <div className="grid md:grid-cols-4 grid-cols-2 gap-4 auto-rows-[200px]">
          {images.map((item) => (
            <div
              key={item.id}
              className={`rounded-lg overflow-hidden shadow-lg ${item.size === 'large' ? 'col-span-2 row-span-2' :
                item.size === 'medium' ? 'col-span-2' : ''
                }`}
              data-aos="fade-up"
            >
              <div className="relative h-full group">
                <img src={item.imageUrl} alt={item.name} className="object-cover object-center w-full h-full" />
                <div className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100">
                  <p className="text-xl font-semibold text-white">{item.name}</p>
                  <p className="mt-2 text-sm text-white">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
