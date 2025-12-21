import React, { useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaArrowUp } from "react-icons/fa";

import Router from "./routes/Router";
import LetterGlitch from "./components/LetterGlitch";
import TargetCursor from "./components/TargetCursor";
import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import CurtainOverlay from "./components/CurtainOverlay";

import "./index.css";

/* ✅ REGISTER ONCE */
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  /* =====================================================
     GLOBAL STATE
     ===================================================== */
  const [theme, setTheme] = useState("night");
  const [active, setActive] = useState("Home");

  /* =====================================================
     PHASE STATE (3-PHASE MODEL)
     ===================================================== */
  const [phase, setPhase] = useState("preloader");
  // "preloader" → "curtains" → "ready"

  /* =====================================================
     REVEAL KEY (TRIGGERS HERO / DECRYPTED EFFECTS)
     ===================================================== */
  const [revealKey, setRevealKey] = useState(0);

  /* =====================================================
     UI STATE
     ===================================================== */
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  useEffect(() => {
    document.documentElement.setAttribute("data-phase", phase);
  }, [phase]);


  /* =====================================================
     THEME CONTROL (SITE ONLY)
     ===================================================== */
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "night" ? "day" : "night"));
  };

  /* =====================================================
     PRELOADER → CURTAINS HANDOFF
     ===================================================== */
  const handlePreloaderComplete = useCallback(() => {
    setPhase("curtains");
  }, []);

  /* =====================================================
     CURTAINS START → REVEAL SITE CONTENT
     ===================================================== */
  const handleCurtainsStartReveal = useCallback(() => {
    // This is the missing link that drives:
    // - .site-hidden → .site-visible
    // - Home hero-enter GSAP
    // - DecryptedText "view/both" timing in context
    window.scrollTo(0, 0); // critical
    setRevealKey((k) => k + 1);
  }, []);

  /* =====================================================
     CURTAINS → READY HANDOFF
     ===================================================== */
  const handleCurtainsComplete = useCallback(() => {
    setPhase("ready");
  }, []);

  /* =====================================================
     SCROLL TRIGGER REFRESH (ONLY WHEN READY)
     ===================================================== */
  useEffect(() => {
    if (phase !== "ready") return;

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  }, [phase]);

  /* =====================================================
     SCROLL-TO-TOP BUTTON
     ===================================================== */
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 200);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* =====================================================
     RENDER
     ===================================================== */
  return (
    <div className="app-root">

      {/* CURTAINS EXIST DURING PRELOADER + CURTAINS */}
      {(phase === "preloader" || phase === "curtains") && (
        <CurtainOverlay
          phase={phase}
          onStartReveal={handleCurtainsStartReveal}
          onComplete={handleCurtainsComplete}
        />
      )}

      {/* PRELOADER */}
      {phase === "preloader" && (
        <Preloader onComplete={handlePreloaderComplete} />
      )}

      {/* GLOBAL FIXED LAYERS */}
      {(phase === "curtains" || phase === "ready") && (
        <>
          <Navbar
            active={active}
            onSetActive={setActive}
            theme={theme}
            onToggleTheme={toggleTheme}
          />

          {showScrollTop && (
            <button
              className="scroll-top-btn cursor-target"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <FaArrowUp size={22} />
            </button>
          )}
        </>
      )}

      <LetterGlitch
        theme={theme}
        glitchSpeed={50}
        centerVignette={false}
        outerVignette={true}
        smooth={true}
      />

      <TargetCursor spinDuration={2.2} hideDefaultCursor parallaxOn />

      <div
        className={[
          "site-shell",
          revealKey > 0 ? "site-visible" : "site-hidden",
          phase === "ready" ? "site-unlocked" : "site-locked",
        ].join(" ")}
      >
        <Router
          theme={theme}
          toggleTheme={toggleTheme}
          active={active}
          setActive={setActive}
          revealKey={revealKey}
        />
      </div>

    </div>
  );
}
