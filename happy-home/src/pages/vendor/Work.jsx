import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./WorkDetails.css";
import api from "../../api/api";


const adaptWorkRequests = (data) => {
  return data.map((item, index) => {
    // Try to find orderId in nested objects
    const orderId = 
      item.orderId || 
      item.id || 
      item.order_id ||
      item.myVendor?.orderId ||
      item.service?.orderId ||
      null; // Keep as null if not found
    
    console.log(`🔍 Item ${index}:`, {
      orderId: orderId,
      hasVendor: !!item.myVendor,
      service: item.service?.serviceName,
      price: item.price
    });
    
    return {
      requestId: `REQ${index + 1}`,
      orderId: orderId,
      
      // Store raw data for backend matching
      _rawData: item,
      
      serviceName: item.service?.serviceName || "Service",
      serviceCategory: item.service?.category || "General",

      serviceDate: item.timeSlot?.split("T")[0] || "N/A",
      serviceTime: item.timeSlot?.split("T")[1]?.substring(0, 5) || "N/A",
      duration: "2 hours",

      urgency: (item.priority || "medium").toLowerCase(),
      postedAt: "Just now",

      customer: {
        name: item.customerName || "Customer",
        phone: item.customerPhone || "N/A",
        rating: 4.5,
        totalBookings: 10,
      },

      serviceAddress: {
        area: item.address?.town || item.address?.city || "Unknown",
        distance: "2.5 km",
        fullAddress: `${item.address?.town || ""}, ${item.address?.city || ""} - ${item.address?.pincode || ""}`,
        locationType: "Apartment",
        floor: "N/A",
      },

      earnings: {
        baseAmount: item.price || 0,
        platformCommission: Math.round((item.price || 0) * 0.1),
        gst: Math.round((item.price || 0) * 0.18),
        yourEarnings: item.price || 0,
        paymentStatus: item.paymentMode === "COD" ? "Cash on Delivery" : "Prepaid",
        bonus: 0,
      },

      taskDetails: ["Service will be provided as per booking"],

      requirements: {
        materialsProvided: false,
        specialInstructions: item.instructions || null,
        petFriendly: false,
        parkingAvailable: true,
      },

      matchScore: 90,
    };
  });
};

