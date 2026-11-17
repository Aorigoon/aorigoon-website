import { MaskedLines, Reveal } from "./Reveal";

const services = [
  {
    number: "01",
    title: "App development",
    body: "Apps for iOS, Android and the web, designed and built end to end.",
  },
  {
    number: "02",
    title: "Custom AI models",
    body: "Small vision models trained from scratch for one job, on your footage.",
  },
  {
    number: "03",
    title: "Product design",
    body: "Interfaces and brands for products people actually enjoy using.",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      aria-label="Services"
      className="scroll-mt-28 border-t border-border py-24 sm:py-32"
    >
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            <span className="h-px w-10 bg-accent" aria-hidden="true" />
            Services
          </p>
        </Reveal>
        <MaskedLines
          as="h2"
          lines={["What we can", "do for you."]}
          className="max-w-3xl font-display text-4xl font-medium leading-[1.1] tracking-tight text-primary sm:text-6xl"
        />
        <div className="mt-16">
          {services.map((service, i) => (
            <Reveal key={service.number} delay={0.06 * i}>
              <div className="group flex flex-col gap-2 border-t border-border py-8 transition-colors duration-200 last:border-b hover:bg-card sm:flex-row sm:items-baseline sm:gap-8 sm:px-4">
                <span className="font-display text-lg font-semibold text-accent">
                  {service.number}
                </span>
                <h3 className="min-w-0 flex-1 font-display text-3xl font-medium text-primary sm:text-4xl">
                  {service.title}
                </h3>
                <p className="max-w-sm font-light leading-relaxed text-secondary">
                  {service.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
