import { Globe, Layers, Smartphone, Wand2 } from "lucide-react";
import { MaskedLines, Reveal } from "./Reveal";

const apps = [
  { icon: Smartphone, label: "A mobile app" },
  { icon: Globe, label: "A web app" },
  { icon: Layers, label: "A productivity tool" },
  { icon: Wand2, label: "A creative tool" },
];

export default function Apps() {
  return (
    <section
      id="apps"
      aria-label="Apps we ship"
      className="scroll-mt-28 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            <span className="h-px w-10 bg-accent" aria-hidden="true" />
            Apps
          </p>
        </Reveal>
        <MaskedLines
          as="h2"
          lines={["Apps we ship."]}
          className="max-w-3xl font-display text-4xl font-medium leading-[1.1] tracking-tight text-primary sm:text-6xl"
        />
        <Reveal delay={0.15}>
          <p className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-secondary">
            A few apps are in the workshop right now. We will show them here
            when they are ready to meet people.
          </p>
        </Reveal>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {apps.map((app, i) => (
            <Reveal key={app.label} delay={0.08 * i}>
              <div className="h-full rounded-2xl border border-border bg-card p-8 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                <app.icon
                  size={28}
                  strokeWidth={2}
                  className="text-primary"
                  aria-hidden="true"
                />
                <h3 className="mt-6 font-display text-2xl font-semibold text-primary">
                  {app.label}
                </h3>
                <p className="mt-3 text-sm font-medium uppercase tracking-[0.14em] text-accent">
                  In the workshop
                </p>
                <p className="mt-3 font-light leading-relaxed text-secondary">
                  We&rsquo;re finishing this one. Details soon.
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
