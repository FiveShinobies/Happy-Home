import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Star,
  ArrowLeft
} from "lucide-react";

export default function VendorFeedback() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  // Fake order-service mapping (auto-fill)
  const serviceMap = {
    "SRV-001": "Deep Home Cleaning",
    "SRV-002": "Kitchen Plumbing Repair",
    "SRV-003": "Electrical Wiring Inspection",
  };

  // ------------------ FEEDBACK STATE ------------------
  const [form, setForm] = useState({
    name: "",
    service: "",
    rating: 4,
    feedback: "",
    tags: [],
  });

  useEffect(() => {
    if (orderId && serviceMap[orderId]) {
      setForm((prev) => ({ ...prev, service: serviceMap[orderId] }));
    }
  }, [orderId]);

  const tagsList = ["Excellent", "Very Good", "Good", "Average", "Poor"];

  const toggleTag = (tag) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const submitForm = (e) => {
    e.preventDefault();

    if (!form.name || !form.feedback) {
      alert("Please fill required fields!");
      return;
    }

    alert(
      "Feedback Submitted!\n\n" +
        JSON.stringify(form, null, 2)
    );

    navigate("/"); // redirect to home/order page
  };

  // =====================================================================
  //                             UI STARTS
  // =====================================================================

  return (
    <div style={page}>

      {/* Back Button */}
      <button onClick={() => navigate(-1)} style={backBtn}>
        <ArrowLeft size={20} /> Back
      </button>

      {/* Feedback Card */}
      <div style={card}>

        <h2 style={title}>Rate Your Experience</h2>
        <p style={subtitle}>Your feedback helps us improve our service quality.</p>

        {/* FORM */}
        <form onSubmit={submitForm} style={formBox}>

          {/* NAME */}
          <label style={label}>
            Your Name <span style={req}>*</span>
            <input
              type="text"
              style={input}
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              placeholder="Enter your full name"
            />
          </label>

          {/* SERVICE */}
          <label style={label}>
            Service Taken
            <input
              type="text"
              style={input}
              value={form.service}
              onChange={(e) =>
                setForm({ ...form, service: e.target.value })
              }
              placeholder="e.g. Kitchen Plumbing Repair"
              readOnly={!!orderId}
            />
          </label>

          {/* RATING */}
          <label style={label}>
            Rate Your Experience
            <div style={ratingRow}>
              <input
                type="range"
                min="1"
                max="5"
                value={form.rating}
                onChange={(e) =>
                  setForm({ ...form, rating: Number(e.target.value) })
                }
                style={{ flex: 1 }}
              />
              <span style={ratingNumber}>
                {form.rating} ★
              </span>
            </div>
          </label>

          {/* TAGS */}
          <label style={label}>
            Experience Tags
            <div style={tagContainer}>
              {tagsList.map((tag) => (
                <span
                  key={tag}
                  style={
                    form.tags.includes(tag) ? tagChipSelected : tagChip
                  }
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </span>
              ))}
            </div>
          </label>

          {/* FEEDBACK */}
          <label style={label}>
            Write Feedback <span style={req}>*</span>
            <textarea
              rows={4}
              style={textarea}
              value={form.feedback}
              onChange={(e) =>
                setForm({ ...form, feedback: e.target.value })
              }
              placeholder="Describe your experience..."
            ></textarea>
          </label>

          {/* SUBMIT */}
          <button type="submit" style={submitBtn}>
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
}

// =====================================================================
//                              STYLES
// =====================================================================

const page = {
  padding: "32px",
  minHeight: "100vh",
  background: "#f6f7f9",
};

const backBtn = {
  background: "none",
  border: "none",
  color: "#1976D2",
  fontSize: "16px",
  display: "flex",
  alignItems: "center",
  gap: "6px",
  cursor: "pointer",
  marginBottom: "16px",
};

const card = {
  background: "white",
  padding: "28px",
  borderRadius: "16px",
  maxWidth: "600px",
  margin: "0 auto",
  boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
  border: "1px solid #eee",
};

const title = {
  margin: 0,
  fontSize: "24px",
  fontWeight: 700,
};

const subtitle = {
  fontSize: "14px",
  color: "#666",
  marginBottom: "20px",
};

const formBox = {
  display: "flex",
  flexDirection: "column",
  gap: "18px",
};

const label = {
  fontSize: "14px",
  fontWeight: 600,
};

const req = {
  color: "#D32F2F",
};

const input = {
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #ccc",
  marginTop: "6px",
  fontSize: "14px",
};

const textarea = {
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #ccc",
  marginTop: "6px",
  fontSize: "14px",
  resize: "none",
};

const ratingRow = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  marginTop: "8px",
};

const ratingNumber = {
  background: "#E3F2FD",
  padding: "8px 12px",
  borderRadius: "10px",
  fontWeight: 600,
  color: "#1565C0",
};

const tagContainer = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
  marginTop: "10px",
};

const tagChip = {
  padding: "6px 12px",
  borderRadius: "20px",
  border: "1px solid #ccc",
  fontSize: "13px",
  cursor: "pointer",
  background: "#fff",
  color: "#444",
};

const tagChipSelected = {
  ...tagChip,
  background: "#1976D2",
  color: "white",
  border: "1px solid #1976D2",
};

const submitBtn = {
  background: "#1976D2",
  color: "white",
  padding: "12px 20px",
  fontSize: "15px",
  borderRadius: "12px",
  border: "none",
  cursor: "pointer",
  marginTop: "10px",
  fontWeight: 600,
};