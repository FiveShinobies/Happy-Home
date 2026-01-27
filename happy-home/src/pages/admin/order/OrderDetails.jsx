import { useState, useEffect } from "react";
import {
  User,
  Calendar,
  MapPin,
  Phone,
  DollarSign,
  ArrowLeft,
  ClipboardList,
  Briefcase,
  Star
} from 'lucide-react';

export default function OrderDetails() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get orderId from URL (for demo, using a fixed ID)
  const orderId = 1; // You can get this from URL params in your actual app

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/order/${orderId}`);

        if (!response.ok) {
          throw new Error('Order not found');
        }

        const data = await response.json();
        setOrder(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching order:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  // Format status for display
  const formatStatus = (status) => {
    const statusMap = {
      COMPLETED: "Completed",
      INPROGRESS: "In Progress",
      ASSIGNED: "Assigned",
      CANCELLED: "Cancelled",
      REFUNDED: "Refunded",
    };
    return statusMap[status] || status;
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Format time
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  // Calculate price breakdown (since backend only gives orderPrice and servicePrice)
  const calculatePriceBreakdown = () => {
    if (!order) return { serviceCharge: 0, materialCharge: 0, tax: 0, total: 0 };

    const total = order.orderPrice;
    const serviceCharge = order.servicePrice;
    const remaining = total - serviceCharge;
    const tax = Math.round(remaining * 0.18); // Assuming 18% tax
    const materialCharge = remaining - tax;

    return {
      serviceCharge,
      materialCharge: Math.max(0, materialCharge),
      tax,
      total
    };
  };

  const styles = {
    pageBackground: {
      background: "#eef2f7",
      minHeight: "100vh",
      paddingTop: "3rem",
      paddingBottom: "3rem"
    },
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "0 15px"
    },
    backButton: {
      background: "none",
      border: "2px solid #0b5ed7",
      color: "#0b5ed7",
      padding: "0.5rem 1rem",
      borderRadius: "0.5rem",
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      marginBottom: "1.5rem",
      fontSize: "0.875rem",
      fontWeight: "600",
      transition: "all 0.2s"
    },
    header: {
      fontWeight: "bold",
      color: "#000000",
      marginBottom: "1.5rem",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      fontSize: "1.75rem"
    },
    mainCard: {
      borderRadius: "1rem",
      border: "none",
      background: "#ffffff",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      padding: "2rem"
    },
    serviceTitle: {
      fontWeight: "bold",
      color: "#0b5ed7",
      fontSize: "1.5rem",
      marginBottom: "0.5rem"
    },
    orderId: {
      color: "#6c757d",
      marginBottom: "1rem"
    },
    badge: {
      display: "inline-block",
      padding: "0.5rem 1rem",
      borderRadius: "0.5rem",
      fontSize: "0.875rem",
      fontWeight: "600"
    },
    hr: {
      borderColor: "#e0e0e0",
      margin: "1.5rem 0"
    },
    infoCard: {
      borderRadius: "0.75rem",
      border: "none",
      background: "#ffffff",
      boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
      padding: "1.25rem",
      marginBottom: "1rem"
    },
    cardTitle: {
      fontWeight: "bold",
      marginBottom: "1rem",
      fontSize: "1.125rem"
    },
    detailRow: {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      marginBottom: "0.75rem"
    },
    taskList: {
      listStyle: "none",
      padding: 0,
      margin: 0
    },
    taskItem: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0.75rem",
      background: "#f8f9fa",
      borderRadius: "0.5rem",
      marginBottom: "0.5rem"
    },
    priceRow: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "0.75rem",
      fontSize: "0.875rem"
    },
    totalRow: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: "1.25rem",
      fontWeight: "bold"
    },
    feedbackButton: {
      background: "#212529",
      border: "none",
      borderRadius: "0.5rem",
      padding: "0.75rem 2rem",
      color: "#ffffff",
      fontSize: "0.875rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "background 0.2s"
    },
    loadingContainer: {
      textAlign: "center",
      padding: "3rem",
      color: "#6c757d"
    }
  };

  if (loading) {
    return (
      <div style={styles.pageBackground}>
        <div style={styles.container}>
          <div style={styles.loadingContainer}>
            <div style={{
              width: '50px',
              height: '50px',
              border: '4px solid #f3f3f3',
              borderTop: '4px solid #0b5ed7',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 1rem'
            }} />
            <p>Loading order details...</p>
            <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div style={styles.pageBackground}>
        <div style={styles.container}>
          <h2 style={{ textAlign: 'center', marginTop: '3rem', color: '#6c757d' }}>
            Order not found
          </h2>
        </div>
      </div>
    );
  }

  const priceBreakdown = calculatePriceBreakdown();

  // Get status badge color
  const getStatusBadge = (status) => {
    const styles = {
      COMPLETED: { backgroundColor: '#198754', color: '#ffffff' },
      INPROGRESS: { backgroundColor: '#ffc107', color: '#000000' },
      ASSIGNED: { backgroundColor: '#0dcaf0', color: '#000000' },
      CANCELLED: { backgroundColor: '#dc3545', color: '#ffffff' },
      REFUNDED: { backgroundColor: '#6c757d', color: '#ffffff' }
    };
    return styles[status] || { backgroundColor: '#6c757d', color: '#ffffff' };
  };

  return (
    <div style={styles.pageBackground}>
      <div style={styles.container}>
        {/* BACK BUTTON */}
        <button
          onClick={() => window.history.back()}
          style={styles.backButton}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#0b5ed7';
            e.currentTarget.style.color = '#ffffff';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#0b5ed7';
          }}
        >
          <ArrowLeft size={18} /> Back
        </button>

        {/* PAGE HEADER */}
        <h2 style={styles.header}>
          <ClipboardList color="#0b5ed7" size={32} /> Order Details
        </h2>

        {/* MAIN CARD */}
        <div style={styles.mainCard}>
          {/* SERVICE NAME */}
          <h3 style={styles.serviceTitle}>{order.serviceName}</h3>
          <p style={styles.orderId}>Order ID: #{order.orderId}</p>
          <span style={{
            ...styles.badge,
            ...getStatusBadge(order.status)
          }}>
            {formatStatus(order.status)}
          </span>

          <hr style={styles.hr} />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
            {/* LEFT SIDE INFORMATION */}
            <div>
              {/* CUSTOMER CARD */}
              <div style={styles.infoCard}>
                <h5 style={styles.cardTitle}>Customer Information</h5>
                <div style={styles.detailRow}>
                  <User size={20} style={{ color: '#6c757d' }} />
                  <span>Consumer ID: {order.consumerId}</span>
                </div>
                <div style={styles.detailRow}>
                  <MapPin size={20} style={{ color: '#6c757d' }} />
                  <span>{order.homeNo}, {order.town}, {order.city}</span>
                </div>
              </div>

              {/* VENDOR CARD */}
              <div style={styles.infoCard}>
                <h5 style={styles.cardTitle}>Assigned Vendor</h5>
                <div style={styles.detailRow}>
                  <Briefcase size={20} style={{ color: '#6c757d' }} />
                  <strong>{order.vendorFirstName} {order.vendorLastName}</strong>
                </div>
                <div style={styles.detailRow}>
                  <Phone size={20} style={{ color: '#6c757d' }} />
                  <span>{order.vendorPhone}</span>
                </div>
                <div style={styles.detailRow}>
                  <Star color="#f5c518" size={20} fill="#f5c518" />
                  <span>{order.vendorExperience} years experience</span>
                </div>
              </div>

              {/* SERVICE SCHEDULE */}
              <div style={styles.infoCard}>
                <h5 style={styles.cardTitle}>Service Schedule</h5>
                <div style={styles.detailRow}>
                  <Calendar size={20} style={{ color: '#6c757d' }} />
                  <span>
                    {formatDate(order.timeSlot)} • {formatTime(order.timeSlot)}
                  </span>
                </div>
                <div style={styles.detailRow}>
                  <MapPin size={20} style={{ color: '#6c757d' }} />
                  <span>{order.homeNo}, {order.town}, {order.city}, {order.state} - {order.pincode}</span>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE — SERVICE INFO + PRICE BREAKDOWN */}
            <div>
              {/* SERVICE INFO */}
              <div style={styles.infoCard}>
                <h5 style={styles.cardTitle}>Service Information</h5>
                <div style={styles.detailRow}>
                  <ClipboardList size={20} style={{ color: '#6c757d' }} />
                  <span>{order.serviceShortDesc}</span>
                </div>
                <div style={styles.detailRow}>
                  <Calendar size={20} style={{ color: '#6c757d' }} />
                  <span>Priority: {order.priority}</span>
                </div>
                <div style={styles.detailRow}>
                  <DollarSign size={20} style={{ color: '#6c757d' }} />
                  <span>Payment: {order.paymentStatus}</span>
                </div>
                {order.rating > 0 && (
                  <div style={styles.detailRow}>
                    <Star color="#f5c518" size={20} fill="#f5c518" />
                    <span>Rating: {order.rating}/5</span>
                  </div>
                )}
              </div>

              {/* PRICE BREAKDOWN */}
              <div style={styles.infoCard}>
                <h5 style={styles.cardTitle}>Price Breakdown</h5>

                <div style={styles.priceRow}>
                  <span>Service Charge</span>
                  <strong>₹{priceBreakdown.serviceCharge}</strong>
                </div>

                {priceBreakdown.materialCharge > 0 && (
                  <div style={styles.priceRow}>
                    <span>Material Charge</span>
                    <strong>₹{priceBreakdown.materialCharge}</strong>
                  </div>
                )}

                <div style={styles.priceRow}>
                  <span>Tax</span>
                  <strong>₹{priceBreakdown.tax}</strong>
                </div>

                <hr style={styles.hr} />

                <div style={styles.totalRow}>
                  <span>Total</span>
                  <span>₹{priceBreakdown.total}</span>
                </div>
              </div>

              {/* REVIEW */}
              {order.reviewDescription && (
                <div style={styles.infoCard}>
                  <h5 style={styles.cardTitle}>Customer Review</h5>
                  <p style={{ color: '#6c757d', marginBottom: 0 }}>
                    "{order.reviewDescription}"
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* FEEDBACK BUTTON */}
          {order.reviewDescription && (
            <div style={{ textAlign: 'right', marginTop: '2rem' }}>
              <button
                style={styles.feedbackButton}
                onClick={() => window.location.href = '/admin-home/view-feedback'}
                onMouseOver={(e) => e.target.style.background = '#1a1d20'}
                onMouseOut={(e) => e.target.style.background = '#212529'}
              >
                View Feedback
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}