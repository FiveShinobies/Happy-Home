import React from "react";
import { useParams, useNavigate } from "react-router-dom";
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
} from "lucide-react";

export default function OrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  // ===== HARD-CODED ORDER DATABASE =====
  const ordersDB = {
  "ORD-101": {
    id: "ORD-101",
    service: "Home Cleaning",
    category: "Cleaning",
    customer: "Rahul Sharma",
    phone: "+91 9876543210",
    vendor: "Rohit Kumar",
    vendorRating: "4.8",
    date: "2024-12-01",
    time: "10:00 AM - 2:00 PM",
    address: "123 MG Road, Pune",
    status: "Completed",
    serviceCharge: 120,
    materialCharge: 20,
    tax: 10,
    tasks: ["Kitchen Degreasing", "Bathroom Cleaning", "Floor Sanitization", "Window Wiping"],
  },

  "ORD-102": {
    id: "ORD-102",
    service: "Plumbing Repair",
    category: "Plumbing",
    customer: "Aditi Jain",
    phone: "+91 9988776655",
    vendor: "Sahil Patil",
    vendorRating: "4.6",
    date: "2024-12-03",
    time: "9:30 AM - 11:00 AM",
    address: "Hinjewadi Phase 2, Pune",
    status: "In Progress",
    serviceCharge: 220,
    materialCharge: 40,
    tax: 20,
    tasks: ["Leak Fixing", "Tap Replacement", "Pipeline Check"],
  },

  "ORD-103": {
    id: "ORD-103",
    service: "AC Service",
    category: "AC Repair",
    customer: "Kunal Verma",
    phone: "+91 9090909090",
    vendor: "Imran Shaikh",
    vendorRating: "4.7",
    date: "2024-12-05",
    time: "12:00 PM - 3:00 PM",
    address: "Baner, Pune",
    status: "Scheduled",
    serviceCharge: 300,
    materialCharge: 30,
    tax: 20,
    tasks: ["Filter Cleaning", "Gas Pressure Check", "Cooling Efficiency Test"],
  },

  "ORD-104": {
    id: "ORD-104",
    service: "Salon: Facial + Hair Spa",
    category: "Salon & Beauty",
    customer: "Sneha Kulkarni",
    phone: "+91 9404455511",
    vendor: "Mirja Abuzar Baig",
    vendorRating: "4.9",
    date: "2024-12-10",
    time: "4:00 PM - 6:00 PM",
    address: "Kothrud, Pune",
    status: "Completed",
    serviceCharge: 800,
    materialCharge: 300,
    tax: 100,
    tasks: ["Facial Relaxation", "Hair Spa", "Steam Treatment"],
  },

  "ORD-105": {
    id: "ORD-105",
    service: "Fan Repair",
    category: "Electrical",
    customer: "Vikas Gupta",
    phone: "+91 9001122334",
    vendor: "Aman Yadav",
    vendorRating: "4.4",
    date: "2024-12-08",
    time: "11:00 AM - 12:30 PM",
    address: "Viman Nagar, Pune",
    status: "In Progress",
    serviceCharge: 350,
    materialCharge: 50,
    tax: 30,
    tasks: ["Bearing Check", "Blade Adjustment", "Motor Testing"],
  },

  "ORD-106": {
    id: "ORD-106",
    service: "Pest Control",
    category: "Pest Control",
    customer: "Neha Singh",
    phone: "+91 9988007766",
    vendor: "Hitesh More",
    vendorRating: "4.8",
    date: "2024-12-11",
    time: "9:00 AM - 11:00 AM",
    address: "Bavdhan, Pune",
    status: "Completed",
    serviceCharge: 600,
    materialCharge: 200,
    tax: 100,
    tasks: ["Chemical Spraying", "Gel Treatment", "Safety Sealing"],
  },

  "ORD-107": {
    id: "ORD-107",
    service: "Washing Machine Repair",
    category: "Appliance Repair",
    customer: "Saurabh Patil",
    phone: "+91 9711223344",
    vendor: "Ramesh Pawar",
    vendorRating: "4.5",
    date: "2024-12-03",
    time: "3:00 PM - 4:30 PM",
    address: "Wakad, Pune",
    status: "Scheduled",
    serviceCharge: 400,
    materialCharge: 150,
    tax: 50,
    tasks: ["Drum Check", "Motor Calibration", "Water Pipe Cleaning"],
  },

  "ORD-108": {
    id: "ORD-108",
    service: "Full Home Deep Cleaning",
    category: "Cleaning",
    customer: "Megha Deshmukh",
    phone: "+91 8877665544",
    vendor: "Deepali Acharya",
    vendorRating: "4.9",
    date: "2024-12-02",
    time: "8:00 AM - 3:00 PM",
    address: "Sinhagad Road, Pune",
    status: "Completed",
    serviceCharge: 1400,
    materialCharge: 200,
    tax: 200,
    tasks: ["Deep Floor Cleaning", "Furniture Polishing", "Bathroom Sanitization"],
  },

  "ORD-109": {
    id: "ORD-109",
    service: "AC Gas Refill",
    category: "AC Repair",
    customer: "Harshil Dave",
    phone: "+91 8123456789",
    vendor: "Vikas Singh",
    vendorRating: "4.6",
    date: "2024-12-06",
    time: "2:00 PM - 4:00 PM",
    address: "Kharadi, Pune",
    status: "In Progress",
    serviceCharge: 1000,
    materialCharge: 300,
    tax: 100,
    tasks: ["Gas Refilling", "Leak Testing"]
  },

  "ORD-110": {
    id: "ORD-110",
    service: "Geyser Repair",
    category: "Appliance Repair",
    customer: "Aarav Malhotra",
    phone: "+91 9988992211",
    vendor: "Sameer Patil",
    vendorRating: "4.7",
    date: "2024-12-07",
    time: "5:00 PM - 6:30 PM",
    address: "Hadapsar, Pune",
    status: "Completed",
    serviceCharge: 350,
    materialCharge: 100,
    tax: 50,
    tasks: ["Thermostat Check", "Heating Coil Test"],
  },
};


  // Fetch selected order
  const order = ordersDB[orderId];

  if (!order) return <h2 className="text-center mt-5">Order not found</h2>;

  // PRICE CALCULATION
  const total = order.serviceCharge + order.materialCharge + order.tax;

  return (
    <div className="py-5" style={{ background: "#eef2f7", minHeight: "100vh" }}>
      <div className="container">

        {/* BACK BUTTON */}
        <button onClick={() => navigate(-1)} className="btn btn-outline-primary mb-4">
          <ArrowLeft size={18} /> Back
        </button>

        {/* PAGE HEADER */}
        <h2 className="fw-bold d-flex align-items-center gap-2 text-dark mb-4">
          <ClipboardList color="#0b5ed7" /> Order Details
        </h2>

        {/* MAIN CARD */}
        <div className="card shadow-lg border-0 p-4" style={{ borderRadius: "14px" }}>

          {/* SERVICE NAME */}
          <h3 className="fw-bold text-primary">{order.service}</h3>
          <p className="text-muted">Order ID: {order.id}</p>
        <span
  className={
    order.status === "Completed"
      ? "badge bg-success fs-6 px-3 py-2"
      : order.status === "In Progress"
      ? "badge bg-warning text-dark fs-6 px-3 py-2"
      : "badge bg-danger fs-6 px-3 py-2"  
  }
>
  {order.status}
</span>

          <hr />

          <div className="row">

            {/* LEFT SIDE INFORMATION */}
            <div className="col-md-6 d-flex flex-column gap-3">

              {/* CUSTOMER CARD */}
              <div className="card shadow-sm border-0 p-3">
                <h5 className="fw-bold mb-2">Customer Information</h5>
                <div className="d-flex align-items-center gap-2">
                  <User /> <span>{order.customer}</span>
                </div>
                <div className="d-flex align-items-center gap-2 mt-2">
                  <Phone /> <span>{order.phone}</span>
                </div>
              </div>

              {/* VENDOR CARD */}
              <div className="card shadow-sm border-0 p-3">
                <h5 className="fw-bold mb-2">Assigned Vendor</h5>
                <div className="d-flex align-items-center gap-2">
                  <Briefcase /> <strong>{order.vendor}</strong>
                </div>
                <div className="d-flex align-items-center gap-2 mt-2">
                  <Star color="#f5c518" /> <span>{order.vendorRating} / 5</span>
                </div>
              </div>

              {/* SERVICE SCHEDULE */}
              <div className="card shadow-sm border-0 p-3">
                <h5 className="fw-bold mb-2">Service Schedule</h5>
                <div className="d-flex align-items-center gap-2">
                  <Calendar /> <span>{order.date} • {order.time}</span>
                </div>
                <div className="d-flex align-items-center gap-2 mt-2">
                  <MapPin /> <span>{order.address}</span>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE — TASKS + PRICE BREAKDOWN */}
            <div className="col-md-6">

              {/* TASK LIST */}
              <div className="card shadow-sm border-0 p-3 mb-3">
                <h5 className="fw-bold mb-3">Tasks Included</h5>

                <ul className="list-group">
                  {order.tasks.map((task, i) => (
                    <li
                      key={i}
                      className="list-group-item d-flex justify-content-between"
                    >
                      {task}
                      <span className="badge bg-primary">OK</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* PRICE BREAKDOWN */}
              <div className="card shadow-sm border-0 p-3">
                <h5 className="fw-bold mb-3">Price Breakdown</h5>

                <div className="d-flex justify-content-between mb-2">
                  <span>Service Charge</span>
                  <strong>₹{order.serviceCharge}</strong>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span>Material Charge</span>
                  <strong>₹{order.materialCharge}</strong>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span>Tax</span>
                  <strong>₹{order.tax}</strong>
                </div>

                <hr />

                <div className="d-flex justify-content-between fs-5 fw-bold">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>

            </div>

          </div>

          {/* FEEDBACK BUTTON */}
          <div className="text-end mt-4">
            <button
              className="btn btn-dark px-4"
              onClick={() => navigate(`/admin-home/view-feedback`)}
            >
              View Feedback
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
// END OF COMPONENT