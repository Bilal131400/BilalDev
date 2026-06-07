import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const exp = [
  {
    company: "Octet Solutions",
    role: "React JS Developer",
    period: "08/2025 – Present",
    location: "Lahore · Onsite",
    notice: false,
  },
  {
    company: "Zodiac Technologies",
    role: "Frontend Developer",
    period: "03/2023 – 08/2025",
    location: "Lahore · Remote",
    notice: false,
  },
  {
    company: "WebX Technologies",
    role: "Intern, Frontend",
    period: "01/2023 – 03/2023",
    location: "Lahore · Onsite",
    notice: false,
  },
];

const stack = [
  { label: "Core", val: "React.js · Next.js · TypeScript · JavaScript ES6+" },
  { label: "Style", val: "Tailwind CSS · ShadCN UI · Ant Design · SCSS" },
  { label: "Motion", val: "GSAP · Framer Motion · Lenis · AOS" },
  { label: "Data", val: "REST APIs · WebSockets · Redux" },
  { label: "Tools", val: "Git · Figma · Cursor · GitHub . Codex · VS Code" },
];

export default function About() {
  const ref = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      ".about-reveal",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 78%", once: true },
      },
    );
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      style={{
        background: "var(--bg-2)",
        padding: "120px 56px",
        borderTop: "1px solid var(--border)",
      }}
    >
      {/* HEADER */}
      <div className="mb-20">
        <p className="about-reveal section-label mb-4" style={{ opacity: 0 }}>
          The human behind the code
        </p>
        <div className="line-wrapper" data-cursor="hero">
          <h2
            className="about-reveal"
            style={{
              fontFamily: "Syne,sans-serif",
              fontWeight: 800,
              fontSize: "clamp(40px,6vw,88px)",
              letterSpacing: "-0.03em",
              lineHeight: 0.9,
              color: "var(--text)",
              opacity: 0,
            }}
          >
            About
          </h2>
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-20">
        {/* LEFT — bio + stack */}
        <div className="space-y-10">
          <div className="about-reveal space-y-5" style={{ opacity: 0 }}>
            <p
              style={{
                fontFamily: "DM Mono,monospace",
                fontSize: "14px",
                lineHeight: "2",
                color: "var(--text-mid)",
              }}
            >
              I'm Bilal, a frontend developer focused on building fast,
              interactive, and visually polished web experiences. With 3+ years
              of experience, I turn designs into production-ready applications
              using React, Next.js, TypeScript, and modern animation libraries.
              My goal is simple: create interfaces that feel as good as they
              look.
            </p>
            <p
              style={{
                fontFamily: "DM Mono,monospace",
                fontSize: "14px",
                lineHeight: "2",
                color: "var(--text-mid)",
              }}
            >
              From pixel-perfect layouts to immersive animations, I specialize
              in crafting modern web experiences that feel fast, intuitive, and
              alive. Every interaction is designed to leave an impression.
            </p>
          </div>

          {/* Stack */}
          <div className="about-reveal" style={{ opacity: 0 }}>
            <p className="section-label mb-5">Technical Stack</p>
            <div className="space-y-3">
              {stack.map((s, i) => (
                <div key={i} className="flex gap-6">
                  <span
                    style={{
                      fontFamily: "DM Mono,monospace",
                      fontSize: "10px",
                      color: "var(--accent)",
                      width: "40px",
                      shrink: 0,
                      paddingTop: "1px",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    {s.label}
                  </span>
                  <span
                    style={{
                      fontFamily: "DM Mono,monospace",
                      fontSize: "11px",
                      color: "var(--text-muted)",
                      lineHeight: "1.7",
                    }}
                  >
                    {s.val}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — experience */}
        <div className="about-reveal" style={{ opacity: 0 }}>
          <p className="section-label mb-6">Experience</p>
          <div style={{ borderTop: "1px solid var(--border)" }}>
            {exp.map((e, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 py-7"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p
                      style={{
                        fontFamily: "Syne,sans-serif",
                        fontWeight: 700,
                        fontSize: "17px",
                        color: "var(--text)",
                      }}
                    >
                      {e.company}
                    </p>
                    {e.notice && (
                      <span
                        style={{
                          fontSize: "9px",
                          padding: "2px 7px",
                          fontFamily: "DM Mono,monospace",
                          border: "1px solid var(--accent)",
                          color: "var(--accent)",
                          borderRadius: "2px",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                        }}
                      >
                        Notice
                      </span>
                    )}
                  </div>
                  <p
                    style={{
                      fontFamily: "DM Mono,monospace",
                      fontSize: "11px",
                      color: "var(--text-muted)",
                    }}
                  >
                    {e.role}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p
                    style={{
                      fontFamily: "DM Mono,monospace",
                      fontSize: "11px",
                      color: "var(--text-muted)",
                    }}
                  >
                    {e.period}
                  </p>
                  <p
                    style={{
                      fontFamily: "DM Mono,monospace",
                      fontSize: "11px",
                      color: "var(--text-muted)",
                      marginTop: "2px",
                    }}
                  >
                    {e.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
