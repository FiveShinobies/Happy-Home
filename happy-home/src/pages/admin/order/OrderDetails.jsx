// import React from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   User,
//   Calendar,
//   MapPin,
//   Phone,
//   DollarSign,
//   ArrowLeft,
//   ClipboardList,
//   Briefcase,
//   Star
// } from "lucide-react";

// export default function OrderDetails() {
//   const { orderId } = useParams();
//   const navigate = useNavigate();

//   // ===== HARD-CODED ORDER DATABASE =====
//   const ordersDB = {
//   "ORD-101": {
//     id: "ORD-101",
//     service: "Home Cleaning",
//     category: "Cleaning",
//     customer: "Rahul Sharma",
//     phone: "+91 9876543210",
//     vendor: "Rohit Kumar",
//     vendorRating: "4.8",
//     date: "2024-12-01",
//     time: "10:00 AM - 2:00 PM",
//     address: "123 MG Road, Pune",
//     status: "Completed",
//     serviceCharge: 120,
//     materialCharge: 20,
//     tax: 10,
//     tasks: ["Kitchen Degreasing", "Bathroom Cleaning", "Floor Sanitization", "Window Wiping"],
//   },

//   "ORD-102": {
//     id: "ORD-102",
//     service: "Plumbing Repair",
//     category: "Plumbing",
//     customer: "Aditi Jain",
//     phone: "+91 9988776655",
//     vendor: "Sahil Patil",
//     vendorRating: "4.6",
//     date: "2024-12-03",
//     time: "9:30 AM - 11:00 AM",
//     address: "Hinjewadi Phase 2, Pune",
//     status: "In Progress",
//     serviceCharge: 220,
//     materialCharge: 40,
//     tax: 20,
//     tasks: ["Leak Fixing", "Tap Replacement", "Pipeline Check"],
//   },

//   "ORD-103": {
//     id: "ORD-103",
//     service: "AC Service",
//     category: "AC Repair",
//     customer: "Kunal Verma",
//     phone: "+91 9090909090",
//     vendor: "Imran Shaikh",
//     vendorRating: "4.7",
//     date: "2024-12-05",
//     time: "12:00 PM - 3:00 PM",
//     address: "Baner, Pune",
//     status: "Scheduled",
//     serviceCharge: 300,
//     materialCharge: 30,
//     tax: 20,
//     tasks: ["Filter Cleaning", "Gas Pressure Check", "Cooling Efficiency Test"],
//   },

//   "ORD-104": {
//     id: "ORD-104",
//     service: "Salon: Facial + Hair Spa",
//     category: "Salon & Beauty",
//     customer: "Sneha Kulkarni",
//     phone: "+91 9404455511",
//     vendor: "Mirja Abuzar Baig",
//     vendorRating: "4.9",
//     date: "2024-12-10",
//     time: "4:00 PM - 6:00 PM",
//     address: "Kothrud, Pune",
//     status: "Completed",
//     serviceCharge: 800,
//     materialCharge: 300,
//     tax: 100,
//     tasks: ["Facial Relaxation", "Hair Spa", "Steam Treatment"],
//   },

//   "ORD-105": {
//     id: "ORD-105",
//     service: "Fan Repair",
//     category: "Electrical",
//     customer: "Vikas Gupta",
//     phone: "+91 9001122334",
//     vendor: "Aman Yadav",
//     vendorRating: "4.4",
//     date: "2024-12-08",
//     time: "11:00 AM - 12:30 PM",
//     address: "Viman Nagar, Pune",
//     status: "In Progress",
//     serviceCharge: 350,
//     materialCharge: 50,
//     tax: 30,
//     tasks: ["Bearing Check", "Blade Adjustment", "Motor Testing"],
//   },

