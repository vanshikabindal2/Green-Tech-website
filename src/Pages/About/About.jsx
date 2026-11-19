
// import React from "react";
// import { Link } from "react-router-dom";

// import {
//   FiCheck,
//   FiArrowRight,
// } from "react-icons/fi";

// import "./About.css";

// import outdoorwall from "../../assets/outdoorwall.jpg";
// import indoorwall from "../../assets/indoorwall.jpg";
// const About = () => {
//   const features = [
//     "Vertical Gardens & Living Walls",
//     "Custom Green Wall Design",
//     "Professional Installation",
//     "Expert Plant Selection",
//     "Smart Irrigation Systems",
//     "Long-term Maintenance",
//   ];

//   return (
//     <section className="gt-about">

//       <div className="gt-about-container">

//         {/* SECTION HEADER */}
//         <div className="gt-about-heading">

//           <span className="gt-about-label">
//             <span className="gt-leaf-icon">❧</span>
//             Our Story
//           </span>

//           <h1>
//             About Our <span>Company</span>
//           </h1>

//           <p>
//             14+ Years of Creating Beautiful, Sustainable Green Walls
//           </p>

//           <div className="gt-heading-line"></div>

//         </div>

//         {/* MAIN CONTENT */}
//         <div className="gt-about-grid">

//           {/* LEFT CONTENT */}
//           <div className="gt-about-left">

//             {/* EXPERIENCE CARD */}
//             <div className="gt-experience-card">

//               <div className="gt-experience-icon">
//                 <span className="gt-leaf-icon">❧</span>
//               </div>

//               <div>
//                 <h2>14+</h2>
//                 <h4>Years of Experience</h4>
//                 <p>Creating Premium Green Walls</p>
//               </div>

//             </div>

//             {/* DESCRIPTION */}
//             <div className="gt-about-description">

//               <p>
//                 With over 14 years of experience, we specialize in
//                 creating innovative green wall and vertical garden
//                 solutions that transform ordinary spaces into vibrant,
//                 living environments. Our expertise combines thoughtful
//                 design, quality plants, reliable installation, and
//                 professional maintenance to deliver green spaces that
//                 are both beautiful and sustainable.
//               </p>

//               <p>
//                 From commercial buildings and corporate spaces to
//                 outdoor environments and architectural projects, we
//                 create customized green wall solutions designed to
//                 complement the character of every space. Our goal is
//                 to bring nature closer to people while enhancing the
//                 visual appeal and environmental quality of modern
//                 buildings.
//               </p>

//             </div>

//             {/* FEATURES */}
//             <div className="gt-about-features">

//               <h3>
//                 Transforming Spaces with <span>Green Walls</span>
//               </h3>

//               <div className="gt-feature-grid">

//                 {features.map((feature, index) => (
//                   <div className="gt-feature-item" key={index}>

//                     <span className="gt-feature-check">
//                       <FiCheck />
//                     </span>

//                     <p>{feature}</p>

//                   </div>
//                 ))}

//               </div>

//             </div>

//             {/* BUTTON */}
//             <Link to="/services" className="gt-about-button">
//               Explore Our Services
//               <FiArrowRight />
//             </Link>

//           </div>

//           {/* RIGHT IMAGE SECTION */}
//           <div className="gt-about-right">

//             {/* MAIN IMAGE */}
//             <div className="gt-about-image-main">

//               <img
//                 src={outdoorwall}
//                 alt="Beautiful vertical green wall"
//               />

//               <div className="gt-image-overlay">
//                 <span>GREEN LIVING</span>
//                 <h3>Nature Meets Modern Design</h3>
//               </div>

//             </div>

//             {/* SMALL IMAGE */}
//             <div className="gt-about-image-small">

//               <img
//                 src={indoorwall}
//                 alt="Premium indoor green wall"
//               />

//             </div>

//             {/* FLOATING BADGE */}
//             <div className="gt-image-experience">

//               <span className="gt-leaf-icon">❧</span>

//               <div>
//                 <strong>14+</strong>
//                 <span>Years of Excellence</span>
//               </div>

//             </div>

//             {/* DECORATIVE CIRCLE */}
//             <div className="gt-about-circle"></div>

//           </div>

//         </div>

//       </div>

//     </section>
//   );
// };

// export default About;
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { FiCheck, FiArrowRight } from "react-icons/fi";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import "./About.css";

import outdoorwall from "../../assets/outdoorwall.jpg";
import indoorwall from "../../assets/indoorwall.jpg";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/* description ke words alag karne ke liye (word-by-word highlight) */
const splitWords = (text) =>
  text.split(" ").map((w, i) => (
    <span className="word" key={i}>
      {w}{" "}
    </span>
  ));

const para1 =
  "With over 14 years of experience, we specialize in creating innovative green wall and vertical garden solutions that transform ordinary spaces into vibrant, living environments. Our expertise combines thoughtful design, quality plants, reliable installation, and professional maintenance to deliver green spaces that are both beautiful and sustainable.";

