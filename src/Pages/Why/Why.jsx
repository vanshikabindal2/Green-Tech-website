import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PencilRuler, ShieldCheck, HeartHandshake, Check } from "lucide-react";
import "./Why.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const features = [
  {
    id: 1,
    icon: PencilRuler,
    title: "Expert Design",
    description:
      "Custom solutions tailored to your space, planned with our in-house horticulturists and designers.",
    points: ["Site-specific plant selection", "3D layout before installation"],
  },
  {
    id: 2,
    icon: ShieldCheck,
    title: "Quality Materials",
    description:
      "Built to last outdoors and indoors, with materials chosen for strength and plant health.",
    points: ["Rust-proof MS frames", "Premium bio-felt", "Advanced irrigation systems"],
  },
  {
    id: 3,
    icon: HeartHandshake,
    title: "Lifetime Support",
    description:
      "We stay with you after installation, so your green wall keeps looking its best.",
    points: ["Comprehensive AMC", "Plant replacement guarantee", "24/7 support"],
  },
];

const Why = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Animation sirf tab chalegi jab user ne "reduce motion" on nahi kiya ho
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".why-item", {
          y: 32,
          opacity: 0,
          duration: 0.8,
          stagger: 0.18,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".why-list",
            start: "top 80%",
            once: true,
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section className="why-section" ref={sectionRef} id="why-us">
      <div className="why-container">
        <div className="why-intro">
          <h2 id="why-heading">Why choose GreenTech</h2>
          <p>
            From the first sketch to yearly maintenance, one team designs,
            installs and looks after your vertical garden.
          </p>
          <a className="why-cta" href="#contact">
            Book a free site visit
          </a>
        </div>

        <ul className="why-list" aria-labelledby="why-heading">
          {features.map(({ id, icon: Icon, title, description, points }) => (
            <li className="why-item" key={id}>
              <span className="why-icon" aria-hidden="true">
                <Icon size={26} strokeWidth={1.75} />
              </span>

              <div className="why-body">
                <h3>{title}</h3>
                <p>{description}</p>
                <ul className="why-points">
                  {points.map((point) => (
                    <li key={point}>
                      <Check size={16} strokeWidth={2.5} aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Why;