import React, { useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Router from "./routes/Router";
import LetterGlitch from "./components/LetterGlitch";
import TargetCursor from "./components/TargetCursor";
import Preloader from "./components/Preloader";
import "./index.css";

/* ✅ REGISTER ONCE */
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [theme, setTheme] = useState("night");
  const [active, setActive] = useState("Home");
  const [ready, setReady] = useState(false);
  const [revealKey, setRevealKey] = useState(0);

  /* Global theme control (SITE ONLY, NOT PRELOADER) */
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "night" ? "day" : "night"));
  };

  /* ✅ STABLE CALLBACKS (THIS IS THE FIX) */
  const handleStartReveal = useCallback(() => {
    setRevealKey(k => k + 1);
  }, []);

  const handleComplete = useCallback(() => {
    setReady(true);
  }, []);

  // Refresh ScrollTrigger AFTER preloader is gone and layout is stable
  useEffect(() => {
    if (!ready) return;

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  }, [ready]);

  // Site is visible when revealKey > 0 (curtain starts opening)
  const isRevealing = revealKey > 0;

  return (
    <div className="app-root">

      {/* ✅ PRELOADER EXISTS ONLY UNTIL READY */}
      {!ready && (
        <Preloader 
        onStartReveal={handleStartReveal}
        onComplete={handleComplete}
        />
      )}

      {/* ✅ VISUAL LAYERS (ALWAYS MOUNTED) */}
      <LetterGlitch
        theme={theme}
        glitchSpeed={50}
        centerVignette={false}
        outerVignette={true}
        smooth={true}
      />

      <TargetCursor
        spinDuration={2.2}
        hideDefaultCursor={true}
        parallaxOn={true}
      />

      {/* Site layer: show on reveal, unlock on ready */}
      <div
        className={[
          "site-shell",
          isRevealing ? "site-visible" : "site-hidden",
          ready ? "site-unlocked" : "site-locked",
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
