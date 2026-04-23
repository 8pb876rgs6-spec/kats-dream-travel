/**
 * About Page — Kat's Dream Destination Travel
 * Design: Cinematic Voyager — editorial film aesthetic, luxury travel
 * Sections: Hero → Mission → Story → Values → Why Choose Us → CTA → Footer
 */
import { Link } from "wouter";
import {
  Plane,
  Heart,
  Eye,
  Award,
  Sparkles,
  Clock,
  MapPinned,
  Shield,
  Hotel,
  Train,
  User,
  DollarSign,
  ChevronRight,
  Quote,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

const ABOUT_HERO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663477345712/dHh7MfoMqSwueh7MPSfyUG/about-hero-UEtJnNobELbZMhQHcez3vg.webp";
const KAT_PROFILE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663477345712/dHh7MfoMqSwueh7MPSfyUG/kat-profile-UCQ9nkFQBpGRbqp6EgoJaN.webp";
const CTA_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663477345712/dHh7MfoMqSwueh7MPSfyUG/cta-background-6ACjoT2usg2KTvPCJVenT6.webp";

const VALUES = [
  {
    icon: Heart,
    title: "You Come First",
    desc: "Every recommendation, every itinerary, every detail — it all starts with understanding what matters most to you.",
  },
  {
    icon: Eye,
    title: "Transparency Always",
    desc: "No hidden fees, no surprises. We believe in honest communication and clear expectations from day one.",
  },
  {
    icon: Award,
    title: "Excellence in Every Detail",
    desc: "From the hotel you wake up in to the restaurant you dine at — we obsess over the details so you don't have to.",
  },
];

const WHY_CHOOSE = [
  { icon: Sparkles, title: "Free Consultation", desc: "No cost, no commitment — just a friendly conversation about your dream trip." },
  { icon: User, title: "Real Person, Not a Bot", desc: "Kat personally handles every inquiry. You'll always talk to a human." },
  { icon: Clock, title: "Fast Response", desc: "Expect a thoughtful reply within 24 hours of reaching out." },
  { icon: MapPinned, title: "Any Destination", desc: "From tropical islands to European cities — we plan trips worldwide." },
  { icon: DollarSign, title: "Any Budget", desc: "Whether it's a cozy getaway or a luxury escape, we work with your budget." },
  { icon: Shield, title: "Full Support", desc: "Travel insurance guidance, booking changes, and support throughout your trip." },
];

const FEATURES = [
  { icon: Heart, text: "Personalized service for every traveler" },
  { icon: Hotel, text: "Exclusive Hilton partner access" },
  { icon: Shield, text: "Travel insurance guidance included" },
  { icon: Train, text: "Train & flight booking worldwide" },
];

export default function About() {
  return (
    <>
      <Navbar />

      {/* ===== ABOUT HERO ===== */}
      <section className="relative min-h-[70vh] bg-[oklch(0.10_0.04_260)] overflow-hidden flex items-end">
        <img
          src={ABOUT_HERO}
          alt="Luxury travel"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.10_0.04_260)] via-[oklch(0.10_0.04_260/0.6)] to-[oklch(0.10_0.04_260/0.3)]" />

        <div className="container relative z-10 pb-16 md:pb-24 pt-32">
          <ScrollReveal>
            <span className="text-xs uppercase tracking-[0.3em] text-[oklch(0.75_0.1_80)] font-semibold">
              About Us
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white mt-3 mb-5 max-w-3xl leading-[1.1]">
              Travel planned with passion.
            </h1>
            <p className="text-white/50 text-lg md:text-xl max-w-2xl leading-relaxed">
              Behind every trip we plan is a deep love for travel and a commitment to making your experience truly personal.
            </p>
          </ScrollReveal>

          {/* Profile Card */}
          <ScrollReveal delay={0.3}>
            <div className="mt-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 max-w-xl flex gap-6 items-start">
              <img
                src={KAT_PROFILE}
                alt="Kat — Founder & Travel Concierge"
                className="w-20 h-20 md:w-24 md:h-24 rounded-2xl object-cover shadow-lg shrink-0"
              />
              <div>
                <h3 className="font-serif text-xl md:text-2xl text-white font-semibold">Kat</h3>
                <p className="text-[oklch(0.75_0.1_80)] text-sm font-medium mb-3">Founder & Travel Concierge</p>
                <p className="text-white/50 text-sm leading-relaxed">
                  A passionate traveler who turned her love for exploring the world into a mission: helping others experience unforgettable journeys — stress-free and personalized.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {["Hilton Partner", "Custom Itineraries", "Insurance Expert"].map((badge) => (
                    <span
                      key={badge}
                      className="text-[10px] uppercase tracking-wider px-3 py-1 rounded-full bg-[oklch(0.62_0.19_260/0.15)] text-[oklch(0.62_0.19_260)] font-semibold border border-[oklch(0.62_0.19_260/0.2)]"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== MISSION SECTION ===== */}
      <section className="bg-[oklch(0.97_0.005_80)] py-24 md:py-32">
        <div className="container">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-xs uppercase tracking-[0.3em] text-[oklch(0.62_0.19_260)] font-semibold">
                Our Mission
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[oklch(0.15_0.04_260)] mt-3 mb-6">
                Why Kat's Dream Destination Travel exists
              </h2>
              <p className="text-[oklch(0.40_0.03_260)] text-lg md:text-xl leading-relaxed">
                We believe that travel should be more than just a vacation — it should be a life-changing experience. 
                Our mission is to create unforgettable, deeply personalized journeys that connect people with the world 
                and with each other. Every trip we plan is built on trust, attention to detail, and a genuine passion 
                for making dreams come true.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== STORY SECTION ===== */}
      <section className="bg-white py-24 md:py-32">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left: Story */}
            <ScrollReveal direction="left">
              <div>
                <span className="text-xs uppercase tracking-[0.3em] text-[oklch(0.62_0.19_260)] font-semibold">
                  Our Story
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[oklch(0.15_0.04_260)] mt-3 mb-6">
                  Born from a love of travel
                </h2>
                <div className="space-y-5 text-[oklch(0.40_0.03_260)] leading-relaxed">
                  <p>
                    Kat's Dream Destination Travel was founded on a simple belief: that everyone deserves access to 
                    extraordinary travel experiences, regardless of their budget or experience level. What started as 
                    helping friends and family plan their vacations grew into a full-service travel agency built on 
                    personal connections.
                  </p>
                  <p>
                    We take a deeply personal approach to every trip. No templates, no cookie-cutter packages. 
                    Instead, we listen to your story, understand your dreams, and craft an itinerary that feels 
                    like it was made just for you — because it was.
                  </p>
                </div>

                {/* Quote */}
                <div className="mt-8 pl-6 border-l-2 border-[oklch(0.75_0.1_80)]">
                  <Quote className="w-6 h-6 text-[oklch(0.75_0.1_80)] mb-2" />
                  <p className="text-[oklch(0.25_0.04_260)] font-serif text-xl italic leading-relaxed">
                    "I don't just plan trips — I create experiences that people carry with them forever. 
                    That's what makes this work so meaningful to me."
                  </p>
                  <p className="text-[oklch(0.50_0.03_260)] text-sm mt-3 font-medium">
                    — Kat, Founder
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Right: Features */}
            <ScrollReveal direction="right">
              <div className="space-y-5">
                <h3 className="font-serif text-2xl font-semibold text-[oklch(0.15_0.04_260)] mb-6">
                  What sets us apart
                </h3>
                {FEATURES.map((feature) => (
                  <div
                    key={feature.text}
                    className="flex items-start gap-4 p-5 rounded-2xl bg-[oklch(0.97_0.005_80)] border border-[oklch(0.92_0.01_260)]"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[oklch(0.62_0.19_260/0.1)] to-[oklch(0.50_0.15_260/0.05)] flex items-center justify-center shrink-0">
                      <feature.icon className="w-5 h-5 text-[oklch(0.50_0.15_260)]" />
                    </div>
                    <span className="text-[oklch(0.25_0.04_260)] font-medium pt-2">{feature.text}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== VALUES SECTION (Dark Theme) ===== */}
      <section className="bg-[oklch(0.10_0.04_260)] py-24 md:py-32">
        <div className="container">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-xs uppercase tracking-[0.3em] text-[oklch(0.75_0.1_80)] font-semibold">
                Our Values
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3">
                What we stand for
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUES.map((value, i) => (
              <ScrollReveal key={value.title} delay={i * 0.15}>
                <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-[oklch(0.62_0.19_260/0.3)] transition-all duration-500 h-full">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[oklch(0.62_0.19_260/0.2)] to-[oklch(0.75_0.1_80/0.1)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="w-6 h-6 text-[oklch(0.75_0.1_80)]" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-white mb-3">{value.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{value.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="bg-[oklch(0.97_0.005_80)] py-24 md:py-32">
        <div className="container">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-xs uppercase tracking-[0.3em] text-[oklch(0.62_0.19_260)] font-semibold">
                Why Choose Us
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[oklch(0.15_0.04_260)] mt-3">
                The Kat's Dream difference
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_CHOOSE.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.08}>
                <div className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-[oklch(0.92_0.01_260)] hover:shadow-lg transition-shadow duration-300">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[oklch(0.62_0.19_260/0.1)] to-[oklch(0.50_0.15_260/0.05)] flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-[oklch(0.50_0.15_260)]" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-semibold text-[oklch(0.15_0.04_260)] mb-1">{item.title}</h4>
                    <p className="text-[oklch(0.45_0.03_260)] text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        <img
          src={CTA_BG}
          alt="Luxury travel destination"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[oklch(0.10_0.04_260/0.75)]" />

        <div className="container relative z-10 text-center">
          <ScrollReveal>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-3xl mx-auto leading-[1.1]">
              Ready to plan your dream trip?
            </h2>
            <p className="text-white/50 text-lg md:text-xl max-w-xl mx-auto mb-10">
              Your unforgettable journey is just one conversation away. Let's make it happen.
            </p>
            <a
              href="/#booking"
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[oklch(0.62_0.19_260)] to-[oklch(0.50_0.15_260)] text-white font-semibold rounded-full shadow-2xl shadow-[oklch(0.62_0.19_260/0.3)] hover:shadow-[oklch(0.62_0.19_260/0.5)] hover:scale-105 transition-all duration-300 text-lg"
            >
              Start Planning — It's Free
              <Plane className="w-5 h-5 -rotate-45" />
            </a>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
