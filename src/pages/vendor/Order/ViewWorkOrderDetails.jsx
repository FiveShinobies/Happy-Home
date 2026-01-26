import React, { useState } from 'react';
import './viewOrderDetails.css';

const ViewWorkOrderDetails = () => {
  const [orderStatus, setOrderStatus] = useState('accepted');
  const [showStartConfirm, setShowStartConfirm] = useState(false);
  const [showCompleteConfirm, setShowCompleteConfirm] = useState(false);

  // Sample order data
  const orderData = {
    orderId: 'ORD123456789',
    bookingDate: '2024-12-08',
    serviceDate: '2024-12-10',
    serviceTime: '10:00 AM - 12:00 PM',
    duration: '2 hours',
    
    serviceName: 'Deep House Cleaning',
    serviceCategory: 'Home Cleaning',
    serviceDescription: 'Complete deep cleaning of 3BHK apartment including kitchen, bathrooms, living areas, and bedrooms',
    
    customer: {
      name: 'Priya Sharma',
      phone: '+91 98765 43210'
    },
    
    serviceAddress: {
      flatNo: 'Flat 301, Tower B',
      society: 'Green Valley Apartments',
      landmark: 'Near City Mall',
      street: 'MG Road',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560001',
      locationType: 'Apartment',
      floor: '3rd Floor'
    },
    
    payment: {
      basePrice: 1299,
      gst: 234,
      platformFee: 50,
      discount: 130,
      totalAmount: 1453,
      vendorEarnings: 1169,
      platformCommission: 130,
      commissionPercentage: 10,
      paymentMethod: 'Online',
      paymentStatus: 'Paid'
    },
    
    status: 'Accepted',
    assignedAt: '2024-12-08 09:30 AM',
    acceptedAt: '2024-12-08 09:45 AM',
    
    tasksIncluded: [
      'Vacuum and mop all floors',
      'Clean all windows and glass surfaces',
      'Kitchen deep cleaning (stove, sink, countertops)',
      'Bathroom sanitization (2 bathrooms)',
      'Dusting all furniture and surfaces',
      'Balcony cleaning'
    ]
  };

  const handleStartService = () => {
    setShowStartConfirm(false);
    setOrderStatus('in-progress');
  };

  const handleCompleteService = () => {
    setShowCompleteConfirm(false);
    setOrderStatus('completed');
  };

  const getStatusBadgeClass = (status) => {
    const statusMap = {
      'accepted': 'status-accepted',
      'in-progress': 'status-progress',
      'completed': 'status-completed',
      'cancelled': 'status-cancelled'
    };
    return statusMap[status] || 'status-accepted';
  };

  return (
    <div className="view-order-container">
      {/* Header Section */}
      <div className="order-header">
        <div className="container">
          <div className="header-content">
            <div className="order-title-section">
              <h1 className="order-title">Order Details</h1>
              <p className="order-id">Order ID: {orderData.orderId}</p>
            </div>
            <span className={`status-badge ${getStatusBadgeClass(orderStatus)}`}>
              {orderStatus.replace('-', ' ').toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="order-content">
        <div className="container">
          <div className="row">
            {/* Left Column */}
            <div className="col-lg-8">
              {/* Earnings Card */}
              <div className="earnings-highlight-card">
                <div className="earnings-icon">
                  <i className="bi bi-currency-rupee"></i>
                </div>
                <div className="earnings-details">
                  <h2 className="earnings-title">Your Earnings</h2>
                  <div className="earnings-amount">₹{orderData.payment.vendorEarnings}</div>
                  <p className="earnings-note">
                    After {orderData.payment.commissionPercentage}% platform fee
                  </p>
                </div>
                <div className="payment-status-badge">
                  <i className="bi bi-check-circle-fill"></i> {orderData.payment.paymentStatus}
                </div>
              </div>

              {/* Service Details Card */}
              <div className="detail-card">
                <div className="card-header-custom">
                  <i className="bi bi-briefcase"></i>
                  <h3>Service Details</h3>
                </div>
                <div className="card-body-custom">
                  <div className="service-info-grid">
                    <div className="service-main-info">
                      <h4 className="service-name">{orderData.serviceName}</h4>
                      <span className="service-category-badge">{orderData.serviceCategory}</span>
                    </div>
                    <p className="service-description">{orderData.serviceDescription}</p>
                  </div>
                  
                  <div className="info-row">
                    <div className="info-col">
                      <label><i className="bi bi-calendar-check"></i> Service Date</label>
                      <p>{orderData.serviceDate}</p>
                    </div>
                    <div className="info-col">
                      <label><i className="bi bi-clock"></i> Time Slot</label>
                      <p>{orderData.serviceTime}</p>
                    </div>
                    <div className="info-col">
                      <label><i className="bi bi-hourglass-split"></i> Duration</label>
                      <p>{orderData.duration}</p>
                    </div>
                  </div>

                  <div className="tasks-section">
                    <h5>Tasks Included:</h5>
                    <ul className="tasks-list">
                      {orderData.tasksIncluded.map((task, index) => (
                        <li key={index}>
                          <i className="bi bi-check-circle"></i>
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Service Location Card */}
              <div className="detail-card">
                <div className="card-header-custom">
                  <i className="bi bi-geo-alt"></i>
                  <h3>Service Location</h3>
                </div>
                <div className="card-body-custom">
                  <div className="location-type-badge">
                    <i className="bi bi-building"></i>
                    {orderData.serviceAddress.locationType} - {orderData.serviceAddress.floor}
                  </div>
                  <div className="address-details">
                    <p className="address-line"><strong>{orderData.serviceAddress.flatNo}</strong></p>
                    <p className="address-line">{orderData.serviceAddress.society}</p>
                    <p className="address-line">{orderData.serviceAddress.street}</p>
                    <p className="address-line">{orderData.serviceAddress.city}, {orderData.serviceAddress.state} - {orderData.serviceAddress.pincode}</p>
                    <p className="address-landmark">
                      <i className="bi bi-pin-map"></i>
                      Landmark: {orderData.serviceAddress.landmark}
                    </p>
                  </div>
                  <button className="btn-map">
                    <i className="bi bi-map"></i>
                    Open in Maps
                  </button>
                </div>
              </div>

              {/* Payment Breakdown Card */}
              <div className="detail-card">
                <div className="card-header-custom">
                  <i className="bi bi-receipt"></i>
                  <h3>Payment Breakdown</h3>
                </div>
                <div className="card-body-custom">
                  <div className="payment-breakdown">
                    <div className="payment-row">
                      <span>Base Price</span>
                      <span>₹{orderData.payment.basePrice}</span>
                    </div>
                    <div className="payment-row">
                      <span>GST (18%)</span>
                      <span>₹{orderData.payment.gst}</span>
                    </div>
                    <div className="payment-row">
                      <span>Platform Fee</span>
                      <span>₹{orderData.payment.platformFee}</span>
                    </div>
                    <div className="payment-row discount-row">
                      <span>Discount</span>
                      <span>-₹{orderData.payment.discount}</span>
                    </div>
                    <div className="payment-row total-row">
                      <span><strong>Total Amount</strong></span>
                      <span><strong>₹{orderData.payment.totalAmount}</strong></span>
                    </div>
                    <div className="payment-divider"></div>
                    <div className="payment-row commission-row">
                      <span>Platform Commission ({orderData.payment.commissionPercentage}%)</span>
                      <span>-₹{orderData.payment.platformCommission}</span>
                    </div>
                    <div className="payment-row earnings-row">
                      <span><strong>Your Earnings</strong></span>
                      <span className="earnings-highlight"><strong>₹{orderData.payment.vendorEarnings}</strong></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="col-lg-4">
              <div className="action-card sticky-sidebar">
                <h4>Order Actions</h4>
                
                {orderStatus === 'accepted' && (
                  <button className="btn-action btn-start" onClick={() => setShowStartConfirm(true)}>
                    <i className="bi bi-play-circle"></i>
                    Start Service
                  </button>
                )}
                
                {orderStatus === 'in-progress' && (
                  <button className="btn-action btn-complete" onClick={() => setShowCompleteConfirm(true)}>
                    <i className="bi bi-check-circle"></i>
                    Mark as Completed
                  </button>
                )}

                {orderStatus === 'completed' && (
                  <div className="completion-message">
                    <i className="bi bi-check-circle-fill"></i>
                    <p>Service Completed Successfully!</p>
                  </div>
                )}

                <button className="btn-action btn-contact">
                  <i className="bi bi-chat-dots"></i>
                  Contact Customer
                </button>

                <button className="btn-action btn-support">
                  <i className="bi bi-headset"></i>
                  Contact Support
                </button>

                {orderStatus === 'accepted' && (
                  <button className="btn-action btn-cancel">
                    <i className="bi bi-x-circle"></i>
                    Cancel Order
                  </button>
                )}
              </div>

              {/* Timeline Card */}
              <div className="timeline-card">
                <h4>Order Timeline</h4>
                <div className="timeline">
                  <div className="timeline-item completed">
                    <div className="timeline-icon">
                      <i className="bi bi-check-circle-fill"></i>
                    </div>
                    <div className="timeline-content">
                      <p className="timeline-title">Order Placed</p>
                      <p className="timeline-time">{orderData.bookingDate}</p>
                    </div>
                  </div>
                  <div className="timeline-item completed">
                    <div className="timeline-icon">
                      <i className="bi bi-check-circle-fill"></i>
                    </div>
                    <div className="timeline-content">
                      <p className="timeline-title">Assigned to You</p>
                      <p className="timeline-time">{orderData.assignedAt}</p>
                    </div>
                  </div>
                  <div className={`timeline-item ${orderStatus !== 'accepted' ? 'completed' : 'active'}`}>
                    <div className="timeline-icon">
                      <i className={orderStatus !== 'accepted' ? 'bi bi-check-circle-fill' : 'bi bi-circle'}></i>
                    </div>
                    <div className="timeline-content">
                      <p className="timeline-title">Service Started</p>
                      <p className="timeline-time">{orderStatus !== 'accepted' ? 'In Progress' : 'Pending'}</p>
                    </div>
                  </div>
                  <div className={`timeline-item ${orderStatus === 'completed' ? 'completed' : ''}`}>
                    <div className="timeline-icon">
                      <i className={orderStatus === 'completed' ? 'bi bi-check-circle-fill' : 'bi bi-circle'}></i>
                    </div>
                    <div className="timeline-content">
                      <p className="timeline-title">Service Completed</p>
                      <p className="timeline-time">Pending</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Info Card */}
              <div className="quick-info-card">
                <h4>Quick Info</h4>
                <div className="quick-info-item">
                  <i className="bi bi-person"></i>
                  <div>
                    <label>Customer</label>
                    <p>{orderData.customer.name}</p>
                  </div>
                </div>
                <div className="quick-info-item">
                  <i className="bi bi-telephone"></i>
                  <div>
                    <label>Phone</label>
                    <p>{orderData.customer.phone}</p>
                  </div>
                </div>
                <div className="quick-info-item">
                  <i className="bi bi-credit-card"></i>
                  <div>
                    <label>Payment Method</label>
                    <p>{orderData.payment.paymentMethod}</p>
                  </div>
                </div>
                <div className="quick-info-item">
                  <i className="bi bi-shield-check"></i>
                  <div>
                    <label>Payment Status</label>
                    <p className="text-success">{orderData.payment.paymentStatus}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modals */}
      {showStartConfirm && (
        <div className="modal-overlay" onClick={() => setShowStartConfirm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Start Service?</h3>
            <p>Are you sure you want to mark this service as started? Make sure you've reached the location.</p>
            <div className="modal-actions">
              <button className="btn-modal btn-cancel-modal" onClick={() => setShowStartConfirm(false)}>
                Cancel
              </button>
              <button className="btn-modal btn-confirm" onClick={handleStartService}>
                Yes, Start Service
              </button>
            </div>
          </div>
        </div>
      )}

      {showCompleteConfirm && (
        <div className="modal-overlay" onClick={() => setShowCompleteConfirm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Complete Service?</h3>
            <p>Are you sure you want to mark this service as completed? The customer will be notified.</p>
            <div className="modal-actions">
              <button className="btn-modal btn-cancel-modal" onClick={() => setShowCompleteConfirm(false)}>
                Cancel
              </button>
              <button className="btn-modal btn-confirm" onClick={handleCompleteService}>
                Yes, Complete Service
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewWorkOrderDetails;