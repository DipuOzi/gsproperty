import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, Menu, Phone, X } from "lucide-react";
import { cn } from "../utils/cn";
import Logo from "./Logo";
import { CONTACT } from "../lib/content";

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#top" },
  { label: "Investors", href: "#investors" },
  { label: "Landlords", href: "#landlords" },
  { label: "Property Owners", href: "#property-owners" },
  { label: "Landowners", href: "#landowners" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#enquire" },
];

/**
 * Keep this in sync with the `min-[1360px]` utilities below.
 * The full menu only appears when there is genuinely room for seven
 * labels, the telephone number and the CTA without compressing them.
 */
const DESKTOP_NAV_QUERY = "(min-width: 1360px)";
const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLabel, setActiveLabel] = useState<string | null>("Home");

  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const navClickLockRef = useRef(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* A quiet scroll-spy mapping each destination to its own section. */
  useEffect(() => {
    const onScroll = () => {
      // Let an intentional navigation settle before the scroll-spy takes over.
      if (Date.now() < navClickLockRef.current) return;

      const probe = window.scrollY + 140;
      const sections = [
        { id: "top", label: "Home" as string | null },
        { id: "pathways", label: null },
        { id: "investors", label: "Investors" as string | null },
        { id: "landlords", label: "Landlords" as string | null },
        { id: "property-owners", label: "Property Owners" as string | null },
        { id: "landowners", label: "Landowners" as string | null },
        { id: "about", label: "About Us" },
        { id: "process", label: null },
        { id: "enquire", label: "Contact" },
        { id: "faq", label: null },
      ];

      let current: { id: string; label: string | null } = sections[0];
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element && element.offsetTop <= probe) current = section;
      }

      setActiveLabel(current.label);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  /* Never leave the full-screen menu open when the desktop nav returns. */
  useEffect(() => {
    const media = window.matchMedia(DESKTOP_NAV_QUERY);
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) closeMenu();
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [closeMenu]);

  /* Scroll lock, initial focus, focus trap and Escape handling. */
  useEffect(() => {
    if (!menuOpen) return;

    const previouslyFocused =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 0);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }

      if (event.key !== "Tab" || !menuRef.current) return;

      const focusable = Array.from(
        menuRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      ).filter((element) => element.getClientRects().length > 0);

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const current = document.activeElement;

      if (event.shiftKey && (current === first || !menuRef.current.contains(current))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && current === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      previouslyFocused?.focus({ preventScroll: true });
    };
  }, [menuOpen, closeMenu]);

  const overHero = !scrolled;

  const navLinkTone = overHero
    ? "text-cream/80 hover:text-cream"
    : "text-ink-soft hover:text-navy";
  const navLinkActiveTone = overHero ? "text-cream" : "text-navy";

  const handleNavClick = (label: string) => {
    navClickLockRef.current = Date.now() + 950;
    setActiveLabel(label);
    closeMenu();
  };

  return (
    <>
      <header
        data-scrolled={scrolled}
        className={cn(
          "site-header fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300 ease-out",
          scrolled
            ? "border-stone-line/80 bg-cream/95 shadow-[0_14px_40px_-26px_rgba(23,43,58,0.45)] backdrop-blur-md"
            : "border-cream/10 bg-transparent"
        )}
      >
        {/* A quiet scrim keeps the light header legible over the hero photograph. */}
        <div
          aria-hidden="true"
          className={cn(
            "header-scrim pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-navy-deep/80 via-navy-deep/35 to-transparent transition-opacity duration-500",
            scrolled ? "opacity-0" : "opacity-100"
          )}
        />

        <div
          className={cn(
            "site-header__inner relative mx-auto flex w-full max-w-[88rem] items-center gap-4 px-5 transition-[min-height] duration-300 ease-out sm:px-8 lg:gap-6 lg:px-12",
            scrolled ? "min-h-[4.5rem] lg:min-h-[4.75rem]" : "min-h-[5.25rem] lg:min-h-[5.75rem]"
          )}
        >
          {/* 1 — Brand */}
          <div className="site-brand flex min-w-[8.5rem] shrink-0 items-center lg:min-w-[10.25rem]">
            <a
              href="#top"
              onClick={() => handleNavClick("Home")}
              aria-label="GS Property Group — back to top"
              className="inline-flex items-center rounded-[2px] transition-opacity duration-300 hover:opacity-90"
            >
              <Logo tone={overHero ? "light" : "dark"} compact={scrolled} />
            </a>
          </div>

          {/* 2 — Primary navigation, given all remaining central space */}
          <nav
            aria-label="Primary"
            className="site-nav hidden min-w-0 flex-1 justify-center min-[1360px]:flex"
          >
            <ul className="flex items-center gap-0.5 min-[1440px]:gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = activeLabel === item.label;
                return (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={() => handleNavClick(item.label)}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "group inline-flex items-center px-2.5 py-3 text-[0.8125rem] leading-none font-medium tracking-[0.02em] whitespace-nowrap transition-colors duration-300 min-[1440px]:px-3",
                        isActive ? navLinkActiveTone : navLinkTone
                      )}
                    >
                      <span className="relative">
                        {item.label}
                        <span
                          aria-hidden="true"
                          className={cn(
                            "absolute -bottom-[7px] left-0 h-px w-full origin-center bg-gold transition-transform duration-300 ease-out",
                            isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                          )}
                        />
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* 3 — Contact and conversion */}
          <div className="site-contact ml-auto flex shrink-0 items-center gap-2 sm:gap-2.5 lg:gap-3">
            {/* Compact icon-only call link for mobile */}
            <a
              href={CONTACT.phoneHref}
              aria-label={`Call GS Property Group on ${CONTACT.phoneDisplay}`}
              className={cn(
                "site-phone-icon inline-flex h-11 w-11 items-center justify-center rounded-[2px] transition-colors duration-300 md:hidden",
                overHero
                  ? "text-cream hover:bg-cream/10"
                  : "text-navy hover:bg-navy/5"
              )}
            >
              <Phone className="h-[1.125rem] w-[1.125rem] text-gold" strokeWidth={1.75} aria-hidden="true" />
            </a>

            {/* Full telephone number — one line, always */}
            <a
              href={CONTACT.phoneHref}
              className={cn(
                "site-phone hidden shrink-0 items-center gap-2 px-1 py-2 text-[0.8125rem] leading-none font-medium tracking-[0.015em] whitespace-nowrap transition-colors duration-300 md:inline-flex",
                overHero
                  ? "text-cream/85 hover:text-cream"
                  : "text-ink-soft hover:text-navy"
              )}
            >
              <Phone className="h-3.5 w-3.5 shrink-0 text-gold" strokeWidth={1.75} aria-hidden="true" />
              <span className="tabular-nums">{CONTACT.phoneDisplay}</span>
            </a>

            <a
              href="#enquire"
              onClick={() => handleNavClick("Contact")}
              className={cn(
                "site-cta group/cta hidden h-11 shrink-0 items-center justify-center gap-2 rounded-[2px] px-4 text-[0.72rem] leading-none font-semibold tracking-[0.1em] uppercase whitespace-nowrap transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 md:inline-flex min-[1440px]:px-5",
                overHero
                  ? "bg-gold text-navy-deep hover:bg-gold-pale focus-visible:outline-cream"
                  : "bg-navy text-cream hover:bg-navy-soft focus-visible:outline-gold-deep"
              )}
            >
              Discuss Your Property Goals
              <ArrowRight
                className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover/cta:translate-x-0.5"
                strokeWidth={1.9}
                aria-hidden="true"
              />
            </a>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-haspopup="dialog"
              aria-controls="site-menu"
              aria-label="Open navigation menu"
              className={cn(
                "site-menu-button inline-flex h-11 w-11 shrink-0 items-center justify-center gap-2 rounded-[2px] text-[0.72rem] font-semibold tracking-[0.1em] uppercase transition-colors duration-300 sm:w-auto sm:px-2.5 min-[1360px]:hidden",
                overHero
                  ? "text-cream hover:bg-cream/10"
                  : "text-navy hover:bg-navy/5"
              )}
            >
              <Menu className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
              <span className="hidden sm:inline">Menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile / tablet navigation */}
      <div
        id="site-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        aria-hidden={!menuOpen}
        data-open={menuOpen}
        inert={!menuOpen}
        className={cn(
          "grain fixed inset-0 z-[60] flex h-[100svh] flex-col overflow-hidden bg-navy-deep transition-opacity duration-300 ease-out min-[1360px]:hidden",
          menuOpen ? "visible opacity-100" : "invisible pointer-events-none opacity-0"
        )}
      >
        <div className="relative z-10 shrink-0 border-b border-cream/10">
          <div className="mx-auto flex w-full max-w-[88rem] items-center justify-between px-5 py-4 sm:px-8">
            <a
              href="#top"
              onClick={() => handleNavClick("Home")}
              aria-label="GS Property Group — back to top"
              className="inline-flex items-center rounded-[2px]"
            >
              <Logo tone="light" />
            </a>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeMenu}
              aria-label="Close navigation menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-[2px] text-cream transition-colors duration-300 hover:bg-cream/10 focus-visible:outline-cream"
            >
              <X className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="relative z-10 flex min-h-0 flex-1 flex-col overflow-x-hidden overflow-y-auto overscroll-contain">
          <nav aria-label="Mobile" className="mx-auto w-full max-w-[88rem] px-5 pt-4 sm:px-8 sm:pt-7">
            <ul>
              {NAV_ITEMS.map((item, i) => {
                const isActive = activeLabel === item.label;
                return (
                  <li
                    key={item.label}
                    className={cn(
                      "border-b border-cream/10 transition-all duration-500 ease-out",
                      menuOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                    )}
                    style={{ transitionDelay: menuOpen ? `${70 + i * 45}ms` : "0ms" }}
                  >
                    <a
                      href={item.href}
                      onClick={() => handleNavClick(item.label)}
                      aria-current={isActive ? "page" : undefined}
                      className="group flex min-h-[3.5rem] items-center justify-between gap-4 py-3 sm:py-3.5"
                    >
                      <span
                        className={cn(
                          "font-display text-[1.6rem] leading-tight font-normal transition-colors duration-300 sm:text-[1.85rem]",
                          isActive
                            ? "text-gold-pale"
                            : "text-cream group-hover:text-gold-pale"
                        )}
                      >
                        {item.label}
                      </span>
                      <span className="flex items-center gap-3">
                        {isActive && (
                          <span
                            aria-hidden="true"
                            className="h-1 w-1 rotate-45 bg-gold"
                          />
                        )}
                        <ArrowRight
                          className="h-5 w-5 text-gold opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                          strokeWidth={1.5}
                          aria-hidden="true"
                        />
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mx-auto mt-auto w-full max-w-[88rem] px-5 pt-8 pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-8 sm:pt-10">
            <div
              className={cn(
                "transition-all duration-500 ease-out",
                menuOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              )}
              style={{ transitionDelay: menuOpen ? "420ms" : "0ms" }}
            >
              <a
                href="#enquire"
                onClick={() => handleNavClick("Contact")}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-[2px] bg-gold px-6 py-3.5 text-[0.75rem] leading-none font-semibold tracking-[0.12em] text-navy-deep uppercase transition-colors duration-300 hover:bg-gold-pale focus-visible:outline-cream sm:w-auto"
              >
                Discuss Your Property Goals
                <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              </a>

              <div className="mt-7 border-t border-cream/10 pt-6">
                <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.9rem] text-cream/55">
                  <span>Prefer to talk?</span>
                  <a
                    href={CONTACT.phoneHref}
                    className="inline-flex items-center gap-2 whitespace-nowrap font-medium text-cream transition-colors hover:text-gold-pale"
                  >
                    <Phone className="h-4 w-4 text-gold" strokeWidth={1.75} aria-hidden="true" />
                    {CONTACT.phoneDisplay}
                  </a>
                </p>
                <p className="mt-2 text-[0.8rem] tracking-wide text-cream/45">
                  Birmingham &amp; the West Midlands
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
