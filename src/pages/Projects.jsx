import { useNavigate } from "react-router-dom";
import DecryptedText from "../components/DecryptedText";
import "./Projects.css";

const projects = [
  {
    id: 1,
    title: "Enterprise Office Network",
    summary:
      "HQ + Branches with dual-ISP edge, segmented VLANs, secure routing, and Windows services.",
    tech: ["BGP", "OSPF", "FortiGate", "VLANs", "AD DS"],
    image: "/projects/p1-topology.png",
  },
  {
    id: 2,
    title: "Multi-Branch WAN Architecture",
    summary:
      "OSPF internal routing with BGP redistribution and resilient WAN design.",
    tech: ["OSPF", "BGP", "Redistribution"],
    image: "/projects/p2-wan.png",
  },
  {
    id: 3,
    title: "Firewall & VPN Security",
    summary:
      "Zone-based firewalling with site-to-site IPsec overlays and policy enforcement.",
    tech: ["FortiGate", "IPsec", "NAT"],
    image: "/projects/p3-firewall.png",
  },
  {
    id: 4,
    title: "Windows Server Infrastructure",
    summary:
      "Active Directory, DNS, DHCP, and Group Policy across enterprise sites.",
    tech: ["AD DS", "GPO", "DNS", "DHCP"],
    image: "/projects/p4-ad.png",
  },
  {
    id: 5,
    title: "Layer-2 Network Defense",
    summary:
      "Protection against rogue devices using DHCP Snooping and Dynamic ARP Inspection.",
    tech: ["DHCP Snooping", "DAI", "Port Security"],
    image: "/projects/p5-l2.png",
  },
  {
    id: 6,
    title: "Enterprise Operations & Hardening",
    summary:
      "Monitoring, logging, baselining, and operational hardening across the network.",
    tech: ["Syslog", "SNMP", "Hardening"],
    image: "/projects/p6-ops.png",
  },
];

export default function Projects() {
  const navigate = useNavigate();

  return (
    <section id="projects" className="projects-page">
      <span className="spy-marker" />

      <div className="projects-container">
        {/* ==============================
           HEADER
        ============================== */}
        <header className="projects-hero-center">
          <h1 className="projects-title-center">
            <DecryptedText
              text="Enterprise Network Architecture"
              animateOn="view"
              sequential
              speed={80}
              revealDirection="center"
              encryptedClassName="encrypted"
              className="revealed"
            />
          </h1>

          <p className="projects-subtitle">
            A progressive, real-world enterprise infrastructure — designed,
            secured, routed, and operated as a unified system.
          </p>
        </header>

        {/* ==============================
           GRID
        ============================== */}
        <div className="projects-grid">
          {projects.map((project) => (
            <article
              key={project.id}
              className="project-card"
              style={{ backgroundImage: `url(${project.image})` }}
            >
              <div className="project-overlay" />

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

                <button
                  className="btn-pill primary cursor-target"
                  onClick={() => navigate(`/projects/${project.id}`)}
                >
                  View Architecture →
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