//   "ORD-106": {
//     id: "ORD-106",
//     service: "Pest Control",
//     category: "Pest Control",
//     customer: "Neha Singh",
//     phone: "+91 9988007766",
//     vendor: "Hitesh More",
//     vendorRating: "4.8",
//     date: "2024-12-11",
//     time: "9:00 AM - 11:00 AM",
//     address: "Bavdhan, Pune",
//     status: "Completed",
//     serviceCharge: 600,
//     materialCharge: 200,
//     tax: 100,
//     tasks: ["Chemical Spraying", "Gel Treatment", "Safety Sealing"],
//   },

//   "ORD-107": {
//     id: "ORD-107",
//     service: "Washing Machine Repair",
//     category: "Appliance Repair",
//     customer: "Saurabh Patil",
//     phone: "+91 9711223344",
//     vendor: "Ramesh Pawar",
//     vendorRating: "4.5",
//     date: "2024-12-03",
//     time: "3:00 PM - 4:30 PM",
//     address: "Wakad, Pune",
//     status: "Scheduled",
//     serviceCharge: 400,
//     materialCharge: 150,
//     tax: 50,
//     tasks: ["Drum Check", "Motor Calibration", "Water Pipe Cleaning"],
//   },

//   "ORD-108": {
//     id: "ORD-108",
//     service: "Full Home Deep Cleaning",
//     category: "Cleaning",
//     customer: "Megha Deshmukh",
//     phone: "+91 8877665544",
//     vendor: "Deepali Acharya",
//     vendorRating: "4.9",
//     date: "2024-12-02",
//     time: "8:00 AM - 3:00 PM",
//     address: "Sinhagad Road, Pune",
//     status: "Completed",
//     serviceCharge: 1400,
//     materialCharge: 200,
//     tax: 200,
//     tasks: ["Deep Floor Cleaning", "Furniture Polishing", "Bathroom Sanitization"],
//   },

//   "ORD-109": {
//     id: "ORD-109",
//     service: "AC Gas Refill",
//     category: "AC Repair",
//     customer: "Harshil Dave",
//     phone: "+91 8123456789",
//     vendor: "Vikas Singh",
//     vendorRating: "4.6",
//     date: "2024-12-06",
//     time: "2:00 PM - 4:00 PM",
//     address: "Kharadi, Pune",
//     status: "In Progress",
//     serviceCharge: 1000,
//     materialCharge: 300,
//     tax: 100,
//     tasks: ["Gas Refilling", "Leak Testing"]
//   },

//   "ORD-110": {
//     id: "ORD-110",
//     service: "Geyser Repair",
//     category: "Appliance Repair",
//     customer: "Aarav Malhotra",
//     phone: "+91 9988992211",
//     vendor: "Sameer Patil",
//     vendorRating: "4.7",
//     date: "2024-12-07",
//     time: "5:00 PM - 6:30 PM",
//     address: "Hadapsar, Pune",
//     status: "Completed",
//     serviceCharge: 350,
//     materialCharge: 100,
//     tax: 50,
//     tasks: ["Thermostat Check", "Heating Coil Test"],
//   },
// };


//   // Fetch selected order
//   const order = ordersDB[orderId];

//   if (!order) return <h2 className="text-center mt-5">Order not found</h2>;

//   // PRICE CALCULATION
//   const total = order.serviceCharge + order.materialCharge + order.tax;

//   return (
//     <div className="py-5" style={{ background: "#eef2f7", minHeight: "100vh" }}>
//       <div className="container">

//         {/* BACK BUTTON */}
//         <button onClick={() => navigate(-1)} className="btn btn-outline-primary mb-4">
//           <ArrowLeft size={18} /> Back
//         </button>

//         {/* PAGE HEADER */}
//         <h2 className="fw-bold d-flex align-items-center gap-2 text-dark mb-4">
//           <ClipboardList color="#0b5ed7" /> Order Details
//         </h2>

//         {/* MAIN CARD */}
//         <div className="card shadow-lg border-0 p-4" style={{ borderRadius: "14px" }}>

