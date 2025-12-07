import React, { useState } from 'react';
import './editVendorProfile.css';

const editVendorProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Vendor profile data
  const [profileData, setProfileData] = useState({
    personalInfo: {
      firstName: 'Rajesh',
      lastName: 'Kumar',
      email: 'rajesh.kumar@email.com',
      phone: '+91 98765 43210',
      alternatePhone: '+91 98765 43211',
      dateOfBirth: '1990-05-15',
      gender: 'Male',
      profileImage: 'https://via.placeholder.com/150',
      aadharNumber: '1234 5678 9012',
      panNumber: 'ABCDE1234F'
    },
    addressInfo: {
      street: 'Flat 301, Tower B, Green Valley',
      area: 'Koramangala',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560095',
      landmark: 'Near City Mall'
    },
    professionalInfo: {
      expertise: ['Home Cleaning', 'Deep Cleaning', 'Kitchen Cleaning'],
      experienceYears: 5,
      workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      workingHoursStart: '09:00',
      workingHoursEnd: '20:00',
      vehicleType: 'Two Wheeler',
      languages: ['English', 'Hindi', 'Kannada'],
      certifications: 'Professional Cleaning Certificate'
    },
    bankDetails: {
      accountHolderName: 'Rajesh Kumar',
      accountNumber: '1234567890123456',
      ifscCode: 'HDFC0001234',
      bankName: 'HDFC Bank',
      branchName: 'Koramangala Branch',
      upiId: 'rajesh@paytm'
    },
    pricingInfo: {
      baseRate: 299,
      maxTravelDistance: 10
    },
    stats: {
      totalServices: 342,
      rating: 4.7,
      reviews: 284,
      completionRate: 98,
      joinedDate: 'January 2020'
    }
  });

  const [editData, setEditData] = useState({ ...profileData });

  const handleInputChange = (section, field, value) => {
    setEditData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleArrayToggle = (section, field, value) => {
    setEditData(prev => {
      const currentArray = prev[section][field];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: newArray
        }
      };
    });
  };

  const handleSave = () => {
    setProfileData({ ...editData });
    setIsEditing(false);
    setShowSuccessModal(true);
    setTimeout(() => setShowSuccessModal(false), 3000);
  };

  const handleCancel = () => {
    setEditData({ ...profileData });
    setIsEditing(false);
  };

  const displayData = isEditing ? editData : profileData;

  return (
    <div className="vendor-profile-page">
      {/* Header */}
      <div className="profile-header">
        <div className="container">
          <div className="header-content">
            <div className="profile-image-section">
              <img src={displayData.personalInfo.profileImage} alt="Profile" className="profile-img" />
              <div className="verified-badge">
                <i className="bi bi-patch-check-fill"></i> Verified
              </div>
            </div>
            
            <div className="profile-info">
              <h1>{displayData.personalInfo.firstName} {displayData.personalInfo.lastName}</h1>
              <p className="expertise-text">{displayData.professionalInfo.expertise.join(' • ')}</p>
              
              <div className="stats-row">
                <div className="stat-box">
                  <i className="bi bi-star-fill"></i>
                  <span className="stat-value">{displayData.stats.rating}</span>
                  <span className="stat-label">Rating</span>
                </div>
                <div className="stat-box">
                  <i className="bi bi-check-circle-fill"></i>
                  <span className="stat-value">{displayData.stats.totalServices}</span>
                  <span className="stat-label">Services</span>
                </div>
                <div className="stat-box">
                  <i className="bi bi-chat-quote-fill"></i>
                  <span className="stat-value">{displayData.stats.reviews}</span>
                  <span className="stat-label">Reviews</span>
                </div>
                <div className="stat-box">
                  <i className="bi bi-graph-up"></i>
                  <span className="stat-value">{displayData.stats.completionRate}%</span>
                  <span className="stat-label">Success</span>
                </div>
              </div>
            </div>

            <div className="header-actions">
              {!isEditing ? (
                <button className="btn-edit" onClick={() => setIsEditing(true)}>
                  <i className="bi bi-pencil-square"></i>
                  Edit Profile
                </button>
              ) : (
                <div className="edit-btns">
                  <button className="btn-save" onClick={handleSave}>
                    <i className="bi bi-check-lg"></i>
                    Save
                  </button>
                  <button className="btn-cancel-edit" onClick={handleCancel}>
                    <i className="bi bi-x-lg"></i>
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs-section">
        <div className="container">
          <div className="tabs">
            <button className={`tab ${activeTab === 'personal' ? 'active' : ''}`} onClick={() => setActiveTab('personal')}>
              <i className="bi bi-person-fill"></i> Personal
            </button>
            <button className={`tab ${activeTab === 'address' ? 'active' : ''}`} onClick={() => setActiveTab('address')}>
              <i className="bi bi-geo-alt-fill"></i> Address
            </button>
            <button className={`tab ${activeTab === 'professional' ? 'active' : ''}`} onClick={() => setActiveTab('professional')}>
              <i className="bi bi-briefcase-fill"></i> Professional
            </button>
            <button className={`tab ${activeTab === 'banking' ? 'active' : ''}`} onClick={() => setActiveTab('banking')}>
              <i className="bi bi-bank"></i> Banking
            </button>
            <button className={`tab ${activeTab === 'pricing' ? 'active' : ''}`} onClick={() => setActiveTab('pricing')}>
              <i className="bi bi-currency-rupee"></i> Pricing
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="content-section">
        <div className="container">
          {/* Personal Tab */}
          {activeTab === 'personal' && (
            <div className="content-card">
              <h2>Personal Information</h2>
              <div className="form-grid">
                <div className="form-field">
                  <label>First Name *</label>
                  {isEditing ? (
                    <input type="text" className="input-field" value={displayData.personalInfo.firstName}
                      onChange={(e) => handleInputChange('personalInfo', 'firstName', e.target.value)} />
                  ) : (
                    <div className="display-value">{displayData.personalInfo.firstName}</div>
                  )}
                </div>

                <div className="form-field">
                  <label>Last Name *</label>
                  {isEditing ? (
                    <input type="text" className="input-field" value={displayData.personalInfo.lastName}
                      onChange={(e) => handleInputChange('personalInfo', 'lastName', e.target.value)} />
                  ) : (
                    <div className="display-value">{displayData.personalInfo.lastName}</div>
                  )}
                </div>

                <div className="form-field">
                  <label>Email *</label>
                  {isEditing ? (
                    <input type="email" className="input-field" value={displayData.personalInfo.email}
                      onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)} />
                  ) : (
                    <div className="display-value">{displayData.personalInfo.email}</div>
                  )}
                </div>

                <div className="form-field">
                  <label>Phone *</label>
                  {isEditing ? (
                    <input type="tel" className="input-field" value={displayData.personalInfo.phone}
                      onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)} />
                  ) : (
                    <div className="display-value">{displayData.personalInfo.phone}</div>
                  )}
                </div>

                <div className="form-field">
                  <label>Alternate Phone</label>
                  {isEditing ? (
                    <input type="tel" className="input-field" value={displayData.personalInfo.alternatePhone}
                      onChange={(e) => handleInputChange('personalInfo', 'alternatePhone', e.target.value)} />
                  ) : (
                    <div className="display-value">{displayData.personalInfo.alternatePhone}</div>
                  )}
                </div>

                <div className="form-field">
                  <label>Date of Birth *</label>
                  {isEditing ? (
                    <input type="date" className="input-field" value={displayData.personalInfo.dateOfBirth}
                      onChange={(e) => handleInputChange('personalInfo', 'dateOfBirth', e.target.value)} />
                  ) : (
                    <div className="display-value">{new Date(displayData.personalInfo.dateOfBirth).toLocaleDateString('en-IN')}</div>
                  )}
                </div>

                <div className="form-field">
                  <label>Gender *</label>
                  {isEditing ? (
                    <select className="input-field" value={displayData.personalInfo.gender}
                      onChange={(e) => handleInputChange('personalInfo', 'gender', e.target.value)}>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  ) : (
                    <div className="display-value">{displayData.personalInfo.gender}</div>
                  )}
                </div>

                <div className="form-field">
                  <label>Member Since</label>
                  <div className="display-value readonly">{displayData.stats.joinedDate}</div>
                </div>
              </div>

              <div className="identity-docs">
                <h3>Identity Documents</h3>
                <div className="form-grid">
                  <div className="form-field">
                    <label>Aadhar Number</label>
                    <div className="display-value masked">
                      <i className="bi bi-shield-lock-fill"></i>
                      XXXX XXXX {displayData.personalInfo.aadharNumber.slice(-4)}
                    </div>
                  </div>
                  <div className="form-field">
                    <label>PAN Number</label>
                    <div className="display-value masked">
                      <i className="bi bi-shield-lock-fill"></i>
                      XXXXX{displayData.personalInfo.panNumber.slice(-4)}
                    </div>
                  </div>
                </div>
                <div className="info-alert">
                  <i className="bi bi-info-circle-fill"></i>
                  Identity documents cannot be changed. Contact support for updates.
                </div>
              </div>
            </div>
          )}

          {/* Address Tab */}
          {activeTab === 'address' && (
            <div className="content-card">
              <h2>Address Information</h2>
              <div className="form-grid">
                <div className="form-field full">
                  <label>Street Address *</label>
                  {isEditing ? (
                    <input type="text" className="input-field" value={displayData.addressInfo.street}
                      onChange={(e) => handleInputChange('addressInfo', 'street', e.target.value)} />
                  ) : (
                    <div className="display-value">{displayData.addressInfo.street}</div>
                  )}
                </div>

                <div className="form-field">
                  <label>Area *</label>
                  {isEditing ? (
                    <input type="text" className="input-field" value={displayData.addressInfo.area}
                      onChange={(e) => handleInputChange('addressInfo', 'area', e.target.value)} />
                  ) : (
                    <div className="display-value">{displayData.addressInfo.area}</div>
                  )}
                </div>

                <div className="form-field">
                  <label>Landmark</label>
                  {isEditing ? (
                    <input type="text" className="input-field" value={displayData.addressInfo.landmark}
                      onChange={(e) => handleInputChange('addressInfo', 'landmark', e.target.value)} />
                  ) : (
                    <div className="display-value">{displayData.addressInfo.landmark}</div>
                  )}
                </div>

                <div className="form-field">
                  <label>City *</label>
                  {isEditing ? (
                    <input type="text" className="input-field" value={displayData.addressInfo.city}
                      onChange={(e) => handleInputChange('addressInfo', 'city', e.target.value)} />
                  ) : (
                    <div className="display-value">{displayData.addressInfo.city}</div>
                  )}
                </div>

                <div className="form-field">
                  <label>State *</label>
                  {isEditing ? (
                    <input type="text" className="input-field" value={displayData.addressInfo.state}
                      onChange={(e) => handleInputChange('addressInfo', 'state', e.target.value)} />
                  ) : (
                    <div className="display-value">{displayData.addressInfo.state}</div>
                  )}
                </div>

                <div className="form-field">
                  <label>PIN Code *</label>
                  {isEditing ? (
                    <input type="text" className="input-field" maxLength="6" value={displayData.addressInfo.pincode}
                      onChange={(e) => handleInputChange('addressInfo', 'pincode', e.target.value)} />
                  ) : (
                    <div className="display-value">{displayData.addressInfo.pincode}</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Professional Tab */}
          {activeTab === 'professional' && (
            <div className="content-card">
              <h2>Professional Information</h2>
              
              <div className="form-field full">
                <label>Areas of Expertise *</label>
                {isEditing ? (
                  <div className="checkbox-group">
                    {['Home Cleaning', 'Deep Cleaning', 'Bathroom Cleaning', 'Kitchen Cleaning', 'AC Repair', 'Plumbing', 'Electrical', 'Painting'].map(skill => (
                      <label key={skill} className="checkbox-item">
                        <input type="checkbox" checked={displayData.professionalInfo.expertise.includes(skill)}
                          onChange={() => handleArrayToggle('professionalInfo', 'expertise', skill)} />
                        <span>{skill}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <div className="tags">
                    {displayData.professionalInfo.expertise.map(skill => (
                      <span key={skill} className="tag">{skill}</span>
                    ))}
                  </div>
                )}
              </div>

              <div className="form-grid">
                <div className="form-field">
                  <label>Experience (Years) *</label>
                  {isEditing ? (
                    <input type="number" className="input-field" min="0" value={displayData.professionalInfo.experienceYears}
                      onChange={(e) => handleInputChange('professionalInfo', 'experienceYears', e.target.value)} />
                  ) : (
                    <div className="display-value">{displayData.professionalInfo.experienceYears} years</div>
                  )}
                </div>

                <div className="form-field">
                  <label>Vehicle Type</label>
                  {isEditing ? (
                    <select className="input-field" value={displayData.professionalInfo.vehicleType}
                      onChange={(e) => handleInputChange('professionalInfo', 'vehicleType', e.target.value)}>
                      <option>No Vehicle</option>
                      <option>Bicycle</option>
                      <option>Two Wheeler</option>
                      <option>Four Wheeler</option>
                    </select>
                  ) : (
                    <div className="display-value">{displayData.professionalInfo.vehicleType}</div>
                  )}
                </div>

                <div className="form-field full">
                  <label>Certifications</label>
                  {isEditing ? (
                    <input type="text" className="input-field" value={displayData.professionalInfo.certifications}
                      onChange={(e) => handleInputChange('professionalInfo', 'certifications', e.target.value)} />
                  ) : (
                    <div className="display-value">{displayData.professionalInfo.certifications}</div>
                  )}
                </div>
              </div>

              <div className="form-field full">
                <label>Working Days *</label>
                {isEditing ? (
                  <div className="checkbox-group">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                      <label key={day} className="checkbox-item">
                        <input type="checkbox" checked={displayData.professionalInfo.workingDays.includes(day)}
                          onChange={() => handleArrayToggle('professionalInfo', 'workingDays', day)} />
                        <span>{day}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <div className="tags">
                    {displayData.professionalInfo.workingDays.map(day => (
                      <span key={day} className="tag day-tag">{day}</span>
                    ))}
                  </div>
                )}
              </div>

              <div className="form-grid">
                <div className="form-field">
                  <label>Start Time *</label>
                  {isEditing ? (
                    <input type="time" className="input-field" value={displayData.professionalInfo.workingHoursStart}
                      onChange={(e) => handleInputChange('professionalInfo', 'workingHoursStart', e.target.value)} />
                  ) : (
                    <div className="display-value">{displayData.professionalInfo.workingHoursStart}</div>
                  )}
                </div>

                <div className="form-field">
                  <label>End Time *</label>
                  {isEditing ? (
                    <input type="time" className="input-field" value={displayData.professionalInfo.workingHoursEnd}
                      onChange={(e) => handleInputChange('professionalInfo', 'workingHoursEnd', e.target.value)} />
                  ) : (
                    <div className="display-value">{displayData.professionalInfo.workingHoursEnd}</div>
                  )}
                </div>
              </div>

              <div className="form-field full">
                <label>Languages *</label>
                {isEditing ? (
                  <div className="checkbox-group">
                    {['English', 'Hindi', 'Kannada', 'Tamil', 'Telugu', 'Malayalam'].map(lang => (
                      <label key={lang} className="checkbox-item">
                        <input type="checkbox" checked={displayData.professionalInfo.languages.includes(lang)}
                          onChange={() => handleArrayToggle('professionalInfo', 'languages', lang)} />
                        <span>{lang}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <div className="tags">
                    {displayData.professionalInfo.languages.map(lang => (
                      <span key={lang} className="tag">{lang}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Banking Tab */}
          {activeTab === 'banking' && (
            <div className="content-card">
              <h2>Banking Information</h2>
              <div className="form-grid">
                <div className="form-field full">
                  <label>Account Holder Name *</label>
                  {isEditing ? (
                    <input type="text" className="input-field" value={displayData.bankDetails.accountHolderName}
                      onChange={(e) => handleInputChange('bankDetails', 'accountHolderName', e.target.value)} />
                  ) : (
                    <div className="display-value">{displayData.bankDetails.accountHolderName}</div>
                  )}
                </div>

                <div className="form-field">
                  <label>Account Number *</label>
                  {isEditing ? (
                    <input type="text" className="input-field" value={displayData.bankDetails.accountNumber}
                      onChange={(e) => handleInputChange('bankDetails', 'accountNumber', e.target.value)} />
                  ) : (
                    <div className="display-value masked">
                      <i className="bi bi-shield-lock-fill"></i>
                      XXXXXXXXXXXX{displayData.bankDetails.accountNumber.slice(-4)}
                    </div>
                  )}
                </div>

                <div className="form-field">
                  <label>IFSC Code *</label>
                  {isEditing ? (
                    <input type="text" className="input-field" value={displayData.bankDetails.ifscCode}
                      onChange={(e) => handleInputChange('bankDetails', 'ifscCode', e.target.value)} />
                  ) : (
                    <div className="display-value">{displayData.bankDetails.ifscCode}</div>
                  )}
                </div>

                <div className="form-field">
                  <label>Bank Name *</label>
                  {isEditing ? (
                    <input type="text" className="input-field" value={displayData.bankDetails.bankName}
                      onChange={(e) => handleInputChange('bankDetails', 'bankName', e.target.value)} />
                  ) : (
                    <div className="display-value">{displayData.bankDetails.bankName}</div>
                  )}
                </div>

                <div className="form-field">
                  <label>Branch Name *</label>
                  {isEditing ? (
                    <input type="text" className="input-field" value={displayData.bankDetails.branchName}
                      onChange={(e) => handleInputChange('bankDetails', 'branchName', e.target.value)} />
                  ) : (
                    <div className="display-value">{displayData.bankDetails.branchName}</div>
                  )}
                </div>

                <div className="form-field">
                  <label>UPI ID</label>
                  {isEditing ? (
                    <input type="text" className="input-field" value={displayData.bankDetails.upiId}
                      onChange={(e) => handleInputChange('bankDetails', 'upiId', e.target.value)} />
                  ) : (
                    <div className="display-value">{displayData.bankDetails.upiId}</div>
                  )}
                </div>
              </div>
              <div className="info-alert success">
                <i className="bi bi-shield-check-fill"></i>
                Your banking info is encrypted. Payments processed in 24-48 hours.
              </div>
            </div>
          )}

          {/* Pricing Tab */}
          {activeTab === 'pricing' && (
            <div className="content-card">
              <h2>Service Pricing</h2>
              <div className="form-grid">
                <div className="form-field">
                  <label>Base Rate (per hour) *</label>
                  {isEditing ? (
                    <div className="input-with-icon">
                      <span className="input-icon">₹</span>
                      <input type="number" className="input-field with-icon" min="0" value={displayData.pricingInfo.baseRate}
                        onChange={(e) => handleInputChange('pricingInfo', 'baseRate', e.target.value)} />
                    </div>
                  ) : (
                    <div className="display-value">₹{displayData.pricingInfo.baseRate}</div>
                  )}
                </div>

                <div className="form-field">
                  <label>Max Travel Distance (km) *</label>
                  {isEditing ? (
                    <input type="number" className="input-field" min="0" value={displayData.pricingInfo.maxTravelDistance}
                      onChange={(e) => handleInputChange('pricingInfo', 'maxTravelDistance', e.target.value)} />
                  ) : (
                    <div className="display-value">{displayData.pricingInfo.maxTravelDistance} km</div>
                  )}
                </div>
              </div>
              <div className="info-alert">
                <i className="bi bi-lightbulb-fill"></i>
                Your base rate can be adjusted based on service complexity and customer location.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="modal-backdrop">
          <div className="success-modal">
            <div className="success-icon">
              <i className="bi bi-check-circle-fill"></i>
            </div>
            <h3>Profile Updated!</h3>
            <p>Your changes have been saved successfully.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default editVendorProfile;