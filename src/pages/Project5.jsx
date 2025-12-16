import React from 'react';
import { Link } from 'react-router-dom';
import DecryptedText from '../components/DecryptedText';
import ScrambledText from '../components/ScrambledText';

export default function Project5(){
  return (
    <div className="page">
      <h1 className="h1"><DecryptedText text="DHCP Snooping & DAI" animateOn="view" /></h1>
      <div className="section">
        <h3>Title</h3>
        <div className="meta">Protection Against Rogue Devices Using DHCP Snooping & DAI</div>

        <h3 style={{marginTop:12}}>Summary</h3>
        <ScrambledText>
          I protected the network as a Layer 2 security engineer by configuring DHCP Snooping and Dynamic ARP Inspection to prevent ARP spoofing and rogue DHCP servers.
        </ScrambledText>

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
