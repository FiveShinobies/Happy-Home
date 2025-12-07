import React, { useState } from 'react';
import './ViewFeedback.css';

const ViewFeedback = () => {
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const feedbackData = [
    {
      id: 'FB001',
      type: 'Customer',
      name: 'Priya Sharma',
      email: 'priya@email.com',
      rating: 5,
      subject: 'Excellent Service',
      message: 'The cleaning service was outstanding. Very professional and thorough work.',
      date: '2024-12-05',
      status: 'Resolved'
    },
    {
      id: 'FB002',
      type: 'Vendor',
      name: 'Rajesh Kumar',
      email: 'rajesh@email.com',
      rating: 4,
      subject: 'App Performance Issue',
      message: 'Sometimes the app takes time to load order details. Please fix this issue.',
      date: '2024-12-04',
      status: 'Pending'
    },
    {
      id: 'FB003',
      type: 'Customer',
      name: 'Amit Patel',
      email: 'amit@email.com',
      rating: 3,
      subject: 'Late Service',
      message: 'The vendor arrived 30 minutes late. Service quality was good though.',
      date: '2024-12-03',
      status: 'In Progress'
    },
    {
      id: 'FB004',
      type: 'Vendor',
      name: 'Sneha Reddy',
      email: 'sneha@email.com',
      rating: 5,
      subject: 'Great Platform',
      message: 'Easy to use platform. Getting good number of requests daily.',
      date: '2024-12-02',
      status: 'Resolved'
    },
    {
      id: 'FB005',
      type: 'Customer',
      name: 'Vikram Singh',
      email: 'vikram@email.com',
      rating: 2,
      subject: 'Payment Issue',
      message: 'Payment was deducted twice from my account. Need immediate refund.',
      date: '2024-12-01',
      status: 'Pending'
    }
  ];

  const filteredFeedback = feedbackData.filter(feedback => {
    const matchesType = filterType === 'all' || feedback.type === filterType;
    const matchesSearch = feedback.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         feedback.subject.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getStatusClass = (status) => {
    const statusMap = {
      'Resolved': 'status-resolved',
      'Pending': 'status-pending',
      'In Progress': 'status-progress'
    };
    return statusMap[status] || 'status-pending';
  };

  const renderStars = (rating) => {
    return (
      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <i key={star} className={`bi bi-star${star <= rating ? '-fill' : ''}`}></i>
        ))}
      </div>
    );
  };

  return (
    <div className="feedback-container">
      {/* Header */}
      <div className="feedback-header">
        <div className="container">
          <h1>Feedback Management</h1>
          <p>View and manage all customer and vendor feedback</p>
        </div>
      </div>

      {/* Filters */}
      <div className="feedback-controls">
        <div className="container">
          <div className="controls-wrapper">
            <div className="filter-tabs">
              <button 
                className={`tab-btn ${filterType === 'all' ? 'active' : ''}`}
                onClick={() => setFilterType('all')}
              >
                All Feedback ({feedbackData.length})
              </button>
              <button 
                className={`tab-btn ${filterType === 'Customer' ? 'active' : ''}`}
                onClick={() => setFilterType('Customer')}
              >
                Customers ({feedbackData.filter(f => f.type === 'Customer').length})
              </button>
              <button 
                className={`tab-btn ${filterType === 'Vendor' ? 'active' : ''}`}
                onClick={() => setFilterType('Vendor')}
              >
                Vendors ({feedbackData.filter(f => f.type === 'Vendor').length})
              </button>
            </div>
            <div className="search-box">
              <i className="bi bi-search"></i>
              <input 
                type="text" 
                placeholder="Search by name or subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Feedback List */}
      <div className="feedback-content">
        <div className="container">
          <div className="feedback-grid">
            {filteredFeedback.map((feedback) => (
              <div key={feedback.id} className="feedback-card">
                <div className="feedback-card-header">
                  <div className="user-info">
                    <div className="user-avatar">
                      {feedback.name.charAt(0)}
                    </div>
                    <div className="user-details">
                      <h3>{feedback.name}</h3>
                      <span className={`type-badge ${feedback.type.toLowerCase()}`}>
                        {feedback.type}
                      </span>
                    </div>
                  </div>
                  <div className="feedback-meta">
                    {renderStars(feedback.rating)}
                    <span className="feedback-date">{feedback.date}</span>
                  </div>
                </div>

                <div className="feedback-body">
                  <h4>{feedback.subject}</h4>
                  <p>{feedback.message}</p>
                </div>

                <div className="feedback-footer">
                  <span className={`status-badge ${getStatusClass(feedback.status)}`}>
                    {feedback.status}
                  </span>
                  <div className="feedback-actions">
                    <button className="action-btn view-btn">
                      <i className="bi bi-eye"></i> View
                    </button>
                    <button className="action-btn reply-btn">
                      <i className="bi bi-reply"></i> Reply
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredFeedback.length === 0 && (
            <div className="no-feedback">
              <i className="bi bi-inbox"></i>
              <h3>No Feedback Found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewFeedback;