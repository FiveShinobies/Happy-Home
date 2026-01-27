// import { useState, useEffect } from 'react';
// import { Card, Button, Badge, Alert, Row, Col } from 'react-bootstrap';
// import { useNavigate, useParams } from 'react-router-dom';
// import { ArrowLeft, Edit, Calendar, DollarSign, Tag } from 'lucide-react';
// import dayjs from 'dayjs';

// let services = [
//   {
//     id: 1,
//     name: 'Home Cleaning',
//     description: 'Professional deep cleaning service for your entire home',
//     fullDescription: 'Our comprehensive home cleaning service includes dusting, vacuuming, mopping, bathroom sanitization, kitchen cleaning, and more. Our trained professionals use eco-friendly products to ensure your home is spotless and safe for your family.',
//     price: 99.99,
//     category: 'Cleaning',
//     image: 'https://images.pexels.com/photos/4108715/pexels-photo-4108715.jpeg?auto=compress&cs=tinysrgb&w=800',
//     createdAt: dayjs().subtract(30, 'day').format(),
//     updatedAt: dayjs().subtract(5, 'day').format(),
//   },
//   {
//     id: 2,
//     name: 'Plumbing Services',
//     description: 'Expert plumbing solutions for all your household needs',
//     fullDescription: 'From fixing leaky faucets to installing new fixtures, our licensed plumbers handle all plumbing tasks with precision. We offer emergency services, pipe repairs, drain cleaning, water heater installation, and complete bathroom renovations.',
//     price: 150.00,
//     category: 'Maintenance',
//     image: 'https://images.pexels.com/photos/8860752/pexels-photo-8860752.jpeg?auto=compress&cs=tinysrgb&w=800',
//     createdAt: dayjs().subtract(25, 'day').format(),
//     updatedAt: dayjs().subtract(10, 'day').format(),
//   },
//   {
//     id: 3,
//     name: 'Electrical Repair',
//     description: 'Safe and reliable electrical services by certified electricians',
//     fullDescription: 'Our certified electricians provide comprehensive electrical services including wiring installation, circuit breaker repairs, lighting fixture installation, electrical panel upgrades, and safety inspections. We ensure all work meets local codes and safety standards.',
//     price: 120.00,
//     category: 'Maintenance',
//     image: 'https://images.pexels.com/photos/5691621/pexels-photo-5691621.jpeg?auto=compress&cs=tinysrgb&w=800',
//     createdAt: dayjs().subtract(20, 'day').format(),
//     updatedAt: dayjs().subtract(8, 'day').format(),
//   },
//   {
//     id: 4,
//     name: 'Lawn Care',
//     description: 'Keep your lawn green and beautiful all year round',
//     fullDescription: 'Our lawn care specialists provide mowing, edging, fertilization, weed control, aeration, and seasonal cleanup services. We create customized maintenance plans to keep your lawn healthy and attractive throughout the year.',
//     price: 75.00,
//     category: 'Gardening',
//     image: 'https://images.pexels.com/photos/1453499/pexels-photo-1453499.jpeg?auto=compress&cs=tinysrgb&w=800',
//     createdAt: dayjs().subtract(15, 'day').format(),
//     updatedAt: dayjs().subtract(3, 'day').format(),
//   },
//   {
//     id: 5,
//     name: 'Pest Control',
//     description: 'Eliminate pests safely and effectively from your home',
//     fullDescription: 'Our pest control experts use safe, environmentally-friendly methods to eliminate and prevent infestations of insects, rodents, and other pests. We offer one-time treatments and ongoing maintenance plans with guaranteed results.',
//     price: 130.00,
//     category: 'Maintenance',
//     image: 'https://images.pexels.com/photos/5217915/pexels-photo-5217915.jpeg?auto=compress&cs=tinysrgb&w=800',
//     createdAt: dayjs().subtract(12, 'day').format(),
//     updatedAt: dayjs().subtract(2, 'day').format(),
//   },
//   {
//     id: 6,
//     name: 'HVAC Service',
//     description: 'Heating and cooling system installation and maintenance',
//     fullDescription: 'Stay comfortable year-round with our HVAC services. We install, repair, and maintain heating and air conditioning systems, perform seasonal tune-ups, replace filters, and provide emergency repairs to ensure optimal performance and energy efficiency.',
//     price: 180.00,
//     category: 'Maintenance',
//     image: 'https://images.pexels.com/photos/5463577/pexels-photo-5463577.jpeg?auto=compress&cs=tinysrgb&w=800',
//     createdAt: dayjs().subtract(8, 'day').format(),
//     updatedAt: dayjs().subtract(1, 'day').format(),
//   },
// ];

// export const getAllServices = () => {
//   return [...services];
// };

// export const getServiceById = (id) => {
//   return services.find(service => service.id === parseInt(id));
// };

// export const addService = (serviceData) => {
//   const newService = {
//     ...serviceData,
//     id: Math.max(...services.map(s => s.id), 0) + 1,
//     createdAt: dayjs().format(),
//     updatedAt: dayjs().format(),
//   };
//   services.push(newService);
//   return newService;
// };

