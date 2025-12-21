import React, { useEffect } from "react";
import gsap from "gsap";
import DecryptedText from "../components/DecryptedText";
import "./HomeModern.css";
import "../components/TargetCursor.css";

export default function Home({ revealKey }) {
  useEffect(() => {
    if (!revealKey) return;

    gsap.killTweensOf(".hero-enter");

    gsap.fromTo(
      ".hero-enter",
      { opacity: 0, y: 40, filter: "blur(12px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.0,
        ease: "power3.out",
        delay: 0, // IMPORTANT: no delay now, curtain controls timing
      }
    );
  }, [revealKey]);


  return (
    <div id="home" className="home-page">
      <span className="spy-marker" />

      <div className="home-container">
        <section className="home-hero">

          <div className="hero-left"></div>

          <div className="hero-right hero-enter">
            <h1 className="home-title">
              <DecryptedText
                text="Mohammadreza Heidarpoor"
                animateOn="both"
                sequential
                speed={150}
                revealDirection="center"
                encryptedClassName="encrypted"
                className="revealed"
                revealDelay={420}
                revealKey={revealKey}
              />
            </h1>

            <h2 className="home-subtitle">
              <DecryptedText
                text="Aspiring Network Engineer & Network Technician"
                animateOn="both"
                sequential
                speed={80}
                revealDirection="center"
                revealDelay={620}
                revealKey={revealKey}
              />
            </h2>

            <div className="home-cta-row">
              <a href="#projects" className="btn-pill primary cursor-target">
                View My Projects
              </a>

              <a href="#certifications" className="btn-pill cursor-target">
                Certifications
              </a>

              <a href="mailto:mrheidarpoor7@gmail.com" className="btn-pill cursor-target">
                Contact Me
              </a>
            </div>
          </div>

        </section>
      </div>
    </div>
  );
}
