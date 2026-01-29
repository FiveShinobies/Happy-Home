import { Link } from "react-router-dom";

const CTASection = () => {
  const serviceId = 1; // Example service ID for booking link
  return (
    <section id="contact" className="cta-section py-5 text-white position-relative">
      <div className="container py-5 position-relative" style={{ zIndex: 1 }}>
        <div className="text-center mx-auto" style={{ maxWidth: 800 }}>
          <h2 className="display-5 fw-bold mb-4">
            Ready For A Cleaner,
            <br />
            Happier Home?
          </h2>
          <p className="lead opacity-75 mb-5 mx-auto" style={{ maxWidth: 600 }}>
            Book your first cleaning today and experience the HomeClean Pro difference.
            Get 20% off your first service!
          </p>

          <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
            <Link to={`/consumer-home/checkout/${serviceId}`} className="btn btn-light btn-lg px-5 d-inline-flex align-items-center justify-content-center gap-2 text-primary fw-bold">
              Book Your Cleaning
              <i className="bi bi-arrow-right"></i>
            </Link>
            <a href="tel:+1234567890" className="btn btn-outline-light btn-lg px-5 d-inline-flex align-items-center justify-content-center gap-2 fw-bold">
              <i className="bi bi-telephone-fill"></i>
              Call Us Now
            </a>
          </div>

          {/* Contact Options */}
          <div className="d-flex flex-wrap justify-content-center gap-4 mt-5">
            <a href="tel:+1234567890" className="text-white text-decoration-none d-flex align-items-center gap-2 opacity-75">
              <i className="bi bi-telephone"></i>
              <span>+1 (234) 567-890</span>
            </a>
            <a href="#" className="text-white text-decoration-none d-flex align-items-center gap-2 opacity-75">
              <i className="bi bi-chat-dots"></i>
              <span>Live Chat Available</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
