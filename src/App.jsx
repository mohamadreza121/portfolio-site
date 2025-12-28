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
     SCROLLTRIGGER REFRESH QUEUE (DEDUPED)
  ===================================================== */
  const stRefreshRafRef = useRef(0);
  const stRefreshQueuedRef = useRef(false);

  const scheduleScrollTriggerRefresh = useCallback((force = false) => {
    if (stRefreshQueuedRef.current) return;
    stRefreshQueuedRef.current = true;

    if (stRefreshRafRef.current) {
      cancelAnimationFrame(stRefreshRafRef.current);
    }

    stRefreshRafRef.current = requestAnimationFrame(() => {
      stRefreshQueuedRef.current = false;
      try {
        force ? ScrollTrigger.refresh(true) : ScrollTrigger.refresh();
      } catch {
        /* no-op */
      }
    });
  }, []);

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
      scheduleScrollTriggerRefresh(false);
    });
  }, [location.pathname, phase, scheduleScrollTriggerRefresh]);

  /* =====================================================
     SCROLLTRIGGER REFRESH
  ===================================================== */
  useEffect(() => {
    if (phase !== "ready") return;
    scheduleScrollTriggerRefresh(false);
  }, [phase, scheduleScrollTriggerRefresh]);

  /* =====================================================
     SCROLL TOP VISIBILITY
  ===================================================== */
  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 240);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* =====================================================
     CLEANUP RAF ON UNMOUNT
  ===================================================== */
  useEffect(() => {
    return () => {
      if (stRefreshRafRef.current) {
        cancelAnimationFrame(stRefreshRafRef.current);
      }
    };
  }, []);

  /* =====================================================
     RENDER
  ===================================================== */
  return (
    <div className="app-root">
      {(phase === "preloader" || phase === "curtains") && (
        <CurtainOverlay
          phase={phase}
          onStartReveal={handleCurtainsStartReveal}
          onComplete={handleCurtainsComplete}
        />
      )}

      {phase === "preloader" && (
        <Preloader onComplete={handlePreloaderComplete} />
      )}

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
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                window.dispatchEvent(new Event("scrollToTop"));
              }}
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
        outerVignette
        smooth
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
