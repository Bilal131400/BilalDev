import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    num: "01",
    title: "Terminal Tree",
    sub: "Terminal-Style Interactive Portfolio",
    tags: ["React.js", "Tailwind CSS", "GSAP", "AOS"],
    desc: "Designed and built a terminal-inspired developer portfolio with GSAP animations, AOS scroll effects, and full responsiveness across devices.",
    url: "https://terminaltree.com",
    image: "/assets/images/terminaltree-main.png",
    year: "2025",
  },
  {
    num: "02",
    title: "Easy Support",
    sub: "Frontend Experience / Web App",
    tags: ["Next.js", "React.js", "Websockets", "Aos", "Tailwind", "Shadcn"],
    desc: "Built the full frontend for a multi-role chat support platform, including an animated landing site, admin dashboards, chat widget integration, email inbox management, agent/channel assignment flows, and super-admin plan/addon management.",
    url: "easysupport.io",
    image: "/assets/images/easysupport-main.png",
    year: "2026",
  },
  {
    num: "03",
    title: "Lasani Burger",
    sub: "Full-Stack Restaurant Ordering System",
    tags: ["Next.js", "MySQL", "Tailwind CSS", "REST APIs"],
    desc: "Sole developer of a restaurant ordering platform with real-time order tracking, menu management, cart/checkout flow, and a role-based admin dashboard.",
    url: "https://baoglasaniburger.com",
    image: "/assets/images/lasani-main.png",
    year: "2025",
  },
  {
    num: "04",
    title: "Content Mamba",
    sub: "Ai Content Generator",
    tags: [
      "Next.js",
      "MySQL",
      "Tailwind CSS",
      "AOS",
      "Google APIs",
      "Replicate",
      "Inngest",
    ],
    desc: "Built Content Mamba, an AI-powered SaaS platform using Next.js, TypeScript, Tailwind CSS, and MySQL. Developed user and admin dashboards featuring YouTube content generation, SEO optimization tools, AI thumbnail generation via Replicate, YouTube integrations through Google Developer APIs, subscription management, blog/testimonial management, and background job processing with Inngest.",
    url: "https://www.contentmamba.com",
    image: "/assets/images/contentmamba-main.png",
    year: "2025",
  },
];

function ProjectImage({ project }) {
  return (
    <a
      href={project.url}
      target={project.url === "#" ? undefined : "_blank"}
      rel="noreferrer"
      className="work-story-image border border-gray-600  rounded-2xl"
      style={{ textDecoration: "none" }}
    >
      <div className="work-story-image-frame">
        <img src={project.image} alt={`${project.title} preview`} />
      </div>
    </a>
  );
}

function ProjectDetails({ project }) {
  return (
    <div className="work-story-detail">
      <div className="work-story-detail-head">
        <span>{project.num}</span>
        <h3 data-cursor="hero">{project.title}</h3>
      </div>
      <p className="work-story-sub">{project.sub}</p>
      <p className="work-story-desc">{project.desc}</p>
      <div className="work-story-tags">
        {project.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <a
        href={project.url}
        target={project.url === "#" ? undefined : "_blank"}
        rel="noreferrer"
        className="work-story-link"
      >
        View project
      </a>
    </div>
  );
}

export default function Work() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const leadRef = useRef(null);
  const entryImageRef = useRef(null);
  const pinRef = useRef(null);
  const visualRef = useRef(null);
  const cardRefs = useRef([]);
  const detailRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(headingRef.current, { scale: 2.8, transformOrigin: "center" });
      gsap.set(leadRef.current, { opacity: 0, y: 22 });
      gsap.set(entryImageRef.current, { y: 180, scale: 0.64, opacity: 0 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
            end: "+=620",
            scrub: 1,
          },
        })
        .to(headingRef.current, { scale: 1, duration: 1, ease: "none" }, 0)
        .to(leadRef.current, { opacity: 1, y: 0, duration: 0.45 }, 0.15)
        .to(
          entryImageRef.current,
          { y: 0, scale: 1, opacity: 1, duration: 0.85, ease: "power2.out" },
          0.2,
        );

      gsap.set(cardRefs.current, {
        yPercent: 110,
        scale: 1,
        opacity: 0,
      });
      gsap.set(cardRefs.current[0], {
        yPercent: 0,
        opacity: 1,
      });
      gsap.set(detailRefs.current, {
        autoAlpha: 0,
        x: 56,
      });
      gsap.set(detailRefs.current[0], {
        autoAlpha: 0,
        x: 56,
      });
      gsap.set(visualRef.current, {
        xPercent: 36,
        scale: 1.08,
        transformOrigin: "center",
      });

      const pinTl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * (projects.length + 1)}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      pinTl
        .to(visualRef.current, {
          xPercent: 0,
          scale: 0.82,
          duration: 1,
          ease: "power2.inOut",
        })
        .to(
          detailRefs.current[0],
          { autoAlpha: 1, x: 0, duration: 0.55, ease: "power2.out" },
          0.45,
        );

      projects.forEach((_, index) => {
        if (index === 0) return;

        pinTl
          .to(
            cardRefs.current[index],
            {
              yPercent: 0,
              opacity: 1,
              duration: 1,
              ease: "power2.inOut",
            },
            index + 0.2,
          )
          .to(
            cardRefs.current[index - 1],
            {
              scale: 0.94,
              yPercent: -7,
              opacity: 0.42,
              duration: 1,
              ease: "power2.inOut",
            },
            index + 0.2,
          )
          .to(
            detailRefs.current[index - 1],
            {
              autoAlpha: 0,
              x: -34,
              duration: 0.35,
              ease: "power2.in",
            },
            index + 0.2,
          )
          .fromTo(
            detailRefs.current[index],
            { autoAlpha: 0, x: 56 },
            {
              autoAlpha: 1,
              x: 0,
              duration: 0.55,
              ease: "power2.out",
            },
            index + 0.48,
          );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={sectionRef} className="work-story-section">
      <div className="work-story-intro">
        <h2 ref={headingRef} data-cursor="hero">
          Selected Work
        </h2>
        <p ref={leadRef} data-cursor="hero">
          A few builds where frontend craft, product thinking, and motion come
          together.
        </p>
      </div>

      <div className="">
        <div ref={pinRef} className="work-story-pin overflow-hidden">
          <div ref={visualRef} className="work-story-visual">
            {projects.map((project, index) => (
              <div
                key={project.title}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className="work-story-card-layer"
                style={{ zIndex: index + 1 }}
              >
                <ProjectImage project={project} />
              </div>
            ))}
          </div>

          <div className="work-story-details relative">
            {projects.map((project, index) => (
              <div
                key={project.title}
                ref={(el) => {
                  detailRefs.current[index] = el;
                }}
                className="work-story-detail-layer"
              >
                <ProjectDetails project={project} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
