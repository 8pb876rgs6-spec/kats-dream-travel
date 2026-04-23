/**
 * Home Page — Kat's Dream Destination Travel
 * Design: Cinematic Voyager — editorial film aesthetic, accessible travel
 * Sections: Intro → Hero → Trust Bar → Services → CTA → Destinations → Testimonials → Booking → Footer
 */
import { useState, useCallback } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Plane,
  Hotel,
  Shield,
  Train,
  MapPinned,
  Users,
  Headset,
  Sparkles,
  Clock,
  Heart,
  CheckCircle2,
  Send,
  ChevronRight,
  Ship,
  Anchor,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CinematicIntro from "@/components/CinematicIntro";
import ScrollReveal from "@/components/ScrollReveal";

/* ===== IMAGE URLS ===== */
const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663477345712/dHh7MfoMqSwueh7MPSfyUG/family-beach-vacation-EFNYR55XxwJ7Pf6TDGfuXh.webp";

const DESTINATIONS = [
  {
    name: "Caribbean Cruise",
    country: "Multiple Islands",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663477345712/dHh7MfoMqSwueh7MPSfyUG/cruise-ship-B9QLiF3MEB2V9s9WbBJwFC.webp",
    size: "large",
    icon: Ship,
  },
  {
    name: "European Rail",
    country: "Scenic Train Journeys",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663477345712/dHh7MfoMqSwueh7MPSfyUG/scenic-train-Q9YMfw9YvaJ7noTwnZ339n.webp",
    size: "small",
    icon: Train,
  },
  {
    name: "Coastal Road Trip",
    country: "Pacific Coast, USA",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663477345712/dHh7MfoMqSwueh7MPSfyUG/road-trip-coast-NazgscBQdFQYuvWmvL6Knj.webp",
    size: "small",
    icon: MapPinned,
  },
  {
    name: "Alaska Glacier Cruise",
    country: "Alaska, USA",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663477345712/dHh7MfoMqSwueh7MPSfyUG/alaska-cruise-glacier-WEHyUEkGbtSLRG68j2doqk.webp",
    size: "large",
    icon: Anchor,
  },
  {
    name: "Family Beach Getaway",
    country: "Cancún, Mexico",
    img: "/manus-storage/cancun-gallery_78a3f385.jpg",
    size: "medium",
    icon: Users,
  },
];

const SERVICES = [
  { icon: Hotel, title: "Hotels & Resorts", desc: "Curated stays at world-class properties, including exclusive Hilton partner rates." },
  { icon: Shield, title: "Travel Insurance", desc: "Comprehensive coverage for peace of mind on every journey." },
  { icon: Train, title: "Train Tickets", desc: "Scenic rail journeys across Europe, Asia, and beyond — all booked for you." },
  { icon: Ship, title: "Cruise Packages", desc: "From Caribbean getaways to Alaskan adventures — we find the perfect cruise for your family." },
  { icon: Users, title: "Group & Family Travel", desc: "Coordinating trips for groups of any size with seamless logistics." },
  { icon: Headset, title: "Personal Concierge", desc: "A dedicated travel expert available before, during, and after your trip." },
];

