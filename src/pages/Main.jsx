'use client';

import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Home from "./Home";
import About from "./About";
import Projects from "./Projects";
import Certifications from "./Certifications";
import Services from "./Services";
import Footer from "../components/footer";
import "../components/TargetCursor.css";

/* ✅ CENTRALIZED SCROLL-SPY + ROUTING */
import { useScrollSpyRouter } from "../hooks/useScrollSpyRouter";

export default function Main({ setActive, revealKey }) {
  /* =====================================================
     SCROLL-SPY + ROUTING (SINGLE SOURCE OF TRUTH)
  ===================================================== */
  useScrollSpyRouter(setActive);

  /* =====================================================
     🔥 GSAP / SCROLLTRIGGER RE-ARM (ONCE)
  ===================================================== */
  useEffect(() => {
    requestAnimationFrame(() => {
      ScrollTrigger.refresh(true);
    });
  }, []);

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
        <Services />
      </main>

      <Footer />
    </div>
  );
}
