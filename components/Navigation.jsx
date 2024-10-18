"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "/public/club_logo.png"; // Adjust the path if needed
import { motion } from "framer-motion";

const Navigation = () => {
  const [backColor, setbackColor] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const items = [
    { text: "Home", path: "/" },
    { text: "Events", path: "/events" },
    { text: "Blogs", path: "/blogs" },
    { text: "Gallery", path: "/gallery" },
    { text: "Members", path: "/members" },
    { text: "About Us", path: "/about" },
    { text: "Developers", path: "/developers" },
  ];

  // Scroll event listener to change navbar background
  const changeBackground = () => {
    if (window.scrollY >= 200) {
      setbackColor(true);
    } else {
      setbackColor(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);

  // Scroll to the contact section
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  // Toggle Sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 z-50 w-full ${backColor ? "bg-white shadow-lg" : "bg-transparent"
          } transition-colors duration-300`}
      >
        <div className="flex items-center justify-between px-6 py-3">
          {/* Logo */}
          <Link href="/">
            <Image src={logo} alt="Club Logo" width={50} height={70} />
          </Link>

          {/* Desktop Navigation Items */}
          <div className="hidden space-x-8 md:flex">
            {items.slice(0, 4).map((item, index) => (
              <Link
                key={index}
                href={item.path}
                className="text-lg font-semibold text-gray-700 hover:text-blue-600"
              >
                {item.text}
              </Link>
            ))}
          </div>

          {/* Contact Button and Sidebar Toggle Button */}
          <div className="flex items-center space-x-4">
            {/* Sidebar Toggle Button for Mobile */}
            <button
              onClick={toggleSidebar}
              className="text-2xl text-gray-700 hover:text-blue-600"
            >
              &#9776;
            </button>
            <button
              onClick={scrollToContact}
              className="hidden px-4 py-2 text-white bg-blue-600 rounded-xl md:block hover:bg-blue-700"
            >
              Contact
            </button>


          </div>
        </div>
      </motion.nav>

      {/* Sidebar (Mobile Navigation) */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isSidebarOpen ? 0 : "-100%" }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 z-50 w-full h-screen bg-gradient-to-t from-blue-600  to-purple-500 opacity-95 p-6 md:w-1/2 lg:w-1/3`}
      >
        <div className="relative">
          {/* Close Button */}
          <button
            onClick={toggleSidebar}
            className="absolute text-3xl text-white top-4 right-4"
          >
            &times;
          </button>

          {/* Sidebar Logo */}
          <div className="flex justify-center mt-4">
            <div className="p-3 border-b-4 border-white border-double" >

              <h1 className="text-3xl font-bold text-white " >
                NIST CCC
              </h1>
            </div>
          </div>

          {/* Sidebar Items */}
          <nav className="mt-12 space-y-4 text-center text-white border-spacing-10">
            {items.map((item, index) => (
              <Link
                key={index}
                href={item.path}
                onClick={toggleSidebar}
                className="block py-3 text-2xl font-semibold rounded-lg hover:bg-white hover:text-blue-600"
              >
                {item.text}
              </Link>
            ))}
          </nav>
        </div>
      </motion.div>
    </>
  );
};

export default Navigation;
