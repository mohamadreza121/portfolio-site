import React, { useState, useEffect, useCallback, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaArrowUp } from "react-icons/fa";
import { useLocation } from "react-router-dom";

import Router from "./routes/Router";
import LetterGlitch from "./components/LetterGlitch";
import TargetCursor from "./components/TargetCursor";
import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import CurtainOverlay from "./components/CurtainOverlay";

import "./index.css";

/* =====================================================
   GSAP
===================================================== */
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  /* =====================================================
     ROUTING
  ===================================================== */
  const location = useLocation();

  /* =====================================================
     GLOBAL STATE
  ===================================================== */
  const [theme, setTheme] = useState("night");
  const [active, setActive] = useState("Home");

  /* =====================================================
     PHASE STATE
  ===================================================== */
  const [phase, setPhase] = useState("preloader");
  // preloader → curtains → ready

  /* =====================================================
     REVEAL KEY
  ===================================================== */
  const [revealKey, setRevealKey] = useState(0);

  /* =====================================================
     INTERNAL GUARDS
  ===================================================== */
  const hasInitialRevealRef = useRef(false);

  /* =====================================================
     UI STATE
  ===================================================== */
  const [showScrollTop, setShowScrollTop] = useState(false);

  /* =====================================================
     DISABLE BROWSER SCROLL RESTORATION (CRITICAL)
  ===================================================== */
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  /* =====================================================
     FORCE HARD SCROLL RESET ON FIRST LOAD
  ===================================================== */
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  /* =====================================================
     PHASE ATTR
  ===================================================== */
  useEffect(() => {
    document.documentElement.setAttribute("data-phase", phase);
  }, [phase]);

  /* =====================================================
     THEME
  ===================================================== */
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((p) => (p === "night" ? "day" : "night"));
  };

  /* =====================================================
     PRELOADER → CURTAINS
  ===================================================== */
  const handlePreloaderComplete = useCallback(() => {
    setPhase("curtains");
  }, []);

  /* =====================================================
     CURTAINS START → REVEAL
     (THIS IS THE ONLY PLACE WE SCROLL ON BOOT)
  ===================================================== */
  const handleCurtainsStartReveal = useCallback(() => {
    // HARD reset before content becomes visible
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    setRevealKey((k) => k + 1);
  }, []);

  /* =====================================================
     CURTAINS → READY
  ===================================================== */
  const handleCurtainsComplete = useCallback(() => {
    setPhase("ready");
  }, []);

  /* =====================================================
     ENSURE HOME IS ACTIVE AFTER BOOT
  ===================================================== */
  useEffect(() => {
    if (phase !== "ready") return;

    requestAnimationFrame(() => {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      setActive("Home");
    });
  }, [phase]);

  /* =====================================================
     RE-TRIGGER REVEAL WHEN RETURNING TO "/"
  ===================================================== */
  useEffect(() => {
    if (phase !== "ready") return;
    if (location.pathname !== "/") return;

    if (!hasInitialRevealRef.current) {
      hasInitialRevealRef.current = true;
      return;
    }

    requestAnimationFrame(() => {
      setRevealKey((k) => k + 1);
      ScrollTrigger.refresh(true);
    });
  }, [location.pathname, phase]);

  /* =====================================================
     SCROLLTRIGGER REFRESH
  ===================================================== */
  useEffect(() => {
    if (phase !== "ready") return;
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, [phase]);

  /* =====================================================
     SCROLL-TO-TOP BUTTON
  ===================================================== */
  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 200);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* =====================================================
     RENDER
  ===================================================== */
  return (
    <div className="app-root">
      {/* CURTAIN OVERLAY */}
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

      {/* GLOBAL FIXED UI */}
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
              onClick={() =>
                window.scrollTo({ top: 0, behavior: "smooth" })
              }
            >
              <FaArrowUp size={22} />
            </button>
          )}
        </>
      )}

      {/* VISUAL LAYERS */}
      <LetterGlitch
        theme={theme}
        glitchSpeed={50}
        centerVignette={false}
        outerVignette
        smooth
      />

      <TargetCursor spinDuration={2.2} hideDefaultCursor parallaxOn />

      {/* SITE CONTENT */}
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
