
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Getquote.css";

const Getquote = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const service = location.state?.service;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formElement = event.currentTarget;

    setIsSubmitting(true);
    setFormMessage("");

    try {
      const formData = new FormData(formElement);

      formData.append(
        "access_key",
        "c9ae9c54-fe80-41bd-9b0a-06c00131cb47"
      );

      formData.append("subject", "New Quote Request");
      formData.append("from_name", "Green Tech Solution Website");

      // Product details will only be sent in the email,
      // they will not be displayed on the form.
      if (service?.name) {
        formData.append("selected_product", service.name);
      }

      const response = await fetch(
        "https://api.web3forms.com/submit",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to submit your request."
        );
      }

      setIsSuccess(true);

      setFormMessage(
        "Your request has been submitted successfully. Our team will contact you soon."
      );

      formElement.reset();
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

        {!isSuccess ? (
          <>
            <div className="gt-quote-header">
              <span className="gt-quote-icon">🌿</span>

              <span className="gt-quote-label">
                GET IN TOUCH
              </span>

              <h1>Get a Free Quote</h1>

              <p>
                Tell us about your requirements and our team
                will get back to you.
              </p>
            </div>

            <form
              className="gt-quote-form"
              onSubmit={handleSubmit}
            >
              {/* Name */}
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

              {/* Email */}
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

              {/* Description */}
              <div className="gt-form-group">
                <label htmlFor="gt-description">
                  Description <span>*</span>
                </label>

                <textarea
                  id="gt-description"
                  name="description"
                  placeholder="Tell us more about your requirements..."
                  rows={6}
                  required
                  maxLength={2000}
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

              {/* Submit */}
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
          </>
        ) : (
          <div className="gt-success-message">
            <div className="gt-success-icon">✓</div>

            <h2>Thank You!</h2>

            <p>{formMessage}</p>

            <button
              type="button"
              className="gt-submit-button"
              onClick={() => navigate("/")}
            >
              Back to Home
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

export default Getquote;
