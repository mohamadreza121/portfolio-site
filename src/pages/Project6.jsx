import React from 'react';
import { Link } from 'react-router-dom';
import DecryptedText from '../components/DecryptedText';
import ScrambledText from '../components/ScrambledText';

export default function Project6(){
  return (
    <div className="page">
      <h1 className="h1"><DecryptedText text="Professional Rack & Cabling Plan" animateOn="view" /></h1>
      <div className="section">
        <h3>Title</h3>
        <div className="meta">Structured Rack Design & Professional Cable Management Plan</div>

        <h3 style={{marginTop:12}}>Summary</h3>
        <ScrambledText>
          I designed a complete server rack layout, applied TIA/EIA standards, created cable labeling systems, and documented the full infrastructure for efficient maintenance.
        </ScrambledText>

        <div style={{marginTop:12}}>
          <Link to="/#projects" className="btn-pill cursor-target">← Back to Projects</Link>
        </div>
      </div>
    </div>
  );
}
