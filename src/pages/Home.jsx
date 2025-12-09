import React from "react";
import DecryptedText from "../components/DecryptedText";
import "./HomeModern.css";
import "../components/TargetCursor.css";


export default function Home({ setActive }) {
  return (
    <div id="home" className="home-page">
      {/* MAIN CONTAINER — matches About */}
      <div className="home-container">

        {/* HERO SECTION — same grid system as About */}
        <section className="home-hero">
          {/* LEFT SIDE — placeholder for alignment */}
          <div className="hero-left"></div>

          {/* RIGHT SIDE — text content */}
          <div className="hero-right">
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
                speed={60}
                revealDirection="start"
              />
            </h2>

            <div className="home-cta-row">
              <a
                href="#projects"
                className="btn-pill primary cursor-target"
                onClick={() => setActive("Projects")}
              >
                View My Projects
              </a>
              <a
                href="#certifications"
                className="btn-pill cursor-target"
                onClick={() => setActive("Certs")}
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
          </div>
        </section>

      </div>
    </div>
  );
}
