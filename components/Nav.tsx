"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Studio", href: "#studio" },
  { label: "Models", href: "#models" },
  { label: "Apps", href: "#apps" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open ]);

  return (
    <header className="fixed inset-x-0 top-3 z-50 flex justify-center px-4 sm:top-4">
      <nav
        aria-label="Main"
        className={`w-full max-w-5xl border border-border/70 bg-white/70 shadow-[0_4px_24px_rgba(28,25,23,0.08)] backdrop-blur-xl ${open ? "rounded-[28px]" : "rounded-full"}`}
      >
        <div className="flex items-center justify-between py-2.5 pl-5 pr-2.5 sm:pl-6">
          <a
            href="#top"
            className="flex items-center gap-2.5 font-display text-[1.35rem] font-semibold leading-none tracking-tight text-primary"
            aria-label="Aorigoon — back to top"
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="13" cy="13" r="11.5" stroke="#1c1917" strokeWidth="1.5" />
              <circle cx="13" cy="13" r="6.5" stroke="#a16207" strokeWidth="1.5" />
              <circle cx="13" cy="13" r="2" fill="#1c1917" />
            </svg>
            Aorigoon
          </a>

          <div className="hidden items-center gap-7 md:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-secondary transition-colors duration-200 hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90 sm:inline-block"
            >
              Let&rsquo;s talk
            </a>
            <button
              ref={buttonRef}
              type="button"
              className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-primary transition-colors duration-200 hover:bg-primary/5 md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {open && (
          <div
            id="mobile-menu"
            className="border-t border-border/70 px-5 pb-5 pt-3 md:hidden"
          >
            <ul className="flex flex-col">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="block rounded-lg py-3 text-base font-medium text-secondary transition-colors duration-200 hover:text-primary"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="#contact"
                  className="block rounded-full bg-primary px-5 py-3 text-center text-base font-medium text-white"
                  onClick={() => setOpen(false)}
                >
                  Let&rsquo;s talk
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
