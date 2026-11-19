// import React, { useRef, useState } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { ScrollToPlugin } from "gsap/ScrollToPlugin";
// import { useGSAP } from "@gsap/react";
// import { FiArrowUp, FiArrowRight, FiArrowUpRight, FiCheckCircle } from "react-icons/fi";
// import "./Footer.css";

// // Apne logo ka sahi path / naam yahan daalein
// import logo from "../../assets/logo.png";

// gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP);

// const marqueeItems = [
//   "Wall Design",
//   "Installation",
//   "Maintenance",
//   "Bio Walls",
//   "Terrace Gardens",
//   "Artificial Grass",
//   "Support",
// ];

// const quickLinks = [
//   { label: "Products", href: "#products" },
//   { label: "Gallery", href: "#gallery" },
//   { label: "Services", href: "#services" },
//   { label: "Contact", href: "#contact" },
// ];

// const socials = [
//   { name: "Facebook", href: "#" },
//   { name: "LinkedIn", href: "#" },
//   { name: "Instagram", href: "#" },
// ];

// const WORDMARK = "GreenTech".split("");

// // Vine par patte: x, y, rotation
// const leaves = [
//   { x: 150, y: 38, r: -35 },
//   { x: 310, y: 82, r: 150 },
//   { x: 470, y: 40, r: -30 },
//   { x: 640, y: 62, r: 140 },
//   { x: 800, y: 70, r: -40 },
//   { x: 960, y: 36, r: 145 },
//   { x: 1110, y: 72, r: -30 },
// ];

// const Footer = () => {
//   const footerRef = useRef(null);
//   const ctaBtnRef = useRef(null);
//   const [email, setEmail] = useState("");
//   const [error, setError] = useState("");
//   const [status, setStatus] = useState("idle"); // idle | sending | success

//   /* ---------------- GSAP ---------------- */
//   useGSAP(
//     () => {
//       const mm = gsap.matchMedia();

//       mm.add("(prefers-reduced-motion: no-preference)", () => {
//         // 1) Marquee: infinite loop, hover par slow
//         const marquee = gsap.to(".marquee-track", {
//           xPercent: -50,
//           duration: 28,
//           ease: "none",
//           repeat: -1,
//         });
//         const strip = footerRef.current.querySelector(".marquee");
//         const slow = () => gsap.to(marquee, { timeScale: 0.15, duration: 0.5 });
//         const fast = () => gsap.to(marquee, { timeScale: 1, duration: 0.5 });
//         strip.addEventListener("mouseenter", slow);
//         strip.addEventListener("mouseleave", fast);

//         // 2) Vine draw + patte pop
//         gsap.set(".vine-path", { strokeDasharray: 1, strokeDashoffset: 1 });
//         const vine = gsap.timeline({
//           scrollTrigger: { trigger: ".vine", start: "top 90%", once: true },
//         });
//         vine
//           .to(".vine-path", { strokeDashoffset: 0, duration: 2.4, ease: "power2.inOut" })
//           .from(
//             ".vine-leaf",
//             { scale: 0, opacity: 0, duration: 0.6, stagger: 0.12, ease: "back.out(2.5)" },
//             0.4
//           );

//         // 3) CTA reveal
//         gsap
//           .timeline({
//             defaults: { ease: "power3.out" },
//             scrollTrigger: { trigger: ".footer-cta", start: "top 80%", once: true },
//           })
//           .from(".cta-line", { yPercent: 110, duration: 0.9, stagger: 0.12 })
//           .from(".cta-extra", { y: 24, opacity: 0, duration: 0.7, stagger: 0.1 }, "-=0.4");

//         // 4) Columns
//         gsap.from(".footer-col", {
//           y: 36,
//           opacity: 0,
//           duration: 0.8,
//           stagger: 0.12,
//           ease: "power3.out",
//           scrollTrigger: { trigger: ".footer-grid", start: "top 88%", once: true },
//         });

