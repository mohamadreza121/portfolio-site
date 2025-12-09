'use client';

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa";
import Home from "./Home";
import About from "./About";
import Projects from "./Projects";
import Certifications from "./Certifications";
import Footer from "../components/footer";
import Navbar from "../components/Navbar";
import '../components/TargetCursor.css'

export default function Main() {
  const location = useLocation();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [active, setActive] = useState("Home"); // ⬅️ lifted state

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActive("Home"); // ⬅️ reset active to Home
  };

  return (
    <div className="main-page"> 
      <header className="navbar"> 
        <nav className="pill"> 
          <Navbar active={active} setActive={setActive} /> 
        </nav> 
      </header>

      <main className="site-content">
        <Home setActive={setActive} />
        <About />
        <Projects />
        <Certifications />
      </main>

      <Footer />

      {showScrollTop && (
        <button className="scroll-top-btn cursor-target" onClick={scrollToTop}>
          <FaArrowUp size={22} />
        </button>
      )}
    </div>
  );
}