const ViewWorkDetails = () => {
  const [workRequests, setWorkRequests] = useState([]);
  const [rawWorkData, setRawWorkData] = useState([]); // Store raw data
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState(false);

  const getVendorId = () => {
    const vendorId = 
    JSON.parse(sessionStorage.getItem('user')).userId;
    return vendorId;
  };

  useEffect(() => {
    api
      .get("/vendor/work")
      .then((res) => {
        console.log("✅ Raw API Response:", res.data);
        setRawWorkData(res.data); // Store raw data
        setWorkRequests(adaptWorkRequests(res.data));
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ API ERROR:", err);
        toast.error("Failed to load work requests");
        setLoading(false);
      });
  }, []);

  const getUrgencyClass = (urgency) => {
    const urgencyMap = {
      urgent: "urgency-urgent",
      high: "urgency-high",
      medium: "urgency-medium",
      low: "urgency-low",
    };
    return urgencyMap[urgency] || "urgency-medium";
  };

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
  };

  // 🔥 WORKAROUND APPROACH 1: Try different API patterns
  const handleAccept = async () => {
    const vendorId = getVendorId();
    const orderId = selectedRequest?.orderId;
    const rawData = selectedRequest?._rawData;

    console.log("🔍 Accept Request - Vendor ID:", vendorId);
    console.log("🔍 Order ID:", orderId);
    console.log("🔍 Raw Data:", rawData);

    if (!vendorId) {
      toast.error("Vendor ID not found. Please login again.");
      return;
    }

    setAccepting(true);

    try {
      let response;

      // APPROACH 1: If we have orderId, use original endpoint
      if (orderId) {
        const apiUrl = `/vendor/work/${vendorId}/${orderId}`;
        console.log("🔍 Trying URL:", apiUrl);
        response = await api.post(apiUrl);
      } 
      
      console.log("✅ API Response:", response);

      if (response.status === 202 || response.status === 200) {
        toast.success("Request accepted successfully!");
        setShowAcceptModal(false);
        setSelectedRequest(null);
        
        // Refresh the list
        const res = await api.get("/vendor/work");
        setRawWorkData(res.data);
        setWorkRequests(adaptWorkRequests(res.data));
      }
    } catch (error) {
      console.error("❌ ERROR:", error);
      console.error("❌ Error Response:", error.response?.data);
      
      // Show the backend error message if available
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error ||
                          error.message;
      
      toast.error(`Failed: ${errorMessage}`);
      
      // If it's a 500 error, show what the backend needs
      if (error.response?.status === 500) {
        console.log("💡 Your backend might need:");
        console.log("   1. The orderId to be included in /vendor/work response");
        console.log("   2. Or a different accept endpoint that doesn't require orderId");
        console.log("   3. Check your backend logs for the exact error");
        
        toast.info("Check console for backend requirements", { autoClose: 5000 });
      }
    } finally {
      setAccepting(false);
    }
  };

  const handleReject = () => {
    if (!rejectReason) {
      toast.warning("Please select a reason for rejection");
      return;
    }
    
    toast.info(`Request declined: ${rejectReason}`);
    setShowRejectModal(false);
    setRejectReason("");
    setSelectedRequest(null);
  };

  const filteredRequests =
    filter === "all"
      ? workRequests
      : workRequests.filter((req) => req.urgency === filter);

  if (loading) {
    return (
      <div className="work-details-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading work requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="work-details-container">

      {/* ===================== HEADER ===================== */}
      <div className="work-header">
        <div className="container">
          <div className="header-top">
            <div>
              <h1 className="page-title">Available Work Requests</h1>
              <p className="page-subtitle">
                Review and accept requests that match your skills
              </p>
            </div>
            <div className="header-stats">
              <div className="stat-box">
                <div className="stat-number">{workRequests.length}</div>
                <div className="stat-label">New Requests</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===================== MAIN ===================== */}
      <div className="work-content">
        <div className="container">

          {!selectedRequest ? (
            <div className="requests-grid">
              {filteredRequests.length === 0 ? (
                <div className="no-requests">
                  <i className="bi bi-inbox"></i>
                  <h3>No work requests available</h3>
                  <p>Check back later for new opportunities</p>
                </div>
              ) : (
                filteredRequests.map((request) => (
                  <div key={request.requestId} className="request-card">

                    {/* CARD HEADER */}
                    <div className="request-card-header">
                      <div className="request-meta">
                        <span
                          className={`urgency-badge ${getUrgencyClass(
                            request.urgency
                          )}`}
                        >
                          {request.urgency.toUpperCase()}
                        </span>
                        <span className="posted-time">
                          <i className="bi bi-clock"></i> {request.postedAt}
                        </span>
                      </div>
                    </div>

                    {/* SERVICE INFO */}
                    <div className="service-info">
                      <h3 className="service-title">
                        {request.serviceName}
                      </h3>
                      <span className="service-category">
                        {request.serviceCategory}
                      </span>
                    </div>

                    {/* EARNINGS */}
                    <div className="earnings-box">
                      <label>You&apos;ll Earn</label>
                      <div className="earnings-value">
                        ₹{request.earnings.yourEarnings}
                      </div>
                    </div>

                    {/* QUICK DETAILS */}
                    <div className="quick-details-grid">
                      <div className="detail-item">
                        <i className="bi bi-calendar3"></i>
                        <div>
                          <label>Date</label>
                          <p>{request.serviceDate}</p>
                        </div>
                      </div>
                      <div className="detail-item">
                        <i className="bi bi-clock-history"></i>
                        <div>
                          <label>Time</label>
                          <p>{request.serviceTime}</p>
                        </div>
                      </div>
                      <div className="detail-item">
                        <i className="bi bi-geo-alt-fill"></i>
                        <div>
                          <label>Location</label>
                          <p>
                            {request.serviceAddress.area} (
                            {request.serviceAddress.distance})
                          </p>
                        </div>
                      </div>
                      <div className="detail-item">
                        <i className="bi bi-hourglass-split"></i>
                        <div>
                          <label>Duration</label>
                          <p>{request.duration}</p>
                        </div>
                      </div>
                    </div>

                    {/* CUSTOMER */}
                    <div className="customer-preview">
                      <div className="customer-avatar">
                        {request.customer.name.charAt(0)}
                      </div>
                      <div>
                        <h5>{request.customer.name}</h5>
                        <span>
                          ⭐ {request.customer.rating} (
                          {request.customer.totalBookings} bookings)
                        </span>
                      </div>
                    </div>

                    {/* TAGS */}
                    <div className="requirements-tags">
                      <span className="req-tag">
                        <i className="bi bi-credit-card"></i> {request.earnings.paymentStatus}
                      </span>
                      {request.requirements.parkingAvailable && (
                        <span className="req-tag">
                          <i className="bi bi-p-square"></i> Parking
                        </span>
                      )}
                    </div>

                    {/* Action Button */}
                    <button 
                      className="btn-view-details"
                      onClick={() => handleViewDetails(request)}
                    >
                      View Full Details & Accept
                      <i className="bi bi-arrow-right"></i>
                    </button>
                  </div>
                ))
              )}
            </div>
          ) : (
            // Detailed View
            <div className="detailed-view">
              <button className="btn-back" onClick={() => setSelectedRequest(null)}>
                <i className="bi bi-arrow-left"></i> Back to Requests
              </button>

              <div className="row">
                <div className="col-lg-8">
                  <div className="detail-card">
                    <div className="card-header-detail">
                      <i className="bi bi-briefcase-fill"></i>
                      <h3>Service Details</h3>
                      <span className={`urgency-badge-large ${getUrgencyClass(selectedRequest.urgency)}`}>
                        {selectedRequest.urgency.toUpperCase()}
                      </span>
                    </div>
                    <div className="card-body-detail">
                      <h4 className="service-name-large">{selectedRequest.serviceName}</h4>
                      <p className="category-text">{selectedRequest.serviceCategory}</p>
                      
                      <div style={{marginTop: '1.5rem'}}>
                        <p><strong>📅 Date:</strong> {selectedRequest.serviceDate}</p>
                        <p><strong>🕐 Time:</strong> {selectedRequest.serviceTime}</p>
                        <p><strong>📍 Location:</strong> {selectedRequest.serviceAddress.fullAddress}</p>
                        <p><strong>💰 You'll Earn:</strong> ₹{selectedRequest.earnings.yourEarnings}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="action-sidebar">
                    <div className="action-card-detail">
                      <h4>Decision Time</h4>
                      <p className="action-subtitle">Review all details and make your decision</p>
                      
                      <button 
                        className="btn-action-large btn-accept"
                        onClick={() => setShowAcceptModal(true)}
                        disabled={accepting}
                      >
                        <i className="bi bi-check-circle-fill"></i>
                        {accepting ? "Processing..." : "Accept Request"}
                      </button>
                      
                      <button 
                        className="btn-action-large btn-reject"
                        onClick={() => setShowRejectModal(true)}
                        disabled={accepting}
                      >
                        <i className="bi bi-x-circle-fill"></i>
                        Decline Request
                      </button>
                    </div>

                    {/* Info Card */}
                    <div className="info-sidebar-card">
                      <h4>Order Info</h4>
                      <div className="match-reasons">
                        <div className="match-reason-item">
                          <i className="bi bi-tag"></i>
                          <span>{selectedRequest.serviceName}</span>
                        </div>
                        <div className="match-reason-item">
                          <i className="bi bi-calendar"></i>
                          <span>{selectedRequest.serviceDate}</span>
                        </div>
                        <div className="match-reason-item">
                          <i className="bi bi-cash"></i>
                          <span>₹{selectedRequest.earnings.yourEarnings}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Accept Modal */}
      {showAcceptModal && selectedRequest && (
        <div className="modal-overlay" onClick={() => !accepting && setShowAcceptModal(false)}>
          <div className="modal-content-custom" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon success">
              <i className="bi bi-check-circle-fill"></i>
            </div>
            <h3>Accept This Request?</h3>
            <p>By accepting, you commit to completing this service on the scheduled date and time.</p>
            <div className="modal-highlight">
              <strong>You&apos;ll earn: ₹{selectedRequest.earnings.yourEarnings}</strong>
            </div>
            <div className="modal-actions-custom">
              <button 
                className="btn-modal-custom btn-cancel-custom" 
                onClick={() => setShowAcceptModal(false)}
                disabled={accepting}
              >
                Go Back
              </button>
              <button 
                className="btn-modal-custom btn-confirm-custom" 
                onClick={handleAccept}
                disabled={accepting}
              >
                {accepting ? (
                  <>
                    <i className="bi bi-hourglass-split"></i> Processing...
                  </>
                ) : (
                  <>
                    <i className="bi bi-check-circle-fill"></i> Yes, Accept Request
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="modal-overlay" onClick={() => setShowRejectModal(false)}>
          <div className="modal-content-custom" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon danger">
              <i className="bi bi-x-circle-fill"></i>
            </div>
            <h3>Decline This Request?</h3>
            <p>Please select a reason for rejection.</p>
            <div className="reject-reasons">
              <label className="reason-option">
                <input 
                  type="radio" 
                  name="reason" 
                  value="schedule"
                  onChange={(e) => setRejectReason(e.target.value)}
                />
                <span>Schedule conflict</span>
              </label>
              <label className="reason-option">
                <input 
                  type="radio" 
                  name="reason" 
                  value="distance"
                  onChange={(e) => setRejectReason(e.target.value)}
                />
                <span>Location too far</span>
              </label>
              <label className="reason-option">
                <input 
                  type="radio" 
                  name="reason" 
                  value="price"
                  onChange={(e) => setRejectReason(e.target.value)}
                />
                <span>Earnings too low</span>
              </label>
              <label className="reason-option">
                <input 
                  type="radio" 
                  name="reason" 
                  value="other"
                  onChange={(e) => setRejectReason(e.target.value)}
                />
                <span>Other reasons</span>
              </label>
            </div>
            <div className="modal-actions-custom">
              <button className="btn-modal-custom btn-cancel-custom" onClick={() => {
                setShowRejectModal(false);
                setRejectReason('');
              }}>
                Go Back
              </button>
              <button className="btn-modal-custom btn-danger-custom" onClick={handleReject}>
                Confirm Decline
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .loading-spinner {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 60vh;
          gap: 1.5rem;
        }

        .spinner {
          width: 50px;
          height: 50px;
          border: 4px solid #e5e7eb;
          border-top-color: #2563eb;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .no-requests {
          text-align: center;
          padding: 5rem 2rem;
          background: #ffffff;
          border-radius: 16px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          grid-column: 1 / -1;
        }

        .no-requests i {
          font-size: 5rem;
          color: #d1d5db;
          margin-bottom: 1.5rem;
        }

        .no-requests h3 {
          font-size: 1.75rem;
          color: #000000;
          margin-bottom: 0.75rem;
        }

        .no-requests p {
          color: #374151;
          font-size: 1.125rem;
        }

        .card-body-detail p {
          margin-bottom: 0.75rem;
          line-height: 1.6;
        }
      `}</style>
    </div>
  );
};

export default ViewWorkDetails;