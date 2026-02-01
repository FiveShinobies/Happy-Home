import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Calendar, MapPin, Star, ArrowLeft, User, Phone, DollarSign, 
  Package, Clock, CheckCircle, AlertCircle, CreditCard
} from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../../../api/api";

export default function ViewOrderDetail() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);

  const vendorId = 1; // Replace with actual logged-in vendor ID

  // Fetch order details from backend
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await api.get(
          `/order/${orderId}`
        );
        console.log('Fetched order details:', response.data);
        setOrderData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching order details:', error);
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId, vendorId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getStatusColor = (status) => {
    const statusColors = {
      'ASSIGNED': { bg: '#e3f2fd', text: '#1976d2' },
      'COMPLETED': { bg: '#e8f5e9', text: '#388e3c' },
      'CANCELLED': { bg: '#ffebee', text: '#d32f2f' },
      'IN_PROGRESS': { bg: '#fff3e0', text: '#f57c00' },
      'PENDING': { bg: '#f3e5f5', text: '#7b1fa2' }
    };
    return statusColors[status] || { bg: '#f5f5f5', text: '#757575' };
  };

  const getPriorityColor = (priority) => {
    return priority === 'URGENT' ? '#d32f2f' : '#757575';
  };

  const getPaymentStatusColor = (status) => {
    const statusColors = {
      'SUCCESS': { bg: '#e8f5e9', text: '#388e3c' },
      'PENDING': { bg: '#fff3e0', text: '#f57c00' },
      'FAILED': { bg: '#ffebee', text: '#d32f2f' }
    };
    return statusColors[status] || { bg: '#f5f5f5', text: '#757575' };
  };

  const styles = {
    pageBackground: {
      minHeight: '100vh',
      background: '#ffffff',
      padding: '2rem'
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
      marginBottom: '1.5rem'
    },
    card: {
      borderRadius: '1rem',
      border: '1px solid #e0e0e0',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      background: '#ffffff',
      marginBottom: '1.5rem'
    },
    sectionTitle: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      color: '#000000'
    },
    infoRow: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '1rem',
      marginBottom: '1rem',
      padding: '0.75rem',
      background: '#f8f9fa',
      borderRadius: '0.5rem'
    },
    statusBadge: {
      padding: '0.375rem 0.75rem',
      borderRadius: '1rem',
      fontSize: '0.75rem',
      fontWeight: '600',
      display: 'inline-block'
    },
    primaryBtn: {
      background: '#1e40af',
      color: '#ffffff',
      padding: '1rem 2rem',
      borderRadius: '0.75rem',
      border: 'none',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'background 0.2s ease'
    }
  };

  if (loading) {
    return (
      <div style={styles.pageBackground}>
        <div className="container text-center py-5">
          <div className="spinner-border" style={{ color: '#1e40af' }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!orderData) {
    return (
      <div style={styles.pageBackground}>
        <div className="container text-center py-5">
          <Package size={64} style={{ color: '#e0e0e0' }} />
          <h3 className="mt-3" style={{ color: '#000000' }}>Order not found</h3>
          <button 
            onClick={() => navigate(-1)}
            style={styles.primaryBtn}
            className="mt-3"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const statusStyle = getStatusColor(orderData.status);
  const paymentStyle = getPaymentStatusColor(orderData.paymentStatus);

  return (
    <div style={styles.pageBackground}>
      <div className="container">
        {/* Back Button */}
        <button
          style={styles.backBtn}
          onClick={() => navigate(-1)}
          onMouseOver={(e) => e.target.style.color = '#1e3a8a'}
          onMouseOut={(e) => e.target.style.color = '#1e40af'}
        >
          <ArrowLeft size={20} />
          Back to Order History
        </button>

        {/* Main Card */}
        <div style={styles.card}>
          <div className="card-body p-4">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-start mb-4">
              <div className="d-flex align-items-start gap-3">
                <div 
                  style={{
                    width: '60px',
                    height: '60px',
                    background: '#f0f7ff',
                    borderRadius: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Package size={32} style={{ color: '#1e40af' }} />
                </div>
                <div>
                  <h2 className="fw-bold mb-1" style={{ color: '#000000' }}>
                    {orderData.serviceName}
                  </h2>
                  <p className="text-muted mb-2">Order #{orderData.orderId}</p>
                  <p className="small text-muted mb-0">{orderData.serviceShortDesc}</p>
                </div>
              </div>

              <div className="text-end">
                <span 
                  style={{
                    ...styles.statusBadge,
                    background: statusStyle.bg,
                    color: statusStyle.text
                  }}
                >
                  {orderData.status}
                </span>
                {orderData.priority === 'URGENT' && (
                  <span 
                    style={{
                      ...styles.statusBadge,
                      background: '#ffebee',
                      color: '#d32f2f',
                      marginLeft: '0.5rem'
                    }}
                  >
                    URGENT
                  </span>
                )}
              </div>
            </div>

            {/* Order Information Grid */}
            <div className="row g-3 mb-4">
              {/* Date & Time */}
              <div className="col-md-6">
                <div style={styles.infoRow}>
                  <Calendar size={20} style={{ color: '#1e40af', minWidth: '20px' }} />
                  <div className="flex-grow-1">
                    <div className="small text-muted mb-1">Order Date & Time</div>
                    <div className="fw-semibold" style={{ color: '#000000' }}>
                      {formatDate(orderData.orderDateTime)}
                    </div>
                    <div className="small text-muted">
                      {formatTime(orderData.orderDateTime)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Time Slot */}
              <div className="col-md-6">
                <div style={styles.infoRow}>
                  <Clock size={20} style={{ color: '#1e40af', minWidth: '20px' }} />
                  <div className="flex-grow-1">
                    <div className="small text-muted mb-1">Service Time Slot</div>
                    <div className="fw-semibold" style={{ color: '#000000' }}>
                      {formatDate(orderData.timeSlot)} at {formatTime(orderData.timeSlot)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Address */}
              <div className="col-12">
                <div style={styles.infoRow}>
                  <MapPin size={20} style={{ color: '#1e40af', minWidth: '20px' }} />
                  <div className="flex-grow-1">
                    <div className="small text-muted mb-1">Service Address</div>
                    <div className="fw-semibold" style={{ color: '#000000' }}>
                      {orderData.homeNo ? `${orderData.homeNo}, ` : ''}{orderData.town}
                    </div>
                    <div className="small text-muted">
                      {orderData.city}, {orderData.state} - {orderData.pincode}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Vendor Information */}
            <div style={styles.card}>
              <div className="card-body p-3">
                <h3 style={styles.sectionTitle}>
                  <User size={24} style={{ color: '#1e40af' }} />
                  Vendor Information
                </h3>

                <div className="row g-3">
                  <div className="col-md-4">
                    <div style={styles.infoRow}>
                      <User size={18} style={{ color: '#1e40af', minWidth: '18px' }} />
                      <div>
                        <div className="small text-muted">Vendor Name</div>
                        <div className="fw-semibold" style={{ color: '#000000' }}>
                          {orderData.vendorFirstName} {orderData.vendorLastName}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div style={styles.infoRow}>
                      <Phone size={18} style={{ color: '#1e40af', minWidth: '18px' }} />
                      <div>
                        <div className="small text-muted">Phone</div>
                        <div className="fw-semibold" style={{ color: '#000000' }}>
                          {orderData.vendorPhone}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div style={styles.infoRow}>
                      <Star size={18} style={{ color: '#1e40af', minWidth: '18px' }} />
                      <div>
                        <div className="small text-muted">Experience</div>
                        <div className="fw-semibold" style={{ color: '#000000' }}>
                          {orderData.vendorExperience} years
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Summary */}
            <div style={styles.card}>
              <div className="card-body p-3">
                <h3 style={styles.sectionTitle}>
                  <DollarSign size={24} style={{ color: '#1e40af' }} />
                  Payment Summary
                </h3>

                <div className="mb-3">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Service Price</span>
                    <span className="fw-semibold" style={{ color: '#000000' }}>
                      ₹{orderData.servicePrice.toLocaleString()}
                    </span>
                  </div>
                  {orderData.priority === 'URGENT' && (
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">Priority Fee</span>
                      <span className="fw-semibold" style={{ color: '#1e40af' }}>
                        Included
                      </span>
                    </div>
                  )}
                  <div className="d-flex justify-content-between pt-3 border-top">
                    <span className="h5 fw-bold mb-0" style={{ color: '#000000' }}>
                      Total Amount
                    </span>
                    <span className="h5 fw-bold mb-0" style={{ color: '#1e40af' }}>
                      ₹{orderData.orderPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div style={styles.infoRow}>
                  <CreditCard size={20} style={{ color: '#1e40af', minWidth: '20px' }} />
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <div className="small text-muted">Payment Status</div>
                        <span 
                          style={{
                            ...styles.statusBadge,
                            background: paymentStyle.bg,
                            color: paymentStyle.text
                          }}
                        >
                          {orderData.paymentStatus}
                        </span>
                      </div>
                      <div className="text-end">
                        <div className="small text-muted">Payment ID</div>
                        <div className="small fw-semibold" style={{ color: '#000000' }}>
                          {orderData.paymentId}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Review */}
            {orderData.rating && (
              <div style={styles.card}>
                <div className="card-body p-3">
                  <h3 style={styles.sectionTitle}>
                    <Star size={24} style={{ color: '#1e40af' }} />
                    Customer Review
                  </h3>

                  <div style={styles.infoRow}>
                    <div className="flex-grow-1">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={20}
                            fill={i < orderData.rating ? '#ffc107' : 'none'}
                            style={{ color: '#ffc107' }}
                          />
                        ))}
                        <span className="fw-bold ms-2" style={{ color: '#000000' }}>
                          {orderData.rating}/5
                        </span>
                      </div>
                      {orderData.reviewDescription && (
                        <p className="mb-0 text-muted">"{orderData.reviewDescription}"</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Action Button */}
            <div className="text-end mt-4">
              <button
                onClick={() => navigate(`/vendor-home/vendors-feedback/${orderData.orderId}`)}
                style={styles.primaryBtn}
                onMouseOver={(e) => e.target.style.background = '#1e3a8a'}
                onMouseOut={(e) => e.target.style.background = '#1e40af'}
              >
                Give Feedback
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}