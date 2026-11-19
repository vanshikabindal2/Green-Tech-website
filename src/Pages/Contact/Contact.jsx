import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FiMapPin, FiMail, FiPhone, FiCheckCircle } from "react-icons/fi";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import "./Contact.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ADDRESS =
  "12 - B, KH No-34/24, Dilip Vihar, Nilothi Extt, Delhi, West New Delhi - 110041, Delhi, India";
const EMAIL = "rajeshkumarparbhat@gmail.com";
const PHONE_DISPLAY = "08043880537";
const PHONE_LINK = "+918043880537";

const socials = [
  { name: "Facebook", icon: FaFacebookF, href: "#", className: "fb" },
  { name: "LinkedIn", icon: FaLinkedinIn, href: "#", className: "in" },
  { name: "Instagram", icon: FaInstagram, href: "#", className: "ig" },
];

const initialForm = { requirement: "", phone: "", name: "" };

const Contact = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success

  /* ---------------- GSAP ---------------- */
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        });

        tl.from(".contact-title", { y: 40, opacity: 0, duration: 0.8 })
          .from(
            ".contact-block",
            { x: -40, opacity: 0, duration: 0.7, stagger: 0.15 },
            "-=0.4"
          )
          .from(
            ".contact-social a",
            { scale: 0, opacity: 0, duration: 0.5, stagger: 0.1, ease: "back.out(2)" },
            "-=0.3"
          )
          .from(
            ".contact-card",
            { x: 60, opacity: 0, duration: 0.9 },
            0.2
          );
      });
    },
    { scope: sectionRef }
  );

  /* ---------------- Form logic ---------------- */
  const validate = () => {
    const next = {};
    if (!/^[6-9]\d{9}$/.test(form.phone.trim())) {
      next.phone = "Enter a valid 10-digit mobile number.";
    }
    if (form.name.trim().length < 2) {
      next.name = "Please enter your name.";
    }
    return next;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // phone me sirf digits allow karo
    const clean = name === "phone" ? value.replace(/\D/g, "").slice(0, 10) : value;
    setForm((prev) => ({ ...prev, [name]: clean }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);

    if (Object.keys(found).length) {
      // galat fields ko halka shake
      gsap.fromTo(
        formRef.current.querySelectorAll(".field.has-error .input"),
        { x: -6 },
        { x: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" }
      );
      return;
    }

    setStatus("sending");
    try {
      // TODO: yahan apni API / EmailJS / Formspree call lagayein, jaise:
      // await fetch("/api/enquiry", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(form),
      // });
      await new Promise((r) => setTimeout(r, 900)); // demo delay

      setStatus("success");
      setForm(initialForm);
      requestAnimationFrame(() => {
        gsap.from(".contact-success", { y: 12, opacity: 0, duration: 0.5, ease: "power2.out" });
      });
    } catch (err) {
      setStatus("idle");
      setErrors({ form: "Something went wrong. Please call us or try again." });
    }
  };

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    "Green Tech Solution Private Limited, " + ADDRESS
  )}`;

  return (
    <section className="contact-section" id="contact" ref={sectionRef}>
      <div className="contact-container">
        {/* ---------- Left: info ---------- */}
        <div className="contact-info">
          <h2 className="contact-title">Contact Us</h2>

          <div className="contact-block">
            <span className="contact-icon" aria-hidden="true">
              <FiMapPin />
            </span>
            <div>
              <h3>Rajesh Kumar (Director)</h3>
              <p className="company">Green Tech Solution Private Limited</p>
              <address>{ADDRESS}</address>
              <a className="link-accent" href={mapsUrl} target="_blank" rel="noreferrer">
                Get directions
              </a>
            </div>
          </div>

          <div className="contact-block">
            <span className="contact-icon" aria-hidden="true">
              <FiMail />
            </span>
            <div>
              <h3>Send email</h3>
              <a className="link-accent" href={`mailto:${EMAIL}`}>
                {EMAIL}
              </a>
            </div>
          </div>

          <div className="contact-block">
            <span className="contact-icon" aria-hidden="true">
              <FiPhone />
            </span>
            <div>
              <h3>Call us</h3>
              <a className="phone-link" href={`tel:${PHONE_LINK}`}>
                {PHONE_DISPLAY}
              </a>
            </div>
          </div>

          <div className="contact-social">
            <span>Follow us</span>
            <div>
              {socials.map(({ name, icon: Icon, href, className }) => (
                <a
                  key={name}
                  href={href}
                  className={className}
                  aria-label={name}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ---------- Right: form ---------- */}
        <div className="contact-card">
          <form onSubmit={handleSubmit} noValidate ref={formRef}>
            <div className="field">
              <label htmlFor="requirement">Describe your requirement</label>
              <textarea
                id="requirement"
                name="requirement"
                className="input"
                rows={4}
                placeholder="I would like to..."
                value={form.requirement}
                onChange={handleChange}
              />
            </div>

            <div className={`field ${errors.phone ? "has-error" : ""}`}>
              <label htmlFor="phone">
                Phone <span aria-hidden="true">*</span>
              </label>
              <div className="phone-row">
                <span className="phone-code">IN +91</span>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  className="input"
                  placeholder="Enter your number"
                  value={form.phone}
                  onChange={handleChange}
                  aria-required="true"
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                />
              </div>
              {errors.phone && (
                <p className="error" id="phone-error" role="alert">
                  {errors.phone}
                </p>
              )}
            </div>

            <div className={`field ${errors.name ? "has-error" : ""}`}>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                className="input"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <p className="error" id="name-error" role="alert">
                  {errors.name}
                </p>
              )}
            </div>

            <button type="submit" className="submit-btn" disabled={status === "sending"}>
              {status === "sending" ? "Sending..." : "Submit"}
            </button>

            {errors.form && (
              <p className="error center" role="alert">
                {errors.form}
              </p>
            )}

            {status === "success" && (
              <p className="contact-success" role="status">
                <FiCheckCircle aria-hidden="true" /> Thanks! We'll call you within 24 hours.
              </p>
            )}

            <p className="privacy">
              We'll respond within 24 hours. Your privacy is important to us.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;