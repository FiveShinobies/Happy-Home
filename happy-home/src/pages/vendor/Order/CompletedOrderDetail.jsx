import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Home, Droplet, Zap, Paintbrush, Wrench,
  Calendar, MapPin, Star, ArrowLeft
} from "lucide-react";

export default function ViewOrderDetail() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  // Same completed-only data (vendor view)
  const orders = {
    "SRV-001": {
      id: "SRV-001",
      serviceName: "Deep Home Cleaning",
      category: "Cleaning",
      description: "Deep cleaning of entire home.",
      provider: {
        name: "SparkClean Services",
        rating: 4.8,
        jobs: 320
      },
      tech: {
        name: "Meera Singh",
        photo: "MS",
        specialization: "Cleaning Expert",
        rating: 4.9,
        completedJobs: 210
      },
      serviceDate: "2024-12-01",
      timeSlot: "10AM - 2PM",
      status: "Completed",
      address: "123 Main Street, Apt 4B",
      tasks: [
        { task: "Bathroom Deep Clean", time: "40 mins" },
        { task: "Kitchen Degreasing", time: "35 mins" }
      ],
      materials: [],
      serviceCharge: 150,
      materialCharge: 0,
      tax: 12,
      total: 162,
      paymentStatus: "Paid",
      paymentMethod: "Online",
    }
  };

  const data = orders[orderId];
  if (!data) return <h1 style={{ padding: 20 }}>Order Not Found</h1>;

  const Icon = {
    Cleaning: Home,
    Plumbing: Droplet,
    Electrical: Zap,
    Painting: Paintbrush,
    "AC Repair": Wrench
  }[data.category];

  return (
    <div style={{ padding: 32, background: "#f6f7f9", minHeight: "100vh" }}>
      
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        style={{
          background: "none",
          border: "none",
          color: "#1976D2",
          display: "flex",
          alignItems: "center",
          gap: 6,
          fontSize: 16,
          cursor: "pointer",
          marginBottom: 20,
        }}
      >
        <ArrowLeft size={20} /> Back
      </button>

      {/* CARD */}
      <div
        style={{
          background: "#fff",
          padding: 24,
          borderRadius: 14,
          boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
          border: "1px solid #eee",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 14 }}>
            <div
              style={{
                width: 56,
                height: 56,
                background: "#E3F2FD",
                borderRadius: 14,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon size={30} color="#1976D2" />
            </div>
            <div>
              <h2 style={{ margin: 0 }}>{data.serviceName}</h2>
              <div style={{ color: "#777" }}>{data.id}</div>
              <p style={{ marginTop: 4, color: "#555" }}>{data.description}</p>
            </div>
          </div>

          <span
            style={{
              background: "#E6F4EA",
              color: "#2E7D32",
              padding: "6px 14px",
              borderRadius: 30,
              fontWeight: 600,
            }}
          >
            Completed
          </span>
        </div>

        {/* Schedule */}
        <div style={grid3}>
          <div style={infoBox}>
            <p style={label}>Service Date</p>
            <strong>{data.serviceDate}</strong>
          </div>
          <div style={infoBox}>
            <p style={label}>Time Slot</p>
            <strong>{data.timeSlot}</strong>
          </div>
          <div style={infoBox}>
            <p style={label}>Address</p>
            <strong>{data.address}</strong>
          </div>
        </div>

        {/* Tasks */}
        <div>
          <h3>Tasks Performed</h3>
          <table style={table}>
            <thead>
              <tr>
                <th>Task</th>
                <th style={{ textAlign: "right" }}>Time</th>
              </tr>
            </thead>
            <tbody>
              {data.tasks.map((t, i) => (
                <tr key={i}>
                  <td>{t.task}</td>
                  <td style={{ textAlign: "right" }}>{t.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Payment Summary */}
        <div style={infoBox}>
          <h3>Payment Summary</h3>
          <Pay label="Service Charge" v={data.serviceCharge} />
          <Pay label="Material Charges" v={data.materialCharge} />
          <Pay label="Tax" v={data.tax} />
          <hr />
          <Pay label="Total" v={data.total} bold />
          <Pay label="Payment Status" v={data.paymentStatus} />
          <Pay label="Payment Method" v={data.paymentMethod} />
        </div>

        {/* ONLY ONE BUTTON NOW */}
        <div style={{ textAlign: "right" }}>
          <button
            onClick={() => navigate(`/vendor-home/vendors-feedback/${data.id}`)}
            style={primaryBtn}
          >
            Give Feedback
          </button>
        </div>
      </div>
    </div>
  );
}

function Pay({ label, v, bold }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 6,
      }}
    >
      <span style={{ fontWeight: bold ? 700 : 500 }}>{label}</span>
      <span style={{ fontWeight: bold ? 700 : 600 }}>₹{v}</span>
    </div>
  );
}

// ---------------- STYLES ----------------

const grid3 = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "16px",
};

const infoBox = {
  background: "#fafafa",
  padding: 14,
  borderRadius: 10,
  border: "1px solid #eee",
};

const label = { fontSize: 12, color: "#777", marginBottom: 4 };

const table = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: 10,
};

const primaryBtn = {
  background: "#1976D2",
  color: "white",
  padding: "10px 20px",
  borderRadius: "10px",
  border: "none",
  cursor: "pointer",
  fontWeight: 600,
};