import { useEffect } from "react";
import { Link } from "react-router-dom";
import DecryptedText from "../components/DecryptedText";
import Carousel from "../components/Carousel";
import "./Project6.css";

export default function Project6() {
useEffect(() => {
  // Ensure scroll reset AFTER layout + iframe mount
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
  });
}, []);


  const mediaItems = [
    {
      id: "p6-video-hero",
      type: "video",
      title: "Enterprise Ops Walkthrough (Monitoring + Logging + Hardening)",
      caption:
        "Operational readiness: centralized logs, alerting, NTP consistency, SNMP telemetry, and secure management plane controls.",
      href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      badge: "Hero Demo",
      mediaSrc: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    },
    {
      id: "p6-logging",
      type: "image",
      title: "Centralized Syslog + Severity Routing",
      caption:
        "Device logs to a central collector with severity filtering and event tagging for fast incident triage.",
      href: "https://www.youtube.com/watch?v=9bZkp7q19f0",
      badge: "Logging",
      mediaSrc: "https://i.ytimg.com/vi/9bZkp7q19f0/hqdefault.jpg",
    },
    {
      id: "p6-monitoring",
      type: "image",
      title: "SNMP Monitoring + Baselines",
      caption:
        "Interface health, CPU/memory baselines, and capacity thresholds with alerting for abnormal behavior.",
      href: "https://www.youtube.com/watch?v=kJQP7kiw5Fk",
      badge: "Monitoring",
      mediaSrc: "https://i.ytimg.com/vi/kJQP7kiw5Fk/hqdefault.jpg",
    },
    {
      id: "p6-ntp",
      type: "image",
      title: "NTP + Time Integrity",
      caption:
        "Consistent timestamps across routers/switches/firewalls and servers for reliable forensics and correlation.",
      href: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ",
      badge: "NTP",
      mediaSrc: "https://i.ytimg.com/vi/3JZ_D3ELwOQ/hqdefault.jpg",
    },
    {
      id: "p6-mgmt-plane",
      type: "image",
      title: "Management Plane Hardening",
      caption:
        "SSH-only, AAA, role-based access, management VLAN/VRF, and ACL-based device access control.",
      href: "https://www.youtube.com/watch?v=L_jWHffIx5E",
      badge: "Hardening",
      mediaSrc: "https://i.ytimg.com/vi/L_jWHffIx5E/hqdefault.jpg",
    },
    {
      id: "p6-backup",
      type: "image",
      title: "Config Backup + Change Control",
      caption:
        "Scheduled config exports and a change-log workflow to prevent drift and speed recovery.",
      href: "https://www.youtube.com/watch?v=e-ORhEE9VVg",
      badge: "Backups",
      mediaSrc: "https://i.ytimg.com/vi/e-ORhEE9VVg/hqdefault.jpg",
    },
  ];

  return (
    <div className="page project6-page">
      {/* ==================================================
         HERO — OPS WALKTHROUGH
      ================================================== */}
      <section className="project6-hero">
        <div className="project6-hero-frame">
          <div className="project6-hero-video">
            <iframe
              title="Project 6 Hero Video"
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
      <section className="project6-title-block">
        <h1 className="project6-title">
          <DecryptedText
            text="Enterprise Ops Capstone — Monitoring, Logging & Hardening"
            animateOn="view"
            sequential
            className="revealed"
            encryptedClassName="encrypted"
          />
        </h1>

        <div className="project6-subtitle">
          This capstone operationalizes the entire environment: centralized visibility,
          consistent time, secure management access, alerting, and repeatable recovery
          workflows that reflect real enterprise operations.
        </div>
      </section>

      {/* ==================================================
         EXECUTIVE SIGNALS
      ================================================== */}
      <section className="project6-signals">
        {[
          {
            label: "Visibility",
            title: "Centralized Logging",
            desc: "Aggregate syslog and security events for rapid triage and correlation.",
          },
          {
            label: "Telemetry",
            title: "Monitoring & Alerting",
            desc: "SNMP/metrics, baselines, and thresholds to detect drift and instability early.",
          },
          {
            label: "Control",
            title: "Management Hardening",
            desc: "Secure mgmt plane with AAA, SSH-only access, RBAC, and mgmt VLAN isolation.",
          },
        ].map((item, i) => (
          <div className="project6-signal-card" key={i}>
            <div className="signal-label">{item.label}</div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </section>

      {/* ==================================================
         OPS ARCHITECTURE DIAGRAM
      ================================================== */}
      <section className="project6-topology">
        <h2 className="section-title">Operations architecture</h2>

        <img
          src="/Topology-Ops.png"
          alt="Enterprise operations architecture: monitoring, syslog, management plane"
          className="project6-topology-image"
        />

        <div className="project6-cta cta-row">
          <a
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            target="_blank"
            rel="noreferrer"
            className="btn-pill cursor-target"
          >
            View ops configs, dashboards & hardening checklist →
          </a>
        </div>
      </section>

      {/* ==================================================
         IMPLEMENTATION — ENTERPRISE OPS
      ================================================== */}
      <section className="project6-architecture">
        <h2 className="section-title">Architecture & implementation</h2>

        <h3>Logging & event management</h3>
        <ul>
          <li>
            Centralize syslog from routers, switches, firewalls, and servers to a
            single collector for correlation and retention.
          </li>
          <li>
            Apply severity routing (informational vs warning vs critical) and tagging
            to reduce noise and accelerate triage.
          </li>
          <li>
            Standardize log format and timestamps for clean incident timelines.
          </li>
        </ul>

        <h3>Monitoring, alerting & baselines</h3>
        <ul>
          <li>
            Monitor interface state, errors, throughput, CPU, and memory; establish
            baselines and alert when thresholds are breached.
          </li>
          <li>
            Track “early warning” signals (CRC errors, drops, high CPU spikes) to
            catch failures before outages.
          </li>
          <li>
            Create an ops dashboard view aligned to the topology (edge → core → access → services).
          </li>
        </ul>

        <h3>Time integrity (NTP)</h3>
        <ul>
          <li>
            Configure NTP consistently across all infrastructure and servers to
            preserve forensic reliability.
          </li>
          <li>
            Prefer authenticated NTP where supported and ensure upstream reachability.
          </li>
          <li>
            Validate time sync health as a prerequisite for trustworthy logging.
          </li>
        </ul>

        <h3>Management plane hardening</h3>
        <ul>
          <li>
            SSH-only device access; disable legacy protocols (telnet/unused services).
          </li>
          <li>
            AAA design (local + centralized) and role separation for admin vs operator access.
          </li>
          <li>
            Isolate management traffic (mgmt VLAN / VRF) and restrict access via ACLs.
          </li>
        </ul>

        <h3>Backup & change control</h3>
        <ul>
          <li>
            Scheduled config backups and a consistent naming/versioning scheme to reduce drift.
          </li>
          <li>
            Lightweight change log workflow for traceability: what changed, why, and rollback plan.
          </li>
          <li>
            “Recovery readiness” validation: restore tests for configs and critical services.
          </li>
        </ul>
      </section>

      {/* ==================================================
         GALLERY
      ================================================== */}
      <section className="project6-gallery">
        <h2 className="section-title">Implementation gallery</h2>
        <div className="meta">
          Dashboards, syslog views, NTP verification, hardening outputs, and change-control
          snapshots that demonstrate operational maturity.
        </div>

        <Carousel items={mediaItems} ariaLabel="Project 6 Enterprise Ops gallery" />
      </section>

      {/* ==================================================
         NAVIGATION — SERIES EXIT
      ================================================== */}
      <section className="project6-nav">
        <div className="cta-row">
          <Link to="/projects/5" className="btn-pill primary cursor-target">
            ← Back to Project 5
          </Link>

          <Link to="/" state={{ scrollTo: "projects" }} className="btn-pill cursor-target">
            Return to Portfolio Overview →
          </Link>
        </div>
      </section>
    </div>
  );
}
