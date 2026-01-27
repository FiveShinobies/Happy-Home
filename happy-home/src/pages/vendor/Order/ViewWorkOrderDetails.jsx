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

  // Debug modal states
  useEffect(() => {
    console.log('Modal States:', { showStartConfirm, showCompleteConfirm });
  }, [showStartConfirm, showCompleteConfirm]);

  useEffect(() => {
    let finalVendorId = null;

    // ⭐ HARDCODED VENDOR ID - Change this to get from localStorage later
    const HARDCODED_VENDOR_ID = JSON.parse(sessionStorage.getItem('user')).userId;

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
      
      // Map the API response to match our component's expected structure
      const mappedOrder = {
        orderId: orderId,
        price: response.data.price,
        timeSlot: response.data.timeSlot,
        priority: response.data.priority || 'NORMAL',
        service: response.data.service,
        address: response.data.address,
        myVendor: response.data.myVendor,
        status: 'ASSIGNED'
      };
      
      console.log('✅ Mapped Order Data:', mappedOrder);
      setSelectedOrder(mappedOrder);
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
      console.log('📡 API URL:', `http://localhost:8080/order/in-progress/${oid}`);
      
      // PATCH /order/in-progress/{oid}
      const response = await axios.patch(`http://localhost:8080/order/in-progress/${oid}`);
      
      console.log('✅ Service started successfully:', response.data);
      setShowStartConfirm(false);
      toast.success('Service started successfully!');
      setSelectedOrder(null);
      fetchVendorOrders(vendorId);
    } catch (error) {
      console.error('❌ Error starting service:', error);
      console.error('Error details:', error.response?.data);
      console.error('Error status:', error.response?.status);
      toast.error(error.response?.data?.message || 'Failed to start service');
    }
  };

  const handleCompleteService = async () => {
    try {
      const oid = selectedOrder.orderId;
      console.log('✅ Completing service for order:', oid);
      console.log('📡 API URL:', `http://localhost:8080/order/completed/${oid}`);
      
      // PATCH /order/completed/{oid}
      const response = await axios.patch(`http://localhost:8080/order/completed/${oid}`);
      
      console.log('✅ Service completed successfully:', response.data);
      setShowCompleteConfirm(false);
      toast.success('Service completed successfully!');
      setSelectedOrder(null);
      fetchVendorOrders(vendorId);
    } catch (error) {
      console.error('❌ Error completing service:', error);
      console.error('Error details:', error.response?.data);
      console.error('Error status:', error.response?.status);
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

    const payment = calculateEarnings(selectedOrder.price);

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
                        <p>{dayjs(selectedOrder.timeSlot).format('MMMM DD, YYYY')}</p>
                      </div>
                    </div>
                    <div className="detail-item">
                      <i className="bi bi-clock"></i>
                      <div>
                        <label>Time</label>
                        <p>{dayjs(selectedOrder.timeSlot).format('hh:mm A')}</p>
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
                        Price: ₹{selectedOrder.price}
                      </li>
                      {selectedOrder.service?.active && (
                        <li>
                          <i className="bi bi-check-circle"></i>
                          Service is currently active
                        </li>
                      )}
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
                
                <button className="action-btn btn-start" onClick={() => {
                  console.log('🖱️ Start Service button clicked');
                  console.log('Current order:', selectedOrder);
                  setShowStartConfirm(true);
                }}>
                  <i className="bi bi-play-circle-fill"></i>
                  Start Service
                </button>

                <button className="action-btn btn-complete" onClick={() => {
                  console.log('🖱️ Complete Service button clicked');
                  console.log('Current order:', selectedOrder);
                  setShowCompleteConfirm(true);
                }}>
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
            background: #1e3a8a;
            padding: 2rem;
            color: white;
            border-bottom: 4px solid #2563eb;
          }

          .btn-back {
            background: rgba(255, 255, 255, 0.1);
            color: white;
            border: 2px solid rgba(255, 255, 255, 0.2);
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
            background: rgba(255, 255, 255, 0.2);
            border-color: rgba(255, 255, 255, 0.3);
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
            opacity: 0.9;
            font-size: 1rem;
          }

          .status-badge-large {
            background: rgba(255, 255, 255, 0.15);
            padding: 0.75rem 1.5rem;
            border-radius: 25px;
            font-size: 0.875rem;
            font-weight: 700;
            border: 2px solid rgba(255, 255, 255, 0.25);
          }

          .detail-content {
            padding: 2rem;
            max-width: 1400px;
            margin: 0 auto;
            background: #f8fafc;
          }

          .content-layout {
            display: grid;
            grid-template-columns: 1fr 400px;
            gap: 2rem;
          }

          /* Earnings Card */
          .earnings-card {
            background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
            color: white;
            padding: 2rem;
            border-radius: 16px;
            display: flex;
            align-items: center;
            gap: 1.5rem;
            margin-bottom: 1.5rem;
            box-shadow: 0 4px 20px rgba(37, 99, 235, 0.3);
          }

          .earnings-icon {
            background: rgba(255, 255, 255, 0.15);
            width: 70px;
            height: 70px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            flex-shrink: 0;
            border: 2px solid rgba(255, 255, 255, 0.25);
          }

          .earnings-info {
            flex: 1;
          }

          .earnings-info h3 {
            font-size: 0.875rem;
            opacity: 0.9;
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
            opacity: 0.8;
          }

          .paid-badge {
            background: rgba(255, 255, 255, 0.2);
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.875rem;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            flex-shrink: 0;
            border: 1px solid rgba(255, 255, 255, 0.3);
          }

          /* Info Cards */
          .info-card {
            background: #ffffff;
            border-radius: 12px;
            margin-bottom: 1.5rem;
            border: 2px solid #e2e8f0;
            overflow: hidden;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          }

          .card-header {
            background: #f8fafc;
            padding: 1.25rem 1.5rem;
            border-bottom: 2px solid #e2e8f0;
            display: flex;
            align-items: center;
            gap: 0.75rem;
          }

          .card-header i {
            color: #2563eb;
            font-size: 1.25rem;
          }

          .card-header h3 {
            font-size: 1.125rem;
            font-weight: 700;
            color: #1e293b;
            margin: 0;
          }

          .card-body {
            padding: 1.5rem;
          }

          .service-title {
            font-size: 1.25rem;
            font-weight: 700;
            color: #1e293b;
            margin-bottom: 0.5rem;
          }

          .service-badge {
            display: inline-block;
            background: #dbeafe;
            color: #1e3a8a;
            padding: 0.25rem 0.75rem;
            border-radius: 12px;
            font-size: 0.75rem;
            font-weight: 600;
            margin-bottom: 1rem;
            border: 1px solid #bfdbfe;
          }

          .service-desc {
            color: #64748b;
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
            color: #2563eb;
            font-size: 1.25rem;
            margin-top: 0.25rem;
          }

          .detail-item label {
            font-size: 0.75rem;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            display: block;
            margin-bottom: 0.25rem;
          }

          .detail-item p {
            font-weight: 600;
            color: #1e293b;
            margin: 0;
          }

          .info-section h5 {
            font-weight: 700;
            color: #1e293b;
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
            color: #475569;
          }

          .info-section li i {
            color: #2563eb;
            font-size: 1rem;
          }

          .location-type {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: #f1f5f9;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.875rem;
            font-weight: 600;
            color: #1e293b;
            margin-bottom: 1rem;
            border: 1px solid #e2e8f0;
          }

          .address-details p {
            color: #334155;
            line-height: 1.6;
            margin-bottom: 0.25rem;
          }

          .text-muted {
            color: #94a3b8 !important;
            font-style: italic;
          }

          .btn-map {
            width: 100%;
            background: #2563eb;
            color: white;
            border: none;
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
            background: #1d4ed8;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
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
            color: #334155;
          }

          .payment-row.total-row {
            border-top: 2px solid #e2e8f0;
            padding-top: 1rem;
            margin-top: 0.25rem;
            color: #1e293b;
          }

          .divider {
            height: 1px;
            background: #e2e8f0;
            margin: 0.5rem 0;
          }

          .payment-row.commission-row {
            color: #64748b;
          }

          .payment-row.final-row {
            background: #f0f9ff;
            padding: 1rem;
            border-radius: 8px;
            margin-top: 0.5rem;
            border: 2px solid #bfdbfe;
          }

          .final-amount {
            color: #1e3a8a;
            font-size: 1.25rem;
          }

          /* Action Card */
          .action-card {
            background: #ffffff;
            border-radius: 12px;
            padding: 1.5rem;
            border: 2px solid #e2e8f0;
            margin-bottom: 1.5rem;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          }

          .action-card.sticky {
            position: sticky;
            top: 2rem;
          }

          .action-card h4 {
            font-weight: 700;
            color: #1e293b;
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
            background: #2563eb;
            color: white;
            border-color: #2563eb;
          }

          .btn-start:hover {
            background: #1d4ed8;
            border-color: #1d4ed8;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
          }

          .btn-complete {
            background: #10b981;
            color: white;
            border-color: #10b981;
          }

          .btn-complete:hover {
            background: #059669;
            border-color: #059669;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
          }

          .btn-contact,
          .btn-support {
            background: #ffffff;
            color: #1e293b;
            border-color: #e2e8f0;
          }

          .btn-contact:hover,
          .btn-support:hover {
            background: #f8fafc;
            border-color: #cbd5e1;
            transform: translateY(-1px);
          }

          /* Vendor Info */
          .vendor-info-card {
            background: #ffffff;
            border-radius: 12px;
            padding: 1.5rem;
            border: 2px solid #e2e8f0;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          }

          .vendor-info-card h4 {
            font-weight: 700;
            color: #1e293b;
            margin-bottom: 1.5rem;
          }

          .vendor-detail {
            display: flex;
            gap: 1rem;
            margin-bottom: 1.25rem;
          }

          .vendor-detail i {
            color: #2563eb;
            font-size: 1.25rem;
            margin-top: 0.25rem;
          }

          .vendor-detail label {
            font-size: 0.75rem;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            display: block;
            margin-bottom: 0.25rem;
          }

          .vendor-detail p {
            font-weight: 600;
            color: #1e293b;
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
            backdrop-filter: blur(4px);
          }

          .modal-dialog {
            background: white;
            border-radius: 16px;
            padding: 2rem;
            max-width: 450px;
            width: 100%;
            text-align: center;
            border: 2px solid #e2e8f0;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
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
            background: #dbeafe;
            color: #2563eb;
            border-color: #93c5fd;
          }

          .modal-icon.success {
            background: #d1fae5;
            color: #10b981;
            border-color: #6ee7b7;
          }

          .modal-dialog h3 {
            font-size: 1.5rem;
            font-weight: 700;
            color: #1e293b;
            margin-bottom: 0.75rem;
          }

          .modal-dialog p {
            color: #64748b;
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
            background: #ffffff;
            color: #1e293b;
            border-color: #e2e8f0;
          }

          .btn-cancel:hover {
            background: #f8fafc;
            border-color: #cbd5e1;
          }

          .btn-primary {
            background: #2563eb;
            color: white;
            border-color: #2563eb;
          }

          .btn-primary:hover {
            background: #1d4ed8;
            border-color: #1d4ed8;
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
          }

          .btn-success {
            background: #10b981;
            color: white;
            border-color: #10b981;
          }

          .btn-success:hover {
            background: #059669;
            border-color: #059669;
            box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
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
          background: rgba(255, 255, 255, 0.2);
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          border: 1px solid rgba(255, 255, 255, 0.3);
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
          to { transform: rotate(360deg); }
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