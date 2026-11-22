

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { useGSAP } from "@gsap/react";
import "./Gallery.css";

import outdoorwall from "../../assets/outdoorwall.jpg";
import indoorwall from "../../assets/indoorwall.jpg";
import pvcplanter from "../../assets/pvcplanter.jpg";
import greenwall from "../../assets/greenwall.jpg";
import biopanel from "../../assets/biopanel.jpg";
import artificialgrass from "../../assets/artificialgrass.jpg";

gsap.registerPlugin(useGSAP, ScrollTrigger, Draggable);

const projects = [
  { id: 1, image: outdoorwall, title: "Vertical Outdoor Wall Garden" },
  { id: 2, image: indoorwall, title: "Indoor Living Wall" },
  { id: 3, image: pvcplanter, title: "Vertical Indoor Wall Garden" },
  { id: 4, image: greenwall, title: "Modern Green Wall" },
  { id: 5, image: biopanel, title: "Outdoor Vertical Garden" },
  { id: 6, image: artificialgrass, title: "Decorative Green Wall" },
];

const AUTOPLAY_SECONDS = 3.5;

const Word = ({ text, className = "" }) => (
  <span className={`hw-wrap ${className}`}>
    {text.split("").map((char, i) => (
      <span className="ch" key={i}>
        {char}
      </span>
    ))}
  </span>
);

