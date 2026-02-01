import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import DEFAULT_PROFILE_PIC from '../../../assets/profileimg.png';
import api from "../../../api/api";

const byteArrayToImageUrl = (byteArray) => {
  if (!byteArray) return DEFAULT_PROFILE_PIC;

  const uint8Array = new Uint8Array(byteArray);
  const blob = new Blob([uint8Array], { type: "image/jpeg" });

  return URL.createObjectURL(blob);
};

const EditVendorProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [loading, setLoading] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Vendor ID
  const vendorId = JSON.parse(sessionStorage.getItem('user')).userId;

  // Initial state structure
  const [profileData, setProfileData] = useState({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      profileImage: DEFAULT_PROFILE_PIC,
      aadhaarNumber: '',
      panNumber: ''
    },
    addressInfo: {
      homeNo: '',
      town: '',
      city: '',
      state: '',
      pincode: ''
    },
    professionalInfo: {
      expertise: [], // Will store service IDs as numbers
      experienceYears: 0,
      languages: []
    },
    allServices: {
      servicesList: [] // Will store all available service objects
    },
    bankDetails: {
      accountHolderName: '',
      accountNumber: '',
      ifscCode: '',
      bankName: '',
      branchName: '',
      upiId: ''
    },
    stats: {
      totalServices: 0,
      rating: 0,
      reviews: 0
    }
  });

  const [editData, setEditData] = useState({ ...profileData });

  useEffect(() => {
    fetchVendorData();
  }, []);

  const fetchVendorData = async () => {
    try {
      setLoading(true);

      const [profileRes, bankingRes] = await Promise.all([
        api.get(`/vendor/${vendorId}/profile`),
        api.get(`/vendor/${vendorId}/banking`)
      ]);

      const profile = profileRes.data;
      const address = profile.address || {};
      const banking = bankingRes.data || {};

      console.log('Profile:', profile);
      console.log('Address:', address);
      console.log('Banking:', banking);

      // Extract service IDs from servicesProvided objects
      const selectedServiceIds = (profile.servicesProvided || []).map(service => service.serviceId);

      console.log('Selected Service IDs:', selectedServiceIds);
      console.log('All Services:', profile.allServices);

      const mappedData = {
        personalInfo: {
          firstName: profile.firstName || '',
          lastName: profile.lastName || '',
          email: profile.email || '',
          phone: profile.phone || '',
          dateOfBirth: profile.dateOfBirth || '',
          profileImage: byteArrayToImageUrl(profile.profileImage),
          aadhaarNumber: profile.aadhaarNumber || '',
          panNumber: profile.panNumber || ''
        },
        addressInfo: {
          homeNo: address.homeNo || '',
          town: address.town || '',
          city: address.city || '',
          state: address.state || '',
          pincode: address.pincode || ''
        },
        professionalInfo: {
          expertise: selectedServiceIds, // Store only IDs
          experienceYears: profile.experienceYears || 0,
          languages: profile.languages || []
        },
        allServices: {
          servicesList: profile.allServices || [] // Store full service objects
        },
        bankDetails: {
          accountHolderName: banking.holderName || '',
          accountNumber: banking.accountNo || '',
          ifscCode: banking.ifscCode || '',
          bankName: banking.bankName || '',
          branchName: banking.branchName || '',
          upiId: banking.upiId || ''
        },
        stats: {
          totalServices: profile.totalServices || 0,
          rating: profile.rating || 0,
          reviews: profile.totalReviews || 0
        }
      };

      setProfileData(mappedData);
      setEditData(mappedData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching vendor data:', error);
      toast.error('Failed to load profile data');
      setLoading(false);
    }
  };

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

  const handleSave = async () => {
    try {
      // Prepare request body - send service IDs
      const requestBody = {
        firstName: editData.personalInfo.firstName,
        lastName: editData.personalInfo.lastName,
        email: editData.personalInfo.email,
        phone: editData.personalInfo.phone,
        dob: editData.personalInfo.dateOfBirth, // Changed to 'dob'
        servicesProvided: editData.professionalInfo.expertise, // Send array of service IDs
        languages: editData.professionalInfo.languages,
        homeNo: editData.addressInfo.homeNo,
        town: editData.addressInfo.town,
        city: editData.addressInfo.city,
        state: editData.addressInfo.state,
        pincode: editData.addressInfo.pincode,
        accountHolderName: editData.bankDetails.accountHolderName,
        accountNumber: editData.bankDetails.accountNumber,
        ifscCode: editData.bankDetails.ifscCode,
        bankName: editData.bankDetails.bankName,
        branchName: editData.bankDetails.branchName
      };

      console.log('Request Body:', requestBody);

      await api.put(
        `/vendor/${vendorId}/profile`,
        requestBody
      );

      setProfileData({ ...editData });
      setIsEditing(false);
      setShowSuccessModal(true);
      toast.success('Profile updated successfully!');
      setTimeout(() => setShowSuccessModal(false), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile');
    }
  };

  const handleCancel = () => {
    setEditData({ ...profileData });
    setIsEditing(false);
  };

  const displayData = isEditing ? editData : profileData;

  // Helper function to get service name by ID
  const getServiceNameById = (serviceId) => {
    const service = displayData.allServices.servicesList.find(s => s.serviceId === serviceId);
    return service ? service.serviceName : 'Unknown Service';
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

  const styles = {
    pageBackground: {
      minHeight: '100vh',
      background: '#ffffff'
    },
    header: {
      background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
      color: '#ffffff',
      padding: '2rem 0',
      marginBottom: '2rem'
    },
    profileImage: {
      width: '120px',
      height: '120px',
      objectFit: 'cover'
    },
    verifiedBadge: {
      background: '#22c55e',
      color: '#ffffff',
      padding: '0.25rem 0.75rem',
      borderRadius: '1rem',
      fontSize: '0.875rem',
      fontWeight: '600',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.25rem',
      marginTop: '0.5rem'
    },
    statBox: {
      background: 'rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(10px)',
      padding: '1rem',
      borderRadius: '0.75rem',
      textAlign: 'center',
      minWidth: '100px'
    },
    card: {
      background: '#ffffff',
      borderRadius: '1rem',
      border: '1px solid #e5e7eb',
      padding: '2rem',
      marginBottom: '1.5rem'
    },
    tab: {
      background: 'transparent',
      border: 'none',
      borderBottomWidth: '3px',
      borderBottomStyle: 'solid',
      borderBottomColor: 'transparent',
      padding: '1rem 1.5rem',
      fontSize: '1rem',
      fontWeight: '500',
      color: '#6b7280',
      cursor: 'pointer',
      transition: 'all 0.3s'
    },
    tabActive: {
      color: '#1e40af',
      borderBottomColor: '#1e40af'
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.5rem',
      fontSize: '1rem'
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
    maskedValue: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      color: '#6b7280'
    },
    tag: {
      background: '#1e40af',
      color: '#ffffff',
      padding: '0.5rem 1rem',
      borderRadius: '0.5rem',
      fontSize: '0.875rem',
      fontWeight: '500',
      display: 'inline-block',
      margin: '0.25rem'
    },
    infoAlert: {
      background: '#dbeafe',
      border: '1px solid #3b82f6',
      color: '#1e40af',
      padding: '1rem',
      borderRadius: '0.5rem',
      marginTop: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    successAlert: {
      background: '#d1fae5',
      border: '1px solid #22c55e',
      color: '#166534'
    }
  };

  return (
    <div style={styles.pageBackground}>
      {/* Header */}
      <div style={styles.header}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-auto">
              <img
                src={displayData.personalInfo.profileImage}
                alt="Profile"
                style={styles.profileImage}
              />
              <div style={styles.verifiedBadge}>
                <i className="bi bi-patch-check-fill"></i> Verified
              </div>
            </div>

            <div className="col">
              <h1 className="display-5 fw-bold mb-2">
                {displayData.personalInfo.firstName} {displayData.personalInfo.lastName}
              </h1>
              <p className="mb-3 opacity-75">
                {displayData.professionalInfo.expertise.length > 0
                  ? displayData.professionalInfo.expertise.map(id => getServiceNameById(id)).join(' • ')
                  : 'No services listed'}
                {displayData.professionalInfo.expertise.length > 0 && displayData.professionalInfo.experienceYears > 0 && ' • '}
                {displayData.professionalInfo.experienceYears > 0 && `${displayData.professionalInfo.experienceYears} years experience`}
              </p>

              <div className="d-flex gap-3 flex-wrap">
                <div style={styles.statBox}>
                  <i className="bi bi-star-fill d-block mb-1"></i>
                  <div className="fw-bold">{displayData.stats.rating.toFixed(1)}</div>
                  <small className="opacity-75">Rating</small>
                </div>
                <div style={styles.statBox}>
                  <i className="bi bi-check-circle-fill d-block mb-1"></i>
                  <div className="fw-bold">{displayData.stats.totalServices}</div>
                  <small className="opacity-75">Services</small>
                </div>
                <div style={styles.statBox}>
                  <i className="bi bi-chat-quote-fill d-block mb-1"></i>
                  <div className="fw-bold">{displayData.stats.reviews}</div>
                  <small className="opacity-75">Reviews</small>
                </div>
              </div>
            </div>

            <div className="col-auto">
              {!isEditing ? (
                <button
                  className="btn btn-light btn-lg"
                  onClick={() => setIsEditing(true)}
                >
                  <i className="bi bi-pencil-square me-2"></i>
                  Edit Profile
                </button>
              ) : (
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-success btn-lg"
                    onClick={handleSave}
                  >
                    <i className="bi bi-check-lg me-2"></i>
                    Save
                  </button>
                  <button
                    className="btn btn-outline-light btn-lg"
                    onClick={handleCancel}
                  >
                    <i className="bi bi-x-lg me-2"></i>
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="container mb-4">
        <div className="d-flex border-bottom">
          {[
            { key: 'personal', icon: 'bi-person-fill', label: 'Personal' },
            { key: 'address', icon: 'bi-geo-alt-fill', label: 'Address' },
            { key: 'professional', icon: 'bi-briefcase-fill', label: 'Professional' },
            { key: 'banking', icon: 'bi-bank', label: 'Banking' }
          ].map(tab => (
            <button
              key={tab.key}
              style={{
                ...styles.tab,
                ...(activeTab === tab.key ? styles.tabActive : {})
              }}
              onClick={() => setActiveTab(tab.key)}
            >
              <i className={`bi ${tab.icon} me-2`}></i>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="container pb-5">
        {/* Personal Tab */}
        {activeTab === 'personal' && (
          <div style={styles.card}>
            <h2 className="h4 fw-bold mb-4" style={{ color: '#000000' }}>Personal Information</h2>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold">First Name *</label>
                {isEditing ? (
                  <input
                    type="text"
                    style={styles.input}
                    value={displayData.personalInfo.firstName}
                    onChange={(e) => handleInputChange('personalInfo', 'firstName', e.target.value)}
                  />
                ) : (
                  <div style={styles.displayValue}>{displayData.personalInfo.firstName}</div>
                )}
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Last Name *</label>
                {isEditing ? (
                  <input
                    type="text"
                    style={styles.input}
                    value={displayData.personalInfo.lastName}
                    onChange={(e) => handleInputChange('personalInfo', 'lastName', e.target.value)}
                  />
                ) : (
                  <div style={styles.displayValue}>{displayData.personalInfo.lastName}</div>
                )}
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Email *</label>
                {isEditing ? (
                  <input
                    type="email"
                    style={styles.input}
                    value={displayData.personalInfo.email}
                    onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                  />
                ) : (
                  <div style={styles.displayValue}>{displayData.personalInfo.email}</div>
                )}
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Phone *</label>
                {isEditing ? (
                  <input
                    type="tel"
                    style={styles.input}
                    value={displayData.personalInfo.phone}
                    onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                  />
                ) : (
                  <div style={styles.displayValue}>{displayData.personalInfo.phone}</div>
                )}
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Date of Birth *</label>
                {isEditing ? (
                  <input
                    type="date"
                    style={styles.input}
                    value={displayData.personalInfo.dateOfBirth}
                    onChange={(e) => handleInputChange('personalInfo', 'dateOfBirth', e.target.value)}
                  />
                ) : (
                  <div style={styles.displayValue}>
                    {displayData.personalInfo.dateOfBirth
                      ? new Date(displayData.personalInfo.dateOfBirth).toLocaleDateString('en-IN')
                      : 'Not provided'}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4">
              <h3 className="h5 fw-bold mb-3" style={{ color: '#000000' }}>Identity Documents</h3>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Aadhaar Number</label>
                  <div style={{ ...styles.displayValue, ...styles.maskedValue }}>
                    <i className="bi bi-shield-lock-fill text-primary"></i>
                    {displayData.personalInfo.aadhaarNumber || 'Not provided'}
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">PAN Number</label>
                  <div style={{ ...styles.displayValue, ...styles.maskedValue }}>
                    <i className="bi bi-shield-lock-fill text-primary"></i>
                    {displayData.personalInfo.panNumber || 'Not provided'}
                  </div>
                </div>
              </div>
              <div style={styles.infoAlert} className="mt-3">
                <i className="bi bi-info-circle-fill"></i>
                Identity documents cannot be changed. Contact support for updates.
              </div>
            </div>
          </div>
        )}

        {/* Address Tab */}
        {activeTab === 'address' && (
          <div style={styles.card}>
            <h2 className="h4 fw-bold mb-4" style={{ color: '#000000' }}>Address Information</h2>
            <div className="row g-3">
              <div className="col-12">
                <label className="form-label fw-semibold">Home No / Street Address *</label>
                {isEditing ? (
                  <input
                    type="text"
                    style={styles.input}
                    value={displayData.addressInfo.homeNo}
                    onChange={(e) => handleInputChange('addressInfo', 'homeNo', e.target.value)}
                  />
                ) : (
                  <div style={styles.displayValue}>{displayData.addressInfo.homeNo || 'Not provided'}</div>
                )}
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Town</label>
                {isEditing ? (
                  <input
                    type="text"
                    style={styles.input}
                    value={displayData.addressInfo.town}
                    onChange={(e) => handleInputChange('addressInfo', 'town', e.target.value)}
                  />
                ) : (
                  <div style={styles.displayValue}>{displayData.addressInfo.town || 'Not provided'}</div>
                )}
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">City *</label>
                {isEditing ? (
                  <input
                    type="text"
                    style={styles.input}
                    value={displayData.addressInfo.city}
                    onChange={(e) => handleInputChange('addressInfo', 'city', e.target.value)}
                  />
                ) : (
                  <div style={styles.displayValue}>{displayData.addressInfo.city || 'Not provided'}</div>
                )}
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">State *</label>
                {isEditing ? (
                  <input
                    type="text"
                    style={styles.input}
                    value={displayData.addressInfo.state}
                    onChange={(e) => handleInputChange('addressInfo', 'state', e.target.value)}
                  />
                ) : (
                  <div style={styles.displayValue}>{displayData.addressInfo.state || 'Not provided'}</div>
                )}
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">PIN Code *</label>
                {isEditing ? (
                  <input
                    type="text"
                    style={styles.input}
                    maxLength="6"
                    value={displayData.addressInfo.pincode}
                    onChange={(e) => handleInputChange('addressInfo', 'pincode', e.target.value)}
                  />
                ) : (
                  <div style={styles.displayValue}>{displayData.addressInfo.pincode || 'Not provided'}</div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Professional Tab */}
        {activeTab === 'professional' && (
          <div style={styles.card}>
            <h2 className="h4 fw-bold mb-4" style={{ color: '#000000' }}>Professional Information</h2>

            <div className="mb-4">
              <label className="form-label fw-semibold">Services Provided *</label>
              {isEditing ? (
                <div className="row g-2">
                  {displayData.allServices.servicesList.map(service => (
                    <div key={service.serviceId} className="col-md-6">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`skill-${service.serviceId}`}
                          checked={displayData.professionalInfo.expertise.includes(service.serviceId)}
                          onChange={() => handleArrayToggle('professionalInfo', 'expertise', service.serviceId)}
                        />
                        <label className="form-check-label" htmlFor={`skill-${service.serviceId}`}>
                          {service.serviceName}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  {displayData.professionalInfo.expertise.length > 0
                    ? displayData.professionalInfo.expertise.map(serviceId => (
                      <span key={serviceId} style={styles.tag}>
                        {getServiceNameById(serviceId)}
                      </span>
                    ))
                    : <div style={styles.displayValue}>No services selected</div>
                  }
                </div>
              )}
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">Languages *</label>
              {isEditing ? (
                <div className="row g-2">
                  {['English', 'Hindi', 'Marathi', 'Kannada', 'Tamil', 'Telugu', 'Malayalam'].map(lang => (
                    <div key={lang} className="col-md-6">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`lang-${lang}`}
                          checked={displayData.professionalInfo.languages.includes(lang)}
                          onChange={() => handleArrayToggle('professionalInfo', 'languages', lang)}
                        />
                        <label className="form-check-label" htmlFor={`lang-${lang}`}>
                          {lang}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  {displayData.professionalInfo.languages.length > 0
                    ? displayData.professionalInfo.languages.map(lang => (
                      <span key={lang} style={styles.tag}>{lang}</span>
                    ))
                    : <div style={styles.displayValue}>No languages selected</div>
                  }
                </div>
              )}
            </div>
          </div>
        )}

        {/* Banking Tab */}
        {activeTab === 'banking' && (
          <div style={styles.card}>
            <h2 className="h4 fw-bold mb-4" style={{ color: '#000000' }}>Banking Information</h2>
            <div className="row g-3">
              <div className="col-12">
                <label className="form-label fw-semibold">Account Holder Name *</label>
                {isEditing ? (
                  <input
                    type="text"
                    style={styles.input}
                    value={displayData.bankDetails.accountHolderName}
                    onChange={(e) =>
                      handleInputChange('bankDetails', 'accountHolderName', e.target.value)
                    }
                  />
                ) : (
                  <div style={styles.displayValue}>
                    {displayData.bankDetails.accountHolderName || 'Not provided'}
                  </div>
                )}
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Account Number *</label>
                {isEditing ? (
                  <input
                    type="text"
                    style={styles.input}
                    value={displayData.bankDetails.accountNumber}
                    onChange={(e) =>
                      handleInputChange('bankDetails', 'accountNumber', e.target.value)
                    }
                  />
                ) : (
                  <div style={{ ...styles.displayValue, ...styles.maskedValue }}>
                    <i className="bi bi-shield-lock-fill text-primary"></i>
                    {displayData.bankDetails.accountNumber
                      ? `XXXXXXXXXXXX${displayData.bankDetails.accountNumber.slice(-4)}`
                      : 'Not provided'}
                  </div>
                )}
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">IFSC Code *</label>
                {isEditing ? (
                  <input
                    type="text"
                    style={styles.input}
                    value={displayData.bankDetails.ifscCode}
                    onChange={(e) =>
                      handleInputChange('bankDetails', 'ifscCode', e.target.value)
                    }
                  />
                ) : (
                  <div style={styles.displayValue}>
                    {displayData.bankDetails.ifscCode || 'Not provided'}
                  </div>
                )}
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Bank Name *</label>
                {isEditing ? (
                  <input
                    type="text"
                    style={styles.input}
                    value={displayData.bankDetails.bankName}
                    onChange={(e) =>
                      handleInputChange('bankDetails', 'bankName', e.target.value)
                    }
                  />
                ) : (
                  <div style={styles.displayValue}>{displayData.bankDetails.bankName || 'Not provided'}</div>
                )}
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Branch Name *</label>
                {isEditing ? (
                  <input
                    type="text"
                    style={styles.input}
                    value={displayData.bankDetails.branchName}
                    onChange={(e) =>
                      handleInputChange('bankDetails', 'branchName', e.target.value)
                    }
                  />
                ) : (
                  <div style={styles.displayValue}>
                    {displayData.bankDetails.branchName || 'Not provided'}
                  </div>
                )}
              </div>
            </div>
            <div style={{ ...styles.infoAlert, ...styles.successAlert }} className="mt-4">
              <i className="bi bi-shield-check-fill"></i>
              Please double-check your banking details before saving.
            </div>
          </div>
        )}
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{
            background: 'rgba(0,0,0,0.5)',
            zIndex: 9999
          }}
        >
          <div
            className="bg-white rounded-4 p-5 text-center"
            style={{ maxWidth: '400px' }}
          >
            <div
              className="rounded-circle bg-success d-inline-flex align-items-center justify-content-center mb-3"
              style={{ width: '80px', height: '80px' }}
            >
              <i className="bi bi-check-circle-fill text-white" style={{ fontSize: '3rem' }}></i>
            </div>
            <h3 className="fw-bold mb-2">Profile Updated!</h3>
            <p className="text-muted">Your changes have been saved successfully.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditVendorProfile;