import { ArrowDown, ArrowRight, MapPin } from "lucide-react";
import { AUDIENCES, IMAGES, type AudienceId } from "../lib/content";
import { ButtonLink } from "./Buttons";

interface HeroProps {
  onSelectAudience: (id: AudienceId) => void;
}

const riseStyle = (order: number) => ({
  animation: `form-swap 1s cubic-bezier(0.22,0.61,0.36,1) ${0.15 + order * 0.13}s both`,
});

export default function Hero({ onSelectAudience }: HeroProps) {
  return (
    <section id="top" aria-label="Introduction" className="relative overflow-hidden bg-navy-deep">
      {/* Photograph */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src={IMAGES.hero}
          alt=""
          fetchPriority="high"
          className="img-graded h-full w-full animate-hero-drift object-cover object-center"
        />
        {/* Navy treatment: deep on the left for copy, opening to the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/95 via-navy-deep/78 to-navy-deep/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/85 via-transparent to-navy-deep/45" />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-[88rem] flex-col px-5 sm:px-8 lg:px-12">
        {/* Main hero content */}
        <div className="flex flex-1 items-center pt-32 pb-14 lg:pt-36 lg:pb-16">
          <div className="grid w-full items-center gap-12 xl:grid-cols-12">
            <div className="max-w-3xl xl:col-span-8">
              <p
                className="eyebrow flex items-center gap-3 text-gold-pale"
                style={riseStyle(0)}
              >
                <span aria-hidden="true" className="h-px w-10 bg-gold" />
                <MapPin className="h-3.5 w-3.5 text-gold" strokeWidth={2} aria-hidden="true" />
                Birmingham &amp; the West Midlands
              </p>

              <h1
                className="mt-7 font-display text-[3.2rem] leading-[1.02] font-medium text-cream sm:text-[4rem] lg:text-[4.9rem] min-[1360px]:text-[5.15rem]"
                style={riseStyle(1)}
              >
                Property Opportunities.
                <br />
                Partnerships Built on{" "}
                <em className="font-normal not-italic text-gold-pale">Trust.</em>
              </h1>

              <p
                className="mt-7 max-w-xl text-[1.05rem] leading-relaxed text-cream/82 sm:text-lg"
                style={riseStyle(2)}
              >
                From property investment and development to landlord solutions and property
                sales, GS Property Group helps investors and property owners explore the right
                opportunities across Birmingham and the West Midlands.
              </p>

              <div
                className="mt-10 flex flex-col gap-3.5 sm:flex-row sm:items-center"
                style={riseStyle(3)}
              >
                <ButtonLink href="#pathways" variant="gold">
                  Explore How We Can Help
                </ButtonLink>
                <ButtonLink href="#enquire" variant="outline-light" withArrow={false}>
                  Speak to Our Team
                </ButtonLink>
              </div>

              <p
                className="mt-10 flex max-w-xl items-start gap-3 border-t border-cream/15 pt-6 text-[0.8125rem] leading-relaxed text-cream/65 xl:hidden"
                style={riseStyle(4)}
              >
                <span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />
                A family-run business, three generations in — with over 45 years in the West
                Midlands property market and an open-book approach to every conversation.
              </p>
            </div>

            {/* Editorial credibility card — fills the right of the composition on wide screens */}
            <div className="hidden xl:col-span-4 xl:col-start-9 xl:block">
              <aside
                aria-label="About GS Property Group"
                className="rounded-[3px] border border-cream/15 bg-navy-deep/35 p-7 shadow-[0_24px_70px_-35px_rgba(0,0,0,0.75)] backdrop-blur-[3px]"
                style={riseStyle(3)}
              >
                <p className="eyebrow flex items-center gap-3 text-gold-pale">
                  <span aria-hidden="true" className="h-px w-6 bg-gold" />
                  A Local Partnership
                </p>
                <p className="mt-5 font-display text-[1.7rem] leading-snug font-normal text-cream">
                  Three generations of local knowledge, with an{" "}
                  <em className="font-normal not-italic text-gold-pale">open-book approach.</em>
                </p>

                <dl className="mt-7 grid grid-cols-2 gap-6 border-t border-cream/15 pt-6">
                  <div>
                    <dt className="font-display text-[2.25rem] leading-none font-normal text-cream">
                      45<span className="text-gold-pale">+</span>
                    </dt>
                    <dd className="mt-2 text-[0.72rem] leading-relaxed tracking-[0.08em] text-cream/55 uppercase">
                      Years in the West Midlands market
                    </dd>
                  </div>
                  <div>
                    <dt className="font-display text-[2.25rem] leading-none font-normal text-cream">3</dt>
                    <dd className="mt-2 text-[0.72rem] leading-relaxed tracking-[0.08em] text-cream/55 uppercase">
                      Generations, still family-run
                    </dd>
                  </div>
                </dl>

                <a
                  href="#about"
                  className="mt-7 inline-flex items-center gap-2.5 border-t border-cream/15 pt-5 text-[0.75rem] font-semibold tracking-[0.1em] text-cream uppercase transition-colors duration-300 hover:text-gold-pale"
                >
                  More About Us
                  <ArrowRight
                    className="h-4 w-4 text-gold transition-transform duration-300"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </a>
              </aside>
            </div>
          </div>
        </div>

        {/* Audience index strip */}
        <div className="relative border-t border-cream/15" style={riseStyle(5)}>
          <p className="sr-only">Choose the description that fits you</p>
          <ul className="grid grid-cols-2 lg:grid-cols-4">
            {AUDIENCES.map((audience, i) => (
              <li
                key={audience.id}
                className={
                  "group border-cream/15 " +
                  (i % 2 === 0 ? "border-r " : "") +
                  (i < 2 ? "border-b lg:border-b-0 " : "") +
                  (i < 3 ? "lg:border-r" : "")
                }
              >
                <button
                  type="button"
                  onClick={() => onSelectAudience(audience.id)}
                  data-audience={audience.id}
                  className="flex w-full items-center gap-3 px-4 py-5 text-left transition-colors duration-300 hover:bg-cream/[0.06] sm:px-5 lg:py-6"
                  aria-label={`${audience.title} — go to the enquiry form`}
                >
                  <span className="font-display text-sm font-medium text-gold">{audience.number}</span>
                  <span className="flex-1 text-[0.8rem] font-medium tracking-[0.1em] text-cream/85 uppercase transition-colors group-hover:text-cream">
                    {audience.title}
                  </span>
                  <ArrowRight
                    className="h-4 w-4 shrink-0 text-gold opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </button>
              </li>
            ))}
          </ul>
          <div
            className="pointer-events-none absolute -top-14 right-1 hidden items-center gap-2 text-cream/50 lg:flex"
            aria-hidden="true"
          >
            <span className="text-[0.65rem] font-medium tracking-[0.24em] uppercase">Scroll</span>
            <ArrowDown className="h-3.5 w-3.5 animate-bounce" strokeWidth={1.75} />
          </div>
        </div>
      </div>
    </section>
  );
}
