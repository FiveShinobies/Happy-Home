import { useState, useEffect } from 'react';
import { User, Mail, Lock, Phone, MapPin, Briefcase, Eye, EyeOff, Calendar, CreditCard, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userType, setUserType] = useState('consumer');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);


  const navigation = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    dob: '',
    homeNo: '',
    town: '',
    city: '',
    state: '',
    pincode: '',
    aadhardNo: '',
    panNo: '',
    experience: '',
    serviceCategory: '',
    serviceName: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/services/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Failed to fetch categories', error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleCategoryChange = async (e) => {
    const selectedCategory = e.target.value;

    setFormData(prev => ({
      ...prev,
      serviceCategory: selectedCategory,
      serviceName: ''   // reset service name
    }));

    if (!selectedCategory) {
      setServices([]);
      return;
    }

    try {
      const response = await api.get(
        `/services/category?category=${selectedCategory}`
      );
      setServices(response.data);
    } catch (error) {
      console.error('Failed to fetch services', error);
      setServices([]);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.dob) newErrors.dob = 'Date of birth is required';
    if (!formData.homeNo.trim()) newErrors.homeNo = 'Home/Building number is required';
    if (!formData.town.trim()) newErrors.town = 'Town is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Pincode must be 6 digits';
    }

    if (userType === 'vendor') {
      if (!formData.aadhardNo.trim()) {
        newErrors.aadhardNo = 'Aadhaar number is required';
      } else if (!/^\d{12}$/.test(formData.aadhardNo)) {
        newErrors.aadhardNo = 'Aadhaar number must be 12 digits';
      }
      if (!formData.panNo.trim()) {
        newErrors.panNo = 'PAN number is required';
      } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNo)) {
        newErrors.panNo = 'Invalid PAN format';
      }
      if (!formData.experience) {
        newErrors.experience = 'Experience is required';
      }
      if (!formData.serviceCategory) {
        newErrors.serviceCategory = 'Service category is required';
      }
      if (!formData.serviceName.trim()) {
        newErrors.serviceName = 'Service name is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setErrorMessage('Please fix all errors before submitting');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const basePayload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        dob: formData.dob,
        address: {
          homeNo: formData.homeNo,
          town: formData.town,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode
        }
      };

      let payload;
      let endpoint;

      if (userType === 'vendor') {
        payload = {
          ...basePayload,
          aadhardNo: formData.aadhardNo,
          panNo: formData.panNo,
          experience: parseInt(formData.experience),
          services: [
            {
              category: formData.serviceCategory,
              serviceName: formData.serviceName
            }
          ]
        };
        endpoint = '/signup/vendor';
      } else {
        payload = basePayload;
        endpoint = '/signup/consumer';
      }

      const response = await api.post(endpoint, payload, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await response.data;

      if (response.status !== 201) {
        throw new Error(data.message || 'Registration failed');
      }

      setSuccessMessage('Registration successful! Redirecting to login...');
      setTimeout(() => {
        navigation('/');
      }, 2000);
    } catch (error) {
      setErrorMessage(error.message || 'Registration failed. Please try again.');
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };


  const inputStyle = {
    width: '100%',
    padding: '10px 10px 10px 40px',
    fontSize: '14px',
    border: '1px solid #ced4da',
    borderRadius: '6px',
    outline: 'none'
  };

  const inputErrorStyle = {
    ...inputStyle,
    border: '1px solid #dc3545'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '6px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#212529'
  };

  const errorTextStyle = {
    color: '#dc3545',
    fontSize: '12px',
    marginTop: '5px'
  };

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', paddingTop: '40px', paddingBottom: '40px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 15px' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '100%', maxWidth: '900px' }}>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <h1 style={{ fontWeight: 'bold', marginBottom: '10px', color: '#0d6efd', fontSize: '36px' }}>HappyHome</h1>
              <p style={{ color: '#6c757d', fontSize: '16px' }}>Create your account and get started</p>
            </div>

            <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '40px' }}>
              {/* User Type Selection */}
              <div style={{ marginBottom: '30px' }}>
                <h5 style={{ fontWeight: '600', marginBottom: '20px', textAlign: 'center', fontSize: '18px' }}>I want to register as:</h5>
                <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={() => setUserType('consumer')}
                    style={{
                      padding: '10px 30px',
                      backgroundColor: userType === 'consumer' ? '#0d6efd' : 'white',
                      color: userType === 'consumer' ? 'white' : '#6c757d',
                      border: `2px solid ${userType === 'consumer' ? '#0d6efd' : '#6c757d'}`,
                      borderRadius: '6px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '16px',
                      fontWeight: '500',
                      transition: 'all 0.3s'
                    }}
                  >
                    <User size={18} />
                    Consumer
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserType('vendor')}
                    style={{
                      padding: '10px 30px',
                      backgroundColor: userType === 'vendor' ? '#0d6efd' : 'white',
                      color: userType === 'vendor' ? 'white' : '#6c757d',
                      border: `2px solid ${userType === 'vendor' ? '#0d6efd' : '#6c757d'}`,
                      borderRadius: '6px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '16px',
                      fontWeight: '500',
                      transition: 'all 0.3s'
                    }}
                  >
                    <Briefcase size={18} />
                    Vendor
                  </button>
                </div>
              </div>

              {/* Alert Messages */}
              {successMessage && (
                <div style={{
                  padding: '15px',
                  marginBottom: '20px',
                  backgroundColor: '#d1e7dd',
                  color: '#0f5132',
                  borderRadius: '6px',
                  border: '1px solid #badbcc'
                }}>
                  {successMessage}
                </div>
              )}

              {errorMessage && (
                <div style={{
                  padding: '15px',
                  marginBottom: '20px',
                  backgroundColor: '#f8d7da',
                  color: '#842029',
                  borderRadius: '6px',
                  border: '1px solid #f5c2c7'
                }}>
                  {errorMessage}
                </div>
              )}

              <div onSubmit={handleSubmit} style={{ width: '100%' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                  {/* First Name */}
                  <div>
                    <label style={labelStyle}>First Name *</label>
                    <div style={{ position: 'relative' }}>
                      <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6c757d' }} />
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Enter first name"
                        style={errors.firstName ? inputErrorStyle : inputStyle}
                      />
                      {errors.firstName && <div style={errorTextStyle}>{errors.firstName}</div>}
                    </div>
                  </div>

                  {/* Last Name */}
                  <div>
                    <label style={labelStyle}>Last Name *</label>
                    <div style={{ position: 'relative' }}>
                      <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6c757d' }} />
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Enter last name"
                        style={errors.lastName ? inputErrorStyle : inputStyle}
                      />
                      {errors.lastName && <div style={errorTextStyle}>{errors.lastName}</div>}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label style={labelStyle}>Email Address *</label>
                    <div style={{ position: 'relative' }}>
                      <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6c757d' }} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        style={errors.email ? inputErrorStyle : inputStyle}
                      />
                      {errors.email && <div style={errorTextStyle}>{errors.email}</div>}
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label style={labelStyle}>Phone Number *</label>
                    <div style={{ position: 'relative' }}>
                      <Phone size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6c757d' }} />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="10-digit mobile number"
                        style={errors.phone ? inputErrorStyle : inputStyle}
                        maxLength={10}
                      />
                      {errors.phone && <div style={errorTextStyle}>{errors.phone}</div>}
                    </div>
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label style={labelStyle}>Date of Birth *</label>
                    <div style={{ position: 'relative' }}>
                      <Calendar size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6c757d', zIndex: 1 }} />
                      <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        style={errors.dob ? inputErrorStyle : inputStyle}
                      />
                      {errors.dob && <div style={errorTextStyle}>{errors.dob}</div>}
                    </div>
                  </div>

                  {/* Home/Building Number */}
                  <div>
                    <label style={labelStyle}>Home/Building No *</label>
                    <div style={{ position: 'relative' }}>
                      <MapPin size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6c757d' }} />
                      <input
                        type="text"
                        name="homeNo"
                        value={formData.homeNo}
                        onChange={handleChange}
                        placeholder="Building/House number"
                        style={errors.homeNo ? inputErrorStyle : inputStyle}
                      />
                      {errors.homeNo && <div style={errorTextStyle}>{errors.homeNo}</div>}
                    </div>
                  </div>

                  {/* Town */}
                  <div>
                    <label style={labelStyle}>Town *</label>
                    <input
                      type="text"
                      name="town"
                      value={formData.town}
                      onChange={handleChange}
                      placeholder="Enter town"
                      style={errors.town ? { ...inputErrorStyle, paddingLeft: '10px' } : { ...inputStyle, paddingLeft: '10px' }}
                    />
                    {errors.town && <div style={errorTextStyle}>{errors.town}</div>}
                  </div>

                  {/* City */}
                  <div>
                    <label style={labelStyle}>City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Enter city"
                      style={errors.city ? { ...inputErrorStyle, paddingLeft: '10px' } : { ...inputStyle, paddingLeft: '10px' }}
                    />
                    {errors.city && <div style={errorTextStyle}>{errors.city}</div>}
                  </div>

                  {/* State */}
                  <div>
                    <label style={labelStyle}>State *</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="Enter state"
                      style={errors.state ? { ...inputErrorStyle, paddingLeft: '10px' } : { ...inputStyle, paddingLeft: '10px' }}
                    />
                    {errors.state && <div style={errorTextStyle}>{errors.state}</div>}
                  </div>

                  {/* Pincode */}
                  <div>
                    <label style={labelStyle}>Pincode *</label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      placeholder="6-digit pincode"
                      style={errors.pincode ? { ...inputErrorStyle, paddingLeft: '10px' } : { ...inputStyle, paddingLeft: '10px' }}
                      maxLength={6}
                    />
                    {errors.pincode && <div style={errorTextStyle}>{errors.pincode}</div>}
                  </div>

                  {/* Vendor Specific Fields */}
                  {userType === 'vendor' && (
                    <>
                      <div>
                        <label style={labelStyle}>Aadhaar Number *</label>
                        <div style={{ position: 'relative' }}>
                          <CreditCard size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6c757d' }} />
                          <input
                            type="text"
                            name="aadhardNo"
                            value={formData.aadhardNo}
                            onChange={handleChange}
                            placeholder="12-digit Aadhaar number"
                            style={errors.aadhardNo ? inputErrorStyle : inputStyle}
                            maxLength={12}
                          />
                          {errors.aadhardNo && <div style={errorTextStyle}>{errors.aadhardNo}</div>}
                        </div>
                      </div>

                      <div>
                        <label style={labelStyle}>PAN Number *</label>
                        <div style={{ position: 'relative' }}>
                          <FileText size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6c757d' }} />
                          <input
                            type="text"
                            name="panNo"
                            value={formData.panNo}
                            onChange={handleChange}
                            placeholder="PAN number (e.g., ABCDE1234F)"
                            style={{
                              ...errors.panNo ? inputErrorStyle : inputStyle,
                              textTransform: 'uppercase'
                            }}
                            maxLength={10}
                          />
                          {errors.panNo && <div style={errorTextStyle}>{errors.panNo}</div>}
                        </div>
                      </div>

                      <div>
                        <label style={labelStyle}>Years of Experience *</label>
                        <input
                          type="number"
                          name="experience"
                          value={formData.experience}
                          onChange={handleChange}
                          placeholder="Enter years of experience"
                          style={errors.experience ? { ...inputErrorStyle, paddingLeft: '10px' } : { ...inputStyle, paddingLeft: '10px' }}
                          min="0"
                        />
                        {errors.experience && <div style={errorTextStyle}>{errors.experience}</div>}
                      </div>

                      <div>
                        <label style={labelStyle}>Service Category *</label>
                        <select
                          name="serviceCategory"
                          value={formData.serviceCategory}
                          onChange={handleCategoryChange}
                          style={errors.serviceCategory ? { ...inputErrorStyle, paddingLeft: '10px' } : { ...inputStyle, paddingLeft: '10px' }}
                        >
                          <option value="">Select service category</option>
                          {categories.map(category => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                        {errors.serviceCategory && <div style={errorTextStyle}>{errors.serviceCategory}</div>}
                      </div>

                      <div style={{ gridColumn: '1 / -1' }}>
                        <label style={labelStyle}>Service Name *</label>
                        <select
                          name="serviceName"
                          value={formData.serviceName}
                          onChange={handleChange}
                          style={errors.serviceName ? { ...inputErrorStyle, paddingLeft: '10px' } : { ...inputStyle, paddingLeft: '10px' }}
                          disabled={!services.length}
                        >
                          <option value="">Select service</option>
                          {services.map(service => (
                            <option key={service} value={service}>
                              {service}
                            </option>
                          ))}
                        </select>
                        {errors.serviceName && <div style={errorTextStyle}>{errors.serviceName}</div>}
                      </div>
                    </>
                  )}

                  {/* Password */}
                  <div>
                    <label style={labelStyle}>Password *</label>
                    <div style={{ position: 'relative' }}>
                      <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6c757d', zIndex: 1 }} />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Create a password"
                        style={{
                          ...errors.password ? inputErrorStyle : inputStyle,
                          paddingRight: '40px'
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                          position: 'absolute',
                          right: '12px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: '#6c757d',
                          padding: 0,
                          zIndex: 1
                        }}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                      {errors.password && <div style={errorTextStyle}>{errors.password}</div>}
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label style={labelStyle}>Confirm Password *</label>
                    <div style={{ position: 'relative' }}>
                      <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6c757d', zIndex: 1 }} />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                        style={{
                          ...errors.confirmPassword ? inputErrorStyle : inputStyle,
                          paddingRight: '40px'
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        style={{
                          position: 'absolute',
                          right: '12px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: '#6c757d',
                          padding: 0,
                          zIndex: 1
                        }}
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                      {errors.confirmPassword && <div style={errorTextStyle}>{errors.confirmPassword}</div>}
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div style={{ marginTop: '30px' }}>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={loading}
                    style={{
                      width: '100%',
                      padding: '14px',
                      backgroundColor: loading ? '#6c757d' : '#0d6efd',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      transition: 'background-color 0.3s'
                    }}
                  >
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </button>
                </div>

                {/* Login Link */}
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                  <p style={{ color: '#6c757d', fontSize: '14px', margin: 0 }}>
                    Already have an account?{' '}
                    <a href="/login" style={{ color: '#0d6efd', textDecoration: 'none', fontWeight: '600' }}>
                      Login here
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;