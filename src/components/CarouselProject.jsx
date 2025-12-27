/**
 * src/components/CarouselProject.jsx
 * --------------------------------------------------------------------
 * Purpose:
 *   Reusable UI component used across the portfolio template.
 *
 * Notes:
 *   - Native swipe scrolling is used for smoothness (no JS velocity hacks).
 *   - Swipe is enabled ONLY on mobile (<520px) via CSS.
 *   - Swipe is disabled when a lightbox is open (isLightboxOpen=true).
 */

import { useEffect, useMemo, useRef, useState } from "react";
import "./CarouselProject.css";

/* Clamp helper */
const clamp01 = (n) => Math.max(0, Math.min(1, n));

export default function CarouselProject({
  items = [],
  onOpen,
  ariaLabel = "Project media carousel",
  className = "",
  isLightboxOpen = false, // optional prop from page
}) {
  const viewportRef = useRef(null);
  const itemRefs = useRef([]);
  const rafRef = useRef(0);
  const isJumpingRef = useRef(false);

  const hasItems = items.length > 0;

  /* ---------------------------------------------------------
     Infinite buffer: [last, ...items, first]
     --------------------------------------------------------- */
  const extendedItems = useMemo(() => {
    if (!hasItems) return [];
    return [items[items.length - 1], ...items, items[0]];
  }, [items, hasItems]);

  const [activeIndex, setActiveIndex] = useState(1);

  /* ---------------------------------------------------------
     Sync refs
     --------------------------------------------------------- */
  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, extendedItems.length);
  }, [extendedItems.length]);

  /* ---------------------------------------------------------
     Initial centering
     --------------------------------------------------------- */
  useEffect(() => {
    const first = itemRefs.current[1];
    if (!first) return;

    requestAnimationFrame(() => {
      first.scrollIntoView({
        behavior: "instant",
        inline: "center",
        block: "nearest",
      });
    });
  }, [extendedItems.length]);

  /* ---------------------------------------------------------
     Focus measurement (RAF)
     --------------------------------------------------------- */
  const measureAndPaint = () => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const rect = viewport.getBoundingClientRect();
    const center = rect.left + rect.width / 2;
    const half = Math.max(1, rect.width / 2);

    let bestIdx = 0;
    let bestFocus = -1;

    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const c = r.left + r.width / 2;
      const focus = 1 - clamp01(Math.abs(c - center) / half);

      el.style.setProperty("--focus", focus.toFixed(3));

      if (focus > bestFocus) {
        bestFocus = focus;
        bestIdx = i;
      }
    });

    if (!isJumpingRef.current) {
      setActiveIndex(bestIdx);
    }
  };

  const schedulePaint = () => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(measureAndPaint);
  };

  /* ---------------------------------------------------------
     Scroll / resize listeners
     --------------------------------------------------------- */
  useEffect(() => {
    if (!hasItems) return;

    const viewport = viewportRef.current;
    if (!viewport) return;

    schedulePaint();

    viewport.addEventListener("scroll", schedulePaint, { passive: true });
    window.addEventListener("resize", schedulePaint);

    return () => {
      viewport.removeEventListener("scroll", schedulePaint);
      window.removeEventListener("resize", schedulePaint);
      cancelAnimationFrame(rafRef.current);
    };
  }, [hasItems]);

  /* ---------------------------------------------------------
     Infinite correction (snap-safe)
     --------------------------------------------------------- */
  useEffect(() => {
    if (!hasItems) return;

    const viewport = viewportRef.current;
    if (!viewport) return;

    if (activeIndex === 0 || activeIndex === items.length + 1) {
      isJumpingRef.current = true;
      viewport.style.scrollSnapType = "none";

      requestAnimationFrame(() => {
        const target =
          activeIndex === 0 ? itemRefs.current[items.length] : itemRefs.current[1];

        target?.scrollIntoView({
          behavior: "instant",
          inline: "center",
          block: "nearest",
        });

        requestAnimationFrame(() => {
          viewport.style.scrollSnapType = "";
          isJumpingRef.current = false;
          schedulePaint();
        });
      });
    }
  }, [activeIndex, items.length, hasItems]);

  /* ---------------------------------------------------------
     Navigation helpers
     --------------------------------------------------------- */
  const scrollToIndex = (idx) => {
    const el = itemRefs.current[idx];
    if (!el) return;

    // Smooth on desktop; instant on mobile prevents janky "double momentum"
    const isMobile = typeof window !== "undefined" && window.innerWidth < 520;

    el.scrollIntoView({
      behavior: isMobile ? "instant" : "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  const next = () => scrollToIndex(activeIndex + 1);
  const prev = () => scrollToIndex(activeIndex - 1);

  if (!hasItems) return null;

  const realActive =
    activeIndex === 0
      ? items.length - 1
      : activeIndex === items.length + 1
      ? 0
      : activeIndex - 1;

  return (
    <div className={`carousel-project ${className}`} aria-label={ariaLabel}>
      <button
        className="carousel-project__nav left"
        onClick={prev}
        aria-label="Previous"
      >
        ‹
      </button>

      <div
        ref={viewportRef}
        className={`carousel-project__viewport ${isLightboxOpen ? "is-locked" : ""}`}
        aria-hidden={isLightboxOpen ? "true" : "false"}
      >
        <div className="carousel-project__track">
          {extendedItems.map((item, idx) => (
            <article
              key={`${item.id}-${idx}`}
              className="carousel-project__card"
              ref={(el) => (itemRefs.current[idx] = el)}
            >
              <button
                type="button"
                className="carousel-project__link cursor-target"
                onClick={() => onOpen?.(item)}
              >
                <div className="carousel-project__media">
                  <img src={item.mediaSrc} alt={item.title} />
                </div>

                <div className="carousel-project__body">
                  <h4>{item.title}</h4>
                  <p>{item.caption}</p>
                  <span className="cta">View →</span>
                </div>
              </button>
            </article>
          ))}
        </div>
      </div>

      <button
        className="carousel-project__nav right"
        onClick={next}
        aria-label="Next"
      >
        ›
      </button>

      <div className="carousel-project__dots">
        {items.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === realActive ? "active" : ""}`}
            onClick={() => scrollToIndex(i + 1)}
          />
        ))}
      </div>
    </div>
  );
}
