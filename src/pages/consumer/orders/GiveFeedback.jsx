import React, { useState } from "react";
import logo from "../../../assets/HH_logo.png";

export default function GiveFeedback() {
  const [data, setData] = useState({
    name: "",
    service: "Home Cleaning",
    rating: 5,
    feedback: "",
    tags: [],
  });

  const services = [
    "Home Cleaning",
    "Plumbing",
    "Electrician",
    "AC Repair",
    "Appliance Repair",
    "Pest Control",
    "Salon & Beauty",
  ];

  const experienceTags = ["Excellent", "Very Good", "Good", "Average", "Poor"];

  const toggleTag = (t) => {
    setData((prev) => {
      const exists = prev.tags.includes(t);
      return {
        ...prev,
        tags: exists ? prev.tags.filter((x) => x !== t) : [...prev.tags, t],
      };
    });
  };

  function handle(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  function submit(e) {
    e.preventDefault();
    if (!data.name || !data.feedback) {
      alert("Please fill required fields.");
      return;
    }
    alert("Thank you for your feedback!\n" + JSON.stringify(data, null, 2));
    setData({ name: "", service: "Home Cleaning", rating: 5, feedback: "", tags: [] });
  }

  return (
    <div className="bg-light min-vh-100 py-5">

      {/* BRAND ONLY — NO NAVBAR */}
      <header className="container d-flex justify-content-center mb-4">
        <div className="d-flex align-items-center gap-3">
          <img src={logo} alt="Happy Home" style={{ width: 65 }} />
          <div>
            <h3 className="m-0 fw-bold">Happy Home</h3>
            <small className="text-muted">Your trusted home service partner</small>
          </div>
        </div>
      </header>

      {/* PAGE CONTENT */}
      <main className="container">

        {/* HERO TEXT */}
        <div className="text-center mb-4">
          <h1 className="fw-bold">Share Your Experience</h1>
          <p className="text-muted">
            Your feedback helps us improve our services and deliver a better Happy Home experience.
          </p>
        </div>

        {/* FEEDBACK FORM CARD */}
        <div className="card shadow-sm border-0 p-4 mx-auto" style={{ maxWidth: "650px" }}>
          <h3 className="fw-bold mb-3">Feedback Form</h3>

          <form className="d-flex flex-column gap-3" onSubmit={submit}>

            {/* NAME */}
            <div>
              <label className="fw-semibold">
                Your Name <span className="text-danger">*</span>
              </label>
              <input
                className="form-control mt-1"
                name="name"
                value={data.name}
                onChange={handle}
                placeholder="Full name"
              />
            </div>

            {/* SERVICE */}
            <div>
              <label className="fw-semibold">Select Service</label>
              <select className="form-select mt-1" name="service" value={data.service} onChange={handle}>
                {services.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* RATING */}
            <div>
              <label className="fw-semibold">Rate Your Experience</label>
              <div className="d-flex align-items-center gap-3 mt-1">
                <input
                  type="range"
                  min="1"
                  max="5"
                  name="rating"
                  value={data.rating}
                  onChange={handle}
                  className="form-range"
                />
                <span className="badge bg-primary fs-6">{data.rating} ★</span>
              </div>
            </div>

            {/* TAGS */}
            <div>
              <label className="fw-semibold">Experience Tags (optional)</label>
              <div className="d-flex flex-wrap gap-2 mt-2">
                {experienceTags.map((t) => (
                  <span
                    key={t}
                    className={
                      data.tags.includes(t)
                        ? "badge bg-primary px-3 py-2"
                        : "badge bg-secondary-subtle text-dark px-3 py-2"
                    }
                    style={{ cursor: "pointer", fontSize: "14px" }}
                    onClick={() => toggleTag(t)}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* FEEDBACK TEXT */}
            <div>
              <label className="fw-semibold">
                Write Feedback <span className="text-danger">*</span>
              </label>
              <textarea
                rows="4"
                name="feedback"
                value={data.feedback}
                onChange={handle}
                placeholder="Tell us about your experience"
                className="form-control mt-1"
              ></textarea>
            </div>

            {/* SUBMIT BUTTON */}
            <button type="submit" className="btn btn-primary py-2 fw-semibold">
              Submit Feedback
            </button>
          </form>
        </div>

        {/* FAQ SECTION */}
        <section className="mt-5">
          <h3 className="fw-bold text-center mb-3">Why your feedback matters?</h3>

          <div className="row g-4 mt-3">
            {[
              [
                "Improve Service Quality",
                "We use your ratings to train our professionals and raise standards."
              ],
              [
                "Resolve Issues Faster",
                "Your feedback helps us understand what went wrong and fix it quickly."
              ],
              [
                "Feature Upgrades",
                "Suggestions you give help us build new features and better tools."
              ]
            ].map(([title, desc], i) => (
              <div className="col-md-4" key={i}>
                <div className="card shadow-sm border-0 p-3 h-100">
                  <h5 className="fw-bold">{title}</h5>
                  <p className="text-muted">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="text-center text-muted py-4">
        © {new Date().getFullYear()} Happy Home — Your trusted home partner.
      </footer>
    </div>
  );
}