//         // 5) Giant wordmark: har letter neeche se uthta hai
//         gsap.from(".wm-char span", {
//           yPercent: 110,
//           duration: 1.1,
//           stagger: 0.07,
//           ease: "power4.out",
//           scrollTrigger: { trigger: ".wordmark", start: "top 98%", once: true },
//         });

//         return () => {
//           strip.removeEventListener("mouseenter", slow);
//           strip.removeEventListener("mouseleave", fast);
//         };
//       });

//       // 6) Magnetic CTA button (sirf mouse devices par)
//       mm.add("(hover: hover) and (prefers-reduced-motion: no-preference)", () => {
//         const btn = ctaBtnRef.current;
//         const move = (e) => {
//           const r = btn.getBoundingClientRect();
//           const x = (e.clientX - (r.left + r.width / 2)) * 0.35;
//           const y = (e.clientY - (r.top + r.height / 2)) * 0.35;
//           gsap.to(btn, { x, y, duration: 0.3, ease: "power2.out" });
//         };
//         const leave = () =>
//           gsap.to(btn, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.35)" });

//         btn.addEventListener("mousemove", move);
//         btn.addEventListener("mouseleave", leave);
//         return () => {
//           btn.removeEventListener("mousemove", move);
//           btn.removeEventListener("mouseleave", leave);
//         };
//       });
//     },
//     { scope: footerRef }
//   );

//   const scrollToTop = () => {
//     gsap.to(window, { duration: 1, scrollTo: 0, ease: "power3.inOut" });
//   };

//   /* ---------------- Newsletter ---------------- */
//   const handleSubscribe = async (e) => {
//     e.preventDefault();

//     if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
//       setError("Please enter a valid email address.");
//       gsap.fromTo(".nl-field", { x: -6 }, { x: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
//       return;
//     }

//     setError("");
//     setStatus("sending");

//     try {
//       // TODO: yahan apni newsletter API / Mailchimp / EmailJS call lagayein
//       await new Promise((r) => setTimeout(r, 800)); // demo delay

//       setStatus("success");
//       setEmail("");
//       requestAnimationFrame(() => {
//         gsap.from(".nl-success", { y: 10, opacity: 0, duration: 0.5, ease: "power2.out" });
//       });
//     } catch (err) {
//       setStatus("idle");
//       setError("Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <footer className="footer" ref={footerRef}>
//       {/* Services marquee */}
//       <div className="marquee" aria-hidden="true">
//         <div className="marquee-track">
//           {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
//             <span key={i} className="marquee-item">
//               {item}
//               <i className="marquee-dot" />
//             </span>
//           ))}
//         </div>
//       </div>

//       <div className="footer-container">
//         {/* CTA */}
//         <div className="footer-cta">
//           <h2>
//             <span className="cta-mask">
//               <span className="cta-line">Ready to turn</span>
//             </span>
//             <span className="cta-mask">
//               <span className="cta-line">your wall green?</span>
//             </span>
//           </h2>

//           <div className="cta-side">
//             <p className="cta-extra">
//               Tell us about your space. We'll design, install and maintain it end to end.
//             </p>
//             <a href="#contact" className="cta-btn cta-extra" ref={ctaBtnRef}>
//               Get a free quote <FiArrowUpRight />
//             </a>
//           </div>
//         </div>

//         {/* Vine divider */}
//         <svg className="vine" viewBox="0 0 1200 110" fill="none" aria-hidden="true">
//           <path
//             className="vine-path"
//             pathLength="1"
//             d="M0 58 C150 6 250 110 400 58 S650 6 800 58 S1050 110 1200 58"
//           />
//           {leaves.map((l, i) => (
//             <path
//               key={i}
//               className="vine-leaf"
//               d="M0 0 C8 -14 26 -14 32 0 C26 14 8 14 0 0 Z"
//               transform={`translate(${l.x} ${l.y}) rotate(${l.r})`}
//             />
//           ))}
//         </svg>

