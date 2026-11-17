"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowDown } from "lucide-react";
import { MaskedLines, Reveal, usePrefersReducedMotion } from "./Reveal";

// Orbital rings: thin glass-translucent circles. On desktop they rotate
// slowly with scroll; on mobile a slow CSS rotation; never under reduced motion.
function OrbitalRings() {
  const reduceMotion = usePrefersReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);
  const { scrollY } = useScroll();
  const rotate = useTransform(scrollY, [0, 700], [0, 45]);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const rings = (
    <svg
      viewBox="0 0 520 520"
      fill="none"
      aria-hidden="true"
      className="h-full w-full"
    >
      <motion.circle
        cx="260"
        cy="260"
        r="240"
        stroke="#1c1917"
        strokeOpacity="0.14"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
      />
      <motion.circle
        cx="260"
        cy="260"
        r="180"
        stroke="#1c1917"
        strokeOpacity="0.18"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.6, delay: 0.15, ease: "easeOut" }}
      />
      <motion.circle
        cx="260"
        cy="260"
        r="120"
        stroke="#a16207"
        strokeOpacity="0.35"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.6, delay: 0.3, ease: "easeOut" }}
      />
      <motion.circle
        cx="260"
        cy="260"
        r="64"
        stroke="#1c1917"
        strokeOpacity="0.22"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.6, delay: 0.45, ease: "easeOut" }}
      />
      <circle cx="260" cy="20" r="4" fill="#a16207" />
      <circle cx="440" cy="260" r="3" fill="#1c1917" fillOpacity="0.4" />
      <circle cx="260" cy="260" r="5" fill="#1c1917" />
    </svg>
  );

  if (reduceMotion) {
    return (
      <div className="pointer-events-none absolute -right-32 -top-16 h-[420px] w-[420px] sm:-right-24 sm:h-[520px] sm:w-[520px] lg:-right-10">
        {rings}
      </div>
    );
  }

  if (isDesktop) {
    return (
      <motion.div
        style={{ rotate }}
        className="pointer-events-none absolute -right-32 -top-16 h-[420px] w-[420px] sm:-right-24 sm:h-[520px] sm:w-[520px] lg:-right-10"
      >
        {rings}
      </motion.div>
    );
  }

  return (
    <div className="pointer-events-none absolute -right-32 -top-16 h-[420px] w-[420px] animate-spin-slow sm:-right-24 sm:h-[520px] sm:w-[520px] lg:-right-10">
      {rings}
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative overflow-hidden pb-24 pt-40 sm:pb-32 sm:pt-48"
    >
      <OrbitalRings />
      <div className="relative mx-auto max-w-5xl px-6">
        <Reveal>
          <p className="mb-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            <span className="h-px w-10 bg-accent" aria-hidden="true" />
            Aorigoon studio
          </p>
        </Reveal>
        <MaskedLines
          as="h1"
          lines={["Apps and small AI models,", "built from scratch."]}
          className="max-w-4xl font-display text-[2.9rem] font-medium leading-[1.05] tracking-tight text-primary sm:text-7xl lg:text-[5.4rem]"
        />
        <Reveal delay={0.25}>
          <p className="mt-8 max-w-xl text-lg font-light leading-relaxed text-secondary sm:text-xl">
            Aorigoon is a small studio. We design and build apps — and we
            train small AI models from scratch for the real world.
          </p>
        </Reveal>
        <Reveal delay={0.35}>
          <div className="mt-12 flex flex-wrap items-center gap-6">
            <a
              href="#contact"
              className="rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90"
            >
              Let&rsquo;s talk
            </a>
            <a
              href="#studio"
              className="group inline-flex items-center gap-2 text-sm font-medium text-primary"
            >
              See what we make
              <ArrowDown
                size={16}
                className="transition-transform duration-200 group-hover:translate-y-0.5"
              />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
