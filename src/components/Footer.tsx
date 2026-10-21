import { ArrowUp, Mail, MapPin, Phone } from "lucide-react";
import Logo from "./Logo";
import { AUDIENCES, CONTACT, type AudienceId } from "../lib/content";

interface FooterProps {
  onSelectAudience: (id: AudienceId) => void;
}

const EXPLORE_LINKS = [
  { label: "Home", href: "#top" },
  { label: "About Us", href: "#about" },
  { label: "How It Works", href: "#process" },
  { label: "Common Questions", href: "#faq" },
  { label: "Make an Enquiry", href: "#enquire" },
];

const linkClass =
  "text-[0.9rem] text-cream/65 transition-colors duration-300 hover:text-gold-pale";

export default function Footer({ onSelectAudience }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="grain relative overflow-hidden border-t border-gold/20 bg-navy-deep">
      <div className="relative mx-auto max-w-[88rem] px-5 pt-16 pb-10 sm:px-8 lg:px-12 lg:pt-20">
        <div className="grid gap-12 pb-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-5">
            <Logo tone="light" />
            <p className="mt-6 max-w-sm text-[0.925rem] leading-relaxed text-cream/65">
              A family-run property investment, development and management company. Three
              generations of local knowledge, honest communication and personalised service
              across Birmingham and the West Midlands.
            </p>
            <p className="mt-6 flex items-center gap-2.5 text-[0.8rem] tracking-wide text-cream/50 uppercase">
              <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45 bg-gold" />
              Our home for over 45 years
            </p>
          </div>

          {/* Who we help */}
          <nav aria-label="Who we help" className="lg:col-span-2">
            <h3 className="eyebrow text-gold-pale">Who We Help</h3>
            <ul className="mt-5 space-y-3">
              {AUDIENCES.map((audience) => (
                <li key={audience.id}>
                  <button
                    type="button"
                    onClick={() => onSelectAudience(audience.id)}
                    data-audience={audience.id}
                    className={linkClass}
                  >
                    {audience.navLabel}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Explore */}
          <nav aria-label="Explore" className="lg:col-span-2">
            <h3 className="eyebrow text-gold-pale">Explore</h3>
            <ul className="mt-5 space-y-3">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className={linkClass}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="eyebrow text-gold-pale">Contact</h3>
            <ul className="mt-5 space-y-4 text-[0.9rem]">
              <li>
                <a href={CONTACT.phoneHref} className="flex items-center gap-3 text-cream/75 transition-colors hover:text-gold-pale">
                  <Phone className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.75} aria-hidden="true" />
                  {CONTACT.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={CONTACT.emailHref} className="flex items-center gap-3 break-all text-cream/75 transition-colors hover:text-gold-pale">
                  <Mail className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.75} aria-hidden="true" />
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-cream/75">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.75} aria-hidden="true" />
                <span>
                  {CONTACT.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-5 border-t border-cream/12 pt-8 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-[0.8rem] text-cream/45">
            © {year} GS Property Group. All rights reserved.
          </p>
          <p className="text-[0.8rem] text-cream/45">
            Member of the Residential Landlords Association · The Property Ombudsman
          </p>
          <div className="flex items-center gap-6">
            <a
              href={CONTACT.privacyUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[0.8rem] text-cream/55 transition-colors hover:text-gold-pale"
            >
              Privacy Policy
            </a>
            <a
              href="#top"
              className="group inline-flex items-center gap-2 text-[0.8rem] font-medium tracking-wide text-cream/55 uppercase transition-colors hover:text-gold-pale"
              aria-label="Back to top"
            >
              Top
              <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" strokeWidth={1.75} aria-hidden="true" />
            </a>
          </div>
        </div>

        <p className="mt-6 text-[0.72rem] text-cream/30">
          Homepage redesign concept prepared for client review. Business information drawn from
          gspropertygroup.co.uk.
        </p>
      </div>
    </footer>
  );
}
