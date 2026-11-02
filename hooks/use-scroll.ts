"use client";
import React from "react";

function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

/** Whether the page has scrolled past `threshold` pixels (false during server rendering) */
export function useScroll(threshold: number) {
  return React.useSyncExternalStore(
    subscribe,
    () => window.scrollY > threshold,
    () => false
  );
}
