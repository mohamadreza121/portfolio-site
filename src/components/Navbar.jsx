import {
  FaHome,
  FaUser,
  FaProjectDiagram,
  FaCertificate,
  FaTools,
  FaMoon,
  FaSun,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { navigateAndScroll } from "../utils/scrollToSection";

import Dock from "./Dock";
import "./Navbar.css";
import "./Dock.css";
import "./TargetCursor.css";

export default function Navbar({ active, theme, onToggleTheme, onSetActive }) {
  const navigate = useNavigate();

  const navItems = [
    {
      key: "Home",
      icon: <FaHome />,
      label: "Home",
      onClick: () => {
        onSetActive?.("Home");
        navigateAndScroll(navigate, "home");
      },
      isActive: active === "Home",
    },
    {
      key: "About",
      icon: <FaUser />,
      label: "About",
      onClick: () => {
        onSetActive?.("About");
        navigateAndScroll(navigate, "about");
      },
      isActive: active === "About",
    },
    {
      key: "Projects",
      icon: <FaProjectDiagram />,
      label: "Projects",
      onClick: () => {
        onSetActive?.("Projects");
        navigateAndScroll(navigate, "projects");
      },
      isActive: active === "Projects",
    },
    {
      key: "Certifications",
      icon: <FaCertificate />,
      label: "Certs",
      onClick: () => {
        onSetActive?.("Certs");
        navigateAndScroll(navigate, "certifications");
      },
      isActive: active === "Certs",
    },
    {
      key: "Services",
      icon: <FaTools />,
      label: "Services",
      onClick: () => {
        onSetActive?.("Services");
        navigateAndScroll(navigate, "services");
      },
      isActive: active === "Services",
    },
  ];

  const themeToggle = {
    key: "Theme",
    icon: theme === "night" ? <FaSun /> : <FaMoon />,
    label: "Theme",
    onClick: onToggleTheme,
    isActive: false,
  };

  return (
    <nav className="navbar-shell" aria-label="Primary navigation">
      <Dock
        items={[...navItems, themeToggle]}
        panelHeight={64}
        baseItemSize={44}
        magnification={72}
      />
    </nav>
  );
}
