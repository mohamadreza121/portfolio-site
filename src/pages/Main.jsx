'use client';

import Home from "./Home";
import About from "./About";
import Projects from "./Projects";
import Certifications from "./Certifications";
import Services from "./Services";
import Footer from "../components/footer";
import "../components/TargetCursor.css";

/* =====================================================
   CENTRALIZED SCROLL-SPY + ROUTING
===================================================== */
import { useScrollSpyRouter } from "../hooks/useScrollSpyRouter";

export default function Main({
  setActive,
  revealKey,
  onRequestQuote,
  isQuoteOpen
}) {
  /* =====================================================
     SCROLL-SPY (PAUSED WHEN MODAL IS OPEN)
  ===================================================== */
  useScrollSpyRouter(setActive, !isQuoteOpen);

  /* =====================================================
     RENDER
  ===================================================== */
  return (
    <div className="main-page">
      <main className="site-content">
        <Home revealKey={revealKey} />
        <About />
        <Projects />
        <Certifications />
        <Services onRequestQuote={onRequestQuote} />
      </main>

      <Footer onRequestQuote={onRequestQuote} />
    </div>
  );
}
