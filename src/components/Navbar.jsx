import { FaHome, FaUser, FaProjectDiagram, FaCertificate } from "react-icons/fa";
import Dock from "./Dock";
import "./Dock.css";

export default function Navbar({ active, setActive }) {
  const items = [
    {
      icon: <FaHome size={16} color={active === "Home" ? "#61dca3" : "#9fb6a8"} />,
      label: "Home",
      onClick: () => {
        setActive("Home");
        document.querySelector("#home")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      icon: <FaUser size={16} color={active === "About" ? "#61dca3" : "#9fb6a8"} />,
      label: "About",
      onClick: () => {
        setActive("About");
        document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      icon: <FaProjectDiagram size={16} color={active === "Projects" ? "#61dca3" : "#9fb6a8"} />,
      label: "Projects",
      onClick: () => {
        setActive("Projects");
        document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      icon: <FaCertificate size={16} color={active === "Certs" ? "#61dca3" : "#9fb6a8"} />,
      label: "Certs",
      onClick: () => {
        setActive("Certs");
        document.querySelector("#certifications")?.scrollIntoView({ behavior: "smooth" });
      },
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
    </div>
  );
}
