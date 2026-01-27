// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   List,
//   Calendar,
//   MapPin,
//   User,
//   DollarSign,
//   Briefcase,
//   SlidersHorizontal,
// } from "lucide-react";

// export default function AllOrders() {
//   const navigate = useNavigate();

//   // FINAL 10 HARD-CODED ORDERS
//   const ordersList = [
//     { id: "ORD-101", customer: "Rahul Sharma", vendor: "Rohit Kumar", service: "Home Cleaning", category: "Cleaning", date: "2024-12-01", address: "123 MG Road, Pune", mrp: 150, status: "Completed" },
//     { id: "ORD-102", customer: "Aditi Jain", vendor: "Sahil Patil", service: "Plumbing Repair", category: "Plumbing", date: "2024-12-03", address: "Hinjewadi Phase 2, Pune", mrp: 280, status: "In Progress" },
//     { id: "ORD-103", customer: "Kunal Verma", vendor: "Imran Shaikh", service: "AC Service", category: "AC Repair", date: "2024-12-05", address: "Baner, Pune", mrp: 350, status: "Scheduled" },
//     { id: "ORD-104", customer: "Sneha Kulkarni", vendor: "Mirja Abuzar Baig", service: "Salon: Facial + Hair Spa", category: "Salon & Beauty", date: "2024-12-10", address: "Kothrud, Pune", mrp: 1200, status: "Completed" },
//     { id: "ORD-105", customer: "Vikas Gupta", vendor: "Aman Yadav", service: "Electrical Fix – Fan Repair", category: "Electrical", date: "2024-12-08", address: "Viman Nagar, Pune", mrp: 450, status: "In Progress" },
//     { id: "ORD-106", customer: "Neha Singh", vendor: "Hitesh More", service: "Pest Control – Cockroach", category: "Pest Control", date: "2024-12-11", address: "Bavdhan, Pune", mrp: 900, status: "Completed" },
//     { id: "ORD-107", customer: "Saurabh Patil", vendor: "Ramesh Pawar", service: "Washing Machine Repair", category: "Appliance Repair", date: "2024-12-03", address: "Wakad, Pune", mrp: 650, status: "Scheduled" },
//     { id: "ORD-108", customer: "Megha Deshmukh", vendor: "Deepali Acharya", service: "Home Deep Cleaning", category: "Cleaning", date: "2024-12-02", address: "Sinhagad Road, Pune", mrp: 1800, status: "Completed" },
//     { id: "ORD-109", customer: "Harshil Dave", vendor: "Vikas Singh", service: "AC Gas Refill", category: "AC Repair", date: "2024-12-06", address: "Kharadi, Pune", mrp: 1400, status: "In Progress" },
//     { id: "ORD-110", customer: "Aarav Malhotra", vendor: "Sameer Patil", service: "Geyser Repair", category: "Appliance Repair", date: "2024-12-07", address: "Hadapsar, Pune", mrp: 500, status: "Completed" },
//   ];

//   // FILTER LOGIC
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [catFilter, setCatFilter] = useState("All");

//   const filteredOrders = ordersList.filter((o) => {
//     const matchStatus = statusFilter === "All" || o.status === statusFilter;
//     const matchCat = catFilter === "All" || o.category === catFilter;
//     return matchStatus && matchCat;
//   });

//   // STATUS COLORS WITH ORANGE FOR SCHEDULED
//   const statusColors = {
//     Completed: "bg-success",
//     "In Progress": "bg-warning text-dark",
//     Scheduled: "bg-danger",
//   };


//   return (
//     <div className="py-5" style={{ background: "#eef2f7", minHeight: "100vh" }}>
//       <div className="container">

//         {/* PAGE HEADER */}
//         <h2 className="fw-bold text-dark mb-4 d-flex align-items-center gap-2">
//           <List color="#0b5ed7" /> All Orders
//         </h2>

//         {/* FILTER BAR */}
//         <div className="card shadow-sm border-0 mb-4 p-3">
//           <div className="d-flex align-items-center gap-3">
//             <SlidersHorizontal color="#0b5ed7" />

//             <select className="form-select w-auto" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
//               <option value="All">All Status</option>
//               <option value="Completed">Completed</option>
//               <option value="In Progress">In Progress</option>
//               <option value="Scheduled">Scheduled</option>
//             </select>

//             <select className="form-select w-auto" value={catFilter} onChange={(e) => setCatFilter(e.target.value)}>
//               <option value="All">All Categories</option>
//               <option value="Cleaning">Cleaning</option>
//               <option value="Plumbing">Plumbing</option>
//               <option value="Electrical">Electrical</option>
//               <option value="AC Repair">AC Repair</option>
//               <option value="Appliance Repair">Appliance Repair</option>
//               <option value="Pest Control">Pest Control</option>
//               <option value="Salon & Beauty">Salon & Beauty</option>
//             </select>
//           </div>
//         </div>

