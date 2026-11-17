import { ArrowRight, Clock, Mail } from "lucide-react";
import { MaskedLines, Reveal } from "./Reveal";
import LocalTime from "./LocalTime";

export default function Contact() {
  return (
    <section
      id="contact"
      aria-label="Contact"
      className="scroll-mt-28 bg-primary py-24 text-background sm:py-32"
    >
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent-on-dark">
            <span className="h-px w-10 bg-accent-on-dark" aria-hidden="true" />
            Contact
          </p>
        </Reveal>
        <MaskedLines
          as="h2"
          lines={["What should we", "build together?"]}
          className="max-w-4xl font-display text-5xl font-medium leading-[1.05] tracking-tight text-background sm:text-7xl"
        />
        <Reveal delay={0.15}>
          <p className="mt-8 max-w-xl text-lg font-light leading-relaxed text-background/75">
            Tell us about the app you need, or the job a small model could do
            for you. We reply within hours.
          </p>
        </Reveal>
        <Reveal delay={0.25}>
          <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-6">
            <a
              href="mailto:hello@aorigoon.com"
              className="group inline-flex items-center gap-3 rounded-full bg-background px-7 py-3.5 text-sm font-medium text-primary transition-opacity duration-200 hover:opacity-90"
            >
              <Mail size={16} aria-hidden="true" />
              hello@aorigoon.com
              <ArrowRight
                size={16}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </a>
            <p className="inline-flex items-center gap-2.5 text-sm font-light text-background/70">
              <Clock size={16} aria-hidden="true" />
              Local time
              <span className="font-medium tabular-nums text-background">
                <LocalTime />
              </span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
