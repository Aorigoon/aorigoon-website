"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

// framer-motion's useReducedMotion is unusable under Next.js SSR: it captures
// the server-rendered null in useState and has no setter/subscription to ever
// update it. Read the media query ourselves instead. Default true so content
// renders visible until the client confirms the user wants motion.
export function usePrefersReducedMotion(): boolean {
  const [reduceMotion, setReduceMotion] = useState(true);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return reduceMotion;
}

// Fade-up reveal on scroll into view; renders the final state immediately
// when the user prefers reduced motion.
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduceMotion = usePrefersReducedMotion();
  if (reduceMotion) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Masked line-by-line headline reveal: each line slides up out of an
// overflow-hidden mask. Lines are plain strings so headings stay semantic.
// whileInView lives on the OUTER mask wrapper: the inner line starts
// translated 110% down inside the mask, so an observer on it would see zero
// intersection and never fire. Variants propagate from parent to child.
export function MaskedLines({
  lines,
  className,
  as: Tag = "span",
}: {
  lines: string[];
  className?: string;
  as?: "h1" | "h2" | "span";
}) {
  const reduceMotion = usePrefersReducedMotion();
  if (reduceMotion) {
    return (
      <Tag className={className}>
        {lines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </Tag>
    );
  }
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <motion.span
          key={line}
          className="block overflow-hidden pb-[0.08em] -mb-[0.08em]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          <motion.span
            className="block"
            variants={{
              hidden: { y: "110%" },
              visible: { y: "0%" },
            }}
            transition={{
              duration: 0.8,
              delay: 0.08 * i,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {line}
          </motion.span>
        </motion.span>
      ))}
    </Tag>
  );
}
