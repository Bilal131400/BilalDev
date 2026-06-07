import { useEffect } from "react";

export default function Cursor() {
  useEffect(() => {
    const dot = document.getElementById("cursor-dot");
    const ring = document.getElementById("cursor-ring");
    if (!dot || !ring) return;

    let mx = window.innerWidth / 2,
      my = window.innerHeight / 2;
    let rx = mx,
      ry = my;
    let rafId;

    const move = (e) => {
      mx = e.clientX;
      my = e.clientY;
    };
    document.addEventListener("mousemove", move);

    const tick = () => {
      dot.style.left = mx + "px";
      dot.style.top = my + "px";
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const expand = () => ring.classList.add("expanded");
    const contract = () => ring.classList.remove("expanded");
    const heroEnter = () => {
      ring.classList.add("hero-hover");
      dot.classList.add("hero-hover");
    };
    const heroLeave = () => {
      ring.classList.remove("hero-hover");
      dot.classList.remove("hero-hover");
    };

    const attach = () => {
      document.querySelectorAll("a,button,[data-hover]").forEach((el) => {
        el.addEventListener("mouseenter", expand);
        el.addEventListener("mouseleave", contract);
      });
      document.querySelectorAll('[data-cursor="hero"]').forEach((el) => {
        el.addEventListener("mouseenter", heroEnter);
        el.addEventListener("mouseleave", heroLeave);
      });
    };
    attach();

    return () => {
      document.removeEventListener("mousemove", move);
      document.querySelectorAll("a,button,[data-hover]").forEach((el) => {
        el.removeEventListener("mouseenter", expand);
        el.removeEventListener("mouseleave", contract);
      });
      document.querySelectorAll('[data-cursor="hero"]').forEach((el) => {
        el.removeEventListener("mouseenter", heroEnter);
        el.removeEventListener("mouseleave", heroLeave);
      });
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div id="cursor-dot" />
      <div id="cursor-ring" />
    </>
  );
}
