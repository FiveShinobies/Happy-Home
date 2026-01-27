import React, { useState, useEffect } from 'react';
import { MapPin, User, Phone, Mail, Calendar, Clock, Home, CheckCircle, Lock, Plus, Package, ArrowLeft } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate, useLocation, useParams } from "react-router-dom";

const BookingCheckout = () => {
  const [consumerData, setConsumerData] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  
  // Get serviceId from URL params or location state
  const { serviceId } = useParams();
  const cId = JSON.parse(sessionStorage.getItem('user')).userId;

  // Fetch consumer and service data on component mount
  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        if (!serviceId) {
          alert('Service ID not provided');
          navigate(-1);
          return;
        }

        const response = await axios.get(
          `http://localhost:8080/booking/form/${cId}/${serviceId}`
        );
        console.log('Fetched booking data:', response.data);
        setConsumerData(response.data);
        
        // Set first address as default selected
        if (response.data.addresses && response.data.addresses.length > 0) {
          setSelectedAddress(response.data.addresses[0]);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching booking data:', error);
        alert('Failed to load booking information');
        setLoading(false);
      }
    };

    fetchBookingData();
  }, [serviceId, cId, navigate]);

  // Time slots - only start times
  const timeSlots = [
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '01:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM',
    '06:00 PM'
  ];

  const handleAddAddress = () => {
    // Navigate to add address page or open modal
    alert('Add address functionality - navigate to address form');
    // navigate('/consumer-home/add-address');
  };

