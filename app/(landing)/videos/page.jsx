'use client'

import { useState, useEffect } from 'react'
import { getVideos } from '@/lib/api'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function VideosPage() {
    const [videos, setVideos] = useState([])

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        })

        async function fetchVideos() {
            try {
                const fetchedVideos = await getVideos()
                setVideos(fetchedVideos)
            } catch (error) {
                console.error("Failed to fetch videos:", error)
            }
        }

        fetchVideos()
    }, [])

    return (
        <div className="min-h-screen bg-gray-100 md:pb-28">
            <header className="py-5 text-white bg-opacity-50 md:py-20 bg-gradient-to-r from-red-700 via-red-500 to-red-400">
                <div className="container px-4 mx-auto">
                    <h1 className="mb-4 text-4xl font-bold md:text-5xl" data-aos="fade-down">
                        Cloud Computing Club Videos
                    </h1>
                    <p className="mb-8 text-xl md:text-2xl" data-aos="fade-up" data-aos-delay="200">
                        Explore our collection of informative and engaging videos on cloud computing topics.
                    </p>
                    <a
                        href="https://youtube.com/@cloudcomputingclub"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 font-semibold text-red-600 transition duration-300 bg-white rounded-full hover:bg-opacity-90"
                        data-aos="fade-up" data-aos-delay="400"
                    >
                        Subscribe to Our Channel
                    </a>
                </div>
            </header>


            <div className="container px-4 py-16 mx-auto">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {videos.map((video) => (
                        <div key={video.id} className="overflow-hidden transition-transform duration-300 bg-white rounded-lg shadow-lg hover:scale-105" data-aos="fade-up">
                            <div className="h-full">
                                <iframe
                                    src={`https://www.youtube.com/embed/${video.videoId}`}
                                    title={`YouTube video ${video.videoId}`}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-64 rounded-t-lg"
                                ></iframe>
                                <div className="flex justify-end p-2 mt-2 space-x-2 ">
                                    <a
                                        href={`https://www.youtube.com/watch?v=${video.videoId}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2 text-sm font-medium text-white transition-all duration-300 rounded-full hover:scale-105 bg-gradient"
                                    >
                                        Watch
                                    </a>
                                    <a
                                        href={`https://www.youtube.com/channel/UC3F_rKJR7I6Gkx0enqkuWiQ?sub_confirmation=1`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2 text-sm font-medium text-white transition-all duration-300 bg-red-600 rounded-full hover:scale-105 hover:bg-red-700"
                                    >
                                        Subscribe
                                    </a>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>

            <div className="py-8 text-center">
                <a
                    href="https://youtube.com/@cloudcomputingclub?si=ahpmwOlHYLJFQQnP"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 font-semibold text-white transition duration-300 bg-red-600 rounded-full hover:bg-red-700"
                >
                    Visit Our YouTube Channel
                </a>
            </div>
        </div>
    )
}
