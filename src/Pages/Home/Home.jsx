
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./Home.css";
import About from "../About/About";

import indoor1 from "../../assets/indoor1.jpg";
import indoor2 from "../../assets/indoor2.png";
import Products from "../Products/Products";
import Service from "../Service/Service";
import Gallery from "../Gallery/Gallery";
import Why from "../Why/Why";
import Contact from "../Contact/Contact";
import Popup from "../../Components/LeadPopup/Popup";

gsap.registerPlugin(useGSAP);

const slides = [
  {
    // image: indoorwall,
     image: indoor1,
    tag: "🌿 Premium Green Wall Solutions Since 2015",
    title1: "Transform Your",
    title2: "Walls Into Nature",
    description:
      "Create stunning vertical gardens that bring life, beauty, and sustainability to any space. From residential to commercial installations.",
    feature: "Premium Bio Walls",
  },
  {
    // image: outdoorwall,
    image: indoor2,
    tag: "🌿 Bring Nature Into Your Space",
    title1: "Experience The",
    title2: "Power Of Green",
    description:
      "Transform your surroundings with beautiful green walls and innovative vertical garden solutions.",
    feature: "Luxury Green Walls",
  },
  {
    // image: greenwall,
    image:'https://www.sempergreen.com/wp-content/uploads/2025/09/greenwall-theater-den-bosch-2024-1.jpg',
    tag: "🌿 Sustainable Green Living",
    title1: "Make Your Space",
    title2: "Naturally Beautiful",
    description:
      "Discover premium green wall installations designed to make every space fresh, beautiful and sustainable.",
    feature: "Modern Green Gardens",
  },
];

const Home = () => {
  const [current, setCurrent] = useState(0);
  const heroRef = useRef(null);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  /* auto slide: current badalne par timer dobara shuru hota hai */
  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [current]);

  /* hero text reveal + background slow zoom
     fromTo use kiya hai taaki end state hamesha visible (opacity 1) rahe,
     aur revertOnUpdate se purani animation ke leftover styles saaf ho jayein */
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .fromTo(
            ".green-hero-tag",
            { y: -16, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.6 }
          )
          .fromTo(
            ".hero-line-inner",
            { yPercent: 110 },
            { yPercent: 0, duration: 0.9, stagger: 0.15 },
            "-=0.2"
          )
          .fromTo(
            ".green-hero-content > p",
            { y: 24, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.7 },
            "-=0.5"
          )
          .fromTo(
            ".green-hero-buttons > *",
            { y: 24, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.6,
              stagger: 0.12,
              clearProps: "transform",
            },
            "-=0.4"
          );

        gsap.fromTo(
          ".green-hero-slide.active",
          { scale: 1.12 },
          { scale: 1, duration: 7, ease: "none" }
        );
      });
    },
    { dependencies: [current], scope: heroRef, revertOnUpdate: true }
  );

  const activeSlide = slides[current];

  return (
    <>
      <section className="green-hero" ref={heroRef}>
        {/* BACKGROUND SLIDER */}
        <div className="green-hero-background">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`green-hero-slide ${current === index ? "active" : ""}`}
              style={{ backgroundImage: `url(${slide.image})` }}
            />
          ))}
        </div>

        {/* DARK OVERLAY */}
        <div className="green-hero-overlay"></div>

        {/* HERO CONTENT */}
        <div className="green-hero-content" key={current}>
          <div className="green-hero-tag">
            <span>🌿</span>
            {activeSlide.tag.replace("🌿 ", "")}
          </div>

          <h1>
            <span className="hero-line">
              <span className="hero-line-inner">{activeSlide.title1}</span>
            </span>
            <span className="hero-line">
              <span className="hero-line-inner hero-accent">{activeSlide.title2}</span>
            </span>
          </h1>

          <p>{activeSlide.description}</p>

          <div className="green-hero-buttons">
            <Link to="/products" className="green-explore-btn">
              Explore Products <FiArrowRight />
            </Link>

            <Link to="/contact" className="green-consult-btn">
              Free Consultation
            </Link>
          </div>
        </div>

        {/* BOTTOM CONTENT */}
        <div className="green-hero-bottom">
          <div className="green-hero-stats">
            <div className="green-stat">
              <h2>500+</h2>
              <span>Projects</span>
              <span>Completed</span>
            </div>

            <div className="green-stat">
              <h2>10+</h2>
              <span>Years Experience</span>
            </div>

            <div className="green-stat">
              <h2>4.9★</h2>
              <span>Client Rated</span>
            </div>
          </div>

          <div className="green-scroll-indicator">
            <span></span>
          </div>

          <div className="green-featured">
            <small>FEATURED INSTALLATION</small>
            <h3>{activeSlide.feature}</h3>
          </div>
        </div>

        {/* SLIDER CONTROLS */}
        <div className="green-slider-controls">
          <button onClick={prevSlide} aria-label="Previous slide">
            <FiChevronLeft />
          </button>

          <button onClick={nextSlide} aria-label="Next slide">
            <FiChevronRight />
          </button>
        </div>

        {/* SLIDE INDICATORS */}
        <div className="green-slider-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={current === index ? "active" : ""}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      <About />
      <Products />
      <Gallery />
      <Service />
      <Why />
      <Contact />
      <Popup />
    </>
  );
};

export default Home;