/**
 * src/components/CarouselProject.jsx
 * --------------------------------------------------------------------
 * Purpose:
 *   Reusable UI component used across the portfolio template.
 *
 * Template customization:
 *   - Replace placeholder text values (e.g., [Your Name], [Your Professional Title])
 *     with your own content.
 *   - Do not change component logic unless you are extending the template.
 *
 * Notes:
 *   Swipe gestures are enabled ONLY on mobile (<520px) and
 *   automatically disabled when a lightbox is open.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import "./CarouselProject.css";

/* Clamp helper */
const clamp01 = (n) => Math.max(0, Math.min(1, n));

/* Swipe helpers */
const SWIPE_THRESHOLD = 40;
const isMobileViewport = () => window.innerWidth < 520;

// ============================
// COMPONENT
// ============================
export default function CarouselProject({
  items = [],
  onOpen,
  ariaLabel = "Project media carousel",
  className = "",
  isLightboxOpen = false, // ✅ NEW (safe optional prop)
}) {
  const viewportRef = useRef(null);
  const itemRefs = useRef([]);
  const rafRef = useRef(0);
  const isJumpingRef = useRef(false);

  /* Swipe refs */
  const touchStartX = useRef(0);
  const touchCurrentX = useRef(0);
  const isSwiping = useRef(false);

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
     Focus measurement
     --------------------------------------------------------- */
  const measureAndPaint = () => {
    if (isSwiping.current) return;
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
          activeIndex === 0
            ? itemRefs.current[items.length]
            : itemRefs.current[1];

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

    el.scrollIntoView({
      behavior: window.innerWidth < 520 ? "instant" : "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  const next = () => scrollToIndex(activeIndex + 1);
  const prev = () => scrollToIndex(activeIndex - 1);

  /* ---------------------------------------------------------
     Swipe handlers (mobile only, lightbox-aware)
     --------------------------------------------------------- */
  const handlePointerDown = (e) => {
    if (
      e.pointerType !== "touch" ||
      !isMobileViewport() ||
      isLightboxOpen
    ) {
      return;
    }

    isSwiping.current = true;
    cancelAnimationFrame(rafRef.current);
    touchStartX.current = e.clientX;
    touchCurrentX.current = e.clientX;
  };

  const handlePointerMove = (e) => {
    if (!isSwiping.current) return;
    touchCurrentX.current = e.clientX;
  };

  const handlePointerUp = () => {
    if (!isSwiping.current) return;

    const deltaX = touchCurrentX.current - touchStartX.current;

    if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
      deltaX < 0 ? next() : prev();
    }

    isSwiping.current = false;
    schedulePaint();
  };

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
        className="carousel-project__viewport"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
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
