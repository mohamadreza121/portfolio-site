import { useEffect } from "react";
import { Link } from "react-router-dom";
import DecryptedText from "../components/DecryptedText";
import Carousel from "../components/Carousel";
import "./Project5.css";

export default function Project5() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const mediaItems = [
    {
      id: "p5-video-hero",
      type: "video",
      title: "Layer 2 Defense Walkthrough (DHCP Snooping + DAI)",
      caption:
        "Stop rogue DHCP servers, prevent ARP spoofing, and enforce trusted uplinks at the access layer.",
      href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      badge: "Hero Demo",
      mediaSrc: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    },
    {
      id: "p5-dhcp-snoop",
      type: "image",
      title: "DHCP Snooping Policy & Trusted Ports",
      caption:
        "Trusted uplinks, untrusted access ports, and binding table creation per VLAN.",
      href: "https://www.youtube.com/watch?v=9bZkp7q19f0",
      badge: "DHCP Snooping",
      mediaSrc: "https://i.ytimg.com/vi/9bZkp7q19f0/hqdefault.jpg",
    },
    {
      id: "p5-dai",
      type: "image",
      title: "Dynamic ARP Inspection Enforcement",
      caption:
        "ARP validation using DHCP snooping bindings to block spoofed ARP replies.",
      href: "https://www.youtube.com/watch?v=kJQP7kiw5Fk",
      badge: "DAI",
      mediaSrc: "https://i.ytimg.com/vi/kJQP7kiw5Fk/hqdefault.jpg",
    },
    {
      id: "p5-attack-demo",
      type: "image",
      title: "Attack Simulation: Rogue DHCP / ARP Spoof Attempt",
      caption:
        "Demonstrates how L2 defenses stop MITM and gateway impersonation at the edge.",
      href: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ",
      badge: "Threat Model",
      mediaSrc: "https://i.ytimg.com/vi/3JZ_D3ELwOQ/hqdefault.jpg",
    },
    {
      id: "p5-rate-limit",
      type: "image",
      title: "Rate Limiting & Violation Handling",
      caption:
        "DHCP rate limits, ARP inspection limits, and action handling for noisy ports.",
      href: "https://www.youtube.com/watch?v=L_jWHffIx5E",
      badge: "Hardening",
      mediaSrc: "https://i.ytimg.com/vi/L_jWHffIx5E/hqdefault.jpg",
    },
  ];

  return (
    <div className="page project5-page">
      {/* ==================================================
         HERO — L2 DEFENSE WALKTHROUGH
      ================================================== */}
      <section className="project5-hero">
        <div className="project5-hero-frame">
          <div className="project5-hero-video">
            <iframe
              title="Project 5 Hero Video"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* ==================================================
         TITLE & CONTEXT
      ================================================== */}
      <section className="project5-title-block">
        <h1 className="project5-title">
          <DecryptedText
            text="Layer 2 Defense — DHCP Snooping & Dynamic ARP Inspection"
            animateOn="view"
            sequential
            className="revealed"
            encryptedClassName="encrypted"
          />
        </h1>

        <div className="project5-subtitle">
          Access-layer security controls that prevent rogue addressing, ARP spoofing,
          and man-in-the-middle attacks by enforcing trusted uplinks and validating
          L2 identity.
        </div>
      </section>

      {/* ==================================================
         EXECUTIVE SIGNALS
      ================================================== */}
      <section className="project5-signals">
        {[
          {
            label: "Threat",
            title: "Rogue DHCP + MITM",
            desc: "Stops unauthorized DHCP servers from poisoning clients.",
          },
          {
            label: "Control",
            title: "DHCP Snooping Bindings",
            desc: "Builds trusted IP–MAC bindings per VLAN as a verification source.",
          },
          {
            label: "Enforcement",
            title: "DAI Validation",
            desc: "Drops spoofed ARP packets that do not match the binding database.",
          },
        ].map((item, i) => (
          <div className="project5-signal-card" key={i}>
            <div className="signal-label">{item.label}</div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </section>

      {/* ==================================================
         DIAGRAM / POLICY PIVOT
      ================================================== */}
      <section className="project5-topology">
        <h2 className="section-title">Policy layout & trust boundaries</h2>

        <img
          src="/Topology-L2Defense.png"
          alt="DHCP Snooping and DAI policy layout"
          className="project5-topology-image"
        />

        <div className="project5-cta cta-row">
          <a
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            target="_blank"
            rel="noreferrer"
            className="btn-pill cursor-target"
          >
            View switch configs & validation output →
          </a>
        </div>
      </section>

      {/* ==================================================
         ARCHITECTURE & IMPLEMENTATION
      ================================================== */}
      <section className="project5-architecture">
        <h2 className="section-title">Architecture & implementation</h2>

        <h3>DHCP Snooping fundamentals</h3>
        <ul>
          <li>
            Enable DHCP Snooping on relevant VLANs; mark uplinks as <strong>trusted</strong>.
          </li>
          <li>
            Keep user/access ports <strong>untrusted</strong> to block rogue DHCP offers.
          </li>
          <li>
            Verify DHCP option handling and maintain the <strong>binding table</strong>.
          </li>
        </ul>

        <h3>DAI enforcement strategy</h3>
        <ul>
          <li>
            Enable Dynamic ARP Inspection on the same VLANs protected by DHCP Snooping.
          </li>
          <li>
            Validate ARP packets against the DHCP Snooping binding database.
          </li>
          <li>
            Use inspection limits and appropriate violation actions for noisy ports.
          </li>
        </ul>

        <h3>Operational hardening</h3>
        <ul>
          <li>
            Apply DHCP and ARP rate limits to reduce broadcast abuse and scanning impact.
          </li>
          <li>
            Ensure trunk ports are explicitly trusted and VLAN lists are tight.
          </li>
          <li>
            Pair with Port Security and STP protections for a complete access-layer posture.
          </li>
        </ul>
      </section>

      {/* ==================================================
         GALLERY
      ================================================== */}
      <section className="project5-gallery">
        <h2 className="section-title">Implementation gallery</h2>
        <div className="meta">
          Screenshots and short clips showing rogue DHCP blocking, ARP validation,
          binding table verification, and enforcement under attack simulation.
        </div>

        <Carousel items={mediaItems} ariaLabel="Project 5 L2 Defense gallery" />
      </section>

      {/* ==================================================
         NAVIGATION
      ================================================== */}
      <section className="project5-nav">
        <div className="cta-row">
          <Link to="/projects/4" className="btn-pill primary cursor-target">
            ← Back to Project 4
          </Link>

          <Link to="/projects/6" className="btn-pill cursor-target">
            Continue to Project 6 →
          </Link>
        </div>
      </section>
    </div>
  );
}