//         {/* Main grid */}
//         <div className="footer-grid">
//           <div className="footer-col footer-brand">
//             <img src={logo} alt="GreenTech Solution logo" className="footer-logo" />
//             <p>Transforming spaces with premium green wall solutions since 2015.</p>
//             <a className="big-phone" href="tel:+918043880537">
//               08043880537
//             </a>
//             <a className="mail-link" href="mailto:rajeshkumarparbhat@gmail.com">
//               rajeshkumarparbhat@gmail.com
//             </a>
//           </div>

//           <nav className="footer-col" aria-label="Quick links">
//             <h4>Explore</h4>
//             <ul>
//               {quickLinks.map((l) => (
//                 <li key={l.label}>
//                   <a href={l.href} className="slide-link">
//                     <span>{l.label}</span>
//                     <span aria-hidden="true">{l.label}</span>
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </nav>

//           <nav className="footer-col" aria-label="Social media">
//             <h4>Follow</h4>
//             <ul>
//               {socials.map((s) => (
//                 <li key={s.name}>
//                   <a href={s.href} target="_blank" rel="noreferrer" className="social-link">
//                     {s.name} <FiArrowUpRight />
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </nav>

//           <div className="footer-col">
//             <h4>Newsletter</h4>
//             <p className="nl-text">Green wall ideas, straight to your inbox.</p>

//             <form onSubmit={handleSubscribe} noValidate>
//               <div className={`nl-field ${error ? "has-error" : ""}`}>
//                 <label htmlFor="nl-email" className="sr-only">
//                   Email address
//                 </label>
//                 <input
//                   id="nl-email"
//                   type="email"
//                   placeholder="your@email.com"
//                   value={email}
//                   onChange={(e) => {
//                     setEmail(e.target.value);
//                     if (error) setError("");
//                   }}
//                   aria-invalid={!!error}
//                   aria-describedby={error ? "nl-error" : undefined}
//                 />
//                 <button type="submit" aria-label="Subscribe" disabled={status === "sending"}>
//                   <FiArrowRight />
//                 </button>
//               </div>

//               {error && (
//                 <p className="nl-error" id="nl-error" role="alert">
//                   {error}
//                 </p>
//               )}
//               {status === "success" && (
//                 <p className="nl-success" role="status">
//                   <FiCheckCircle aria-hidden="true" /> You're on the list!
//                 </p>
//               )}
//             </form>
//           </div>
//         </div>

//         {/* Giant wordmark */}
//         <div className="wordmark" aria-hidden="true">
//           {WORDMARK.map((ch, i) => (
//             <span className="wm-char" key={i}>
//               <span>{ch}</span>
//             </span>
//           ))}
//         </div>

//         {/* Bottom bar */}
//         <div className="footer-bottom">
//           <p>© {new Date().getFullYear()} GreenTech Solution Private Limited. All rights reserved.</p>

//           <div className="footer-legal">
//             <a href="#privacy">Privacy</a>
//             <a href="#terms">Terms</a>
//             <a href="#sitemap">Sitemap</a>
//           </div>

//           <button type="button" className="to-top" onClick={scrollToTop} aria-label="Back to top">
//             <FiArrowUp />
//           </button>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";
import { FiArrowUp, FiArrowRight, FiArrowUpRight, FiCheckCircle } from "react-icons/fi";
import "./Footer.css";

// Apne logo ka sahi path / naam yahan daalein
import logo from "../../assets/logo.png";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP);

const marqueeItems = [
  "Wall Design",
  "Installation",
  "Maintenance",
  "Bio Walls",
  "Terrace Gardens",
  "Artificial Grass",
  "Support",
];

const quickLinks = [
  { label: "Products", href: "/products" },
  { label: "Gallery", href: "/gallery" },
  { label: "Services", href: "/service" },
  { label: "Contact", href: "/contact" },
];

const socials = [
  { name: "Wall Design"},
  { name: "Installation" },
  { name: "Maintenance" },
  { name: "Support" },

];

const WORDMARK = "GreenTech".split("");

// Vine par patte: x, y, rotation
const leaves = [
  { x: 150, y: 38, r: -35 },
  { x: 310, y: 82, r: 150 },
  { x: 470, y: 40, r: -30 },
  { x: 640, y: 62, r: 140 },
  { x: 800, y: 70, r: -40 },
  { x: 960, y: 36, r: 145 },
  { x: 1110, y: 72, r: -30 },
];

