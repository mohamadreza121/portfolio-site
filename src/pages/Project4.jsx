import React from 'react';
import { Link } from 'react-router-dom';
import DecryptedText from '../components/DecryptedText';
import ScrambledText from '../components/ScrambledText';

export default function Project4(){
  return (
    <div className="page">
      <h1 className="h1"><DecryptedText text="Windows Server & Active Directory" animateOn="view" /></h1>
      <div className="section">
        <h3>Title</h3>
        <div className="meta">Windows Server Infrastructure with Active Directory & Group Policy</div>

        <h3 style={{marginTop:12}}>Summary</h3>
        <ScrambledText>
          I deployed a domain environment including Active Directory, DNS, DHCP, Group Policies, and file sharing permissions to manage enterprise users and devices.
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