const para2 =
  "From commercial buildings and corporate spaces to outdoor environments and architectural projects, we create customized green wall solutions designed to complement the character of every space. Our goal is to bring nature closer to people while enhancing the visual appeal and environmental quality of modern buildings.";

const About = () => {
  const root = useRef(null);

  const features = [
    "Vertical Gardens & Living Walls",
    "Custom Green Wall Design",
    "Professional Installation",
    "Expert Plant Selection",
    "Smart Irrigation Systems",
    "Long-term Maintenance",
  ];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* 3 + 9. HEADING: mask reveal + line draw */
        gsap
          .timeline({
            scrollTrigger: { trigger: ".gt-about-heading", start: "top 80%" },
            defaults: { ease: "power3.out" },
          })
          .from(".gt-about-label", { y: 20, opacity: 0, duration: 0.5 })
          .from(
            ".gt-hw",
            { yPercent: 110, rotate: 4, stagger: 0.12, duration: 0.9 },
            "-=0.2"
          )
          .from(".gt-about-heading p", { y: 20, opacity: 0, duration: 0.5 }, "-=0.4")
          .from(
            ".gt-heading-line",
            { scaleX: 0, transformOrigin: "left center", duration: 0.9 },
            "-=0.3"
          );

        /* 1. IMAGE "GROWING" REVEAL (neeche se upar) */
        gsap.fromTo(
          ".gt-about-image-main",
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.4,
            ease: "power4.inOut",
            scrollTrigger: { trigger: ".gt-about-right", start: "top 75%" },
          }
        );
        gsap.from(".gt-about-image-main img", {
          scale: 1.4,
          duration: 1.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".gt-about-right", start: "top 75%" },
        });
        gsap.from(".gt-image-overlay", {
          y: 40,
          opacity: 0,
          duration: 0.8,
          delay: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".gt-about-right", start: "top 75%" },
        });
        gsap.from(".gt-about-image-small", {
          clipPath: "inset(0% 100% 0% 0%)",
          duration: 1.1,
          delay: 0.6,
          ease: "power4.inOut",
          scrollTrigger: { trigger: ".gt-about-right", start: "top 75%" },
        });
        gsap.from(".gt-image-experience", {
          scale: 0,
          rotate: -20,
          duration: 0.8,
          delay: 1.3,
          ease: "back.out(2)",
          scrollTrigger: { trigger: ".gt-about-right", start: "top 75%" },
        });

        /* 5. PARALLAX: badi image dheere, chhoti image tezi se */
        gsap.to(".gt-about-image-main img", {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: ".gt-about-right",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
        gsap.to(".gt-about-image-small", {
          y: -70,
          ease: "none",
          scrollTrigger: {
            trigger: ".gt-about-right",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        /* 4. COUNTERS (experience card + floating badge) */
        gsap.utils.toArray(".gt-count").forEach((el) => {
          const target = parseInt(el.dataset.target, 10);
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 2,
            ease: "power2.out",
            snap: { val: 1 },
            onUpdate: () => (el.textContent = obj.val + "+"),
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          });
        });

        /* experience card entrance */
        gsap.from(".gt-experience-card", {
          x: -60,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".gt-experience-card", start: "top 85%" },
        });

        /* 2. WORD-BY-WORD HIGHLIGHT (scroll scrub) */
        gsap.fromTo(
          ".gt-about-description .word",
          { opacity: 0.15 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: {
              trigger: ".gt-about-description",
              start: "top 80%",
              end: "bottom 55%",
              scrub: true,
            },
          }
        );

        /* features heading + items ek ek karke */
        gsap.from(".gt-about-features h3", {
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: ".gt-about-features", start: "top 85%" },
        });
        gsap.from(".gt-feature-item", {
          y: 30,
          opacity: 0,
          stagger: 0.12,
          duration: 0.6,
          ease: "back.out(1.5)",
          scrollTrigger: { trigger: ".gt-feature-grid", start: "top 88%" },
        });
        gsap.from(".gt-about-button", {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: ".gt-about-button", start: "top 95%" },
        });

        /* 6. LEAF SWAY (hawa mein hilta hua) */
        gsap.to(".gt-leaf-icon", {
          rotate: 14,
          transformOrigin: "50% 100%",
          yoyo: true,
          repeat: -1,
          duration: 1.8,
          ease: "sine.inOut",
          stagger: { each: 0.3, from: "random" },
        });

        /* decorative circle: halka tairta hua (xPercent/yPercent, taaki mouse x/y se na takraye) */
        gsap.to(".gt-about-circle", {
          yPercent: 8,
          xPercent: -6,
          yoyo: true,
          repeat: -1,
          duration: 3,
          ease: "sine.inOut",
        });
      });

      /* 7. MOUSE MOVE: badge aur circle ulti direction mein (sirf mouse wale devices pe) */
      mm.add(
        "(hover: hover) and (prefers-reduced-motion: no-preference)",
        () => {
          const area = root.current.querySelector(".gt-about-right");
          if (!area) return;

          const badgeX = gsap.quickTo(".gt-image-experience", "x", { duration: 0.6, ease: "power3.out" });
          const badgeY = gsap.quickTo(".gt-image-experience", "y", { duration: 0.6, ease: "power3.out" });
          const circX = gsap.quickTo(".gt-about-circle", "x", { duration: 0.9, ease: "power3.out" });
          const circY = gsap.quickTo(".gt-about-circle", "y", { duration: 0.9, ease: "power3.out" });

          const onMove = (e) => {
            const r = area.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - 0.5;
            const py = (e.clientY - r.top) / r.height - 0.5;
            badgeX(px * 30);
            badgeY(py * 30);
            circX(px * -50);
            circY(py * -50);
          };
          const onLeave = () => {
            badgeX(0);
            badgeY(0);
            circX(0);
            circY(0);
          };

          area.addEventListener("mousemove", onMove);
          area.addEventListener("mouseleave", onLeave);
          return () => {
            area.removeEventListener("mousemove", onMove);
            area.removeEventListener("mouseleave", onLeave);
          };
        }
      );
    },
    { scope: root }
  );

  /* 8. FEATURE CHECK HOVER */
  const featIn = (e) => {
    const check = e.currentTarget.querySelector(".gt-feature-check");
    gsap.to(check, {
      rotate: 360,
      scale: 1.25,
      backgroundColor: "#16a34a",
      color: "#ffffff",
      duration: 0.5,
      ease: "back.out(2)",
    });
    gsap.to(e.currentTarget, { x: 6, duration: 0.3, ease: "power2.out" });
  };
  const featOut = (e) => {
    const check = e.currentTarget.querySelector(".gt-feature-check");
    gsap.to(check, {
      rotate: 0,
      scale: 1,
      duration: 0.4,
      ease: "power2.out",
      clearProps: "backgroundColor,color",
    });
    gsap.to(e.currentTarget, { x: 0, duration: 0.3, ease: "power2.out" });
  };

  return (
    <section className="gt-about" ref={root}>
      <div className="gt-about-container">
        {/* SECTION HEADER */}
        <div className="gt-about-heading">
          <span className="gt-about-label">
            <span className="gt-leaf-icon">❧</span>
            Our Story
          </span>

          <h1>
            <span className="gt-mask">
              <span className="gt-hw">About</span>
            </span>{" "}
            <span className="gt-mask">
              <span className="gt-hw">Our</span>
            </span>{" "}
            <span className="gt-mask">
              <span className="gt-hw gt-green">Company</span>
            </span>
          </h1>

          <p>14+ Years of Creating Beautiful, Sustainable Green Walls</p>

          <div className="gt-heading-line"></div>
        </div>

        {/* MAIN CONTENT */}
        <div className="gt-about-grid">
          {/* LEFT CONTENT */}
          <div className="gt-about-left">
            {/* EXPERIENCE CARD */}
            <div className="gt-experience-card">
              <div className="gt-experience-icon">
                <span className="gt-leaf-icon">❧</span>
              </div>

              <div>
                <h2 className="gt-count" data-target="14">0+</h2>
                <h4>Years of Experience</h4>
                <p>Creating Premium Green Walls</p>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="gt-about-description">
              <p>{splitWords(para1)}</p>
              <p>{splitWords(para2)}</p>
            </div>

            {/* FEATURES */}
            <div className="gt-about-features">
              <h3>
                Transforming Spaces with <span>Green Walls</span>
              </h3>

              <div className="gt-feature-grid">
                {features.map((feature, index) => (
                  <div
                    className="gt-feature-item"
                    key={index}
                    onMouseEnter={featIn}
                    onMouseLeave={featOut}
                  >
                    <span className="gt-feature-check">
                      <FiCheck />
                    </span>
                    <p>{feature}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* BUTTON */}
            <Link to="/service" className="gt-about-button">
              Explore Our Services
              <FiArrowRight />
            </Link>
          </div>

          {/* RIGHT IMAGE SECTION */}
          <div className="gt-about-right">
            <div className="gt-about-image-main">
              <img src={outdoorwall} alt="Beautiful vertical green wall" />
              <div className="gt-image-overlay">
                <span>GREEN LIVING</span>
                <h3>Nature Meets Modern Design</h3>
              </div>
            </div>

            <div className="gt-about-image-small">
              <img src={indoorwall} alt="Premium indoor green wall" />
            </div>

            <div className="gt-image-experience">
              <span className="gt-leaf-icon">❧</span>
              <div>
                <strong className="gt-count" data-target="14">0+</strong>
                <span>Years of Excellence</span>
              </div>
            </div>

            <div className="gt-about-circle"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;