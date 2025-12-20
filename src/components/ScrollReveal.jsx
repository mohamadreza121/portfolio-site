import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ScrollReveal.css";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollReveal({
  children,
  as: Component = "div",
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
    <Component ref={wrapperRef} className={`scroll-reveal ${className}`}>
      <div ref={animRef} className="scroll-reveal-inner">
        {children}
      </div>
    </Component>
  );
}
