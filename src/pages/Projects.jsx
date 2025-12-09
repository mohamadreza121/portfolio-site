import React from 'react';
import { Link } from 'react-router-dom';
import DecryptedText from '../components/DecryptedText';
import './Projects.css';


const projects = [
  { id: 1, title: "Secure Enterprise Office Network for a 3-Department Company", meta: "VLANs, Router-on-a-Stick, DHCP, DNS, NAT, ACLs, Port Security, RPVST" },
  { id: 2, title: "Multi-Branch Enterprise Network Using OSPF and BGP Redistribution", meta: "OSPF, BGP, Redistribution, Redundancy, WAN Design" },
  { id: 3, title: "Secure Network Access Using Firewall and VPN Tunneling", meta: "Firewall Policies, VPN, Encryption, Access Control" },
  { id: 4, title: "Windows Server Infrastructure with Active Directory & Group Policy", meta: "Active Directory, GPO, DNS, DHCP, NTFS" },
  { id: 5, title: "Protection Against Rogue Devices Using DHCP Snooping & DAI", meta: "DAI, DHCP Snooping, Port Security" },
  { id: 6, title: "Structured Rack Design & Professional Cable Management Plan", meta: "Structured Cabling, Rack Design, TIA/EIA Standards" }
];

export default function Projects(){
  return (
    <div id="projects" className="projects-page">

      {/* MATCHES ABOUT WIDTH */}
      <div className="projects-container">

        {/* HERO — matches About layout */}
        <section className="projects-hero">

          {/* LEFT */}
          <div className="projects-left">
            <h1 className="projects-title">
              <DecryptedText 
                text="My Networking & IT Projects"
                sequential={true}
                animateOn="both"
                speed={80}
                revealDirection="start"
                encryptedClassName="encrypted"
                className="revealed"
              />
            </h1>

            <p className="projects-intro">
              <DecryptedText 
                text="Hands-on projects designed to simulate real-world environments and demonstrate my ability to perform the responsibilities of a Network Engineer or Network Technician."
                sequential={true}
                animateOn="hover"
                speed={2}
                revealDirection="start"
              />
            </p>
          </div>

          {/* RIGHT */}
          <div className="projects-right">
            <div className="project-list">
              {projects.map(p => (
                <div className="project-card" key={p.id}>
                  <h3>{p.title}</h3>
                  <div className="meta">{p.meta}</div>
                  <div style={{ marginTop: 12 }}>
                    <Link to={`/projects/${p.id}`} className="btn-pill cursor-target">
                      View Project
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </section>
      </div>

    </div>
  );
}
