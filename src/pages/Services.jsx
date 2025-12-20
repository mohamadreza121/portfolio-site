import DecryptedText from "../components/DecryptedText";
import ScrollReveal from "../components/ScrollReveal";
import "./Services.css";

const services = [
  {
    title: "Enterprise Network Design & Implementation",
    meta: "LAN/WAN Architecture, VLAN Design, Routing, Redundancy",
    price: "$250 – $1,500 CAD",
  },
  {
    title: "Cisco Router & Switch Configuration",
    meta: "IOS Configuration, VLANs, ACLs, NAT, DHCP, Optimization",
    price: "$120 – $900 CAD",
  },
  {
    title: "Firewall Deployment & Security Hardening",
    meta: "FortiGate, Palo Alto, Policies, Segmentation, Zero Trust",
    price: "$350 – $1,800 CAD",
  },
  {
    title: "VPN & Secure Remote Access",
    meta: "Site-to-Site VPN, SSL/IPsec, Remote Workforce Access",
    price: "$250 – $900 CAD",
  },
  {
    title: "Windows Server & Active Directory",
    meta: "AD DS, DNS, DHCP, Group Policy, NTFS Security",
    price: "$500 – $1,200 CAD",
  },
  {
    title: "Network Security Audits & Hardening",
    meta: "Configuration Review, Risk Analysis, Remediation Planning",
    price: "$300 – $1,500 CAD",
  },
];

export default function Services() {
  return (
    <div id="services" className="services-page">
      <span className="spy-marker" />

      <div className="services-container">
        <section className="services-hero">

          {/* LEFT */}
          <div className="services-left">
            <ScrollReveal>
              <h1 className="services-title">
                <DecryptedText
                  text="Professional IT & Network Services"
                  sequential
                  animateOn="both"
                  speed={80}
                  revealDirection="start"
                  encryptedClassName="encrypted"
                  className="revealed"
                />
              </h1>
            </ScrollReveal>

            <ScrollReveal>
              <p className="services-intro">
                <DecryptedText
                  text="Hands-on, security-focused networking and infrastructure services designed for small and mid-sized businesses seeking reliable, enterprise-grade solutions."
                  sequential
                  animateOn="hover"
                  speed={2}
                  revealDirection="start"
                />
              </p>
            </ScrollReveal>
          </div>

          {/* RIGHT */}
          <div className="services-right">
            <ScrollReveal>
              <div className="service-list">
                {services.map((s, idx) => (
                <div className="service-card" key={idx}>
                  <h3>{s.title}</h3>
                  <div className="meta">{s.meta}</div>
                  <div className="price">{s.price}</div>

                  <div className="service-cta">
                    <button
                      className="btn-pill cursor-target"
                      onClick={() => {
                        document
                          .querySelector("#footer")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      Request Quote
                    </button>
                  </div>
                </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

        </section>
      </div>
    </div>
  );
}
