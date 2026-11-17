import { Armchair, BellRing, Eye, Scan, ShieldCheck } from "lucide-react";
import { MaskedLines, Reveal } from "./Reveal";

const features = [
  {
    icon: Scan,
    title: "Sees tables and chairs",
    body: "The model watches the room and finds every table and chair on its own — no one has to draw zones by hand.",
  },
  {
    icon: Armchair,
    title: "Booked or free, per table",
    body: "Each table is reported as BOOKED or FREE, so staff and guests always know where there is a seat.",
  },
  {
    icon: ShieldCheck,
    title: "A seated table stays private",
    body: "If someone is already seated, the table counts as booked even with empty chairs — strangers are never seated together.",
  },
  {
    icon: BellRing,
    title: "Counter-attendance alert",
    body: "If no one is at the counter for five minutes, the owner is notified — so no guest is left waiting.",
  },
];

export default function Models() {
  return (
    <section
      id="models"
      aria-label="Our AI models"
      className="scroll-mt-28 bg-primary py-24 text-background sm:py-32"
    >
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent-on-dark">
            <span className="h-px w-10 bg-accent-on-dark" aria-hidden="true" />
            Models
          </p>
        </Reveal>
        <MaskedLines
          as="h2"
          lines={["A model that", "watches the room."]}
          className="max-w-3xl font-display text-4xl font-medium leading-[1.1] tracking-tight text-background sm:text-6xl"
        />
        <Reveal delay={0.15}>
          <p className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-background/75">
            Our flagship model was built for hotels and restaurants. It was
            trained from scratch on real footage of real rooms, and it does
            one job well: it understands what is happening at every table.
          </p>
        </Reveal>
        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2">
          {features.map((feature, i) => (
            <Reveal key={feature.title} delay={0.08 * i}>
              <div className="h-full bg-primary p-8">
                <feature.icon
                  size={28}
                  strokeWidth={2}
                  className="text-background"
                  aria-hidden="true"
                />
                <h3 className="mt-6 font-display text-2xl font-semibold text-background">
                  {feature.title}
                </h3>
                <p className="mt-3 font-light leading-relaxed text-background/70">
                  {feature.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <p className="mt-10 flex items-start gap-3 text-sm font-light leading-relaxed text-background/60">
            <Eye
              size={18}
              strokeWidth={2}
              className="mt-0.5 shrink-0"
              aria-hidden="true"
            />
            The model returns only what it sees, frame by frame. What happens
            with that information — the alerts, the displays — lives in the
            app around it.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