//         {/* LINE-WISE ORDER LIST */}
//         <div className="card shadow-sm border-0 p-3">
//           {filteredOrders.map((o) => (
//             <div
//               key={o.id}
//               className="p-3 border-bottom"
//               style={{ background: "#f8faff", borderRadius: "10px" }}
//             >
//               <div className="row align-items-center">

//                 {/* SERVICE & ID */}
//                 <div className="col-md-3">
//                   <h5 className="fw-bold text-primary m-0">{o.service}</h5>
//                   <small className="text-muted">{o.id}</small>
//                 </div>

//                 {/* CUSTOMER */}
//                 <div className="col-md-2 d-flex align-items-center gap-2">
//                   <User size={18} className="text-muted" />
//                   {o.customer}
//                 </div>

//                 {/* VENDOR */}
//                 <div className="col-md-2 d-flex align-items-center gap-2">
//                   <Briefcase size={18} className="text-muted" />
//                   <strong>{o.vendor}</strong>
//                 </div>

//                 {/* DATE */}
//                 <div className="col-md-2 d-flex align-items-center gap-2">
//                   <Calendar size={18} className="text-muted" />
//                   {o.date}
//                 </div>

//                 {/* PRICE */}
//                 <div className="col-md-1 d-flex align-items-center gap-2">
//                   <DollarSign size={18} className="text-muted" />
//                   <strong>MRP: ₹{o.mrp}</strong>
//                 </div>

//                 {/* STATUS */}
//                 <div className="col-md-1">
//                   <span className={`badge ${statusColors[o.status]} px-3 py-2`}>
//                     {o.status}
//                   </span>
//                 </div>

//                 {/* DETAILS BUTTON */}
//                 <div className="col-md-1 text-end">
//                   <button
//                     className="btn btn-primary btn-sm"
//                     onClick={() => navigate(`/admin-home/order-details/${o.id}`)}
//                   >
//                     Details
//                   </button>
//                 </div>

//               </div>
//             </div>
//           ))}
//         </div>

//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import {
  List,
  Calendar,
  MapPin,
  User,
  DollarSign,
  Briefcase,
  SlidersHorizontal,
} from 'lucide-react';
import axios from "axios";

