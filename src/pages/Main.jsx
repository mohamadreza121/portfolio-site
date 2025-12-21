'use client';

import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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

  // ✅ Force "Home" when you're at the very top (fixes About staying active)
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

  // ⬇️ Scroll to section if navigated with state
  useEffect(() => {
    if (location.state?.scrollTo && location.pathname === "/") {
      const targetElement = document.getElementById(location.state.scrollTo);
      if (targetElement) {
        requestAnimationFrame(() => {
          targetElement.scrollIntoView({ behavior: "smooth" });
        });
      }
      navigate(".", { replace: true, state: null });
    }
  }, [location, navigate]);

  // ⬇️ Track active section
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
        if (window.scrollY <= 1) {
          setActive(prev => (prev === "Home" ? prev : "Home"));
          return;
        }

        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const section = sections.find(
            s => entry.target.parentElement.id === s.id
          );
          if (section) {
            setActive(prev => (prev !== section.name ? section.name : prev));
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
