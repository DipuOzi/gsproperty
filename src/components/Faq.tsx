import { useState } from "react";
import { Phone, Plus } from "lucide-react";
import { cn } from "../utils/cn";
import { CONTACT, FAQS } from "../lib/content";
import Reveal from "./Reveal";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" aria-labelledby="faq-heading" className="bg-[#fbfaf7]">
      <div className="mx-auto max-w-[88rem] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-12">
          {/* Intro column */}
          <div className="lg:col-span-4">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <p className="eyebrow flex items-center gap-3 text-gold-deep">
                  <span aria-hidden="true" className="font-display text-[0.95rem] leading-none font-medium tracking-normal">05</span>
                  <span aria-hidden="true" className="h-px w-10 bg-gold" />
                  Common Questions
                </p>
                <h2
                  id="faq-heading"
                  className="mt-5 font-display text-[2.6rem] leading-[1.04] font-medium text-navy sm:text-[3.1rem]"
                >
                  Answers, Before <em className="font-normal not-italic text-gold-deep">You Ask.</em>
                </h2>
                <p className="mt-6 max-w-sm text-[1rem] leading-relaxed text-ink-soft">
                  The questions investors, landlords, sellers and landowners ask us most —
                  answered plainly. Anything else, we're happy to talk it through.
                </p>

                <div className="mt-9 rounded-[3px] border border-stone-line border-t-2 border-t-gold bg-cream p-6">
                  <p className="font-display text-[1.4rem] font-normal text-navy">
                    Still have a question?
                  </p>
                  <p className="mt-2 text-[0.9rem] leading-relaxed text-ink-soft">
                    Call us for an informal conversation — no obligation, and no sales script.
                  </p>
                  <a
                    href={CONTACT.phoneHref}
                    className="mt-4 inline-flex items-center gap-2 text-[0.9rem] font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4 transition-colors hover:text-gold-deep"
                  >
                    <Phone className="h-4 w-4 text-gold-deep" strokeWidth={1.75} aria-hidden="true" />
                    {CONTACT.phoneDisplay}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Accordion */}
          <div className="lg:col-span-8">
            <Reveal delay={120}>
              <div className="border-t border-stone-line">
                {FAQS.map((faq, i) => {
                  const open = openIndex === i;
                  const panelId = `faq-panel-${i}`;
                  const buttonId = `faq-button-${i}`;
                  return (
                    <div key={faq.question} className="border-b border-stone-line">
                      <h3>
                        <button
                          type="button"
                          id={buttonId}
                          aria-expanded={open}
                          aria-controls={panelId}
                          onClick={() => setOpenIndex(open ? null : i)}
                          className="group flex w-full items-center gap-5 py-6 text-left"
                        >
                          <span
                            aria-hidden="true"
                            className="hidden font-display text-base text-gold-deep sm:block"
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span
                            className={cn(
                              "flex-1 font-display text-[1.3rem] leading-snug font-medium transition-colors duration-300 sm:text-[1.4rem]",
                              open ? "text-navy" : "text-charcoal group-hover:text-navy"
                            )}
                          >
                            {faq.question}
                          </span>
                          <span
                            aria-hidden="true"
                            className={cn(
                              "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-500",
                              open
                                ? "rotate-45 border-gold bg-gold text-navy-deep"
                                : "border-stone-line text-navy group-hover:border-gold"
                            )}
                          >
                            <Plus className="h-4 w-4" strokeWidth={1.75} />
                          </span>
                        </button>
                      </h3>
                      <div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        className="faq-answer"
                        data-open={open}
                      >
                        <div>
                          <p className="max-w-2xl pr-4 pb-7 text-[0.95rem] leading-relaxed text-ink-soft sm:pl-10">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