const TRUST_ITEMS = [
  { icon: Sparkles, text: "Free Consultation" },
  { icon: Heart, text: "Personalized Itineraries" },
  { icon: Ship, text: "Cruise Packages" },
  { icon: Shield, text: "Travel Insurance Included" },
  { icon: Train, text: "Train & Flight Booking" },
];

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", travelers: "", destination: "", budget: "", message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 4000);
  };

  return (
    <>
      {!introComplete && <CinematicIntro onComplete={handleIntroComplete} />}

      <div className={`transition-opacity duration-700 ${introComplete ? "opacity-100" : "opacity-0"}`}>
        <Navbar />

        {/* ===== HERO SECTION ===== */}
        <section className="relative min-h-screen bg-[oklch(0.10_0.04_260)] overflow-hidden flex items-center">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.10_0.04_260)] via-[oklch(0.14_0.05_260)] to-[oklch(0.10_0.04_260)]" />
          
          {/* Subtle light beam */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[oklch(0.62_0.19_260/0.05)] to-transparent" />

          <div className="container relative z-10 pt-28 pb-20 md:pt-32 md:pb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
              {/* Left: Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={introComplete ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
                  <span className="w-2 h-2 rounded-full bg-[oklch(0.75_0.1_80)] animate-pulse" />
                  <span className="text-xs text-white/60 tracking-wider uppercase font-medium">
                    Now booking 2025–2026
                  </span>
                </div>

                <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6">
                  Your dream trip{" "}
                  <span className="gradient-text">starts right here.</span>
                </h1>

                <p className="text-lg md:text-xl text-white/50 max-w-lg mb-10 leading-relaxed">
                  A personalized, stress-free travel experience designed around you. 
                  From cruises to train journeys to beach getaways — we handle everything.
                </p>

                <div className="flex flex-wrap gap-4">
                  <a
                    href="#booking"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[oklch(0.62_0.19_260)] to-[oklch(0.50_0.15_260)] text-white font-semibold rounded-full shadow-xl shadow-[oklch(0.62_0.19_260/0.25)] hover:shadow-[oklch(0.62_0.19_260/0.45)] hover:scale-105 transition-all duration-300 text-base"
                  >
                    Plan My Trip
                    <Plane className="w-5 h-5 -rotate-45" />
                  </a>
                  <Link href="/about">
                    <span className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white/80 hover:text-white hover:border-white/40 font-medium rounded-full transition-all duration-300 text-base hover:bg-white/5">
                      Meet Kat
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </Link>
                </div>
              </motion.div>

              {/* Right: Featured Travel Visual */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 30 }}
                animate={introComplete ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
              >
                {/* Main image — family beach vacation */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/40 max-w-md mx-auto lg:max-w-none">
                  <img
                    src={HERO_IMAGE}
                    alt="Happy family enjoying a beach vacation"
                    className="w-full h-[450px] md:h-[550px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.10_0.04_260)] via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-xs text-white/50 uppercase tracking-widest mb-1">Featured Experience</p>
                    <h3 className="font-serif text-2xl text-white font-semibold">Family Beach Getaway</h3>
                  </div>
                </div>

                {/* Floating cards */}
                <motion.div
                  className="absolute -top-4 -left-4 md:-left-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-3 shadow-xl"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-1">
                      {[
                        { label: "Cruises", letter: "C" },
                        { label: "Trains", letter: "T" },
                        { label: "Beach", letter: "B" },
                        { label: "Road", letter: "R" },
                      ].map((d, i) => (
                        <div
                          key={d.label}
                          className="w-7 h-7 rounded-full bg-gradient-to-br from-[oklch(0.62_0.19_260)] to-[oklch(0.50_0.15_260)] flex items-center justify-center text-[9px] text-white font-bold border-2 border-[oklch(0.10_0.04_260)]"
                          style={{ zIndex: 4 - i }}
                        >
                          {d.letter}
                        </div>
                      ))}
                    </div>
                    <span className="text-xs text-white/70 font-medium ml-1">Travel Experiences</span>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -bottom-3 -right-3 md:-right-6 bg-gradient-to-br from-[oklch(0.75_0.1_80)] to-[oklch(0.65_0.12_80)] rounded-2xl px-5 py-3 shadow-xl"
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[oklch(0.15_0.04_260)]" />
                    <span className="text-sm font-semibold text-[oklch(0.15_0.04_260)]">Free Consultation</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ===== TRUST BAR ===== */}
        <section className="bg-[oklch(0.13_0.04_260)] border-y border-white/5">
          <div className="container py-6">
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
              {TRUST_ITEMS.map((item, i) => (
                <ScrollReveal key={item.text} delay={i * 0.08}>
                  <div className="flex items-center gap-2.5">
                    <item.icon className="w-4 h-4 text-[oklch(0.75_0.1_80)]" />
                    <span className="text-sm text-white/50 font-medium whitespace-nowrap">{item.text}</span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SERVICES SECTION ===== */}
        <section id="services" className="bg-[oklch(0.97_0.005_80)] py-24 md:py-32">
          <div className="container">
            <ScrollReveal>
              <div className="text-center mb-16">
                <span className="text-xs uppercase tracking-[0.3em] text-[oklch(0.62_0.19_260)] font-semibold">
                  What We Offer
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[oklch(0.15_0.04_260)] mt-3">
                  Travel services, tailored to you
                </h2>
                <p className="text-[oklch(0.45_0.03_260)] mt-4 max-w-2xl mx-auto text-lg">
                  From booking cruises to crafting your perfect itinerary — every detail is handled with care.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES.map((service, i) => (
                <ScrollReveal key={service.title} delay={i * 0.1}>
                  <div className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl border border-[oklch(0.92_0.01_260)] hover:border-[oklch(0.62_0.19_260/0.3)] transition-all duration-500">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[oklch(0.62_0.19_260/0.1)] to-[oklch(0.50_0.15_260/0.05)] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                      <service.icon className="w-6 h-6 text-[oklch(0.50_0.15_260)]" />
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-[oklch(0.15_0.04_260)] mb-3">
                      {service.title}
                    </h3>
                    <p className="text-[oklch(0.45_0.03_260)] text-sm leading-relaxed">
                      {service.desc}
                    </p>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[oklch(0.62_0.19_260)] to-[oklch(0.75_0.1_80)] rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===== MID-PAGE CTA BANNER ===== */}
        <section className="relative py-20 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.15_0.04_260)] via-[oklch(0.20_0.06_260)] to-[oklch(0.15_0.04_260)]" />
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDE4YzAtOS45NC04LjA2LTE4LTE4LTE4djJjOC44NCAwIDE2IDcuMTYgMTYgMTZzLTcuMTYgMTYtMTYgMTZ2MmM5Ljk0IDAgMTgtOC4wNiAxOC0xOHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
          <div className="container relative z-10 text-center">
            <ScrollReveal>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                Not sure where to go? <span className="gradient-text">We'll help you decide.</span>
              </h2>
              <p className="text-white/40 text-lg max-w-xl mx-auto mb-8">
                Whether it's a cruise, a scenic train ride, or a family beach trip — tell us your dream and we'll make it happen.
              </p>
              <a
                href="#booking"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium rounded-full hover:bg-white/20 hover:border-white/30 transition-all duration-300"
              >
                Get a Free Consultation
                <ChevronRight className="w-4 h-4" />
              </a>
            </ScrollReveal>
          </div>
        </section>

        {/* ===== DESTINATIONS / EXPERIENCES GALLERY ===== */}
        <section id="destinations" className="bg-[oklch(0.10_0.04_260)] py-24 md:py-32">
          <div className="container">
            <ScrollReveal>
              <div className="text-center mb-16">
                <span className="text-xs uppercase tracking-[0.3em] text-[oklch(0.75_0.1_80)] font-semibold">
                  Travel Experiences
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3">
                  How will your story unfold?
                </h2>
                <p className="text-white/40 mt-4 max-w-2xl mx-auto text-lg">
                  From ocean cruises to scenic rail journeys — explore the travel experiences we love to plan.
                </p>
              </div>
            </ScrollReveal>

            {/* Masonry-style grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 auto-rows-[200px] md:auto-rows-[240px]">
              {DESTINATIONS.map((dest, i) => {
                const spanClass =
                  dest.size === "large"
                    ? "col-span-2 row-span-2"
                    : dest.size === "medium"
                    ? "col-span-2 row-span-1"
                    : "col-span-1 row-span-1";

                return (
                  <ScrollReveal key={dest.name} delay={i * 0.1} className={spanClass}>
                    <div className="group relative w-full h-full rounded-2xl overflow-hidden cursor-pointer">
                      <img
                        src={dest.img}
                        alt={`${dest.name} — ${dest.country}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.08_0.03_260)] via-[oklch(0.08_0.03_260/0.2)] to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
                      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                        <div>
                          <h3 className="font-serif text-xl md:text-2xl text-white font-semibold">{dest.name}</h3>
                          <p className="text-white/50 text-sm">{dest.country}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center shrink-0 ml-3">
                          <dest.icon className="w-5 h-5 text-white/80" />
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===== TESTIMONIALS / SOCIAL PROOF ===== */}
        <section className="bg-[oklch(0.97_0.005_80)] py-24 md:py-28">
          <div className="container">
            <ScrollReveal>
              <div className="text-center mb-16">
                <span className="text-xs uppercase tracking-[0.3em] text-[oklch(0.62_0.19_260)] font-semibold">
                  Happy Travelers
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[oklch(0.15_0.04_260)] mt-3">
                  What our clients say
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  quote: "Kat planned our first-ever cruise and it was incredible. She found us an amazing deal, handled all the details, and even arranged shore excursions. We're already planning our next one!",
                  name: "Sarah & James",
                  trip: "Caribbean Cruise",
                },
                {
                  quote: "I always wanted to do a European train trip but had no idea where to start. Kat mapped out the perfect route through Italy and Switzerland. It was the trip of a lifetime!",
                  name: "Michelle T.",
                  trip: "European Rail Journey",
                },
                {
                  quote: "We've used Kat for three family vacations now. She handles everything — insurance, hotels, activities for the kids. We just show up and enjoy. Truly the best.",
                  name: "The Rodriguez Family",
                  trip: "Cancún, Mexico",
                },
              ].map((testimonial, i) => (
                <ScrollReveal key={testimonial.name} delay={i * 0.12}>
                  <div className="bg-white rounded-2xl p-8 shadow-sm border border-[oklch(0.92_0.01_260)] h-full flex flex-col">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, j) => (
                        <svg key={j} className="w-4 h-4 text-[oklch(0.75_0.1_80)]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-[oklch(0.35_0.03_260)] text-sm leading-relaxed mb-6 flex-1 italic">
                      "{testimonial.quote}"
                    </p>
                    <div>
                      <p className="font-serif text-base font-semibold text-[oklch(0.15_0.04_260)]">{testimonial.name}</p>
                      <p className="text-xs text-[oklch(0.50_0.03_260)]">{testimonial.trip}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===== BOOKING SECTION ===== */}
        <section id="booking" className="bg-white py-24 md:py-32 relative">
          {/* Top decorative line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-[oklch(0.62_0.19_260/0.4)] to-transparent" />
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* Left: Trust + Benefits */}
              <ScrollReveal direction="left">
                <div>
                  <span className="text-xs uppercase tracking-[0.3em] text-[oklch(0.62_0.19_260)] font-semibold">
                    Start Your Journey
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[oklch(0.15_0.04_260)] mt-3 mb-6">
                    Let's plan something unforgettable
                  </h2>
                  <p className="text-[oklch(0.45_0.03_260)] text-lg leading-relaxed mb-10">
                    Fill out the form and Kat will personally get back to you within 24 hours. 
                    No bots, no automated replies — just a real person who loves helping people travel.
                  </p>

                  <div className="space-y-5">
                    {[
                      { icon: Sparkles, text: "100% free consultation — no obligations" },
                      { icon: Heart, text: "Personalized to your style and budget" },
                      { icon: Clock, text: "Response within 24 hours" },
                      { icon: CheckCircle2, text: "Hilton partner with exclusive rates" },
                    ].map((item) => (
                      <div key={item.text} className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-[oklch(0.62_0.19_260/0.1)] flex items-center justify-center shrink-0">
                          <item.icon className="w-5 h-5 text-[oklch(0.50_0.15_260)]" />
                        </div>
                        <span className="text-[oklch(0.25_0.04_260)] font-medium">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* Right: Form */}
              <ScrollReveal direction="right">
                <form
                  onSubmit={handleSubmit}
                  className="bg-[oklch(0.98_0.003_260)] rounded-3xl p-8 md:p-10 shadow-xl border border-[oklch(0.92_0.01_260)]"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="sm:col-span-2">
                      <label className="text-sm font-medium text-[oklch(0.30_0.04_260)] mb-1.5 block">Full Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-[oklch(0.90_0.01_260)] bg-[oklch(0.98_0.003_260)] text-[oklch(0.15_0.04_260)] placeholder:text-[oklch(0.60_0.02_260)] focus:outline-none focus:ring-2 focus:ring-[oklch(0.62_0.19_260/0.3)] focus:border-[oklch(0.62_0.19_260)] transition-all"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[oklch(0.30_0.04_260)] mb-1.5 block">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-[oklch(0.90_0.01_260)] bg-[oklch(0.98_0.003_260)] text-[oklch(0.15_0.04_260)] placeholder:text-[oklch(0.60_0.02_260)] focus:outline-none focus:ring-2 focus:ring-[oklch(0.62_0.19_260/0.3)] focus:border-[oklch(0.62_0.19_260)] transition-all"
                        placeholder="you@email.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[oklch(0.30_0.04_260)] mb-1.5 block">Phone</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-[oklch(0.90_0.01_260)] bg-[oklch(0.98_0.003_260)] text-[oklch(0.15_0.04_260)] placeholder:text-[oklch(0.60_0.02_260)] focus:outline-none focus:ring-2 focus:ring-[oklch(0.62_0.19_260/0.3)] focus:border-[oklch(0.62_0.19_260)] transition-all"
                        placeholder="(555) 000-0000"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[oklch(0.30_0.04_260)] mb-1.5 block">Number of Travelers</label>
                      <input
                        type="number"
                        min="1"
                        value={formData.travelers}
                        onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-[oklch(0.90_0.01_260)] bg-[oklch(0.98_0.003_260)] text-[oklch(0.15_0.04_260)] placeholder:text-[oklch(0.60_0.02_260)] focus:outline-none focus:ring-2 focus:ring-[oklch(0.62_0.19_260/0.3)] focus:border-[oklch(0.62_0.19_260)] transition-all"
                        placeholder="2"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[oklch(0.30_0.04_260)] mb-1.5 block">Dream Experience</label>
                      <input
                        type="text"
                        value={formData.destination}
                        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-[oklch(0.90_0.01_260)] bg-[oklch(0.98_0.003_260)] text-[oklch(0.15_0.04_260)] placeholder:text-[oklch(0.60_0.02_260)] focus:outline-none focus:ring-2 focus:ring-[oklch(0.62_0.19_260/0.3)] focus:border-[oklch(0.62_0.19_260)] transition-all"
                        placeholder="e.g. Caribbean cruise, Europe by train..."
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-sm font-medium text-[oklch(0.30_0.04_260)] mb-1.5 block">Budget Range</label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-[oklch(0.90_0.01_260)] bg-[oklch(0.98_0.003_260)] text-[oklch(0.15_0.04_260)] focus:outline-none focus:ring-2 focus:ring-[oklch(0.62_0.19_260/0.3)] focus:border-[oklch(0.62_0.19_260)] transition-all"
                      >
                        <option value="">Select your budget</option>
                        <option value="under-2k">Under $2,000</option>
                        <option value="2k-5k">$2,000 – $5,000</option>
                        <option value="5k-10k">$5,000 – $10,000</option>
                        <option value="10k-plus">$10,000+</option>
                        <option value="flexible">Flexible / Not Sure</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-sm font-medium text-[oklch(0.30_0.04_260)] mb-1.5 block">Additional Details</label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-[oklch(0.90_0.01_260)] bg-[oklch(0.98_0.003_260)] text-[oklch(0.15_0.04_260)] placeholder:text-[oklch(0.60_0.02_260)] focus:outline-none focus:ring-2 focus:ring-[oklch(0.62_0.19_260/0.3)] focus:border-[oklch(0.62_0.19_260)] transition-all resize-none"
                        placeholder="Tell us about your dream trip..."
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-6 inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[oklch(0.62_0.19_260)] to-[oklch(0.50_0.15_260)] text-white font-semibold rounded-xl shadow-lg shadow-[oklch(0.62_0.19_260/0.25)] hover:shadow-[oklch(0.62_0.19_260/0.45)] hover:scale-[1.02] transition-all duration-300 text-base"
                  >
                    {formSubmitted ? (
                      <>
                        <CheckCircle2 className="w-5 h-5" />
                        Inquiry Sent — We'll Be in Touch!
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send My Inquiry — It's Free
                      </>
                    )}
                  </button>
                </form>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
