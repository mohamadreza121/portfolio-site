import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./Preloader.css";

export default function Preloader({ onComplete, onStartReveal }) {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const progressRef = useRef(null);

  const TOTAL_PULSES = 5;
  const PULSE_DURATION = 0.6;
  const TOTAL_PULSE_TIME = TOTAL_PULSES * PULSE_DURATION * 2;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    /* =========================================
       PRELOADER-ONLY THEME (ISOLATED)
       ========================================= */
    let currentTheme = "night";
    container.setAttribute("data-preloader-theme", currentTheme);

    const progress = { value: 0 };

    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
    });

    /* =========================================
       INITIAL STATE
       ========================================= */
    gsap.set(container, { opacity: 1 });
    gsap.set(titleRef.current, { opacity: 0, scale: 0.95 });
    gsap.set(".curtain", { opacity: 0 });
    gsap.set(".curtain-left", { x: "0%" });
    gsap.set(".curtain-right", { x: "0%" });

    /* =========================================
       TITLE PULSES (LOCAL THEME TOGGLE)
       ========================================= */
    for (let i = 0; i < TOTAL_PULSES; i++) {
      tl.to(titleRef.current, {
        opacity: 1,
        scale: 1,
        duration: PULSE_DURATION,
      });

      tl.to(titleRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: PULSE_DURATION,
      });

      if (i < TOTAL_PULSES - 1) {
        tl.call(() => {
          currentTheme = currentTheme === "night" ? "day" : "night";
          container.setAttribute("data-preloader-theme", currentTheme);
        });
      }
    }

    /* =========================================
       PROGRESS COUNTER (SYNCED)
       ========================================= */
    tl.to(
      progress,
      {
        value: 100,
        duration: TOTAL_PULSE_TIME,
        onUpdate: () => {
          if (progressRef.current) {
            progressRef.current.textContent = `${Math.round(progress.value)}%`;
          }
        },
      },
      0
    );

    /* =========================================
       CURTAINS APPEAR (CLOSED)
       ========================================= */
    tl.to(".curtain", {
      opacity: 1,
      duration: 0.35,
    });


    /* =========================================
      CURTAIN OPEN (MAIN EVENT)
    ========================================= */

    // signal site reveal EXACTLY when curtains start moving
    tl.call(() => {
      onStartReveal?.();
    });

    tl.to(".curtain-left", {
      x: "-115%",
      duration: 1.8,
      ease: "power4.inOut",
    });

    tl.to(
      ".curtain-right",
      {
        x: "115%",
        duration: 1.8,
        ease: "power4.inOut",
      },
      "<"
    );

    /* =========================================
      NOW hide preloader visuals
    ========================================= */
    tl.call(() => {
      container.classList.add("hide-content");
    });

    /* =========================================
      FINALLY unmount preloader
    ========================================= */
    tl.call(() => {
      requestAnimationFrame(onComplete);
    });


    return () => tl.kill();
  }, [onComplete, onStartReveal]);

  return (
    <div className="preloader" ref={containerRef}>
      <div className="curtain curtain-left" />
      <div className="curtain curtain-right" />

      <h1 className="preloader-title" ref={titleRef}>
        Welcome to My Portfolio
      </h1>

      <div className="preloader-progress">
        loading… <span ref={progressRef}>0%</span>
      </div>
    </div>
  );
}
