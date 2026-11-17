import { Cpu, Smartphone } from "lucide-react";
import { MaskedLines, Reveal } from "./Reveal";

const crafts = [
  {
    icon: Smartphone,
    title: "Apps",
    body: "We design and build apps for phones and the web — from the first sketch to the version people actually use every day.",
  },
  {
    icon: Cpu,
    title: "Small AI models",
    body: "We train small models from scratch for one real job, on real footage — not a giant model bent to fit.",
  },
];

export default function Studio() {
  return (
    <section
      id="studio"
      aria-label="The studio"
      className="scroll-mt-28 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            <span className="h-px w-10 bg-accent" aria-hidden="true" />
            Studio
          </p>
        </Reveal>
        <MaskedLines
          as="h2"
          lines={["A small studio", "with two crafts."]}
          className="max-w-3xl font-display text-4xl font-medium leading-[1.1] tracking-tight text-primary sm:text-6xl"
        />
        <Reveal delay={0.15}>
          <p className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-secondary">
            We stay small on purpose. A small team means the people you talk
            to are the people who build it — and every project gets the same
            care, whether it is an app in someone&rsquo;s pocket or a model
            watching a room.
          </p>
        </Reveal>
        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {crafts.map((craft, i) => (
            <Reveal key={craft.title} delay={0.1 * i}>
              <div className="h-full rounded-2xl border border-border bg-card p-8 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                <craft.icon
                  size={28}
                  strokeWidth={2}
                  className="text-primary"
                  aria-hidden="true"
                />
                <h3 className="mt-6 font-display text-2xl font-semibold text-primary">
                  {craft.title}
                </h3>
                <p className="mt-3 font-light leading-relaxed text-secondary">
                  {craft.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
