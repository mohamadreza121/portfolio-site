import React from "react";
import { Link } from "react-router-dom";
import DecryptedText from "../components/DecryptedText";
import Carousel from "../components/Carousel";

export default function Project1() {
  // 1 hero video + 10 image cards (all using YouTube URLs to avoid broken assets)
  const mediaItems = [
    {
      id: "p1-video-hero",
      type: "video",
      title: "Project 1 – Master Topology Walkthrough",
      caption:
        "End-to-end tour: HQ edge, branch connectivity, routing planes, security zones, and Windows services.",
      href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      badge: "Hero Demo",
      mediaSrc: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
      mediaAlt: "Project 1 hero video thumbnail",
    },
    {
      id: "p1-img-topology",
      type: "image",
      title: "Enterprise Topology Diagram",
      caption:
        "Physical + logical view of HQ, two branches, dual ISP edges, and routed/security boundaries.",
      href: "https://www.youtube.com/watch?v=9bZkp7q19f0",
      badge: "Topology",
      mediaSrc: "https://i.ytimg.com/vi/9bZkp7q19f0/hqdefault.jpg",
      mediaAlt: "Topology diagram preview",
    },
    {
      id: "p1-img-hq-edge",
      type: "image",
      title: "HQ Perimeter – FortiGate Zones & NAT",
      caption:
        "HQ_INSIDE / DMZ / INTERNET zoning with explicit policies, NAT, and logging.",
      href: "https://www.youtube.com/watch?v=kJQP7kiw5Fk",
      badge: "Security",
      mediaSrc: "https://i.ytimg.com/vi/kJQP7kiw5Fk/hqdefault.jpg",
      mediaAlt: "HQ perimeter preview",
    },
    {
      id: "p1-img-bgp",
      type: "image",
      title: "WAN Edge – eBGP Dual-Homing",
      caption:
        "Dual upstream peering with route policy to prefer ISP1 while retaining ISP2 as failover.",
      href: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ",
      badge: "BGP",
      mediaSrc: "https://i.ytimg.com/vi/3JZ_D3ELwOQ/hqdefault.jpg",
      mediaAlt: "BGP peering preview",
    },
    {
      id: "p1-img-ospf",
      type: "image",
      title: "IGP – OSPF Areas & Summarization",
      caption:
        "Area 0 at HQ with branch areas and controlled redistribution boundaries.",
      href: "https://www.youtube.com/watch?v=L_jWHffIx5E",
      badge: "OSPF",
      mediaSrc: "https://i.ytimg.com/vi/L_jWHffIx5E/hqdefault.jpg",
      mediaAlt: "OSPF design preview",
    },
    {
      id: "p1-img-vlans",
      type: "image",
      title: "HQ VLAN Segmentation – HR / IT / Finance / Mgmt / Servers",
      caption:
        "Department segmentation with inter-VLAN policy control and consistent naming/numbering.",
      href: "https://www.youtube.com/watch?v=e-ORhEE9VVg",
      badge: "VLANs",
      mediaSrc: "https://i.ytimg.com/vi/e-ORhEE9VVg/hqdefault.jpg",
      mediaAlt: "VLAN design preview",
    },
    {
      id: "p1-img-switch-security",
      type: "image",
      title: "Access Layer Hardening – DHCP Snooping / DAI / Port Security",
      caption:
        "Rogue device mitigation with trusted uplinks, inspection, and per-port controls.",
      href: "https://www.youtube.com/watch?v=fRh_vgS2dFE",
      badge: "L2 Security",
      mediaSrc: "https://i.ytimg.com/vi/fRh_vgS2dFE/hqdefault.jpg",
      mediaAlt: "Switch security preview",
    },
    {
      id: "p1-img-ipsec",
      type: "image",
      title: "Site-to-Site IPsec Overlay",
      caption:
        "IPsec tunnels from branches to HQ with routing over the overlay for service reachability.",
      href: "https://www.youtube.com/watch?v=hT_nvWreIhg",
      badge: "VPN",
      mediaSrc: "https://i.ytimg.com/vi/hT_nvWreIhg/hqdefault.jpg",
      mediaAlt: "IPsec preview",
    },
    {
      id: "p1-img-windows",
      type: "image",
      title: "SRV-DC1 – AD DS / DNS / DHCP / GPO",
      caption:
        "Centralized identity + naming + addressing with policy enforcement across sites.",
      href: "https://www.youtube.com/watch?v=YQHsXMglC9A",
      badge: "Windows",
      mediaSrc: "https://i.ytimg.com/vi/YQHsXMglC9A/hqdefault.jpg",
      mediaAlt: "Windows services preview",
    },
    {
      id: "p1-img-branch1",
      type: "image",
      title: "Branch 1 – WAN Edge & Policy",
      caption:
        "Branch edge firewall policy + local VLANs with end-to-end access to HQ services.",
      href: "https://www.youtube.com/watch?v=OPf0YbXqDm0",
      badge: "Branch 1",
      mediaSrc: "https://i.ytimg.com/vi/OPf0YbXqDm0/hqdefault.jpg",
      mediaAlt: "Branch 1 preview",
    },
    {
      id: "p1-img-branch2",
      type: "image",
      title: "Branch 2 – Standardized Build",
      caption:
        "Mirrored branch design for operational consistency and repeatable deployment.",
      href: "https://www.youtube.com/watch?v=JGwWNGJdvx8",
      badge: "Branch 2",
      mediaSrc: "https://i.ytimg.com/vi/JGwWNGJdvx8/hqdefault.jpg",
      mediaAlt: "Branch 2 preview",
    },
  ];

  return (
    <div
      id="project-1"
      className="page"
      style={{ scrollMarginTop: "170px", paddingTop: "170px" }}
    >
      {/* HERO HEADER */}
      <header className="hero" style={{ marginTop: 0 }}>
        <div>
          <h1 className="h1">
            <DecryptedText
              text="Secure Enterprise Office Network – HQ & Branches"
              animateOn="view"
            />
          </h1>

          <div className="h2" style={{ marginTop: "10px" }}>
            Production-style multi-site design: dual-homed HQ edge, secured branches,
            OSPF/BGP routing planes, and integrated Windows Server services.
          </div>

          <div className="cta-row home-cta-row" style={{ marginTop: "18px" }}>
            <Link
              to="/"
              state={{ scrollTo: "projects" }}
              className="btn-pill primary cursor-target"
            >
              ← Back to Projects
            </Link>

            <a
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              target="_blank"
              rel="noreferrer"
              className="btn-pill cursor-target"
            >
              View full configs & GNS3 files →
            </a>
          </div>
        </div>
      </header>

      {/* HERO VIDEO */}
      <section className="section" style={{ marginTop: "24px" }}>
        <h2 className="section-title" style={{ marginBottom: "12px" }}>
          Hero demo
        </h2>

        <div
          style={{
            borderRadius: "14px",
            border: "1px solid var(--accent-border)",
            overflow: "hidden",
            background: "var(--card-bg)",
            boxShadow: "0 10px 30px var(--card-shadow)",
          }}
        >
          <div
            style={{
              position: "relative",
              paddingTop: "56.25%", // 16:9
            }}
          >
            <iframe
              title="Project 1 Hero Video"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                border: "0",
              }}
            />
          </div>

          <div style={{ padding: "14px 16px" }}>
            <div className="meta">
              A short, recruiter-friendly walkthrough of the full network series
              foundation (Project 1). Replace this embed with your real demo later.
            </div>
          </div>
        </div>
      </section>

      {/* EXECUTIVE SUMMARY */}
      <section className="section" style={{ marginTop: "28px" }}>
        <h2 className="section-title">Project overview</h2>
        <div className="meta" style={{ marginTop: "8px" }}>
          Secure enterprise network for a 3-site organization (HQ + Branch 1 + Branch
          2) interconnected through an ISP domain, with segmented VLANs, secure
          routing, firewall policy enforcement, and Windows identity services.
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "12px",
            marginTop: "16px",
          }}
        >
          <div
            style={{
              background: "var(--card-bg)",
              border: "1px solid var(--accent-border)",
              borderRadius: "14px",
              padding: "14px",
              boxShadow: "0 10px 26px var(--card-shadow)",
            }}
          >
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.8rem", color: "var(--muted)" }}>
              Routing planes
            </div>
            <div style={{ fontWeight: 800, marginTop: "6px" }}>eBGP + OSPF</div>
            <div className="meta" style={{ marginTop: "6px" }}>
              Dual-homed WAN edge with internal IGP segmentation.
            </div>
          </div>

          <div
            style={{
              background: "var(--card-bg)",
              border: "1px solid var(--accent-border)",
              borderRadius: "14px",
              padding: "14px",
              boxShadow: "0 10px 26px var(--card-shadow)",
            }}
          >
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.8rem", color: "var(--muted)" }}>
              Security
            </div>
            <div style={{ fontWeight: 800, marginTop: "6px" }}>FortiGate + IPsec</div>
            <div className="meta" style={{ marginTop: "6px" }}>
              Perimeter zoning, NAT, and site-to-site encrypted overlay.
            </div>
          </div>

          <div
            style={{
              background: "var(--card-bg)",
              border: "1px solid var(--accent-border)",
              borderRadius: "14px",
              padding: "14px",
              boxShadow: "0 10px 26px var(--card-shadow)",
            }}
          >
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.8rem", color: "var(--muted)" }}>
              Services
            </div>
            <div style={{ fontWeight: 800, marginTop: "6px" }}>AD DS + DNS + DHCP</div>
            <div className="meta" style={{ marginTop: "6px" }}>
              Centralized identity, naming, addressing, and policy enforcement.
            </div>
          </div>
        </div>
      </section>

      {/* TOPOLOGY IMAGE */}
      <section className="section" style={{ marginTop: "28px" }}>
        <h2 className="section-title">Topology diagram</h2>

        <div style={{ marginTop: "12px" }}>
          <img
            src="https://placehold.co/1600x900/png?text=Topology+Diagram+Placeholder"
            alt="Enterprise Network Topology Diagram"
            style={{
              maxWidth: "100%",
              height: "auto",
              borderRadius: "14px",
              border: "1px solid var(--accent-border)",
              boxShadow: "0 0 18px var(--accent-glow)",
            }}
          />
          <div className="meta" style={{ marginTop: "10px", textAlign: "center" }}>
            Replace this placeholder with your exported topology (e.g., /Topology.png)
            once ready.
          </div>
        </div>
      </section>

      {/* ARCHITECTURE */}
      <section className="section" style={{ marginTop: "28px" }}>
        <h2 className="section-title">Architecture & implementation</h2>

        <h3 style={{ marginTop: "12px" }}>Devices & roles</h3>
        <ul style={{ paddingLeft: "18px", fontSize: "0.95rem", lineHeight: 1.6 }}>
          <li>
            <strong>ISP domain:</strong> ISP core + provider-edge routers offering WAN
            transit for HQ and branches.
          </li>
          <li>
            <strong>HQ:</strong> dual-homed edge (eBGP), FortiGate security edge, core
            routing/switching with VLAN gateways, access switches.
          </li>
          <li>
            <strong>Branches:</strong> standardized WAN edge + FortiGate + access
            switching, connected to HQ via IPsec.
          </li>
          <li>
            <strong>Services:</strong> Windows Server (SRV-DC1) running AD DS, DNS,
            DHCP, and GPO.
          </li>
        </ul>

        <h3 style={{ marginTop: "16px" }}>Routing & resiliency</h3>
        <ul style={{ paddingLeft: "18px", fontSize: "0.95rem", lineHeight: 1.6 }}>
          <li>
            <strong>eBGP</strong> at HQ for dual-ISP connectivity with policy-driven
            primary/backup behavior.
          </li>
          <li>
            <strong>OSPF</strong> internally (HQ Area 0, branch areas) with controlled
            redistribution and clear domain boundaries.
          </li>
          <li>
            <strong>Consistency:</strong> mirrored branch patterns to demonstrate
            repeatable enterprise deployments.
          </li>
        </ul>

        <h3 style={{ marginTop: "16px" }}>Security & segmentation</h3>
        <ul style={{ paddingLeft: "18px", fontSize: "0.95rem", lineHeight: 1.6 }}>
          <li>
            <strong>FortiGate zones/policies</strong> controlling inter-VLAN and
            north-south traffic, plus NAT and logging.
          </li>
          <li>
            <strong>Switch hardening:</strong> DHCP Snooping, DAI, Port Security, and
            secure trunking best practices.
          </li>
          <li>
            <strong>IPsec overlay:</strong> encrypted site-to-site tunnels with routing
            over the overlay for seamless service reachability.
          </li>
        </ul>
      </section>

      {/* MEDIA GALLERY */}
      <section className="section" style={{ marginTop: "28px" }}>
        <h2 className="section-title">Media gallery</h2>
        <div className="meta" style={{ marginTop: "8px" }}>
          This carousel is built to be reusable across Project pages: it supports
          thumbnails, captions, and center-focus motion. Replace each YouTube link
          and thumbnail with your real content later.
        </div>

        <Carousel items={mediaItems} ariaLabel="Project 1 media gallery" />
      </section>

      {/* NAV */}
      <section className="section" style={{ marginTop: "28px", marginBottom: "28px" }}>
        <h2 className="section-title">Navigation</h2>
        <div className="meta" style={{ marginTop: "8px" }}>
          Continue through the enterprise series or return to the portfolio overview.
        </div>

        <div className="cta-row" style={{ marginTop: "14px" }}>
          <Link
            to="/"
            state={{ scrollTo: "projects" }}
            className="btn-pill primary cursor-target"
          >
            ← Back to Projects
          </Link>

          <Link to="/projects/2" className="btn-pill cursor-target">
            Continue to Project 2 →
          </Link>
        </div>
      </section>
    </div>
  );
}
