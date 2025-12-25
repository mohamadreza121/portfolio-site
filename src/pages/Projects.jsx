import { Link } from "react-router-dom";
import DecryptedText from "../components/DecryptedText";
import ScrollReveal from "../components/ScrollReveal";
import "./Projects.css";

const projects = [
  {
    id: 1,
    title: "Enterprise Office Network",
    summary:
      "HQ + Branches with dual-ISP edge, segmented VLANs, secure routing, and Windows services.",
    tech: ["BGP", "OSPF", "FortiGate", "VLANs", "AD DS"],
    image: "/projects/p1-topology.png",
    featured: true
  },
  {
    id: 2,
    title: "Multi-Branch WAN Architecture",
    summary:
      "OSPF internal routing with BGP redistribution and resilient WAN design.",
    tech: ["OSPF", "BGP", "Redistribution"],
    image: "/projects/p2-wan.png"
  },
  {
    id: 3,
    title: "Firewall & VPN Security",
    summary:
      "Zone-based firewalling with site-to-site IPsec overlays and policy enforcement.",
    tech: ["FortiGate", "IPsec", "NAT"],
    image: "/projects/p3-firewall.png"
  },
  {
    id: 4,
    title: "Windows Server Infrastructure",
    summary:
      "Active Directory, DNS, DHCP, and Group Policy across enterprise sites.",
    tech: ["AD DS", "GPO", "DNS", "DHCP"],
    image: "/projects/p4-ad.png"
  },
  {
    id: 5,
    title: "Layer-2 Network Defense",
    summary:
      "Protection against rogue devices using DHCP Snooping and Dynamic ARP Inspection.",
    tech: ["DHCP Snooping", "DAI", "Port Security"],
    image: "/projects/p5-l2.png"
  },
  {
    id: 6,
    title: "Enterprise Operations & Hardening",
    summary:
      "Monitoring, logging, baselining, and operational hardening across the network.",
    tech: ["Syslog", "SNMP", "Hardening"],
    image: "/projects/p6-ops.png"
  }
];

export default function Projects() {
  return (
    <div id="projects" className="projects-page">
      <span className="spy-marker" />

      <div className="projects-container">
        {/* ==================================================
           HERO — CENTERED CHAPTER INTRO
        ================================================== */}
        <section className="projects-hero-center">
          <ScrollReveal>
            <h1 className="projects-title-center">
              <span className="decrypt-stable">
                <DecryptedText
                  text="Enterprise Network Architecture Portfolio"
                  animateOn="view"
                  sequential
                  speed={70}
                  encryptedClassName="encrypted"
                  className="revealed"
                />
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal>
            <p className="projects-subtitle">
              A progressive, real-world enterprise infrastructure — designed,
              secured, routed, and operated as a unified system.
            </p>
          </ScrollReveal>
        </section>

        {/* ==================================================
           PROJECT GALLERY — CINEMATIC CARDS
        ================================================== */}
        <section className="projects-gallery">
          {projects.map((project) => (
            <ScrollReveal key={project.id}>
              <article
                className={`project-cinematic-card ${
                  project.featured ? "featured" : ""
                }`}
                style={{
                  backgroundImage: `url(${project.image})`
                }}
              >
                {/* Overlay */}
                <div className="project-overlay" />

                {/* Content */}
                <div className="project-content">
                  <h2 className="project-title">{project.title}</h2>

                  <p className="project-summary">{project.summary}</p>

                  <div className="project-tech">
                    {project.tech.map((t, i) => (
                      <span key={i} className="tech-pill">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="project-cta">
                    <Link
                      to={`/projects/${project.id}`}
                      className="btn-pill primary cursor-target"
                    >
                      View Architecture →
                    </Link>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </section>
      </div>
    </div>
  );
}
