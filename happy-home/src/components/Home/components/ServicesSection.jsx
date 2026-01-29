import serviceHomeCleaning from "../../../assets/service-home-cleaning.jpg";
import serviceDeepCleaning from "../../../assets/service-deep-cleaning.jpg";
import serviceMoveOut from "../../../assets/service-move-out.jpg";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const base64ToImageSrc = (base64) => {
  if (!base64) return null;
  const mimeType = base64.startsWith("iVBOR") ? "image/png" : "image/jpeg";
  return `data:${mimeType};base64,${base64}`;
};

const getFirstValidImage = (images) => {
  if (!Array.isArray(images)) return null;
  return images.find(img => img);
};

const ServicesSection = () => {
  const [services, setServices] = useState([]);



  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:8080/services');
        // Limit to only 3 services
        setServices(response.data.slice(4, 7));
        console.log('Fetched services:', response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);
  return (
    <section id="services" className="py-5 bg-white">
      <div className="container py-4">
        {/* Section Header */}
        <div className="text-center mb-5">
          <span className="text-primary fw-semibold text-uppercase small letter-spacing-2">
            Our Services
          </span>
          <h2 className="display-6 fw-bold mt-2 mb-3">Our Cleaning Services</h2>
          <p className="lead text-secondary mx-auto" style={{ maxWidth: 600 }}>
            Professional cleaning solutions tailored to your needs. We offer a wide range of services
            to make your home shine.
          </p>
        </div>

        {/* Services Grid */}
        <div className="row g-4">
          {services.map((service) => {
            const imageBase64 = getFirstValidImage(service.serviceImages);
            const imageSrc = imageBase64
              ? base64ToImageSrc(imageBase64)
              : serviceHomeCleaning;
            return (
              <div key={service.serviceID} className="col-md-6 col-lg-4">
                <div className="card service-card h-100 border-0">
                  {/* Image Container */}
                  <div className="card-img-top-wrapper position-relative" style={{ height: '250px', overflow: 'hidden' }}>
                    <img
                      src={imageSrc}
                      alt={service.serviceName}
                      className="card-img-top service-card-img"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <span className="service-price-badge">₹{service.price}</span>
                  </div>

                  {/* Content */}
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <h5 className="card-title fw-bold mb-0">{service.serviceName}</h5>
                      {service.category && (
                        <span className="badge bg-primary bg-opacity-10 text-primary" style={{ fontSize: '0.7rem', padding: '0.35rem 0.65rem' }}>
                          {service.category}
                        </span>
                      )}
                    </div>
                    <p className="card-text text-secondary mb-3">{service.shortDesc}</p>

                    <Link to={`/consumer-home/service-details/${service.serviceID}`} className="text-primary fw-semibold text-decoration-none d-inline-flex align-items-center gap-2">
                      Learn More
                      <i className="bi bi-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-5">
          <Link to="/consumer-home/service-listing" className="btn btn-primary btn-lg px-5 d-inline-flex align-items-center gap-2">
            View All Services
            <i className="bi bi-arrow-right"></i>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
