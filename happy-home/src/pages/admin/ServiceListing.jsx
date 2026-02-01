import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Edit, Trash2, Package, Star, AlertCircle, CheckCircle2 } from "lucide-react";
import service1 from "../../assets/service1.jpg";
import service2 from "../../assets/service2.jpg";
import service3 from "../../assets/service3.jpg";
import service4 from "../../assets/service4.avif";
import service5 from "../../assets/service5.avif";
import api from "../../api/api";

const imageData = [service1, service2, service3, service4, service5];

export const getAllServices = async () => {
  try {
    const response = await api.get("/admin/services");
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
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
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

  const handleDeleteClick = (service) => {
    setSelectedService(service);
    setShowDeleteConfirm(true);
  };

  const handleDelete = async (id) => {
    setIsDeleting(true);
    try {
      await api.delete(`/admin/service/${id}`);
      setShowDeleteConfirm(false);
      setShowDeleteSuccess(true);
      setTimeout(() => {
        setShowDeleteSuccess(false);
        fetchServices();
      }, 1500);
    } catch (err) {
      console.error("Failed to delete service:", err);
      alert("Failed to delete service");
      setIsDeleting(false);
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

  const styles = {
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      animation: 'fadeIn 0.3s ease-out'
    },
    modalContent: {
      backgroundColor: '#ffffff',
      borderRadius: '1rem',
      padding: '2.5rem',
      textAlign: 'center',
      maxWidth: '450px',
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
      animation: 'slideUp 0.4s ease-out'
    },
    deleteIcon: {
      color: '#dc3545',
      marginBottom: '1rem'
    },
    successIcon: {
      color: '#10b981',
      marginBottom: '1rem'
    },
    modalTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginBottom: '0.5rem',
      color: '#000000'
    },
    deleteTitle: {
      color: '#dc3545'
    },
    successTitle: {
      color: '#10b981'
    },
    modalMessage: {
      color: '#6b7280',
      fontSize: '0.95rem',
      marginBottom: '2rem',
      lineHeight: '1.5'
    },
    modalButtonGroup: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'center'
    },
    confirmButton: {
      padding: '0.75rem 1.5rem',
      borderRadius: '0.75rem',
      fontSize: '1rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      border: 'none',
      transition: 'all 0.2s ease'
    },
    deleteButton: {
      backgroundColor: '#dc3545',
      color: '#ffffff'
    },
    cancelButton: {
      backgroundColor: '#ffffff',
      color: '#6c757d',
      border: '2px solid #6c757d'
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff" }}>
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        
        .delete-icon-pulse {
          animation: pulse 0.6s ease-in-out;
        }
      `}</style>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && selectedService && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <div style={styles.deleteIcon} className="delete-icon-pulse">
              <AlertCircle size={64} />
            </div>
            <h3 style={{ ...styles.modalTitle, ...styles.deleteTitle }}>Delete Service?</h3>
            <p style={styles.modalMessage}>
              Are you sure you want to delete <strong>{selectedService.serviceName}</strong>? This action cannot be undone.
            </p>
            <div style={styles.modalButtonGroup}>
              <button
                style={{ ...styles.confirmButton, ...styles.deleteButton }}
                onClick={() => handleDelete(selectedService.serviceID)}
                disabled={isDeleting}
                onMouseOver={(e) => !isDeleting && (e.target.style.backgroundColor = '#b02a2a')}
                onMouseOut={(e) => (e.target.style.backgroundColor = '#dc3545')}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
              <button
                style={{ ...styles.confirmButton, ...styles.cancelButton }}
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isDeleting}
                onMouseOver={(e) => !isDeleting && (e.target.style.backgroundColor = '#6c757d') && (e.target.style.color = '#ffffff')}
                onMouseOut={(e) => (e.target.style.backgroundColor = '#ffffff') && (e.target.style.color = '#6c757d')}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Success Modal */}
      {showDeleteSuccess && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <div style={styles.successIcon}>
              <CheckCircle2 size={64} />
            </div>
            <h3 style={{ ...styles.modalTitle, ...styles.successTitle }}>Service Deleted!</h3>
            <p style={styles.modalMessage}>
              The service has been successfully deleted. Refreshing list...
            </p>
          </div>
        </div>
      )}
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
                          handleDeleteClick(service)
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
