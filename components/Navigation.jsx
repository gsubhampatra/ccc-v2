"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "/public/club_logo.png"; // Adjust the path if needed
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const Navigation = () => {
  const [backColor, setbackColor] = useState(false);

  const items = [
    { text: "Home", path: "/" },
    { text: "Projects", path: "/projects" },
    { text: "Videos", path: "/videos" },
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
            {items.slice(0, 5).map((item, index) => (
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
          <div className="flex items-center space-x-4 ">
            {/* Sidebar Toggle Button for Mobile */}
            <Sheet>
              <SheetTrigger asChild>
                <button className="text-2xl text-gradient hover:text-blue-600">
                  &#9776;
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] bg-opacity-10 bg-gradient sm:w-[400px]">
                <SheetTitle>
                  <div className="flex justify-center mb-8">
                    <div className="p-3 border-b-4 border-white border-double">
                      <p className="text-3xl font-bold text-white">
                        NIST CCC
                      </p>
                    </div>
                  </div>
                </SheetTitle>
                <ScrollArea className="h-full p-3 space-y-2 bg-transparent bg-white rounded-xl bg-opacity-20 ">

                  {/* Sidebar Items */}
                  {items.map((item, index) => (
                    <SheetTrigger key={index} asChild>
                      <Link
                        key={index}
                        href={item.path}
                        className="block px-4 py-3 text-lg font-semibold text-center transition-all duration-300 text-slate-50 md:text-left md:text-xl rounded-xl hover:bg-gradient hover:text-white"
                      >
                        {item.text}
                      </Link>
                    </SheetTrigger>
                  ))}
                </ScrollArea>
              </SheetContent>
            </Sheet>
            <button
              onClick={scrollToContact}
              className="hidden px-4 py-2 text-white bg-blue-600 rounded-xl md:block hover:bg-blue-700"
            >
              Contact
            </button>
          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default Navigation;
