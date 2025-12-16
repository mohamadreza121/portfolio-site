import React from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaLinkedin } from "react-icons/fa";
import "./footer.css";
import "./TargetCursor.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Contact Info */}
        <div className="footer-section">
          <h3 className="footer-title">Contact</h3>
          <p>
            <FaMapMarkerAlt size={14} color="#61dca3" style={{ marginRight: "8px" }} />
            Toronto, Ontario, Canada
          </p>
          <p>
            <FaPhone size={14} color="#61dca3" style={{ marginRight: "8px" }} />
            +1 (647) 802-3224
          </p>
          <p>
            <FaEnvelope size={14} color="#61dca3" style={{ marginRight: "8px" }} />
            <a href="mailto:mrheidarpoor7@gmail.com" className="footer-link cursor-target">
              mrheidarpoor7@gmail.com
            </a>
          </p>
          <p>
            <FaLinkedin size={14} color="#61dca3" style={{ marginRight: "8px" }} />
            <a
              href="https://linkedin.com/in/mohammadreza-heidarpoor"
              target="_blank"
              rel="noreferrer"
              className="footer-link cursor-target"
            >
              LinkedIn
            </a>
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li>
                <button
                  type="button"
                  className="footer-link cursor-target"
                  onClick={() => {
                    document.querySelector("#home")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Home
                </button>
              </li>

              <li>
                <button
                  type="button"
                  className="footer-link cursor-target"
                  onClick={() => {
                    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  About
                </button>
              </li>

              <li>
                <button
                  type="button"
                  className="footer-link cursor-target"
                  onClick={() => {
                    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Projects
                </button>
              </li>

              <li>
                <button
                  type="button"
                  className="footer-link cursor-target"
                  onClick={() => {
                    document.querySelector("#certifications")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Certifications
                </button>
              </li>
            </ul>
        </div>       
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Mohammadreza Heidarpoor — Built with passion & security in mind 🔐</p>
      </div>
    </footer>
  );
}
