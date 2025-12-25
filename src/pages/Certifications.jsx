import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useMemo } from "react";

import DecryptedText from "../components/DecryptedText";
import ScrollReveal from "../components/ScrollReveal";
import LightboxPortal from "../components/LightboxPortal";
import Carousel from "../components/Carousel";

import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "./Certifications.css";

/* Thumbnails */
import enterpriseCoreThumb from "../assets/Cisco-Certified-Specialist-Enterprise-Core.png";
import ccnaThumb from "../assets/CCNA.png";
import hardwareThumb from "../assets/Computer-Hardware-Basics.png";
import endpointThumb from "../assets/Endpoint-Security.png";
import cybersecurityThumb from "../assets/Introduction-to-Cybersecurity.png";
import javaThumb from "../assets/JAVA.png";
import supportSecurityThumb from "../assets/Network-Support-and-Security.png";
import networkingBasicsThumb from "../assets/Networking-Basics.png";
import devicesConfigThumb from "../assets/Networking-Devices-and-Initial-Configuration.png";
import pythonThumb from "../assets/Python-Essentials-1.png";
import cssThumb from "../assets/CSS.png";
import htmlThumb from "../assets/HTML.png";

/* Certificates */
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

  useEffect(() => {
    document.body.style.overflow = lightboxPdf ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [lightboxPdf]);

  /* Convert certs to carousel items */
  const carouselItems = useMemo(
    () =>
      certs.map((cert, i) => ({
      id: `cert-${i}`,
      title: cert.title,
      caption: "Click to view certificate",
      mediaSrc: cert.thumb,
      badge: "Certificate",
      href: undefined,
      onClick: () => setLightboxPdf(cert.pdf)
    })),
    []
  );

  return (
    <div id="certifications" className="certifications-page">
      <span className="spy-marker" />

      <div className="certifications-container">
        {/* ===============================
            CENTERED HERO (MATCH PROJECTS)
        =============================== */}
        <section className="certifications-hero-center">
            <h1 className="certifications-title">
              <DecryptedText
                text="Professional Certifications"
                animateOn="view"
                sequential
                speed={80}
                encryptedClassName="encrypted"
                className="revealed"
              />
            </h1>

            <p className="certifications-subtitle">
              Industry-recognized credentials validating enterprise networking,
              security, and systems expertise.
            </p>

            <a
              href="https://www.credly.com/users/mohammadreza-heidarpoor"
              target="_blank"
              rel="noreferrer"
              className="btn-pill primary credly-btn cursor-target"
            >
              <FontAwesomeIcon icon={faLink} />
              <span>Verify on Credly</span>
            </a>
        </section>

        {/* ===============================
            CERTIFICATIONS CAROUSEL
        =============================== */}
          <section className="certifications-carousel">
            <Carousel
              items={carouselItems.map((item) => ({
                ...item,
                href: item.href,
                onClick: item.onClick
              }))}
              ariaLabel="Certifications carousel"
              className="cert-carousel-large"
            />
          </section>
      </div>

      {/* ===============================
          LIGHTBOX (UNCHANGED)
      =============================== */}
      {lightboxPdf && (
        <LightboxPortal>
          <div className="lightbox" onClick={() => setLightboxPdf(null)}>
            <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                <Viewer
                  fileUrl={lightboxPdf}
                  plugins={[defaultLayoutPluginInstance]}
                />
              </Worker>
            </div>
          </div>
        </LightboxPortal>
      )}
    </div>
  );
}
