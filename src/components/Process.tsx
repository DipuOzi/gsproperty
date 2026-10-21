import { ShieldCheck } from "lucide-react";
import Reveal from "./Reveal";
import { ButtonLink } from "./Buttons";

const STEPS = [
  {
    number: "01",
    title: "Start a Conversation",
    copy: "Tell us about your property, investment goals, or development plans — in your own words, with as much or as little detail as you're comfortable sharing.",
  },
  {
    number: "02",
    title: "Explore Your Options",
    copy: "We discuss your circumstances and consider the possible routes available, explaining the practicalities of each so you can judge what suits you.",
  },
  {
    number: "03",
    title: "Agree on the Next Steps",
    copy: "If there is a suitable opportunity, we explain the proposed approach and next steps clearly — before anything is agreed or signed.",
  },
];

export default function Process() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="grain relative overflow-hidden border-t border-gold/20 bg-navy"
    >
      {/* Faint architectural numeral backdrop */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 right-4 font-display text-[16rem] leading-none font-light text-cream/[0.04] select-none lg:text-[22rem]"
      >
        GS
      </span>

      <div className="relative mx-auto max-w-[88rem] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-gold-pale">
              <span aria-hidden="true" className="font-display text-[0.95rem] leading-none font-medium tracking-normal">03</span>
              <span aria-hidden="true" className="h-px w-10 bg-gold" />
              How It Works
            </p>
            <h2
              id="process-heading"
              className="mt-5 font-display text-[2.6rem] leading-[1.04] font-medium text-cream sm:text-[3.4rem]"
            >
              A Clearer Way <em className="font-normal not-italic text-gold-pale">Forward.</em>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="max-w-md text-[1rem] leading-relaxed text-cream/70 lg:pb-2">
              No pressure, no obligation — just a straightforward process that puts you in
              control at every stage.
            </p>
          </Reveal>
        </div>

        <ol className="relative mt-16 grid gap-12 md:grid-cols-3 md:gap-8 lg:gap-12">
          {/* Connecting hairline */}
          <span
            aria-hidden="true"
            className="absolute top-7 right-[16%] left-[16%] hidden h-px bg-gradient-to-r from-gold/0 via-gold/45 to-gold/0 md:block"
          />
          {STEPS.map((step, i) => (
            <li key={step.number}>
              <Reveal delay={i * 140}>
                <div className="relative">
                  <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-gold/50 bg-navy font-display text-lg font-medium text-gold-pale">
                    {step.number}
                  </span>
                  <h3 className="mt-7 font-display text-[1.7rem] leading-tight font-medium text-cream">
                    {step.title}
                  </h3>
                  <p className="mt-3.5 max-w-sm text-[0.95rem] leading-relaxed text-cream/70">
                    {step.copy}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal delay={200}>
          <div className="mt-16 flex flex-col gap-6 border-t border-cream/12 pt-9 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex max-w-xl items-start gap-3 text-[0.9rem] leading-relaxed text-cream/65">
              <ShieldCheck
                className="mt-0.5 h-5 w-5 shrink-0 text-gold"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              Submitting an enquiry doesn't commit you to anything, and it isn't a guarantee
              of an offer — it's simply the start of a conversation about what may be
              possible.
            </p>
            <ButtonLink href="#enquire" variant="gold" className="shrink-0">
              Start a Conversation
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
