import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const ref = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      ".contact-reveal",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 78%", once: true },
      },
    );
  }, []);

  const copy = () => {
    navigator.clipboard.writeText("bilalkhuramofficial@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        padding: "120px 56px",
        position: "relative",
        overflow: "hidden",
        borderTop: "1px solid var(--border)",
      }}
    >
      {/* BG glow */}
      <div
        style={{
          position: "absolute",
          bottom: "-120px",
          right: "-120px",
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle,rgba(201,150,12,0.07) 0%,transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />

      {/* Big accent char */}
      <div
        style={{
          position: "absolute",
          top: "60px",
          right: "56px",
          fontFamily: "Syne,sans-serif",
          fontWeight: 800,
          fontSize: "clamp(120px,18vw,260px)",
          color: "rgba(201,150,12,0.04)",
          letterSpacing: "-0.05em",
          lineHeight: 1,
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        ✉
      </div>

      <p className="contact-reveal section-label mb-6" style={{ opacity: 0 }}>
        Get in touch
      </p>

      {/* Big headline */}
      <div className="mb-10" data-cursor="hero">
        {["Let's build", "something", "great."].map((line, i) => (
          <div key={i} className="line-wrapper">
            <h2
              className="contact-reveal"
              style={{
                fontFamily: "Syne,sans-serif",
                fontWeight: 800,
                fontSize: "clamp(52px,9vw,140px)",
                letterSpacing: "-0.035em",
                lineHeight: 0.88,
                color: i === 1 ? "var(--accent)" : "var(--text)",
                opacity: 0,
              }}
            >
              {line}
            </h2>
          </div>
        ))}
      </div>

      {/* CTAs */}
      <div
        className="contact-reveal flex flex-wrap items-center gap-4 mb-16"
        style={{ opacity: 0 }}
      >
        <a href="mailto:bilalkhuramofficial@gmail.com" className="btn-primary">
          Send Email <span>↗</span>
        </a>
        <button className="btn-ghost" onClick={copy}>
          {copied ? <span className="copy-toast">Copied ✓</span> : "Copy Email"}
        </button>
      </div>

      {/* Links */}
      <div
        className="contact-reveal"
        style={{
          opacity: 0,
          borderTop: "1px solid var(--border)",
          paddingTop: "32px",
        }}
      >
        {[
          {
            l: "Email",
            v: "bilalkhuramofficial@gmail.com",
            h: "mailto:bilalkhuramofficial@gmail.com",
          },
          {
            l: "LinkedIn",
            v: "linkedin.com/in/bilal-khuram",
            h: "https://linkedin.com/in/bilal-khuram-772725307",
          },
          { l: "Phone", v: "+92 300 882 5785", h: "tel:+923008825785" },
        ].map(({ l, v, h }, i) => (
          <div
            key={i}
            className="flex items-center gap-6 py-4"
            style={{ borderBottom: "1px solid var(--border)" }}
          >
            <span
              style={{
                fontFamily: "DM Mono,monospace",
                fontSize: "10px",
                color: "var(--text-muted)",
                width: "56px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              {l}
            </span>
            <a
              href={h}
              className="hline"
              target={h.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              style={{
                fontFamily: "DM Mono,monospace",
                fontSize: "13px",
                color: "var(--text-mid)",
                textDecoration: "none",
              }}
            >
              {v}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
