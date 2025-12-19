import {
  FaHome,
  FaUser,
  FaProjectDiagram,
  FaCertificate,
  FaMoon,
  FaSun,
} from "react-icons/fa";
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
        document.querySelector("#home")?.scrollIntoView({ behavior: "smooth" });
      },
      isActive: active === "Home",
    },
    {
      icon: <FaUser size={16} />,
      label: "About",
      onClick: () => {
        onSetActive?.("About");
        document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
      },
      isActive: active === "About",
    },
    {
      icon: <FaProjectDiagram size={16} />,
      label: "Projects",
      onClick: () => {
        onSetActive?.("Projects");
        document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
      },
      isActive: active === "Projects",
    },
    {
      icon: <FaCertificate size={16} />,
      label: "Certs",
      onClick: () => {
        onSetActive?.("Certs");
        document.querySelector("#certifications")?.scrollIntoView({ behavior: "smooth" });
      },
      isActive: active === "Certs",
    },
  ];

  return (
    <div className="navbar-wrapper">
      <Dock
        items={items}
        panelHeight={68}
        baseItemSize={50}
        magnification={70}
      />

      {/* Theme toggle button pinned top-right */}
      <button className="theme-toggle-btn cursor-target" onClick={onToggleTheme}>
        {theme === "night" ? (
          <FaSun size={18} style={{ color: "var(--nav-active)" }} />
        ) : (
          <FaMoon size={18} style={{ color: "var(--nav-active)" }} />
        )}
      </button>
    </div>
  );
}
