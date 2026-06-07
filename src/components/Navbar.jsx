import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Navbar() {
  const ref = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: -16 },
      { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "power3.out" },
    );
    const fn = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (e, id) => {
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      ref={ref}
      className="fixed top-0 left-0 right-0 z-50 px-8 md:px-20 py-6 flex items-center justify-between"
      style={{
        opacity: 0,
        margin: scrolled ? "10px auto 0 auto" : "0 auto",
        padding: scrolled ? "6px 20px" : "10px 12px",
        borderRadius: scrolled ? "20px" : "0px",
        maxWidth: scrolled ? "70%" : "100%",
        background: scrolled ? "rgba(8,8,8,0.7)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled
          ? "1px solid var(--border)"
          : "1px solid transparent",
        transition: "all 0.5s ease",
      }}
    >
      <a
        href="/"
        style={{
          fontFamily: "Syne, sans-serif",
          fontWeight: 800,
          fontSize: "22px",
          color: "var(--text)",
          letterSpacing: "-0.02em",
        }}
      >
        BK<span style={{ color: "var(--accent)" }}>.</span>
      </a>
      <div
        className={`flex  gap-3 transition-all ease-in-out duration-300 ${scrolled ? "flex-row" : "flex-row lg:flex-col"}`}
      >
        {[
          ["Work", "#work"],
          ["About", "#about"],
          ["Contact", "#contact"],
        ].map(([l, h], i) => (
          <a
            key={i}
            onClick={(e) => go(e, `${h}`)}
            className="hline uppercase text-[--text-muted] text-[10px] cursor-pointer w-fit"
            rel="noreferrer"
            style={{
              fontFamily: "DM Mono,monospace",
              textDecoration: "none",
              letterSpacing: "0.1em",
            }}
          >
            {l}
          </a>
        ))}
      </div>
    </nav>
  );
}
