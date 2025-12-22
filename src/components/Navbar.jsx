import {
  FaHome,
  FaUser,
  FaProjectDiagram,
  FaCertificate,
  FaTools,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { scrollToSection } from "../utils/scrollToSection";
import Dock from "./Dock";
import "./Dock.css";
import "./Navbar.css";
import "./TargetCursor.css"

export default function Navbar({ active, theme, onToggleTheme, onSetActive }) {
  const items = [
    {
      icon: <FaHome size={16} />,
      label: "Home",
      onClick: () => {
        onSetActive?.("Home");
        scrollToSection("home");
      },
      isActive: active === "Home",
    },
    {
      icon: <FaUser size={16} />,
      label: "About",
      onClick: () => {
        onSetActive?.("About");
        scrollToSection("about");
      },
      isActive: active === "About",
    },
    {
      icon: <FaProjectDiagram size={16} />,
      label: "Projects",
      onClick: () => {
        onSetActive?.("Projects");
        scrollToSection("projects");
      },
      isActive: active === "Projects",
    },
    {
      icon: <FaCertificate size={16} />,
      label: "Certs",
      onClick: () => {
        onSetActive?.("Certs");
        scrollToSection("certifications");
      },
      isActive: active === "Certs",
    },
    {
      icon: <FaTools size={16} />,
      label: "Services",
      onClick: () => {
      onSetActive?.("Services");
      scrollToSection("services");
      },
      isActive: active === "Services",
    },
        // 🌗 THEME TOGGLE (NO ACTIVE STATE)
    {
      icon:
        theme === "night" ? (
          <FaSun size={16} />
        ) : (
          <FaMoon size={16} />
        ),
      label: "Theme",
      onClick: onToggleTheme,
      isActive: false,
    },
  ];

  return (
    <div className="navbar-wrapper">
      <Dock
        items={items}
        panelHeight={64}
        baseItemSize={44}
        magnification={window.innerWidth <= 480 ? 44 : 70}
      />
    </div>
  );
}
