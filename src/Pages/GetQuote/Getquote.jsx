import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Getquote.css";

/* ⚠️ APNA LOGO YAHAN SE IMPORT HOGA — file ka sahi naam/path daal dena */
import logo from "../../assets/logo.png";

const THANKS_VISIBLE_MS = 4000; // thank you kitni der dikhe
const THANKS_FADE_MS = 400; // hatne ka animation time
const TEXTAREA_MAX_HEIGHT = 400; // description box isse zyada bada nahi hoga (phir scroll)

const Getquote = () => {
  const location = useLocation();
  const service = location.state?.service;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState("");
  const [showThanks, setShowThanks] = useState(false);
  const [closing, setClosing] = useState(false);

  const descRef = useRef(null);
  const timers = useRef([]);

  /* unmount par timers saaf */
  useEffect(() => {
    return () => timers.current.forEach(clearTimeout);
  }, []);

  /* description box: jitna likho utna bada hota jaye */
  const autoResize = () => {
    const el = descRef.current;
    if (!el) return;

    el.style.height = "auto";
    const newHeight = Math.min(el.scrollHeight, TEXTAREA_MAX_HEIGHT);
    el.style.height = `${newHeight}px`;
    el.style.overflowY =
      el.scrollHeight > TEXTAREA_MAX_HEIGHT ? "auto" : "hidden";
  };

  /* thank you: animation ke saath aaye aur khud hat jaye */
  const showThankYou = () => {
    timers.current.forEach(clearTimeout);
    setClosing(false);
    setShowThanks(true);

    timers.current = [
      setTimeout(() => setClosing(true), THANKS_VISIBLE_MS),
      setTimeout(
        () => setShowThanks(false),
        THANKS_VISIBLE_MS + THANKS_FADE_MS
      ),
    ];
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formElement = event.currentTarget;

    setIsSubmitting(true);
    setFormMessage("");

    try {
      const formData = new FormData(formElement);

      formData.append("access_key", "c9ae9c54-fe80-41bd-9b0a-06c00131cb47");
      formData.append("subject", "New Quote Request");
      formData.append("from_name", "Green Tech Solution Website");

      // Product details sirf email mein jayengi, form mein nahi dikhengi
      if (service?.name) {
        formData.append("selected_product", service.name);
      }

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to submit your request.");
      }

      formElement.reset();
      if (descRef.current) {
        descRef.current.style.height = "";
        descRef.current.style.overflowY = "";
      }

      showThankYou();
    } catch (error) {
      console.error("Quote form error:", error);
      setFormMessage(
        error.message || "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="gt-quote-page">
      <div className="gt-quote-container">
        <div className="gt-quote-header">
          <img src={logo} alt="Green Tech Solution" className="gt-quote-logo" />

          <span className="gt-quote-label">GET IN TOUCH</span>

          <h1>Get a Free Quote</h1>

          <p>
            Tell us about your requirements and our team will get back to you.
          </p>
        </div>

        <form className="gt-quote-form" onSubmit={handleSubmit}>
          {/* Name + Email: ek row mein do */}
          <div className="gt-form-row">
            <div className="gt-form-group">
              <label htmlFor="gt-name">
                Name <span>*</span>
              </label>

              <input
                id="gt-name"
                type="text"
                name="name"
                placeholder="Enter your name"
                required
                maxLength={100}
              />
            </div>

            <div className="gt-form-group">
              <label htmlFor="gt-email">
                Email <span>*</span>
              </label>

              <input
                id="gt-email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
                maxLength={150}
              />
            </div>
          </div>

          {/* Requirement */}
          <div className="gt-form-group">
            <label htmlFor="gt-requirement">
              Requirement <span>*</span>
            </label>

            <input
              id="gt-requirement"
              type="text"
              name="requirement"
              placeholder="Enter your requirement"
              required
              maxLength={200}
            />
          </div>

          {/* Description: chota start hota hai, likhne par bada hota hai */}
          <div className="gt-form-group">
            <label htmlFor="gt-description">
              Description <span>*</span>
            </label>

            <textarea
              id="gt-description"
              name="description"
              ref={descRef}
              placeholder="Tell us more about your requirements..."
              rows={1}
              required
              maxLength={2000}
              onInput={autoResize}
            />
          </div>

          {/* Spam protection */}
          <input
            type="checkbox"
            name="botcheck"
            className="gt-honeypot"
            tabIndex="-1"
            autoComplete="off"
          />

          <button
            type="submit"
            className="gt-submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Request"}
            {!isSubmitting && <span>↗</span>}
          </button>

          {formMessage && (
            <p className="gt-form-message gt-form-error" role="alert">
              {formMessage}
            </p>
          )}
        </form>
      </div>

      {/* THANK YOU POPUP (animation ke saath aata hai, khud hat jata hai) */}
      {showThanks && (
        <div
          className={`gt-thanks-overlay ${closing ? "closing" : ""}`}
          role="status"
          aria-live="polite"
        >
          <div className="gt-thanks-card">
            <div className="gt-thanks-check">
              <svg viewBox="0 0 52 52" aria-hidden="true">
                <circle className="gt-thanks-circle" cx="26" cy="26" r="24" />
                <path className="gt-thanks-tick" d="M14 27 l8 8 l16 -17" />
              </svg>
            </div>

            <h2>Thank You!</h2>

            <p>
              Your request has been submitted successfully. Our team will
              contact you soon.
            </p>

            <div
              className="gt-thanks-progress"
              style={{ animationDuration: `${THANKS_VISIBLE_MS}ms` }}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Getquote;