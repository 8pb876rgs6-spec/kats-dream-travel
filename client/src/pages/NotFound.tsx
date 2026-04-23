/**
 * 404 Page — Kat's Dream Destination Travel
 * Design: Cinematic Voyager — matches the luxury brand aesthetic
 */
import { Link } from "wouter";
import { Plane, Compass } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-[oklch(0.10_0.04_260)] flex items-center justify-center relative overflow-hidden">
        {/* Ambient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.10_0.04_260)] via-[oklch(0.14_0.05_260)] to-[oklch(0.10_0.04_260)]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[oklch(0.62_0.19_260/0.05)] blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[oklch(0.75_0.1_80/0.05)] blur-3xl" />

        <div className="container relative z-10 text-center py-32">
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <Compass className="w-10 h-10 text-[oklch(0.75_0.1_80)]" />
            </div>
          </div>

          <h1 className="font-serif text-7xl md:text-9xl font-bold gradient-text mb-4">
            404
          </h1>

          <h2 className="font-serif text-2xl md:text-3xl text-white font-semibold mb-4">
            Looks like you've wandered off the map
          </h2>

          <p className="text-white/40 text-lg max-w-md mx-auto mb-10 leading-relaxed">
            This page doesn't exist, but your dream destination does. Let's get you back on course.
          </p>

          <Link href="/">
            <span className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[oklch(0.62_0.19_260)] to-[oklch(0.50_0.15_260)] text-white font-semibold rounded-full shadow-xl shadow-[oklch(0.62_0.19_260/0.25)] hover:shadow-[oklch(0.62_0.19_260/0.45)] hover:scale-105 transition-all duration-300 text-base">
              Back to Home
              <Plane className="w-5 h-5 -rotate-45" />
            </span>
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
}
