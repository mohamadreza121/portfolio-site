import React from 'react';
import { Link } from 'react-router-dom';
import DecryptedText from '../components/DecryptedText';
import ScrambledText from '../components/ScrambledText';

export default function Project3(){
  return (
    <div className="page">
      <h1 className="h1"><DecryptedText text="Network Security & VPN" animateOn="view" /></h1>
      <div className="section">
        <h3>Title</h3>
        <div className="meta">Secure Network Access Using Firewall and VPN Tunneling</div>

        <h3 style={{marginTop:12}}>Summary</h3>
        <ScrambledText>
          This project focuses on creating a protected network using firewall rules and VPN solutions. Remote access and site-to-site tunnels were implemented for secure external connectivity with full access monitoring.
        </ScrambledText>

        <div style={{marginTop:12}}>
          <Link to="/#projects" className="btn-pill cursor-target">← Back to Projects</Link>
        </div>
      </div>
    </div>
  );
}
