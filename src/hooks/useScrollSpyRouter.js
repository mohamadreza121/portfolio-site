import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/* =====================================================
   SHARED SCROLL-SPY + ROUTING HOOK (FINAL)
===================================================== */

export function useScrollSpyRouter(setActive) {
  const location = useLocation();
  const navigate = useNavigate();

  /* =====================================================
     INTERNAL REFS (NO RERENDERS)
  ===================================================== */
  const isProgrammaticScrollRef = useRef(false);
  const hasUserScrolledRef = useRef(false);
  const idleTimerRef = useRef(null);

  const sections = [
    { id: "home", name: "Home" },
    { id: "about", name: "About" },
    { id: "projects", name: "Projects" },
    { id: "certifications", name: "Certs" },
    { id: "services", name: "Services" },
  ];

  /* =====================================================
     UTILITIES
  ===================================================== */

  const setHashQuietly = (hash) => {
    if ((window.location.hash || "") === hash) return;
    window.history.replaceState(window.history.state, "", hash);
  };

  const setActiveById = (id) => {
    const match = sections.find((s) => s.id === id);
    if (match) {
      setActive(match.name);
      setHashQuietly(`#${id}`);
    }
  };

  /* =====================================================
     PROGRAMMATIC SCROLL LOCK
     (prevents observer fighting smooth scroll)
  ===================================================== */
  const lockDuringSmoothScroll = () => {
    isProgrammaticScrollRef.current = true;

    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

    const unlockWhenIdle = () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

      idleTimerRef.current = setTimeout(() => {
        isProgrammaticScrollRef.current = false;
        window.removeEventListener("scroll", unlockWhenIdle);
      }, 180); // scroll idle window
    };

    unlockWhenIdle();
    window.addEventListener("scroll", unlockWhenIdle, { passive: true });
  };

  /* =====================================================
     ARM USER SCROLL (prevents initial noise)
  ===================================================== */
  useEffect(() => {
    const arm = () => {
      hasUserScrolledRef.current = true;
      window.removeEventListener("scroll", arm);
    };

    window.addEventListener("scroll", arm, { passive: true });
    return () => window.removeEventListener("scroll", arm);
  }, []);

  /* =====================================================
     HASH → SCROLL (direct / deep links)
  ===================================================== */
  useEffect(() => {
    if (location.pathname !== "/") return;
    if (!location.hash) return;

    const id = location.hash.replace("#", "");
    const el = document.getElementById(id);
    if (!el) return;

    lockDuringSmoothScroll();
    setActiveById(id);

    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  /* =====================================================
     ROUTER STATE → SCROLL (navigateAndScroll)
  ===================================================== */
  useEffect(() => {
    if (!location.state?.scrollTo) return;
    if (location.pathname !== "/") return;

    const id = location.state.scrollTo;
    const el = document.getElementById(id);
    if (!el) {
      navigate(".", { replace: true, state: null });
      return;
    }

    lockDuringSmoothScroll();
    setActiveById(id);

    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    navigate(".", { replace: true, state: null });
  }, [location, navigate]);

  /* =====================================================
     INTERSECTION OBSERVER (SCROLL-SPY)
     🔑 OBSERVES .spy-marker (NOT whole sections)
  ===================================================== */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isProgrammaticScrollRef.current) return;
        if (!hasUserScrolledRef.current) return;

        // Force Home when at very top
        if (window.scrollY <= 2) {
          setActive("Home");
          setHashQuietly("#home");
          return;
        }

        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top) -
              Math.abs(b.boundingClientRect.top)
          )[0];

        if (!visible) return;

        const section = sections.find(
          (s) => s.id === visible.target.dataset.section
        );

        if (section) {
          setActive(section.name);
          setHashQuietly(`#${section.id}`);
        }
      },
      {
        root: null,
        threshold: 0,
        rootMargin: "-120px 0px -55% 0px",
      }
    );

    sections.forEach(({ id }) => {
      const marker = document.querySelector(
        `#${id} .spy-marker`
      );
      if (marker) {
        marker.dataset.section = id;
        observer.observe(marker);
      }
    });

    return () => observer.disconnect();
  }, [setActive]);

  /* =====================================================
     SCROLL-TO-TOP INTEGRATION
     (ensures Home becomes active)
  ===================================================== */
  useEffect(() => {
    const onScrollTopClick = () => {
      lockDuringSmoothScroll();
      setActive("Home");
      setHashQuietly("#home");
    };

    window.addEventListener("scrollToTop", onScrollTopClick);
    return () =>
      window.removeEventListener("scrollToTop", onScrollTopClick);
  }, []);

  return {
    isProgrammaticScroll: isProgrammaticScrollRef.current,
  };
}
