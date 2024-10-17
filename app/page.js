"use client";
import Image from "next/image";
import Link from "next/link";
import TechWeDrive from "@/components/TechWeDrive";
import Testimonial from "@/components/Testimonial";
import logo from "@/public/club_logo.png";
import { ArrowBigDown, ArrowDown, FacebookIcon, Linkedin, Sidebar, YoutubeIcon } from "lucide-react";
import { GitHubLogoIcon, InstagramLogoIcon } from "@radix-ui/react-icons";

export default function Home() {
  return (
    <section className="relative mt-32">
      {/* Social Links */}
      <aside className="fixed left-0 z-10 flex flex-col items-center p-2 space-y-4 bg-blue-600 rounded-r-xl top-1/2">
        {/* LinkedIn */}
        <Link
          href="https://www.linkedin.com/company/nist-cloud-computing-club"
          target="_blank"
          className="hover:text-blue-300"
        >
          <Linkedin className="w-8 h-8 text-white" />
        </Link>

        {/* GitHub */}
        <Link
          href="https://www.github.com/NIST-CCC"
          target="_blank"
          className="hover:text-blue-300"
        >
          <GitHubLogoIcon className="w-8 h-8 text-white" />
        </Link>

        {/* Instagram */}
        <Link
          href="https://www.instagram.com/cloudcomputingclub_official/"
          target="_blank"
          className="hover:text-blue-300"
        >
          <InstagramLogoIcon className="w-8 h-8 text-white" />
        </Link>

        {/* Facebook */}
        <Link
          href="https://www.facebook.com/ccc.nist/"
          target="_blank"
          className="hover:text-blue-300"
        >
          <FacebookIcon className="w-8 h-8 text-white" />
        </Link>

        {/* YouTube */}
        <Link
          href="https://www.youtube.com/@cloudcomputingclub"
          target="_blank"
          className="hover:text-blue-300"
        >
          <YoutubeIcon className="w-8 h-8 text-white" />
        </Link>
      </aside>

      {/* Main Section */}
      <section className="py-24 text-center">
        {/* Title */}
        <div className="animate-fadeIn">
          <h1 className="font-bold text-7xl">NIST</h1>
        </div>

        {/* Subtitle */}
        <div className="delay-200 animate-slideInLeft">
          <p className="text-6xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-500 to-purple-500">
            Cloud Computing Club
          </p>
        </div>

        {/* Description */}
        <div className="delay-300 animate-slideInUp">
          <p className="mt-4 text-xl">
            An Education Society focused on Cloud and Services at NIST Campus.
          </p>
        </div>

        {/* Explore Button */}
        <div className="mt-6 ease-in-out duration-2000 animate-bounce delay-400">
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
