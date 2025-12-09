import React, { useState } from 'react';
import DecryptedText from '../components/DecryptedText';
import { Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { Worker } from '@react-pdf-viewer/core';
import './certifications.css';;



// Thumbnails still in src/assets (imported normally)
import enterpriseCoreThumb from '../assets/Cisco-Certified-Specialist-Enterprise-Core.png';
import ccnaThumb from '../assets/CCNA.png';
import hardwareThumb from '../assets/Computer-Hardware-Basics.png';
import endpointThumb from '../assets/Endpoint-Security.png';
import cybersecurityThumb from '../assets/Introduction-to-Cybersecurity.png';
import javaThumb from '../assets/JAVA.png';
import supportSecurityThumb from '../assets/Network-Support-and-Security.png';
import networkingBasicsThumb from '../assets/Networking-Basics.png';
import devicesConfigThumb from '../assets/Networking-Devices-and-Initial-Configuration.png';
import pythonThumb from '../assets/Python-Essentials-1.png';
import cssThumb from '../assets/CSS.png';
import htmlThumb from '../assets/HTML.png';

// PDFs are now in public/assets → reference by URL
const certs = [
  { title: "Cisco Certified Specialist – Enterprise Core", thumb: enterpriseCoreThumb, pdf: "/assets/cert1.pdf" },
  { title: "CCNA – Routing & Switching", thumb: ccnaThumb, pdf: "/assets/cert2.pdf" },
  { title: "Computer Hardware Basics", thumb: hardwareThumb, pdf: "/assets/cert3.pdf" },
  { title: "Endpoint Security", thumb: endpointThumb, pdf: "/assets/cert4.pdf" },
  { title: "Introduction to Cybersecurity", thumb: cybersecurityThumb, pdf: "/assets/cert5.pdf" },
  { title: "Introduction to Java", thumb: javaThumb, pdf: "/assets/cert6.pdf" },
  { title: "Network Support & Security", thumb: supportSecurityThumb, pdf: "/assets/cert7.pdf" },
  { title: "Networking Basics", thumb: networkingBasicsThumb, pdf: "/assets/cert8.pdf" },
  { title: "Networking Devices and Initial Configuration", thumb: devicesConfigThumb, pdf: "/assets/cert9.pdf" },
  { title: "Python Essentials 1", thumb: pythonThumb, pdf: "/assets/cert10.pdf" },
  { title: "CSS", thumb: cssThumb, pdf: "/assets/cert11.pdf" },
  { title: "HTML", thumb: htmlThumb, pdf: "/assets/cert12.pdf" }
];


export default function Certifications() {
  const [lightboxPdf, setLightboxPdf] = useState(null);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const mainCerts = certs.slice(0, 10);
  const extraCerts = certs.slice(10);

  return (
    <div id="certifications" className="certifications-page">

      {/* MATCH WIDTH & ALIGNMENT WITH PROJECTS */}
      <div className="certifications-container">

        {/* HERO LAYOUT MATCHING PROJECTS */}
        <section className="certifications-hero">

          {/* LEFT SIDE */}
          <div className="certifications-left">
            <h1 className="certifications-title">
              <DecryptedText
                text="Certifications"
                animateOn="both"
                sequential={true}
                speed={80}
                revealDirection="start"
                encryptedClassName="encrypted"
                className="revealed"
              />
            </h1>

            <div className="credly-btn-wrapper">
              <a
                href="https://www.credly.com/users/mohammadreza-heidarpoor"
                target="_blank"
                rel="noreferrer"
                className="btn-pill credly-btn cursor-target"
              >
                <DecryptedText
                  text="🔗 Verify my certifications on Credly"
                  sequential={true}
                  animateOn="hover"
                  speed={80}
                  revealDirection="start"
                />
              </a>
            </div>

            {/* CSS & HTML BELOW BUTTON */}
            <div className="extra-cert-wrapper">
              {extraCerts.map((cert, idx) => (
                <div
                  key={idx}
                  className="cert-card"
                  onClick={() => setLightboxPdf(cert.pdf)}
                >
                  <img src={cert.thumb} alt={cert.title} className="cert-thumb cursor-target" />
                  <p className="cert-title">{cert.title}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="certifications-right">
            <div className="cert-grid">
              {mainCerts.map((cert, idx) => (
                <div
                  key={idx}
                  className="cert-card"
                  onClick={() => setLightboxPdf(cert.pdf)}
                >
                  <img src={cert.thumb} alt={cert.title} className="cert-thumb cursor-target" />
                  <p className="cert-title">{cert.title}</p>
                </div>
              ))}
            </div>
          </div>

        </section>

      </div>

      {lightboxPdf && (
        <div className="lightbox" onClick={() => setLightboxPdf(null)}>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
              <Viewer fileUrl={lightboxPdf} plugins={[defaultLayoutPluginInstance]} />
            </Worker>
          </div>
        </div>
      )}
    </div>
  );
}

