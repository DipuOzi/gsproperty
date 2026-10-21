import { useMemo, useRef, useState, type FormEvent } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Loader2,
  Lock,
  Mail,
  MapPin,
  Phone,
  RotateCcw,
} from "lucide-react";
import { cn } from "../utils/cn";
import { AUDIENCES, CONTACT, type AudienceId } from "../lib/content";
import Reveal from "./Reveal";

/* ------------------------------------------------------------------ */
/* Field configuration per audience                                    */
/* ------------------------------------------------------------------ */

interface FieldDef {
  key: string;
  label: string;
  type: "text" | "select";
  required?: boolean;
  options?: string[];
  placeholder?: string;
  hint?: string;
  half?: boolean;
}

const AUDIENCE_FIELDS: Record<AudienceId, FieldDef[]> = {
  investor: [
    {
      key: "investmentInterests",
      label: "Investment interests",
      type: "select",
      required: true,
      half: true,
      options: [
        "Development projects",
        "Joint venture opportunities",
        "Refurbishment projects",
        "Conversions (HMO / apartments)",
        "I'm not sure yet — advise me",
      ],
    },
    {
      key: "investmentBudget",
      label: "Indicative investment budget",
      type: "select",
      half: true,
      hint: "Optional — simply helps us discuss relevant projects.",
      options: [
        "Under £50,000",
        "£50,000 – £100,000",
        "£100,000 – £250,000",
        "£250,000 – £500,000",
        "Over £500,000",
        "I'd prefer to discuss",
      ],
    },
  ],
  landlord: [
    {
      key: "landlordLocation",
      label: "Property location",
      type: "text",
      required: true,
      placeholder: "e.g. Edgbaston, Birmingham",
    },
    {
      key: "propertyCount",
      label: "Number of properties",
      type: "select",
      required: true,
      half: true,
      options: ["1 property", "2 – 5 properties", "6 – 10 properties", "11 or more"],
    },
    {
      key: "landlordRequirement",
      label: "Main requirement",
      type: "select",
      required: true,
      half: true,
      options: [
        "Property management",
        "Selling a rental property",
        "Portfolio exit / retirement",
        "Something else",
      ],
    },
  ],
  owner: [
    {
      key: "ownerLocation",
      label: "Property location",
      type: "text",
      required: true,
      placeholder: "e.g. Harborne, Birmingham",
    },
    {
      key: "propertyType",
      label: "Property type",
      type: "select",
      required: true,
      half: true,
      options: [
        "House",
        "Flat or apartment",
        "House in multiple occupation (HMO)",
        "Commercial property",
        "Mixed-use",
        "Other",
      ],
    },
    {
      key: "timescale",
      label: "Preferred timescale",
      type: "select",
      required: true,
      half: true,
      options: [
        "As soon as possible",
        "Within 1 – 3 months",
        "Within 3 – 6 months",
        "Flexible / just exploring",
      ],
    },
  ],
  landowner: [
    {
      key: "landLocation",
      label: "Land location",
      type: "text",
      required: true,
      placeholder: "e.g. Near Sutton Coldfield",
    },
    {
      key: "landSize",
      label: "Approximate land size",
      type: "text",
      half: true,
      placeholder: "e.g. 0.8 acres",
      hint: "Optional — a rough estimate is fine.",
    },
    {
      key: "planningStatus",
      label: "Planning status",
      type: "select",
      half: true,
      hint: "Optional — select “Not sure” if unknown.",
      options: [
        "No planning permission",
        "Planning applied for",
        "Planning permission granted",
        "Not sure",
      ],
    },
  ],
};

const MESSAGE_PLACEHOLDERS: Record<AudienceId, string> = {
  investor:
    "Tell us a little about your experience, the type of projects that interest you, and how involved you'd like to be…",
  landlord:
    "Tell us about your property or portfolio — tenancies, condition, and what you'd like to change…",
  owner:
    "Tell us about your property, its condition, and anything else that would help us understand your situation…",
  landowner:
    "Tell us anything you know about the land — access, boundaries, previous planning history…",
};

/* ------------------------------------------------------------------ */
/* Small form primitives                                               */
/* ------------------------------------------------------------------ */

