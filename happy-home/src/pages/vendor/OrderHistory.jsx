import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Package,
  DollarSign,
  ChevronRight,
  Filter,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle
} from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

export default function OrderHistory() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("ALL");

  const vendorId = 1; // Replace with actual logged-in vendor ID

  // Fetch orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/admin/vendors/${vendorId}/orders`);
        console.log('Fetched orders:', response.data);
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [vendorId]);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Format time
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  // Get status color
  const getStatusColor = (status) => {
    const statusColors = {
      'ASSIGNED': { bg: '#e3f2fd', text: '#1976d2', icon: Clock },
      'COMPLETED': { bg: '#e8f5e9', text: '#388e3c', icon: CheckCircle },
      'CANCELLED': { bg: '#ffebee', text: '#d32f2f', icon: XCircle },
      'IN_PROGRESS': { bg: '#fff3e0', text: '#f57c00', icon: AlertCircle },
      'PENDING': { bg: '#f3e5f5', text: '#7b1fa2', icon: Clock }
    };
    return statusColors[status] || { bg: '#f5f5f5', text: '#757575', icon: Package };
  };

  // Filter orders
  const filteredOrders = filterStatus === "ALL" 
    ? orders 
    : orders.filter(order => order.status === filterStatus);

  const styles = {
    pageBackground: {
      minHeight: '100vh',
      background: '#ffffff',
      padding: '2rem'
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
      transition: 'all 0.2s ease'
    },
    iconCircle: {
      width: '48px',
      height: '48px',
      borderRadius: '50%',
      background: '#f0f7ff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    statusBadge: {
      padding: '0.375rem 0.75rem',
      borderRadius: '1rem',
      fontSize: '0.75rem',
      fontWeight: '600',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.25rem'
    },
    detailsBtn: {
      background: '#1e40af',
      color: '#ffffff',
      padding: '0.5rem 1rem',
      borderRadius: '0.5rem',
      border: 'none',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
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
          <p className="mt-3 text-muted">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.pageBackground}>
      <div className="container">
        {/* Header */}
        <div style={styles.header}>
          <h1 className="display-6 fw-bold mb-2" style={{ color: '#000000' }}>
            Order History
          </h1>
          <p className="text-muted">View and manage all your completed orders</p>
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
            <p className="text-muted">
              {filterStatus === 'ALL' 
                ? "You don't have any orders yet" 
                : `No ${filterStatus.toLowerCase()} orders found`}
            </p>
          </div>
        ) : (
          <div className="row">
            {filteredOrders.map((order) => {
              const statusStyle = getStatusColor(order.status);
              const StatusIcon = statusStyle.icon;

              return (
                <div key={order.orderId} className="col-12">
                  <div 
                    style={styles.orderCard}
                    onMouseOver={(e) => {
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div className="row align-items-center">
                      {/* Order Icon & ID */}
                      <div className="col-md-4">
                        <div className="d-flex align-items-center gap-3">
                          <div style={styles.iconCircle}>
                            <Package size={24} style={{ color: '#1e40af' }} />
                          </div>
                          <div>
                            <h5 className="mb-1 fw-bold" style={{ color: '#000000' }}>
                              Order #{order.orderId}
                            </h5>
                            <span 
                              style={{
                                ...styles.statusBadge,
                                background: statusStyle.bg,
                                color: statusStyle.text
                              }}
                            >
                              <StatusIcon size={12} />
                              {order.status}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Date & Time */}
                      <div className="col-md-3">
                        <div className="d-flex align-items-center gap-2 mb-1">
                          <Calendar size={16} style={{ color: '#1e40af' }} />
                          <span className="small fw-semibold" style={{ color: '#000000' }}>
                            {formatDate(order.orderDate)}
                          </span>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <Clock size={16} style={{ color: '#666' }} />
                          <span className="small text-muted">
                            {formatTime(order.orderDate)}
                          </span>
                        </div>
                      </div>

                      {/* Amount */}
                      <div className="col-md-3">
                        <div className="d-flex align-items-center gap-2">
                          <DollarSign size={16} style={{ color: '#1e40af' }} />
                          <div>
                            <div className="small text-muted">Total Amount</div>
                            <div className="h5 fw-bold mb-0" style={{ color: '#1e40af' }}>
                              ₹{order.total.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Details Button */}
                      <div className="col-md-2 text-end">
                        <button
                          style={styles.detailsBtn}
                          onClick={() => navigate(`/vendor-home/completed-order-details/${order.orderId}`)}
                          onMouseOver={(e) => e.target.style.background = '#1e3a8a'}
                          onMouseOut={(e) => e.target.style.background = '#1e40af'}
                        >
                          Details
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}