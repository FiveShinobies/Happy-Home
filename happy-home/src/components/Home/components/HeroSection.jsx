import { Link } from "react-router-dom";
import heroImage from "../../../assets/hero-cleaning.jpg";

const HeroSection = () => {
  const serviceId = 1; // Example service ID for booking link
  return (
    <section className="hero-section">
      <div className="container">
        <div className="row align-items-center g-5">
          {/* Left Content */}
          <div className="col-lg-6 fade-in-left">
            <div className="hero-badge mb-4">
              <i className="bi bi-star-fill text-warning"></i>
              <span className="fw-medium">Trusted by 1,200+ Happy Home  s</span>
            </div>

            <h1 className="display-4 fw-bold text-dark mb-4">
              Sparkling Homes
              <br />
              <span className="text-primary">Start With Us</span>
            </h1>

            <p className="lead text-secondary mb-4">
              Professional home cleaning services that transform your living space.
              We bring the sparkle back to your home with eco-friendly products and expert care.
            </p>

            <div className="d-flex flex-column flex-sm-row gap-3 mb-5">
              <Link to={`/consumer-home/checkout/${serviceId}`} className="btn btn-primary btn-lg px-5 d-flex align-items-center justify-content-center gap-2">
                Book a Cleaning
                <i className="bi bi-arrow-right"></i>
              </Link>
              <Link to="/consumer-home/service-listing" className="btn btn-outline-dark btn-lg px-5">
                View Services
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="d-flex flex-wrap gap-4">
              <div className="trust-badge">
                <div className="trust-icon">
                  <i className="bi bi-shield-check"></i>
                </div>
                <span className="text-secondary small fw-medium">Insured & Bonded</span>
              </div>
              <div className="trust-badge">
                <div className="trust-icon">
                  <i className="bi bi-clock"></i>
                </div>
                <span className="text-secondary small fw-medium">24/7 Support</span>
              </div>
              <div className="trust-badge">
                <div className="trust-icon">
                  <i className="bi bi-star"></i>
                </div>
                <span className="text-secondary small fw-medium">5-Star Rated</span>
              </div>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="col-lg-6 fade-in-right">
            <div className="hero-image-container">
              <img
                src={heroImage}
                alt="Professional cleaning service worker"
                className="hero-image img-fluid w-100"
              />
              {/* Floating Card */}
              <div className="floating-card">
                <div className="d-flex align-items-center gap-3">
                  <div className="d-flex">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="rounded-circle bg-primary bg-opacity-25 border border-2 border-white d-flex align-items-center justify-content-center"
                        style={{ width: 40, height: 40, marginLeft: i > 1 ? -10 : 0 }}
                      >
                        <span className="small fw-bold text-primary">{i}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="fw-bold mb-0 text-dark">1,200+ Happy Customers</p>
                    <div className="d-flex align-items-center gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <i key={i} className="bi bi-star-fill text-warning small"></i>
                      ))}
                      <span className="text-secondary small ms-1">4.9/5</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
