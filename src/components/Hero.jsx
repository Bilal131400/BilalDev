import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Hero() {
  const rootRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.1 });

    // line 1
    tl.fromTo(
      ".hero-l1",
      { yPercent: 110 },
      { yPercent: 0, duration: 1.1, ease: "power4.out" },
    );
    tl.fromTo(
      ".hero-l2",
      { yPercent: 110 },
      { yPercent: 0, duration: 1.1, ease: "power4.out" },
      "-=0.85",
    );
    tl.fromTo(
      ".hero-l3",
      { yPercent: 110 },
      { yPercent: 0, duration: 1.0, ease: "power4.out" },
      "-=0.85",
    );
    tl.fromTo(
      ".hero-sub",
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
      "-=0.5",
    );
    tl.fromTo(
      ".hero-meta",
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.08 },
      "-=0.5",
    );
    tl.fromTo(
      ".hero-scroll",
      { opacity: 0 },
      { opacity: 1, duration: 0.8 },
      "-=0.3",
    );
    tl.fromTo(
      ".hero-divider",
      { scaleX: 0 },
      { scaleX: 1, duration: 1.4, ease: "expo.inOut", transformOrigin: "left" },
      0.4,
    );
  }, []);

  const go = (e, id) => {
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={rootRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-between"
      style={{
        paddingTop: "0",
        paddingBottom: "52px",
        paddingLeft: "56px",
        paddingRight: "56px",
      }}
    >
      {/* Grid lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(201,150,12,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(201,150,12,0.025) 1px,transparent 1px)`,
          backgroundSize: "72px 72px",
        }}
      />

      {/* Glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "30%",
          left: "60%",
          transform: "translate(-50%,-50%)",
          width: "700px",
          height: "700px",
          background:
            "radial-gradient(circle, rgba(201,150,12,0.05) 0%, transparent 65%)",
          borderRadius: "50%",
        }}
      />
      <div className="pt-28 mt-28">
        <div>
          <p
            className="mb-1"
            style={{
              fontWeight: 700,
              fontFamily: "DM Mono, monospace",
              fontSize: "clamp(14px, 1.8vw, 22px)",
              color: "var(--text-muted)",
              letterSpacing: "0.02em",
            }}
          >
            Creative Developer
          </p>
        </div>
        <div className="hero-name" data-cursor="hero">
          <div className="line-wrapper">
          <h1
            className="hero-l1"
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(80px, 13.5vw, 200px)",
              lineHeight: 0.88,
              letterSpacing: "-0.04em",
              color: "var(--text)",
            }}
          >
            Bilal
          </h1>
          </div>

          <div className="line-wrapper flex items-baseline gap-6 flex-wrap">
          <h1
            className="hero-l2"
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(80px, 13.5vw, 200px)",
              lineHeight: 0.88,
              letterSpacing: "-0.04em",
              color: "var(--accent)",
            }}
          >
            Khuram
          </h1>
          </div>
        </div>

        <div className="line-wrapper mt-4">
          <p
            className="hero-l3"
            style={{
              fontFamily: "DM Mono, monospace",
              fontStyle: "italic",
              fontSize: "clamp(14px, 1.8vw, 22px)",
              color: "var(--text-muted)",
              letterSpacing: "0.02em",
            }}
          >
            — crafting the web, one pixel at a time
          </p>
        </div>
      </div>

      {/* DIVIDER */}
      <div
        className="hero-divider my-8"
        style={{
          height: "1px",
          background: "var(--border)",
          transform: "scaleX(0)",
          transformOrigin: "left",
        }}
      />

      {/* BOTTOM ROW */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <p
          className="hero-sub max-w-sm"
          style={{
            fontFamily: "DM Mono, monospace",
            fontSize: "13px",
            lineHeight: "1.9",
            color: "var(--text-mid)",
            opacity: 0,
          }}
        >
          I turn designs into fast, immersive web experiences.
          <br />
          React · Next.js · TypeScript · GSAP.
          <br />
        </p>

        <div
          className="hero-meta flex items-center gap-4"
          style={{ opacity: 0 }}
        >
          <a
            href="#work"
            onClick={(e) => go(e, "#work")}
            className="btn-primary"
          >
            View Work <span style={{ fontSize: "16px" }}>↓</span>
          </a>
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <div
        className="hero-scroll absolute bottom-12 right-4 flex flex-col items-center gap-2"
        style={{ opacity: 0 }}
      >
        <span
          style={{
            fontSize: "9px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
            writingMode: "vertical-rl",
            fontFamily: "DM Mono",
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: "1px",
            height: "56px",
            background:
              "linear-gradient(to bottom, var(--accent), transparent)",
            animation: "scrollLine 2s ease-in-out infinite",
          }}
        />
      </div>

      <style>{`
        @keyframes scrollLine {
          0%,100% { opacity:1; transform:scaleY(1) translateY(0); }
          50% { opacity:0.3; transform:scaleY(0.6) translateY(8px); }
        }
      `}</style>
    </section>
  );
}
