import { ArrowRight } from "lucide-react";
import { AUDIENCES, type AudienceId } from "../lib/content";
import Reveal from "./Reveal";

interface PathwaysProps {
  onSelectAudience: (id: AudienceId) => void;
}

export default function Pathways({ onSelectAudience }: PathwaysProps) {
  return (
    <section id="pathways" aria-labelledby="pathways-heading" className="bg-cream">
      <div className="mx-auto max-w-[88rem] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        {/* Section header */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-gold-deep">
              <span aria-hidden="true" className="font-display text-[0.95rem] leading-none font-medium tracking-normal">01</span>
              <span aria-hidden="true" className="h-px w-10 bg-gold" />
              How We Can Help
            </p>
            <h2
              id="pathways-heading"
              className="mt-5 max-w-xl font-display text-[2.6rem] leading-[1.04] font-medium text-navy sm:text-[3.4rem]"
            >
              Whatever Your Property Goals,{" "}
              <em className="font-normal not-italic text-gold-deep">Start Here.</em>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="max-w-md text-[1rem] leading-relaxed text-ink-soft lg:pb-2">
              Every property situation is different. Tell us what you're looking to achieve,
              and discover how we may be able to help.
            </p>
          </Reveal>
        </div>

        {/* Panels — a swipeable rail on phones, a grid from tablet up */}
        <ul className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none] sm:mt-14 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:pb-0 xl:grid-cols-4 [&::-webkit-scrollbar]:hidden">
          {AUDIENCES.map((audience, i) => (
            <li key={audience.id} className="w-[82%] shrink-0 snap-start sm:w-auto">
              <Reveal delay={i * 110} className="h-full">
              <button
                type="button"
                onClick={() => onSelectAudience(audience.id)}
                data-audience={audience.id}
                aria-label={`${audience.panelCta} — ${audience.panelCopy} Go to the enquiry form.`}
                className="group relative block h-full w-full overflow-hidden rounded-[3px] text-left shadow-panel transition-shadow duration-500 hover:shadow-lift focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
              >
                <div className="relative aspect-[4/5] w-full sm:aspect-[3/4] xl:aspect-auto xl:h-[33rem]">
                  <img
                    src={audience.image}
                    alt={audience.imageAlt}
                    loading="lazy"
                    className="img-graded absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.06]"
                  />
                  {/* Legibility gradient */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-navy-deep/92 via-navy-deep/38 to-navy-deep/8 transition-opacity duration-500"
                  />
                  {/* Gold top rule grows on hover */}
                  <span
                    aria-hidden="true"
                    className="absolute top-0 left-0 h-[3px] w-full origin-left scale-x-0 bg-gold transition-transform duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-x-100"
                  />

                  {/* Number */}
                  <span aria-hidden="true" className="absolute top-5 left-5 font-display text-[1.05rem] font-medium text-cream/90">
                    {audience.number}
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute top-5 right-5 flex h-10 w-10 items-center justify-center rounded-full border border-cream/30 text-cream/90 backdrop-blur-[2px] transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-navy-deep"
                  >
                    <audience.icon className="h-[1.1rem] w-[1.1rem]" strokeWidth={1.6} />
                  </span>

                  {/* Copy */}
                  <div className="absolute inset-x-0 bottom-0 p-6 lg:p-7">
                    <h3 className="font-display text-[1.8rem] leading-tight font-medium text-cream">
                      {audience.title}
                    </h3>
                    <p className="mt-3 text-[0.9rem] leading-relaxed text-cream/78">
                      {audience.panelCopy}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 border-t border-cream/20 pt-4 text-[0.75rem] font-semibold tracking-[0.12em] text-cream uppercase">
                      {audience.panelCta}
                      <ArrowRight
                        className="h-4 w-4 text-gold transition-transform duration-300 group-hover:translate-x-1.5"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </div>
              </button>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal delay={150}>
          <p className="mt-10 text-center text-sm text-ink-soft">
            Not sure which describes you?{" "}
            <a
              href="#enquire"
              className="font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4 transition-colors hover:text-gold-deep"
            >
              Start a conversation
            </a>{" "}
            and we'll point you in the right direction.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
