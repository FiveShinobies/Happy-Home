import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Edit, Trash2, Package, Star } from "lucide-react";
import axios from "axios";
import service1 from "../../assets/service1.jpg.jpeg";
import service2 from "../../assets/service2.jpg.jpeg";
import service3 from "../../assets/service3.jpg.jpeg";
import service4 from "../../assets/service4.avif";
import service5 from "../../assets/service5.avif";

const imageData = [service1, service2, service3, service4, service5];

export const getAllServices = async () => {
  try {
    const response = await axios.get("http://localhost:8080/admin/services");
    return response.data;
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
};

function ServiceListing() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const data = await getAllServices();
      setServices(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;

    try {
      await axios.delete(`http://localhost:8080/admin/service/${id}`);
      fetchServices();
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } catch (err) {
      alert("Failed to delete service");
    }
  };

  if (loading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-primary" />
        <p className="mt-3 text-muted">Loading services...</p>
      </div>
    );
  }

  let min = 1;
  let max = 5;
  let random = Math.floor(Math.random() * (max - min + 1)) + min;


  return (
    <div style={{ minHeight: "100vh", background: "#ffffff" }}>
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #f0f7ff, #ffffff)",
          borderBottom: "1px solid #e0e0e0",
          padding: "3rem 0",
        }}
      >
        <div className="container text-center">
          <h1 className="fw-bold mb-2">Manage Services</h1>
          <p className="text-muted mb-4">
            Add, edit, or remove services offered on the platform
          </p>

          <button
            className="btn btn-primary"
            style={{ background: "#1e40af" }}
            onClick={() => navigate("/admin-home/add-service")}
          >
            Add New Service
          </button>
        </div>
      </div>

      {/* Alert */}
      {showAlert && (
        <div className="container mt-4">
          <div className="alert alert-success">
            Service deleted successfully!
          </div>
        </div>
      )}

      {/* Services Grid */}
      <div className="container py-5">
        {services.length === 0 ? (
          <div className="text-center py-5">
            <Package size={64} style={{ color: "#e0e0e0" }} />
            <h3 className="mt-3">No services available</h3>
            <p className="text-muted">Start by adding a new service</p>
          </div>
        ) : (
          <div className="row g-4">
            {services.map((service) => (
              <div key={service.serviceID} className="col-md-6 col-lg-4">
                <div
                  style={{
                    borderRadius: "1rem",
                    border: "1px solid #e0e0e0",
                    background: "#ffffff",
                    overflow: "hidden",
                    transition: "all 0.25s ease",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 10px 24px rgba(0,0,0,0.12)";
                    e.currentTarget.style.transform = "translateY(-6px)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {/* Image */}
                  <div
                    style={{
                      height: "200px",
                      background: "#f0f7ff",
                      position: "relative",
                    }}
                  >
                    <img
                      src={service[`serviceImage${random}`] || imageData[service.serviceID % imageData.length]}

                      alt={service.serviceName}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />

                    {/* Rating - Top Left */}
                    {service.rating > 0 && (
                      <div
                        style={{
                          position: "absolute",
                          top: "10px",
                          left: "10px",
                          background: "#ffffff",
                          padding: "4px 10px",
                          borderRadius: "1rem",
                          fontSize: "0.75rem",
                          fontWeight: "600",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          boxShadow:
                            "0 2px 8px rgba(0,0,0,0.15)",
                        }}
                      >
                        <Star size={12} fill="#ffc107" color="#ffc107" />
                        {service.rating}
                      </div>
                    )}

                    {/* Category - Top Right */}
                    <div
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        background: "#1e40af",
                        color: "#ffffff",
                        padding: "4px 12px",
                        borderRadius: "1rem",
                        fontSize: "0.7rem",
                        fontWeight: "600",
                        boxShadow:
                          "0 2px 8px rgba(30,64,175,0.4)",
                      }}
                    >
                      {service.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-3">
                    <h5 className="fw-bold mb-2">
                      {service.serviceName}
                    </h5>

                    <p className="text-muted small mb-3">
                      {service.shortDesc}
                    </p>

                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="fw-bold text-primary">
                        ₹{service.price.toLocaleString()}
                      </span>
                      <span className="text-muted small">
                        per service
                      </span>
                    </div>

                    {/* Admin Actions */}
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-outline-primary btn-sm flex-fill"
                        onClick={() =>
                          navigate(
                            `/admin-home/view-service/${service.serviceID}`
                          )
                        }
                      >
                        <Eye size={14} /> View
                      </button>

                      <button
                        className="btn btn-outline-secondary btn-sm flex-fill"
                        onClick={() =>
                          navigate(
                            `/admin-home/edit-service/${service.serviceID}`
                          )
                        }
                      >
                        <Edit size={14} /> Edit
                      </button>

                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() =>
                          handleDelete(service.serviceID)
                        }
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ServiceListing;