const labelClass = "mb-2 block text-[0.8125rem] font-semibold tracking-wide text-navy";
const inputClass = (invalid: boolean) =>
  cn(
    "w-full rounded-[2px] border bg-cream/40 px-4 py-3 text-[0.95rem] text-charcoal placeholder:text-ink-soft/45 transition-colors duration-300",
    invalid
      ? "border-error focus:border-error"
      : "border-stone-line hover:border-navy/35 focus:border-gold-deep",
    "focus:outline-none focus:ring-2 focus:ring-gold/25"
  );

interface FieldProps {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}

function Field({ id, label, optional, error, hint, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
        {optional && <span className="ml-1.5 font-normal text-ink-soft/70">(optional)</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-[0.78rem] text-ink-soft/80">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-[0.78rem] font-medium text-error">
          {error}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main component                                                      */
/* ------------------------------------------------------------------ */

interface EnquiryProps {
  audience: AudienceId;
  onAudienceChange: (id: AudienceId) => void;
}

export default function Enquiry({ audience, onAudienceChange }: EnquiryProps) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");
  const errorSummaryRef = useRef<HTMLDivElement | null>(null);
  const successRef = useRef<HTMLDivElement | null>(null);

  const activeAudience = useMemo(
    () => AUDIENCES.find((a) => a.id === audience) ?? AUDIENCES[0],
    [audience]
  );

  const setValue = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    const v = (k: string) => (values[k] ?? "").trim();

    if (!v("fullName")) next.fullName = "Please enter your full name.";
    if (!v("email")) next.email = "Please enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v("email")))
      next.email = "Please enter a valid email address, e.g. name@example.co.uk.";
    if (!v("phone")) next.phone = "Please enter a telephone number so we can reach you.";
    else if (v("phone").replace(/\D/g, "").length < 7)
      next.phone = "That telephone number looks too short — please check it.";

    AUDIENCE_FIELDS[audience].forEach((field) => {
      if (field.required && !v(field.key)) {
        next[field.key] =
          field.type === "select"
            ? `Please select an option for “${field.label.toLowerCase()}”.`
            : `Please enter the ${field.label.toLowerCase()}.`;
      }
    });

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      requestAnimationFrame(() => errorSummaryRef.current?.focus());
      return;
    }
    setStatus("submitting");
    window.setTimeout(() => {
      setStatus("done");
      requestAnimationFrame(() => successRef.current?.focus());
    }, 900);
  };

  const reset = () => {
    setValues({});
    setErrors({});
    setStatus("idle");
  };

  const firstName = (values.fullName ?? "").trim().split(" ")[0];
  const errorCount = Object.keys(errors).length;

  return (
    <section id="enquire" aria-labelledby="enquiry-heading" className="relative bg-parchment">
      <div className="mx-auto max-w-[88rem] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          {/* Intro + direct contact */}
          <div className="lg:col-span-5">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <p className="eyebrow flex items-center gap-3 text-gold-deep">
                  <span aria-hidden="true" className="font-display text-[0.95rem] leading-none font-medium tracking-normal">04</span>
                  <span aria-hidden="true" className="h-px w-10 bg-gold" />
                  Make an Enquiry
                </p>
                <h2
                  id="enquiry-heading"
                  className="mt-5 font-display text-[2.6rem] leading-[1.04] font-medium text-navy sm:text-[3.4rem]"
                >
                  Let's Talk About Your{" "}
                  <em className="font-normal not-italic text-gold-deep">Property Goals.</em>
                </h2>
                <p className="mt-6 max-w-md text-[1rem] leading-relaxed text-ink-soft">
                  Whether you're exploring an investment, reviewing your rental portfolio,
                  considering a property sale, or assessing the potential of your land, start
                  with a conversation. Choose the option that fits you and we'll take it from
                  there.
                </p>

                <ul className="mt-8 space-y-3.5 text-[0.925rem] text-ink-soft">
                  {[
                    "A personal response from our Birmingham-based team",
                    "No obligation — an enquiry is not a commitment",
                    "Your details are used only to respond to your enquiry",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-[7px] h-1.5 w-1.5 shrink-0 rotate-45 bg-gold-deep"
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-10 space-y-4 border-t border-stone-line pt-8">
                  <p className="eyebrow text-navy/55">Prefer to Reach Us Directly?</p>
                  <div className="space-y-3 text-[0.95rem]">
                    <a
                      href={CONTACT.phoneHref}
                      className="flex items-center gap-3 font-medium text-navy transition-colors hover:text-gold-deep"
                    >
                      <Phone className="h-4.5 w-4.5 text-gold-deep" strokeWidth={1.75} aria-hidden="true" />
                      {CONTACT.phoneDisplay}
                    </a>
                    <a
                      href={CONTACT.emailHref}
                      className="flex items-center gap-3 font-medium break-all text-navy transition-colors hover:text-gold-deep"
                    >
                      <Mail className="h-4.5 w-4.5 shrink-0 text-gold-deep" strokeWidth={1.75} aria-hidden="true" />
                      {CONTACT.email}
                    </a>
                    <p className="flex items-start gap-3 text-ink-soft">
                      <MapPin className="mt-0.5 h-4.5 w-4.5 shrink-0 text-gold-deep" strokeWidth={1.75} aria-hidden="true" />
                      <span>
                        {CONTACT.addressLines.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Form card */}
          <div className="lg:col-span-7">
            <Reveal delay={140}>
              <div className="rounded-[3px] border border-stone-line border-t-2 border-t-gold bg-white p-6 shadow-panel sm:p-9 lg:p-10">
                {status === "done" ? (
                  /* ------------ Success state ------------ */
                  <div ref={successRef} tabIndex={-1} className="animate-fade-in outline-none">
                    <CheckCircle2
                      className="h-12 w-12 text-gold-deep"
                      strokeWidth={1.25}
                      aria-hidden="true"
                    />
                    <h3 className="mt-5 font-display text-[2.1rem] leading-tight font-medium text-navy">
                      Thank you{firstName ? `, ${firstName}` : ""}.{" "}
                      <em className="font-normal not-italic text-gold-deep">Here's what happens next.</em>
                    </h3>
                    <ol className="mt-7 space-y-4">
                      {[
                        "A member of our team reviews your enquiry personally — not a call centre.",
                        "We contact you using the details provided to discuss your circumstances in more depth.",
                        "If there's a suitable way forward, we explain the proposed approach and next steps clearly, with no obligation to proceed.",
                      ].map((step, i) => (
                        <li key={step} className="flex gap-4">
                          <span className="font-display text-base font-medium text-gold-deep">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <p className="text-[0.95rem] leading-relaxed text-ink-soft">{step}</p>
                        </li>
                      ))}
                    </ol>

                    <div className="mt-8 rounded-[2px] border border-gold/40 bg-cream p-5">
                      <p className="text-[0.85rem] leading-relaxed text-ink-soft">
                        <strong className="font-semibold text-navy">Design concept notice:</strong>{" "}
                        this form demonstrates the proposed enquiry experience for the redesigned
                        website — in this preview, no details have been sent. For a genuine
                        enquiry today, please call{" "}
                        <a href={CONTACT.phoneHref} className="font-semibold text-navy underline decoration-gold decoration-2 underline-offset-2 hover:text-gold-deep">
                          {CONTACT.phoneDisplay}
                        </a>{" "}
                        or email{" "}
                        <a href={CONTACT.emailHref} className="font-semibold break-all text-navy underline decoration-gold decoration-2 underline-offset-2 hover:text-gold-deep">
                          {CONTACT.email}
                        </a>
                        .
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={reset}
                      className="mt-7 inline-flex items-center gap-2 text-[0.8125rem] font-semibold tracking-[0.08em] text-navy uppercase transition-colors hover:text-gold-deep"
                    >
                      <RotateCcw className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                      Make Another Enquiry
                    </button>
                  </div>
                ) : (
                  /* ------------ Form ------------ */
                  <form onSubmit={handleSubmit} noValidate>
                    {/* Audience selector */}
                    <fieldset>
                      <legend className="font-display text-[1.5rem] font-medium text-navy">
                        First — which best describes you?
                      </legend>
                      <div className="mt-5 grid grid-cols-2 gap-3" role="radiogroup" aria-label="I am enquiring as">
                        {AUDIENCES.map((a) => {
                          const selected = audience === a.id;
                          return (
                            <label
                              key={a.id}
                              className={cn(
                                "group relative flex cursor-pointer items-center gap-3 rounded-[2px] border px-4 py-3.5 transition-all duration-300 focus-within:ring-2 focus-within:ring-gold focus-within:ring-offset-2",
                                selected
                                  ? "border-navy bg-navy text-cream shadow-lift"
                                  : "border-stone-line bg-white text-navy hover:border-gold-deep"
                              )}
                            >
                              <input
                                type="radio"
                                name="audience"
                                value={a.id}
                                checked={selected}
                                onChange={() => onAudienceChange(a.id)}
                                className="sr-only"
                              />
                              <a.icon
                                className={cn(
                                  "h-5 w-5 shrink-0 transition-colors",
                                  selected ? "text-gold" : "text-gold-deep"
                                )}
                                strokeWidth={1.6}
                                aria-hidden="true"
                              />
                              <span className="text-[0.85rem] leading-tight font-semibold">
                                {a.selectorLabel}
                              </span>
                              <span
                                aria-hidden="true"
                                className={cn(
                                  "absolute top-2 right-2 h-1.5 w-1.5 rounded-full transition-opacity",
                                  selected ? "bg-gold opacity-100" : "opacity-0"
                                )}
                              />
                            </label>
                          );
                        })}
                      </div>
                    </fieldset>

                    {/* Audience-specific guidance */}
                    <div key={audience} className="animate-form-swap">
                      <div className="mt-7 border-l-2 border-gold bg-cream px-5 py-4">
                        <p className="text-[0.9rem] leading-relaxed text-navy">
                          {activeAudience.formIntro}
                        </p>
                        <p className="mt-1.5 text-[0.85rem] leading-relaxed text-ink-soft">
                          {activeAudience.formNote}
                        </p>
                      </div>

                      {/* Error summary */}
                      {errorCount > 0 && (
                        <div
                          ref={errorSummaryRef}
                          tabIndex={-1}
                          role="alert"
                          className="mt-6 rounded-[2px] border border-error/40 bg-error/[0.06] px-5 py-4 outline-none"
                        >
                          <p className="text-[0.9rem] font-semibold text-error">
                            Please check {errorCount === 1 ? "one detail" : `${errorCount} details`}{" "}
                            before sending:
                          </p>
                          <ul className="mt-2 list-inside list-disc space-y-1 text-[0.85rem] text-error">
                            {Object.entries(errors).map(([key, message]) => (
                              <li key={key}>
                                <a href={`#field-${key}`} className="underline underline-offset-2 hover:no-underline">
                                  {message}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Common fields */}
                      <div className="mt-8 grid gap-5 sm:grid-cols-2">
                        <Field id="field-fullName" label="Full name" error={errors.fullName}>
                          <input
                            id="field-fullName"
                            type="text"
                            autoComplete="name"
                            value={values.fullName ?? ""}
                            onChange={(e) => setValue("fullName", e.target.value)}
                            aria-invalid={Boolean(errors.fullName)}
                            aria-describedby={errors.fullName ? "field-fullName-error" : undefined}
                            className={inputClass(Boolean(errors.fullName))}
                            placeholder="Your name"
                          />
                        </Field>
                        <Field id="field-phone" label="Telephone" error={errors.phone}>
                          <input
                            id="field-phone"
                            type="tel"
                            autoComplete="tel"
                            value={values.phone ?? ""}
                            onChange={(e) => setValue("phone", e.target.value)}
                            aria-invalid={Boolean(errors.phone)}
                            aria-describedby={errors.phone ? "field-phone-error" : undefined}
                            className={inputClass(Boolean(errors.phone))}
                            placeholder="07… or 0121…"
                          />
                        </Field>
                        <div className="sm:col-span-2">
                          <Field id="field-email" label="Email address" error={errors.email}>
                            <input
                              id="field-email"
                              type="email"
                              autoComplete="email"
                              value={values.email ?? ""}
                              onChange={(e) => setValue("email", e.target.value)}
                              aria-invalid={Boolean(errors.email)}
                              aria-describedby={errors.email ? "field-email-error" : undefined}
                              className={inputClass(Boolean(errors.email))}
                              placeholder="name@example.co.uk"
                            />
                          </Field>
                        </div>

                        {/* Audience-specific fields */}
                        {AUDIENCE_FIELDS[audience].map((field) => (
                          <div key={field.key} className={field.half ? "" : "sm:col-span-2"}>
                            <Field
                              id={`field-${field.key}`}
                              label={field.label}
                              optional={!field.required}
                              error={errors[field.key]}
                              hint={field.hint}
                            >
                              {field.type === "select" ? (
                                <div className="relative">
                                  <select
                                    id={`field-${field.key}`}
                                    value={values[field.key] ?? ""}
                                    onChange={(e) => setValue(field.key, e.target.value)}
                                    aria-invalid={Boolean(errors[field.key])}
                                    aria-describedby={
                                      errors[field.key]
                                        ? `field-${field.key}-error`
                                        : field.hint
                                          ? `field-${field.key}-hint`
                                          : undefined
                                    }
                                    className={cn(
                                      inputClass(Boolean(errors[field.key])),
                                      "appearance-none pr-11",
                                      !values[field.key] && "text-ink-soft/60"
                                    )}
                                  >
                                    <option value="">Please select…</option>
                                    {field.options?.map((option) => (
                                      <option key={option} value={option}>
                                        {option}
                                      </option>
                                    ))}
                                  </select>
                                  <ChevronDown
                                    className="pointer-events-none absolute top-1/2 right-3.5 h-4.5 w-4.5 -translate-y-1/2 text-ink-soft"
                                    strokeWidth={1.75}
                                    aria-hidden="true"
                                  />
                                </div>
                              ) : (
                                <input
                                  id={`field-${field.key}`}
                                  type="text"
                                  value={values[field.key] ?? ""}
                                  onChange={(e) => setValue(field.key, e.target.value)}
                                  aria-invalid={Boolean(errors[field.key])}
                                  aria-describedby={
                                    errors[field.key]
                                      ? `field-${field.key}-error`
                                      : field.hint
                                        ? `field-${field.key}-hint`
                                        : undefined
                                  }
                                  className={inputClass(Boolean(errors[field.key]))}
                                  placeholder={field.placeholder}
                                />
                              )}
                            </Field>
                          </div>
                        ))}

                        {/* Message */}
                        <div className="sm:col-span-2">
                          <Field id="field-message" label="Your message" optional>
                            <textarea
                              id="field-message"
                              rows={4}
                              value={values.message ?? ""}
                              onChange={(e) => setValue("message", e.target.value)}
                              className={cn(inputClass(false), "resize-y")}
                              placeholder={MESSAGE_PLACEHOLDERS[audience]}
                            />
                          </Field>
                        </div>
                      </div>

                      {/* Submit */}
                      <div className="mt-8 flex flex-col gap-5">
                        <button
                          type="submit"
                          disabled={status === "submitting"}
                          className="group inline-flex w-full items-center justify-center gap-2.5 rounded-[2px] bg-navy px-7 py-4 text-[0.8125rem] font-semibold tracking-[0.08em] text-cream uppercase transition-all duration-300 hover:bg-navy-soft disabled:cursor-wait disabled:opacity-80 sm:w-auto sm:self-start sm:px-10"
                        >
                          {status === "submitting" ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} aria-hidden="true" />
                              Sending…
                            </>
                          ) : (
                            <>
                              Send My Enquiry
                              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} aria-hidden="true" />
                            </>
                          )}
                        </button>

                        <p className="flex items-start gap-2 text-[0.78rem] leading-relaxed text-ink-soft/85">
                          <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                          <span>
                            By submitting, you agree to be contacted about your enquiry. We never
                            sell your details. Read our{" "}
                            <a
                              href={CONTACT.privacyUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="font-medium text-navy underline decoration-gold decoration-2 underline-offset-2 hover:text-gold-deep"
                            >
                              Privacy Policy
                            </a>
                            . This preview form is a design demonstration and does not send
                            enquiries.
                          </span>
                        </p>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
