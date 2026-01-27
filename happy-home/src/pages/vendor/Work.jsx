import React, { useState } from 'react';
import './WorkDetails.css';

const viewWorkDetails = () => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [filter, setFilter] = useState('all');

  // Sample work requests data
  const workRequests = [
    {
      requestId: 'REQ001',
      serviceName: 'Deep House Cleaning',
      serviceCategory: 'Home Cleaning',
      serviceDate: '2024-12-12',
      serviceTime: '10:00 AM - 12:00 PM',
      duration: '2 hours',
      urgency: 'high',
      postedAt: '5 mins ago',
      
      customer: {
        name: 'Priya Sharma',
        phone: '+91 98765 43210',
        rating: 4.8,
        totalBookings: 23,
      },
      
      serviceAddress: {
        area: 'Koramangala',
        distance: '2.5 km',
        fullAddress: 'Flat 301, Tower B, Green Valley Apartments, Koramangala 5th Block, Bangalore - 560095',
        locationType: 'Apartment',
        floor: '3rd Floor'
      },
      
      earnings: {
        baseAmount: 1299,
        platformCommission: 130,
        gst: 234,
        yourEarnings: 1169,
        paymentStatus: 'Prepaid',
        bonus: 50
      },
      
      taskDetails: [
        'Vacuum and mop all floors',
        'Kitchen deep cleaning',
        'Bathroom sanitization (2 bathrooms)',
        'Dusting all surfaces',
        'Balcony cleaning'
      ],
      
      requirements: {
        materialsProvided: false,
        specialInstructions: 'Please bring eco-friendly cleaning supplies',
        petFriendly: true,
        parkingAvailable: true
      },
      
      matchScore: 95
    },
    {
      requestId: 'REQ002',
      serviceName: 'AC Repair & Service',
      serviceCategory: 'Appliance Repair',
      serviceDate: '2024-12-11',
      serviceTime: '2:00 PM - 4:00 PM',
      duration: '1.5 hours',
      urgency: 'medium',
      postedAt: '15 mins ago',
      
      customer: {
        name: 'Amit Patel',
        phone: '+91 98765 43211',
        rating: 4.5,
        totalBookings: 12,
      },
      
      serviceAddress: {
        area: 'Indiranagar',
        distance: '4.2 km',
        fullAddress: 'House 45, 2nd Cross, Indiranagar 1st Stage, Bangalore - 560038',
        locationType: 'Independent House',
        floor: 'Ground Floor'
      },
      
      earnings: {
        baseAmount: 899,
        platformCommission: 90,
        gst: 162,
        yourEarnings: 809,
        paymentStatus: 'Cash on Delivery',
        bonus: 0
      },
      
      taskDetails: [
        'AC gas refilling',
        'Filter cleaning',
        'General servicing',
        'Check cooling efficiency'
      ],
      
      requirements: {
        materialsProvided: true,
        specialInstructions: 'AC is in bedroom on first floor',
        petFriendly: false,
        parkingAvailable: true
      },
      
      matchScore: 88
    },
    {
      requestId: 'REQ003',
      serviceName: 'Plumbing Repair',
      serviceCategory: 'Plumbing',
      serviceDate: '2024-12-10',
      serviceTime: '9:00 AM - 11:00 AM',
      duration: '1 hour',
      urgency: 'urgent',
      postedAt: '2 mins ago',
      
      customer: {
        name: 'Sneha Reddy',
        phone: '+91 98765 43212',
        rating: 4.9,
        totalBookings: 45,
      },
      
      serviceAddress: {
        area: 'Whitefield',
        distance: '6.8 km',
        fullAddress: 'Flat 502, Phoenix Heights, Whitefield Main Road, Bangalore - 560066',
        locationType: 'Apartment',
        floor: '5th Floor'
      },
      
      earnings: {
        baseAmount: 599,
        platformCommission: 60,
        gst: 108,
        yourEarnings: 539,
        paymentStatus: 'Prepaid',
        bonus: 100
      },
      
      taskDetails: [
        'Fix leaking kitchen tap',
        'Check water pressure',
        'Inspect pipes for damage'
      ],
      
      requirements: {
        materialsProvided: false,
        specialInstructions: 'Urgent - water leakage issue',
        petFriendly: false,
        parkingAvailable: false
      },
      
      matchScore: 92
    }
  ];

  const getUrgencyClass = (urgency) => {
    const urgencyMap = {
      'urgent': 'urgency-urgent',
      'high': 'urgency-high',
      'medium': 'urgency-medium',
      'low': 'urgency-low'
    };
    return urgencyMap[urgency] || 'urgency-medium';
  };

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
  };

  const handleAccept = () => {
    setShowAcceptModal(false);
    // API call to accept request
    alert(`Request ${selectedRequest.requestId} accepted!`);
    setSelectedRequest(null);
  };

  const handleReject = () => {
    if (!rejectReason) {
      alert('Please select a reason for rejection');
      return;
    }
    setShowRejectModal(false);
    // API call to reject request
    alert(`Request ${selectedRequest.requestId} rejected. Reason: ${rejectReason}`);
    setRejectReason('');
    setSelectedRequest(null);
  };

  const filteredRequests = filter === 'all' 
    ? workRequests 
    : workRequests.filter(req => req.urgency === filter);

  return (
    <div className="work-details-container">
      {/* Header */}
      <div className="work-header">
        <div className="container">
          <div className="header-top">
            <div>
              <h1 className="page-title">Available Work Requests</h1>
              <p className="page-subtitle">Review and accept requests that match your skills</p>
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

      {/* Filters */}
      <div className="filters-section">
        <div className="container">
          <div className="filters-wrapper">
            <div className="filter-buttons">
              <button 
                className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                All Requests
              </button>
              <button 
                className={`filter-btn ${filter === 'urgent' ? 'active' : ''}`}
                onClick={() => setFilter('urgent')}
              >
                <i className="bi bi-exclamation-circle"></i> Urgent
              </button>
              <button 
                className={`filter-btn ${filter === 'high' ? 'active' : ''}`}
                onClick={() => setFilter('high')}
              >
                High Priority
              </button>
              <button 
                className={`filter-btn ${filter === 'medium' ? 'active' : ''}`}
                onClick={() => setFilter('medium')}
              >
                Medium
              </button>
            </div>
            <div className="sort-dropdown">
              <i className="bi bi-funnel"></i>
              <select className="form-select">
                <option>Sort by: Earnings (High to Low)</option>
                <option>Sort by: Distance (Near to Far)</option>
                <option>Sort by: Match Score</option>
                <option>Sort by: Time Posted</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="work-content">
        <div className="container">
          {!selectedRequest ? (
            <div className="requests-grid">
              {filteredRequests.map((request) => (
                <div key={request.requestId} className="request-card">
                  {/* Card Header */}
                  <div className="request-card-header">
                    <div className="request-meta">
                      <span className={`urgency-badge ${getUrgencyClass(request.urgency)}`}>
                        {request.urgency === 'urgent' && <i className="bi bi-lightning-fill"></i>}
                        {request.urgency.toUpperCase()}
                      </span>
                      <span className="posted-time">
                        <i className="bi bi-clock"></i> {request.postedAt}
                      </span>
                    </div>
                    <div className="match-score">
                      <div className="match-circle">{request.matchScore}%</div>
                      <span>Match</span>
                    </div>
                  </div>

                  {/* Service Info */}
                  <div className="service-info">
                    <h3 className="service-title">{request.serviceName}</h3>
                    <span className="service-category">{request.serviceCategory}</span>
                  </div>

                  {/* Earnings Highlight */}
                  <div className="earnings-box">
                    <div className="earnings-main">
                      <label>You'll Earn</label>
                      <div className="earnings-value">₹{request.earnings.yourEarnings}</div>
                    </div>
                    {request.earnings.bonus > 0 && (
                      <div className="bonus-badge">
                        <i className="bi bi-gift"></i> +₹{request.earnings.bonus} Bonus
                      </div>
                    )}
                  </div>

                  {/* Quick Details Grid */}
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
                        <p>{request.serviceAddress.area} ({request.serviceAddress.distance})</p>
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

                  {/* Customer Info Preview */}
                  <div className="customer-preview">
                    <img src={request.customer.profileImage} alt={request.customer.name} />
                    <div className="customer-info">
                      <h5>{request.customer.name}</h5>
                      <div className="customer-rating">
                        <i className="bi bi-star-fill"></i>
                        <span>{request.customer.rating}</span>
                        <span className="booking-count">({request.customer.totalBookings} bookings)</span>
                      </div>
                    </div>
                  </div>

                  {/* Requirements Tags */}
                  <div className="requirements-tags">
                    <span className={`req-tag ${request.earnings.paymentStatus === 'Prepaid' ? 'tag-success' : 'tag-warning'}`}>
                      <i className="bi bi-credit-card"></i> {request.earnings.paymentStatus}
                    </span>
                    {request.requirements.parkingAvailable && (
                      <span className="req-tag"><i className="bi bi-p-square"></i> Parking</span>
                    )}
                    {request.requirements.petFriendly && (
                      <span className="req-tag"><i className="bi bi-heart"></i> Pet Friendly</span>
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
              ))}
            </div>
          ) : (
            // Detailed View
            <div className="detailed-view">
              <button className="btn-back" onClick={() => setSelectedRequest(null)}>
                <i className="bi bi-arrow-left"></i> Back to Requests
              </button>

              <div className="row">
                <div className="col-lg-8">
                  {/* Earnings Card */}
                  <div className="detail-card earnings-detail-card">
                    <div className="earnings-showcase">
                      <div className="earnings-icon-large">
                        <i className="bi bi-currency-rupee"></i>
                      </div>
                      <div className="earnings-info-large">
                        <h2>Your Total Earnings</h2>
                        <div className="earnings-amount-large">₹{selectedRequest.earnings.yourEarnings}</div>
                        {selectedRequest.earnings.bonus > 0 && (
                          <div className="bonus-info">
                            <i className="bi bi-gift-fill"></i>
                            Includes ₹{selectedRequest.earnings.bonus} bonus for quick acceptance
                          </div>
                        )}
                      </div>
                      <div className="payment-method-badge">
                        <i className={selectedRequest.earnings.paymentStatus === 'Prepaid' ? 'bi bi-check-circle-fill' : 'bi bi-cash'}></i>
                        {selectedRequest.earnings.paymentStatus}
                      </div>
                    </div>
                  </div>

                  {/* Service Details */}
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
                      
                      <div className="details-grid">
                        <div className="detail-box">
                          <i className="bi bi-calendar-check-fill"></i>
                          <div>
                            <label>Service Date</label>
                            <p>{selectedRequest.serviceDate}</p>
                          </div>
                        </div>
                        <div className="detail-box">
                          <i className="bi bi-clock-fill"></i>
                          <div>
                            <label>Time Slot</label>
                            <p>{selectedRequest.serviceTime}</p>
                          </div>
                        </div>
                        <div className="detail-box">
                          <i className="bi bi-hourglass-split"></i>
                          <div>
                            <label>Duration</label>
                            <p>{selectedRequest.duration}</p>
                          </div>
                        </div>
                      </div>

                      <div className="tasks-detail-section">
                        <h5>Tasks to be Completed:</h5>
                        <ul className="tasks-detail-list">
                          {selectedRequest.taskDetails.map((task, index) => (
                            <li key={index}>
                              <i className="bi bi-check-circle-fill"></i>
                              {task}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Customer Details */}
                  <div className="detail-card">
                    <div className="card-header-detail">
                      <i className="bi bi-person-fill"></i>
                      <h3>Customer Information</h3>
                    </div>
                    <div className="card-body-detail">
                      <div className="customer-detail-profile">
                        <img src={selectedRequest.customer.profileImage} alt={selectedRequest.customer.name} />
                        <div className="customer-detail-info">
                          <h4>{selectedRequest.customer.name}</h4>
                          <div className="customer-stats">
                            <span className="rating-badge">
                              <i className="bi bi-star-fill"></i>
                              {selectedRequest.customer.rating}
                            </span>
                            <span className="bookings-badge">
                              {selectedRequest.customer.totalBookings} Total Bookings
                            </span>
                          </div>
                          <a href={`tel:${selectedRequest.customer.phone}`} className="phone-link">
                            <i className="bi bi-telephone-fill"></i>
                            {selectedRequest.customer.phone}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Location Details */}
                  <div className="detail-card">
                    <div className="card-header-detail">
                      <i className="bi bi-geo-alt-fill"></i>
                      <h3>Service Location</h3>
                    </div>
                    <div className="card-body-detail">
                      <div className="location-header">
                        <div className="location-type">
                          <i className="bi bi-building"></i>
                          {selectedRequest.serviceAddress.locationType} - {selectedRequest.serviceAddress.floor}
                        </div>
                        <div className="distance-badge">
                          <i className="bi bi-pin-map-fill"></i>
                          {selectedRequest.serviceAddress.distance} away
                        </div>
                      </div>
                      <div className="address-full">
                        <p>{selectedRequest.serviceAddress.fullAddress}</p>
                      </div>
                      <button className="btn-navigate">
                        <i className="bi bi-navigation-fill"></i>
                        Get Directions
                      </button>
                    </div>
                  </div>

                  {/* Requirements & Instructions */}
                  <div className="detail-card">
                    <div className="card-header-detail">
                      <i className="bi bi-info-circle-fill"></i>
                      <h3>Requirements & Special Instructions</h3>
                    </div>
                    <div className="card-body-detail">
                      <div className="requirements-section">
                        <div className="requirement-item">
                          <i className={`bi ${selectedRequest.requirements.materialsProvided ? 'bi-x-circle-fill text-danger' : 'bi-check-circle-fill text-success'}`}></i>
                          <div>
                            <strong>Materials</strong>
                            <p>{selectedRequest.requirements.materialsProvided ? 'Provided by customer' : 'You need to bring all materials'}</p>
                          </div>
                        </div>
                        {selectedRequest.requirements.specialInstructions && (
                          <div className="special-instructions-box">
                            <i className="bi bi-chat-square-text-fill"></i>
                            <p>{selectedRequest.requirements.specialInstructions}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Payment Breakdown */}
                  <div className="detail-card">
                    <div className="card-header-detail">
                      <i className="bi bi-receipt-cutoff"></i>
                      <h3>Payment Breakdown</h3>
                    </div>
                    <div className="card-body-detail">
                      <div className="payment-breakdown-detail">
                        <div className="payment-row-detail">
                          <span>Service Base Amount</span>
                          <span>₹{selectedRequest.earnings.baseAmount}</span>
                        </div>
                        <div className="payment-row-detail">
                          <span>GST (18%)</span>
                          <span>₹{selectedRequest.earnings.gst}</span>
                        </div>
                        <div className="payment-row-detail total">
                          <span><strong>Total Charged to Customer</strong></span>
                          <span><strong>₹{selectedRequest.earnings.baseAmount + selectedRequest.earnings.gst}</strong></span>
                        </div>
                        <div className="divider-line"></div>
                        <div className="payment-row-detail commission">
                          <span>Platform Commission (10%)</span>
                          <span>-₹{selectedRequest.earnings.platformCommission}</span>
                        </div>
                        {selectedRequest.earnings.bonus > 0 && (
                          <div className="payment-row-detail bonus">
                            <span>Quick Acceptance Bonus</span>
                            <span className="text-success">+₹{selectedRequest.earnings.bonus}</span>
                          </div>
                        )}
                        <div className="payment-row-detail final">
                          <span><strong>Your Final Earnings</strong></span>
                          <span className="final-amount"><strong>₹{selectedRequest.earnings.yourEarnings}</strong></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sidebar Actions */}
                <div className="col-lg-4">
                  <div className="action-sidebar sticky-action">
                    <div className="action-card-detail">
                      <h4>Decision Time</h4>
                      <p className="action-subtitle">Review all details and make your decision</p>
                      
                      <button 
                        className="btn-action-large btn-accept"
                        onClick={() => setShowAcceptModal(true)}
                      >
                        <i className="bi bi-check-circle-fill"></i>
                        Accept Request
                      </button>
                      
                      <button 
                        className="btn-action-large btn-reject"
                        onClick={() => setShowRejectModal(true)}
                      >
                        <i className="bi bi-x-circle-fill"></i>
                        Decline Request
                      </button>

                      <div className="timer-warning">
                        <i className="bi bi-alarm-fill"></i>
                        <p>This request expires in <strong>25 minutes</strong></p>
                      </div>
                    </div>

                    <div className="info-sidebar-card">
                      <h4>Why This Match?</h4>
                      <div className="match-reasons">
                        <div className="match-reason-item">
                          <i className="bi bi-geo-alt"></i>
                          <span>Close to your location</span>
                        </div>
                        <div className="match-reason-item">
                          <i className="bi bi-star"></i>
                          <span>Matches your expertise</span>
                        </div>
                        <div className="match-reason-item">
                          <i className="bi bi-clock"></i>
                          <span>Fits your schedule</span>
                        </div>
                        <div className="match-reason-item">
                          <i className="bi bi-cash"></i>
                          <span>Good earnings potential</span>
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
      {showAcceptModal && (
        <div className="modal-overlay" onClick={() => setShowAcceptModal(false)}>
          <div className="modal-content-custom" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon success">
              <i className="bi bi-check-circle-fill"></i>
            </div>
            <h3>Accept This Request?</h3>
            <p>By accepting, you commit to completing this service on the scheduled date and time. The customer will be notified immediately.</p>
            <div className="modal-highlight">
              <strong>You'll earn: ₹{selectedRequest.earnings.yourEarnings}</strong>
            </div>
            <div className="modal-actions-custom">
              <button className="btn-modal-custom btn-cancel-custom" onClick={() => setShowAcceptModal(false)}>
                Go Back
              </button>
              <button className="btn-modal-custom btn-confirm-custom" onClick={handleAccept}>
                Yes, Accept Request
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
            <p>Please let us know why you're declining this request. This helps us match you better in the future.</p>
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
    </div>
  );
};

export default viewWorkDetails;