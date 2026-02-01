import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { MapPin, Home, Building2, Map, Navigation, X } from 'lucide-react';
import { toast } from 'react-toastify';
import api from "../../api/api"

const AddAddressForm = ({ show, onHide, onAddressAdded, consumerId }) => {
  const [formData, setFormData] = useState({
    homeNo: '',
    town: '',
    city: '',
    state: '',
    pincode: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Indian states for dropdown
  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Puducherry', 'Chandigarh',
    'Dadra and Nagar Haveli', 'Daman and Diu', 'Lakshadweep', 'Andaman and Nicobar'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Home Number validation
    if (!formData.homeNo.trim()) {
      newErrors.homeNo = 'House/Flat number is required';
    }

    // Town validation
    if (!formData.town.trim()) {
      newErrors.town = 'Area/Town is required';
    } else if (formData.town.trim().length < 2) {
      newErrors.town = 'Area/Town must be at least 2 characters';
    }

    // City validation
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    } else if (formData.city.trim().length < 2) {
      newErrors.city = 'City must be at least 2 characters';
    }

    // State validation
    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }

    // Pincode validation
    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Pincode must be exactly 6 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setLoading(true);

    try {
      // Get consumer ID from sessionStorage if not passed as prop
      const userId = consumerId || JSON.parse(sessionStorage.getItem('user')).userId;
      
      // POST request to add address
      const response = await api.post(
        `/consumer/add-address/${userId}`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('✅ Address added successfully:', response.data);
      toast.success('Address added successfully!');
      
      // Reset form
      setFormData({
        homeNo: '',
        town: '',
        city: '',
        state: '',
        pincode: ''
      });
      
      // Call callback if provided
      if (onAddressAdded) {
        onAddressAdded(response.data);
      }
      
      // Close modal
      onHide();
      
    } catch (error) {
      console.error('❌ Error adding address:', error);
      toast.error(error.response?.data?.message || 'Failed to add address');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      homeNo: '',
      town: '',
      city: '',
      state: '',
      pincode: ''
    });
    setErrors({});
    onHide();
  };

  return (
    <Modal 
      show={show} 
      onHide={handleCancel} 
      centered
      size="lg"
    >
      <Modal.Header 
        style={{ 
          background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
          color: '#ffffff',
          border: 'none',
          padding: '1.5rem'
        }}
      >
        <div className="d-flex align-items-center gap-3 w-100">
          <div 
            className="d-flex align-items-center justify-content-center"
            style={{
              width: 48,
              height: 48,
              background: 'rgba(255,255,255,0.15)',
              borderRadius: '10px',
              border: '2px solid rgba(255,255,255,0.2)'
            }}
          >
            <MapPin size={24} />
          </div>
          <div className="flex-grow-1">
            <Modal.Title className="mb-0" style={{ fontSize: '1.5rem', fontWeight: 700 }}>
              Add New Address
            </Modal.Title>
            <p className="mb-0 small" style={{ opacity: 0.9 }}>
              Add a new delivery address to your account
            </p>
          </div>
          <button
            onClick={handleCancel}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '2px solid rgba(255,255,255,0.2)',
              color: '#ffffff',
              width: 36,
              height: 36,
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>
        </div>
      </Modal.Header>

      <Modal.Body style={{ padding: '2rem' }}>
        <Form onSubmit={handleSubmit2}>
          {/* Home Number */}
          <Form.Group className="mb-3">
            <Form.Label 
              className="fw-semibold d-flex align-items-center gap-2"
              style={{ color: '#1e293b' }}
            >
              <Home size={18} color="#1e40af" />
              House/Flat Number <span style={{ color: '#EF4444' }}>*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="homeNo"
              value={formData.homeNo}
              onChange={handleChange}
              placeholder="e.g., A-101, Building 5"
              isInvalid={!!errors.homeNo}
              style={{
                borderRadius: '8px',
                border: '2px solid #e2e8f0',
                padding: '0.75rem',
                fontSize: '0.95rem'
              }}
            />
            <Form.Control.Feedback type="invalid">
              {errors.homeNo}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Town/Area */}
          <Form.Group className="mb-3">
            <Form.Label 
              className="fw-semibold d-flex align-items-center gap-2"
              style={{ color: '#1e293b' }}
            >
              <Building2 size={18} color="#1e40af" />
              Area/Town <span style={{ color: '#EF4444' }}>*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="town"
              value={formData.town}
              onChange={handleChange}
              placeholder="e.g., Koramangala, Banjara Hills"
              isInvalid={!!errors.town}
              style={{
                borderRadius: '8px',
                border: '2px solid #e2e8f0',
                padding: '0.75rem',
                fontSize: '0.95rem'
              }}
            />
            <Form.Control.Feedback type="invalid">
              {errors.town}
            </Form.Control.Feedback>
          </Form.Group>

          {/* City and State - Side by side */}
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label 
                  className="fw-semibold d-flex align-items-center gap-2"
                  style={{ color: '#1e293b' }}
                >
                  <Navigation size={18} color="#1e40af" />
                  City <span style={{ color: '#EF4444' }}>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="e.g., Bangalore, Hyderabad"
                  isInvalid={!!errors.city}
                  style={{
                    borderRadius: '8px',
                    border: '2px solid #e2e8f0',
                    padding: '0.75rem',
                    fontSize: '0.95rem'
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.city}
                </Form.Control.Feedback>
              </Form.Group>
            </div>

            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label 
                  className="fw-semibold d-flex align-items-center gap-2"
                  style={{ color: '#1e293b' }}
                >
                  <Map size={18} color="#1e40af" />
                  State <span style={{ color: '#EF4444' }}>*</span>
                </Form.Label>
                <Form.Select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  isInvalid={!!errors.state}
                  style={{
                    borderRadius: '8px',
                    border: '2px solid #e2e8f0',
                    padding: '0.75rem',
                    fontSize: '0.95rem'
                  }}
                >
                  <option value="">Select State</option>
                  {indianStates.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.state}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </div>

          {/* Pincode */}
          <Form.Group className="mb-4">
            <Form.Label 
              className="fw-semibold d-flex align-items-center gap-2"
              style={{ color: '#1e293b' }}
            >
              <MapPin size={18} color="#1e40af" />
              Pincode <span style={{ color: '#EF4444' }}>*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="e.g., 560001"
              maxLength={6}
              isInvalid={!!errors.pincode}
              style={{
                borderRadius: '8px',
                border: '2px solid #e2e8f0',
                padding: '0.75rem',
                fontSize: '0.95rem'
              }}
            />
            <Form.Control.Feedback type="invalid">
              {errors.pincode}
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              Enter 6-digit Indian postal code
            </Form.Text>
          </Form.Group>

          {/* Info Box */}
          <div 
            className="p-3 mb-4"
            style={{
              background: '#f0f9ff',
              border: '2px solid #bfdbfe',
              borderRadius: '8px'
            }}
          >
            <p className="mb-0 small" style={{ color: '#1e40af' }}>
              <strong>Note:</strong> This address will be added to your saved addresses and can be used for future orders.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="d-flex gap-2">
            <Button
              type="button"
              onClick={handleCancel}
              disabled={loading}
              style={{
                flex: 1,
                padding: '0.75rem',
                borderRadius: '8px',
                border: '2px solid #e2e8f0',
                background: '#ffffff',
                color: '#1e293b',
                fontWeight: 600,
                fontSize: '1rem'
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              style={{
                flex: 1,
                padding: '0.75rem',
                borderRadius: '8px',
                border: 'none',
                background: '#1e40af',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '1rem'
              }}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Adding...
                </>
              ) : (
                <>
                  <MapPin size={18} className="me-2" />
                  Add Address
                </>
              )}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddAddressForm;