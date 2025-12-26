import React, { useEffect, useMemo, useRef, useState } from "react";
import "./Carousel.css";

function clamp01(n) {
  return Math.max(0, Math.min(1, n));
}

export default function Carousel({
  // Default to an empty list. The carousel's caller should provide items.
  // This avoids relying on undefined placeholder variables (e.g., htmlThumb).
  items = [],
  ariaLabel = "Media carousel",
  className = "",
}) {
  const viewportRef = useRef(null);
  const itemRefs = useRef([]);
  const rafRef = useRef(0);
  const isJumpingRef = useRef(false);

  const hasItems = items.length > 0;

  /* ------------------------------------------------------------------
     Infinite list: [last, ...items, first]
     ------------------------------------------------------------------ */
  const extendedItems = useMemo(() => {
    if (!hasItems) return [];
    return [items[items.length - 1], ...items, items[0]];
  }, [items, hasItems]);

  const [activeIndex, setActiveIndex] = useState(1);

  /* ------------------------------------------------------------------
     Sync refs
     ------------------------------------------------------------------ */
  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, extendedItems.length);
  }, [extendedItems.length]);

  /* ------------------------------------------------------------------
     Initial scroll
     ------------------------------------------------------------------ */
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

  /* ------------------------------------------------------------------
     Measure focus
     ------------------------------------------------------------------ */
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

  /* ------------------------------------------------------------------
     Scroll listeners
     ------------------------------------------------------------------ */
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

  /* ------------------------------------------------------------------
     HARD infinite correction (mobile-safe)
     ------------------------------------------------------------------ */
  useEffect(() => {
    if (!hasItems) return;

    const viewport = viewportRef.current;
    if (!viewport) return;

    if (activeIndex === 0 || activeIndex === items.length + 1) {
      isJumpingRef.current = true;

      // Disable snap temporarily
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

        // Restore snap
        requestAnimationFrame(() => {
          viewport.style.scrollSnapType = "";
          isJumpingRef.current = false;
          schedulePaint();
        });
      });
    }
  }, [activeIndex, items.length, hasItems]);

  /* ------------------------------------------------------------------
     Navigation
     ------------------------------------------------------------------ */
  const scrollToIndex = (idx) => {
    const el = itemRefs.current[idx];
    if (!el) return;

    el.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  const next = () => scrollToIndex(activeIndex + 1);
  const prev = () => scrollToIndex(activeIndex - 1);

  /* ------------------------------------------------------------------
     Render
     ------------------------------------------------------------------ */
  if (!hasItems) return null;

  const rendered = extendedItems.map((item, idx) => (
    <article
      key={`${item.id}-${idx}`}
      className="carousel-card"
      ref={(el) => (itemRefs.current[idx] = el)}
    >
      <button
        type="button"
        className="carousel-card__link cursor-target"
        onClick={(e) => {
          e.preventDefault();
          item.onClick?.();
        }}
      >
        <div className="carousel-card__media">
          <img src={item.mediaSrc} alt={item.mediaAlt || item.title} />
        </div>

        <div className="carousel-card__body">
          <h4 className="carousel-card__title">{item.title}</h4>
          <p className="carousel-card__caption">{item.caption}</p>
          <div className="carousel-card__cta">View →</div>
        </div>
      </button>
    </article>
  ));

  const realActive =
    activeIndex === 0
      ? items.length - 1
      : activeIndex === items.length + 1
      ? 0
      : activeIndex - 1;

  return (
    <div className={`carousel ${className}`} aria-label={ariaLabel}>
      <button className="carousel__nav left" onClick={prev} aria-label="Previous">
        ‹
      </button>

      <div ref={viewportRef} className="carousel__viewport">
        <div className="carousel__track">{rendered}</div>
      </div>

      <button className="carousel__nav right" onClick={next} aria-label="Next">
        ›
      </button>

      <div className="carousel__dots">
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
