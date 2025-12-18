import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ScrollReveal.css";

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollReveal
 * -------------
 * Section-level reveal animation
 * Configurable direction behavior
 */
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

  // behavior
  revealOnEnterBack = true,
}) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const animation = gsap.fromTo(
        el,
        { y, opacity, scale, rotate },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration,
          ease,
          paused: true,
        }
      );

      ScrollTrigger.create({
        trigger: el,
        start,
        end,

        onEnter: () => animation.restart(),

        onEnterBack: () => {
          if (revealOnEnterBack) {
            animation.restart();
          }
        },

        onLeave: () => animation.pause(0),
        onLeaveBack: () => animation.pause(0),
      });
    }, el);

    return () => ctx.revert();
  }, [
    y,
    opacity,
    scale,
    rotate,
    duration,
    ease,
    start,
    end,
    revealOnEnterBack,
  ]);

  return (
    <Component ref={ref} className={`scroll-reveal ${className}`}>
      {children}
    </Component>
  );
}
