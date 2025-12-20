import React, { useState, useEffect } from 'react';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import Router from './routes/Router';
import LetterGlitch from './components/LetterGlitch';
import TargetCursor from './components/TargetCursor';
import './index.css';

export default function App() {
  const [theme, setTheme] = useState("night");
  const [active, setActive] = useState("Home");


  // ✅ Apply theme on first render and whenever it changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);


  useEffect(() => {
  // Ensure ScrollTrigger recalculates after full render
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  }, []);


  useEffect(() => {
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    return () => clearTimeout(timeout);
  }, []);


  // ✅ Toggle between day and night
  const toggleTheme = () => {
    const newTheme = theme === "night" ? "day" : "night";
    setTheme(newTheme);
  };

  return (
    <div className="app-root">
      {/* Glitch background tied to theme */}
      <LetterGlitch
        theme={theme}
        glitchSpeed={50}
        centerVignette={false}
        outerVignette={true}
        smooth={true}
      />

      {/* Custom cursor */}
      <TargetCursor
        spinDuration={2.2}
        hideDefaultCursor={true}
        parallaxOn={true}
      />

      {/* Route-based content */}
      <div className="site-content">
        <Router theme={theme} toggleTheme={toggleTheme} active={active} setActive={setActive} />
      </div>
    </div>
  );
}
