/**
 * ScrollToTop — Resets scroll position to top on every route change.
 * This ensures navigating to any page (especially About) always starts at the top.
 */
import { useEffect } from "react";
import { useLocation } from "wouter";

export default function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    // Immediately scroll to top on route change
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}
