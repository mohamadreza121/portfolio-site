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
            <h1 className="home-title">
              <ScrollReveal>
              <DecryptedText
                text="Mohammadreza Heidarpoor"
                animateOn="both"
                sequential={true}
                speed={150}
                revealDirection="start"
                encryptedClassName="encrypted"
                className="revealed"
              />
              </ScrollReveal>
            </h1>

            <h2 className="home-subtitle">
              <ScrollReveal>
              <DecryptedText
                text="Aspiring Network Engineer & Network Technician"
                animateOn="both"
                sequential={true}
                speed={80}
                revealDirection="start"
              />
              </ScrollReveal>
            </h2>

            <div className="home-cta-row">
              <a
                href="#projects"
                className="btn-pill primary cursor-target"
              >
                <ScrollReveal>
                View My Projects
                </ScrollReveal>
              </a>
              <a
                href="#certifications"
                className="btn-pill cursor-target"
              >
                <ScrollReveal>
                Certifications
                </ScrollReveal>
              </a>
              <a
                href="mailto:mrheidarpoor7@gmail.com"
                className="btn-pill cursor-target"
              >
                <ScrollReveal>
                Contact Me
                </ScrollReveal>
              </a>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
