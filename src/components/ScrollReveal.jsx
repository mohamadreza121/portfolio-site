import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ScrollReveal.css";

// NOTE:
// We intentionally register ScrollTrigger lazily (inside the hook) so tests
// (jsdom) and SSR-like environments that lack `window.matchMedia` do not crash
// during module initialization.

// NOTE:
// Registering ScrollTrigger at module scope can blow up in non-browser
// environments (e.g., Vitest + JSDOM) when required window APIs (like
// `matchMedia`) are missing. We register lazily inside the effect instead.

export default function ScrollReveal({
  children,
  as: As = "div",
  className = "",

  // animation config
  y = 32,
  opacity = 0,
  scale = 1,
  rotate = 0,
  duration = 0.7,
  ease = "power2.out",

  // scroll config
  start = "top 85%",
  end = "bottom 15%",

  revealOnEnterBack = true,
}) {
  const wrapperRef = useRef(null);
  const animRef = useRef(null);

  useLayoutEffect(() => {
    // Lazily register ScrollTrigger to avoid test/SSR crashes.
    // (gsap handles redundant registrations gracefully.)
    if (typeof window !== "undefined") {
      try {
        gsap.registerPlugin(ScrollTrigger);
      } catch {
        // no-op
      }
    }

    const wrapper = wrapperRef.current;
    const animEl = animRef.current;
    if (!wrapper || !animEl) return;

    const ctx = gsap.context(() => {
      const animation = gsap.fromTo(
        animEl,
        { y, opacity, scale, rotate },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration,
          ease,
          paused: true,
          immediateRender: false, // ✅ CRITICAL
        }
      );

      const trigger = ScrollTrigger.create({
        trigger: wrapper,
        start,
        end,

        onEnter: () => animation.restart(),
        onEnterBack: () => revealOnEnterBack && animation.restart(),

        onLeave: () => animation.pause(0),
        onLeaveBack: () => animation.pause(0),
      });

      // ✅ SAFETY: reveal immediately if already in viewport
      if (trigger.isActive) {
        animation.progress(1);
      }
    }, wrapper);

    return () => ctx.revert();
  }, [y, opacity, scale, rotate, duration, ease, start, end, revealOnEnterBack]);


  return (
    <As ref={wrapperRef} className={`scroll-reveal ${className}`}>
      <div ref={animRef} className="scroll-reveal-inner">
        {children}
      </div>
    </As>
  );
}
