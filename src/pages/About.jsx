import DecryptedText from "../components/DecryptedText";
import ProfileCard from "../components/ProfileCard";
import ScrollReveal from "../components/ScrollReveal";
import "./AboutModern.css";

export default function About() {
  return (
    <div id="about" className="about-page">
        <span className="spy-marker" />

      {/* MAIN CONTAINER — matches Home width */}
      <div className="about-container">

        {/* ======= HERO SECTION ======== */}
        <section className="about-hero">

          {/* LEFT — PROFILE CARD */}
          <div className="hero-left">
            <ScrollReveal>
            <ProfileCard
              name="Mohammadreza Heidarpoor"
              title="Networking & IT Security Student"
              handle="mammadcodes"
              status="busy"
              contactText="Contact Me"
              avatarUrl="/my-avatar.jpg"
              miniAvatarUrl="/my-avatar.jpg"
              enableTilt={true}
              enableMobileTilt={false}
            />
            </ScrollReveal>
          </div>

          {/* RIGHT — TEXT */}
          <div className="hero-right">
            <ScrollReveal>
            <h1 className="about-title">
              <DecryptedText 
                text="About Me"
                sequential={true}
                animateOn="both"
                speed={80}
                revealDirection="start"
                encryptedClassName="encrypted"
                className="revealed"
              />
            </h1>

            <div className="about-intro">
              <DecryptedText
                text="I am a Networking & IT Security student at Ontario Tech University with a passion for building, securing, and optimizing modern networks. I focus on designing efficient infrastructures, implementing security best practices, and creating reliable systems environments."
                sequential={true}
                animateOn="hover"
                speed={2}
                revealDirection="start"
              />
            </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ======= TECHNICAL SKILLS ======== */}
        <section className="about-section">
          <ScrollReveal>
          <h2 className="section-title">Technical Skills</h2>

          <div className="section-block">
            <h3>Networking</h3>
            <p>
              VLANs & Inter-VLAN Routing • OSPF • BGP • NAT • ACLs • Port Security •
              DHCP • DNS • STP • Rapid-PVST • WAN • Troubleshooting
            </p>
          </div>

          <div className="section-block">
            <h3>Security</h3>
            <p>
              Firewall Configuration • VPN (Remote & Site-to-Site) • Cisco
              AnyConnect • Layer 2 Attack Prevention • Access Control • Traffic
              Monitoring
            </p>
          </div>

          <div className="section-block">
            <h3>Systems & Tools</h3>
            <p>
              Windows Server • Active Directory • GPO • Hyper-V • VirtualBox • GNS3 •
              Packet Tracer • Visio • Draw.io • Lucidchart
            </p>
          </div>
          </ScrollReveal>
        </section>

        {/* ======= EXPERIENCE ======== */}
        <section className="about-section">
          <ScrollReveal>
          <h2 className="section-title">Experience</h2>

          <div className="section-block">
            <p>
              • Designed and deployed multi-tier network topologies for office environments.<br />
              • Configured PoE, QoS, VoIP, Cisco & Yealink phones.<br />
              • Installed and managed Windows Server environments (DNS, DHCP, AD).<br />
              • Built secure Remote-Access & Site-to-Site VPN infrastructures.<br />
              • Taught networking concepts using Packet Tracer & GNS3.<br />
              • Built, configured, and deployed PCs for labs and clients.
            </p>
          </div>
          </ScrollReveal>
        </section>

        {/* ======= EDUCATION ======== */}
        <section className="about-section">
          <ScrollReveal>
          <h2 className="section-title">Education</h2>

          <div className="section-block">
            <p>
              <strong>Bachelor of Information Technology (Networking & IT Security)</strong><br />
              Ontario Tech University — Expected 2027
            </p>

            <p style={{ marginTop: 10 }}>
              <strong>High School Diploma (Mathematics & Physics)</strong><br />
              Samen High School — Tehran, Iran
            </p>
          </div>
          </ScrollReveal>
        </section>

      </div>
    </div>
  );
}
