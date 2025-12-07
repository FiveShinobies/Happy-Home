import React from "react";
import logo from "../../assets/HH_logo.png";

export default function AboutUs() {
  return (
    <div className="container py-5">

      {/* Logo Section */}
      <div className="text-center mb-5">
        <img
          src={logo}
          alt="Happy Home Logo"
          style={{ width: "90px" }}
          className="mb-2"
        />
        <h1 className="fw-bold" style={{ fontSize: "32px" }}>Happy Home</h1>
        <p className="text-muted">India’s Trusted Home Service Platform</p>
      </div>

      {/* Intro Section */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body p-4">
          <h2 className="fw-bold mb-3">
            Transforming Home Services With Trust, Technology & Transparency
          </h2>

          <p>
            Happy Home is India’s fastest-growing household service platform—
            bringing professional cleaning, beauty, appliance repair, plumbing,
            electrical work, and more straight to your doorstep.
          </p>

          <p>
            Whether you're booking salon-at-home or fixing a leaking tap,
            we guarantee safety, verified experts, transparent pricing,
            and the best service experience.
          </p>
        </div>
      </div>

      {/* Vision Section */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body p-4">
          <h2 className="fw-bold">Our Vision</h2>
          <p className="mt-2">
            To build the most reliable and customer-centric home service ecosystem,
            powered by skilled professionals and seamless digital innovation.
          </p>
        </div>
      </div>

      {/* Pillars Section */}
      <h2 className="fw-bold my-4">The Three Pillars We Stand On</h2>
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card shadow-sm border-0 h-100 p-3">
            <h4 className="fw-bold">Trust & Safety</h4>
            <p>
              All professionals are background verified, skill-tested, and regularly trained
              to maintain high service quality.
            </p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm border-0 h-100 p-3">
            <h4 className="fw-bold">Quality Assurance</h4>
            <p>
              Fixed pricing, expert tools, and premium products ensure best-in-class results.
            </p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm border-0 h-100 p-3">
            <h4 className="fw-bold">Convenience Re-imagined</h4>
            <p>
              Book anytime, track your booking, get fast support — a fully modern home-care experience.
            </p>
          </div>
        </div>
      </div>

      {/* What We Offer Section */}
      <h2 className="fw-bold my-5">What We Offer</h2>
      <div className="row g-4">

        {[
          ["Beauty & Wellness", "Salon, spa, grooming & wellness at home."],
          ["Home Cleaning", "Deep cleaning, kitchen/bathroom cleaning, sofa/carpet wash."],
          ["AC & Appliance Repair", "AC, fridge, washing machine, RO repair & servicing."],
          ["Plumbing & Electrical", "Leaks, wiring, installations & emergency support."],
          ["Pest Control", "Eco-friendly solutions for termites, cockroaches & more."],
          ["Insta Help", "Quick-response home assistance for urgent issues."]
        ].map(([title, desc], i) => (
          <div className="col-md-4" key={i}>
            <div className="card shadow-sm border-0 h-100 p-3">
              <h4 className="fw-bold">{title}</h4>
              <p>{desc}</p>
            </div>
          </div>
        ))}

      </div>

      {/* Global Presence */}
      <div className="card shadow-sm border-0 my-5">
        <div className="card-body p-4">
          <h2 className="fw-bold">Global Presence</h2>
          <p>Happy Home is expanding globally across multiple countries.</p>
          <ul className="mt-3">
            <li>Singapore</li>
            <li>UAE</li>
            <li>Saudi Arabia</li>
            <li>India</li>
          </ul>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="card shadow-sm border-0 mb-5">
        <div className="card-body p-4">
          <h2 className="fw-bold">Why Choose Happy Home?</h2>
          <ul className="mt-2">
            <li>Instant booking & doorstep convenience</li>
            <li>Transparent & affordable pricing</li>
            <li>Trained & background-verified professionals</li>
            <li>Top-quality tools & branded products</li>
            <li>24×7 customer support</li>
          </ul>
        </div>
      </div>

    </div>
  );
}