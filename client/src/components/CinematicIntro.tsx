/**
 * CinematicIntro — Airplane window zoom animation that reveals the homepage
 * Design: Cinematic Voyager — dark cabin, window view, smooth zoom transition
 * Only plays ONCE per session — subsequent visits skip straight to the homepage
 */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plane } from "lucide-react";

const AIRPLANE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663477345712/dHh7MfoMqSwueh7MPSfyUG/hero-airplane-window-QCCfvZERJVu8HGxRZEEBqo.webp";

const INTRO_SEEN_KEY = "kdt-intro-seen";

interface CinematicIntroProps {
  onComplete: () => void;
}

export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
  // Check if intro was already shown this session
  const alreadySeen = typeof window !== "undefined" && sessionStorage.getItem(INTRO_SEEN_KEY) === "true";

  const [phase, setPhase] = useState<"loading" | "window" | "zoom" | "done">(
    alreadySeen ? "done" : "loading"
  );

  // If already seen, immediately complete
  useEffect(() => {
    if (alreadySeen) {
      onComplete();
    }
  }, [alreadySeen, onComplete]);

  // Image preload
  useEffect(() => {
    if (alreadySeen) return;
    const img = new Image();
    img.src = AIRPLANE_IMG;
    img.onload = () => {
      setTimeout(() => setPhase("window"), 300);
    };
    img.onerror = () => {
      setTimeout(() => setPhase("window"), 300);
    };
    // Fallback if image takes too long
    const fallback = setTimeout(() => {
      if (phase === "loading") setPhase("window");
    }, 2000);
    return () => clearTimeout(fallback);
  }, []);

  // Phase progression
  useEffect(() => {
    if (alreadySeen) return;
    if (phase === "window") {
      const t = setTimeout(() => setPhase("zoom"), 2200);
      return () => clearTimeout(t);
    }
    if (phase === "zoom") {
      const t = setTimeout(() => {
        setPhase("done");
        sessionStorage.setItem(INTRO_SEEN_KEY, "true");
        onComplete();
      }, 1400);
      return () => clearTimeout(t);
    }
  }, [phase, onComplete, alreadySeen]);

  const handleSkip = () => {
    setPhase("done");
    sessionStorage.setItem(INTRO_SEEN_KEY, "true");
    onComplete();
  };

  // If already seen, render nothing
  if (alreadySeen) return null;

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[100] bg-[oklch(0.08_0.03_260)] flex items-center justify-center overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Ambient particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-white/10"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Loading phase */}
          {phase === "loading" && (
            <motion.div
              className="flex flex-col items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Plane className="w-8 h-8 text-[oklch(0.62_0.19_260)] -rotate-45" />
              </motion.div>
              <span className="text-white/40 text-sm tracking-[0.3em] uppercase font-sans">
                Preparing your journey
              </span>
            </motion.div>
          )}

          {/* Window phase — show the airplane window view */}
          {(phase === "window" || phase === "zoom") && (
            <motion.div
              className="relative w-full h-full flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {/* Airplane cabin darkness */}
              <div className="absolute inset-0 bg-[oklch(0.08_0.03_260)]" />

              {/* The window image with zoom effect */}
              <motion.div
                className="relative w-full h-full"
                animate={
                  phase === "zoom"
                    ? { scale: 3.5, opacity: 0 }
                    : { scale: 1, opacity: 1 }
                }
                transition={
                  phase === "zoom"
                    ? { duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }
                    : { duration: 1.2, ease: "easeOut" }
                }
              >
                <img
                  src={AIRPLANE_IMG}
                  alt="View from airplane window"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Skip button */}
              <motion.button
                className="absolute top-8 right-8 z-10 text-white/40 hover:text-white/80 text-xs uppercase tracking-[0.2em] font-sans transition-colors duration-300 px-4 py-2 rounded-full border border-white/10 hover:border-white/20 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                onClick={handleSkip}
              >
                Skip Intro
              </motion.button>

              {/* Brand text overlay */}
              <motion.div
                className="absolute bottom-12 left-0 right-0 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  phase === "zoom"
                    ? { opacity: 0, y: -20 }
                    : { opacity: 1, y: 0 }
                }
                transition={{ duration: 0.8, delay: phase === "window" ? 0.6 : 0 }}
              >
                <h2 className="font-serif text-2xl md:text-4xl text-white font-semibold tracking-wide">
                  Kat's Dream Destination
                </h2>
                <p className="text-[oklch(0.75_0.1_80)] text-xs md:text-sm tracking-[0.35em] uppercase mt-2 font-sans">
                  Your journey begins now
                </p>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
