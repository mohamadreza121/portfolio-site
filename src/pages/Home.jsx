import React from "react";
import DecryptedText from "../components/DecryptedText";
import "./HomeModern.css";
import "../components/TargetCursor.css";
import ScrollReveal from "../components/ScrollReveal";


export default function Home() {
  return (
    <div id="home" className="home-page">
        <span className="spy-marker" />
      {/* MAIN CONTAINER — matches About */}
      <div className="home-container">

        {/* HERO SECTION — same grid system as About */}
        <section className="home-hero">
          {/* LEFT SIDE — placeholder for alignment */}
          <div className="hero-left"></div>

          {/* RIGHT SIDE — text content */}
          <div className="hero-right">
            <ScrollReveal>
            <h1 className="home-title">
              <DecryptedText
                text="Mohammadreza Heidarpoor"
                animateOn="both"
                sequential={true}
                speed={80}
                revealDirection="start"
                encryptedClassName="encrypted"
                className="revealed"
              />
            </h1>

            <h2 className="home-subtitle">
              <DecryptedText
                text="Aspiring Network Engineer & Network Technician"
                animateOn="both"
                sequential={true}
                speed={80}
                revealDirection="start"
              />
            </h2>

            <div className="home-cta-row">
              <a
                href="#projects"
                className="btn-pill primary cursor-target"
              >
                View My Projects
              </a>
              <a
                href="#certifications"
                className="btn-pill cursor-target"
              >
                Certifications
              </a>
              <a
                href="mailto:mrheidarpoor7@gmail.com"
                className="btn-pill cursor-target"
              >
                Contact Me
              </a>
            </div>
            </ScrollReveal>
          </div>
        </section>

      </div>
    </div>
  );
}
