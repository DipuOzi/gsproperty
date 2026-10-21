import { IMAGES } from "../lib/content";
import Reveal from "./Reveal";
import { ButtonLink } from "./Buttons";

export default function FinalCta() {
  return (
    <section aria-labelledby="final-cta-heading" className="relative overflow-hidden bg-navy-deep">
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src={IMAGES.finalCta}
          alt=""
          loading="lazy"
          className="img-graded h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-navy-deep/72" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/85 via-transparent to-navy-deep/55" />
      </div>

      <div className="relative mx-auto max-w-[88rem] px-5 py-24 text-center sm:px-8 lg:px-12 lg:py-36">
        <Reveal>
          <p className="eyebrow inline-flex items-center gap-3 text-gold-pale">
            <span aria-hidden="true" className="h-px w-10 bg-gold" />
            Birmingham &amp; the West Midlands
            <span aria-hidden="true" className="h-px w-10 bg-gold" />
          </p>
          <h2
            id="final-cta-heading"
            className="mx-auto mt-6 max-w-3xl font-display text-[2.6rem] leading-[1.06] font-medium text-cream sm:text-[3.4rem] lg:text-[3.9rem]"
          >
            Your Next Property Decision Starts With a{" "}
            <em className="font-normal not-italic text-gold-pale">Conversation.</em>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[1rem] leading-relaxed text-cream/78 sm:text-lg">
            Tell us what you're looking to achieve. We'll discuss your circumstances and
            explore whether GS Property Group can help.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3.5 sm:flex-row">
            <ButtonLink href="#enquire" variant="gold">
              Start a Conversation
            </ButtonLink>
            <ButtonLink href="#pathways" variant="outline-light" withArrow={false}>
              Explore Our Services
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
