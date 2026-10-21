import { MapPinned } from "lucide-react";
import { ACCREDITATIONS, CONTACT, IMAGES } from "../lib/content";
import Reveal from "./Reveal";
import { TextLink } from "./Buttons";

const PRINCIPLES = [
  {
    title: "Location",
    copy: "Three generations of local knowledge guide where we look — and where we don't.",
  },
  {
    title: "Property",
    copy: "Each property is judged on its own merits, condition and realistic potential.",
  },
  {
    title: "Tenant & Covenant",
    copy: "For income-producing property, the strength of the tenancy matters as much as the bricks.",
  },
];

const PROJECT_TYPES = [
  "Commercial units",
  "Commercial-to-residential conversions",
  "HMO & apartment conversions",
  "Refurbishment projects",
  "New property development",
  "Development land",
];

export default function Trust() {
  return (
    <section id="about" aria-labelledby="about-heading" className="bg-[#fbfaf7]">
      <div className="mx-auto max-w-[88rem] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
          {/* Narrative */}
          <div className="lg:col-span-6 xl:col-span-6">
            <Reveal>
              <p className="eyebrow flex items-center gap-3 text-gold-deep">
                <span aria-hidden="true" className="font-display text-[0.95rem] leading-none font-medium tracking-normal">
                  02
                </span>
                <span aria-hidden="true" className="h-px w-10 bg-gold" />
                Why GS Property Group
              </p>
              <h2
                id="about-heading"
                className="mt-5 font-display text-[2.6rem] leading-[1.04] font-medium text-navy sm:text-[3.4rem]"
              >
                Local Knowledge. Personal Service.{" "}
                <em className="font-normal not-italic text-gold-deep">Clear Communication.</em>
              </h2>
            </Reveal>

            <Reveal delay={110}>
              <div className="mt-8 space-y-5 text-[1rem] leading-relaxed text-ink-soft">
                <p>
                  GS Property Group is a family-run business, three generations in, driven by
                  personalised service, honest communication and transparency. The West
                  Midlands has been our home for over 45 years — we are deliberately local,
                  because understanding this market street by street is what makes our advice
                  worth hearing.
                </p>
                <p>
                  We work with property investors, landlords, homeowners, commercial owners
                  and landowners across Birmingham and the surrounding towns, specialising in
                  property sourcing, refurbishment projects and property management. Whether
                  you are exploring an investment or looking for a way forward with a property
                  of your own, you will deal directly with people who know the area and will
                  explain your options plainly.
                </p>
                <p>
                  We operate an open-book policy with everyone we work with, treating all
                  parties fairly and equally — and we follow the codes of conduct of the
                  professional bodies listed below.
                </p>
              </div>
            </Reveal>

            {/* Core principles */}
            <Reveal delay={180}>
              <h3 className="eyebrow mt-12 text-navy/60">Our Core Principles</h3>
              <ol className="mt-5 divide-y divide-stone-line border-y border-stone-line">
                {PRINCIPLES.map((principle, i) => (
                  <li key={principle.title} className="group flex gap-6 py-5">
                    <span aria-hidden="true" className="font-display text-lg font-medium text-gold-deep">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h4 className="font-display text-[1.35rem] font-medium text-navy">
                        {principle.title}
                      </h4>
                      <p className="mt-1 text-[0.925rem] leading-relaxed text-ink-soft">
                        {principle.copy}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-10">
                <TextLink href="#enquire">Discuss Your Property Goals</TextLink>
              </div>
            </Reveal>
          </div>

          {/* Image composition */}
          <div className="lg:col-span-6">
            <Reveal delay={140} className="lg:sticky lg:top-28">
              <div className="relative mx-auto max-w-[38rem] lg:ml-auto">
                <div className="relative">
                  {/* Offset gold frame — wraps the image composition only */}
                  <div
                    aria-hidden="true"
                    className="absolute -top-4 -right-4 h-full w-full rounded-[3px] border border-gold/60"
                  />
                  <img
                    src={IMAGES.trustMain}
                    alt={IMAGES.trustMainAlt}
                    loading="lazy"
                    className="img-graded relative aspect-[4/3] w-full rounded-[3px] object-cover shadow-panel"
                  />

                  <div className="relative mt-6 grid grid-cols-5 gap-6">
                    <img
                      src={IMAGES.trustSecondary}
                      alt={IMAGES.trustSecondaryAlt}
                      loading="lazy"
                      className="img-graded col-span-2 aspect-[3/4] w-full rounded-[3px] object-cover shadow-panel"
                    />
                    <div className="col-span-3 flex flex-col justify-center rounded-[3px] bg-navy p-6 sm:p-7">
                      <MapPinned
                        className="h-6 w-6 text-gold"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                      <p className="mt-4 font-display text-[1.5rem] leading-snug font-normal text-cream">
                        Hyper-local to Birmingham &amp; the West Midlands.
                      </p>
                      <p className="mt-3 text-[0.875rem] leading-relaxed text-cream/70">
                        Based at {CONTACT.addressLines[0]}, {CONTACT.addressLines[1]} — in the
                        market we know best.
                      </p>
                    </div>
                  </div>
                </div>

                {/* What we work with */}
                <div className="relative mt-8 border-t border-stone-line pt-6">
                  <h3 className="eyebrow text-navy/60">The Property We Work With</h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {PROJECT_TYPES.map((type) => (
                      <li
                        key={type}
                        className="rounded-full border border-stone-line bg-cream px-3.5 py-1.5 text-[0.8rem] font-medium text-navy"
                      >
                        {type}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Accreditations strip */}
        <Reveal delay={120}>
          <div className="mt-20 border-y border-stone-line py-10 lg:mt-24">
            <div className="flex flex-col items-center gap-7 text-center">
              <p className="eyebrow text-navy/55">
                Licensed, Authorised &amp; Members Of
              </p>
              <ul className="flex max-w-5xl flex-wrap items-center justify-center gap-x-10 gap-y-4">
                {ACCREDITATIONS.map((name) => (
                  <li
                    key={name}
                    className="font-display text-[1.15rem] font-normal text-navy/75 sm:text-[1.25rem]"
                  >
                    {name}
                  </li>
                ))}
              </ul>
              <p className="max-w-2xl text-[0.85rem] leading-relaxed text-ink-soft">
                We follow the codes of conduct of these organisations. For new developments,
                our contractors and professional partners are members of bodies including
                RICS, the Federation of Master Builders and RIBA, and work to local authority
                planning and building policies.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
