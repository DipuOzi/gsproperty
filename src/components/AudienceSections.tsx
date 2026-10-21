import { Check } from "lucide-react";
import { cn } from "../utils/cn";
import { AUDIENCE_DETAILS, type AudienceDetail, type AudienceId } from "../lib/content";
import { ButtonLink } from "./Buttons";
import Reveal from "./Reveal";

interface AudienceSectionsProps {
  /** Selects the matching audience in the enquiry form and scrolls to it. */
  onSelectAudience: (id: AudienceId) => void;
}

/**
 * Four audience deep-dives (Investors, Landlords, Property Owners,
 * Landowners). Alternating editorial rows that keep the homepage's
 * eyebrow/numbering, gold accents and framed imagery, with a dark navy
 * finale for the landowner section — mirroring the owner's supplied design.
 */
export default function AudienceSections({ onSelectAudience }: AudienceSectionsProps) {
  return (
    <>
      {AUDIENCE_DETAILS.map((detail) => (
        <AudienceRow
          key={detail.id}
          detail={detail}
          onSelectAudience={onSelectAudience}
        />
      ))}
    </>
  );
}

interface AudienceRowProps {
  detail: AudienceDetail;
  onSelectAudience: (id: AudienceId) => void;
}

/** Section backgrounds, alternating with the rest of the homepage rhythm. */
const toneClasses: Record<AudienceDetail["tone"], string> = {
  "warm-white": "bg-[#fbfaf7]",
  parchment: "bg-parchment",
  cream: "bg-cream",
  dark: "border-t border-gold/20 grain bg-navy-deep",
};

function AudienceRow({ detail, onSelectAudience }: AudienceRowProps) {
  const dark = detail.tone === "dark";
  const copyOrder = detail.imageFirst ? "lg:order-2" : "";
  const imageOrder = detail.imageFirst ? "lg:order-1" : "";
  /* Offset frame hugs the outer edge of the composition. */
  const frameSide = detail.imageFirst
    ? "-top-4 -left-4"
    : "-top-4 -right-4";
  const imageAlign = detail.imageFirst ? "lg:mr-auto" : "lg:ml-auto";

  return (
    <section
      id={detail.sectionId}
      aria-labelledby={`${detail.sectionId}-heading`}
      className={cn("relative", toneClasses[detail.tone])}
    >
      <div className="relative mx-auto max-w-[88rem] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        {/* Default stretch alignment gives the sticky image room to travel. */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Copy */}
          <div className={cn("lg:col-span-6", copyOrder)}>
            <Reveal>
              <p
                className={cn(
                  "eyebrow flex items-center gap-3",
                  dark ? "text-gold-pale" : "text-gold-deep"
                )}
              >
                <span
                  aria-hidden="true"
                  className="font-display text-[0.95rem] leading-none font-medium tracking-normal"
                >
                  {detail.number}
                </span>
                <span aria-hidden="true" className="h-px w-10 bg-gold" />
                {detail.eyebrow}
              </p>
              <h2
                id={`${detail.sectionId}-heading`}
                className={cn(
                  "mt-5 max-w-xl font-display text-[2.6rem] leading-[1.04] font-medium",
                  "sm:text-[3.4rem]",
                  dark ? "text-cream" : "text-navy"
                )}
              >
                {detail.headingPlain}{" "}
                <em
                  className={cn(
                    "font-normal not-italic",
                    dark ? "text-gold-pale" : "text-gold-deep"
                  )}
                >
                  {detail.headingAccent}
                </em>
                {detail.headingTail ? <> {detail.headingTail}</> : null}
              </h2>
              <p
                className={cn(
                  "mt-6 max-w-md text-[1rem] leading-relaxed",
                  dark ? "text-cream/75" : "text-ink-soft"
                )}
              >
                {detail.copy}
              </p>
            </Reveal>

            <Reveal delay={120}>
              <ul className="mt-8 max-w-md space-y-3.5">
                {detail.points.map((point) => (
                  <li key={point} className="flex gap-3.5">
                    <span
                      aria-hidden="true"
                      className={cn(
                        "mt-0.5 flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-full",
                        dark
                          ? "border border-gold/50 bg-navy text-gold-pale"
                          : "border border-gold/40 bg-gold/10 text-gold-deep"
                      )}
                    >
                      <Check className="h-3 w-3" strokeWidth={2.25} />
                    </span>
                    <span
                      className={cn(
                        "text-[0.95rem] leading-relaxed",
                        dark ? "text-cream/78" : "text-ink-soft"
                      )}
                    >
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-10 flex flex-col gap-3.5 sm:flex-row">
                <ButtonLink
                  href="#enquire"
                  variant={dark ? "gold" : "navy"}
                  onClick={() => onSelectAudience(detail.id)}
                >
                  {detail.primaryCta}
                </ButtonLink>
                <ButtonLink
                  href="#enquire"
                  variant={dark ? "outline-light" : "outline-dark"}
                  withArrow={false}
                  onClick={() => onSelectAudience(detail.id)}
                >
                  {detail.secondaryCta}
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          {/* Image composition — naturally aligned with the heading top,
              then pinned at that same level while the section scrolls */}
          <div className={cn("lg:col-span-6", imageOrder)}>
            <Reveal delay={140} className="lg:sticky lg:top-32 lg:mt-9">
              <div className={cn("relative mx-auto max-w-[38rem]", imageAlign)}>
                <div className="relative">
                  <div
                    aria-hidden="true"
                    className={cn(
                      "absolute h-full w-full rounded-[3px] border border-gold/60",
                      frameSide
                    )}
                  />
                  <img
                    src={detail.image}
                    alt={detail.imageAlt}
                    loading="lazy"
                    className="img-graded relative aspect-[4/3] w-full rounded-[3px] object-cover shadow-panel"
                  />
                  <div
                    className={cn(
                      "absolute bottom-5 left-5 flex max-w-[85%] items-center gap-2.5 rounded-[2px] px-4 py-3 shadow-panel",
                      dark ? "bg-navy text-cream" : "bg-cream text-navy"
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
                    />
                    <p className="text-[0.8rem] leading-snug font-medium">
                      {detail.caption}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