const convertToBackendDateTime = (uiTime) => {
  if (!uiTime) return null;

  // 1️⃣ Parse time
  const [time, modifier] = uiTime.split(" ");
  let [hours, minutes] = time.split(":");

  if (modifier === "PM" && hours !== "12") {
    hours = String(Number(hours) + 12);
  }

  if (modifier === "AM" && hours === "12") {
    hours = "00";
  }

  // 2️⃣ Use TODAY's date (or selected date later)
  const now = new Date();
  now.setHours(Number(hours));
  now.setMinutes(Number(minutes));
  now.setSeconds(0);
  now.setMilliseconds(0);

  // 3️⃣ Convert to ISO string
  return now.toISOString(); // ✅ EXACT backend format
};



  const handleRazorpayPayment = async () => {
    try {
      const service = consumerData?.service;
      
      // 1️⃣ Create order on backend
      const res = await axios.post(
        'http://localhost:8080/payments/create-order',
        null,
        {
          params: {
            amount: total,
            currency: 'INR',
            cid: consumerData?.consumer?.cid
          }
        }
      );

      const order = res.data;
      console.log("ORDER FROM BACKEND:", order);
      
      // 2️⃣ Razorpay checkout options
      const options = {
        key: "rzp_test_S7bivnJVMPGoc0",
        order_id: order.id,
        name: "HappyHome",
        description: `${service?.serviceName} - Service Booking`,
        prefill: {
          name: consumerData?.consumer?.name || "",
          email: consumerData?.consumer?.email || "",
          contact: consumerData?.consumer?.phone || ""
        },
        handler: async function (response) {
          console.log("PAYMENT SUCCESS:", response);

          // 3️⃣ Verify payment on backend
          const verifyAndOrderRes = {
            payment: {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            },
            order: {
              consumerId: consumerData?.consumer?.cid,
              serviceId: service?.serviceId,
              timeSlot: convertToBackendDateTime(selectedTimeSlot),
              addressId: selectedAddress?.addressId,
              orderPrice: total,
              priority: isUrgent ? "URGENT" : "NORMAL"
            }
          };

          await axios.post('http://localhost:8080/payments/verify', verifyAndOrderRes);

          alert("Payment successful! Booking confirmed.");
          navigate("/consumer-home/orders");
        },
        theme: {
          color: "#1e40af"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment could not be completed");
    }
  };

  const service = consumerData?.service;
  const subtotal = service?.price || 0;
  const urgentFee = isUrgent ? 200 : 0;
  const subtotalWithFees = subtotal + urgentFee;
  const tax = Math.round(subtotalWithFees * 0.18);
  const total = subtotalWithFees + tax;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedAddress) {
      alert("Please select a service address");
      return;
    }

    if (!selectedTimeSlot) {
      alert("Please select a time slot");
      return;
    }
    
    handleRazorpayPayment();
  };

  const styles = {
    pageBackground: {
      minHeight: '100vh',
      background: '#ffffff',
      padding: '2rem 0'
    },
    header: {
      background: '#ffffff',
      borderBottom: '1px solid #e0e0e0',
      marginBottom: '2rem'
    },
    backBtn: {
      background: 'none',
      border: 'none',
      color: '#1e40af',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 0'
    },
    card: {
      borderRadius: '1rem',
      border: '1px solid #e0e0e0',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      background: '#ffffff',
      marginBottom: '1.5rem'
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
    addressCard: {
      padding: '1rem',
      borderRadius: '0.75rem',
      border: '2px solid #e0e0e0',
      marginBottom: '1rem',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    },
    addressCardSelected: {
      border: '2px solid #1e40af',
      background: '#f0f7ff'
    },
    addAddressBtn: {
      padding: '1rem',
      borderRadius: '0.75rem',
      border: '2px dashed #1e40af',
      background: '#f0f7ff',
      color: '#1e40af',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem'
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
      cursor: 'pointer',
      transition: 'background 0.2s ease'
    },
    infoRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      marginBottom: '0.75rem'
    },
    serviceCard: {
      padding: '1.5rem',
      borderRadius: '1rem',
      border: '2px solid #e0e0e0',
      background: '#ffffff',
      marginBottom: '1.5rem'
    },
    dropdown: {
      borderRadius: '0.5rem',
      border: '2px solid #e0e0e0',
      padding: '0.75rem 1rem',
      fontSize: '1rem',
      width: '100%',
      cursor: 'pointer',
      transition: 'border-color 0.2s ease'
    }
  };

  if (loading) {
    return (
      <div style={styles.pageBackground}>
        <div className="container text-center py-5">
          <div className="spinner-border" style={{ color: '#1e40af' }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading your details...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.pageBackground}>
      {/* Header */}
      <div style={styles.header}>
        <div className="container py-3">
          <button
            style={styles.backBtn}
            onClick={() => navigate(-1)}
            onMouseOver={(e) => e.target.style.color = '#1e3a8a'}
            onMouseOut={(e) => e.target.style.color = '#1e40af'}
          >
            <ArrowLeft size={20} />
            Back
          </button>
        </div>
      </div>

      <div className="container">
        {/* Page Title */}
        <div className="mb-4 text-center">
          <h1 className="display-5 fw-bold mb-2" style={{ color: '#000000' }}>Complete Your Booking</h1>
          <p className="text-muted">Just a few more steps to confirm your service</p>
        </div>

        {/* Center Content */}
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <form onSubmit={handleSubmit}>
              {/* Customer Information */}
              <div className="card" style={styles.card}>
                <div className="card-body p-4">
                  <h2 style={styles.sectionTitle}>
                    <User size={24} style={{ color: '#1e40af' }} />
                    Customer Information
                  </h2>
                  
                  {consumerData?.consumer && (
                    <div>
                      <div style={styles.infoRow}>
                        <User size={18} style={{ color: '#1e40af' }} />
                        <div>
                          <div className="small text-muted">Full Name</div>
                          <div className="fw-semibold" style={{ color: '#000000' }}>
                            {consumerData.consumer.name}
                          </div>
                        </div>
                      </div>
                      
                      <div style={styles.infoRow}>
                        <Mail size={18} style={{ color: '#1e40af' }} />
                        <div>
                          <div className="small text-muted">Email Address</div>
                          <div className="fw-semibold" style={{ color: '#000000' }}>
                            {consumerData.consumer.email}
                          </div>
                        </div>
                      </div>
                      
                      <div style={styles.infoRow}>
                        <Phone size={18} style={{ color: '#1e40af' }} />
                        <div>
                          <div className="small text-muted">Phone Number</div>
                          <div className="fw-semibold" style={{ color: '#000000' }}>
                            {consumerData.consumer.phone}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Service Address */}
              <div className="card" style={styles.card}>
                <div className="card-body p-4">
                  <h2 style={styles.sectionTitle}>
                    <MapPin size={24} style={{ color: '#1e40af' }} />
                    Service Address
                  </h2>
                  
                  {consumerData?.addresses && consumerData.addresses.length > 0 ? (
                    <div>
                      {consumerData.addresses.map((address) => (
                        <div
                          key={address.addressId}
                          style={{
                            ...styles.addressCard,
                            ...(selectedAddress?.addressId === address.addressId ? styles.addressCardSelected : {})
                          }}
                          onClick={() => setSelectedAddress(address)}
                        >
                          <div className="d-flex align-items-start gap-3">
                            <div style={{ 
                              minWidth: '20px',
                              paddingTop: '2px'
                            }}>
                              <input
                                type="radio"
                                name="address"
                                checked={selectedAddress?.addressId === address.addressId}
                                onChange={() => setSelectedAddress(address)}
                                style={{ 
                                  width: '20px', 
                                  height: '20px',
                                  accentColor: '#1e40af',
                                  cursor: 'pointer'
                                }}
                              />
                            </div>
                            <div className="flex-grow-1">
                              <div className="d-flex align-items-center gap-2 mb-2">
                                <Home size={18} style={{ color: '#1e40af' }} />
                                <span className="fw-semibold" style={{ color: '#000000' }}>
                                  Address {address.addressId}
                                </span>
                              </div>
                              <div className="text-muted small">
                                {address.homeNo ? `${address.homeNo}, ` : ''}{address.town}
                                <br />
                                {address.city}, {address.state} - {address.pincode}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {/* Add Address Button */}
                      <button
                        type="button"
                        style={styles.addAddressBtn}
                        onClick={handleAddAddress}
                        onMouseOver={(e) => {
                          e.target.style.background = '#e0f2fe';
                          e.target.style.borderColor = '#0c4a6e';
                        }}
                        onMouseOut={(e) => {
                          e.target.style.background = '#f0f7ff';
                          e.target.style.borderColor = '#1e40af';
                        }}
                      >
                        <Plus size={20} />
                        Add New Address
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="alert alert-warning mb-3" role="alert">
                        <MapPin size={18} className="me-2" />
                        No addresses found. Please add an address to continue.
                      </div>
                      
                      {/* Add Address Button */}
                      <button
                        type="button"
                        style={styles.addAddressBtn}
                        onClick={handleAddAddress}
                      >
                        <Plus size={20} />
                        Add New Address
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Time Slot Selection */}
              <div className="card" style={styles.card}>
                <div className="card-body p-4">
                  <h2 style={styles.sectionTitle}>
                    <Clock size={24} style={{ color: '#1e40af' }} />
                    Select Time Slot
                  </h2>
                  
                  <select
                    style={styles.dropdown}
                    value={selectedTimeSlot}
                    onChange={(e) => setSelectedTimeSlot(e.target.value)}
                    onFocus={(e) => e.target.style.borderColor = '#1e40af'}
                    onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                  >
                    <option value="">Select a time slot</option>
                    {timeSlots.map((slot, index) => (
                      <option key={index} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Priority Selection */}
              <div className="card" style={styles.card}>
                <div className="card-body p-4">
                  <div className="d-flex align-items-start gap-3">
                    <input
                      type="checkbox"
                      id="urgentCheckbox"
                      checked={isUrgent}
                      onChange={(e) => setIsUrgent(e.target.checked)}
                      style={{ 
                        width: '20px', 
                        height: '20px',
                        accentColor: '#1e40af',
                        cursor: 'pointer',
                        marginTop: '2px'
                      }}
                    />
                    <label htmlFor="urgentCheckbox" style={{ cursor: 'pointer', flex: 1 }}>
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <div className="fw-bold mb-1" style={{ color: '#000000' }}>
                            Mark as URGENT
                          </div>
                          <div className="small text-muted">
                            Get priority service with faster response time and immediate scheduling
                          </div>
                        </div>
                        <div className="text-end ms-3">
                          <div className="fw-bold" style={{ color: '#1e40af' }}>
                            +₹200
                          </div>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Service Details - Bottom */}
              <div style={styles.serviceCard}>
                <div className="d-flex align-items-start gap-3 mb-3">
                  <div 
                    style={{
                      width: '80px',
                      height: '80px',
                      background: '#f0f7ff',
                      borderRadius: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Package size={40} style={{ color: '#1e40af', opacity: 0.5 }} />
                  </div>
                  <div className="flex-grow-1">
                    <h4 className="fw-bold mb-1" style={{ color: '#000000' }}>
                      {service?.serviceName || 'Loading...'}
                    </h4>
                    <p className="text-muted small mb-0">
                      {service?.shortDesc || ''}
                    </p>
                    {service?.category && (
                      <span 
                        className="badge mt-2"
                        style={{
                          background: '#f0f7ff',
                          color: '#1e40af',
                          border: '1px solid #1e40af',
                          fontSize: '0.75rem'
                        }}
                      >
                        {service.category}
                      </span>
                    )}
                  </div>
                  <div className="text-end">
                    <div className="h4 fw-bold mb-0" style={{ color: '#1e40af' }}>
                      ₹{service?.price ? service.price.toLocaleString() : '0'}
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="border-top pt-3">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Service Price</span>
                    <span className="fw-semibold" style={{ color: '#000000' }}>
                      ₹{subtotal.toLocaleString()}
                    </span>
                  </div>
                  {isUrgent && (
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">Urgent Priority Fee</span>
                      <span className="fw-semibold" style={{ color: '#1e40af' }}>
                        +₹{urgentFee.toLocaleString()}
                      </span>
                    </div>
                  )}
                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-muted">Tax (18%)</span>
                    <span className="fw-semibold" style={{ color: '#000000' }}>
                      ₹{tax.toLocaleString()}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between pt-3 border-top">
                    <span className="h5 fw-bold mb-0" style={{ color: '#000000' }}>
                      Total Amount
                    </span>
                    <span className="h5 fw-bold mb-0" style={{ color: '#1e40af' }}>
                      ₹{total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Service Guarantee */}
              <div className="card mb-3" style={{...styles.card, background: '#f8f9fa'}}>
                <div className="card-body p-4">
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <CheckCircle size={20} style={{ color: '#1e40af' }} />
                    <span className="fw-bold" style={{ color: '#000000' }}>Service Guarantee</span>
                  </div>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="d-flex align-items-center gap-2">
                        <CheckCircle size={16} style={{ color: '#1e40af' }} />
                        <span className="small text-muted">Verified professionals</span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="d-flex align-items-center gap-2">
                        <CheckCircle size={16} style={{ color: '#1e40af' }} />
                        <span className="small text-muted">100% satisfaction guarantee</span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="d-flex align-items-center gap-2">
                        <CheckCircle size={16} style={{ color: '#1e40af' }} />
                        <span className="small text-muted">Free rescheduling</span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="d-flex align-items-center gap-2">
                        <CheckCircle size={16} style={{ color: '#1e40af' }} />
                        <span className="small text-muted">Secure payment</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Badge */}
              <div className="d-flex align-items-center justify-content-center gap-2 p-3 mb-3 rounded" 
                   style={{ background: '#f8f9fa', border: '1px solid #e0e0e0' }}>
                <Lock size={18} style={{ color: '#1e40af' }} />
                <span className="small text-muted">
                  Your payment information is secure and encrypted
                </span>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                style={styles.submitBtn}
                disabled={!selectedAddress || !selectedTimeSlot}
                onMouseOver={(e) => !e.currentTarget.disabled && (e.currentTarget.style.background = '#1e3a8a')}
                onMouseOut={(e) => e.currentTarget.style.background = '#1e40af'}
              >
                Confirm Booking & Pay ₹{total.toLocaleString()}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCheckout;