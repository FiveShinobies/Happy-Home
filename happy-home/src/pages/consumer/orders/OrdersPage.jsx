import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, User, Package, AlertCircle, CheckCircle, Eye, Star, DollarSign } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginRequired from '../service/LoginRequired';
import { useNavigate} from 'react-router-dom';
import api from "../../../api/api";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('ALL');
  const navigate = useNavigate();
  const isLoggedIn = sessionStorage.getItem('user') !== null;
  if (!isLoggedIn) {
     return (
    <LoginRequired
      onLogin={() =>
        navigate('/login')
      }
    />
  );
    }
  // Fetch orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const cid = JSON.parse(sessionStorage.getItem('user')).userId;
        const response = await api.get(`/consumer/${cid}/allOrders`);
        console.log('Fetched orders:', response.data);
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    const statusColors = {
      'ASSIGNED': { bg: '#e3f2fd', text: '#1976d2', border: '#1976d2' },
      'COMPLETED': { bg: '#e8f5e9', text: '#388e3c', border: '#388e3c' },
      'CANCELLED': { bg: '#ffebee', text: '#d32f2f', border: '#d32f2f' },
      'IN_PROGRESS': { bg: '#fff3e0', text: '#f57c00', border: '#f57c00' },
      'PENDING': { bg: '#f3e5f5', text: '#7b1fa2', border: '#7b1fa2' }
    };
    return statusColors[status] || { bg: '#f5f5f5', text: '#757575', border: '#757575' };
  };

  const getPaymentStatusColor = (status) => {
    const statusColors = {
      'SUCCESS': { bg: '#e8f5e9', text: '#388e3c', border: '#388e3c' },
      'PENDING': { bg: '#fff3e0', text: '#f57c00', border: '#f57c00' },
      'FAILED': { bg: '#ffebee', text: '#d32f2f', border: '#d32f2f' }
    };
    return statusColors[status] || { bg: '#f5f5f5', text: '#757575', border: '#757575' };
  };

  const getPriorityColor = (priority) => {
    return priority === 'URGENT' ? '#d32f2f' : '#757575';
  };

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

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowDetailsModal(true);
  };

  const filteredOrders = filterStatus === 'ALL' 
    ? orders 
    : orders.filter(order => order.status === filterStatus);

  const styles = {
    pageBackground: {
      minHeight: '100vh',
      background: '#ffffff',
      padding: '2rem 0'
    },
    header: {
      marginBottom: '2rem'
    },
    filterBtn: {
      padding: '0.5rem 1.5rem',
      borderRadius: '2rem',
      border: '2px solid #e0e0e0',
      background: '#ffffff',
      color: '#000000',
      cursor: 'pointer',
      fontSize: '0.875rem',
      fontWeight: '500',
      transition: 'all 0.2s ease'
    },
    filterBtnActive: {
      background: '#1e40af',
      color: '#ffffff',
      border: '2px solid #1e40af'
    },
    orderCard: {
      borderRadius: '1rem',
      border: '1px solid #e0e0e0',
      background: '#ffffff',
      padding: '1.5rem',
      marginBottom: '1rem',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    },
    statusBadge: {
      padding: '0.375rem 0.75rem',
      borderRadius: '1rem',
      fontSize: '0.75rem',
      fontWeight: '600',
      display: 'inline-block'
    },
    iconCircle: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      background: '#f0f7ff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    actionBtn: {
      padding: '0.5rem 1rem',
      borderRadius: '0.5rem',
      border: 'none',
      background: '#1e40af',
      color: '#ffffff',
      cursor: 'pointer',
      fontSize: '0.875rem',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      transition: 'background 0.2s ease'
    },
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    },
    modalContent: {
      background: '#ffffff',
      borderRadius: '1rem',
      maxWidth: '700px',
      width: '100%',
      maxHeight: '90vh',
      overflow: 'auto',
      position: 'relative'
    },
    detailRow: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '1rem',
      marginBottom: '1rem',
      padding: '0.75rem',
      background: '#f8f9fa',
      borderRadius: '0.5rem'
    }
  };

  if (loading) {
    return (
      <div style={styles.pageBackground}>
        <div className="container text-center py-5">
          <div className="spinner-border" style={{ color: '#1e40af' }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.pageBackground}>
      <div className="container">
        {/* Header */}
        <div style={styles.header}>
          <h1 className="display-6 fw-bold mb-2" style={{ color: '#000000' }}>My Orders</h1>
          <p className="text-muted">Track and manage all your service bookings</p>
        </div>

        {/* Filter Buttons */}
        <div className="d-flex flex-wrap gap-2 mb-4">
          {['ALL', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'].map((status) => (
            <button
              key={status}
              style={{
                ...styles.filterBtn,
                ...(filterStatus === status ? styles.filterBtnActive : {})
              }}
              onClick={() => setFilterStatus(status)}
              onMouseOver={(e) => {
                if (filterStatus !== status) {
                  e.target.style.borderColor = '#1e40af';
                }
              }}
              onMouseOut={(e) => {
                if (filterStatus !== status) {
                  e.target.style.borderColor = '#e0e0e0';
                }
              }}
            >
              {status.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-5">
            <Package size={64} style={{ color: '#e0e0e0' }} />
            <h3 className="mt-3" style={{ color: '#000000' }}>No orders found</h3>
            <p className="text-muted">You don't have any {filterStatus.toLowerCase()} orders yet</p>
          </div>
        ) : (
          <div className="row">
            {filteredOrders.map((order) => {
              const statusStyle = getStatusColor(order.status);
              return (
                <div key={order.orderId} className="col-12">
                  <div 
                    style={styles.orderCard}
                    onClick={() => handleViewOrder(order)}
                    onMouseOver={(e) => {
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div className="row align-items-start">
                      {/* Service Icon & Name */}
                      <div className="col-md-5">
                        <div className="d-flex align-items-start gap-3">
                          <div style={styles.iconCircle}>
                            <Package size={20} style={{ color: '#1e40af' }} />
                          </div>
                          <div className="flex-grow-1">
                            <h5 className="mb-1 fw-bold" style={{ color: '#000000' }}>
                              {order.serviceName}
                            </h5>
                            <p className="small text-muted mb-2">
                              Order #{order.orderId}
                            </p>
                            <div className="d-flex align-items-center gap-2 flex-wrap">
                              <span 
                                style={{
                                  ...styles.statusBadge,
                                  background: statusStyle.bg,
                                  color: statusStyle.text,
                                  border: `1px solid ${statusStyle.border}`
                                }}
                              >
                                {order.status}
                              </span>
                              {order.priority === 'URGENT' && (
                                <span 
                                  style={{
                                    ...styles.statusBadge,
                                    background: '#ffebee',
                                    color: '#d32f2f',
                                    border: '1px solid #d32f2f'
                                  }}
                                >
                                  URGENT
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Date & Time */}
                      <div className="col-md-3">
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <Calendar size={16} style={{ color: '#1e40af' }} />
                          <span className="small" style={{ color: '#000000' }}>
                            {formatDate(order.timeSlot)}
                          </span>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <Clock size={16} style={{ color: '#1e40af' }} />
                          <span className="small" style={{ color: '#000000' }}>
                            {formatTime(order.timeSlot)}
                          </span>
                        </div>
                      </div>

                      {/* Vendor */}
                      <div className="col-md-2">
                        <div className="small text-muted mb-1">Vendor</div>
                        <div className="fw-semibold small" style={{ color: '#000000' }}>
                          {order.vendorFirstName} {order.vendorLastName}
                        </div>
                      </div>

                      {/* Price */}
                      <div className="col-md-2 text-md-end">
                        <div className="h5 fw-bold mb-2" style={{ color: '#1e40af' }}>
                          ₹{order.orderPrice.toLocaleString()}
                        </div>
                        <button
                          style={styles.actionBtn}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewOrder(order);
                          }}
                          onMouseOver={(e) => e.target.style.background = '#1e3a8a'}
                          onMouseOut={(e) => e.target.style.background = '#1e40af'}
                        >
                          <Eye size={16} />
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Order Details Modal */}
        {showDetailsModal && selectedOrder && (
          <div style={styles.modal} onClick={() => setShowDetailsModal(false)}>
            <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              {/* Modal Header */}
              <div className="p-4 border-bottom">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h4 className="fw-bold mb-1" style={{ color: '#000000' }}>
                      Order Details
                    </h4>
                    <p className="text-muted small mb-0">Order #{selectedOrder.orderId}</p>
                  </div>
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: '1.5rem',
                      cursor: 'pointer',
                      color: '#666'
                    }}
                  >
                    ×
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-4">
                {/* Service Info */}
                <div style={styles.detailRow}>
                  <Package size={20} style={{ color: '#1e40af' }} />
                  <div className="flex-grow-1">
                    <div className="small text-muted mb-1">Service</div>
                    <div className="fw-bold" style={{ color: '#000000' }}>
                      {selectedOrder.serviceName}
                    </div>
                    <div className="small text-muted mt-1">
                      {selectedOrder.serviceShortDesc}
                    </div>
                  </div>
                </div>

                {/* Status & Priority */}
                <div style={styles.detailRow}>
                  <AlertCircle size={20} style={{ color: '#1e40af' }} />
                  <div className="flex-grow-1">
                    <div className="small text-muted mb-2">Status & Priority</div>
                    <div className="d-flex gap-2 flex-wrap">
                      <span 
                        style={{
                          ...styles.statusBadge,
                          background: getStatusColor(selectedOrder.status).bg,
                          color: getStatusColor(selectedOrder.status).text,
                          border: `1px solid ${getStatusColor(selectedOrder.status).border}`
                        }}
                      >
                        {selectedOrder.status}
                      </span>
                      <span 
                        style={{
                          ...styles.statusBadge,
                          background: selectedOrder.priority === 'URGENT' ? '#ffebee' : '#f5f5f5',
                          color: getPriorityColor(selectedOrder.priority),
                          border: `1px solid ${getPriorityColor(selectedOrder.priority)}`
                        }}
                      >
                        {selectedOrder.priority}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Date & Time */}
                <div style={styles.detailRow}>
                  <Calendar size={20} style={{ color: '#1e40af' }} />
                  <div className="flex-grow-1">
                    <div className="small text-muted mb-1">Scheduled Time</div>
                    <div className="fw-semibold" style={{ color: '#000000' }}>
                      {formatDate(selectedOrder.timeSlot)} at {formatTime(selectedOrder.timeSlot)}
                    </div>
                    <div className="small text-muted mt-1">
                      Booked on: {formatDate(selectedOrder.orderDateTime)}
                    </div>
                  </div>
                </div>

                {/* Vendor Info */}
                <div style={styles.detailRow}>
                  <User size={20} style={{ color: '#1e40af' }} />
                  <div className="flex-grow-1">
                    <div className="small text-muted mb-1">Service Provider</div>
                    <div className="fw-bold" style={{ color: '#000000' }}>
                      {selectedOrder.vendorFirstName} {selectedOrder.vendorLastName}
                    </div>
                    <div className="small text-muted">
                      {selectedOrder.vendorPhone}
                    </div>
                    <div className="small text-muted">
                      Experience: {selectedOrder.vendorExperience} years
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div style={styles.detailRow}>
                  <MapPin size={20} style={{ color: '#1e40af' }} />
                  <div className="flex-grow-1">
                    <div className="small text-muted mb-1">Service Address</div>
                    <div className="fw-semibold" style={{ color: '#000000' }}>
                      {selectedOrder.homeNo ? `${selectedOrder.homeNo}, ` : ''}{selectedOrder.town}
                    </div>
                    <div className="small text-muted">
                      {selectedOrder.city}, {selectedOrder.state} - {selectedOrder.pincode}
                    </div>
                  </div>
                </div>

                {/* Price Details */}
                <div style={styles.detailRow}>
                  <DollarSign size={20} style={{ color: '#1e40af' }} />
                  <div className="flex-grow-1">
                    <div className="small text-muted mb-2">Price Breakdown</div>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">Service Price</span>
                      <span className="fw-semibold" style={{ color: '#000000' }}>
                        ₹{selectedOrder.servicePrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between pt-2 border-top">
                      <span className="fw-bold" style={{ color: '#000000' }}>Total Amount</span>
                      <span className="fw-bold h5 mb-0" style={{ color: '#1e40af' }}>
                        ₹{selectedOrder.orderPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Payment Status */}
                {selectedOrder.paymentId && (
                  <div style={styles.detailRow}>
                    <CheckCircle size={20} style={{ color: '#1e40af' }} />
                    <div className="flex-grow-1">
                      <div className="small text-muted mb-1">Payment Details</div>
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <span 
                          style={{
                            ...styles.statusBadge,
                            background: getPaymentStatusColor(selectedOrder.paymentStatus).bg,
                            color: getPaymentStatusColor(selectedOrder.paymentStatus).text,
                            border: `1px solid ${getPaymentStatusColor(selectedOrder.paymentStatus).border}`
                          }}
                        >
                          {selectedOrder.paymentStatus}
                        </span>
                      </div>
                      <div className="small text-muted">
                        Payment ID: {selectedOrder.paymentId}
                      </div>
                    </div>
                  </div>
                )}

                {/* Review Section */}
                {selectedOrder.rating && (
                  <div style={styles.detailRow}>
                    <Star size={20} style={{ color: '#1e40af' }} />
                    <div className="flex-grow-1">
                      <div className="small text-muted mb-1">Your Review</div>
                      <div className="d-flex align-items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            fill={i < selectedOrder.rating ? '#ffc107' : 'none'}
                            style={{ color: '#ffc107' }}
                          />
                        ))}
                        <span className="small ms-2" style={{ color: '#000000' }}>
                          {selectedOrder.rating}/5
                        </span>
                      </div>
                      {selectedOrder.reviewDescription && (
                        <div className="small" style={{ color: '#000000' }}>
                          "{selectedOrder.reviewDescription}"
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-top">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  style={{
                    ...styles.actionBtn,
                    width: '100%',
                    justifyContent: 'center'
                  }}
                  onMouseOver={(e) => e.target.style.background = '#1e3a8a'}
                  onMouseOut={(e) => e.target.style.background = '#1e40af'}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;