export default function AllOrders() {
  const [ordersList, setOrdersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [catFilter, setCatFilter] = useState("All");

  useEffect(() => {
    const fetchOrders = async () => {
      try {

        const response = await axios.get('http://localhost:8080/admin/orders');

        const data = await response.data;
        setOrdersList(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Filter logic
  const filteredOrders = ordersList.filter((o) => {
    const matchStatus = statusFilter === "All" || o.status === statusFilter;
    const matchCat = catFilter === "All" || o.serviceName.includes(catFilter);
    return matchStatus && matchCat;
  });

  // Status colors
  const statusColors = {
    COMPLETED: "bg-success",
    INPROGRESS: "bg-warning text-dark",
    ASSIGNED: "bg-info text-dark",
    CANCELLED: "bg-danger",
    REFUNDED: "bg-secondary",
  };

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
      month: 'short',
      day: 'numeric'
    });
  };

  // Extract categories from orders
  const categories = [...new Set(ordersList.map(o => o.serviceName))];

  const styles = {
    pageBackground: {
      background: "#eef2f7",
      minHeight: "100vh",
      paddingTop: "3rem",
      paddingBottom: "3rem"
    },
    container: {
      maxWidth: "1400px",
      margin: "0 auto",
      padding: "0 15px"
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
    filterCard: {
      borderRadius: "1rem",
      border: "none",
      background: "#ffffff",
      boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
      marginBottom: "1.5rem",
      padding: "1rem"
    },
    filterRow: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      flexWrap: "wrap"
    },
    select: {
      padding: "0.5rem 1rem",
      fontSize: "0.875rem",
      border: "1px solid #ced4da",
      borderRadius: "0.5rem",
      outline: "none",
      backgroundColor: "#ffffff",
      cursor: "pointer",
      minWidth: "150px"
    },
    ordersCard: {
      borderRadius: "1rem",
      border: "none",
      background: "#ffffff",
      boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
      padding: "1rem"
    },
    orderRow: {
      background: "#f8faff",
      borderRadius: "10px",
      padding: "1rem",
      borderBottom: "1px solid #e0e0e0",
      marginBottom: "0.5rem"
    },
    orderGrid: {
      display: "grid",
      gridTemplateColumns: "2fr 1.5fr 1.5fr 1.2fr 1fr 1fr 0.8fr",
      gap: "1rem",
      alignItems: "center"
    },
    serviceTitle: {
      fontWeight: "bold",
      color: "#0b5ed7",
      margin: 0,
      fontSize: "1rem"
    },
    orderId: {
      fontSize: "0.75rem",
      color: "#6c757d"
    },
    detailItem: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      fontSize: "0.875rem"
    },
    badge: {
      padding: "0.5rem 1rem",
      borderRadius: "0.5rem",
      fontSize: "0.75rem",
      fontWeight: "600",
      textAlign: "center",
      whiteSpace: "nowrap"
    },
    detailsButton: {
      background: "#0b5ed7",
      border: "none",
      borderRadius: "0.5rem",
      padding: "0.5rem 1rem",
      color: "#ffffff",
      fontSize: "0.875rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "background 0.2s",
      whiteSpace: "nowrap"
    },
    loadingContainer: {
      textAlign: "center",
      padding: "3rem",
      color: "#6c757d"
    },
    emptyState: {
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
            <p>Loading orders...</p>
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

  if (error) {
    return (
      <div style={styles.pageBackground}>
        <div style={styles.container}>
          <div style={{
            background: '#f8d7da',
            color: '#842029',
            padding: '1rem',
            borderRadius: '0.5rem',
            border: '1px solid #f5c2c7'
          }}>
            Error loading orders: {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.pageBackground}>
      <div style={styles.container}>
        {/* PAGE HEADER */}
        <h2 style={styles.header}>
          <List color="#0b5ed7" size={32} />
          All Orders
        </h2>

        {/* FILTER BAR */}
        <div style={styles.filterCard}>
          <div style={styles.filterRow}>
            <SlidersHorizontal color="#0b5ed7" size={20} />

            <select
              style={styles.select}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="COMPLETED">Completed</option>
              <option value="INPROGRESS">In Progress</option>
              <option value="ASSIGNED">Assigned</option>
              <option value="CANCELLED">Cancelled</option>
              <option value="REFUNDED">Refunded</option>
            </select>

            <select
              style={styles.select}
              value={catFilter}
              onChange={(e) => setCatFilter(e.target.value)}
            >
              <option value="All">All Services</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* ORDERS LIST */}
        <div style={styles.ordersCard}>
          {filteredOrders.length === 0 ? (
            <div style={styles.emptyState}>
              <List size={48} style={{ color: '#e0e0e0', margin: '0 auto 1rem' }} />
              <p>No orders found</p>
            </div>
          ) : (
            filteredOrders.map((o) => (
              <div key={o.orderId} style={styles.orderRow}>
                <div style={styles.orderGrid}>
                  {/* SERVICE & ID */}
                  <div>
                    <h5 style={styles.serviceTitle}>{o.serviceName}</h5>
                    <small style={styles.orderId}>Order #{o.orderId}</small>
                  </div>

                  {/* VENDOR */}
                  <div style={styles.detailItem}>
                    <Briefcase size={18} style={{ color: '#6c757d' }} />
                    <strong>{o.vendorFirstName} {o.vendorLastName}</strong>
                  </div>

                  {/* LOCATION */}
                  <div style={styles.detailItem}>
                    <MapPin size={18} style={{ color: '#6c757d' }} />
                    <span>{o.town}, {o.city}</span>
                  </div>

                  {/* DATE */}
                  <div style={styles.detailItem}>
                    <Calendar size={18} style={{ color: '#6c757d' }} />
                    <span>{formatDate(o.orderDateTime)}</span>
                  </div>

                  {/* PRICE */}
                  <div style={styles.detailItem}>
                    <DollarSign size={18} style={{ color: '#6c757d' }} />
                    <strong>₹{o.orderPrice}</strong>
                  </div>

                  {/* STATUS */}
                  <div>
                    <span
                      style={{
                        ...styles.badge,
                        ...(statusColors[o.status] === 'bg-success' && {
                          backgroundColor: '#198754',
                          color: '#ffffff'
                        }),
                        ...(statusColors[o.status] === 'bg-warning text-dark' && {
                          backgroundColor: '#ffc107',
                          color: '#000000'
                        }),
                        ...(statusColors[o.status] === 'bg-info text-dark' && {
                          backgroundColor: '#0dcaf0',
                          color: '#000000'
                        }),
                        ...(statusColors[o.status] === 'bg-danger' && {
                          backgroundColor: '#dc3545',
                          color: '#ffffff'
                        }),
                        ...(statusColors[o.status] === 'bg-secondary' && {
                          backgroundColor: '#6c757d',
                          color: '#ffffff'
                        })
                      }}
                    >
                      {formatStatus(o.status)}
                    </span>
                  </div>

                  {/* DETAILS BUTTON */}
                  <div style={{ textAlign: 'right' }}>
                    <button
                      style={styles.detailsButton}
                      onClick={() => window.location.href = `/admin-home/order-details/${o.orderId}`}
                      onMouseOver={(e) => e.target.style.background = '#094fa3'}
                      onMouseOut={(e) => e.target.style.background = '#0b5ed7'}
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}