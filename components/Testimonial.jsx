'use client'
import { testimonialsData } from "@/data/testimonialsData";
import { useState, useEffect } from "react";

// Array of testimonial data


const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  // Go to next testimonial
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Go to previous testimonial
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonialsData.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="flex flex-col items-center w-full py-12">
      {/* Carousel Container */}
      <div className="relative w-4/5 md:w-2/3 lg:w-1/2 h-[70vh] md:h-[50vh]">
        {/* Current testimonial */}
        {testimonialsData.map((testimonial, index) => (
          <div
            key={index}
            className={`${
              index === currentIndex ? "block" : "hidden"
            } text-center transition-opacity duration-700 ease-in-out`}
          >
            <img
              src={testimonial.image}
              alt={`${testimonial.name}'s picture`}
              className="object-cover w-32 mx-auto mb-4 rounded-full h-36"
            />
            <h3 className="text-xl font-semibold text-gray-800">
              {testimonial.name}
            </h3>
            <h4 className="text-sm font-medium text-gray-500">
              {testimonial.title}
            </h4>
            <p className="px-6 mt-4 text-[17px] md:text-lg italic text-gray-700">
              “{testimonial.text}”
            </p>
          </div>
        ))}

        {/* Navigation buttons */}
        <button
          onClick={prevSlide}
          className="absolute p-2 text-white transition transform -translate-y-1/2 rounded-full bg-sky-800 top-1/2 left-2 hover:bg-gray-600"
        >
          &lt;
        </button>
        <button
          onClick={nextSlide}
          className="absolute p-2 text-white transition transform -translate-y-1/2 rounded-full bg-sky-800 top-1/2 right-2 hover:bg-gray-600"
        >
          &gt;
        </button>
      </div>

      {/* Dots Navigation */}
      <div className="flex mt-6 space-x-2">
        {testimonialsData.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-3 w-3 rounded-full cursor-pointer ${
              index === currentIndex ? "bg-gray-800" : "bg-gray-400"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
