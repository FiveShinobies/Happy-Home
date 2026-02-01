import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const VendorAssignedOrders = ({ vendorId: propVendorId }) => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [vendorId, setVendorId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [showStartConfirm, setShowStartConfirm] = useState(false);
  const [showCompleteConfirm, setShowCompleteConfirm] = useState(false);

  useEffect(() => {
    let finalVendorId = null;

    // Get vendor ID from session storage or props
    const sessionUser = sessionStorage.getItem("user");
    const HARDCODED_VENDOR_ID = sessionUser ? JSON.parse(sessionUser).userId : null;

    if (propVendorId) {
      console.log("✅ Using vendorId from props:", propVendorId);
      finalVendorId = propVendorId;
    } else if (HARDCODED_VENDOR_ID) {
      console.log("⭐ Using vendorId from session:", HARDCODED_VENDOR_ID);
      finalVendorId = HARDCODED_VENDOR_ID;
    }

    setVendorId(finalVendorId);

    if (!finalVendorId) {
      setError("Vendor ID not found. Please log in again.");
      setLoading(false);
      return;
    }

    fetchVendorOrders(finalVendorId);
  }, [propVendorId]);

  const fetchVendorOrders = async (id) => {
    try {
      setLoading(true);
      setError(null);

      console.log("📡 Fetching orders from:", `/admin/vendors/${id}/orders`);

      const response = await axios.get(
        `http://localhost:8080/admin/vendors/${id}/orders`
      );

      console.log("📦 API Response:", response.data);

      // Filter for ASSIGNED and INPROGRESS orders
      const assignedOrders = response.data.filter(
        (order) => order.status === "ASSIGNED" || order.status === "INPROGRESS"
      );
      console.log("✅ Assigned orders:", assignedOrders);

      setOrders(assignedOrders);
      setLoading(false);
    } catch (error) {
      console.error("❌ Error fetching vendor orders:", error);
      setError(error.response?.data?.message || "Failed to load orders");
      toast.error("Failed to load orders");
      setLoading(false);
    }
  };

  const fetchOrderDetails = async (orderId) => {
    try {
      setDetailLoading(true);
      console.log("📡 Fetching order details for ID:", orderId);

      const response = await axios.get(
        `http://localhost:8080/vendor/details/${orderId}`
      );

      console.log("📦 Order Details Response:", response.data);

      setSelectedOrder(response.data);
      setDetailLoading(false);
    } catch (error) {
      console.error("❌ Error fetching order details:", error);
      toast.error("Failed to load order details");
      setDetailLoading(false);
    }
  };

  const handleViewDetails = (order) => {
    console.log("👆 View Details clicked for order:", order.orderId);
    fetchOrderDetails(order.orderId);
  };

  const handleStartService = async () => {
    try {
      const oid = selectedOrder.orderId;
      console.log("🚀 Starting service for order:", oid);

      const response = await axios.patch(
        `http://localhost:8080/order/in-progress/${oid}`
      );

      console.log("✅ Service started successfully:", response.data);
      setShowStartConfirm(false);
      toast.success("Service started successfully!");
      setSelectedOrder(null);
      fetchVendorOrders(vendorId);
    } catch (error) {
      console.error("❌ Error starting service:", error);
      toast.error(error.response?.data?.message || "Failed to start service");
    }
  };

  const handleCompleteService = async () => {
    try {
      const oid = selectedOrder.orderId;
      console.log("✅ Completing service for order:", oid);

      const response = await axios.patch(
        `http://localhost:8080/order/completed/${oid}`
      );

      console.log("✅ Service completed successfully:", response.data);
      setShowCompleteConfirm(false);
      toast.success("Service completed successfully!");
      setSelectedOrder(null);
      fetchVendorOrders(vendorId);
    } catch (error) {
      console.error("❌ Error completing service:", error);
      toast.error(
        error.response?.data?.message || "Failed to complete service"
      );
    }
  };

  const calculateEarnings = (price) => {
    const baseAmount = parseFloat(price || 0);
    const gst = baseAmount * 0.18;
    const platformCommission = baseAmount * 0.1;
    const vendorEarnings = baseAmount - platformCommission;

    return {
      baseAmount: baseAmount.toFixed(2),
      gst: gst.toFixed(2),
      platformCommission: platformCommission.toFixed(2),
      vendorEarnings: vendorEarnings.toFixed(2),
      totalWithGst: (baseAmount + gst).toFixed(2),
      commissionPercentage: 10,
    };
  };

  const formatAddress = (orderData) => {
    if (!orderData) return "N/A";
    const parts = [
      orderData.homeNo,
      orderData.town,
      orderData.city,
      orderData.state,
      orderData.pincode,
    ].filter(Boolean);
    return parts.join(", ") || "N/A";
  };

  if (loading) {
    return (
      <div className="vendor-orders-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading assigned orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="vendor-orders-container">
        <div className="error-state">
          <i className="bi bi-exclamation-triangle"></i>
          <h3>Error Loading Orders</h3>
          <p>{error}</p>
          <button
            className="btn-retry"
            onClick={() => fetchVendorOrders(vendorId)}
          >
            <i className="bi bi-arrow-clockwise"></i> Retry
          </button>
        </div>
      </div>
    );
  }

  if (orders.length === 0 && !selectedOrder) {
    return (
      <div className="vendor-orders-container">
        <div className="empty-state">
          <i className="bi bi-inbox"></i>
          <h3>No Assigned Orders</h3>
          <p>You don't have any assigned orders at the moment.</p>
        </div>
      </div>
    );
  }

  // Show detailed view if an order is selected
  if (selectedOrder) {
    if (detailLoading) {
      return (
        <div className="vendor-orders-container">
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading order details...</p>
          </div>
        </div>
      );
    }

    const payment = calculateEarnings(selectedOrder.orderPrice);

    return (
      <div className="vendor-orders-container">
        {/* Header */}
        <div className="detail-header">
          <button className="btn-back" onClick={() => setSelectedOrder(null)}>
            <i className="bi bi-arrow-left"></i>
            <span>Back to Orders</span>
          </button>
          <div className="header-info">
            <h2>Order #{selectedOrder.orderId}</h2>
            <span className={`status-badge status-${selectedOrder.status?.toLowerCase()}`}>
              {selectedOrder.status}
            </span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="detail-grid">
          {/* Left Column - Order Information */}
          <div className="detail-card">
            <div className="card-header">
              <i className="bi bi-info-circle"></i>
              <h3>Order Information</h3>
            </div>
            <div className="card-content">
              <div className="info-group">
                <label>Service</label>
                <div className="info-value">
                  <i className="bi bi-wrench"></i>
                  <div>
                    <strong>{selectedOrder.serviceName || "N/A"}</strong>
                    <p className="text-muted">{selectedOrder.serviceShortDesc || ""}</p>
                  </div>
                </div>
              </div>

              <div className="info-group">
                <label>Order Date & Time</label>
                <div className="info-value">
                  <i className="bi bi-calendar-event"></i>
                  <span>
                    {selectedOrder.orderDateTime
                      ? dayjs(selectedOrder.orderDateTime).format("MMM DD, YYYY - hh:mm A")
                      : "N/A"}
                  </span>
                </div>
              </div>

              <div className="info-group">
                <label>Time Slot</label>
                <div className="info-value">
                  <i className="bi bi-clock"></i>
                  <span>
                    {selectedOrder.timeSlot
                      ? dayjs(selectedOrder.timeSlot).format("hh:mm A")
                      : "N/A"}
                  </span>
                </div>
              </div>

              <div className="info-group">
                <label>Priority</label>
                <div className="info-value">
                  <i className="bi bi-flag"></i>
                  <span className={`priority-badge priority-${selectedOrder.priority?.toLowerCase()}`}>
                    {selectedOrder.priority || "NORMAL"}
                  </span>
                </div>
              </div>

              <div className="info-group">
                <label>Service Address</label>
                <div className="info-value">
                  <i className="bi bi-geo-alt"></i>
                  <span>{formatAddress(selectedOrder)}</span>
                </div>
              </div>

              {selectedOrder.rating && (
                <div className="info-group">
                  <label>Rating & Review</label>
                  <div className="info-value">
                    <i className="bi bi-star-fill" style={{ color: "#fbbf24" }}></i>
                    <div>
                      <strong>{selectedOrder.rating}/5</strong>
                      {selectedOrder.reviewDescription && (
                        <p className="text-muted">{selectedOrder.reviewDescription}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Payment & Actions */}
          <div className="detail-column">
            {/* Payment Details */}
            <div className="detail-card">
              <div className="card-header">
                <i className="bi bi-currency-rupee"></i>
                <h3>Payment Details</h3>
              </div>
              <div className="card-content">
                <div className="payment-row">
                  <span>Service Price</span>
                  <strong>₹{selectedOrder.servicePrice?.toFixed(2) || "0.00"}</strong>
                </div>
                <div className="payment-row">
                  <span>Order Price</span>
                  <strong>₹{selectedOrder.orderPrice?.toFixed(2) || "0.00"}</strong>
                </div>
                <div className="payment-row">
                  <span>GST (18%)</span>
                  <span>₹{payment.gst}</span>
                </div>
                <div className="payment-row">
                  <span>Platform Fee (10%)</span>
                  <span className="text-danger">-₹{payment.platformCommission}</span>
                </div>
                <div className="payment-row total-row">
                  <span>Your Earnings</span>
                  <strong className="text-success">₹{payment.vendorEarnings}</strong>
                </div>
                <div className="payment-status">
                  <span>Payment Status:</span>
                  <span className={`badge badge-${selectedOrder.paymentStatus?.toLowerCase()}`}>
                    {selectedOrder.paymentStatus || "PENDING"}
                  </span>
                </div>
                {selectedOrder.paymentId && (
                  <div className="payment-id">
                    <small>Payment ID: {selectedOrder.paymentId}</small>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="detail-card">
              <div className="card-header">
                <i className="bi bi-lightning"></i>
                <h3>Actions</h3>
              </div>
              <div className="card-content">
                {selectedOrder.status === "ASSIGNED" && (
                  <button
                    className="btn-action btn-start"
                    onClick={() => setShowStartConfirm(true)}
                  >
                    <i className="bi bi-play-circle"></i>
                    Start Service
                  </button>
                )}

                {selectedOrder.status === "INPROGRESS" && (
                  <button
                    className="btn-action btn-complete"
                    onClick={() => setShowCompleteConfirm(true)}
                  >
                    <i className="bi bi-check-circle"></i>
                    Mark as Completed
                  </button>
                )}

                {selectedOrder.status === "COMPLETED" && (
                  <div className="completed-badge">
                    <i className="bi bi-check-circle-fill"></i>
                    <span>Service Completed</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Confirmation Modals */}
        {showStartConfirm && (
          <div className="modal-overlay" onClick={() => setShowStartConfirm(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <i className="bi bi-play-circle"></i>
                <h3>Start Service</h3>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to start this service?</p>
                <p className="text-muted">
                  This will change the order status to "In Progress"
                </p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn-secondary"
                  onClick={() => setShowStartConfirm(false)}
                >
                  Cancel
                </button>
                <button className="btn-primary" onClick={handleStartService}>
                  <i className="bi bi-play-circle"></i>
                  Start Service
                </button>
              </div>
            </div>
          </div>
        )}

        {showCompleteConfirm && (
          <div className="modal-overlay" onClick={() => setShowCompleteConfirm(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <i className="bi bi-check-circle"></i>
                <h3>Complete Service</h3>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to mark this service as completed?</p>
                <p className="text-muted">
                  This action cannot be undone. Make sure all work is finished.
                </p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn-secondary"
                  onClick={() => setShowCompleteConfirm(false)}
                >
                  Cancel
                </button>
                <button className="btn-primary" onClick={handleCompleteService}>
                  <i className="bi bi-check-circle"></i>
                  Mark as Completed
                </button>
              </div>
            </div>
          </div>
        )}

        <style jsx>{`
          .vendor-orders-container {
            padding: 2rem;
            max-width: 1400px;
            margin: 0 auto;
            min-height: 100vh;
            background: #f8fafc;
          }

          /* Detail View Styles */
          .detail-header {
            margin-bottom: 2rem;
          }

          .btn-back {
            background: white;
            border: 2px solid #e2e8f0;
            padding: 0.75rem 1.5rem;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 1rem;
            transition: all 0.2s;
            color: #1e293b;
          }

          .btn-back:hover {
            background: #f8fafc;
            border-color: #2563eb;
            color: #2563eb;
          }

          .header-info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 1rem;
          }

          .header-info h2 {
            font-size: 2rem;
            font-weight: 700;
            color: #1e293b;
            margin: 0;
          }

          .status-badge {
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.875rem;
            font-weight: 700;
            text-transform: uppercase;
          }

          .status-assigned {
            background: #dbeafe;
            color: #1e40af;
          }

          .status-inprogress {
            background: #fef3c7;
            color: #92400e;
          }

          .status-completed {
            background: #d1fae5;
            color: #065f46;
          }

          .detail-grid {
            display: grid;
            grid-template-columns: 1fr 400px;
            gap: 2rem;
          }

          .detail-column {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
          }

          .detail-card {
            background: white;
            border-radius: 12px;
            border: 2px solid #e2e8f0;
            overflow: hidden;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          }

          .card-header {
            background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
            padding: 1.25rem;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            color: white;
          }

          .card-header i {
            font-size: 1.5rem;
          }

          .card-header h3 {
            margin: 0;
            font-size: 1.125rem;
            font-weight: 600;
          }

          .card-content {
            padding: 1.5rem;
          }

          .info-group {
            margin-bottom: 1.5rem;
          }

          .info-group:last-child {
            margin-bottom: 0;
          }

          .info-group label {
            display: block;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
            color: #64748b;
            letter-spacing: 0.05em;
            margin-bottom: 0.5rem;
          }

          .info-value {
            display: flex;
            align-items: flex-start;
            gap: 0.75rem;
          }

          .info-value i {
            font-size: 1.25rem;
            color: #2563eb;
            margin-top: 0.125rem;
          }

          .info-value strong {
            color: #1e293b;
            font-weight: 600;
          }

          .info-value span {
            color: #475569;
            line-height: 1.6;
          }

          .text-muted {
            font-size: 0.875rem;
            color: #64748b;
            margin-top: 0.25rem;
          }

          .priority-badge {
            padding: 0.25rem 0.75rem;
            border-radius: 12px;
            font-size: 0.75rem;
            font-weight: 700;
            text-transform: uppercase;
          }

          .priority-high {
            background: #fee2e2;
            color: #991b1b;
          }

          .priority-normal {
            background: #e0e7ff;
            color: #3730a3;
          }

          .priority-low {
            background: #e5e7eb;
            color: #374151;
          }

          .payment-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.75rem 0;
            border-bottom: 1px solid #f1f5f9;
          }

          .payment-row:last-of-type {
            border-bottom: none;
          }

          .total-row {
            border-top: 2px solid #e2e8f0;
            padding-top: 1rem;
            margin-top: 0.5rem;
            font-size: 1.125rem;
          }

          .text-danger {
            color: #dc2626;
          }

          .text-success {
            color: #16a34a;
          }

          .payment-status {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 1rem;
            padding-top: 1rem;
            border-top: 1px solid #f1f5f9;
          }

          .badge {
            padding: 0.25rem 0.75rem;
            border-radius: 12px;
            font-size: 0.75rem;
            font-weight: 700;
            text-transform: uppercase;
          }

          .badge-pending {
            background: #fef3c7;
            color: #92400e;
          }

          .badge-paid {
            background: #d1fae5;
            color: #065f46;
          }

          .badge-failed {
            background: #fee2e2;
            color: #991b1b;
          }

          .payment-id {
            margin-top: 0.75rem;
            padding-top: 0.75rem;
            border-top: 1px solid #f1f5f9;
            color: #64748b;
          }

          .btn-action {
            width: 100%;
            padding: 1rem;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            font-size: 1rem;
            transition: all 0.2s;
          }

          .btn-start {
            background: #2563eb;
            color: white;
          }

          .btn-start:hover {
            background: #1d4ed8;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
          }

          .btn-complete {
            background: #16a34a;
            color: white;
          }

          .btn-complete:hover {
            background: #15803d;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(22, 163, 74, 0.3);
          }

          .completed-badge {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            padding: 1rem;
            background: #d1fae5;
            color: #065f46;
            border-radius: 8px;
            font-weight: 600;
          }

          .completed-badge i {
            font-size: 1.5rem;
          }

          /* Modal Styles */
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            padding: 1rem;
          }

          .modal-content {
            background: white;
            border-radius: 12px;
            max-width: 500px;
            width: 100%;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          }

          .modal-header {
            padding: 1.5rem;
            border-bottom: 2px solid #e2e8f0;
            display: flex;
            align-items: center;
            gap: 0.75rem;
          }

          .modal-header i {
            font-size: 1.5rem;
            color: #2563eb;
          }

          .modal-header h3 {
            margin: 0;
            font-size: 1.25rem;
            font-weight: 700;
            color: #1e293b;
          }

          .modal-body {
            padding: 1.5rem;
          }

          .modal-body p {
            margin: 0 0 0.5rem;
            color: #1e293b;
          }

          .modal-footer {
            padding: 1.5rem;
            border-top: 2px solid #e2e8f0;
            display: flex;
            gap: 1rem;
            justify-content: flex-end;
          }

          .btn-secondary {
            padding: 0.75rem 1.5rem;
            background: white;
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
          }

          .btn-secondary:hover {
            background: #f8fafc;
            border-color: #cbd5e1;
          }

          .btn-primary {
            padding: 0.75rem 1.5rem;
            background: #2563eb;
            color: white;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            transition: all 0.2s;
          }

          .btn-primary:hover {
            background: #1d4ed8;
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
          }

          @media (max-width: 1024px) {
            .detail-grid {
              grid-template-columns: 1fr;
            }
          }

          @media (max-width: 768px) {
            .vendor-orders-container {
              padding: 1rem;
            }

            .header-info h2 {
              font-size: 1.5rem;
            }
          }
        `}</style>
      </div>
    );
  }

  // List view - Show all orders
  return (
    <div className="vendor-orders-container">
      <div className="list-header">
        <h2>Assigned Orders</h2>
        <span className="count-badge">{orders.length} Orders</span>
      </div>

      <div className="orders-grid">
        {orders.map((order) => (
          <div key={order.orderId} className="order-card">
            <div className="card-header-section">
              <div className="order-id-section">
                <span className="label">Order ID</span>
                <h3>#{order.orderId}</h3>
              </div>
              <span className={`status-badge status-${order.status?.toLowerCase()}`}>
                {order.status}
              </span>
            </div>

            <div className="card-body-section">
              <div className="info-row">
                <div className="info-item">
                  <i className="bi bi-person"></i>
                  <div>
                    <span className="label">Customer</span>
                    <span className="value">{order.name || "N/A"}</span>
                  </div>
                </div>

                <div className="info-item">
                  <i className="bi bi-calendar-event"></i>
                  <div>
                    <span className="label">Order Date</span>
                    <span className="value">
                      {order.orderDate
                        ? dayjs(order.orderDate).format("MMM DD, YYYY")
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="total-section">
                <span className="total-label">Total Amount</span>
                <span className="total-value">₹{order.total?.toFixed(2) || "0.00"}</span>
              </div>
            </div>

            <div className="card-footer-section">
              <button
                className="btn-view"
                onClick={() => handleViewDetails(order)}
              >
                <i className="bi bi-eye"></i>
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .vendor-orders-container {
          padding: 2rem;
          max-width: 1400px;
          margin: 0 auto;
          min-height: 100vh;
          background: #f8fafc;
        }

        .list-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 3px solid #2563eb;
        }

        .list-header h2 {
          font-size: 1.75rem;
          font-weight: 700;
          color: #1e293b;
          margin: 0;
        }

        .count-badge {
          background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-weight: 600;
          font-size: 0.875rem;
          box-shadow: 0 2px 8px rgba(37, 99, 235, 0.3);
        }

        .orders-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 1.5rem;
        }

        .order-card {
          background: #ffffff;
          border-radius: 12px;
          overflow: hidden;
          border: 2px solid #e2e8f0;
          transition: all 0.3s ease;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .order-card:hover {
          border-color: #2563eb;
          box-shadow: 0 8px 24px rgba(37, 99, 235, 0.15);
          transform: translateY(-4px);
        }

        .card-header-section {
          background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
          padding: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          color: white;
        }

        .order-id-section .label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          opacity: 0.9;
          display: block;
          margin-bottom: 0.25rem;
        }

        .order-id-section h3 {
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0;
        }

        .status-badge {
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
        }

        .status-assigned {
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .status-inprogress {
          background: rgba(251, 191, 36, 0.2);
          border: 1px solid rgba(251, 191, 36, 0.3);
        }

        .card-body-section {
          padding: 1.5rem;
          background: #ffffff;
        }

        .info-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .info-item {
          display: flex;
          gap: 0.75rem;
        }

        .info-item i {
          font-size: 1.25rem;
          color: #2563eb;
          margin-top: 0.25rem;
        }

        .info-item .label {
          font-size: 0.75rem;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          display: block;
          margin-bottom: 0.25rem;
        }

        .info-item .value {
          font-size: 0.875rem;
          font-weight: 600;
          color: #1e293b;
        }

        .total-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: #f0f9ff;
          border-radius: 8px;
          border: 2px solid #bfdbfe;
        }

        .total-label {
          font-size: 0.875rem;
          color: #1e3a8a;
          font-weight: 600;
        }

        .total-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1e3a8a;
        }

        .card-footer-section {
          padding: 1.5rem;
          background: #f8fafc;
          border-top: 2px solid #e2e8f0;
        }

        .btn-view {
          width: 100%;
          padding: 0.75rem;
          background: #2563eb;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: all 0.2s;
        }

        .btn-view:hover {
          background: #1d4ed8;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        }

        /* Loading & Error States */
        .loading-state,
        .error-state,
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 60vh;
          text-align: center;
          gap: 1.5rem;
        }

        .spinner {
          width: 50px;
          height: 50px;
          border: 4px solid #e2e8f0;
          border-top-color: #2563eb;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .loading-state p,
        .error-state p,
        .empty-state p {
          color: #64748b;
          font-size: 1rem;
        }

        .error-state i {
          font-size: 4rem;
          color: #ef4444;
        }

        .error-state h3 {
          font-size: 1.5rem;
          color: #1e293b;
          margin: 0;
        }

        .btn-retry {
          padding: 0.75rem 1.5rem;
          background: #2563eb;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.2s;
        }

        .btn-retry:hover {
          background: #1d4ed8;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        }

        .empty-state i {
          font-size: 5rem;
          color: #cbd5e1;
        }

        .empty-state h3 {
          font-size: 1.75rem;
          color: #1e293b;
          margin: 0;
        }

        @media (max-width: 768px) {
          .vendor-orders-container {
            padding: 1rem;
          }

          .orders-grid {
            grid-template-columns: 1fr;
          }

          .list-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .info-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default VendorAssignedOrders;
