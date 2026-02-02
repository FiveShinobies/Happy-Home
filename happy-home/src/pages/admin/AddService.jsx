import { useState, useEffect } from 'react';
import { ArrowLeft, Save, X, CheckCircle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import api from "../../api/api";

const AddService = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [serviceImg, setServiceImg] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    fullDescription: '',
    price: '',
    category: '',
    //image: '',
  });

  const [errors, setErrors] = useState({});



  useEffect(() => {
    const fetchCategories = async () => {

      try {
        const response = await api.get(`/services/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setNotFound(true);
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
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Service name is required";
    } else if (formData.name.length < 3 || formData.name.length > 100) {
      newErrors.name = "Service name must be 3–100 characters";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Short description is required";
    } else if (formData.description.length > 255) {
      newErrors.description = "Short description must be under 255 characters";
    }

    if (!formData.fullDescription.trim()) {
      newErrors.fullDescription = "Long description is required";
    } else if (formData.fullDescription.length < 10) {
      newErrors.fullDescription = "Long description must be at least 10 characters";
    }

    if (!formData.price) {
      newErrors.price = "Price is required";
    } else if (parseFloat(formData.price) < 10) {
      newErrors.price = "Price must be at least ₹10";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    setLoading(true);
    setShowError(false);

    try {
      const servicesData = {
        serviceName: formData.name,
        shortDesc: formData.description,
        longDesc: formData.fullDescription,
        price: parseFloat(formData.price),
        category: formData.category
      };

      const form = new FormData();

      form.append('data', new Blob([JSON.stringify(servicesData)], { type: 'application/json' }));
      if (serviceImg) {
        form.append('image', serviceImg);
      }

      const response = await api.post(`/admin/service/add`, form, {
      });
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/admin-home/service-listing');
      }, 1500);
    } catch (error) {
      console.error("Error creating service:", error);

      const data = error.response?.data;

      if (data?.errors && Array.isArray(data.errors)) {
        const fieldErrors = {};

        data.errors.forEach((err) => {
          const uiField = backendFieldMap[err.field] || err.field;
          fieldErrors[uiField] = err.defaultMessage;
        });

        setErrors(fieldErrors);
        setShowError(true);
      } else {
        setShowError(true);
      }

      setTimeout(() => setShowError(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin-home/service-listing');
  };

  const styles = {
    pageBackground: {
      minHeight: '100vh',
      background: '#ffffff',
      paddingTop: '40px',
      paddingBottom: '40px'
    },
    header: {
      background: '#ffffff',
      borderBottom: '1px solid #e0e0e0',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      marginBottom: '2rem'
    },
    container: {
      maxWidth: '900px',
      margin: '0 auto',
      padding: '0 15px'
    },
    headerContent: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 0'
    },
    title: {
      fontWeight: 'bold',
      marginBottom: 0,
      color: '#1e40af',
      fontSize: '1.75rem'
    },
    backBtn: {
      background: 'none',
      border: '2px solid #6c757d',
      color: '#6c757d',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      borderRadius: '0.75rem',
      transition: 'all 0.2s ease'
    },
    card: {
      borderRadius: '1rem',
      border: '1px solid #e0e0e0',
      background: '#ffffff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      padding: '2.5rem'
    },
    alert: {
      padding: '1rem',
      marginBottom: '1.5rem',
      borderRadius: '0.75rem',
      border: '1px solid',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    successAlert: {
      backgroundColor: '#d1e7dd',
      color: '#0f5132',
      borderColor: '#badbcc'
    },
    errorAlert: {
      backgroundColor: '#f8d7da',
      color: '#842029',
      borderColor: '#f5c2c7'
    },
    // Modal styles
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      animation: 'fadeIn 0.3s ease-out'
    },
    modalContent: {
      backgroundColor: '#ffffff',
      borderRadius: '1rem',
      padding: '2.5rem',
      textAlign: 'center',
      maxWidth: '400px',
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
      animation: 'slideUp 0.4s ease-out'
    },
    successIcon: {
      color: '#10b981',
      marginBottom: '1rem'
    },
    modalTitle: {
      color: '#10b981',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginBottom: '0.5rem'
    },
    modalMessage: {
      color: '#6b7280',
      fontSize: '0.95rem',
      marginBottom: '1.5rem',
      lineHeight: '1.5'
    },
    formGroup: {
      marginBottom: '1.5rem'
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      fontSize: '0.875rem',
      fontWeight: '600',
      color: '#000000'
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      fontSize: '0.875rem',
      border: '1px solid #ced4da',
      borderRadius: '0.75rem',
      outline: 'none',
      transition: 'border-color 0.2s',
      fontFamily: 'inherit'
    },
    inputError: {
      borderColor: '#dc3545'
    },
    textarea: {
      width: '100%',
      padding: '0.75rem',
      fontSize: '0.875rem',
      border: '1px solid #ced4da',
      borderRadius: '0.75rem',
      outline: 'none',
      transition: 'border-color 0.2s',
      fontFamily: 'inherit',
      resize: 'vertical'
    },
    select: {
      width: '100%',
      padding: '0.75rem',
      fontSize: '0.875rem',
      border: '1px solid #ced4da',
      borderRadius: '0.75rem',
      outline: 'none',
      transition: 'border-color 0.2s',
      backgroundColor: '#ffffff',
      cursor: 'pointer'
    },
    errorText: {
      color: '#dc3545',
      fontSize: '0.75rem',
      marginTop: '0.25rem'
    },
    helpText: {
      color: '#6c757d',
      fontSize: '0.75rem',
      marginTop: '0.25rem'
    },
    buttonGroup: {
      display: 'flex',
      gap: '0.75rem',
      marginTop: '2rem'
    },
    submitButton: {
      padding: '0.75rem 1.5rem',
      backgroundColor: '#1e40af',
      color: '#ffffff',
      border: 'none',
      borderRadius: '0.75rem',
      fontSize: '1rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'background 0.2s',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    submitButtonDisabled: {
      backgroundColor: '#6c757d',
      cursor: 'not-allowed'
    },
    cancelButton: {
      padding: '0.75rem 1.5rem',
      backgroundColor: '#ffffff',
      color: '#6c757d',
      border: '2px solid #6c757d',
      borderRadius: '0.75rem',
      fontSize: '1rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.2s',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    }
  };

  if (notFound) {
    return (
      <div style={styles.pageBackground}>
        <div style={styles.container}>
          <div style={{ ...styles.alert, ...styles.errorAlert }}>
            Service not found!
          </div>
          <button
            style={styles.backBtn}
            onClick={() => navigate('/admin-home/service-listing')}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#6c757d';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#6c757d';
            }}
          >
            <ArrowLeft size={16} />
            Back to List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.pageBackground}>
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        
        .success-icon {
          animation: pulse 0.6s ease-in-out;
        }
      `}</style>

      {/* Success Modal */}
      {showSuccess && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <div style={styles.successIcon} className="success-icon">
              <CheckCircle size={64} />
            </div>
            <h3 style={styles.modalTitle}>Success!</h3>
            <p style={styles.modalMessage}>
              Your service has been created successfully. You'll be redirected to the service listing page shortly.
            </p>
          </div>
        </div>
      )}
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.container}>
          <div style={styles.headerContent}>
            <h2 style={styles.title}>Add New Service</h2>
            <button
              style={styles.backBtn}
              onClick={handleCancel}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#6c757d';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#6c757d';
              }}
            >
              <ArrowLeft size={16} />
              Back to List
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.container}>
        {/* Error Alert */}
        {showError && (
          <div style={{ ...styles.alert, ...styles.errorAlert }}>
            <span>✕</span>
            Please fix all errors before submitting.
          </div>
        )}

        {/* Form Card */}
        <div style={styles.card}>
          <div>
            {/* Service Name */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Service Name *</label>
              <input
                type="text"
                name="name"
                placeholder="Enter service name"
                value={formData.name}
                onChange={handleChange}
                style={{
                  ...styles.input,
                  ...(errors.name ? styles.inputError : {})
                }}
              />
              {errors.name && <div style={styles.errorText}>{errors.name}</div>}
            </div>

            {/* Image URL */}
            {/* <div style={styles.formGroup}>
              <label style={styles.label}>Image URL *</label>
              <input
                type="url"
                name="image"  
                placeholder="https://example.com/image.jpg"
                value={formData.image}
                onChange={handleChange}
                style={{
                  ...styles.input,
                  ...(errors.image ? styles.inputError : {})
                }}
              />
              <div style={styles.helpText}>
                Enter a valid image URL (use stock photos from Pexels or Unsplash)
              </div>
              {errors.image && <div style={styles.errorText}>{errors.image}</div>}
            </div> */}

            {/* Short Description */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Short Description *</label>
              <textarea
                rows={2}
                name="description"
                placeholder="Brief description (shown in card)"
                value={formData.description}
                onChange={handleChange}
                style={{
                  ...styles.textarea,
                  ...(errors.description ? styles.inputError : {})
                }}
              />
              {errors.description && <div style={styles.errorText}>{errors.description}</div>}
            </div>

            {/* Full Description */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Full Description *</label>
              <textarea
                rows={5}
                name="fullDescription"
                placeholder="Detailed description (shown in details page)"
                value={formData.fullDescription}
                onChange={handleChange}
                style={{
                  ...styles.textarea,
                  ...(errors.fullDescription ? styles.inputError : {})
                }}
              />
              {errors.fullDescription && <div style={styles.errorText}>{errors.fullDescription}</div>}
            </div>

            {/* Category */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                style={{
                  ...styles.select,
                  ...(errors.category ? styles.inputError : {})
                }}
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat.replace('_', ' ')}
                  </option>
                ))}
              </select>
              {errors.category && <div style={styles.errorText}>{errors.category}</div>}
            </div>

            {/* Price */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Price (₹) *</label>
              <input
                type="number"
                step="0.01"
                min="0"
                name="price"
                placeholder="0.00"
                value={formData.price}
                onChange={handleChange}
                style={{
                  ...styles.input,
                  ...(errors.price ? styles.inputError : {})
                }}
              />
              {errors.price && <div style={styles.errorText}>{errors.price}</div>}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Service Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setServiceImg(e.target.files[0])}
                style={styles.input}
              />
            </div>

            {/* Buttons */}
            <div style={styles.buttonGroup}>
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={loading}
                style={{
                  ...styles.submitButton,
                  ...(loading ? styles.submitButtonDisabled : {})
                }}
                onMouseOver={(e) => {
                  if (!loading) e.currentTarget.style.backgroundColor = '#1e3a8a';
                }}
                onMouseOut={(e) => {
                  if (!loading) e.currentTarget.style.backgroundColor = '#1e40af';
                }}
              >
                <Save size={16} />
                {loading ? 'Creating...' : 'Create Service'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                style={styles.cancelButton}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#6c757d';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.color = '#6c757d';
                }}
              >
                <X size={16} />
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddService;