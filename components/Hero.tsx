"use client";

import { useEffect, useRef, useState } from "react";

const BASE_Y = 160;

/**
 * Generates exact geometric points for the Notiune ribbon:
 * flat -> 90° fillet -> tall/rounded semicircular U-bends -> 90° fillet -> flat.
 */
function getBasePoints(): [number, number][] {
  const pts: [number, number][] = [];
  const push = (x: number, y: number) => pts.push([x, y]);

  // Flat left
  for (let x = -20; x <= 740; x += 16) push(x, BASE_Y);

  // Entry quarter-circle (740, 160) -> (775, 125)
  for (let i = 1; i <= 8; i++) {
    const a = Math.PI / 2 - (i / 8) * (Math.PI / 2);
    push(740 + Math.cos(a) * 35, 125 + Math.sin(a) * 35);
  }

  // Up to first arch
  for (let y = 115; y >= 70; y -= 12) push(775, y);

  // First upper semicircle (center 820, 70, r=45)
  for (let i = 0; i <= 16; i++) {
    const a = Math.PI - (i / 16) * Math.PI;
    push(820 + Math.cos(a) * 45, 70 - Math.sin(a) * 45);
  }

  // Down to first trough
  for (let y = 82; y <= 245; y += 14) push(865, y);

  // First lower semicircle (center 910, 245, r=45)
  for (let i = 0; i <= 16; i++) {
    const a = Math.PI - (i / 16) * Math.PI;
    push(910 + Math.cos(a) * 45, 245 + Math.sin(a) * 45);
  }

  // Up to second arch (taller, up near the header)
  for (let y = 232; y >= -110; y -= 16) push(955, y);

  // Second upper semicircle (center 1000, -110, r=45)
  for (let i = 0; i <= 16; i++) {
    const a = Math.PI - (i / 16) * Math.PI;
    push(1000 + Math.cos(a) * 45, -110 - Math.sin(a) * 45);
  }

  // Down to baseline (1045, 125) and curve directly onto BASE_Y = 160
  for (let y = -98; y <= 125; y += 16) push(1045, y);

  // Exit quarter-circle (1045, 125) -> (1080, 160)
  for (let i = 1; i <= 8; i++) {
    const a = Math.PI - (i / 8) * (Math.PI / 2);
    push(1080 + Math.cos(a) * 35, 125 + Math.sin(a) * 35);
  }

  // Flat right (extended to 2400 so panning left never leaves a gap)
  for (let x = 1095; x <= 2400; x += 24) push(x, BASE_Y);

  return pts;
}

const BASE_POINTS = getBasePoints();

function buildElasticPath(
  pullX: number,
  pullY: number,
  strength: number,
  introDrop = 0
): string {
  const sigma = 150;
  const pts: [number, number][] = BASE_POINTS.map(([bx, by]) => {
    let x = bx;
    let y = by;

    if (Math.abs(introDrop) > 0.5) {
      const t = Math.max(0, Math.min(1, bx / 1440));
      y += Math.pow(Math.sin(t * Math.PI), 0.75) * introDrop;
    }

    if (Math.abs(strength) > 0.001) {
      const dist = Math.hypot(x - pullX, y - pullY);
      const influence = Math.exp(-(dist * dist) / (2 * sigma * sigma)) * strength;
      x += (pullX - x) * influence * 0.65;
      y += (pullY - y) * influence;
    }

    return [x, y];
  });

  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const xc = (pts[i][0] + pts[i + 1][0]) / 2;
    const yc = (pts[i][1] + pts[i + 1][1]) / 2;
    d += ` Q ${pts[i][0].toFixed(1)} ${pts[i][1].toFixed(1)} ${xc.toFixed(1)} ${yc.toFixed(1)}`;
  }
  const last = pts[pts.length - 1];
  d += ` L ${last[0].toFixed(1)} ${last[1].toFixed(1)}`;
  return d;
}

export function Hero() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const p = Math.max(0, Math.min(1, -rect.top / total));
      setScrollProgress(p);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const [cursor, setCursor] = useState<{
    x: number;
    y: number;
    visible: boolean;
    pressed: boolean;
  }>({ x: 0, y: 0, visible: false, pressed: false });

  const animRef = useRef({
    targetX: 720,
    targetY: BASE_Y,
    targetStrength: 0,
    currentX: 720,
    currentY: BASE_Y,
    currentStrength: 0,
    velStrength: 0,
    introDrop: 520,
    velIntro: 0,
  });

  useEffect(() => {
    let rafId = 0;

    const tick = () => {
      const s = animRef.current;
      s.currentX += (s.targetX - s.currentX) * 0.2;
      s.currentY += (s.targetY - s.currentY) * 0.2;

      // Underdamped spring physics for rubber-band snap-back + bounce on release
      const force = (s.targetStrength - s.currentStrength) * 0.14;
      s.velStrength = (s.velStrength + force) * 0.82;
      s.currentStrength += s.velStrength;

      // Wide bottom-up intro settle spring (slower, smoother)
      const introForce = (0 - s.introDrop) * 0.055;
      s.velIntro = (s.velIntro + introForce) * 0.84;
      s.introDrop += s.velIntro;

      if (pathRef.current) {
        pathRef.current.setAttribute(
          "d",
          buildElasticPath(
            s.currentX,
            s.currentY,
            s.currentStrength,
            s.introDrop
          )
        );
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const updatePointer = (
    e: React.PointerEvent<HTMLDivElement>,
    pressed?: boolean
  ) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;
    const svgX = isMobile
      ? 560 + (relX / rect.width) * 740
      : (relX / rect.width) * 1440;
    const svgY = (relY / rect.height) * 320;

    const isPressed = pressed !== undefined ? pressed : cursor.pressed;
    animRef.current.targetX = svgX;
    animRef.current.targetY = svgY;
    animRef.current.targetStrength = isPressed ? 1.0 : 0.35;

    setCursor({
      x: relX,
      y: relY,
      visible: true,
      pressed: isPressed,
    });
  };

  const isScrolling = scrollProgress > 0.02;
  const heroFade = Math.max(0, 1 - scrollProgress * 3.5);
  const panProgress = Math.min(1, scrollProgress / 0.45);
  const zoomProgress = Math.max(0, (scrollProgress - 0.4) / 0.6);
  const ribbonTranslateX = -panProgress * 28;
  const ribbonScale = 1 + Math.pow(zoomProgress, 1.35) * 42;
  const blueReveal = Math.max(0, Math.min(1, (scrollProgress - 0.72) / 0.28));

  return (
    <div ref={wrapperRef} className="relative h-[260vh] bg-[#F1F0EC]">
      <div className="sticky top-0 flex min-h-screen flex-col justify-between overflow-hidden bg-[#F1F0EC] text-[#121212]">
        {/* Full-screen Teal Backdrop matching the expanded ribbon */}
        <div
          aria-hidden="true"
          style={{ opacity: blueReveal }}
          className="pointer-events-none fixed inset-0 z-0 bg-[#0D9488]"
        />
      {/* Top Navigation */}
      <header
        style={{ opacity: heroFade }}
        className="relative z-20 mx-auto flex w-full max-w-[1400px] items-center justify-between px-6 py-7 md:px-14"
      >
        <a
          href="#"
          className="text-xl font-bold tracking-tight text-[#121212]"
        >
          notiune
        </a>

        {/* Mobile Menu trigger */}
        <button
          type="button"
          aria-label="Open menu"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#121212] md:hidden"
        >
          <span>Menu</span>
          <span aria-hidden="true" className="flex flex-col gap-1">
            <span className="block h-[1.5px] w-4 bg-[#121212]" />
            <span className="block h-[1.5px] w-4 bg-[#121212]" />
          </span>
        </button>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-6 text-sm md:flex md:gap-8"
        >
          <a
            href="#studio"
            className="text-[#121212]/65 transition-colors hover:text-[#121212]"
          >
            Studio
          </a>
          <a
            href="#work"
            className="text-[#121212]/65 transition-colors hover:text-[#121212]"
          >
            Work<sup className="ml-0.5 text-[10px]">(12)</sup>
          </a>
          <a
            href="#services"
            className="text-[#121212]/65 transition-colors hover:text-[#121212]"
          >
            Services<sup className="ml-0.5 text-[10px]">(6)</sup>
          </a>
          <a
            href="#journal"
            className="text-[#121212]/65 transition-colors hover:text-[#121212]"
          >
            Journal<sup className="ml-0.5 text-[10px]">(6)</sup>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 font-medium text-[#121212]"
          >
            <span
              aria-hidden="true"
              className="inline-block h-2 w-2 bg-[#0D9488]"
            />
            <span>Let&apos;s talk</span>
          </a>
        </nav>
      </header>

      {/* Main Hero */}
      <main id="main" className="flex flex-1 flex-col justify-between">
        {/* Display Headline (slides up & fades on scroll) */}
        <div
          style={{
            opacity: heroFade,
            transform: `translateY(${-scrollProgress * 160}px)`,
          }}
          className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pt-4 md:px-14 md:pt-8"
        >
          <h1 className="text-[clamp(3.5rem,9vw,7.5rem)] font-semibold leading-[0.94] tracking-[-0.04em] text-[#121212]">
            Your notion,
            <br />
            built.
          </h1>
        </div>

        {/* Interactive Elastic Ribbon Wave (pans left, then zooms into full-screen blue) */}
        <div
          ref={containerRef}
          style={{
            transformOrigin: "82% 50%",
            transform: `translateX(${ribbonTranslateX}%) scale(${ribbonScale})`,
            pointerEvents: isScrolling ? "none" : "auto",
          }}
          onPointerMove={(e) => {
            if (!isScrolling) updatePointer(e);
          }}
          onPointerDown={(e) => {
            if (isScrolling) return;
            e.currentTarget.setPointerCapture(e.pointerId);
            updatePointer(e, true);
          }}
          onPointerUp={(e) => {
            if (e.currentTarget.hasPointerCapture(e.pointerId)) {
              e.currentTarget.releasePointerCapture(e.pointerId);
            }
            animRef.current.targetStrength = 0;
            updatePointer(e, false);
          }}
          onPointerLeave={() => {
            if (!cursor.pressed) {
              animRef.current.targetStrength = 0;
              setCursor((prev) => ({ ...prev, visible: false, pressed: false }));
            }
          }}
          className={`relative w-full select-none overflow-visible touch-none ${
            isScrolling ? "cursor-default" : "cursor-none"
          }`}
        >
          <svg
            viewBox={isMobile ? "560 0 740 320" : "0 0 1440 320"}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-[220px] w-full overflow-visible md:h-auto"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="notiune-ribbon"
                x1="0%"
                y1="50%"
                x2="100%"
                y2="50%"
              >
                <stop offset="0%" stopColor="#047857" />
                <stop offset="45%" stopColor="#0D9488" />
                <stop offset="78%" stopColor="#0284C7" />
                <stop offset="100%" stopColor="#1D4ED8" />
              </linearGradient>
              <filter
                id="ribbon-shadow"
                x="-10%"
                y="-200%"
                width="120%"
                height="450%"
              >
                <feDropShadow
                  dx="0"
                  dy="8"
                  stdDeviation="6"
                  floodColor="#121212"
                  floodOpacity="0.14"
                />
              </filter>
            </defs>
            <path
              ref={pathRef}
              d={buildElasticPath(720, BASE_Y, 0, 520)}
              stroke="url(#notiune-ribbon)"
              strokeWidth="22"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter={isScrolling ? undefined : "url(#ribbon-shadow)"}
            />
          </svg>

          {/* "Click and hold" custom cursor (disabled while scrolling) */}
          {cursor.visible && !isScrolling && (
            <div
              aria-hidden="true"
              style={{
                transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0) translate(-50%, -50%) scale(${cursor.pressed ? 0.9 : 1})`,
              }}
              className="pointer-events-none absolute left-0 top-0 z-30 flex h-20 w-20 items-center justify-center rounded-full bg-[#121212] text-center text-[10px] font-medium leading-tight text-[#F1F0EC] shadow-lg transition-transform duration-100"
            >
              <span>
                Click
                <br />
                and hold
              </span>
            </div>
          )}
        </div>

        {/* Bottom Copy + CTAs (slides down & fades on scroll) */}
        <div
          style={{
            opacity: heroFade,
            transform: `translateY(${scrollProgress * 140}px)`,
          }}
          className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col items-start justify-between gap-6 px-6 pb-8 md:flex-row md:items-end md:px-14 md:pb-10"
        >
          <p className="max-w-md text-base leading-relaxed text-[#121212]/75 md:text-[17px]">
            Notiune designs, builds and runs digital products:
            <br />
            brands, websites, web apps and software.
          </p>

          <div className="flex items-center gap-6">
            <a
              href="#contact"
              className="inline-flex items-center justify-center bg-[#121212] px-7 py-3.5 text-sm font-medium text-[#F1F0EC] transition-opacity hover:opacity-90"
            >
              Let&apos;s talk
            </a>
            <a
              href="#work"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#121212]/80 transition-colors hover:text-[#121212]"
            >
              <span>See the work</span>
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </main>
    </div>
    </div>
  );
}
