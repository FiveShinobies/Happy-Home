import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { servicesData } from "../servicesData";
import { Star, MapPin, Clock } from "lucide-react";

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Convert id from string to number and find service
  const service = servicesData.find((srv) => srv.id === Number(id));

  const [selectedImage, setSelectedImage] = useState(0);

  // Handle invalid IDs
  if (!service) {
    return (
      <div className="text-center py-5">
        <h4>Service not found</h4>
        <button className="btn btn-dark mt-3" onClick={() => navigate("/services")}>
          Back to Services
        </button>
      </div>
    );
  }

  // Create image gallery (repeat same image for demo)
  const images = [service.image, service.image, service.image];

  return (
    <div className="min-vh-100 bg-light">
      {/* Header */}
      <div className="bg-white shadow-sm sticky-top">
        <div className="container py-3">
          <button
            className="btn btn-link text-dark p-0 text-decoration-none d-flex align-items-center gap-2"
            onClick={() => navigate("/services")}
          >
            ← Back to Services
          </button>
        </div>
      </div>

      <div className="container py-4">
        <div className="row">
          {/* LEFT COLUMN */}
          <div className="col-lg-8 mb-4">
            {/* Image Gallery */}
            <div className="card shadow-sm mb-4" style={{ borderRadius: "12px", border: "none" }}>
              <img
                src={images[selectedImage]}
                alt={service.name}
                className="card-img-top"
                style={{ height: "400px", objectFit: "cover", borderRadius: "12px 12px 0 0" }}
              />
              <div className="card-body">
                <div className="d-flex gap-2">
                  {images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`View ${idx + 1}`}
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        cursor: "pointer",
                        border: selectedImage === idx ? "2px solid #000" : "2px solid transparent",
                      }}
                      onClick={() => setSelectedImage(idx)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="card shadow-sm mb-4" style={{ borderRadius: "12px", border: "none" }}>
              <div className="card-body">
                <h5 className="mb-3">About This Service</h5>
                <p className="text-muted mb-4">{service.description}</p>

                <h6 className="mb-3">What's Included</h6>
                <ul className="list-unstyled">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="mb-2">
                      <span className="text-success me-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Reviews */}
            <div className="card shadow-sm" style={{ borderRadius: "12px", border: "none" }}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="mb-0">Customer Reviews</h5>
                  <div className="d-flex align-items-center gap-2">
                    <Star size={20} fill="#ffc107" color="#ffc107" />
                    <span className="fw-bold">{service.rating}</span>
                    <span className="text-muted">({service.reviews} reviews)</span>
                  </div>
                </div>

                {service.reviewsList.map((review, idx) => (
                  <div
                    key={idx}
                    className="mb-4 pb-4"
                    style={{
                      borderBottom:
                        idx < service.reviewsList.length - 1 ? "1px solid #dee2e6" : "none",
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <h6 className="mb-1">{review.user}</h6>
                        <div className="d-flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              fill={i < review.rating ? "#ffc107" : "none"}
                              color="#ffc107"
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-muted small">{review.date}</span>
                    </div>
                    <p className="text-muted mb-0">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="col-lg-4">
            <div
              className="card shadow-sm"
              style={{
                borderRadius: "12px",
                border: "none",
                position: "sticky",
                top: "100px",
              }}
            >
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <h3 className="mb-0">${service.price}</h3>
                    <span className="text-muted small">per service</span>
                  </div>
                  {service.popular && (
                    <span className="badge bg-dark" style={{ borderRadius: "20px" }}>
                      Popular
                    </span>
                  )}
                </div>

                <hr />

                <div className="mb-3">
                  <h6 className="mb-3">Service Details</h6>

                  <div className="d-flex align-items-center gap-2 mb-2">
                    <Clock size={18} className="text-muted" />
                    <div>
                      <div className="small fw-bold">Duration</div>
                      <div className="small text-muted">{service.duration}</div>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-2 mb-2">
                    <MapPin size={18} className="text-muted" />
                    <div>
                      <div className="small fw-bold">Service Area</div>
                      <div className="small text-muted">{service.location}</div>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-2">
                    <Star size={18} className="text-muted" />
                    <div>
                      <div className="small fw-bold">Rating</div>
                      <div className="small text-muted">
                        {service.rating} ({service.reviews} reviews)
                      </div>
                    </div>
                  </div>
                </div>

                <hr />

                <button
                  className="btn btn-dark w-100 mb-2"
                  style={{ borderRadius: "8px", padding: "12px" }}
                >
                  Book Now
                </button>

                <button
                  className="btn btn-outline-dark w-100"
                  style={{ borderRadius: "8px" }}
                >
                  Contact Provider
                </button>

                <p className="text-center text-muted small mt-3 mb-0">
                  Free cancellation up to 24 hours before service
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;