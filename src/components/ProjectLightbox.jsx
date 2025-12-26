import { useEffect } from "react";
import LightboxPortal from "./LightboxPortal";
import "./ProjectLightbox.css";

export default function ProjectLightbox({
  item,
  onClose,
  onPrev,
  onNext,
}) {
  /* --------------------------------------------------
     Keyboard navigation
  -------------------------------------------------- */
  useEffect(() => {
    if (!item) return;

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev?.();
      if (e.key === "ArrowRight") onNext?.();
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  if (!item) return null;

  /* --------------------------------------------------
     Render
  -------------------------------------------------- */
  return (
    <LightboxPortal>
      <div className="project-lightbox" onClick={onClose}>
        <div
          className="project-lightbox__content"
          onClick={(e) => e.stopPropagation()}
        >
          {/* MEDIA */}
          <div className="project-lightbox__media">
            {item.type === "video" ? (
              <iframe
                src={item.href?.replace("watch?v=", "embed/")}
                title={item.title}
                allowFullScreen
              />
            ) : (
              <img src={item.mediaSrc} alt={item.title} />
            )}
          </div>

          {/* META */}
          <div className="project-lightbox__meta">
            <h3>{item.title}</h3>
            <p>{item.caption}</p>
          </div>

          {/* NAV */}
          {onPrev && (
            <button
              className="project-lightbox__nav left"
              onClick={onPrev}
              aria-label="Previous"
            >
              ‹
            </button>
          )}

          {onNext && (
            <button
              className="project-lightbox__nav right"
              onClick={onNext}
              aria-label="Next"
            >
              ›
            </button>
          )}

          {/* CLOSE */}
          <button
            className="project-lightbox__close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>
      </div>
    </LightboxPortal>
  );
}
