import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Phone, MapPin, Briefcase, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userType, setUserType] = useState('consumer');
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: '',
    city: '',
    // Vendor specific fields
    businessName: '',
    serviceType: '',
    experience: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
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
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';

    // Vendor specific validation
    if (userType === 'vendor') {
      if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required';
      if (!formData.serviceType.trim()) newErrors.serviceType = 'Service type is required';
      if (!formData.experience.trim()) newErrors.experience = 'Experience is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix all errors before submitting');
      return;
    }

    setLoading(true);

    try {
      // Replace with your actual API endpoint
      const endpoint = userType === 'vendor' 
        ? '/api/vendor/register' 
        : '/api/consumer/register';
      
      const response = await axios.post(endpoint, {
        ...formData,
        userType
      });

      toast.success('Registration successful! Please login.');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', paddingTop: '40px', paddingBottom: '40px' }}>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8}>
            <div className="text-center mb-4">
              <h1 className="fw-bold mb-2" style={{ color: '#0d6efd' }}>HappyHome</h1>
              <p className="text-muted">Create your account and get started</p>
            </div>

            <Card className="border-0 shadow-lg">
              <Card.Body className="p-4 p-md-5">
                {/* User Type Selection */}
                <div className="mb-4">
                  <h5 className="fw-semibold mb-3 text-center">I want to register as:</h5>
                  <div className="d-flex gap-3 justify-content-center">
                    <Button
                      variant={userType === 'consumer' ? 'primary' : 'outline-secondary'}
                      onClick={() => setUserType('consumer')}
                      className="px-4"
                    >
                      <User size={18} className="me-2" />
                      Consumer
                    </Button>
                    <Button
                      variant={userType === 'vendor' ? 'primary' : 'outline-secondary'}
                      onClick={() => setUserType('vendor')}
                      className="px-4"
                    >
                      <Briefcase size={18} className="me-2" />
                      Vendor
                    </Button>
                  </div>
                </div>

                <Form onSubmit={handleSubmit}>
                  <Row className="g-3">
                    {/* Name */}
                    <Col xs={12} md={6}>
                      <Form.Group>
                        <Form.Label className="fw-semibold small">Full Name *</Form.Label>
                        <div className="position-relative">
                          <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6c757d' }} />
                          <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            isInvalid={!!errors.name}
                            style={{ paddingLeft: '40px' }}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.name}
                          </Form.Control.Feedback>
                        </div>
                      </Form.Group>
                    </Col>

                    {/* Email */}
                    <Col xs={12} md={6}>
                      <Form.Group>
                        <Form.Label className="fw-semibold small">Email Address *</Form.Label>
                        <div className="position-relative">
                          <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6c757d' }} />
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="your.email@example.com"
                            isInvalid={!!errors.email}
                            style={{ paddingLeft: '40px' }}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.email}
                          </Form.Control.Feedback>
                        </div>
                      </Form.Group>
                    </Col>

                    {/* Phone */}
                    <Col xs={12} md={6}>
                      <Form.Group>
                        <Form.Label className="fw-semibold small">Phone Number *</Form.Label>
                        <div className="position-relative">
                          <Phone size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6c757d' }} />
                          <Form.Control
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="10-digit mobile number"
                            isInvalid={!!errors.phone}
                            style={{ paddingLeft: '40px' }}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.phone}
                          </Form.Control.Feedback>
                        </div>
                      </Form.Group>
                    </Col>

                    {/* City */}
                    <Col xs={12} md={6}>
                      <Form.Group>
                        <Form.Label className="fw-semibold small">City *</Form.Label>
                        <div className="position-relative">
                          <MapPin size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6c757d' }} />
                          <Form.Control
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="Enter your city"
                            isInvalid={!!errors.city}
                            style={{ paddingLeft: '40px' }}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.city}
                          </Form.Control.Feedback>
                        </div>
                      </Form.Group>
                    </Col>

                    {/* Address */}
                    <Col xs={12}>
                      <Form.Group>
                        <Form.Label className="fw-semibold small">Address *</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={2}
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          placeholder="Enter your complete address"
                          isInvalid={!!errors.address}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.address}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    {/* Vendor Specific Fields */}
                    {userType === 'vendor' && (
                      <>
                        <Col xs={12} md={6}>
                          <Form.Group>
                            <Form.Label className="fw-semibold small">Business Name *</Form.Label>
                            <Form.Control
                              type="text"
                              name="businessName"
                              value={formData.businessName}
                              onChange={handleChange}
                              placeholder="Your business name"
                              isInvalid={!!errors.businessName}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.businessName}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>

                        <Col xs={12} md={6}>
                          <Form.Group>
                            <Form.Label className="fw-semibold small">Service Type *</Form.Label>
                            <Form.Select
                              name="serviceType"
                              value={formData.serviceType}
                              onChange={handleChange}
                              isInvalid={!!errors.serviceType}
                            >
                              <option value="">Select service type</option>
                              <option value="plumbing">Plumbing</option>
                              <option value="electrical">Electrical</option>
                              <option value="cleaning">Cleaning</option>
                              <option value="painting">Painting</option>
                              <option value="carpentry">Carpentry</option>
                              <option value="ac-repair">AC Repair</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                              {errors.serviceType}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>

                        <Col xs={12}>
                          <Form.Group>
                            <Form.Label className="fw-semibold small">Years of Experience *</Form.Label>
                            <Form.Control
                              type="number"
                              name="experience"
                              value={formData.experience}
                              onChange={handleChange}
                              placeholder="Enter years of experience"
                              isInvalid={!!errors.experience}
                              min="0"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.experience}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </>
                    )}

                    {/* Password */}
                    <Col xs={12} md={6}>
                      <Form.Group>
                        <Form.Label className="fw-semibold small">Password *</Form.Label>
                        <div className="position-relative">
                          <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6c757d', zIndex: 1 }} />
                          <Form.Control
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Create a password"
                            isInvalid={!!errors.password}
                            style={{ paddingLeft: '40px', paddingRight: '40px' }}
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
                          <Form.Control.Feedback type="invalid">
                            {errors.password}
                          </Form.Control.Feedback>
                        </div>
                      </Form.Group>
                    </Col>

                    {/* Confirm Password */}
                    <Col xs={12} md={6}>
                      <Form.Group>
                        <Form.Label className="fw-semibold small">Confirm Password *</Form.Label>
                        <div className="position-relative">
                          <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6c757d', zIndex: 1 }} />
                          <Form.Control
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                            isInvalid={!!errors.confirmPassword}
                            style={{ paddingLeft: '40px', paddingRight: '40px' }}
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
                          <Form.Control.Feedback type="invalid">
                            {errors.confirmPassword}
                          </Form.Control.Feedback>
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Submit Button */}
                  <div className="d-grid gap-2 mt-4">
                    <Button 
                      variant="primary" 
                      size="lg" 
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? 'Creating Account...' : 'Create Account'}
                    </Button>
                  </div>

                  {/* Login Link */}
                  <div className="text-center mt-3">
                    <p className="text-muted small mb-0">
                      Already have an account?{' '}
                      <Link to="/login" style={{ color: '#0d6efd', textDecoration: 'none', fontWeight: 600 }}>
                        Login here
                      </Link>
                    </p>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;