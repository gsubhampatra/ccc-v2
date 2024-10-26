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

      <div className="container px-4 py-16 mx-auto">
        <h1 className="mb-8 text-4xl font-bold text-center text-white" data-aos="fade-up">Our Gallery</h1>
        <h2 className="mb-8 text-4xl font-bold text-center text-white" data-aos="fade-up">Memorable Moments</h2>
        <div className="grid md:grid-cols-4 grid-cols-2 gap-4 auto-rows-[200px]">
          {images.sort((a, b) => {
            // First prioritize large images
            if (a.size === 'large' && b.size !== 'large') return -1;
            if (b.size === 'large' && a.size !== 'large') return 1;
            
            // Then small images
            if (a.size === 'small' && b.size !== 'small') return -1;
            if (b.size === 'small' && a.size !== 'small') return 1;
            
            // Medium images last
            if (a.size === 'medium' && b.size !== 'medium') return -1;
            if (b.size === 'medium' && a.size !== 'medium') return 1;
            
            return 0;
          }).map((item) => (
            <div
              key={item.id}
              className={` rounded-[15px]   overflow-hidden shadow-lg ${item.size === 'large' ? 'col-span-2 row-span-2' :
                  item.size === 'medium' ? 'col-span-2' : ''
                }`}
              data-aos="fade-up"
            >
              <div className="relative h-full group">
                <img src={item.imageUrl} alt={item.name} className="object-cover object-center w-full h-full" />
                <div className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 bg-black opacity-0 bg-opacity-10 group-hover:opacity-100 group-hover:bg-opacity-50">
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
