import { MaskedLines, Reveal } from "./Reveal";

const steps = [
  {
    number: "01",
    title: "Listen",
    body: "We start by understanding the problem properly — who it is for, and what a good outcome looks like.",
  },
  {
    number: "02",
    title: "Shape",
    body: "We sketch the shape of the answer together: what it does, what it does not do, and how it will feel.",
  },
  {
    number: "03",
    title: "Craft",
    body: "We build it in small working pieces, so you see real progress every week — not a big reveal at the end.",
  },
  {
    number: "04",
    title: "Care",
    body: "After launch we stay close: fixing, improving, and keeping it running well for the people who use it.",
  },
];

export default function Process() {
  return (
    <section
      id="process"
      aria-label="How we work"
      className="scroll-mt-28 border-t border-border py-24 sm:py-32"
    >
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            <span className="h-px w-10 bg-accent" aria-hidden="true" />
            Process
          </p>
        </Reveal>
        <MaskedLines
          as="h2"
          lines={["How a project", "moves forward."]}
          className="max-w-3xl font-display text-4xl font-medium leading-[1.1] tracking-tight text-primary sm:text-6xl"
        />
        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {steps.map((step, i) => (
            <Reveal key={step.number} delay={0.08 * i}>
              <div className="border-t-2 border-accent/70 pt-6">
                <span className="font-display text-lg font-semibold text-accent">
                  {step.number}
                </span>
                <h3 className="mt-3 font-display text-3xl font-medium text-primary">
                  {step.title}
                </h3>
                <p className="mt-3 font-light leading-relaxed text-secondary">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