const Footer = () => {
  const footerRef = useRef(null);
  const ctaBtnRef = useRef(null);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | success

  /* ---------------- GSAP ---------------- */
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // 1) Marquee: infinite loop, hover par slow
        const marquee = gsap.to(".marquee-track", {
          xPercent: -50,
          duration: 28,
          ease: "none",
          repeat: -1,
        });
        const strip = footerRef.current.querySelector(".marquee");
        const slow = () => gsap.to(marquee, { timeScale: 0.15, duration: 0.5 });
        const fast = () => gsap.to(marquee, { timeScale: 1, duration: 0.5 });
        strip.addEventListener("mouseenter", slow);
        strip.addEventListener("mouseleave", fast);

        // 2) Vine draw + patte pop
        gsap.set(".vine-path", { strokeDasharray: 1, strokeDashoffset: 1 });
        const vine = gsap.timeline({
          scrollTrigger: { trigger: ".vine", start: "top 90%", once: true },
        });
        vine
          .to(".vine-path", { strokeDashoffset: 0, duration: 2.4, ease: "power2.inOut" })
          .from(
            ".vine-leaf",
            { scale: 0, opacity: 0, duration: 0.6, stagger: 0.12, ease: "back.out(2.5)" },
            0.4
          );

        // 3) CTA reveal
        gsap
          .timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: { trigger: ".footer-cta", start: "top 80%", once: true },
          })
          .from(".cta-line", { yPercent: 110, duration: 0.9, stagger: 0.12 })
          .from(".cta-extra", { y: 24, opacity: 0, duration: 0.7, stagger: 0.1 }, "-=0.4");

        // 4) Columns
        gsap.from(".footer-col", {
          y: 36,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: ".footer-grid", start: "top 88%", once: true },
        });

        // 5) Giant wordmark: har letter neeche se uthta hai
        gsap.from(".wm-char span", {
          yPercent: 110,
          duration: 1.1,
          stagger: 0.07,
          ease: "power4.out",
          scrollTrigger: { trigger: ".wordmark", start: "top 98%", once: true },
        });

        // 5b) GreenTech apne aap dark/lime hota rahe (wave loop, bina hover ke)
        gsap
          .timeline({
            scrollTrigger: { trigger: ".wordmark", start: "top 98%", once: true },
            delay: 1.8, // letters upar uthne ke baad shuru
            repeat: -1,
            yoyo: true,
            repeatDelay: 0.8,
          })
          .to(".wm-char span", {
            color: "#b8e063",
            duration: 0.5,
            stagger: 0.18,
            ease: "sine.inOut",
          });

        return () => {
          strip.removeEventListener("mouseenter", slow);
          strip.removeEventListener("mouseleave", fast);
        };
      });

      // 6) Magnetic CTA button (sirf mouse devices par)
      mm.add("(hover: hover) and (prefers-reduced-motion: no-preference)", () => {
        const btn = ctaBtnRef.current;
        const move = (e) => {
          const r = btn.getBoundingClientRect();
          const x = (e.clientX - (r.left + r.width / 2)) * 0.35;
          const y = (e.clientY - (r.top + r.height / 2)) * 0.35;
          gsap.to(btn, { x, y, duration: 0.3, ease: "power2.out" });
        };
        const leave = () =>
          gsap.to(btn, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.35)" });

        btn.addEventListener("mousemove", move);
        btn.addEventListener("mouseleave", leave);
        return () => {
          btn.removeEventListener("mousemove", move);
          btn.removeEventListener("mouseleave", leave);
        };
      });
    },
    { scope: footerRef }
  );

  const scrollToTop = () => {
    gsap.to(window, { duration: 1, scrollTo: 0, ease: "power3.inOut" });
  };

  /* ---------------- Newsletter ---------------- */
  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      gsap.fromTo(".nl-field", { x: -6 }, { x: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
      return;
    }

    setError("");
    setStatus("sending");

    try {
      // TODO: yahan apni newsletter API / Mailchimp / EmailJS call lagayein
      await new Promise((r) => setTimeout(r, 800)); // demo delay

      setStatus("success");
      setEmail("");
      requestAnimationFrame(() => {
        gsap.from(".nl-success", { y: 10, opacity: 0, duration: 0.5, ease: "power2.out" });
      });
    } catch (err) {
      setStatus("idle");
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <footer className="footer" ref={footerRef}>
      {/* Services marquee */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="marquee-item">
              {item}
              <i className="marquee-dot" />
            </span>
          ))}
        </div>
      </div>

      <div className="footer-container">
        {/* CTA */}
        <div className="footer-cta">
          <h2>
            <span className="cta-mask">
              <span className="cta-line">Ready to turn</span>
            </span>
            <span className="cta-mask">
              <span className="cta-line">your wall green?</span>
            </span>
          </h2>

          <div className="cta-side">
            <p className="cta-extra">
              Tell us about your space. We'll design, install and maintain it end to end.
            </p>
            <a href="#contact" className="cta-btn cta-extra" ref={ctaBtnRef}>
              Get a free quote <FiArrowUpRight />
            </a>
          </div>
        </div>

        {/* Vine divider */}
        <svg className="vine" viewBox="0 0 1200 110" fill="none" aria-hidden="true">
          <path
            className="vine-path"
            pathLength="1"
            d="M0 58 C150 6 250 110 400 58 S650 6 800 58 S1050 110 1200 58"
          />
          {leaves.map((l, i) => (
            <path
              key={i}
              className="vine-leaf"
              d="M0 0 C8 -14 26 -14 32 0 C26 14 8 14 0 0 Z"
              transform={`translate(${l.x} ${l.y}) rotate(${l.r})`}
            />
          ))}
        </svg>

        {/* Main grid */}
        <div className="footer-grid">
          <div className="footer-col footer-brand">
            <img src={logo} alt="GreenTech Solution logo" className="footer-logo" />
            <p>Transforming spaces with premium green wall solutions since 2015.</p>
            <a className="big-phone" href="tel:+918043880537">
              08043880537
            </a>
            <a className="mail-link" href="mailto:rajeshkumarparbhat@gmail.com">
              rajeshkumarparbhat@gmail.com
            </a>
          </div>

          <nav className="footer-col" aria-label="Quick links">
            <h4>Quick Links</h4>
            <ul>
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="slide-link">
                    <span>{l.label}</span>
                    <span aria-hidden="true">{l.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="footer-col" aria-label="Social media">
            <h4>Services</h4>
            <ul>
              {socials.map((s) => (
                <li key={s.name}>
                  <a href={s.href} target="_blank" rel="noreferrer" className="social-link">
                    {s.name} <FiArrowUpRight />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-col">
            <h4>Newsletter</h4>
            <p className="nl-text">Green wall ideas, straight to your inbox.</p>

            <form onSubmit={handleSubscribe} noValidate>
              <div className={`nl-field ${error ? "has-error" : ""}`}>
                <label htmlFor="nl-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="nl-email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  aria-invalid={!!error}
                  aria-describedby={error ? "nl-error" : undefined}
                />
                <button type="submit" aria-label="Subscribe" disabled={status === "sending"}>
                  <FiArrowRight />
                </button>
              </div>

              {error && (
                <p className="nl-error" id="nl-error" role="alert">
                  {error}
                </p>
              )}
              {status === "success" && (
                <p className="nl-success" role="status">
                  <FiCheckCircle aria-hidden="true" /> You're on the list!
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Giant wordmark */}
        <div className="wordmark" aria-hidden="true">
          {WORDMARK.map((ch, i) => (
            <span className="wm-char" key={i}>
              <span>{ch}</span>
            </span>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} GreenTech Solution Private Limited. All rights reserved.</p>

          <div className="footer-legal">
            <a href="#privacy">Privacy</a>
            <a href="#terms">Terms</a>
            
          </div>

          <button type="button" className="to-top" onClick={scrollToTop} aria-label="Back to top">
            <FiArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;