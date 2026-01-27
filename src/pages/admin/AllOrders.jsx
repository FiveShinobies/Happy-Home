import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  List,
  Calendar,
  MapPin,
  User,
  DollarSign,
  Briefcase,
  SlidersHorizontal,
} from "lucide-react";

export default function AllOrders() {
  const navigate = useNavigate();

  // FINAL 10 HARD-CODED ORDERS
  const ordersList = [
    { id: "ORD-101", customer: "Rahul Sharma", vendor: "Rohit Kumar", service: "Home Cleaning", category: "Cleaning", date: "2024-12-01", address: "123 MG Road, Pune", mrp: 150, status: "Completed" },
    { id: "ORD-102", customer: "Aditi Jain", vendor: "Sahil Patil", service: "Plumbing Repair", category: "Plumbing", date: "2024-12-03", address: "Hinjewadi Phase 2, Pune", mrp: 280, status: "In Progress" },
    { id: "ORD-103", customer: "Kunal Verma", vendor: "Imran Shaikh", service: "AC Service", category: "AC Repair", date: "2024-12-05", address: "Baner, Pune", mrp: 350, status: "Scheduled" },
    { id: "ORD-104", customer: "Sneha Kulkarni", vendor: "Mirja Abuzar Baig", service: "Salon: Facial + Hair Spa", category: "Salon & Beauty", date: "2024-12-10", address: "Kothrud, Pune", mrp: 1200, status: "Completed" },
    { id: "ORD-105", customer: "Vikas Gupta", vendor: "Aman Yadav", service: "Electrical Fix – Fan Repair", category: "Electrical", date: "2024-12-08", address: "Viman Nagar, Pune", mrp: 450, status: "In Progress" },
    { id: "ORD-106", customer: "Neha Singh", vendor: "Hitesh More", service: "Pest Control – Cockroach", category: "Pest Control", date: "2024-12-11", address: "Bavdhan, Pune", mrp: 900, status: "Completed" },
    { id: "ORD-107", customer: "Saurabh Patil", vendor: "Ramesh Pawar", service: "Washing Machine Repair", category: "Appliance Repair", date: "2024-12-03", address: "Wakad, Pune", mrp: 650, status: "Scheduled" },
    { id: "ORD-108", customer: "Megha Deshmukh", vendor: "Deepali Acharya", service: "Home Deep Cleaning", category: "Cleaning", date: "2024-12-02", address: "Sinhagad Road, Pune", mrp: 1800, status: "Completed" },
    { id: "ORD-109", customer: "Harshil Dave", vendor: "Vikas Singh", service: "AC Gas Refill", category: "AC Repair", date: "2024-12-06", address: "Kharadi, Pune", mrp: 1400, status: "In Progress" },
    { id: "ORD-110", customer: "Aarav Malhotra", vendor: "Sameer Patil", service: "Geyser Repair", category: "Appliance Repair", date: "2024-12-07", address: "Hadapsar, Pune", mrp: 500, status: "Completed" },
  ];

  // FILTER LOGIC
  const [statusFilter, setStatusFilter] = useState("All");
  const [catFilter, setCatFilter] = useState("All");

  const filteredOrders = ordersList.filter((o) => {
    const matchStatus = statusFilter === "All" || o.status === statusFilter;
    const matchCat = catFilter === "All" || o.category === catFilter;
    return matchStatus && matchCat;
  });

  // STATUS COLORS WITH ORANGE FOR SCHEDULED
  const statusColors = {
  Completed: "bg-success",
  "In Progress": "bg-warning text-dark", 
  Scheduled: "bg-danger",               
};


  return (
    <div className="py-5" style={{ background: "#eef2f7", minHeight: "100vh" }}>
      <div className="container">

        {/* PAGE HEADER */}
        <h2 className="fw-bold text-dark mb-4 d-flex align-items-center gap-2">
          <List color="#0b5ed7" /> All Orders
        </h2>

        {/* FILTER BAR */}
        <div className="card shadow-sm border-0 mb-4 p-3">
          <div className="d-flex align-items-center gap-3">
            <SlidersHorizontal color="#0b5ed7" />

            <select className="form-select w-auto" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="All">All Status</option>
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
              <option value="Scheduled">Scheduled</option>
            </select>

            <select className="form-select w-auto" value={catFilter} onChange={(e) => setCatFilter(e.target.value)}>
              <option value="All">All Categories</option>
              <option value="Cleaning">Cleaning</option>
              <option value="Plumbing">Plumbing</option>
              <option value="Electrical">Electrical</option>
              <option value="AC Repair">AC Repair</option>
              <option value="Appliance Repair">Appliance Repair</option>
              <option value="Pest Control">Pest Control</option>
              <option value="Salon & Beauty">Salon & Beauty</option>
            </select>
          </div>
        </div>

        {/* LINE-WISE ORDER LIST */}
        <div className="card shadow-sm border-0 p-3">
          {filteredOrders.map((o) => (
            <div
              key={o.id}
              className="p-3 border-bottom"
              style={{ background: "#f8faff", borderRadius: "10px" }}
            >
              <div className="row align-items-center">

                {/* SERVICE & ID */}
                <div className="col-md-3">
                  <h5 className="fw-bold text-primary m-0">{o.service}</h5>
                  <small className="text-muted">{o.id}</small>
                </div>

                {/* CUSTOMER */}
                <div className="col-md-2 d-flex align-items-center gap-2">
                  <User size={18} className="text-muted" />
                  {o.customer}
                </div>

                {/* VENDOR */}
                <div className="col-md-2 d-flex align-items-center gap-2">
                  <Briefcase size={18} className="text-muted" />
                  <strong>{o.vendor}</strong>
                </div>

                {/* DATE */}
                <div className="col-md-2 d-flex align-items-center gap-2">
                  <Calendar size={18} className="text-muted" />
                  {o.date}
                </div>

                {/* PRICE */}
                <div className="col-md-1 d-flex align-items-center gap-2">
                  <DollarSign size={18} className="text-muted" />
                  <strong>MRP: ₹{o.mrp}</strong>
                </div>

                {/* STATUS */}
                <div className="col-md-1">
                  <span className={`badge ${statusColors[o.status]} px-3 py-2`}>
                    {o.status}
                  </span>
                </div>

                {/* DETAILS BUTTON */}
                <div className="col-md-1 text-end">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => navigate(`/admin-home/order-details/${o.id}`)}
                  >
                    Details
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}