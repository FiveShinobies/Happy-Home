import React, { useState } from 'react';
import { CreditCard, MapPin, User, Phone, Mail, Calendar, Clock, Home, CheckCircle, Lock } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';

const BookingCheckout = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    apartmentType: 'apartment',
    specialInstructions: '',
    paymentMethod: 'card',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  const [activeStep, setActiveStep] = useState(1);

  const orderSummary = [
    { name: 'Deep House Cleaning', quantity: 1, price: 1200, date: '2025-11-05', time: '10:00 AM' },
    { name: 'AC Repair & Service', quantity: 2, price: 1600, date: '2025-11-06', time: '2:00 PM' },
    { name: 'Plumbing Service', quantity: 1, price: 600, date: '2025-11-07', time: '11:00 AM' }
  ];

  const subtotal = 3400;
  const tax = 612;
  const total = 4012;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Booking confirmed! You will receive a confirmation email shortly.');
  };

  const styles = {
    pageBackground: {
      minHeight: '100vh',
      background: '#ffffff',
      padding: '2rem'
    },
    card: {
      borderRadius: '1rem',
      border: '1px solid #e0e0e0',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      background: '#ffffff',
      marginBottom: '1.5rem'
    },
    stepIndicator: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      marginBottom: '2rem'
    },
    step: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      flex: 1
    },
    stepCircle: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      fontSize: '0.875rem'
    },
    stepCircleActive: {
      background: '#1e40af',
      color: '#ffffff'
    },
    stepCircleInactive: {
      background: '#e0e0e0',
      color: '#666666'
    },
    stepLine: {
      flex: 1,
      height: '2px',
      background: '#e0e0e0'
    },
    sectionTitle: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      color: '#000000'
    },
    input: {
      borderRadius: '0.5rem',
      border: '1px solid #d0d0d0',
      padding: '0.75rem'
    },
    submitBtn: {
      background: '#1e40af',
      border: 'none',
      padding: '1rem',
      borderRadius: '0.75rem',
      fontSize: '1.125rem',
      fontWeight: 'bold',
      color: '#ffffff',
      width: '100%',
      cursor: 'pointer'
    },
    orderItem: {
      padding: '1rem',
      borderBottom: '1px solid #e0e0e0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'start'
    },
    securityBadge: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.75rem',
      background: '#f8f9fa',
      borderRadius: '0.5rem',
      fontSize: '0.875rem',
      marginTop: '1rem',
      border: '1px solid #e0e0e0'
    }
  };

  return (
    <div style={styles.pageBackground}>
      <div className="container">
        {/* Header */}
        <div className="mb-4">
          <h1 className="display-5 fw-bold mb-2" style={{ color: '#000000' }}>Complete Your Booking</h1>
          <p className="text-muted">Just a few more steps to confirm your service</p>
        </div>

        {/* Progress Steps */}
        <div style={styles.stepIndicator}>
          <div style={styles.step}>
            <div style={{...styles.stepCircle, ...styles.stepCircleActive}}>
              <CheckCircle size={20} />
            </div>
            <span className="fw-semibold small" style={{ color: '#000000' }}>Cart</span>
          </div>
          <div style={styles.stepLine}></div>
          <div style={styles.step}>
            <div style={{...styles.stepCircle, ...styles.stepCircleActive}}>2</div>
            <span className="fw-semibold small" style={{ color: '#000000' }}>Details</span>
          </div>
          <div style={styles.stepLine}></div>
          <div style={styles.step}>
            <div style={{...styles.stepCircle, ...styles.stepCircleInactive}}>3</div>
            <span className="text-muted small">Confirm</span>
          </div>
        </div>

        <div className="row">
          {/* Left Column - Forms */}
          <div className="col-lg-8">
            <form onSubmit={handleSubmit}>
              {/* Personal Information */}
              <div className="card" style={styles.card}>
                <div className="card-body p-4">
                  <h2 style={styles.sectionTitle}>
                    <User size={24} style={{ color: '#1e40af' }} />
                    Personal Information
                  </h2>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold" style={{ color: '#000000' }}>Full Name *</label>
                      <input
                        type="text"
                        name="fullName"
                        className="form-control"
                        style={styles.input}
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold" style={{ color: '#000000' }}>Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        className="form-control"
                        style={styles.input}
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-semibold" style={{ color: '#000000' }}>Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        style={styles.input}
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="john.doe@example.com"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Address */}
              <div className="card" style={styles.card}>
                <div className="card-body p-4">
                  <h2 style={styles.sectionTitle}>
                    <MapPin size={24} style={{ color: '#1e40af' }} />
                    Service Address
                  </h2>
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label fw-semibold" style={{ color: '#000000' }}>Street Address *</label>
                      <input
                        type="text"
                        name="address"
                        className="form-control"
                        style={styles.input}
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        placeholder="123 Main Street, Apartment 4B"
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-semibold" style={{ color: '#000000' }}>City *</label>
                      <input
                        type="text"
                        name="city"
                        className="form-control"
                        style={styles.input}
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        placeholder="Mumbai"
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-semibold" style={{ color: '#000000' }}>State *</label>
                      <input
                        type="text"
                        name="state"
                        className="form-control"
                        style={styles.input}
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        placeholder="Maharashtra"
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-semibold" style={{ color: '#000000' }}>Pincode *</label>
                      <input
                        type="text"
                        name="pincode"
                        className="form-control"
                        style={styles.input}
                        value={formData.pincode}
                        onChange={handleInputChange}
                        required
                        placeholder="400001"
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-semibold" style={{ color: '#000000' }}>Property Type *</label>
                      <select
                        name="apartmentType"
                        className="form-select"
                        style={styles.input}
                        value={formData.apartmentType}
                        onChange={handleInputChange}
                      >
                        <option value="apartment">Apartment</option>
                        <option value="house">Independent House</option>
                        <option value="villa">Villa</option>
                        <option value="office">Office</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-semibold" style={{ color: '#000000' }}>Special Instructions (Optional)</label>
                      <textarea
                        name="specialInstructions"
                        className="form-control"
                        style={styles.input}
                        rows="3"
                        value={formData.specialInstructions}
                        onChange={handleInputChange}
                        placeholder="Any specific instructions for the service provider..."
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="card" style={styles.card}>
                <div className="card-body p-4">
                  <h2 style={styles.sectionTitle}>
                    <CreditCard size={24} style={{ color: '#1e40af' }} />
                    Payment Method
                  </h2>
                  
                  {/* Payment Options */}
                  <div className="mb-4">
                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="paymentMethod"
                        id="card"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={handleInputChange}
                        style={{ borderColor: '#1e40af' }}
                      />
                      <label className="form-check-label fw-semibold" htmlFor="card" style={{ color: '#000000' }}>
                        Credit / Debit Card
                      </label>
                    </div>
                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="paymentMethod"
                        id="upi"
                        value="upi"
                        checked={formData.paymentMethod === 'upi'}
                        onChange={handleInputChange}
                        style={{ borderColor: '#1e40af' }}
                      />
                      <label className="form-check-label fw-semibold" htmlFor="upi" style={{ color: '#000000' }}>
                        UPI Payment
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="paymentMethod"
                        id="cod"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={handleInputChange}
                        style={{ borderColor: '#1e40af' }}
                      />
                      <label className="form-check-label fw-semibold" htmlFor="cod" style={{ color: '#000000' }}>
                        Cash on Service
                      </label>
                    </div>
                  </div>

                  {/* Card Details (shown only if card is selected) */}
                  {formData.paymentMethod === 'card' && (
                    <div className="row g-3">
                      <div className="col-12">
                        <label className="form-label fw-semibold" style={{ color: '#000000' }}>Card Number *</label>
                        <input
                          type="text"
                          name="cardNumber"
                          className="form-control"
                          style={styles.input}
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          required
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label fw-semibold" style={{ color: '#000000' }}>Cardholder Name *</label>
                        <input
                          type="text"
                          name="cardName"
                          className="form-control"
                          style={styles.input}
                          value={formData.cardName}
                          onChange={handleInputChange}
                          required
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold" style={{ color: '#000000' }}>Expiry Date *</label>
                        <input
                          type="text"
                          name="expiryDate"
                          className="form-control"
                          style={styles.input}
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          required
                          placeholder="MM/YY"
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold" style={{ color: '#000000' }}>CVV *</label>
                        <input
                          type="text"
                          name="cvv"
                          className="form-control"
                          style={styles.input}
                          value={formData.cvv}
                          onChange={handleInputChange}
                          required
                          placeholder="123"
                        />
                      </div>
                    </div>
                  )}

                  <div style={styles.securityBadge}>
                    <Lock size={18} style={{ color: '#1e40af' }} />
                    <span className="text-muted">Your payment information is secure and encrypted</span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button type="submit" style={styles.submitBtn}>
                Confirm Booking & Pay ₹{total.toLocaleString()}
              </button>
            </form>
          </div>

          {/* Right Column - Order Summary */}
          <div className="col-lg-4">
            <div className="card" style={{...styles.card, position: 'sticky', top: '2rem'}}>
              <div className="card-body p-4">
                <h2 className="h5 fw-bold mb-4" style={{ color: '#000000' }}>Order Summary</h2>

                {/* Order Items */}
                <div className="mb-3">
                  {orderSummary.map((item, index) => (
                    <div key={index} style={styles.orderItem}>
                      <div className="flex-grow-1">
                        <div className="fw-semibold" style={{ color: '#000000' }}>{item.name}</div>
                        <div className="small text-muted mt-1">
                          <Calendar size={14} className="me-1" style={{ color: '#1e40af' }} />
                          {item.date} at {item.time}
                        </div>
                        <div className="small text-muted">Qty: {item.quantity}</div>
                      </div>
                      <div className="fw-semibold" style={{ color: '#000000' }}>₹{item.price.toLocaleString()}</div>
                    </div>
                  ))}
                </div>

                {/* Price Summary */}
                <div className="border-top pt-3">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Subtotal</span>
                    <span className="fw-semibold" style={{ color: '#000000' }}>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-muted">Tax (18%)</span>
                    <span className="fw-semibold" style={{ color: '#000000' }}>₹{tax.toLocaleString()}</span>
                  </div>
                  <div className="d-flex justify-content-between h5 mb-0">
                    <span className="fw-bold" style={{ color: '#000000' }}>Total</span>
                    <span className="fw-bold" style={{ color: '#1e40af' }}>₹{total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Service Guarantee */}
                <div className="mt-4 p-3 rounded" style={{ background: '#f8f9fa', border: '1px solid #e0e0e0' }}>
                  <div className="small">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <CheckCircle size={16} style={{ color: '#1e40af' }} />
                      <span className="fw-semibold" style={{ color: '#000000' }}>Service Guarantee</span>
                    </div>
                    <ul className="small text-muted mb-0 ps-4">
                      <li>Verified professionals</li>
                      <li>100% satisfaction guarantee</li>
                      <li>Free rescheduling</li>
                      <li>Secure payment</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCheckout;