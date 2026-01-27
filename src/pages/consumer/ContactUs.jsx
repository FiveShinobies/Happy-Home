import React, { useState } from "react";
import logo from "../../assets/HH_logo.png";

export default function ContactUs() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    category: "General",
    message: ""
  });

  const [status, setStatus] = useState(null);

  const categories = [
    "General",
    "Booking/Reschedule",
    "Refund",
    "Partner with us",
    "Technical Issue",
    "Other"
  ];

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ type: "danger", text: "Please fill all required fields." });
      return;
    }

    setStatus({ type: "info", text: "Sending message..." });

    setTimeout(() => {
      setStatus({
        type: "success",
        text: "Thanks! Your message has been received. We'll contact you soon."
      });
      setForm({ name: "", email: "", category: "General", message: "" });
    }, 1000);
  }

  return (
    <div className="bg-light min-vh-100 py-5">

      {/* HEADER - ONLY BRAND, NO NAVBAR */}
      <header className="container d-flex justify-content-center mb-4">
        <div className="d-flex align-items-center gap-3">
          <img src={logo} alt="Happy Home" style={{ width: 65 }} />
          <div>
            <h3 className="m-0 fw-bold">Happy Home</h3>
            <small className="text-muted">Trusted household services</small>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="container">
        <div className="row g-4">

          {/* LEFT SIDE CONTENT */}
          <div className="col-lg-6">
            <h1 className="fw-bold mb-3">Contact Support</h1>
            <p className="text-muted">
              Need help? Our support team is here 24×7. Call, email or send a message anytime.
            </p>

            {/* SUPPORT CARDS */}
            <div className="row g-3 mt-4">
              <div className="col-md-6">
                <div className="card shadow-sm p-3 border-0">
                  <h5 className="fw-bold">Call Us</h5>
                  <p className="text-muted">Mon–Sun • 8 AM – 10 PM</p>
                  <a href="tel:+917309720766" className="fw-bold text-primary text-decoration-none">
                    +91 7309720766
                  </a>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card shadow-sm p-3 border-0">
                  <h5 className="fw-bold">Email</h5>
                  <p className="text-muted">Reply within 24 hours</p>
                  <a href="mailto:support@happyhome.in" className="fw-bold text-primary text-decoration-none">
                    support@happyhome.in
                  </a>
                </div>
              </div>

              <div className="col-12">
                <div className="card shadow-sm p-3 border-0">
                  <h5 className="fw-bold">Office</h5>
                  <p className="text-muted">Corporate HQ</p>
                  <address className="fw-semibold">
                    Sunbeam InfoTech Pvt. Ltd.,  
                    Hinjewadi Phase 2, Pune, Maharashtra, India
                  </address>
                </div>
              </div>
            </div>

            {/* QUICK HELP */}
            <div className="mt-4">
              <h5 className="fw-bold">Quick Help</h5>
              <ul className="text-muted mt-2">
                <li>Need refund? Select “Refund” in the form.</li>
                <li>Want to join us? Choose “Partner with us”.</li>
                <li>For emergencies, call our hotline directly.</li>
              </ul>
            </div>
          </div>

          {/* RIGHT SIDE FORM */}
          <div className="col-lg-6">
            <div className="card shadow-sm border-0 p-4">
              <h3 className="fw-bold mb-3">Send Us a Message</h3>

              <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">

                {/* NAME */}
                <div>
                  <label className="fw-semibold">
                    Your Name <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control mt-1"
                    placeholder="Full name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>

                {/* EMAIL */}
                <div>
                  <label className="fw-semibold">
                    Email <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    className="form-control mt-1"
                    placeholder="you@example.com"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>

                {/* CATEGORY */}
                <div>
                  <label className="fw-semibold">Category</label>
                  <select
                    className="form-select mt-1"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                  >
                    {categories.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* MESSAGE */}
                <div>
                  <label className="fw-semibold">
                    Message <span className="text-danger">*</span>
                  </label>
                  <textarea
                    rows="4"
                    className="form-control mt-1"
                    placeholder="How can we help you?"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                  ></textarea>
                </div>

                {/* SUBMIT */}
                <button className="btn btn-primary py-2 fw-semibold" type="submit">
                  Send Message
                </button>

                {/* STATUS */}
                {status && (
                  <div className={`alert alert-${status.type} mt-2`}>
                    {status.text}
                  </div>
                )}
              </form>
            </div>

            {/* MAP */}
            <div className="mt-4">
              <div className="card shadow-sm border-0 p-1">
                <iframe
                  title="sunbeam-map"
                  className="w-100"
                  height="260"
                  style={{ borderRadius: "10px" }}
                  loading="lazy"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.1844928922744!2d73.72807237521105!3d18.59631648251263!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b969dd5bb615%3A0x36e8f2e3bff98e65!2sSunbeam%20Infotech%20(Pvt)%20Ltd%20Hinjawadi!5e0!3m2!1sen!2sin!4v1700000000000"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <section className="mt-5">
          <h3 className="fw-bold mb-3">Frequently Asked Questions</h3>

          <div className="row g-4">
            {[
              ["How do I reschedule a booking?", "Open booking → tap 'Reschedule' → choose new slot."],
              ["How long does refund take?", "Refunds take 5–7 business days after approval."],
              ["What safety measures do pros follow?", "Background verification + sanitization protocols."]
            ].map(([q, a], i) => (
              <div className="col-md-4" key={i}>
                <div className="card shadow-sm border-0 p-3 h-100">
                  <h5 className="fw-bold">{q}</h5>
                  <p className="text-muted">{a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="text-center text-muted py-4">
        © {new Date().getFullYear()} Happy Home — All rights reserved.
      </footer>
    </div>
  );
}