const Gallery = () => {
  const sectionRef = useRef(null);
  const sliderRef = useRef(null);
  const wrapperRef = useRef(null);
  const cursorRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(3);
  const [paused, setPaused] = useState(false);

  const maxIndex = Math.max(0, projects.length - visible);

  const indexRef = useRef(0);
  const pausedRef = useRef(false);
  const progRef = useRef(null);
  const firstRun = useRef(true);

  indexRef.current = currentIndex;
  pausedRef.current = paused;

  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- RESPONSIVE SLIDES ---------------- */

  useEffect(() => {
    const updateVisible = () => {
      if (window.innerWidth <= 600) {
        setVisible(1);
      } else if (window.innerWidth <= 900) {
        setVisible(2);
      } else {
        setVisible(3);
      }
    };

    updateVisible();

    window.addEventListener("resize", updateVisible);

    return () => window.removeEventListener("resize", updateVisible);
  }, []);

  /* Keep index within bounds */

  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  /* ---------------- SLIDER + CARD ANIMATION ---------------- */

  useGSAP(
    () => {
      const slider = sliderRef.current;
      if (!slider) return;

      const cards = Array.from(slider.children);
      if (!cards.length) return;

      const gap = parseFloat(getComputedStyle(slider).gap) || 0;
      const step = cards[0].offsetWidth + gap;

      const instant = firstRun.current || reduce;

      gsap.to(slider, {
        x: -currentIndex * step,
        duration: instant ? 0 : 0.9,
        ease: "power4.inOut",
        overwrite: true,
      });

      const center = currentIndex + Math.floor(visible / 2);

      cards.forEach((card, i) => {
        const distance = i - center;
        const isCenter = distance === 0;

        gsap.to(card, {
          scale: isCenter ? 1 : 0.86,
          rotationY:
            visible === 1
              ? 0
              : gsap.utils.clamp(-35, 35, distance * -22),
          opacity:
            Math.abs(distance) > 1
              ? 0.35
              : isCenter
              ? 1
              : 0.6,
          z: isCenter ? 60 : 0,
          transformPerspective: 1200,
          duration: instant ? 0 : 0.9,
          ease: "power3.inOut",
          overwrite: "auto",
        });
      });

      if (!instant) {
        const centerCard = cards[center];

        if (centerCard) {
          const image = centerCard.querySelector("img");
          const title = centerCard.querySelector(".title-inner");
          const chips = centerCard.querySelectorAll(".chip");

          if (image) {
            gsap.fromTo(
              image,
              { scale: 1.25 },
              {
                scale: 1,
                duration: 1.4,
                ease: "power3.out",
              }
            );
          }

          if (title) {
            gsap.fromTo(
              title,
              { yPercent: 110 },
              {
                yPercent: 0,
                duration: 0.8,
                delay: 0.35,
                ease: "power3.out",
              }
            );
          }

          if (chips.length) {
            gsap.fromTo(
              chips,
              { scale: 0, opacity: 0 },
              {
                scale: 1,
                opacity: 1,
                stagger: 0.1,
                delay: 0.5,
                duration: 0.5,
                ease: "back.out(2.5)",
              }
            );
          }
        }
      }

      firstRun.current = false;
    },
    {
      dependencies: [currentIndex, visible],
      scope: sectionRef,
    }
  );

  /* ---------------- ENTRANCE + HEADING ANIMATIONS ---------------- */

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      // All selectors limited to this Gallery section
      const q = gsap.utils.selector(section);

      const arrows = q(".project-arrow");
      const cards = q(".project-card");
      const headingChars = q(".heading-title .ch");
      const underline = q(".title-underline");
      const paragraph = q(".projects-heading p");
      const heading = q(".heading-title")[0];

      // Arrow positioning
      if (arrows.length) {
        gsap.set(arrows, { yPercent: -50 });
      }

      if (reduce) return;

      // Card entrance animation
      if (cards.length) {
        gsap.from(cards, {
          scale: 0.6,
          opacity: 0,
          y: 80,
          rotationY: 40,
          stagger: {
            each: 0.12,
            from: "center",
          },
          duration: 1,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: section.querySelector(".projects-slider-window"),
            start: "top 80%",
            once: true,
          },
        });
      }

      // Heading letter animation
      if (headingChars.length) {
        gsap.fromTo(
          headingChars,
          {
            color: "#c5d6c9",
            yPercent: 45,
            opacity: 0.35,
          },
          {
            color: (i, el) =>
              el.closest(".hl") ? "#16a34a" : "#111827",
            yPercent: 0,
            opacity: 1,
            stagger: 0.06,
            ease: "none",
            scrollTrigger: {
              trigger: section.querySelector(".projects-heading"),
              start: "top 88%",
              end: "top 40%",
              scrub: 0.6,
            },
          }
        );
      }

      // Underline animation
      if (underline.length) {
        gsap.fromTo(
          underline,
          { scaleX: 0 },
          {
            scaleX: 1,
            transformOrigin: "center",
            ease: "none",
            scrollTrigger: {
              trigger: section.querySelector(".projects-heading"),
              start: "top 70%",
              end: "top 40%",
              scrub: true,
            },
          }
        );
      }

      // Paragraph animation
      if (paragraph.length) {
        gsap.fromTo(
          paragraph,
          { y: 24, opacity: 0.15 },
          {
            y: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section.querySelector(".projects-heading"),
              start: "top 65%",
              end: "top 35%",
              scrub: true,
            },
          }
        );
      }

      // Heading skew effect on scroll velocity
      if (heading) {
        const setSkew = gsap.quickSetter(heading, "skewX", "deg");
        const clampSkew = gsap.utils.clamp(-6, 6);
        const proxy = { skew: 0 };

        ScrollTrigger.create({
          trigger: section,
          start: "top bottom",
          end: "bottom top",

          onUpdate: (self) => {
            const skew = clampSkew(self.getVelocity() / -400);

            if (Math.abs(skew) > Math.abs(proxy.skew)) {
              proxy.skew = skew;

              gsap.to(proxy, {
                skew: 0,
                duration: 0.8,
                ease: "power3.out",
                overwrite: true,
                onUpdate: () => setSkew(proxy.skew),
              });
            }
          },
        });
      }
    },
    { scope: sectionRef }
  );

  /* ---------------- AUTOPLAY + DOT PROGRESS ---------------- */

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const dots = root.querySelectorAll(".dot-fill");

    if (dots.length) {
      gsap.set(dots, {
        scaleX: 0,
        transformOrigin: "left center",
      });
    }

    const fill = root.querySelector(
      ".project-dot.active .dot-fill"
    );

    if (!fill) return;

    progRef.current?.kill();

    progRef.current = gsap.fromTo(
      fill,
      { scaleX: 0 },
      {
        scaleX: 1,
        transformOrigin: "left center",
        duration: AUTOPLAY_SECONDS,
        ease: "none",
        paused: pausedRef.current,

        onComplete: () => {
          setCurrentIndex((prev) =>
            prev >= maxIndex ? 0 : prev + 1
          );
        },
      }
    );

    return () => {
      progRef.current?.kill();
      progRef.current = null;
    };
  }, [currentIndex, maxIndex]);

  useEffect(() => {
    progRef.current?.paused(paused);
  }, [paused]);

  /* ---------------- CARD TILT ---------------- */

  const tiltMove = (e) => {
    if (reduce) return;

    const card = e.currentTarget;
    const image = card.querySelector(".project-image");
    const glare = card.querySelector(".glare");

    if (!image) return;

    const rect = card.getBoundingClientRect();

    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    gsap.to(image, {
      rotationY: (px - 0.5) * 14,
      rotationX: (0.5 - py) * 14,
      transformPerspective: 900,
      duration: 0.4,
      ease: "power2.out",
    });

    if (glare) {
      gsap.to(glare, {
        opacity: 0.55,
        background: `radial-gradient(circle at ${
          px * 100
        }% ${py * 100}%, rgba(255,255,255,.6), transparent 55%)`,
        duration: 0.2,
      });
    }
  };

  const tiltLeave = (e) => {
    const card = e.currentTarget;
    const image = card.querySelector(".project-image");
    const glare = card.querySelector(".glare");

    if (image) {
      gsap.to(image, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.7,
        ease: "elastic.out(1,0.5)",
      });
    }

    if (glare) {
      gsap.to(glare, {
        opacity: 0,
        duration: 0.3,
      });
    }
  };

  /* ---------------- MAGNETIC ARROWS ---------------- */

  const magnetMove = (e) => {
    if (reduce) return;

    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();

    gsap.to(button, {
      x: (e.clientX - (rect.left + rect.width / 2)) * 0.35,
      y: (e.clientY - (rect.top + rect.height / 2)) * 0.35,
      yPercent: -50,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const magnetLeave = (e) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      yPercent: -50,
      duration: 0.7,
      ease: "elastic.out(1,0.4)",
    });

    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.2,
      });
    }
  };

  const magnetEnter = () => {
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        opacity: 0,
        scale: 0,
        duration: 0.2,
      });
    }
  };

  /* ---------------- RIPPLE ---------------- */

  const ripple = (e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();

    const dot = document.createElement("span");
    dot.className = "ripple";

    dot.style.left = `${e.clientX - rect.left}px`;
    dot.style.top = `${e.clientY - rect.top}px`;

    button.appendChild(dot);

    gsap.fromTo(
      dot,
      { scale: 0, opacity: 0.6 },
      {
        scale: 5,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        onComplete: () => dot.remove(),
      }
    );
  };

  /* ---------------- SLIDE CONTROLS ---------------- */

  const nextSlide = (e) => {
    ripple(e);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = (e) => {
    ripple(e);
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  /* ---------------- JSX ---------------- */

  return (
    <section className="projects-section" ref={sectionRef}>
      <div className="projects-container">

        <div className="projects-heading">
          <h1 className="heading-title" aria-label="Our Latest Projects">
            <Word text="Our" />{" "}
            <Word text="Latest" className="hl" />{" "}
            <Word text="Projects" />
            <span className="title-underline" />
          </h1>

          <p>
            Showcase of beautiful green walls we've created for homes and businesses.
          </p>
        </div>

        <div
          className="projects-slider-wrapper"
          ref={wrapperRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          <div className="projects-slider-window">
            <div className="projects-slider" ref={sliderRef}>
              {projects.map((project) => (
                <div
                  className="project-slide"
                  key={project.id}
                  onMouseMove={tiltMove}
                  onMouseLeave={tiltLeave}
                >
                  <div className="project-card">
                    <div className="project-image">
                      <img
                        src={project.image}
                        alt={project.title}
                        draggable="false"
                      />
                      <span className="glare" />
                    </div>

                    <div className="project-info">
                      <div className="title-mask">
                        <h3 className="title-inner">{project.title}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            className="project-arrow project-prev"
            onClick={prevSlide}
            onMouseMove={magnetMove}
            onMouseEnter={magnetEnter}
            onMouseLeave={magnetLeave}
            aria-label="Previous project"
          >
            &#10094;
          </button>

          <button
            className="project-arrow project-next"
            onClick={nextSlide}
            onMouseMove={magnetMove}
            onMouseEnter={magnetEnter}
            onMouseLeave={magnetLeave}
            aria-label="Next project"
          >
            &#10095;
          </button>
        </div>

        <div className="projects-dots">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              className={`project-dot ${
                currentIndex === index ? "active" : ""
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            >
              <span className="dot-fill" />
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Gallery;
