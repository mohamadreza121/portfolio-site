import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import "./Carousel.css";

const clamp01 = (n) => Math.max(0, Math.min(1, n));

export default function Carousel({
  items = [],
  ariaLabel = "Media carousel",
  className = "",
}) {
  const viewportRef = useRef(null);
  const itemRefs = useRef([]);
  const rafRef = useRef(0);
  const scrollEndTimeout = useRef(null);
  const isJumpingRef = useRef(false);

  const hasItems = items.length > 0;

  /* --------------------------------------------------
     Mobile detection
     -------------------------------------------------- */
  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 520;

  /* --------------------------------------------------
     Items source
     - Desktop: infinite buffer
     - Mobile: native list ONLY
     -------------------------------------------------- */
  const extendedItems = useMemo(() => {
    if (!hasItems) return [];
    if (isMobile) return items;
    return [items[items.length - 1], ...items, items[0]];
  }, [items, hasItems, isMobile]);

  const [activeIndex, setActiveIndex] = useState(isMobile ? 0 : 1);

  /* --------------------------------------------------
     Sync refs
     -------------------------------------------------- */
  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, extendedItems.length);
  }, [extendedItems.length]);

  /* --------------------------------------------------
     Initial centering (desktop only)
     -------------------------------------------------- */
  useEffect(() => {
    if (isMobile) return;

    const first = itemRefs.current[1];
    if (!first) return;

    requestAnimationFrame(() => {
      if (typeof first.scrollIntoView === "function") {
        first.scrollIntoView({
          behavior: "instant",
          inline: "center",
          block: "nearest",
        });
      }
    });
  }, [extendedItems.length, isMobile]);

  /* --------------------------------------------------
     Focus measurement
     -------------------------------------------------- */
  const measureAndPaint = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const rect = viewport.getBoundingClientRect();
    const center = rect.left + rect.width / 2;

    let bestIdx = 0;
    let bestMetric = isMobile ? Infinity : -1;

    itemRefs.current.forEach((el, i) => {
      if (!el) return;

      const r = el.getBoundingClientRect();
      const c = r.left + r.width / 2;
      const dist = Math.abs(c - center);

      if (isMobile) {
        if (dist < bestMetric) {
          bestMetric = dist;
          bestIdx = i;
        }
      } else {
        const half = Math.max(1, rect.width / 2);
        const focus = 1 - clamp01(dist / half);
        el.style.setProperty("--focus", focus.toFixed(3));
        if (focus > bestMetric) {
          bestMetric = focus;
          bestIdx = i;
        }
      }
    });

    if (!isJumpingRef.current) setActiveIndex(bestIdx);
  }, [isMobile]);

  const schedulePaint = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(measureAndPaint);
  }, [measureAndPaint]);

  /* --------------------------------------------------
     Momentum-safe scroll listener
     -------------------------------------------------- */
  useEffect(() => {
    if (!hasItems) return;

    const viewport = viewportRef.current;
    if (!viewport) return;

    schedulePaint();

    const onScroll = () => {
      clearTimeout(scrollEndTimeout.current);
      scrollEndTimeout.current = setTimeout(() => {
        schedulePaint();
      }, 120); // ⬅️ momentum-safe delay
    };

    viewport.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", schedulePaint);

    return () => {
      viewport.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", schedulePaint);
      clearTimeout(scrollEndTimeout.current);
      cancelAnimationFrame(rafRef.current);
    };
  }, [hasItems, schedulePaint]);

  /* --------------------------------------------------
     Infinite correction (DESKTOP ONLY)
     -------------------------------------------------- */
  useEffect(() => {
    if (!hasItems) return;
    if (isMobile) return;

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
  }, [activeIndex, items.length, hasItems, schedulePaint, isMobile]);

  /* --------------------------------------------------
     Navigation
     -------------------------------------------------- */
  const scrollToIndex = (idx) => {
    const el = itemRefs.current[idx];
    if (!el) return;

    el.scrollIntoView({
      behavior: isMobile ? "instant" : "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  const next = () => scrollToIndex(activeIndex + 1);
  const prev = () => scrollToIndex(activeIndex - 1);

  if (!hasItems) return null;

  const realActive = isMobile
    ? activeIndex
    : activeIndex === 0
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
        <div className="carousel__track">
          {extendedItems.map((item, idx) => (
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
          ))}
        </div>
      </div>

      <button className="carousel__nav right" onClick={next} aria-label="Next">
        ›
      </button>

      <div className="carousel__dots">
        {items.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === realActive ? "active" : ""}`}
            onClick={() => scrollToIndex(isMobile ? i : i + 1)}
          />
        ))}
      </div>
    </div>
  );
}
