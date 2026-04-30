/**
 * Footer — Consistent across all pages
 * Design: Cinematic Voyager — deep navy, elegant serif, gold accents
 */
import { Link, useLocation } from "wouter";
import { Plane, Mail, Phone, Ship, Train, MapPin, Palmtree, Anchor } from "lucide-react";

function useHashNav() {
  const [location, setLocation] = useLocation();

  const handleHashClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const id = href.slice(2); // remove "/#"
    if (location === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      setLocation("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  };

  return handleHashClick;
}

export default function Footer() {
  const handleHashClick = useHashNav();

  const exploreLinks = [
    { label: "Services", href: "/#services" },
    { label: "Travel Experiences", href: "/#destinations" },
    { label: "About Kat", href: "/about" },
    { label: "Book a Trip", href: "/#booking" },
  ];

  return (
    <footer className="bg-[oklch(0.10_0.04_260)] text-white/80">
      <div className="container py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[oklch(0.62_0.19_260)] to-[oklch(0.75_0.1_80)] flex items-center justify-center">
                <Plane className="w-5 h-5 text-white -rotate-45" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-serif text-lg font-semibold text-white">
                  Kat's Dream Destination
                </span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[oklch(0.75_0.1_80)] font-medium">
                  Travel Agency
                </span>
              </div>
            </div>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              Personalized travel planning with a human touch. Your dream trip is just a conversation away.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-white mb-5">Explore</h4>
            <ul className="space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith("/#") ? (
                    <a
                      href={link.href}
                      onClick={(e) => handleHashClick(e, link.href)}
                      className="text-sm text-white/50 hover:text-[oklch(0.75_0.1_80)] transition-colors duration-300 cursor-pointer"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => window.scrollTo(0, 0)}
                      className="text-sm text-white/50 hover:text-[oklch(0.75_0.1_80)] transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Travel Experiences */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-white mb-5">Popular Experiences</h4>
            <ul className="space-y-3">
              {[
                { label: "Caribbean Cruises", icon: Ship },
                { label: "Alaska Glacier Cruises", icon: Anchor },
                { label: "European Rail Journeys", icon: Train },
                { label: "Coastal Road Trips", icon: MapPin },
                { label: "Family Beach Getaways", icon: Palmtree },
              ].map(
                (item) => (
                  <li key={item.label}>
                    <span className="text-sm text-white/50 flex items-center gap-2">
                      <item.icon className="w-3 h-3 text-[oklch(0.62_0.19_260)]" />
                      {item.label}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-white mb-5">Get in Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[oklch(0.62_0.19_260)]" />
                <span className="text-sm text-white/50">katsddtravel@gmail.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[oklch(0.62_0.19_260)]" />
                <a href="tel:+12816364873" className="text-sm text-white/50 hover:text-[oklch(0.75_0.1_80)] transition-colors duration-300">(281) 636-4873</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Cornerstone Travel Affiliate Section */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col items-center text-center">
            {/* Plane Icon in Circle */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[oklch(0.62_0.19_260)] to-[oklch(0.50_0.15_260)] flex items-center justify-center mb-4 shadow-lg">
              <Plane className="w-8 h-8 text-white -rotate-45" />
            </div>

            {/* Cornerstone Branding */}
            <h3 className="font-serif text-2xl font-semibold text-white mb-1" style={{ fontStyle: "italic" }}>
              Cornerstone
            </h3>
            <p className="text-xs uppercase tracking-[0.2em] text-[oklch(0.75_0.1_80)] font-medium mb-4">
              Lets Go Travel Affiliate
            </p>

            {/* License Information */}
            <div className="text-xs text-white/40 space-y-1">
              <p>California SOT #2158353-50</p>
              <p>Florida SOT Ref. #ST44927</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} Kat's Dream Destination Travel. All rights reserved.
          </p>
          <p className="text-xs text-white/30">
            Crafted with passion for unforgettable journeys.
          </p>
        </div>
      </div>
    </footer>
  );
}
