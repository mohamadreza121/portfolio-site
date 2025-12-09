import React from 'react';
import Router from './routes/Router';
import LetterGlitch from './components/LetterGlitch';
import TargetCursor from './components/TargetCursor';
import './index.css';


export default function App(){
  // App wraps Router; LetterGlitch is full-screen background; TargetCursor sits top
  return (
    <div className="app-root">
      <LetterGlitch
        glitchSpeed={50}
        centerVignette={false}
        outerVignette={true}
        smooth={true}
      />
      <TargetCursor spinDuration={2.2} hideDefaultCursor={true} parallaxOn={true} />
      <div className="site-content">
        <Router />
      </div>
    </div>
  );
}