//           {/* SERVICE NAME */}
//           <h3 className="fw-bold text-primary">{order.service}</h3>
//           <p className="text-muted">Order ID: {order.id}</p>
//         <span
//   className={
//     order.status === "Completed"
//       ? "badge bg-success fs-6 px-3 py-2"
//       : order.status === "In Progress"
//       ? "badge bg-warning text-dark fs-6 px-3 py-2"
//       : "badge bg-danger fs-6 px-3 py-2"
//   }
// >
//   {order.status}
// </span>

//           <hr />

//           <div className="row">

//             {/* LEFT SIDE INFORMATION */}
//             <div className="col-md-6 d-flex flex-column gap-3">

//               {/* CUSTOMER CARD */}
//               <div className="card shadow-sm border-0 p-3">
//                 <h5 className="fw-bold mb-2">Customer Information</h5>
//                 <div className="d-flex align-items-center gap-2">
//                   <User /> <span>{order.customer}</span>
//                 </div>
//                 <div className="d-flex align-items-center gap-2 mt-2">
//                   <Phone /> <span>{order.phone}</span>
//                 </div>
//               </div>

//               {/* VENDOR CARD */}
//               <div className="card shadow-sm border-0 p-3">
//                 <h5 className="fw-bold mb-2">Assigned Vendor</h5>
//                 <div className="d-flex align-items-center gap-2">
//                   <Briefcase /> <strong>{order.vendor}</strong>
//                 </div>
//                 <div className="d-flex align-items-center gap-2 mt-2">
//                   <Star color="#f5c518" /> <span>{order.vendorRating} / 5</span>
//                 </div>
//               </div>

//               {/* SERVICE SCHEDULE */}
//               <div className="card shadow-sm border-0 p-3">
//                 <h5 className="fw-bold mb-2">Service Schedule</h5>
//                 <div className="d-flex align-items-center gap-2">
//                   <Calendar /> <span>{order.date} • {order.time}</span>
//                 </div>
//                 <div className="d-flex align-items-center gap-2 mt-2">
//                   <MapPin /> <span>{order.address}</span>
//                 </div>
//               </div>
//             </div>

//             {/* RIGHT SIDE — TASKS + PRICE BREAKDOWN */}
//             <div className="col-md-6">

//               {/* TASK LIST */}
//               <div className="card shadow-sm border-0 p-3 mb-3">
//                 <h5 className="fw-bold mb-3">Tasks Included</h5>

//                 <ul className="list-group">
//                   {order.tasks.map((task, i) => (
//                     <li
//                       key={i}
//                       className="list-group-item d-flex justify-content-between"
//                     >
//                       {task}
//                       <span className="badge bg-primary">OK</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               {/* PRICE BREAKDOWN */}
//               <div className="card shadow-sm border-0 p-3">
//                 <h5 className="fw-bold mb-3">Price Breakdown</h5>

//                 <div className="d-flex justify-content-between mb-2">
//                   <span>Service Charge</span>
//                   <strong>₹{order.serviceCharge}</strong>
//                 </div>

//                 <div className="d-flex justify-content-between mb-2">
//                   <span>Material Charge</span>
//                   <strong>₹{order.materialCharge}</strong>
//                 </div>

//                 <div className="d-flex justify-content-between mb-2">
//                   <span>Tax</span>
//                   <strong>₹{order.tax}</strong>
//                 </div>

//                 <hr />

//                 <div className="d-flex justify-content-between fs-5 fw-bold">
//                   <span>Total</span>
//                   <span>₹{total}</span>
//                 </div>
//               </div>

//             </div>

//           </div>

//           {/* FEEDBACK BUTTON */}
//           <div className="text-end mt-4">
//             <button
//               className="btn btn-dark px-4"
//               onClick={() => navigate(`/admin-home/view-feedback`)}
//             >
//               View Feedback
//             </button>
//           </div>

//         </div>

//       </div>
//     </div>
//   );
// }
// // END OF COMPONENT

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