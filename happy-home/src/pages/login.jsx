import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-toastify';
import api from '../api/api';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
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

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
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
      // Call backend login API
      const response = await api.post(
        '/login',
        {
          email: formData.email,
          password: formData.password
        }
      );

      console.log('Login response:', response);
      // Check if login was successful
      if (response.status === 200 && response.data.status === "Success") {
        // Get role from response headers
        console.log(response.data)
        const role = response.headers['role'];
        const token = response.headers['authorization'];
        console.log('User role from headers:', role);
        console.log('User token from headers:', token);

        if (role) {
          // Store user data in localStorage
          // localStorage.setItem('userType', role.toLowerCase());
          // localStorage.setItem('user', JSON.stringify({ 
          //   email: formData.email, 
          //   role: role.toLowerCase() 
          // }));

          //used session storage instead local storage
          sessionStorage.setItem(
            'user',
            JSON.stringify({
              userId: response.data.userId,
              email: formData.email,
              role: role.toLowerCase(),
              token: token
            })
          );
          
          toast.success('Login successful!');

          // Navigate based on role
          navigate(`/${role.toLowerCase()}-home`);
        } else {
          toast.error('Role not found in response');
        }
      } else {
        toast.error('Invalid credentials');
      }

    } catch (error) {
      if (error.response) {
        // Server responded with error
        if (error.response.status === 404) {
          toast.error('Invalid email or password');
        } else {
          toast.error('Login failed. Please try again.');
        }
      } else if (error.request) {
        // Request made but no response
        toast.error('Unable to connect to server. Please check your connection.');
      } else {
        // Something else happened
        toast.error('An error occurred. Please try again.');
      }
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '40px', paddingBottom: '40px' }}>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={5}>
            <div className="text-center mb-4">
              <h1 className="fw-bold mb-2" style={{ color: '#0d6efd', fontSize: '36px' }}>HappyHome</h1>
              <p className="text-muted">Welcome back! Please login to continue</p>
            </div>

            <Card className="border-0 shadow-lg">
              <Card.Body className="p-4 p-md-5">
                <Form onSubmit={handleSubmit}>
                  {/* Email */}
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold small">Email Address</Form.Label>
                    <div className="position-relative">
                      <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6c757d' }} />
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        isInvalid={!!errors.email}
                        style={{ paddingLeft: '40px', height: '48px' }}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </div>
                  </Form.Group>

                  {/* Password */}
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold small">Password</Form.Label>
                    <div className="position-relative">
                      <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6c757d', zIndex: 1 }} />
                      <Form.Control
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        isInvalid={!!errors.password}
                        style={{ paddingLeft: '40px', paddingRight: '40px', height: '48px' }}
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

                  {/* Remember Me & Forgot Password */}
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <Form.Check
                      type="checkbox"
                      label="Remember me"
                      className="small"
                    />
                    <Link
                      to="/forgot-password"
                      style={{ color: '#0d6efd', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}
                    >
                      Forgot password?
                    </Link>
                  </div>

                  {/* Submit Button */}
                  <div className="d-grid gap-2">
                    <Button
                      variant="primary"
                      size="lg"
                      type="submit"
                      disabled={loading}
                      style={{ height: '48px' }}
                    >
                      {loading ? 'Logging in...' : 'Login'}
                    </Button>
                  </div>

                  {/* Register Link */}
                  <div className="text-center mt-4">
                    <p className="text-muted small mb-0">
                      Don't have an account?{' '}
                      <Link to="/register" style={{ color: '#0d6efd', textDecoration: 'none', fontWeight: 600 }}>
                        Register here
                      </Link>
                    </p>
                  </div>
                </Form>
              </Card.Body>
            </Card>

            {/* Additional Info */}
            <div className="text-center mt-4">
              <p className="text-muted small">
                By logging in, you agree to our{' '}
                <Link to="/terms" style={{ color: '#0d6efd', textDecoration: 'none' }}>Terms of Service</Link>
                {' '}and{' '}
                <Link to="/privacy" style={{ color: '#0d6efd', textDecoration: 'none' }}>Privacy Policy</Link>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;