import React from 'react';
import { Link } from 'react-router-dom';
import DecryptedText from '../components/DecryptedText';
import ScrambledText from '../components/ScrambledText';

export default function Project1(){
  return (
    <div className="page">
      <h1 className="h1"><DecryptedText text="Secure Enterprise Office Network" animateOn="view" /></h1>
      <div className="section">
        <h3>Title</h3>
        <div className="meta">Secure Enterprise Office Network for a 3-Department Company</div>

        <h3 style={{marginTop:12}}>Summary</h3>
        <ScrambledText>
          I designed and implemented a complete business network for Administration, Sales, and Guest users using VLAN segmentation, inter-VLAN routing, DHCP, DNS, NAT, and ACLs. I also applied port security, Rapid-PVST, and switch hardening methods to protect the network from unauthorized access.
        </ScrambledText>

        <h4>Technologies & Tools</h4>
        <div className="meta">VLANs, Router-on-a-Stick, DHCP, DNS, NAT, ACLs, Port Security, RPVST — Tools: Cisco Packet Tracer / GNS3</div>

        <div style={{marginTop:12}}>
          <Link
            to="/"
            state={{ scrollTo: "projects" }}
            className="btn-pill cursor-target"
          >
            ← Back to Projects
          </Link>
        </div>
      </div>
    </div>
  );
}
