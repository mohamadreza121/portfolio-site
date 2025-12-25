import { useEffect } from "react";
import { Link } from "react-router-dom";
import DecryptedText from "../components/DecryptedText";
import Carousel from "../components/Carousel";
import "./Project4.css";

export default function Project4() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const mediaItems = [
    {
      id: "p4-video-hero",
      type: "video",
      title: "Active Directory Infrastructure Walkthrough",
      caption:
        "Domain design, organizational units, group policies, and service integration.",
      href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      badge: "Hero Demo",
      mediaSrc: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    },
    {
      id: "p4-ad-structure",
      type: "image",
      title: "Active Directory Domain Structure",
      caption:
        "OU hierarchy aligned with departments and security boundaries.",
      href: "https://www.youtube.com/watch?v=9bZkp7q19f0",
      badge: "AD DS",
      mediaSrc: "https://i.ytimg.com/vi/9bZkp7q19f0/hqdefault.jpg",
    },
    {
      id: "p4-gpo",
      type: "image",
      title: "Group Policy Enforcement",
      caption:
        "Centralized configuration, security baselines, and user restrictions.",
      href: "https://www.youtube.com/watch?v=kJQP7kiw5Fk",
      badge: "GPO",
      mediaSrc: "https://i.ytimg.com/vi/kJQP7kiw5Fk/hqdefault.jpg",
    },
    {
      id: "p4-dns-dhcp",
      type: "image",
      title: "DNS & DHCP Integration",
      caption:
        "Name resolution and address assignment integrated with AD.",
      href: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ",
      badge: "Core Services",
      mediaSrc: "https://i.ytimg.com/vi/3JZ_D3ELwOQ/hqdefault.jpg",
    },
    {
      id: "p4-auth",
      type: "image",
      title: "Authentication & Authorization Flow",
      caption:
        "User logon, Kerberos authentication, and policy application sequence.",
      href: "https://www.youtube.com/watch?v=L_jWHffIx5E",
      badge: "Identity",
      mediaSrc: "https://i.ytimg.com/vi/L_jWHffIx5E/hqdefault.jpg",
    },
  ];

  return (
    <div className="page project4-page">
      {/* ==================================================
         HERO — WINDOWS SERVER WALKTHROUGH
      ================================================== */}
      <section className="project4-hero">
        <div className="project4-hero-frame">
          <div className="project4-hero-video">
            <iframe
              title="Project 4 Hero Video"
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
      <section className="project4-title-block">
        <h1 className="project4-title">
          <DecryptedText
            text="Windows Server & Active Directory Infrastructure"
            animateOn="view"
            sequential
            className="revealed"
            encryptedClassName="encrypted"
          />
        </h1>

        <div className="project4-subtitle">
          Centralized identity, authentication, policy enforcement, and core
          network services forming the backbone of the enterprise environment.
        </div>
      </section>

      {/* ==================================================
         EXECUTIVE SIGNALS
      ================================================== */}
      <section className="project4-signals">
        {[
          {
            label: "Identity",
            title: "Active Directory DS",
            desc: "Centralized user, group, and computer management.",
          },
          {
            label: "Policy",
            title: "Group Policy Objects",
            desc: "Consistent security baselines and configuration control.",
          },
          {
            label: "Services",
            title: "DNS & DHCP",
            desc: "Integrated naming and addressing services.",
          },
        ].map((item, i) => (
          <div className="project4-signal-card" key={i}>
            <div className="signal-label">{item.label}</div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </section>

      {/* ==================================================
         LOGICAL ARCHITECTURE
      ================================================== */}
      <section className="project4-topology">
        <h2 className="section-title">Logical architecture</h2>

        <img
          src="/Topology-AD.png"
          alt="Active Directory Logical Architecture"
          className="project4-topology-image"
        />

        <div className="project4-cta cta-row">
          <a
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            target="_blank"
            rel="noreferrer"
            className="btn-pill cursor-target"
          >
            View AD structure & GPO configuration →
          </a>
        </div>
      </section>

      {/* ==================================================
         ARCHITECTURE DEEP DIVE
      ================================================== */}
      <section className="project4-architecture">
        <h2 className="section-title">Architecture & implementation</h2>

        <h3>Active Directory design</h3>
        <ul>
          <li>Single forest, single domain architecture.</li>
          <li>OU hierarchy mapped to departments and roles.</li>
          <li>Role-based access control via security groups.</li>
        </ul>

        <h3>Group Policy strategy</h3>
        <ul>
          <li>Baseline security policies for users and computers.</li>
          <li>Password, lockout, and audit enforcement.</li>
          <li>Administrative template and restriction policies.</li>
        </ul>

        <h3>Core services</h3>
        <ul>
          <li>DNS integrated with AD for dynamic updates.</li>
          <li>DHCP scopes aligned with VLAN segmentation.</li>
          <li>Service resiliency through centralized management.</li>
        </ul>
      </section>

      {/* ==================================================
         MEDIA GALLERY
      ================================================== */}
      <section className="project4-gallery">
        <h2 className="section-title">Implementation gallery</h2>
        <div className="meta">
          Visual breakdown of domain structure, policies, authentication flow,
          and integrated Windows services.
        </div>

        <Carousel items={mediaItems} ariaLabel="Project 4 AD gallery" />
      </section>

      {/* ==================================================
         NAVIGATION
      ================================================== */}
      <section className="project4-nav">
        <div className="cta-row">
          <Link
            to="/projects/3"
            className="btn-pill primary cursor-target"
          >
            ← Back to Project 3
          </Link>

          <Link
            to="/projects/5"
            className="btn-pill cursor-target"
          >
            Continue to Project 5 →
          </Link>
        </div>
      </section>
    </div>
  );
}
