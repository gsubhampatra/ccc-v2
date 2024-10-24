"use client";
import Image from "next/image";
import Link from "next/link";
import TechWeDrive from "@/components/TechWeDrive";
import Testimonial from "@/components/Testimonial";
import logo from "@/public/club_logo.png";
import { ArrowDown, FacebookIcon, Linkedin, YoutubeIcon } from "lucide-react";
import { GitHubLogoIcon, InstagramLogoIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};
export default function Home() {
  return (
    <section className="relative mt-8 md:mt-24">
      {/* Social Links */}
      <aside className="fixed left-0 z-10 flex flex-col items-center p-2 space-y-4 bg-blue-600 rounded-r-xl top-1/3">
        {/* LinkedIn */}
        <Link
          href="https://www.linkedin.com/company/nist-cloud-computing-club"
          target="_blank"
          className="hover:text-gradient"
        >
          <Linkedin className="w-8 h-8 text-white duration-100 hover:translate-x-1" />
        </Link>

        {/* GitHub */}
        <Link
          href="https://www.github.com/NIST-CCC"
          target="_blank"
          className="hover:text-gradient"
        >
          <GitHubLogoIcon className="w-8 h-8 text-white duration-100 hover:translate-x-1 " />
        </Link>

        {/* Instagram */}
        <Link
          href="https://www.instagram.com/cloudcomputingclub_official/"
          target="_blank"
          className="hover:text-blue-300"
        >
          <InstagramLogoIcon className="w-8 h-8 text-white duration-100 hover:translate-x-1" />
        </Link>

        {/* Facebook */}
        <Link
          href="https://www.facebook.com/ccc.nist/"
          target="_blank"
          className="hover:text-blue-300"
        >
          <FacebookIcon className="w-8 h-8 text-white duration-100 hover:translate-x-1" />
        </Link>

        {/* YouTube */}
        <Link
          href="https://www.youtube.com/@cloudcomputingclub"
          target="_blank"
          className="hover:text-blue-300"
        >
          <YoutubeIcon className="w-8 h-8 text-white duration-100 hover:translate-x-1" />
        </Link>
      </aside>

      {/* Main Section */}
      <section className="py-24 text-center">
        <div>
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="my-1 text-6xl font-bold md:text-7xl">NIST</h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <p className="mb-2 text-5xl font-semibold text-center md:text-6xl text-gradient">
              Cloud Computing Club
            </p>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          >
            <p className="mt-5 text-xl">
              An Education Society focused on Cloud and Services at NIST Campus.
            </p>
          </motion.div>
          <div className="absolute flex items-center justify-center w-full my-12 md:items-center -z-10">
            <img
              className=" opacity-95 md:h-80 h-52"
              src="https://chools.in/wp-content/uploads/cloud.gif"
              alt="cloud"
            />
          </div>
        </div>

        {/* Explore Button */}
        <div className="mt-8 ease-in-out duration-2000 animate-bounce delay-400">
          <button
            onClick={() => window.scrollTo({ top: 800, behavior: "smooth" })}
            className="flex items-center px-6 py-2 mx-auto text-xl text-white rounded-xl bg-gradient-to-r from-blue-500 to-purple-500"
          >
            Explore more &nbsp;&nbsp;
            <ArrowDown />
          </button>
        </div>
      </section>
      <div>
        {/* Logo */}
        <div className="relative hidden mt-10 md:block ">
          <Image
            src={logo}
            alt="club logo"
            width={350}
            height={500}
            className="absolute top-0 right-0 opacity-20"
          />
        </div>
      </div>

      {/* Technology Section */}
      <TechWeDrive />

      {/* Testimonial Section */}
      <section className="py-12">
        <h2 className="mb-8 text-4xl font-bold text-center">Testimonials</h2>
        <Testimonial />
      </section>
    </section>
  );
}
