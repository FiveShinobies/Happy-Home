import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

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

    // ⭐ HARDCODED VENDOR ID - Change this to get from localStorage later
    const HARDCODED_VENDOR_ID = 1;

    if (propVendorId) {
      console.log('✅ Using vendorId from props:', propVendorId);
      finalVendorId = propVendorId;
    } else if (HARDCODED_VENDOR_ID) {
      console.log('⭐ Using HARDCODED vendorId:', HARDCODED_VENDOR_ID);
      finalVendorId = HARDCODED_VENDOR_ID;
    }

    setVendorId(finalVendorId);

    if (!finalVendorId) {
      setError('Vendor ID not found. Please check console for debug info.');
      setLoading(false);
      return;
    }

    fetchVendorOrders(finalVendorId);
  }, [propVendorId]);

  const fetchVendorOrders = async (id) => {
    try {
      setLoading(true);
      setError(null);

      console.log('📡 Fetching orders from:', `http://localhost:8080/admin/vendors/${id}/orders`);

      const response = await axios.get(`http://localhost:8080/admin/vendors/${id}/orders`);
      
      console.log('📦 API Response:', response.data);

      const assignedOrders = response.data.filter(order => order.status === 'ASSIGNED');
      console.log('✅ Assigned orders:', assignedOrders);
      
      setOrders(assignedOrders);
      setLoading(false);
    } catch (error) {
      console.error('❌ Error fetching vendor orders:', error);
      setError(error.response?.data?.message || 'Failed to load orders');
      toast.error('Failed to load orders');
      setLoading(false);
    }
  };

  const fetchOrderDetails = async (orderId) => {
    try {
      setDetailLoading(true);
      console.log('📡 Fetching order details for ID:', orderId);
      
      const response = await axios.get(`http://localhost:8080/vendor/details/${orderId}`);
      
      console.log('📦 Order Details Response:', response.data);
      setSelectedOrder(response.data);
      setDetailLoading(false);
    } catch (error) {
      console.error('❌ Error fetching order details:', error);
      
      // Fallback to basic order data
      const basicOrder = orders.find(o => o.orderId === orderId);
      if (basicOrder) {
        console.log('ℹ️ Using basic order data from list');
        toast.warning('Could not load full details. Showing basic information.');
        setSelectedOrder({
          orderId: basicOrder.orderId,
          orderDate: basicOrder.orderDate,
          total: basicOrder.total,
          status: basicOrder.status,
          price: basicOrder.total,
          timeSlot: basicOrder.orderDate,
          priority: 'NORMAL',
          service: {
            serviceName: 'Service',
            category: 'General',
            shortDesc: 'Service details will be available soon'
          },
          address: {
            homeNo: 'N/A',
            town: 'N/A',
            city: 'N/A',
            state: 'N/A',
            pincode: 'N/A'
          }
        });
      } else {
        toast.error('Failed to load order details');
      }
      setDetailLoading(false);
    }
  };

  const handleViewDetails = (order) => {
    console.log('👆 View Details clicked for order:', order.orderId);
    fetchOrderDetails(order.orderId);
  };

  const handleStartService = async () => {
    try {
      const oid = selectedOrder.orderId;
      console.log('🚀 Starting service for order:', oid);
      
      // Updated API endpoint - PATCH /order/in-progress/{oid}
      await axios.patch(`http://localhost:8080/order/in-progress/${oid}`);
      
      setShowStartConfirm(false);
      toast.success('Service started successfully!');
      setSelectedOrder(null);
      fetchVendorOrders(vendorId);
    } catch (error) {
      console.error('Error starting service:', error);
      toast.error(error.response?.data?.message || 'Failed to start service');
    }
  };

  const handleCompleteService = async () => {
    try {
      const oid = selectedOrder.orderId;
      console.log('✅ Completing service for order:', oid);
      
      // Updated API endpoint - PATCH /order/completed/{oid}
      await axios.patch(`http://localhost:8080/order/completed/${oid}`);
      
      setShowCompleteConfirm(false);
      toast.success('Service completed successfully!');
      setSelectedOrder(null);
      fetchVendorOrders(vendorId);
    } catch (error) {
      console.error('Error completing service:', error);
      toast.error(error.response?.data?.message || 'Failed to complete service');
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
      commissionPercentage: 10
    };
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
          <button className="btn-retry" onClick={() => fetchVendorOrders(vendorId)}>
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

    const payment = calculateEarnings(selectedOrder.price || selectedOrder.total);

    return (
      <div className="vendor-orders-container">
        {/* Header */}
        <div className="detail-header">
          <button className="btn-back" onClick={() => setSelectedOrder(null)}>
            <i className="bi bi-arrow-left"></i> Back to Orders
          </button>
          <div className="header-content">
            <div>
              <h1>Order Details</h1>
              <p className="order-id-text">Order ID: #{selectedOrder.orderId}</p>
            </div>
            <span className="status-badge-large">ASSIGNED</span>
          </div>
        </div>

        {/* Content */}
        <div className="detail-content">
          <div className="content-layout">
            {/* Left Column */}
            <div className="main-content">
              {/* Earnings Highlight */}
              <div className="earnings-card">
                <div className="earnings-icon">
                  <i className="bi bi-currency-rupee"></i>
                </div>
                <div className="earnings-info">
                  <h3>Your Earnings</h3>
                  <div className="earnings-amount">₹{payment.vendorEarnings}</div>
                  <p>After {payment.commissionPercentage}% platform fee</p>
                </div>
                <div className="paid-badge">
                  <i className="bi bi-check-circle-fill"></i> Paid
                </div>
              </div>

              {/* Service Details */}
              <div className="info-card">
                <div className="card-header">
                  <i className="bi bi-briefcase"></i>
                  <h3>Service Details</h3>
                </div>
                <div className="card-body">
                  <h4 className="service-title">{selectedOrder.service?.serviceName || 'Service'}</h4>
                  <span className="service-badge">{selectedOrder.service?.category || 'General'}</span>
                  <p className="service-desc">
                    {selectedOrder.service?.longDesc || selectedOrder.service?.shortDesc || 'Service will be provided as per booking'}
                  </p>
                  
                  <div className="detail-grid">
                    <div className="detail-item">
                      <i className="bi bi-calendar-check"></i>
                      <div>
                        <label>Service Date</label>
                        <p>{dayjs(selectedOrder.timeSlot || selectedOrder.orderDate).format('MMMM DD, YYYY')}</p>
                      </div>
                    </div>
                    <div className="detail-item">
                      <i className="bi bi-clock"></i>
                      <div>
                        <label>Time</label>
                        <p>{dayjs(selectedOrder.timeSlot || selectedOrder.orderDate).format('hh:mm A')}</p>
                      </div>
                    </div>
                    <div className="detail-item">
                      <i className="bi bi-tag"></i>
                      <div>
                        <label>Priority</label>
                        <p>{selectedOrder.priority || 'NORMAL'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="info-section">
                    <h5>Service Information:</h5>
                    <ul>
                      <li>
                        <i className="bi bi-check-circle"></i>
                        Service will be provided as per booking details
                      </li>
                      <li>
                        <i className="bi bi-check-circle"></i>
                        Price: ₹{selectedOrder.price || selectedOrder.total}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="info-card">
                <div className="card-header">
                  <i className="bi bi-geo-alt"></i>
                  <h3>Service Location</h3>
                </div>
                <div className="card-body">
                  <div className="location-type">
                    <i className="bi bi-building"></i>
                    Service Address
                  </div>
                  <div className="address-details">
                    {selectedOrder.address?.homeNo && selectedOrder.address.homeNo !== 'N/A' && (
                      <p><strong>{selectedOrder.address.homeNo}</strong></p>
                    )}
                    {selectedOrder.address?.town && selectedOrder.address.town !== 'N/A' && (
                      <p>{selectedOrder.address.town}</p>
                    )}
                    {selectedOrder.address?.city && selectedOrder.address.city !== 'N/A' && (
                      <p>
                        {selectedOrder.address.city}
                        {selectedOrder.address.state && selectedOrder.address.state !== 'N/A' && `, ${selectedOrder.address.state}`}
                        {selectedOrder.address.pincode && selectedOrder.address.pincode !== 'N/A' && ` - ${selectedOrder.address.pincode}`}
                      </p>
                    )}
                    {(!selectedOrder.address || selectedOrder.address.city === 'N/A') && (
                      <p className="text-muted">Address details will be provided soon</p>
                    )}
                  </div>
                  <button className="btn-map">
                    <i className="bi bi-map"></i>
                    Open in Maps
                  </button>
                </div>
              </div>

              {/* Payment Breakdown */}
              <div className="info-card">
                <div className="card-header">
                  <i className="bi bi-receipt"></i>
                  <h3>Payment Breakdown</h3>
                </div>
                <div className="card-body">
                  <div className="payment-list">
                    <div className="payment-row">
                      <span>Base Price</span>
                      <span>₹{payment.baseAmount}</span>
                    </div>
                    <div className="payment-row">
                      <span>GST (18%)</span>
                      <span>₹{payment.gst}</span>
                    </div>
                    <div className="payment-row total-row">
                      <span><strong>Total Amount</strong></span>
                      <span><strong>₹{payment.totalWithGst}</strong></span>
                    </div>
                    <div className="divider"></div>
                    <div className="payment-row commission-row">
                      <span>Platform Commission ({payment.commissionPercentage}%)</span>
                      <span>-₹{payment.platformCommission}</span>
                    </div>
                    <div className="payment-row final-row">
                      <span><strong>Your Earnings</strong></span>
                      <span className="final-amount"><strong>₹{payment.vendorEarnings}</strong></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Actions */}
            <div className="sidebar-content">
              <div className="action-card sticky">
                <h4>Order Actions</h4>
                
                <button className="action-btn btn-start" onClick={() => setShowStartConfirm(true)}>
                  <i className="bi bi-play-circle-fill"></i>
                  Start Service
                </button>

                <button className="action-btn btn-complete" onClick={() => setShowCompleteConfirm(true)}>
                  <i className="bi bi-check-circle-fill"></i>
                  Mark as Completed
                </button>

                <button className="action-btn btn-contact">
                  <i className="bi bi-chat-dots-fill"></i>
                  Contact Customer
                </button>

                <button className="action-btn btn-support">
                  <i className="bi bi-headset"></i>
                  Contact Support
                </button>
              </div>

              {/* Vendor Info */}
              {selectedOrder.myVendor && (
                <div className="vendor-info-card">
                  <h4>Vendor Info</h4>
                  <div className="vendor-detail">
                    <i className="bi bi-person-fill"></i>
                    <div>
                      <label>Vendor</label>
                      <p>
                        {selectedOrder.myVendor.myUser?.firstName || ''} {selectedOrder.myVendor.myUser?.lastName || ''}
                      </p>
                    </div>
                  </div>
                  <div className="vendor-detail">
                    <i className="bi bi-telephone-fill"></i>
                    <div>
                      <label>Phone</label>
                      <p>{selectedOrder.myVendor.myUser?.phone || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="vendor-detail">
                    <i className="bi bi-briefcase-fill"></i>
                    <div>
                      <label>Experience</label>
                      <p>{selectedOrder.myVendor.experience || 0} years</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Start Confirmation Modal */}
        {showStartConfirm && (
          <div className="modal-backdrop" onClick={() => setShowStartConfirm(false)}>
            <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
              <div className="modal-icon primary">
                <i className="bi bi-play-circle-fill"></i>
              </div>
              <h3>Start Service?</h3>
              <p>Are you sure you want to mark this service as started? Make sure you've reached the location.</p>
              <div className="modal-actions">
                <button className="modal-btn btn-cancel" onClick={() => setShowStartConfirm(false)}>
                  Cancel
                </button>
                <button className="modal-btn btn-primary" onClick={handleStartService}>
                  Yes, Start Service
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Complete Confirmation Modal */}
        {showCompleteConfirm && (
          <div className="modal-backdrop" onClick={() => setShowCompleteConfirm(false)}>
            <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
              <div className="modal-icon success">
                <i className="bi bi-check-circle-fill"></i>
              </div>
              <h3>Complete Service?</h3>
              <p>Are you sure you want to mark this service as completed? The customer will be notified.</p>
              <div className="modal-actions">
                <button className="modal-btn btn-cancel" onClick={() => setShowCompleteConfirm(false)}>
                  Cancel
                </button>
                <button className="modal-btn btn-success" onClick={handleCompleteService}>
                  Yes, Complete Service
                </button>
              </div>
            </div>
          </div>
        )}

        <style jsx>{`
          .vendor-orders-container {
            min-height: 100vh;
            background: #ffffff;
          }

          .detail-header {
            background: #000000;
            padding: 2rem;
            color: white;
            border-bottom: 3px solid #333333;
          }

          .btn-back {
            background: #333333;
            color: white;
            border: 1px solid #444444;
            padding: 0.625rem 1.25rem;
            border-radius: 8px;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            font-weight: 500;
            margin-bottom: 1.5rem;
            transition: all 0.2s;
          }

          .btn-back:hover {
            background: #444444;
            border-color: #555555;
          }

          .header-content {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
          }

          .header-content h1 {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
          }

          .order-id-text {
            opacity: 0.8;
            font-size: 1rem;
          }

          .status-badge-large {
            background: #333333;
            padding: 0.75rem 1.5rem;
            border-radius: 25px;
            font-size: 0.875rem;
            font-weight: 700;
            border: 1px solid #444444;
          }

          .detail-content {
            padding: 2rem;
            max-width: 1400px;
            margin: 0 auto;
            background: #ffffff;
          }

          .content-layout {
            display: grid;
            grid-template-columns: 1fr 400px;
            gap: 2rem;
          }

          /* Earnings Card */
          .earnings-card {
            background: #000000;
            color: white;
            padding: 2rem;
            border-radius: 16px;
            display: flex;
            align-items: center;
            gap: 1.5rem;
            margin-bottom: 1.5rem;
            border: 2px solid #333333;
          }

          .earnings-icon {
            background: #333333;
            width: 70px;
            height: 70px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            flex-shrink: 0;
          }

          .earnings-info {
            flex: 1;
          }

          .earnings-info h3 {
            font-size: 0.875rem;
            opacity: 0.8;
            margin-bottom: 0.5rem;
            font-weight: 500;
          }

          .earnings-amount {
            font-size: 2.5rem;
            font-weight: 700;
            line-height: 1;
            margin-bottom: 0.5rem;
          }

          .earnings-info p {
            font-size: 0.875rem;
            opacity: 0.7;
          }

          .paid-badge {
            background: #333333;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.875rem;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            flex-shrink: 0;
          }

          /* Info Cards */
          .info-card {
            background: #ffffff;
            border-radius: 12px;
            margin-bottom: 1.5rem;
            border: 2px solid #e5e7eb;
            overflow: hidden;
          }

          .card-header {
            background: #f9fafb;
            padding: 1.25rem 1.5rem;
            border-bottom: 2px solid #e5e7eb;
            display: flex;
            align-items: center;
            gap: 0.75rem;
          }

          .card-header i {
            color: #000000;
            font-size: 1.25rem;
          }

          .card-header h3 {
            font-size: 1.125rem;
            font-weight: 700;
            color: #000000;
            margin: 0;
          }

          .card-body {
            padding: 1.5rem;
          }

          .service-title {
            font-size: 1.25rem;
            font-weight: 700;
            color: #000000;
            margin-bottom: 0.5rem;
          }

          .service-badge {
            display: inline-block;
            background: #f3f4f6;
            color: #000000;
            padding: 0.25rem 0.75rem;
            border-radius: 12px;
            font-size: 0.75rem;
            font-weight: 600;
            margin-bottom: 1rem;
            border: 1px solid #e5e7eb;
          }

          .service-desc {
            color: #6b7280;
            line-height: 1.6;
            margin-bottom: 1.5rem;
          }

          .detail-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
            margin-bottom: 1.5rem;
          }

          .detail-item {
            display: flex;
            gap: 0.75rem;
          }

          .detail-item i {
            color: #000000;
            font-size: 1.25rem;
            margin-top: 0.25rem;
          }

          .detail-item label {
            font-size: 0.75rem;
            color: #6b7280;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            display: block;
            margin-bottom: 0.25rem;
          }

          .detail-item p {
            font-weight: 600;
            color: #000000;
            margin: 0;
          }

          .info-section h5 {
            font-weight: 700;
            color: #000000;
            margin-bottom: 0.75rem;
          }

          .info-section ul {
            list-style: none;
            padding: 0;
            margin: 0;
          }

          .info-section li {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.5rem 0;
            color: #4b5563;
          }

          .info-section li i {
            color: #000000;
            font-size: 1rem;
          }

          .location-type {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: #f3f4f6;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.875rem;
            font-weight: 600;
            color: #000000;
            margin-bottom: 1rem;
            border: 1px solid #e5e7eb;
          }

          .address-details p {
            color: #374151;
            line-height: 1.6;
            margin-bottom: 0.25rem;
          }

          .text-muted {
            color: #9ca3af !important;
            font-style: italic;
          }

          .btn-map {
            width: 100%;
            background: #000000;
            color: white;
            border: 2px solid #333333;
            padding: 0.75rem;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            margin-top: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            transition: all 0.2s;
          }

          .btn-map:hover {
            background: #333333;
            border-color: #444444;
          }

          .payment-list {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
          }

          .payment-row {
            display: flex;
            justify-content: space-between;
            padding: 0.75rem 0;
            color: #374151;
          }

          .payment-row.total-row {
            border-top: 2px solid #e5e7eb;
            padding-top: 1rem;
            margin-top: 0.25rem;
            color: #000000;
          }

          .divider {
            height: 1px;
            background: #e5e7eb;
            margin: 0.5rem 0;
          }

          .payment-row.commission-row {
            color: #6b7280;
          }

          .payment-row.final-row {
            background: #f9fafb;
            padding: 1rem;
            border-radius: 8px;
            margin-top: 0.5rem;
            border: 2px solid #e5e7eb;
          }

          .final-amount {
            color: #000000;
            font-size: 1.25rem;
          }

          /* Action Card */
          .action-card {
            background: #ffffff;
            border-radius: 12px;
            padding: 1.5rem;
            border: 2px solid #e5e7eb;
            margin-bottom: 1.5rem;
          }

          .action-card.sticky {
            position: sticky;
            top: 2rem;
          }

          .action-card h4 {
            font-weight: 700;
            color: #000000;
            margin-bottom: 1.5rem;
          }

          .action-btn {
            width: 100%;
            padding: 0.875rem;
            border: 2px solid;
            border-radius: 8px;
            font-weight: 600;
            font-size: 0.875rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            margin-bottom: 0.75rem;
            transition: all 0.2s;
          }

          .btn-start {
            background: #000000;
            color: white;
            border-color: #333333;
          }

          .btn-start:hover {
            background: #333333;
            border-color: #444444;
          }

          .btn-complete {
            background: #000000;
            color: white;
            border-color: #333333;
          }

          .btn-complete:hover {
            background: #333333;
            border-color: #444444;
          }

          .btn-contact,
          .btn-support {
            background: #f3f4f6;
            color: #000000;
            border-color: #e5e7eb;
          }

          .btn-contact:hover,
          .btn-support:hover {
            background: #e5e7eb;
            border-color: #d1d5db;
          }

          /* Vendor Info */
          .vendor-info-card {
            background: #ffffff;
            border-radius: 12px;
            padding: 1.5rem;
            border: 2px solid #e5e7eb;
          }

          .vendor-info-card h4 {
            font-weight: 700;
            color: #000000;
            margin-bottom: 1.5rem;
          }

          .vendor-detail {
            display: flex;
            gap: 1rem;
            margin-bottom: 1.25rem;
          }

          .vendor-detail i {
            color: #000000;
            font-size: 1.25rem;
            margin-top: 0.25rem;
          }

          .vendor-detail label {
            font-size: 0.75rem;
            color: #6b7280;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            display: block;
            margin-bottom: 0.25rem;
          }

          .vendor-detail p {
            font-weight: 600;
            color: #000000;
            margin: 0;
          }

          /* Modal */
          .modal-backdrop {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.75);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            padding: 1rem;
          }

          .modal-dialog {
            background: white;
            border-radius: 16px;
            padding: 2rem;
            max-width: 450px;
            width: 100%;
            text-align: center;
            border: 2px solid #e5e7eb;
          }

          .modal-icon {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.5rem;
            font-size: 2.5rem;
            border: 3px solid;
          }

          .modal-icon.primary {
            background: #f3f4f6;
            color: #000000;
            border-color: #e5e7eb;
          }

          .modal-icon.success {
            background: #f3f4f6;
            color: #000000;
            border-color: #e5e7eb;
          }

          .modal-dialog h3 {
            font-size: 1.5rem;
            font-weight: 700;
            color: #000000;
            margin-bottom: 0.75rem;
          }

          .modal-dialog p {
            color: #6b7280;
            line-height: 1.6;
            margin-bottom: 2rem;
          }

          .modal-actions {
            display: flex;
            gap: 1rem;
          }

          .modal-btn {
            flex: 1;
            padding: 0.875rem;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            border: 2px solid;
            transition: all 0.2s;
          }

          .btn-cancel {
            background: #f3f4f6;
            color: #000000;
            border-color: #e5e7eb;
          }

          .btn-cancel:hover {
            background: #e5e7eb;
            border-color: #d1d5db;
          }

          .btn-primary {
            background: #000000;
            color: white;
            border-color: #333333;
          }

          .btn-primary:hover {
            background: #333333;
            border-color: #444444;
          }

          .btn-success {
            background: #000000;
            color: white;
            border-color: #333333;
          }

          .btn-success:hover {
            background: #333333;
            border-color: #444444;
          }

          @media (max-width: 1024px) {
            .content-layout {
              grid-template-columns: 1fr;
            }

            .action-card.sticky {
              position: static;
            }

            .detail-grid {
              grid-template-columns: 1fr 1fr;
            }
          }

          @media (max-width: 640px) {
            .detail-header {
              padding: 1.5rem 1rem;
            }

            .detail-content {
              padding: 1rem;
            }

            .earnings-card {
              flex-direction: column;
              text-align: center;
            }

            .detail-grid {
              grid-template-columns: 1fr;
            }

            .header-content {
              flex-direction: column;
              gap: 1rem;
            }
          }
        `}</style>
      </div>
    );
  }

  // Show orders list
  return (
    <div className="vendor-orders-container">
      <div className="list-header">
        <h2>Assigned Orders</h2>
        <span className="count-badge">{orders.length} {orders.length === 1 ? 'Order' : 'Orders'}</span>
      </div>

      <div className="orders-grid">
        {orders.map((order) => (
          <div key={order.orderId} className="order-card">
            <div className="card-header-section">
              <div className="order-id-section">
                <span className="label">Order ID</span>
                <h3>#{order.orderId}</h3>
              </div>
              <span className="status-badge">ASSIGNED</span>
            </div>

            <div className="card-body-section">
              <div className="info-row">
                <div className="info-item">
                  <i className="bi bi-calendar-event"></i>
                  <div>
                    <span className="label">Order Date</span>
                    <span className="value">{dayjs(order.orderDate).format('MMM DD, YYYY')}</span>
                  </div>
                </div>

                <div className="info-item">
                  <i className="bi bi-clock"></i>
                  <div>
                    <span className="label">Time</span>
                    <span className="value">{dayjs(order.orderDate).format('hh:mm A')}</span>
                  </div>
                </div>
              </div>

              <div className="total-section">
                <span className="total-label">Total Amount</span>
                <span className="total-value">₹{order.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="card-footer-section">
              <button 
                className="btn-view"
                onClick={() => handleViewDetails(order)}
              >
                <i className="bi bi-eye-fill"></i>
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
          background: #ffffff;
        }

        .list-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid #e5e7eb;
        }

        .list-header h2 {
          font-size: 1.75rem;
          font-weight: 700;
          color: #000000;
          margin: 0;
        }

        .count-badge {
          background: #000000;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-weight: 600;
          font-size: 0.875rem;
          border: 2px solid #333333;
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
          border: 2px solid #e5e7eb;
          transition: all 0.3s ease;
        }

        .order-card:hover {
          border-color: #000000;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transform: translateY(-4px);
        }

        .card-header-section {
          background: #000000;
          padding: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          color: white;
          border-bottom: 3px solid #333333;
        }

        .order-id-section .label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          opacity: 0.8;
          display: block;
          margin-bottom: 0.25rem;
        }

        .order-id-section h3 {
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0;
        }

        .status-badge {
          background: #333333;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          border: 1px solid #444444;
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
          color: #000000;
          margin-top: 0.25rem;
        }

        .info-item .label {
          font-size: 0.75rem;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          display: block;
          margin-bottom: 0.25rem;
        }

        .info-item .value {
          font-size: 0.875rem;
          font-weight: 600;
          color: #000000;
        }

        .total-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: #f9fafb;
          border-radius: 8px;
          border: 2px solid #e5e7eb;
        }

        .total-label {
          font-size: 0.875rem;
          color: #6b7280;
          font-weight: 500;
        }

        .total-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: #000000;
        }

        .card-footer-section {
          padding: 1.5rem;
          background: #f9fafb;
          border-top: 2px solid #e5e7eb;
        }

        .btn-view {
          width: 100%;
          padding: 0.75rem;
          background: #000000;
          color: white;
          border: 2px solid #333333;
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
          background: #333333;
          border-color: #444444;
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
          border: 4px solid #e5e7eb;
          border-top-color: #000000;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .loading-state p,
        .error-state p,
        .empty-state p {
          color: #6b7280;
          font-size: 1rem;
        }

        .error-state i {
          font-size: 4rem;
          color: #000000;
        }

        .error-state h3 {
          font-size: 1.5rem;
          color: #000000;
          margin: 0;
        }

        .btn-retry {
          padding: 0.75rem 1.5rem;
          background: #000000;
          color: white;
          border: 2px solid #333333;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .btn-retry:hover {
          background: #333333;
          border-color: #444444;
        }

        .empty-state i {
          font-size: 5rem;
          color: #d1d5db;
        }

        .empty-state h3 {
          font-size: 1.75rem;
          color: #000000;
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