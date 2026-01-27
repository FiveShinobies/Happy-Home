import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const ViewOrderDetails = () => {
  const { id: orderId } = useParams();
  const navigate = useNavigate();
  
  console.log('🔍 ViewOrderDetails loaded with orderId:', orderId);
  
  const [orderData, setOrderData] = useState(null);
  const [orderStatus, setOrderStatus] = useState('ASSIGNED');
  const [showStartConfirm, setShowStartConfirm] = useState(false);
  const [showCompleteConfirm, setShowCompleteConfirm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('📌 useEffect triggered, orderId:', orderId);
    const fetchOrderDetails = async () => {
      if (!orderId) {
        setError('No order ID provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        console.log('📡 Fetching order details for ID:', orderId);
        const response = await axios.get(`http://localhost:8080/vendor/details/${orderId}`);
        
        console.log('📦 Order Details Response:', response.data);
        
        if (response.data) {
          setOrderData(response.data);
          if (response.data.status) {
            setOrderStatus(response.data.status);
          }
        } else {
          setError('No order data received');
        }
      } catch (error) {
        console.error('❌ Error fetching order details:', error);
        setError(error.response?.data?.message || 'Failed to load order details');
        toast.error('Failed to load order details');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

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

  const handleStartService = async () => {
    try {
      await axios.post(`http://localhost:8080/vendor/orders/${orderId}/start`);
      
      setShowStartConfirm(false);
      setOrderStatus('IN_PROGRESS');
      toast.success('Service started successfully!');
    } catch (error) {
      console.error('Error starting service:', error);
      toast.error(error.response?.data?.message || 'Failed to start service');
    }
  };

  const handleCompleteService = async () => {
    try {
      await axios.post(`http://localhost:8080/vendor/orders/${orderId}/complete`);
      
      setShowCompleteConfirm(false);
      setOrderStatus('COMPLETED');
      toast.success('Service completed successfully!');
    } catch (error) {
      console.error('Error completing service:', error);
      toast.error(error.response?.data?.message || 'Failed to complete service');
    }
  };

  const getStatusBadgeClass = (status) => {
    const statusMap = {
      'ASSIGNED': 'status-assigned',
      'IN_PROGRESS': 'status-progress',
      'COMPLETED': 'status-completed',
      'CANCELLED': 'status-cancelled'
    };
    return statusMap[status] || 'status-assigned';
  };

  if (loading) {
    return (
      <div className="view-order-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error || !orderData) {
    return (
      <div className="view-order-container">
        <div className="error-state">
          <i className="bi bi-exclamation-circle"></i>
          <h3>{error || 'Order not found'}</h3>
          <p>Unable to load order details. Please try again.</p>
          <button className="btn-back-home" onClick={() => navigate(-1)}>
            <i className="bi bi-arrow-left"></i> Go Back
          </button>
        </div>
      </div>
    );
  }

  const payment = calculateEarnings(orderData.price);

  return (
    <div className="view-order-container">
      {/* Header Section */}
      <div className="order-header-section">
        <div className="header-top">
          <button className="btn-back" onClick={() => navigate(-1)}>
            <i className="bi bi-arrow-left"></i> Back
          </button>
        </div>
        
        <div className="header-content">
          <div className="header-left">
            <h1 className="page-title">Order Details</h1>
            <p className="order-id-display">Order ID: #{orderId}</p>
          </div>
          <span className={`status-badge ${getStatusBadgeClass(orderStatus)}`}>
            {orderStatus.replace('_', ' ')}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="order-body-content">
        <div className="content-grid">
          {/* Left Column */}
          <div className="left-column">
            {/* Earnings Highlight */}
            <div className="earnings-card">
              <div className="earnings-icon-wrapper">
                <i className="bi bi-currency-rupee"></i>
              </div>
              <div className="earnings-info">
                <h3 className="earnings-label">Your Earnings</h3>
                <div className="earnings-value">₹{payment.vendorEarnings}</div>
                <p className="earnings-subtitle">
                  After {payment.commissionPercentage}% platform fee
                </p>
              </div>
              <div className="payment-badge">
                <i className="bi bi-check-circle-fill"></i> Paid
              </div>
            </div>

            {/* Service Details */}
            <div className="info-card">
              <div className="card-header">
                <i className="bi bi-briefcase"></i>
                <h3>Service Details</h3>
              </div>
              <div className="card-content">
                <div className="service-header">
                  <h4 className="service-title">
                    {orderData.service?.serviceName || 'Service'}
                  </h4>
                  <span className="category-tag">
                    {orderData.service?.category || 'General'}
                  </span>
                </div>
                <p className="service-desc">
                  {orderData.service?.longDesc || orderData.service?.shortDesc || 'Service will be provided as per booking'}
                </p>
                
                <div className="info-grid">
                  <div className="info-item">
                    <label><i className="bi bi-calendar-check"></i> Service Date</label>
                    <p>{dayjs(orderData.timeSlot).format('MMMM DD, YYYY')}</p>
                  </div>
                  <div className="info-item">
                    <label><i className="bi bi-clock"></i> Time</label>
                    <p>{dayjs(orderData.timeSlot).format('hh:mm A')}</p>
                  </div>
                  <div className="info-item">
                    <label><i className="bi bi-tag"></i> Priority</label>
                    <p>{orderData.priority || 'NORMAL'}</p>
                  </div>
                </div>

                <div className="service-info-list">
                  <h5>Service Information:</h5>
                  <ul>
                    <li>
                      <i className="bi bi-check-circle"></i>
                      Service will be provided as per booking details
                    </li>
                    <li>
                      <i className="bi bi-check-circle"></i>
                      Price: ₹{orderData.price}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Location Card */}
            <div className="info-card">
              <div className="card-header">
                <i className="bi bi-geo-alt"></i>
                <h3>Service Location</h3>
              </div>
              <div className="card-content">
                <div className="location-badge">
                  <i className="bi bi-building"></i>
                  Service Address
                </div>
                <div className="address-block">
                  {orderData.address?.homeNo && (
                    <p className="address-line"><strong>{orderData.address.homeNo}</strong></p>
                  )}
                  {orderData.address?.town && (
                    <p className="address-line">{orderData.address.town}</p>
                  )}
                  {orderData.address?.city && (
                    <p className="address-line">
                      {orderData.address.city}
                      {orderData.address.state && `, ${orderData.address.state}`}
                      {orderData.address.pincode && ` - ${orderData.address.pincode}`}
                    </p>
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
              <div className="card-content">
                <div className="payment-breakdown">
                  <div className="payment-item">
                    <span>Base Price</span>
                    <span>₹{payment.baseAmount}</span>
                  </div>
                  <div className="payment-item">
                    <span>GST (18%)</span>
                    <span>₹{payment.gst}</span>
                  </div>
                  <div className="payment-item total">
                    <span><strong>Total Amount</strong></span>
                    <span><strong>₹{payment.totalWithGst}</strong></span>
                  </div>
                  <div className="divider"></div>
                  <div className="payment-item commission">
                    <span>Platform Commission ({payment.commissionPercentage}%)</span>
                    <span>-₹{payment.platformCommission}</span>
                  </div>
                  <div className="payment-item final">
                    <span><strong>Your Earnings</strong></span>
                    <span className="highlight"><strong>₹{payment.vendorEarnings}</strong></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="right-column">
            {/* Actions Card */}
            <div className="actions-card sticky-card">
              <h4>Order Actions</h4>
              
              {orderStatus === 'ASSIGNED' && (
                <button className="action-btn primary" onClick={() => setShowStartConfirm(true)}>
                  <i className="bi bi-play-circle"></i>
                  Start Service
                </button>
              )}
              
              {orderStatus === 'IN_PROGRESS' && (
                <button className="action-btn success" onClick={() => setShowCompleteConfirm(true)}>
                  <i className="bi bi-check-circle"></i>
                  Mark as Completed
                </button>
              )}

              {orderStatus === 'COMPLETED' && (
                <div className="completed-msg">
                  <i className="bi bi-check-circle-fill"></i>
                  <p>Service Completed Successfully!</p>
                </div>
              )}

              <button className="action-btn secondary">
                <i className="bi bi-chat-dots"></i>
                Contact Customer
              </button>

              <button className="action-btn secondary">
                <i className="bi bi-headset"></i>
                Contact Support
              </button>

              {orderStatus === 'ASSIGNED' && (
                <button className="action-btn danger">
                  <i className="bi bi-x-circle"></i>
                  Cancel Order
                </button>
              )}
            </div>

            {/* Timeline Card */}
            <div className="timeline-card">
              <h4>Order Timeline</h4>
              <div className="timeline">
                <div className="timeline-step completed">
                  <div className="step-icon">
                    <i className="bi bi-check-circle-fill"></i>
                  </div>
                  <div className="step-content">
                    <p className="step-title">Order Created</p>
                    <p className="step-time">
                      {dayjs(orderData.timeSlot).format('MMM DD, YYYY')}
                    </p>
                  </div>
                </div>
                <div className="timeline-step completed">
                  <div className="step-icon">
                    <i className="bi bi-check-circle-fill"></i>
                  </div>
                  <div className="step-content">
                    <p className="step-title">Assigned to You</p>
                    <p className="step-time">Accepted</p>
                  </div>
                </div>
                <div className={`timeline-step ${orderStatus !== 'ASSIGNED' ? 'completed' : 'active'}`}>
                  <div className="step-icon">
                    <i className={orderStatus !== 'ASSIGNED' ? 'bi bi-check-circle-fill' : 'bi bi-circle'}></i>
                  </div>
                  <div className="step-content">
                    <p className="step-title">Service Started</p>
                    <p className="step-time">{orderStatus !== 'ASSIGNED' ? 'In Progress' : 'Pending'}</p>
                  </div>
                </div>
                <div className={`timeline-step ${orderStatus === 'COMPLETED' ? 'completed' : ''}`}>
                  <div className="step-icon">
                    <i className={orderStatus === 'COMPLETED' ? 'bi bi-check-circle-fill' : 'bi bi-circle'}></i>
                  </div>
                  <div className="step-content">
                    <p className="step-title">Service Completed</p>
                    <p className="step-time">Pending</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Vendor Info Card */}
            <div className="info-card-sidebar">
              <h4>Vendor Info</h4>
              {orderData.myVendor && (
                <>
                  <div className="info-row">
                    <i className="bi bi-person"></i>
                    <div>
                      <label>Vendor</label>
                      <p>
                        {orderData.myVendor.myUser?.firstName || ''} {orderData.myVendor.myUser?.lastName || ''}
                      </p>
                    </div>
                  </div>
                  <div className="info-row">
                    <i className="bi bi-telephone"></i>
                    <div>
                      <label>Phone</label>
                      <p>{orderData.myVendor.myUser?.phone || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="info-row">
                    <i className="bi bi-briefcase"></i>
                    <div>
                      <label>Experience</label>
                      <p>{orderData.myVendor.experience || 0} years</p>
                    </div>
                  </div>
                </>
              )}
              <div className="info-row">
                <i className="bi bi-credit-card"></i>
                <div>
                  <label>Payment Status</label>
                  <p className="text-success">Paid</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modals */}
      {showStartConfirm && (
        <div className="modal-overlay" onClick={() => setShowStartConfirm(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon">
              <i className="bi bi-play-circle"></i>
            </div>
            <h3>Start Service?</h3>
            <p>Are you sure you want to mark this service as started? Make sure you've reached the location.</p>
            <div className="modal-buttons">
              <button className="modal-btn cancel" onClick={() => setShowStartConfirm(false)}>
                Cancel
              </button>
              <button className="modal-btn confirm" onClick={handleStartService}>
                Yes, Start Service
              </button>
            </div>
          </div>
        </div>
      )}

      {showCompleteConfirm && (
        <div className="modal-overlay" onClick={() => setShowCompleteConfirm(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon success">
              <i className="bi bi-check-circle"></i>
            </div>
            <h3>Complete Service?</h3>
            <p>Are you sure you want to mark this service as completed? The customer will be notified.</p>
            <div className="modal-buttons">
              <button className="modal-btn cancel" onClick={() => setShowCompleteConfirm(false)}>
                Cancel
              </button>
              <button className="modal-btn confirm" onClick={handleCompleteService}>
                Yes, Complete Service
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .view-order-container {
          min-height: 100vh;
          background: #f3f4f6;
        }

        /* Header Section */
        .order-header-section {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 2rem;
          color: white;
        }

        .header-top {
          margin-bottom: 1.5rem;
        }

        .btn-back {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
          padding: 0.5rem 1rem;
          border-radius: 8px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .btn-back:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .page-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .order-id-display {
          font-size: 1rem;
          opacity: 0.9;
        }

        .status-badge {
          padding: 0.75rem 1.5rem;
          border-radius: 25px;
          font-size: 0.875rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .status-assigned {
          background: rgba(255, 255, 255, 0.25);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.5);
        }

        .status-progress {
          background: #3b82f6;
          color: white;
        }

        .status-completed {
          background: #10b981;
          color: white;
        }

        .status-cancelled {
          background: #ef4444;
          color: white;
        }

        /* Body Content */
        .order-body-content {
          padding: 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .content-grid {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 2rem;
        }

        /* Cards */
        .earnings-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 2rem;
          border-radius: 16px;
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
        }

        .earnings-icon-wrapper {
          background: rgba(255, 255, 255, 0.2);
          width: 70px;
          height: 70px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .earnings-icon-wrapper i {
          font-size: 2rem;
        }

        .earnings-info {
          flex: 1;
        }

        .earnings-label {
          font-size: 0.875rem;
          opacity: 0.9;
          margin-bottom: 0.5rem;
        }

        .earnings-value {
          font-size: 2.5rem;
          font-weight: 700;
          line-height: 1;
          margin-bottom: 0.5rem;
        }

        .earnings-subtitle {
          font-size: 0.875rem;
          opacity: 0.8;
        }

        .payment-badge {
          background: rgba(255, 255, 255, 0.25);
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .info-card {
          background: white;
          border-radius: 12px;
          margin-bottom: 1.5rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          overflow: hidden;
        }

        .card-header {
          background: #f9fafb;
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .card-header i {
          color: #667eea;
          font-size: 1.25rem;
        }

        .card-header h3 {
          font-size: 1.125rem;
          font-weight: 700;
          color: #111827;
        }

        .card-content {
          padding: 1.5rem;
        }

        .service-header {
          margin-bottom: 1rem;
        }

        .service-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 0.5rem;
        }

        .category-tag {
          display: inline-block;
          background: #e0e7ff;
          color: #4338ca;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .service-desc {
          color: #6b7280;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .info-item label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.5rem;
        }

        .info-item label i {
          color: #667eea;
        }

        .info-item p {
          font-size: 0.875rem;
          font-weight: 600;
          color: #111827;
        }

        .service-info-list h5 {
          font-size: 0.875rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 0.75rem;
        }

        .service-info-list ul {
          list-style: none;
        }

        .service-info-list li {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem 0;
          color: #4b5563;
        }

        .service-info-list li i {
          color: #10b981;
          font-size: 1rem;
        }

        .location-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #f3f4f6;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 600;
          color: #374151;
          margin-bottom: 1rem;
        }

        .address-block {
          margin-bottom: 1.5rem;
        }

        .address-line {
          color: #374151;
          line-height: 1.6;
          margin-bottom: 0.25rem;
        }

        .btn-map {
          width: 100%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }

        .btn-map:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }

        .payment-breakdown {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .payment-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 0;
          color: #374151;
        }

        .payment-item.total {
          border-top: 2px solid #e5e7eb;
          padding-top: 1rem;
        }

        .divider {
          height: 1px;
          background: #e5e7eb;
          margin: 0.5rem 0;
        }

        .payment-item.commission {
          color: #ef4444;
        }

        .payment-item.final {
          background: #f0fdf4;
          padding: 1rem;
          border-radius: 8px;
          margin-top: 0.5rem;
        }

        .payment-item .highlight {
          color: #059669;
          font-size: 1.25rem;
        }

        /* Right Sidebar */
        .actions-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          margin-bottom: 1.5rem;
        }

        .sticky-card {
          position: sticky;
          top: 2rem;
        }

        .actions-card h4 {
          font-size: 1.125rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 1.5rem;
        }

        .action-btn {
          width: 100%;
          padding: 0.875rem 1.5rem;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.875rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
          transition: all 0.3s ease;
        }

        .action-btn.primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .action-btn.primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }

        .action-btn.success {
          background: #10b981;
          color: white;
        }

        .action-btn.success:hover {
          background: #059669;
          transform: translateY(-2px);
        }

        .action-btn.secondary {
          background: #f3f4f6;
          color: #374151;
        }

        .action-btn.secondary:hover {
          background: #e5e7eb;
        }

        .action-btn.danger {
          background: #fee2e2;
          color: #dc2626;
        }

        .action-btn.danger:hover {
          background: #fecaca;
        }

        .completed-msg {
          background: #d1fae5;
          color: #065f46;
          padding: 1.5rem;
          border-radius: 8px;
          text-align: center;
          margin-bottom: 1rem;
        }

        .completed-msg i {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
          display: block;
        }

        .completed-msg p {
          font-weight: 600;
          margin: 0;
        }

        .timeline-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          margin-bottom: 1.5rem;
        }

        .timeline-card h4 {
          font-size: 1.125rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 1.5rem;
        }

        .timeline {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .timeline-step {
          display: flex;
          gap: 1rem;
          position: relative;
        }

        .timeline-step:not(:last-child)::after {
          content: '';
          position: absolute;
          left: 15px;
          top: 35px;
          width: 2px;
          height: calc(100% + 1rem);
          background: #e5e7eb;
        }

        .timeline-step.completed:not(:last-child)::after {
          background: #10b981;
        }

        .step-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #e5e7eb;
          color: #9ca3af;
          flex-shrink: 0;
          position: relative;
          z-index: 1;
        }

        .timeline-step.completed .step-icon {
          background: #10b981;
          color: white;
        }

        .timeline-step.active .step-icon {
          background: #3b82f6;
          color: white;
        }

        .step-content {
          flex: 1;
        }

        .step-title {
          font-weight: 600;
          color: #111827;
          margin-bottom: 0.25rem;
        }

        .step-time {
          font-size: 0.875rem;
          color: #6b7280;
        }

        .info-card-sidebar {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .info-card-sidebar h4 {
          font-size: 1.125rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 1.5rem;
        }

        .info-row {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.25rem;
        }

        .info-row i {
          font-size: 1.25rem;
          color: #667eea;
          margin-top: 0.25rem;
        }

        .info-row label {
          display: block;
          font-size: 0.75rem;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.25rem;
        }

        .info-row p {
          font-size: 0.875rem;
          font-weight: 600;
          color: #111827;
        }

        .text-success {
          color: #059669 !important;
        }

        /* Modals */
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

        .modal-box {
          background: white;
          border-radius: 16px;
          padding: 2rem;
          max-width: 450px;
          width: 100%;
          text-align: center;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .modal-icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: #e0e7ff;
          color: #4338ca;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          font-size: 2.5rem;
        }

        .modal-icon.success {
          background: #d1fae5;
          color: #059669;
        }

        .modal-box h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 0.75rem;
        }

        .modal-box p {
          color: #6b7280;
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .modal-buttons {
          display: flex;
          gap: 1rem;
        }

        .modal-btn {
          flex: 1;
          padding: 0.875rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          border: none;
          transition: all 0.3s ease;
        }

        .modal-btn.cancel {
          background: #f3f4f6;
          color: #374151;
        }

        .modal-btn.cancel:hover {
          background: #e5e7eb;
        }

        .modal-btn.confirm {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .modal-btn.confirm:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }

        /* Loading & Error States */
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
          border-top-color: #667eea;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .loading-spinner p {
          color: #6b7280;
          font-size: 1rem;
          font-weight: 500;
        }

        .error-state {
          text-align: center;
          padding: 5rem 2rem;
        }

        .error-state i {
          font-size: 5rem;
          color: #d1d5db;
          margin-bottom: 1.5rem;
        }

        .error-state h3 {
          font-size: 1.75rem;
          color: #111827;
          margin-bottom: 0.75rem;
        }

        .error-state p {
          color: #6b7280;
          margin-bottom: 2rem;
        }

        .btn-back-home {
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }

        .btn-back-home:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .content-grid {
            grid-template-columns: 1fr;
          }

          .sticky-card {
            position: static;
          }

          .info-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 640px) {
          .order-header-section {
            padding: 1.5rem 1rem;
          }

          .page-title {
            font-size: 1.5rem;
          }

          .order-body-content {
            padding: 1rem;
          }

          .earnings-card {
            flex-direction: column;
            text-align: center;
          }

          .earnings-value {
            font-size: 2rem;
          }

          .info-grid {
            grid-template-columns: 1fr;
          }

          .modal-buttons {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default ViewOrderDetails;