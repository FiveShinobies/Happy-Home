import React, { useState } from 'react';
import { Trash2, Plus, Minus, ShoppingCart, Calendar, Clock, MapPin } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom"
const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Deep House Cleaning',
      category: 'Cleaning',
      price: 1200,
      quantity: 1,
      duration: '3-4 hours',
      date: '2025-11-05',
      time: '10:00 AM',
      image: '🏠'
    },
    {
      id: 2,
      name: 'AC Repair & Service',
      category: 'Repair',
      price: 800,
      quantity: 2,
      duration: '2 hours',
      date: '2025-11-06',
      time: '2:00 PM',
      image: '❄️'
    },
    {
      id: 3,
      name: 'Plumbing Service',
      category: 'Plumbing',
      price: 600,
      quantity: 1,
      duration: '1-2 hours',
      date: '2025-11-07',
      time: '11:00 AM',
      image: '🔧'
    }
  ]);

  const updateQuantity = (id, delta) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  const styles = {
    pageBackground: {
      minHeight: '100vh',
      background: '#ffffff',
      padding: '2rem'
    },
    cartCard: {
      borderRadius: '1rem',
      border: '1px solid #e0e0e0',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      transition: 'all 0.3s ease',
      marginBottom: '1rem',
      background: '#ffffff'
    },
    serviceIcon: {
      width: '80px',
      height: '80px',
      background: '#000000',
      borderRadius: '0.75rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '2.5rem',
      flexShrink: 0
    },
    categoryBadge: {
      background: '#1e40af',
      color: '#ffffff',
      padding: '0.25rem 0.75rem',
      borderRadius: '50px',
      fontSize: '0.75rem',
      fontWeight: '600',
      display: 'inline-block',
      marginTop: '0.25rem'
    },
    quantityBtn: {
      width: '36px',
      height: '36px',
      borderRadius: '0.5rem',
      border: '1px solid #1e40af',
      background: '#ffffff',
      color: '#1e40af',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    summaryCard: {
      borderRadius: '1rem',
      border: '1px solid #e0e0e0',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      position: 'sticky',
      top: '2rem',
      background: '#ffffff'
    },
    locationBox: {
      background: '#f8f9fa',
      padding: '1rem',
      borderRadius: '0.75rem',
      marginBottom: '1.5rem',
      border: '1px solid #e0e0e0'
    },
    checkoutBtn: {
      background: '#1e40af',
      border: 'none',
      padding: '1rem',
      borderRadius: '0.75rem',
      fontSize: '1.125rem',
      fontWeight: 'bold',
      transition: 'all 0.3s',
      width: '100%',
      color: '#ffffff'
    },
    trustIndicator: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '0.75rem',
      color: '#666',
      marginBottom: '0.5rem'
    },
    blueDot: {
      width: '6px',
      height: '6px',
      background: '#1e40af',
      borderRadius: '50%'
    }
  };

  return (
    <div style={styles.pageBackground}>
      <div className="container">
        {/* Header */}
        <div className="mb-4">
          <h1 className="display-4 fw-bold mb-2" style={{ color: '#000000' }}>
            <ShoppingCart style={{ color: '#1e40af' }} size={40} className="me-3" />
            Your Service Cart
          </h1>
          <p className="text-muted">Review and schedule your household services</p>
        </div>

        <div className="row">
          {/* Cart Items */}
          <div className="col-lg-8">
            {cartItems.length === 0 ? (
              <div className="card" style={styles.cartCard}>
                <div className="card-body text-center py-5">
                  <ShoppingCart className="text-muted mb-3" size={64} />
                  <h3 className="fw-semibold mb-2" style={{ color: '#000000' }}>Your cart is empty</h3>
                  <p className="text-muted">Add some services to get started!</p>
                </div>
              </div>
            ) : (
              cartItems.map(item => (
                <div key={item.id} className="card" style={styles.cartCard}>
                  <div className="card-body p-4">
                    <div className="d-flex gap-3">
                      {/* Service Icon */}
                      <div style={styles.serviceIcon}>
                        {item.image}
                      </div>

                      {/* Service Details */}
                      <div className="flex-grow-1">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <div>
                            <h3 className="h5 fw-bold mb-1" style={{ color: '#000000' }}>{item.name}</h3>
                            <span style={styles.categoryBadge}>{item.category}</span>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="btn btn-link text-danger p-2"
                            style={{ textDecoration: 'none' }}
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>

                        {/* Schedule Info */}
                        <div className="d-flex flex-wrap gap-3 mb-3 small text-muted">
                          <div className="d-flex align-items-center gap-1">
                            <Calendar size={16} style={{ color: '#1e40af' }} />
                            <span>{item.date}</span>
                          </div>
                          <div className="d-flex align-items-center gap-1">
                            <Clock size={16} style={{ color: '#1e40af' }} />
                            <span>{item.time} • {item.duration}</span>
                          </div>
                        </div>

                        {/* Price & Quantity */}
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="d-flex align-items-center gap-3">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              style={styles.quantityBtn}
                            >
                              <Minus size={16} />
                            </button>
                            <span className="fw-semibold" style={{ width: '30px', textAlign: 'center', color: '#000000' }}>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              style={styles.quantityBtn}
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          <div className="text-end">
                            <div className="h4 fw-bold mb-0" style={{ color: '#1e40af' }}>
                              ₹{(item.price * item.quantity).toLocaleString()}
                            </div>
                            <div className="small text-muted">
                              ₹{item.price} per service
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Summary Card */}
          <div className="col-lg-4">
            <div className="card" style={styles.summaryCard}>
              <div className="card-body p-4">
                <h2 className="h4 fw-bold mb-4" style={{ color: '#000000' }}>Order Summary</h2>

                {/* Service Location */}
                <div style={styles.locationBox}>
                  <div className="d-flex gap-2 small">
                    <MapPin size={18} style={{ color: '#1e40af' }} className="flex-shrink-0 mt-1" />
                    <div>
                      <div className="fw-semibold" style={{ color: '#000000' }}>Service Location</div>
                      <div className="text-muted mt-1">
                        123 Main Street, Apartment 4B<br />
                        Mumbai, Maharashtra 400001
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="mb-4">
                  <div className="d-flex justify-content-between mb-2">
                    <span style={{ color: '#000000' }}>Subtotal</span>
                    <span className="fw-semibold" style={{ color: '#000000' }}>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <span style={{ color: '#000000' }}>Tax (18%)</span>
                    <span className="fw-semibold" style={{ color: '#000000' }}>₹{tax.toLocaleString()}</span>
                  </div>
                  <div className="border-top pt-3">
                    <div className="d-flex justify-content-between h5 mb-0">
                      <span className="fw-bold" style={{ color: '#000000' }}>Total</span>
                      <span className="fw-bold" style={{ color: '#1e40af' }}>₹{total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <Link to="/consumer-home/checkout">
                <button className="btn" style={styles.checkoutBtn}>
                  Proceed to Checkout
                </button>
                </Link>
                {/* Additional Info */}
                <div className="mt-4">
                  <div style={styles.trustIndicator}>
                    <div style={styles.blueDot}></div>
                    <span>Professional & verified service providers</span>
                  </div>
                  <div style={styles.trustIndicator}>
                    <div style={styles.blueDot}></div>
                    <span>100% satisfaction guarantee</span>
                  </div>
                  <div style={styles.trustIndicator}>
                    <div style={styles.blueDot}></div>
                    <span>Free rescheduling available</span>
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

export default Cart;