// export const updateService = (id, serviceData) => {
//   const index = services.findIndex(service => service.id === parseInt(id));
//   if (index !== -1) {
//     services[index] = {
//       ...services[index],
//       ...serviceData,
//       id: services[index].id,
//       createdAt: services[index].createdAt,
//       updatedAt: dayjs().format(),
//     };
//     return services[index];
//   }
//   return null;
// };

// export const deleteService = (id) => {
//   const index = services.findIndex(service => service.id === parseInt(id));
//   if (index !== -1) {
//     services.splice(index, 1);
//     return true;
//   }
//   return false;
// };

// function ServiceDetailsAdmin() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [service, setService] = useState(null);
//   const [notFound, setNotFound] = useState(false);

//   useEffect(() => {
//     const foundService = getServiceById(id);
//     if (foundService) {
//       setService(foundService);
//     } else {
//       setNotFound(true);
//     }
//   }, [id]);

//   const handleBack = () => {
//     navigate('/');
//   };

//   const handleEdit = () => {
//     navigate(`/admin-home/edit-service/${id}`);
//   };

//   if (notFound) {
//     return (
//       <div>
//         <Alert variant="danger">
//           Service not found!
//         </Alert>
//         <Button variant="primary" onClick={handleBack}>
//           <ArrowLeft size={16} className="me-1" />
//           Back to List
//         </Button>
//       </div>
//     );
//   }

//   if (!service) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2 className="text-primary mb-0">Service Details</h2>
//         <div className="d-flex gap-2">
//           <Button variant="outline-primary" onClick={handleEdit}>
//             <Edit size={16} className="me-1" />
//             Edit Service
//           </Button>
//           <Button variant="outline-secondary" onClick={handleBack}>
//             <ArrowLeft size={16} className="me-1" />
//             Back to List
//           </Button>
//         </div>
//       </div>

//       <Card className="shadow-sm">
//         <Card.Img
//           variant="top"
//           src={service.image}
//           alt={service.name}
//           style={{ height: '400px', objectFit: 'cover' }}
//         />
//         <Card.Body>
//           <div className="d-flex justify-content-between align-items-start mb-3">
//             <div>
//               <h3 className="text-primary mb-2">{service.name}</h3>
//               <Badge bg="secondary" className="me-2">
//                 <Tag size={14} className="me-1" />
//                 {service.category}
//               </Badge>
//             </div>
//             <div className="text-end">
//               <div className="text-muted small">Price</div>
//               <h4 className="text-primary mb-0">
//                 <DollarSign size={20} className="d-inline" />
//                 {service.price.toFixed(2)}
//               </h4>
//             </div>
//           </div>

//           <hr />

//           <h5 className="text-dark mb-3">Description</h5>
//           <p className="text-muted" style={{ lineHeight: '1.8' }}>
//             {service.fullDescription}
//           </p>

//           <hr />

//           <Row className="mt-4">
//             <Col md={6}>
//               <div className="d-flex align-items-center text-muted mb-2">
//                 <Calendar size={18} className="me-2" />
//                 <div>
//                   <small className="d-block">Created</small>
//                   <strong className="text-dark">
//                     {dayjs(service.createdAt).format('MMM DD, YYYY')}
//                   </strong>
//                   <small className="d-block text-muted">
//                     {dayjs(service.createdAt).format('h:mm A')}
//                   </small>
//                 </div>
//               </div>
//             </Col>
//             <Col md={6}>
//               <div className="d-flex align-items-center text-muted mb-2">
//                 <Calendar size={18} className="me-2" />
//                 <div>
//                   <small className="d-block">Last Updated</small>
//                   <strong className="text-dark">
//                     {dayjs(service.updatedAt).format('MMM DD, YYYY')}
//                   </strong>
//                   <small className="d-block text-muted">
//                     {dayjs(service.updatedAt).format('h:mm A')}
//                   </small>
//                 </div>
//               </div>
//             </Col>
//           </Row>
//         </Card.Body>
//       </Card>
//     </div>
//   );
// }

// export default ServiceDetailsAdmin;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, MapPin, Clock, Package, ArrowLeft, Phone, CheckCircle, Trash2Icon, TrashIcon } from "lucide-react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import service1 from "../../../assets/service1.jpg";
import service2 from "../../../assets/service2.jpg";
import service3 from "../../../assets/service3.jpg";
import service4 from "../../../assets/service4.avif";

const ServiceDetailsAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  // Fetch service details from backend
  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/admin/services/${id}`);
        console.log('Fetched service:', response.data);
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

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;

    try {
      await axios.delete(`http://localhost:8080/admin/service/${id}`);

      alert("Service deleted successfully");
      navigate("/admin-home/service-listing");
      setTimeout(() => setShowAlert(false), 3000);
    } catch (err) {
      alert("Failed to delete service");
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

  // Prepare images array (use provided images or show placeholder)
  // const images = service.images && service.images.length > 0
  //   ? service.images
  //   : [image1, image2];
  const images = [service2, service1, service3];

  return (
    <div style={styles.pageBackground}>
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
                {images.length > 0 ? (
                  <img
                    src={images[selectedImage]}
                    alt={service.serviceName}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <Package size={80} style={{ color: '#1e40af', opacity: 0.3 }} />
                )}

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
                    e.target.style.color = '#af1e3b';
                  }}
                  onClick={() => handleDelete(service.serviceId)}
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