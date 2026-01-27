import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-toastify/dist/ReactToastify.css';

const ConsumerProfile = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Consumer ID - Replace with actual from auth context or route params
  const consumerId = 1;

  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    dob: '',
    userStatus: '',
    rewardPoints: 0,
    address: [],
    languages: []
  });

  const [editData, setEditData] = useState({ ...profileData });

  // Fetch consumer profile data
  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8080/admin/consumer/${consumerId}`);
      const data = await response.json();
      console.log("Consumer Profile Response", data);
      
      // Ensure address is always an array
      if (!data.address) {
        data.address = [];
      } else if (!Array.isArray(data.address)) {
        data.address = [data.address];
      }
      
      setProfileData(data);
      setEditData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching profile data:', error);
      toast.error('Failed to load profile data');
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = async () => {
    try {
      const updatePayload = {
        firstName: editData.firstName,
        lastName: editData.lastName,
        email: editData.email,
        phone: editData.phone,
        password: editData.password || "pass",
        dob: editData.dob,
        userStatus: editData.userStatus,
        languages: editData.languages || [],
        rewardPoints: editData.rewardPoints || 0,
        address: editData.address || []
      };

      const response = await fetch(
        `http://localhost:8080/consumer/${consumerId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatePayload)
        }
      );

      if (!response.ok) throw new Error('Update failed');

      setProfileData({ ...editData });
      setIsEditing(false);
      toast.success('Profile updated successfully!');
      fetchProfileData();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  const handleCancelEdit = () => {
    setEditData({ ...profileData });
    setIsEditing(false);
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    if (newPassword.length < 4) {
      toast.error('Password must be at least 4 characters long');
      return;
    }

    try {
      const updatePayload = {
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        email: profileData.email,
        phone: profileData.phone,
        password: newPassword,
        dob: profileData.dob,
        userStatus: profileData.userStatus,
        languages: profileData.languages || [],
        rewardPoints: profileData.rewardPoints || 0,
        address: profileData.address || []
      };

      const response = await fetch(
        `http://localhost:8080/consumer/${consumerId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatePayload)
        }
      );

      if (!response.ok) throw new Error('Password change failed');

      toast.success('Password changed successfully!');
      setShowPasswordChange(false);
      setNewPassword('');
      setConfirmPassword('');
      fetchProfileData();
    } catch (error) {
      console.error('Error changing password:', error);
      toast.error('Failed to change password');
    }
  };

  const displayData = isEditing ? editData : profileData;

  const styles = {
    container: {
      backgroundColor: '#ffffff',
      minHeight: '100vh'
    },
    header: {
      background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
      color: 'white',
      padding: '2.5rem 0',
      marginBottom: '2rem',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    },
    profileCard: {
      backgroundColor: 'white',
      borderRadius: '1rem',
      boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
      border: '1px solid #e5e7eb',
      marginBottom: '1.5rem',
      overflow: 'hidden'
    },
    tabButton: {
      backgroundColor: 'transparent',
      border: 'none',
      padding: '1rem 1.5rem',
      color: '#6b7280',
      fontWeight: '500',
      cursor: 'pointer',
      borderBottom: '3px solid transparent',
      transition: 'all 0.3s ease'
    },
    activeTab: {
      color: '#1e40af',
      borderBottom: '3px solid #1e40af'
    },
    sectionTitle: {
      color: '#000000',
      fontSize: '1.25rem',
      fontWeight: '600',
      marginBottom: '1.5rem',
      paddingBottom: '0.75rem',
      borderBottom: '2px solid #f0f0f0'
    },
    label: {
      color: '#000000',
      fontWeight: '500',
      marginBottom: '0.5rem',
      fontSize: '0.9rem'
    },
    input: {
      border: '1.5px solid #d1d5db',
      borderRadius: '0.5rem',
      padding: '0.75rem',
      fontSize: '0.95rem',
      width: '100%'
    },
    displayValue: {
      padding: '0.75rem',
      background: '#f9fafb',
      borderRadius: '0.5rem',
      color: '#000000',
      minHeight: '48px',
      display: 'flex',
      alignItems: 'center'
    },
    editButton: {
      backgroundColor: '#1e40af',
      color: 'white',
      border: 'none',
      borderRadius: '0.5rem',
      padding: '0.6rem 1.5rem',
      fontWeight: '500',
      cursor: 'pointer'
    },
    addressCard: {
      backgroundColor: '#f8f9fa',
      border: '2px solid #e5e7eb',
      borderRadius: '0.75rem',
      padding: '1.25rem',
      marginBottom: '1rem'
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const renderPersonalInfo = () => {
    const fullName = `${displayData.firstName || ''} ${displayData.lastName || ''}`.trim();
    const initials = `${displayData.firstName?.[0] || ''}${displayData.lastName?.[0] || ''}`.toUpperCase();

    return (
      <div style={{ padding: '2rem' }}>
        <div className="row mb-4">
          <div className="col-12 text-center mb-4">
            <div style={{ 
              width: '120px', 
              height: '120px', 
              borderRadius: '50%', 
              backgroundColor: '#1e40af',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '3rem',
              fontWeight: '600',
              margin: '0 auto',
              border: '4px solid #f0f0f0'
            }}>
              {initials || 'U'}
            </div>
          </div>
        </div>

        <h5 style={styles.sectionTitle}>Basic Information</h5>
        <div className="row g-3">
          <div className="col-md-6">
            <label style={styles.label}>First Name</label>
            {isEditing ? (
              <input 
                type="text"
                style={styles.input}
                value={displayData.firstName || ''}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
              />
            ) : (
              <div style={styles.displayValue}>{displayData.firstName || 'N/A'}</div>
            )}
          </div>

          <div className="col-md-6">
            <label style={styles.label}>Last Name</label>
            {isEditing ? (
              <input 
                type="text"
                style={styles.input}
                value={displayData.lastName || ''}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
              />
            ) : (
              <div style={styles.displayValue}>{displayData.lastName || 'N/A'}</div>
            )}
          </div>
          
          <div className="col-md-6">
            <label style={styles.label}>Email Address</label>
            {isEditing ? (
              <input 
                type="email"
                style={styles.input}
                value={displayData.email || ''}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
            ) : (
              <div style={styles.displayValue}>{displayData.email || 'N/A'}</div>
            )}
          </div>
          
          <div className="col-md-6">
            <label style={styles.label}>Phone Number</label>
            {isEditing ? (
              <input 
                type="tel"
                style={styles.input}
                value={displayData.phone || ''}
                onChange={(e) => handleInputChange('phone', e.target.value)}
              />
            ) : (
              <div style={styles.displayValue}>{displayData.phone || 'N/A'}</div>
            )}
          </div>

          <div className="col-md-6">
            <label style={styles.label}>Date of Birth</label>
            <div style={styles.displayValue}>{displayData.dob || 'N/A'}</div>
          </div>

          <div className="col-md-6">
            <label style={styles.label}>Reward Points</label>
            <div style={styles.displayValue}>
              <i className="bi bi-star-fill text-warning me-2"></i>
              {displayData.rewardPoints || 0} points
            </div>
          </div>

          <div className="col-12">
            <label style={styles.label}>Account Status</label>
            <div style={styles.displayValue}>
              <span className={`badge ${displayData.userStatus === 'ACTIVE' ? 'bg-success' : 'bg-secondary'}`}>
                {displayData.userStatus || 'INACTIVE'}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 text-end">
          {!isEditing ? (
            <button 
              style={styles.editButton}
              onClick={() => setIsEditing(true)}
            >
              <i className="bi bi-pencil-square me-2"></i>
              Edit Profile
            </button>
          ) : (
            <div className="d-flex gap-2 justify-content-end">
              <button 
                className="btn btn-success"
                onClick={handleSaveProfile}
              >
                <i className="bi bi-check-lg me-2"></i>
                Save Changes
              </button>
              <button 
                className="btn btn-outline-secondary"
                onClick={handleCancelEdit}
              >
                <i className="bi bi-x-lg me-2"></i>
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderAddress = () => (
    <div style={{ padding: '2rem' }}>
      <div className="mb-4">
        <h5 style={styles.sectionTitle} className="mb-0">My Addresses</h5>
      </div>

      {!profileData.address || profileData.address.length === 0 ? (
        <div className="text-center py-5">
          <i className="bi bi-house-door" style={{ fontSize: '3rem', color: '#d1d5db' }}></i>
          <p className="text-muted mt-3">No addresses saved</p>
        </div>
      ) : (
        <div className="row g-3">
          {profileData.address.map((addr, index) => (
            <div key={index} className="col-md-6">
              <div style={styles.addressCard}>
                <div className="d-flex align-items-start">
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '0.5rem', 
                    backgroundColor: '#1e40af',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '1rem'
                  }}>
                    <i className="bi bi-house-door-fill"></i>
                  </div>
                  <div className="flex-grow-1">
                    <h6 style={{ color: '#000000', fontWeight: '600', marginBottom: '0.5rem' }}>
                      Address {index + 1}
                    </h6>
                    {addr.homeNo && (
                      <p style={{ color: '#666', marginBottom: '0.25rem', fontSize: '0.9rem' }}>
                        {addr.homeNo}
                      </p>
                    )}
                    <p style={{ color: '#666', marginBottom: '0.25rem', fontSize: '0.9rem' }}>
                      {addr.town}
                    </p>
                    <p style={{ color: '#666', marginBottom: '0', fontSize: '0.9rem' }}>
                      {addr.city}, {addr.state} - {addr.pincode}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderPreferences = () => {
    return (
      <div style={{ padding: '2rem' }}>
        <h5 style={styles.sectionTitle}>Account Settings</h5>
        
        <div className="mt-4">
          <h6 className="fw-bold mb-3" style={{ color: '#000000' }}>Security</h6>
          
          {!showPasswordChange ? (
            <button 
              className="btn btn-outline-primary"
              style={{ borderColor: '#1e40af', color: '#1e40af' }}
              onClick={() => setShowPasswordChange(true)}
            >
              <i className="bi bi-shield-lock me-2"></i>
              Change Password
            </button>
          ) : (
            <div style={styles.addressCard}>
              <h6 className="fw-bold mb-3" style={{ color: '#000000' }}>Change Password</h6>
              
              <div className="mb-3">
                <label style={styles.label}>New Password</label>
                <input 
                  type="password"
                  style={styles.input}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                />
              </div>

              <div className="mb-3">
                <label style={styles.label}>Confirm New Password</label>
                <input 
                  type="password"
                  style={styles.input}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                />
              </div>

              <div className="d-flex gap-2">
                <button 
                  className="btn btn-primary"
                  style={{ backgroundColor: '#1e40af', border: 'none' }}
                  onClick={handlePasswordChange}
                >
                  <i className="bi bi-check-lg me-2"></i>
                  Update Password
                </button>
                <button 
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    setShowPasswordChange(false);
                    setNewPassword('');
                    setConfirmPassword('');
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-5">
          <h6 className="fw-bold mb-3" style={{ color: '#000000' }}>Account Information</h6>
          <div style={styles.addressCard}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="small text-muted">Account Status</label>
                <div>
                  <span className={`badge ${profileData.userStatus === 'ACTIVE' ? 'bg-success' : 'bg-secondary'}`}>
                    {profileData.userStatus}
                  </span>
                </div>
              </div>
              <div className="col-md-6">
                <label className="small text-muted">Reward Points</label>
                <div className="fw-bold" style={{ color: '#1e40af' }}>
                  <i className="bi bi-star-fill me-2"></i>
                  {profileData.rewardPoints} points
                </div>
              </div>
              <div className="col-12">
                <label className="small text-muted">Member Since</label>
                <div className="fw-semibold" style={{ color: '#000000' }}>
                  {profileData.dob ? new Date(profileData.dob).toLocaleDateString() : 'N/A'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div style={styles.header}>
        <div className="container">
          <h1 style={{ fontWeight: '700', marginBottom: '0.5rem' }}>My Profile</h1>
          <p style={{ opacity: 0.9, marginBottom: 0 }}>Manage your account and preferences</p>
        </div>
      </div>

      <div className="container pb-5">
        <div style={styles.profileCard}>
          <div className="d-flex border-bottom">
            <button 
              style={{
                ...styles.tabButton,
                ...(activeTab === 'personal' ? styles.activeTab : {})
              }}
              onClick={() => setActiveTab('personal')}
            >
              <i className="bi bi-person me-2"></i>
              Personal Info
            </button>
            <button 
              style={{
                ...styles.tabButton,
                ...(activeTab === 'address' ? styles.activeTab : {})
              }}
              onClick={() => setActiveTab('address')}
            >
              <i className="bi bi-geo-alt me-2"></i>
              Address
            </button>
            <button 
              style={{
                ...styles.tabButton,
                ...(activeTab === 'preferences' ? styles.activeTab : {})
              }}
              onClick={() => setActiveTab('preferences')}
            >
              <i className="bi bi-gear me-2"></i>
              Preferences
            </button>
          </div>

          {activeTab === 'personal' && renderPersonalInfo()}
          {activeTab === 'address' && renderAddress()}
          {activeTab === 'preferences' && renderPreferences()}
        </div>
      </div>
      </div>
  );
};

export default ConsumerProfile;