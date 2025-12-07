// /vendor-home/completed-order-details

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Droplet,
  Zap,
  Paintbrush,
  Wrench,
  User,
  Calendar,
  MapPin,
  DollarSign,
  Star,
  ChevronRight,
} from "lucide-react";

export default function OrderHistory() {
  const navigate = useNavigate();

  // ICON MAP
  const icons = {
    Cleaning: Home,
    Plumbing: Droplet,
    Electrical: Zap,
    Painting: Paintbrush,
    "AC Repair": Wrench,
  };

  // FAKE ORDERS LIST
  const ordersData = [
    {
      id: "SRV-001",
      serviceName: "Deep Home Cleaning",
      category: "Cleaning",
      providerName: "SparkClean Services",
      providerRating: 4.8,
      serviceDate: "2024-12-01",
      timeSlot: "10:00 AM - 2:00 PM",
      status: "Completed",
      amount: 1250,
      address: "123 Main Street, Apt 4B",
      paymentStatus: "Paid",
    },
    {
      id: "SRV-002",
      serviceName: "Kitchen Plumbing Repair",
      category: "Plumbing",
      providerName: "QuickFix Plumbers",
      providerRating: 4.6,
      serviceDate: "2024-12-05",
      timeSlot: "2:00 PM - 4:00 PM",
      status: "Scheduled",
      amount: 2180,
      address: "123 Main Street, Apt 4B",
      paymentStatus: "Pending",
    },
    {
      id: "SRV-003",
      serviceName: "Electrical Wiring Inspection",
      category: "Electrical",
      providerName: "PowerPro Electricians",
      providerRating: 4.9,
      serviceDate: "2024-12-03",
      timeSlot: "9:00 AM - 11:00 AM",
      status: "In Progress",
      amount: 1200,
      address: "123 Main Street, Apt 4B",
      paymentStatus: "Paid",
    },
  ];

  // FILTER STATES
  const [filterCat, setFilterCat] = useState("All");

  // SORTING LOGIC
const filtered = ordersData.filter(order => order.status === "Completed");

  // STATUS COLORS
  const statusColor = {
    Completed: { bg: "#E6F4EA", color: "#2E7D32" },
    Scheduled: { bg: "#E3F2FD", color: "#1565C0" },
    "In Progress": { bg: "#FFF8E1", color: "#F57C00" },
    Cancelled: { bg: "#FFEBEE", color: "#C62828" },
  };

  return (
    <div style={{ padding: "32px", background: "#f6f7f9", minHeight: "100vh" }}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "20px" }}>
        Service History
      </h2>

      {/* FILTERS */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
        <select
          value={filterCat}
          onChange={(e) => setFilterCat(e.target.value)}
          style={selectStyle}
        >
          <option value="All">All Categories</option>
          <option value="Cleaning">Cleaning</option>
          <option value="Plumbing">Plumbing</option>
          <option value="Electrical">Electrical</option>
          <option value="Painting">Painting</option>
          <option value="AC Repair">AC Repair</option>
        </select>

       
      </div>

      {/* LIST OF ORDERS */}
      <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        {filtered.map((order) => {
          const Icon = icons[order.category];

          return (
            <div key={order.id} style={card}>
              {/* Top row */}
              <div style={row}>
                <div style={iconRow}>
                  <div style={iconBox}>
                    <Icon size={26} color="#1976D2" />
                  </div>

                  <div>
                    <div style={serviceTitle}>{order.serviceName}</div>
                    <div style={serviceId}>{order.id}</div>
                  </div>
                </div>

                {/* STATUS PILL */}
                <div
                  style={{
                    ...statusPill,
                    background: statusColor[order.status].bg,
                    color: statusColor[order.status].color,
                  }}
                >
                  {order.status}
                </div>
              </div>

              {/* GRID INFO */}
              <div style={grid4}>
                {/* Provider */}
                <div style={infoRow}>
                  <User size={16} color="#666" />
                  <div>
                    <strong style={{ fontSize: "14px" }}>
                      {order.providerName}
                    </strong>
                    <div style={ratingRow}>
                      <Star size={12} fill="#FFC107" color="#FFC107" />
                      <span style={ratingText}>{order.providerRating}</span>
                    </div>
                  </div>
                </div>

                {/* Date */}
                <div style={infoRow}>
                  <Calendar size={16} color="#666" />
                  <div>
                    <strong>{order.serviceDate}</strong>
                    <div style={subText}>{order.timeSlot}</div>
                  </div>
                </div>

                {/* Address */}
                <div style={infoRow}>
                  <MapPin size={16} color="#666" />
                  <span style={{ fontSize: "14px" }}>{order.address}</span>
                </div>

                {/* Amount */}
                <div style={infoRow}>
                  <DollarSign size={16} color="#666" />
                  <strong style={{ fontSize: "15px" }}>₹{order.amount}</strong>
                </div>
              </div>

              {/* Payment Row */}
              <div>
                <span
                  style={{
                    color: order.paymentStatus === "Paid" ? "#2E7D32" : "#E65100",
                    fontWeight: 600,
                    fontSize: "14px",
                  }}
                >
                  Payment: {order.paymentStatus}
                </span>
              </div>

              {/* DETAILS BUTTON */}
              <div style={{ textAlign: "right" }}>
                <button
                  style={detailsButton}
                  onClick={() => navigate(`/vendor-home/completed-order-details/${order.id}`)}
                >
                  Details <ChevronRight size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------- STYLES EXACT MATCH ----------

const card = {
  background: "#ffffff",
  borderRadius: "14px",
  padding: "22px",
  boxShadow: "0px 4px 14px rgba(0,0,0,0.08)",
  border: "1px solid #eee",
  display: "flex",
  flexDirection: "column",
  gap: "14px",
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const iconRow = {
  display: "flex",
  gap: "12px",
  alignItems: "center",
};

const iconBox = {
  width: "48px",
  height: "48px",
  borderRadius: "12px",
  background: "#E3F2FD",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const serviceTitle = { fontSize: "18px", fontWeight: 600 };
const serviceId = { color: "#777", fontSize: "13px" };

const statusPill = {
  padding: "6px 14px",
  borderRadius: "30px",
  fontSize: "14px",
  fontWeight: 600,
};

const grid4 = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: "10px",
};

const infoRow = {
  display: "flex",
  gap: "8px",
  alignItems: "flex-start",
};

const ratingRow = { display: "flex", gap: 4, alignItems: "center" };

const ratingText = { fontSize: "12px", color: "#555" };
const subText = { fontSize: "12px", color: "#777" };

const detailsButton = {
  background: "#0B75F5",
  color: "white",
  padding: "10px 20px",
  borderRadius: "10px",
  border: "none",
  fontWeight: 600,
  display: "flex",
  alignItems: "center",
  gap: "6px",
  cursor: "pointer",
};

const selectStyle = {
  padding: "10px 14px",
  borderRadius: "10px",
  border: "1px solid #ccc",
  fontSize: "14px",
  background: "#fff",
};