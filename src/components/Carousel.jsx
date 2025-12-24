import React, { useEffect, useMemo, useRef, useState } from "react";
import "./Carousel.css";

function clamp01(n) {
  return Math.max(0, Math.min(1, n));
}

export default function Carousel({
  items = [],
  ariaLabel = "Media carousel",
  className = "",
}) {
  const viewportRef = useRef(null);
  const itemRefs = useRef([]);
  const rafRef = useRef(0);

  const hasItems = items.length > 0;

  /* ------------------------------------------------------------------
     Create infinite list: [last, ...items, first]
     ------------------------------------------------------------------ */
  const extendedItems = useMemo(() => {
    if (!hasItems) return [];
    return [
      items[items.length - 1],
      ...items,
      items[0],
    ];
  }, [items, hasItems]);

  const [activeIndex, setActiveIndex] = useState(1); // real index (inside extended)

  /* ------------------------------------------------------------------
     Sync refs
     ------------------------------------------------------------------ */
  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, extendedItems.length);
  }, [extendedItems.length]);

  /* ------------------------------------------------------------------
     Initial scroll to first real item
     ------------------------------------------------------------------ */
  useEffect(() => {
    const viewport = viewportRef.current;
    const firstReal = itemRefs.current[1];
    if (!viewport || !firstReal) return;

    requestAnimationFrame(() => {
      firstReal.scrollIntoView({ behavior: "instant", inline: "center" });
    });
  }, [extendedItems.length]);

  /* ------------------------------------------------------------------
     Measure focus + active index
     ------------------------------------------------------------------ */
  const measureAndPaint = () => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const vRect = viewport.getBoundingClientRect();
    const vCenter = vRect.left + vRect.width / 2;
    const half = Math.max(1, vRect.width / 2);

    let bestIdx = 0;
    let bestFocus = -1;

    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const c = r.left + r.width / 2;
      const focus = 1 - clamp01(Math.abs(c - vCenter) / half);

      el.style.setProperty("--focus", focus.toFixed(3));

      if (focus > bestFocus) {
        bestFocus = focus;
        bestIdx = i;
      }
    });

    setActiveIndex(bestIdx);
  };

  const schedulePaint = () => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(measureAndPaint);
  };

  /* ------------------------------------------------------------------
     Scroll + resize listeners
     ------------------------------------------------------------------ */
  useEffect(() => {
    if (!hasItems) return;

    const viewport = viewportRef.current;
    schedulePaint();

    viewport.addEventListener("scroll", schedulePaint, { passive: true });
    window.addEventListener("resize", schedulePaint);

    const ro = new ResizeObserver(schedulePaint);
    ro.observe(viewport);

    return () => {
      viewport.removeEventListener("scroll", schedulePaint);
      window.removeEventListener("resize", schedulePaint);
      ro.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [hasItems]);

  /* ------------------------------------------------------------------
     Infinite jump correction (when landing on clones)
     ------------------------------------------------------------------ */
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    // Jump from clones → real items
    if (activeIndex === 0) {
      // Jump to last real item
      itemRefs.current[items.length]?.scrollIntoView({
        behavior: "instant",
        inline: "center",
      });
    } else if (activeIndex === items.length + 1) {
      // Jump to first real item
      itemRefs.current[1]?.scrollIntoView({
        behavior: "instant",
        inline: "center",
      });
    }
  }, [activeIndex, items.length]);

  /* ------------------------------------------------------------------
     Navigation helpers
     ------------------------------------------------------------------ */
  const scrollToIndex = (idx) => {
    const el = itemRefs.current[idx];
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", inline: "center" });
  };

  const next = () => scrollToIndex(activeIndex + 1);
  const prev = () => scrollToIndex(activeIndex - 1);

  /* ------------------------------------------------------------------
     Render cards
     ------------------------------------------------------------------ */
  const rendered = extendedItems.map((item, idx) => (
    <article
      key={`${item.id}-${idx}`}
      className="carousel-card"
      ref={(el) => (itemRefs.current[idx] = el)}
    >
      <a
        className="carousel-card__link cursor-target"
        href={item.href}
        target="_blank"
        rel="noreferrer"
      >
        <div className="carousel-card__media">
          <img src={item.mediaSrc} alt={item.mediaAlt || item.title} />
          {item.type === "video" && (
            <div className="carousel-card__play">
              <span />
            </div>
          )}
          <div className="carousel-card__badge">
            <span className="dot" />
            <span>{item.badge || (item.type === "video" ? "Demo" : "Snapshot")}</span>
          </div>
        </div>

        <div className="carousel-card__body">
          <h4 className="carousel-card__title">{item.title}</h4>
          <p className="carousel-card__caption">{item.caption}</p>
          <div className="carousel-card__cta">View →</div>
        </div>
      </a>
    </article>
  ));

  if (!hasItems) return null;

  /* ------------------------------------------------------------------
     Dots: map real items only
     ------------------------------------------------------------------ */
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
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
