
// import React, { useEffect, useRef, useState } from "react";
// import "./Gallery.css";

// import outdoorwall from "../../assets/outdoorwall.jpg";
// import indoorwall from "../../assets/indoorwall.jpg";
// import pvcplanter from "../../assets/pvcplanter.jpg";
// import greenwall from "../../assets/greenwall.jpg";
// import biopanel from "../../assets/biopanel.jpg";
// import artificialgrass from "../../assets/artificialgrass.jpg";

// const projects = [
//   {
//     id: 1,
//     image: outdoorwall,
//     title: "Vertical Outdoor Wall Garden",
//     plants: "petunia, verbena, bacopa",
//   },
//   {
//     id: 2,
//     image: indoorwall,
//     title: "Indoor Living Wall",
//     plants: "pothos, philodendron, ferns",
//   },
//   {
//     id: 3,
//     image: pvcplanter,
//     title: "Vertical Indoor Wall Garden",
//     plants: "monstera, scindapsus, syngonium",
//   },
//   {
//     id: 4,
//     image: greenwall,
//     title: "Modern Green Wall",
//     plants: "ferns, pothos, peace lily",
//   },
//   {
//     id: 5,
//     image: biopanel,
//     title: "Outdoor Vertical Garden",
//     plants: "succulents, ivy, herbs",
//   },
//   {
//     id: 6,
//     image: artificialgrass,
//     title: "Decorative Green Wall",
//     plants: "areca, fern, philodendron",
//   },
// ];

// const Gallery = () => {
//   const sliderRef = useRef(null);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [visible, setVisible] = useState(3);
//   const [paused, setPaused] = useState(false);

//   const maxIndex = projects.length - visible;

//   // Responsive cards
//   useEffect(() => {
//     const updateVisible = () => {
//       if (window.innerWidth <= 600) {
//         setVisible(1);
//       } else if (window.innerWidth <= 900) {
//         setVisible(2);
//       } else {
//         setVisible(3);
//       }
//     };

//     updateVisible();
//     window.addEventListener("resize", updateVisible);

//     return () => window.removeEventListener("resize", updateVisible);
//   }, []);

//   // Infinite automatic slider
//   useEffect(() => {
//     if (paused) return;

//     const timer = setInterval(() => {
//       setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
//     }, 3500);

//     return () => clearInterval(timer);
//   }, [maxIndex, paused]);

//   // Slider movement
//   useEffect(() => {
//     if (!sliderRef.current) return;

//     const firstCard = sliderRef.current.children[0];
//     if (!firstCard) return;

//     const gap =
//       parseFloat(window.getComputedStyle(sliderRef.current).gap) || 0;

//     const cardWidth = firstCard.offsetWidth;

//     sliderRef.current.style.transform =
//       `translateX(-${currentIndex * (cardWidth + gap)}px)`;
//   }, [currentIndex, visible]);

//   const nextSlide = () => {
//     setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
//   };

//   return (
//     <section className="projects-section">
//       <div className="projects-container">

//         <div className="projects-heading">
//           <h1>Our Latest Projects</h1>
//           <p>
//             Showcase of beautiful green walls we've created
//             for homes and businesses.
//           </p>
//         </div>

//         <div
//           className="projects-slider-wrapper"
//           onMouseEnter={() => setPaused(true)}
//           onMouseLeave={() => setPaused(false)}
//           onTouchStart={() => setPaused(true)}
//           onTouchEnd={() => setPaused(false)}
//         >
//           <div className="projects-slider-window">
//             <div className="projects-slider" ref={sliderRef}>
//               {projects.map((project) => (
//                 <div className="project-slide" key={project.id}>
//                   <div className="project-image">
//                     <img src={project.image} alt={project.title} />
//                   </div>

//                   <div className="project-info">
//                     <h3>{project.title}</h3>
//                     <p>Plant name :- {project.plants}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <button
//             className="project-arrow project-prev"
//             onClick={prevSlide}
//             aria-label="Previous project"
//           >
//             &#10094;
//           </button>

//           <button
//             className="project-arrow project-next"
//             onClick={nextSlide}
//             aria-label="Next project"
//           >
//             &#10095;
//           </button>
//         </div>

//         <div className="projects-dots">
//           {Array.from({ length: maxIndex + 1 }).map((_, index) => (
//             <button
//               key={index}
//               className={`project-dot ${
//                 currentIndex === index ? "active" : ""
//               }`}
//               onClick={() => setCurrentIndex(index)}
//               aria-label={`Go to slide ${index + 1}`}
//             />
//           ))}
//         </div>

