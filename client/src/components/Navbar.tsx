/**
 * Navbar — Sticky navigation with luxury travel aesthetic
 * Design: Cinematic Voyager — deep navy, gold accents, elegant serif logo
 */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Plane } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function scrollToId(id: string) {
  // Multiple retries to ensure DOM is ready after route change
  const attempt = (retries = 0) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else if (retries < 5) {
      setTimeout(() => attempt(retries + 1), 100);
    }
  };
  attempt();
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const navLinks = [
    { label: "Services", href: "/#services" },
    { label: "Experiences", href: "/#destinations" },
    { label: "About Kat", href: "/about" },
  ];

  const handleHashNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    e.stopPropagation();

    if (!href.startsWith("/#")) return;

    const id = href.slice(2);

    if (location === "/") {
      // Already on home page — just scroll
      scrollToId(id);
    } else {
      // Navigate to home first, then scroll after route change
      setLocation("/");
      // Wait for ScrollToTop to fire and page to render, then scroll to section
      setTimeout(() => scrollToId(id), 400);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[oklch(0.12_0.04_260/0.95)] backdrop-blur-xl shadow-2xl shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-18 md:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[oklch(0.62_0.19_260)] to-[oklch(0.75_0.1_80)] flex items-center justify-center shadow-lg shadow-[oklch(0.62_0.19_260/0.3)] group-hover:shadow-[oklch(0.62_0.19_260/0.5)] transition-shadow duration-300">
            <Plane className="w-5 h-5 text-white -rotate-45" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-serif text-lg md:text-xl font-semibold text-white tracking-wide">
              Kat's Dream Destination
            </span>
            <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-[oklch(0.75_0.1_80)] font-sans font-medium">
              Travel Agency
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <span key={link.label}>
              {link.href.startsWith("/#") ? (
                <a
                  href={link.href}
                  onClick={(e) => handleHashNavClick(e, link.href)}
                  className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-300 tracking-wide uppercase cursor-pointer"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  href={link.href}
                  className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-300 tracking-wide uppercase"
                >
                  {link.label}
                </Link>
              )}
            </span>
          ))}
          <a
            href="/#booking"
            onClick={(e) => handleHashNavClick(e, "/#booking")}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[oklch(0.62_0.19_260)] to-[oklch(0.50_0.15_260)] text-white text-sm font-semibold rounded-full shadow-lg shadow-[oklch(0.62_0.19_260/0.3)] hover:shadow-[oklch(0.62_0.19_260/0.5)] hover:scale-105 transition-all duration-300"
          >
            Book Now
            <Plane className="w-4 h-4 -rotate-45" />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white p-2"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[oklch(0.12_0.04_260/0.98)] backdrop-blur-xl border-t border-white/10 overflow-hidden"
          >
            <div className="container py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <span key={link.label}>
                  {link.href.startsWith("/#") ? (
                    <a
                      href={link.href}
                      onClick={(e) => {
                        handleHashNavClick(e, link.href);
                        setMobileOpen(false);
                      }}
                      className="text-base font-medium text-white/80 hover:text-white transition-colors py-2 tracking-wide block"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-base font-medium text-white/80 hover:text-white transition-colors py-2 tracking-wide block"
                    >
                      {link.label}
                    </Link>
                  )}
                </span>
              ))}
              <a
                href="/#booking"
                onClick={(e) => {
                  handleHashNavClick(e, "/#booking");
                  setMobileOpen(false);
                }}
                className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-gradient-to-r from-[oklch(0.62_0.19_260)] to-[oklch(0.50_0.15_260)] text-white font-semibold rounded-full mt-2"
              >
                Book Now
                <Plane className="w-4 h-4 -rotate-45" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
