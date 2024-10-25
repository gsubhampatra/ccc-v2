'use client'

import { getHiringStatus } from '@/lib/api';
import { useEffect, useState } from 'react';

export default function HiringPage() {
    // Toggle this state to manage hiring open/closed
    const [isHiringOpen, setIsHiringOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchHiringStatus = async () => {
            try {
                const { status } = await getHiringStatus()
                setIsHiringOpen(status)
            } catch (error) {
                console.error('Error fetching hiring status:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchHiringStatus()
    }, [])



    return (
        <div className="flex items-center justify-center min-h-[75vh] my-20 bg-slate-50">
        
            <div className="max-w-2xl p-8 text-center bg-white rounded-lg shadow-lg">
                {isHiringOpen ? (
                    <div>
                        {/* Hiring Open Section */}
                        <h1 className="text-3xl font-bold text-gradient md:text-4xl">
                            Join the Cloud Computing Club
                        </h1>
                        <p className="mt-4 text-lg text-gray-700">
                            We are currently looking for passionate individuals to join our team. Please fill out the form below to apply.
                        </p>

                        {/* Application Form */}
                        <form className="mt-8 space-y-6">
                            <div>
                                <label className="block font-semibold text-left text-gray-600">Full Name</label>
                                <input type="text" className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Enter your full name" />
                            </div>
                            <div>
                                <label className="block font-semibold text-left text-gray-600">Email Address</label>
                                <input type="email" className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Enter your email" />
                            </div>
                            <div>
                                <label className="block font-semibold text-left text-gray-600">Why Do You Want to Join?</label>
                                <textarea className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Write a brief description" rows="4"></textarea>
                            </div>

                            {/* Submit Button */}
                            <button type="submit" className="w-full p-3 mt-6 text-white rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-purple-500 hover:to-blue-500">
                                Apply Now
                            </button>
                        </form>

                        {/* Requirements Section */}
                        <div className="mt-12">
                            <h2 className="text-3xl font-semibold text-gray-800">Requirements:</h2>
                            <ul className="mt-4 text-left text-gray-700 list-disc list-inside">
                                <li>Basic knowledge of cloud computing concepts.</li>
                                <li>Experience with AWS, Google Cloud, or Azure is a plus.</li>
                                <li>Willingness to collaborate and learn new technologies.</li>
                                <li>Enthusiasm for working on cloud-related projects.</li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <div>
                        {/* Hiring Closed Section */}
                        <h1 className="text-3xl font-bold text-transparent md:text-4xl text-gradient bg-clip-text bg-gradient-to-r from-red-500 via-red-500 to-pink-500">
                            Hiring Closed
                        </h1>
                        <p className="mt-4 text-lg text-gray-700">
                            Thank you for your interest in joining the Cloud Computing Club. Currently, we are not hiring. Please check back later!
                        </p>

                       
                    </div>
                )}
            </div>
        </div>
    );
}