//       </div>
//     </section>
//   );
// };

// export default Gallery;
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
  { id: 1, image: outdoorwall, title: "Vertical Outdoor Wall Garden", plants: "petunia, verbena, bacopa" },
  { id: 2, image: indoorwall, title: "Indoor Living Wall", plants: "pothos, philodendron, ferns" },
  { id: 3, image: pvcplanter, title: "Vertical Indoor Wall Garden", plants: "monstera, scindapsus, syngonium" },
  { id: 4, image: greenwall, title: "Modern Green Wall", plants: "ferns, pothos, peace lily" },
  { id: 5, image: biopanel, title: "Outdoor Vertical Garden", plants: "succulents, ivy, herbs" },
  { id: 6, image: artificialgrass, title: "Decorative Green Wall", plants: "areca, fern, philodendron" },
];

const AUTOPLAY_SECONDS = 3.5;

/* heading ke har akshar ko alag span mein (scroll fill ke liye) */
const Word = ({ text, className = "" }) => (
  <span className={`hw-wrap ${className}`}>
    {text.split("").map((c, i) => (
      <span className="ch" key={i}>
        {c}
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

  const maxIndex = projects.length - visible;

  /* refs taaki Draggable / timers ko hamesha latest value mile */
  const indexRef = useRef(0);
  const pausedRef = useRef(false);
  const progRef = useRef(null);
  const firstRun = useRef(true);
  indexRef.current = currentIndex;
  pausedRef.current = paused;

  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Responsive cards ---------- */
  useEffect(() => {
    const updateVisible = () => {
      if (window.innerWidth <= 600) setVisible(1);
      else if (window.innerWidth <= 900) setVisible(2);
      else setVisible(3);
    };
    updateVisible();
    window.addEventListener("resize", updateVisible);
    return () => window.removeEventListener("resize", updateVisible);
  }, []);

  /* visible badalne pe index bahar na nikle */
  useEffect(() => {
    setCurrentIndex((p) => Math.min(p, maxIndex));
  }, [maxIndex]);

  /* ---------- 1 + 2 + 8 + 9: SLIDE MOVE, 3D COVERFLOW, IMAGE ZOOM-OUT, CHIPS, TITLE ---------- */
  useGSAP(
    () => {
      const el = sliderRef.current;
      if (!el) return;

      const cards = [...el.children];
      const gap = parseFloat(getComputedStyle(el).gap) || 0;
      const step = cards[0].offsetWidth + gap;
      const instant = firstRun.current || reduce;

      gsap.to(el, {
        x: -currentIndex * step,
        duration: instant ? 0 : 0.9,
        ease: "power4.inOut",
        overwrite: true,
      });

      const center = currentIndex + Math.floor(visible / 2);

      cards.forEach((card, i) => {
        const d = i - center;
        const isCenter = d === 0;
        gsap.to(card, {
          scale: isCenter ? 1 : 0.86,
          rotationY: visible === 1 ? 0 : gsap.utils.clamp(-35, 35, d * -22),
          opacity: Math.abs(d) > 1 ? 0.35 : isCenter ? 1 : 0.6,
          z: isCenter ? 60 : 0,
          transformPerspective: 1200,
          duration: instant ? 0 : 0.9,
          ease: "power3.inOut",
          overwrite: "auto",
        });
      });

      if (!instant) {
        const c = cards[center];
        if (c) {
          /* 2. image zoom-out */
          gsap.fromTo(
            c.querySelector("img"),
            { scale: 1.25 },
            { scale: 1, duration: 1.4, ease: "power3.out" }
          );
          /* 9. title mask reveal */
          gsap.fromTo(
            c.querySelector(".title-inner"),
            { yPercent: 110 },
            { yPercent: 0, duration: 0.8, delay: 0.35, ease: "power3.out" }
          );
          /* 8. plant chips pop */
          gsap.fromTo(
            c.querySelectorAll(".chip"),
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, stagger: 0.1, delay: 0.5, duration: 0.5, ease: "back.out(2.5)" }
          );
        }
      }
      firstRun.current = false;
    },
    { dependencies: [currentIndex, visible], scope: sectionRef }
  );

  /* ---------- 5: FAN-OUT ENTRANCE + HEADING ---------- */
  useGSAP(
    () => {
      /* arrows ko vertical center rakhna (CSS mein translateY nahi hai) */
      gsap.set(".project-arrow", { yPercent: -50 });
      if (reduce) return;
      gsap.from(".project-card", {
        scale: 0.6,
        opacity: 0,
        y: 80,
        rotationY: 40,
        stagger: { each: 0.12, from: "center" },
        duration: 1,
        ease: "back.out(1.4)",
        scrollTrigger: { trigger: ".projects-slider-window", start: "top 80%", once: true },
      });
      /* HEADING 1: scroll karte hi akshar ek ek karke bharte hain (halka -> gehra, "Latest" green) */
      gsap.fromTo(
        ".heading-title .ch",
        { color: "#c5d6c9", yPercent: 45, opacity: 0.35 },
        {
          color: (i, el) => (el.closest(".hl") ? "#16a34a" : "#111827"),
          yPercent: 0,
          opacity: 1,
          stagger: 0.06,
          ease: "none",
          scrollTrigger: {
            trigger: ".projects-heading",
            start: "top 88%",
            end: "top 40%",
            scrub: 0.6,
          },
        }
      );

      /* HEADING 2: underline scroll ke saath draw hoti hai */
      gsap.fromTo(
        ".title-underline",
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: "center",
          ease: "none",
          scrollTrigger: {
            trigger: ".projects-heading",
            start: "top 70%",
            end: "top 40%",
            scrub: true,
          },
        }
      );

      /* paragraph bhi scroll ke saath aata hai */
      gsap.fromTo(
        ".projects-heading p",
        { y: 24, opacity: 0.15 },
        {
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".projects-heading",
            start: "top 65%",
            end: "top 35%",
            scrub: true,
          },
        }
      );

      /* HEADING 3: scroll speed se heading thodi jhukti hai, ruki to seedhi (velocity skew) */
      const setSkew = gsap.quickSetter(".heading-title", "skewX", "deg");
      const clampSkew = gsap.utils.clamp(-6, 6);
      const proxy = { skew: 0 };
      ScrollTrigger.create({
        trigger: ".projects-section",
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
    },
    { scope: sectionRef }
  );

  /* ---------- 4: DRAG TO SWIPE (snap) ---------- */
  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;

    const gap = parseFloat(getComputedStyle(el).gap) || 0;
    const step = el.children[0].offsetWidth + gap;
    const max = projects.length - visible;

    const [drag] = Draggable.create(el, {
      type: "x",
      bounds: { minX: -max * step, maxX: 0 },
      edgeResistance: 0.8,
      dragClickables: false,
      onPress() {
        progRef.current?.pause();
        gsap.to(cursorRef.current, { scale: 0.8, duration: 0.2 });
      },
      onRelease() {
        gsap.to(cursorRef.current, { scale: 1, duration: 0.2 });
        const dx = this.x + indexRef.current * step; /* kitna kheencha */
        let idx = indexRef.current;
        if (Math.abs(dx) > step * 0.2) idx += dx < 0 ? 1 : -1;
        idx = gsap.utils.clamp(0, max, idx);

        if (idx === indexRef.current) {
          gsap.to(el, { x: -idx * step, duration: 0.6, ease: "power3.out" });
          progRef.current?.paused(pausedRef.current);
        } else {
          setCurrentIndex(idx);
        }
      },
    });

    return () => drag.kill();
  }, [visible]);

  /* ---------- 6: AUTOPLAY + PROGRESS DOT (timer aur dot ek hi tween) ---------- */
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    gsap.set(root.querySelectorAll(".dot-fill"), { scaleX: 0 });
    const fill = root.querySelector(".project-dot.active .dot-fill");
    if (!fill) return;

    progRef.current = gsap.fromTo(
      fill,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: AUTOPLAY_SECONDS,
        ease: "none",
        paused: pausedRef.current,
        onComplete: () => setCurrentIndex((p) => (p >= maxIndex ? 0 : p + 1)),
      }
    );
    return () => progRef.current?.kill();
  }, [currentIndex, maxIndex]);

  useEffect(() => {
    progRef.current?.paused(paused);
  }, [paused]);

  /* ---------- 7: CUSTOM "DRAG" CURSOR ---------- */
  useEffect(() => {
    const wrap = wrapperRef.current;
    const cur = cursorRef.current;
    if (!wrap || !cur) return;
    if (!window.matchMedia("(hover: hover)").matches || reduce) return;

    gsap.set(cur, { xPercent: -50, yPercent: -50, scale: 0, opacity: 0 });
    const qx = gsap.quickTo(cur, "x", { duration: 0.35, ease: "power3.out" });
    const qy = gsap.quickTo(cur, "y", { duration: 0.35, ease: "power3.out" });

    const move = (e) => {
      const r = wrap.getBoundingClientRect();
      qx(e.clientX - r.left);
      qy(e.clientY - r.top);
    };
    const enter = () => gsap.to(cur, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(2)" });
    const leave = () => gsap.to(cur, { scale: 0, opacity: 0, duration: 0.25 });

    wrap.addEventListener("mousemove", move);
    wrap.addEventListener("mouseenter", enter);
    wrap.addEventListener("mouseleave", leave);
    return () => {
      wrap.removeEventListener("mousemove", move);
      wrap.removeEventListener("mouseenter", enter);
      wrap.removeEventListener("mouseleave", leave);
    };
  }, []);

  /* ---------- 3: TILT + GLARE ---------- */
  const tiltMove = (e) => {
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    gsap.to(card.querySelector(".project-image"), {
      rotationY: (px - 0.5) * 14,
      rotationX: (0.5 - py) * 14,
      transformPerspective: 900,
      duration: 0.4,
      ease: "power2.out",
    });
    gsap.to(card.querySelector(".glare"), {
      opacity: 0.55,
      background: `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,.6), transparent 55%)`,
      duration: 0.2,
    });
  };
  const tiltLeave = (e) => {
    const card = e.currentTarget;
    gsap.to(card.querySelector(".project-image"), {
      rotationY: 0,
      rotationX: 0,
      duration: 0.7,
      ease: "elastic.out(1,0.5)",
    });
    gsap.to(card.querySelector(".glare"), { opacity: 0, duration: 0.3 });
  };

  /* ---------- 10: MAGNETIC ARROWS + RIPPLE ---------- */
  const magnetMove = (e) => {
    const b = e.currentTarget;
    const r = b.getBoundingClientRect();
    gsap.to(b, {
      x: (e.clientX - (r.left + r.width / 2)) * 0.35,
      y: (e.clientY - (r.top + r.height / 2)) * 0.35,
      yPercent: -50,
      duration: 0.3,
      ease: "power2.out",
    });
  };
  const magnetLeave = (e) => {
    gsap.to(e.currentTarget, { x: 0, y: 0, yPercent: -50, duration: 0.7, ease: "elastic.out(1,0.4)" });
    gsap.to(cursorRef.current, { opacity: 1, scale: 1, duration: 0.2 });
  };
  const magnetEnter = () => gsap.to(cursorRef.current, { opacity: 0, scale: 0, duration: 0.2 });

  const ripple = (e) => {
    const b = e.currentTarget;
    const r = b.getBoundingClientRect();
    const dot = document.createElement("span");
    dot.className = "ripple";
    dot.style.left = e.clientX - r.left + "px";
    dot.style.top = e.clientY - r.top + "px";
    b.appendChild(dot);
    gsap.fromTo(
      dot,
      { scale: 0, opacity: 0.6 },
      { scale: 5, opacity: 0, duration: 0.7, ease: "power2.out", onComplete: () => dot.remove() }
    );
  };

  const nextSlide = (e) => {
    ripple(e);
    setCurrentIndex((p) => (p >= maxIndex ? 0 : p + 1));
  };
  const prevSlide = (e) => {
    ripple(e);
    setCurrentIndex((p) => (p <= 0 ? maxIndex : p - 1));
  };

  return (
    <section className="projects-section" ref={sectionRef}>
      <div className="projects-container">
        <div className="projects-heading">
          <h1 className="heading-title" aria-label="Our Latest Projects">
            <Word text="Our" /> <Word text="Latest" className="hl" /> <Word text="Projects" />
            <span className="title-underline" />
          </h1>
          <p>Showcase of beautiful green walls we've created for homes and businesses.</p>
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
                      <img src={project.image} alt={project.title} draggable="false" />
                      <span className="glare" />
                    </div>

                    <div className="project-info">
                      <div className="title-mask">
                        <h3 className="title-inner">{project.title}</h3>
                      </div>
                      <div className="plant-row">
                        <span className="plant-label">Plant name :-</span>
                        {project.plants.split(", ").map((p) => (
                          <span className="chip" key={p}>
                            ❧ {p}
                          </span>
                        ))}
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

          <div className="gal-cursor" ref={cursorRef} aria-hidden="true">
            <span>Drag</span>
          </div>
        </div>

        <div className="projects-dots">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              className={`project-dot ${currentIndex === index ? "active" : ""}`}
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