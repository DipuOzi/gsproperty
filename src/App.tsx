import { useCallback, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Pathways from "./components/Pathways";
import AudienceSections from "./components/AudienceSections";
import Trust from "./components/Trust";
import Process from "./components/Process";
import Enquiry from "./components/Enquiry";
import Faq from "./components/Faq";
import FinalCta from "./components/FinalCta";
import Footer from "./components/Footer";
import type { AudienceId } from "./lib/content";

export default function App() {
  const [audience, setAudience] = useState<AudienceId>("investor");

  /**
   * Shared conversion action: choosing an audience anywhere on the page
   * pre-selects that audience in the enquiry form and scrolls to it.
   */
  const selectAudienceAndEnquire = useCallback((id: AudienceId) => {
    setAudience(id);
    const target = document.getElementById("enquire");
    if (target) {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    }
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[70] rounded-[2px] bg-gold px-4 py-2 text-sm font-semibold text-navy-deep focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to main content
      </a>

      <Header />

      <main id="main">
        <Hero onSelectAudience={selectAudienceAndEnquire} />
        <Pathways onSelectAudience={selectAudienceAndEnquire} />
        <AudienceSections onSelectAudience={selectAudienceAndEnquire} />
        <Trust />
        <Process />
        <Enquiry audience={audience} onAudienceChange={setAudience} />
        <Faq />
        <FinalCta />
      </main>

      <Footer onSelectAudience={selectAudienceAndEnquire} />
    </>
  );
}
