'use client';

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa";
import Home from "./Home";
import About from "./About";
import Projects from "./Projects";
import Certifications from "./Certifications";
import Footer from "../components/footer";
import Navbar from "../components/Navbar";
import "../components/TargetCursor.css";

export default function Main({ theme, toggleTheme, active, setActive }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [showScrollTop, setShowScrollTop] = useState(false);

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

  // ⬇️ Show scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ⬇️ Track active section with IntersectionObserver
  useEffect(() => {
    const sections = [
      { id: "home", name: "Home" },
      { id: "about", name: "About" },
      { id: "projects", name: "Projects" },
      { id: "certifications", name: "Certs" },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        if (window.scrollY <= 1) {
          setActive((prev) => (prev === "Home" ? prev : "Home"));
          return;
        }

        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const section = sections.find(
            (s) => entry.target.parentElement.id === s.id
          );
          if (!section) return;
          setActive((prev) => (prev !== section.name ? section.name : prev));
        });
      },
      {
        root: null,
        rootMargin: "-72px 0px -80% 0px",
        threshold: 0,
      }
    );

    sections.forEach(({ id }) => {
      const marker = document.querySelector(`#${id} .spy-marker`);
      if (marker) observer.observe(marker);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="main-page">
      <header className="navbar">
        <nav className="pill">
          <Navbar
            active={active}
            onSetActive={setActive}
            theme={theme}
            onToggleTheme={toggleTheme}
          />
        </nav>
      </header>

      <main className="site-content">
        <Home />
        <About />
        <Projects />
        <Certifications />
      </main>

      <Footer active={active} setActive={setActive} />

      {showScrollTop && (
        <button className="scroll-top-btn cursor-target" onClick={scrollToTop}>
          <FaArrowUp size={22} />
        </button>
      )}
    </div>
  );
}
