import React from 'react';
import { Link } from 'react-router-dom';
import DecryptedText from '../components/DecryptedText';
import ScrambledText from '../components/ScrambledText';

export default function Project2(){
  return (
    <div className="page">
      <h1 className="h1"><DecryptedText text="Multi-Site Enterprise Routing" animateOn="view" /></h1>
      <div className="section">
        <h3>Title</h3>
        <div className="meta">Multi-Branch Enterprise Network Using OSPF and BGP Redistribution</div>

        <h3 style={{marginTop:12}}>Summary</h3>
        <ScrambledText>
          I built a large-scale network connecting Headquarters and multiple branches using OSPF for internal routing and BGP for inter-site connectivity. I configured route redistribution, redundancy, and failover mechanisms to ensure high availability.
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
