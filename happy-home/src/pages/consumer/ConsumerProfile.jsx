import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ConsumerProfile = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+91 98765 43210',
    gender: 'male',
    dateOfBirth: '1990-05-15',
    profileImage: null,
    
    // Address fields
    addresses: [
      {
        id: 1,
        type: 'home',
        label: 'Home',
        addressLine1: '123 Main Street',
        addressLine2: 'Apartment 4B',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001',
        landmark: 'Near Central Mall',
        isDefault: true
      }
    ],
    
    // Preferences
    languagePreference: 'english',
    notifications: {
      email: true,
      sms: true,
      push: true,
      promotional: false
    },
    
    // Wallet & Payment
    walletBalance: 1250.00,
    savedCards: [
      { id: 1, last4: '4242', type: 'Visa', expiry: '12/25' }
    ],
    
    // Service preferences
    favoriteCategories: ['Cleaning', 'Plumbing', 'Electrical'],
    savedProfessionals: []
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationChange = (key) => {
    setProfileData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }));
  };

  const styles = {
    container: {
      backgroundColor: '#ffffff',
      minHeight: '100vh',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    },
    header: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '2.5rem 0',
      marginBottom: '2rem',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    },
    profileCard: {
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
      border: '1px solid #e8e8e8',
      marginBottom: '1.5rem',
      overflow: 'hidden'
    },
    tabButton: {
      backgroundColor: 'transparent',
      border: 'none',
      padding: '1rem 1.5rem',
      color: '#666',
      fontWeight: '500',
      cursor: 'pointer',
      borderBottom: '3px solid transparent',
      transition: 'all 0.3s ease'
    },
    activeTab: {
      color: '#667eea',
      borderBottom: '3px solid #667eea'
    },
    sectionTitle: {
      color: '#1a1a1a',
      fontSize: '1.25rem',
      fontWeight: '600',
      marginBottom: '1.5rem',
      paddingBottom: '0.75rem',
      borderBottom: '2px solid #f0f0f0'
    },
    label: {
      color: '#1a1a1a',
      fontWeight: '500',
      marginBottom: '0.5rem',
      fontSize: '0.9rem'
    },
    input: {
      border: '1.5px solid #e0e0e0',
      borderRadius: '8px',
      padding: '0.75rem',
      fontSize: '0.95rem',
      transition: 'all 0.2s ease'
    },
    editButton: {
      backgroundColor: '#667eea',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: '0.6rem 1.5rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    addressCard: {
      backgroundColor: '#f8f9fa',
      border: '2px solid #e0e0e0',
      borderRadius: '12px',
      padding: '1.25rem',
      marginBottom: '1rem',
      position: 'relative'
    },
    badge: {
      backgroundColor: '#667eea',
      color: 'white',
      padding: '0.25rem 0.75rem',
      borderRadius: '20px',
      fontSize: '0.75rem',
      fontWeight: '500'
    },
    walletCard: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      borderRadius: '16px',
      padding: '2rem',
      marginBottom: '1.5rem'
    },
    statCard: {
      backgroundColor: 'white',
      border: '2px solid #e8e8e8',
      borderRadius: '12px',
      padding: '1.5rem',
      textAlign: 'center',
      transition: 'all 0.3s ease'
    }
  };

  const renderPersonalInfo = () => (
    <div style={{ padding: '2rem' }}>
      <div className="row mb-4">
        <div className="col-12 text-center mb-4">
          <div style={{ 
            width: '120px', 
            height: '120px', 
            borderRadius: '50%', 
            backgroundColor: '#667eea',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3rem',
            fontWeight: '600',
            margin: '0 auto',
            border: '4px solid #f0f0f0'
          }}>
            {profileData.firstName.charAt(0)}
          </div>
          <button 
            className="btn btn-sm mt-3"
            style={{ color: '#667eea', fontWeight: '500' }}
          >
            Change Photo
          </button>
        </div>
      </div>

      <h5 style={styles.sectionTitle}>Basic Information</h5>
      <div className="row g-3">
        <div className="col-md-6">
          <label style={styles.label}>First Name</label>
          <input 
            type="text"
            className="form-control"
            style={styles.input}
            name="firstName"
            value={profileData.firstName}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>
        <div className="col-md-6">
          <label style={styles.label}>Last Name</label>
          <input 
            type="text"
            className="form-control"
            style={styles.input}
            name="lastName"
            value={profileData.lastName}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>
        <div className="col-md-6">
          <label style={styles.label}>Email Address</label>
          <input 
            type="email"
            className="form-control"
            style={styles.input}
            name="email"
            value={profileData.email}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>
        <div className="col-md-6">
          <label style={styles.label}>Phone Number</label>
          <input 
            type="tel"
            className="form-control"
            style={styles.input}
            name="phone"
            value={profileData.phone}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>
        <div className="col-md-6">
          <label style={styles.label}>Gender</label>
          <select 
            className="form-select"
            style={styles.input}
            name="gender"
            value={profileData.gender}
            onChange={handleInputChange}
            disabled={!isEditing}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
          </select>
        </div>
        <div className="col-md-6">
          <label style={styles.label}>Date of Birth</label>
          <input 
            type="date"
            className="form-control"
            style={styles.input}
            name="dateOfBirth"
            value={profileData.dateOfBirth}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>
      </div>

      <div className="mt-4 text-end">
        <button 
          style={styles.editButton}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>
    </div>
  );

  const renderAddresses = () => (
    <div style={{ padding: '2rem' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 style={styles.sectionTitle} className="mb-0">Saved Addresses</h5>
        <button style={styles.editButton}>
          + Add New Address
        </button>
      </div>

      {profileData.addresses.map(address => (
        <div key={address.id} style={styles.addressCard}>
          {address.isDefault && (
            <span style={styles.badge} className="position-absolute top-0 end-0 m-3">
              Default
            </span>
          )}
          <div className="d-flex align-items-start mb-2">
            <div style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '8px', 
              backgroundColor: '#667eea',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '1rem'
            }}>
              <i className="bi bi-house-door-fill"></i>
            </div>
            <div className="flex-grow-1">
              <h6 style={{ color: '#1a1a1a', fontWeight: '600', marginBottom: '0.5rem' }}>
                {address.label}
              </h6>
              <p style={{ color: '#666', marginBottom: '0.25rem', fontSize: '0.9rem' }}>
                {address.addressLine1}, {address.addressLine2}
              </p>
              <p style={{ color: '#666', marginBottom: '0.25rem', fontSize: '0.9rem' }}>
                {address.city}, {address.state} - {address.pincode}
              </p>
              <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '0' }}>
                Landmark: {address.landmark}
              </p>
            </div>
          </div>
          <div className="mt-3 d-flex gap-2">
            <button className="btn btn-sm" style={{ color: '#667eea', fontWeight: '500' }}>
              Edit
            </button>
            <button className="btn btn-sm" style={{ color: '#dc3545', fontWeight: '500' }}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderWalletPayments = () => (
    <div style={{ padding: '2rem' }}>
      <div style={styles.walletCard}>
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <p style={{ opacity: 0.9, marginBottom: '0.5rem', fontSize: '0.9rem' }}>
              Available Balance
            </p>
            <h2 style={{ fontWeight: '700', marginBottom: '0' }}>
              ₹{profileData.walletBalance.toFixed(2)}
            </h2>
          </div>
          <div style={{ 
            backgroundColor: 'rgba(255,255,255,0.2)', 
            padding: '0.5rem 1rem', 
            borderRadius: '8px',
            fontWeight: '500'
          }}>
            Wallet
          </div>
        </div>
        <button 
          className="btn btn-light mt-3"
          style={{ fontWeight: '500', borderRadius: '8px' }}
        >
          + Add Money
        </button>
      </div>

      <h5 style={styles.sectionTitle}>Saved Payment Methods</h5>
      
      {profileData.savedCards.map(card => (
        <div key={card.id} style={styles.addressCard} className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <div style={{ 
              width: '50px', 
              height: '35px', 
              borderRadius: '6px', 
              backgroundColor: '#1a1a1a',
              marginRight: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: '600',
              fontSize: '0.75rem'
            }}>
              {card.type}
            </div>
            <div>
              <p style={{ marginBottom: '0.25rem', fontWeight: '600', color: '#1a1a1a' }}>
                •••• {card.last4}
              </p>
              <p style={{ marginBottom: 0, fontSize: '0.85rem', color: '#666' }}>
                Expires {card.expiry}
              </p>
            </div>
          </div>
          <button className="btn btn-sm" style={{ color: '#dc3545' }}>
            Remove
          </button>
        </div>
      ))}

      <button 
        className="btn btn-outline-primary mt-3"
        style={{ borderRadius: '8px', borderColor: '#667eea', color: '#667eea', fontWeight: '500' }}
      >
        + Add New Card
      </button>
    </div>
  );

  const renderPreferences = () => (
    <div style={{ padding: '2rem' }}>
      <h5 style={styles.sectionTitle}>Notification Settings</h5>
      
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3 p-3" style={{ backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <div>
            <p style={{ marginBottom: '0.25rem', fontWeight: '600', color: '#1a1a1a' }}>Email Notifications</p>
            <p style={{ marginBottom: 0, fontSize: '0.85rem', color: '#666' }}>Receive booking updates via email</p>
          </div>
          <div className="form-check form-switch">
            <input 
              className="form-check-input" 
              type="checkbox" 
              checked={profileData.notifications.email}
              onChange={() => handleNotificationChange('email')}
              style={{ cursor: 'pointer', width: '3rem', height: '1.5rem' }}
            />
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3 p-3" style={{ backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <div>
            <p style={{ marginBottom: '0.25rem', fontWeight: '600', color: '#1a1a1a' }}>SMS Notifications</p>
            <p style={{ marginBottom: 0, fontSize: '0.85rem', color: '#666' }}>Get service updates via SMS</p>
          </div>
          <div className="form-check form-switch">
            <input 
              className="form-check-input" 
              type="checkbox" 
              checked={profileData.notifications.sms}
              onChange={() => handleNotificationChange('sms')}
              style={{ cursor: 'pointer', width: '3rem', height: '1.5rem' }}
            />
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3 p-3" style={{ backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <div>
            <p style={{ marginBottom: '0.25rem', fontWeight: '600', color: '#1a1a1a' }}>Push Notifications</p>
            <p style={{ marginBottom: 0, fontSize: '0.85rem', color: '#666' }}>Receive app notifications</p>
          </div>
          <div className="form-check form-switch">
            <input 
              className="form-check-input" 
              type="checkbox" 
              checked={profileData.notifications.push}
              onChange={() => handleNotificationChange('push')}
              style={{ cursor: 'pointer', width: '3rem', height: '1.5rem' }}
            />
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3 p-3" style={{ backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <div>
            <p style={{ marginBottom: '0.25rem', fontWeight: '600', color: '#1a1a1a' }}>Promotional Offers</p>
            <p style={{ marginBottom: 0, fontSize: '0.85rem', color: '#666' }}>Receive deals and discounts</p>
          </div>
          <div className="form-check form-switch">
            <input 
              className="form-check-input" 
              type="checkbox" 
              checked={profileData.notifications.promotional}
              onChange={() => handleNotificationChange('promotional')}
              style={{ cursor: 'pointer', width: '3rem', height: '1.5rem' }}
            />
          </div>
        </div>
      </div>

      <h5 style={styles.sectionTitle}>Language Preference</h5>
      <select 
        className="form-select mb-4"
        style={styles.input}
        name="languagePreference"
        value={profileData.languagePreference}
        onChange={handleInputChange}
      >
        <option value="english">English</option>
        <option value="hindi">Hindi</option>
        <option value="marathi">Marathi</option>
        <option value="tamil">Tamil</option>
        <option value="telugu">Telugu</option>
      </select>

      <h5 style={styles.sectionTitle}>Favorite Service Categories</h5>
      <div className="d-flex flex-wrap gap-2">
        {profileData.favoriteCategories.map((category, index) => (
          <span 
            key={index}
            style={{
              backgroundColor: '#667eea',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              fontSize: '0.9rem',
              fontWeight: '500'
            }}
          >
            {category}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div className="container">
          <h1 style={{ fontWeight: '700', marginBottom: '0.5rem' }}>My Profile</h1>
          <p style={{ opacity: 0.9, marginBottom: 0 }}>Manage your account and preferences</p>
        </div>
      </div>

      <div className="container pb-5">
        <div className="row">
          <div className="col-lg-3 mb-4">
            <div style={styles.statCard}>
              <h3 style={{ color: '#667eea', fontWeight: '700', marginBottom: '0.5rem' }}>24</h3>
              <p style={{ color: '#666', marginBottom: 0, fontSize: '0.9rem' }}>Total Bookings</p>
            </div>
          </div>
          <div className="col-lg-3 mb-4">
            <div style={styles.statCard}>
              <h3 style={{ color: '#667eea', fontWeight: '700', marginBottom: '0.5rem' }}>3</h3>
              <p style={{ color: '#666', marginBottom: 0, fontSize: '0.9rem' }}>Active Services</p>
            </div>
          </div>
          <div className="col-lg-3 mb-4">
            <div style={styles.statCard}>
              <h3 style={{ color: '#667eea', fontWeight: '700', marginBottom: '0.5rem' }}>₹12.5K</h3>
              <p style={{ color: '#666', marginBottom: 0, fontSize: '0.9rem' }}>Total Spent</p>
            </div>
          </div>
          <div className="col-lg-3 mb-4">
            <div style={styles.statCard}>
              <h3 style={{ color: '#667eea', fontWeight: '700', marginBottom: '0.5rem' }}>4.8★</h3>
              <p style={{ color: '#666', marginBottom: 0, fontSize: '0.9rem' }}>Avg Rating Given</p>
            </div>
          </div>
        </div>

        <div style={styles.profileCard}>
          <div className="d-flex border-bottom">
            <button 
              style={{
                ...styles.tabButton,
                ...(activeTab === 'personal' ? styles.activeTab : {})
              }}
              onClick={() => setActiveTab('personal')}
            >
              Personal Info
            </button>
            <button 
              style={{
                ...styles.tabButton,
                ...(activeTab === 'addresses' ? styles.activeTab : {})
              }}
              onClick={() => setActiveTab('addresses')}
            >
              Addresses
            </button>
            <button 
              style={{
                ...styles.tabButton,
                ...(activeTab === 'wallet' ? styles.activeTab : {})
              }}
              onClick={() => setActiveTab('wallet')}
            >
              Wallet & Payments
            </button>
            <button 
              style={{
                ...styles.tabButton,
                ...(activeTab === 'preferences' ? styles.activeTab : {})
              }}
              onClick={() => setActiveTab('preferences')}
            >
              Preferences
            </button>
          </div>

          {activeTab === 'personal' && renderPersonalInfo()}
          {activeTab === 'addresses' && renderAddresses()}
          {activeTab === 'wallet' && renderWalletPayments()}
          {activeTab === 'preferences' && renderPreferences()}
        </div>
      </div>
    </div>
  );
};
  
export default ConsumerProfile;