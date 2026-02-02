import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, MapPin, Clock, Package, ArrowLeft, Phone, CheckCircle, Trash2Icon, TrashIcon, AlertCircle, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import service1 from "../../../assets/service4.avif";
import { toast } from "react-toastify";
import api from "../../../api/api";

// Default fallback image
const defaultServiceImage = service1;

// Helper function to convert base64 to image source
const base64ToImageSrc = (base64) => {
  if (!base64) return null;
  const mimeType = base64.startsWith("iVBOR") ? "image/png" : "image/jpeg";
  return `data:${mimeType};base64,${base64}`;
};

// Helper function to get valid images from service
const getServiceImages = (service) => {
  if (!service || !Array.isArray(service.images)) {
    return [defaultServiceImage];
  }

  // Filter out null images and convert base64 to data URLs
  const validImages = service.images
    .filter(img => img !== null)
    .map(img => base64ToImageSrc(img));

  // If no valid images, return default
  if (validImages.length === 0) {
    return [defaultServiceImage];
  }

  return validImages;
};

const ServiceDetailsAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch service details from backend
  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const response = await api.get(`/admin/services/${id}`);
        setService(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching service:', error);
        setLoading(false);
      }
    };

    fetchServiceDetails();
  }, [id]);

  const getCategoryIcon = (category) => {
    const icons = {
      CLEANING: "🧹",
      PLUMBLING: "🔧",
      ELECTRICAL: "💡",
      REPAIR: "🛠️",
      SPA: "💆",
      PAINTING: "🎨",
      GARDENING: "🌿",
      PEST_CONTROL: "🐛"
    };
    return icons[category] || "📦";
  };

  const formatCategoryName = (category) => {
    return category?.replace(/_/g, ' ').toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const handleDelete = async (serviceId) => {
    setIsDeleting(true);
    try {
      await api.delete(`/admin/service/${serviceId}`);
      setShowDeleteConfirm(false);
      setShowDeleteSuccess(true);
      setTimeout(() => {
        navigate("/admin-home/service-listing");
      }, 2000);
    } catch (err) {
      console.error("Failed to delete service:", err);
      alert("Failed to delete service");
      setIsDeleting(false);
    }
  };

  const styles = {
    pageBackground: {
      minHeight: '100vh',
      background: '#ffffff'
    },
    header: {
      background: '#ffffff',
      borderBottom: '1px solid #e0e0e0',
      position: 'sticky',
      top: 0,
      zIndex: 100
    },
    backBtn: {
      background: 'none',
      border: 'none',
      color: '#1e40af',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 0',
      transition: 'color 0.2s ease'
    },
    card: {
      borderRadius: '1rem',
      border: '1px solid #e0e0e0',
      background: '#ffffff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      marginBottom: '1.5rem'
    },
    imageContainer: {
      width: '100%',
      height: '400px',
      background: '#f0f7ff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '1rem 1rem 0 0',
      position: 'relative',
      overflow: 'hidden'
    },
    thumbnail: {
      width: '80px',
      height: '80px',
      borderRadius: '0.5rem',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      objectFit: 'cover'
    },
    categoryBadge: {
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      background: '#1e40af',
      color: '#ffffff',
      padding: '0.5rem 1rem',
      borderRadius: '2rem',
      fontSize: '0.875rem',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    ratingBadge: {
      position: 'absolute',
      top: '1rem',
      left: '1rem',
      background: '#ffffff',
      color: '#000000',
      padding: '0.5rem 1rem',
      borderRadius: '2rem',
      fontSize: '0.875rem',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
      border: '1px solid #e0e0e0'
    },
    priceTag: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: '#1e40af'
    },
    bookBtn: {
      background: '#1e40af',
      border: 'none',
      borderRadius: '0.75rem',
      padding: '1rem',
      color: '#ffffff',
      fontSize: '1rem',
      fontWeight: 'bold',
      width: '100%',
      cursor: 'pointer',
      transition: 'background 0.2s ease'
    },
    outlineBtn: {
      background: '#ffffff',
      border: '2px solid #af1e1e',
      borderRadius: '0.75rem',
      padding: '1rem',
      color: '#af1e1e',
      fontSize: '1rem',
      fontWeight: 'bold',
      width: '100%',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    },
    detailRow: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '1rem',
      marginBottom: '1rem',
      padding: '0.75rem',
      background: '#f8f9fa',
      borderRadius: '0.5rem'
    },
    reviewCard: {
      padding: '1rem',
      background: '#f8f9fa',
      borderRadius: '0.75rem',
      marginBottom: '1rem'
    },
    stickyCard: {
      position: 'sticky',
      top: '100px'
    },
    // Modal styles
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

  if (loading) {
    return (
      <div style={styles.pageBackground}>
        <div className="container text-center py-5">
          <div className="spinner-border" style={{ color: '#1e40af' }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading service details...</p>
        </div>
      </div>
    );
  }

  // Handle invalid service
  if (!service) {
    return (
      <div style={styles.pageBackground}>
        <div className="container text-center py-5">
          <Package size={64} style={{ color: '#e0e0e0' }} />
          <h4 className="mt-3" style={{ color: '#000000' }}>Service not found</h4>
          <p className="text-muted">The service you're looking for doesn't exist.</p>
          <button
            className="btn mt-3"
            style={styles.bookBtn}
            onClick={() => navigate("/services")}
            onMouseOver={(e) => e.target.style.background = '#1e3a8a'}
            onMouseOut={(e) => e.target.style.background = '#1e40af'}
          >
            Back to Services
          </button>
        </div>
      </div>
    );
  }

  // Get images for the service
  const images = getServiceImages(service);

  return (
    <div style={styles.pageBackground}>
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
      {showDeleteConfirm && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <div style={styles.deleteIcon} className="delete-icon-pulse">
              <AlertCircle size={64} />
            </div>
            <h3 style={{ ...styles.modalTitle, ...styles.deleteTitle }}>Delete Service?</h3>
            <p style={styles.modalMessage}>
              Are you sure you want to delete <strong>{service?.serviceName}</strong>? This action cannot be undone.
            </p>
            <div style={styles.modalButtonGroup}>
              <button
                style={{ ...styles.confirmButton, ...styles.deleteButton }}
                onClick={() => handleDelete(service.serviceId)}
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
              The service has been successfully deleted. You'll be redirected shortly.
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={styles.header}>
        <div className="container py-3">
          <button
            style={styles.backBtn}
            onClick={() => navigate(-1)}
            onMouseOver={(e) => e.target.style.color = '#1e3a8a'}
            onMouseOut={(e) => e.target.style.color = '#1e40af'}
          >
            <ArrowLeft size={20} />
            Back to Services
          </button>
        </div>
      </div>

      <div className="container py-4">
        <div className="row">
          {/* LEFT COLUMN */}
          <div className="col-lg-8 mb-4">
            {/* Image Gallery */}
            <div style={styles.card}>
              <div style={styles.imageContainer}>
                <img
                  src={images[selectedImage]}
                  alt={service.serviceName}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    // Fallback if image fails to load
                    e.target.src = defaultServiceImage;
                  }}
                />

                {/* Category Badge */}
                <div style={styles.categoryBadge}>
                  <span>{getCategoryIcon(service.category)}</span>
                  <span>{formatCategoryName(service.category)}</span>
                </div>

                {/* Rating Badge */}
                {service.avgRating > 0 && (
                  <div style={styles.ratingBadge}>
                    <Star size={16} fill="#ffc107" style={{ color: '#ffc107' }} />
                    <span>{service.avgRating.toFixed(1)}</span>
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {images.length > 1 && (
                <div className="card-body">
                  <div className="d-flex gap-2 overflow-auto">
                    {images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`View ${idx + 1}`}
                        style={{
                          ...styles.thumbnail,
                          border: selectedImage === idx ? '3px solid #1e40af' : '1px solid #e0e0e0'
                        }}
                        onClick={() => setSelectedImage(idx)}
                        onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                        onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                        onError={(e) => {
                          e.target.src = defaultServiceImage;
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Service Name & Short Description */}
            <div style={styles.card}>
              <div className="card-body p-4">
                <h2 className="fw-bold mb-3" style={{ color: '#000000' }}>
                  {service.serviceName}
                </h2>
                <p className="text-muted lead mb-0">
                  {service.shortDesc}
                </p>
              </div>
            </div>

            {/* Long Description */}
            {service.longDesc && (
              <div style={styles.card}>
                <div className="card-body p-4">
                  <h5 className="fw-bold mb-3" style={{ color: '#000000' }}>
                    About This Service
                  </h5>
                  <p className="text-muted" style={{ lineHeight: '1.8' }}>
                    {service.longDesc}
                  </p>
                </div>
              </div>
            )}

            {/* What's Included */}
            <div style={styles.card}>
              <div className="card-body p-4">
                <h5 className="fw-bold mb-3" style={{ color: '#000000' }}>
                  What's Included
                </h5>
                <ul className="list-unstyled">
                  <li className="mb-2 d-flex align-items-start gap-2">
                    <CheckCircle size={20} style={{ color: '#1e40af', minWidth: '20px' }} />
                    <span style={{ color: '#000000' }}>Professional and verified service provider</span>
                  </li>
                  <li className="mb-2 d-flex align-items-start gap-2">
                    <CheckCircle size={20} style={{ color: '#1e40af', minWidth: '20px' }} />
                    <span style={{ color: '#000000' }}>All necessary tools and equipment</span>
                  </li>
                  <li className="mb-2 d-flex align-items-start gap-2">
                    <CheckCircle size={20} style={{ color: '#1e40af', minWidth: '20px' }} />
                    <span style={{ color: '#000000' }}>Quality guarantee and support</span>
                  </li>
                  <li className="mb-2 d-flex align-items-start gap-2">
                    <CheckCircle size={20} style={{ color: '#1e40af', minWidth: '20px' }} />
                    <span style={{ color: '#000000' }}>Free rescheduling up to 24 hours before</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Reviews Section */}
            <div style={styles.card}>
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="fw-bold mb-0" style={{ color: '#000000' }}>
                    Customer Reviews
                  </h5>
                  {service.avgRating > 0 && (
                    <div className="d-flex align-items-center gap-2">
                      <Star size={20} fill="#ffc107" style={{ color: '#ffc107' }} />
                      <span className="fw-bold" style={{ color: '#000000' }}>
                        {service.avgRating.toFixed(1)}
                      </span>
                      <span className="text-muted">
                        ({service.reviews?.length || 0} reviews)
                      </span>
                    </div>
                  )}
                </div>

                {service.reviews && service.reviews.length > 0 ? (
                  service.reviews.map((review, idx) => (
                    <div key={idx} style={styles.reviewCard}>
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <div>
                          <h6 className="mb-1 fw-bold" style={{ color: '#000000' }}>
                            {review.userName || 'User'}
                          </h6>
                          <div className="d-flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                fill={i < review.rating ? "#ffc107" : "none"}
                                style={{ color: '#ffc107' }}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-muted small">
                          {review.date ? new Date(review.date).toLocaleDateString() : ''}
                        </span>
                      </div>
                      <p className="text-muted mb-0">
                        {review.review || review.description}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4">
                    <Star size={48} style={{ color: '#e0e0e0' }} />
                    <p className="text-muted mt-2 mb-0">No reviews yet. Be the first to review!</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Booking Card */}
          <div className="col-lg-4">
            <div style={{ ...styles.card, ...styles.stickyCard }}>
              <div className="card-body p-4">
                <div className="mb-4">
                  <div style={styles.priceTag}>
                    ₹{service.price.toLocaleString()}
                  </div>
                  <span className="text-muted">per service</span>
                </div>

                <hr style={{ borderColor: '#e0e0e0' }} />

                <div className="mb-4">
                  <h6 className="mb-3 fw-bold" style={{ color: '#000000' }}>
                    Service Details
                  </h6>

                  <div style={styles.detailRow}>
                    <Package size={20} style={{ color: '#1e40af', minWidth: '20px' }} />
                    <div>
                      <div className="small fw-bold" style={{ color: '#000000' }}>Category</div>
                      <div className="small text-muted">{formatCategoryName(service.category)}</div>
                    </div>
                  </div>

                  <div style={styles.detailRow}>
                    <Star size={20} style={{ color: '#1e40af', minWidth: '20px' }} />
                    <div>
                      <div className="small fw-bold" style={{ color: '#000000' }}>Rating</div>
                      <div className="small text-muted">
                        {service.avgRating > 0
                          ? `${service.avgRating.toFixed(1)} (${service.reviews?.length || 0} reviews)`
                          : 'No ratings yet'}
                      </div>
                    </div>
                  </div>

                  <div style={styles.detailRow}>
                    <CheckCircle size={20} style={{ color: '#1e40af', minWidth: '20px' }} />
                    <div>
                      <div className="small fw-bold" style={{ color: '#000000' }}>Guarantee</div>
                      <div className="small text-muted">100% satisfaction guaranteed</div>
                    </div>
                  </div>
                </div>

                <hr style={{ borderColor: '#e0e0e0' }} />

                <button
                  style={styles.bookBtn}
                  onMouseOver={(e) => e.target.style.background = '#1e3a8a'}
                  onMouseOut={(e) => e.target.style.background = '#1e40af'}
                  onClick={() => navigate(`/admin-home/edit-service/${service.serviceId}`)}
                >
                  Edit Service
                </button>

                <button
                  style={styles.outlineBtn}
                  className="mt-2"
                  onMouseOver={(e) => {
                    e.target.style.background = '#b41f1f';
                    e.target.style.color = '#ffffff';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = '#ffffff';
                    e.target.style.color = '#af1e1e';
                  }}
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  <Trash2Icon size={18} className="me-2" />
                  Delete service
                </button>

                <p className="text-center text-muted small mt-3 mb-0">
                  <Clock size={14} className="me-1" />
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

export default ServiceDetailsAdmin;