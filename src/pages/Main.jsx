'use client';

import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Home from "./Home";
import About from "./About";
import Projects from "./Projects";
import Certifications from "./Certifications";
import Services from "./Services";
import Footer from "../components/footer";
import "../components/TargetCursor.css";

export default function Main({ active, setActive, revealKey }) {
  const location = useLocation();
  const navigate = useNavigate();

  /* =====================================================
     SCROLL-SPY ARMING (FREEZE UNTIL FIRST USER SCROLL)
     ===================================================== */
  const hasUserScrolledRef = useRef(false);

  useEffect(() => {
    const armOnScroll = () => {
      hasUserScrolledRef.current = true;
      window.removeEventListener("scroll", armOnScroll);
    };

    window.addEventListener("scroll", armOnScroll, { passive: true });

    return () => window.removeEventListener("scroll", armOnScroll);
  }, []);

  /* =====================================================
     FORCE "HOME" ACTIVE AT VERY TOP
     ===================================================== */
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY <= 2) {
        setActive("Home");
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // run once on mount

    return () => window.removeEventListener("scroll", onScroll);
  }, [setActive]);

  /* =====================================================
     SCROLL TO SECTION WHEN RETURNING FROM PROJECTS
     ===================================================== */
  useEffect(() => {
    if (location.state?.scrollTo && location.pathname === "/") {
      const targetElement = document.getElementById(location.state.scrollTo);
      if (targetElement) {
        requestAnimationFrame(() => {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        });
      }

      navigate(".", { replace: true, state: null });
    }
  }, [location, navigate]);

  /* =====================================================
     ACTIVE SECTION TRACKING (INTERSECTION OBSERVER)
     ===================================================== */
  useEffect(() => {
    const sections = [
      { id: "home", name: "Home" },
      { id: "about", name: "About" },
      { id: "projects", name: "Projects" },
      { id: "certifications", name: "Certs" },
      { id: "services", name: "Services" },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        /* ⛔ HARD GUARDS */
        if (document.documentElement.dataset.phase !== "ready") return;
        if (!hasUserScrolledRef.current) return;

        if (window.scrollY <= 1) {
          setActive("Home");
          return;
        }

        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const section = sections.find(
            (s) => entry.target.parentElement.id === s.id
          );

          if (section) {
            setActive(section.name);
          }
        });
      },
      {
        rootMargin: "-72px 0px -80% 0px",
        threshold: 0,
      }
    );

    sections.forEach(({ id }) => {
      const marker = document.querySelector(`#${id} .spy-marker`);
      if (marker) observer.observe(marker);
    });

    return () => observer.disconnect();
  }, [setActive]);

  /* =====================================================
     🔥 GSAP / SCROLLTRIGGER RE-ARM (ONCE)
     ===================================================== */
  useEffect(() => {
    requestAnimationFrame(() => {
      ScrollTrigger.refresh(true);
    });
  }, []);

  /* =====================================================
     RENDER
     ===================================================== */
  return (
    <div className="main-page">
      <main className="site-content">
        <Home revealKey={revealKey} />
        <About />
        <Projects />
        <Certifications />
        <Services />
      </main>

      <Footer active={active} setActive={setActive} />
    </div>
  );
}
