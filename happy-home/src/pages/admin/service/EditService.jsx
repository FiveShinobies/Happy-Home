// import { useState, useEffect } from 'react';
// import { Form, Button, Card, Alert } from 'react-bootstrap';
// import { useNavigate, useParams } from 'react-router-dom';
// import { ArrowLeft, Save } from 'lucide-react';
// import dayjs from 'dayjs';
// let services = [
//   {
//     id: 1,
//     name: 'Home Cleaning',
//     description: 'Professional deep cleaning service for your entire home',
//     fullDescription: 'Our comprehensive home cleaning service includes dusting, vacuuming, mopping, bathroom sanitization, kitchen cleaning, and more. Our trained professionals use eco-friendly products to ensure your home is spotless and safe for your family.',
//     price: 99.99,
//     category: 'Cleaning',
//     image: 'https://images.pexels.com/photos/4108715/pexels-photo-4108715.jpeg?auto=compress&cs=tinysrgb&w=800',
//     createdAt: dayjs().subtract(30, 'day').format(),
//     updatedAt: dayjs().subtract(5, 'day').format(),
//   },
//   {
//     id: 2,
//     name: 'Plumbing Services',
//     description: 'Expert plumbing solutions for all your household needs',
//     fullDescription: 'From fixing leaky faucets to installing new fixtures, our licensed plumbers handle all plumbing tasks with precision. We offer emergency services, pipe repairs, drain cleaning, water heater installation, and complete bathroom renovations.',
//     price: 150.00,
//     category: 'Maintenance',
//     image: 'https://images.pexels.com/photos/8860752/pexels-photo-8860752.jpeg?auto=compress&cs=tinysrgb&w=800',
//     createdAt: dayjs().subtract(25, 'day').format(),
//     updatedAt: dayjs().subtract(10, 'day').format(),
//   },
//   {
//     id: 3,
//     name: 'Electrical Repair',
//     description: 'Safe and reliable electrical services by certified electricians',
//     fullDescription: 'Our certified electricians provide comprehensive electrical services including wiring installation, circuit breaker repairs, lighting fixture installation, electrical panel upgrades, and safety inspections. We ensure all work meets local codes and safety standards.',
//     price: 120.00,
//     category: 'Maintenance',
//     image: 'https://images.pexels.com/photos/5691621/pexels-photo-5691621.jpeg?auto=compress&cs=tinysrgb&w=800',
//     createdAt: dayjs().subtract(20, 'day').format(),
//     updatedAt: dayjs().subtract(8, 'day').format(),
//   },
//   {
//     id: 4,
//     name: 'Lawn Care',
//     description: 'Keep your lawn green and beautiful all year round',
//     fullDescription: 'Our lawn care specialists provide mowing, edging, fertilization, weed control, aeration, and seasonal cleanup services. We create customized maintenance plans to keep your lawn healthy and attractive throughout the year.',
//     price: 75.00,
//     category: 'Gardening',
//     image: 'https://images.pexels.com/photos/1453499/pexels-photo-1453499.jpeg?auto=compress&cs=tinysrgb&w=800',
//     createdAt: dayjs().subtract(15, 'day').format(),
//     updatedAt: dayjs().subtract(3, 'day').format(),
//   },
//   {
//     id: 5,
//     name: 'Pest Control',
//     description: 'Eliminate pests safely and effectively from your home',
//     fullDescription: 'Our pest control experts use safe, environmentally-friendly methods to eliminate and prevent infestations of insects, rodents, and other pests. We offer one-time treatments and ongoing maintenance plans with guaranteed results.',
//     price: 130.00,
//     category: 'Maintenance',
//     image: 'https://images.pexels.com/photos/5217915/pexels-photo-5217915.jpeg?auto=compress&cs=tinysrgb&w=800',
//     createdAt: dayjs().subtract(12, 'day').format(),
//     updatedAt: dayjs().subtract(2, 'day').format(),
//   },
//   {
//     id: 6,
//     name: 'HVAC Service',
//     description: 'Heating and cooling system installation and maintenance',
//     fullDescription: 'Stay comfortable year-round with our HVAC services. We install, repair, and maintain heating and air conditioning systems, perform seasonal tune-ups, replace filters, and provide emergency repairs to ensure optimal performance and energy efficiency.',
//     price: 180.00,
//     category: 'Maintenance',
//     image: 'https://images.pexels.com/photos/5463577/pexels-photo-5463577.jpeg?auto=compress&cs=tinysrgb&w=800',
//     createdAt: dayjs().subtract(8, 'day').format(),
//     updatedAt: dayjs().subtract(1, 'day').format(),
//   },
// ];

// export const getAllServices = () => {
//   return [...services];
// };

// export const getServiceById = (id) => {
//   return services.find(service => service.id === parseInt(id));
// };

// export const addService = (serviceData) => {
//   const newService = {
//     ...serviceData,
//     id: Math.max(...services.map(s => s.id), 0) + 1,
//     createdAt: dayjs().format(),
//     updatedAt: dayjs().format(),
//   };
//   services.push(newService);
//   return newService;
// };

// export const updateService = (id, serviceData) => {
//   const index = services.findIndex(service => service.id === parseInt(id));
//   if (index !== -1) {
//     services[index] = {
//       ...services[index],
//       ...serviceData,
//       id: services[index].id,
//       createdAt: services[index].createdAt,
//       updatedAt: dayjs().format(),
//     };
//     return services[index];
//   }
//   return null;
// };

// export const deleteService = (id) => {
//   const index = services.findIndex(service => service.id === parseInt(id));
//   if (index !== -1) {
//     services.splice(index, 1);
//     return true;
//   }
//   return false;
// };

// function EditService() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [validated, setValidated] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [notFound, setNotFound] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     fullDescription: '',
//     price: '',
//     category: '',
//     image: '',
//   });

//   const categories = ['Cleaning', 'Maintenance', 'Gardening', 'Repairs', 'Installation'];

//   useEffect(() => {
//     const service = getServiceById(id);
//     if (service) {
//       setFormData({
//         name: service.name,
//         description: service.description,
//         fullDescription: service.fullDescription,
//         price: service.price.toString(),
//         category: service.category,
//         image: service.image,
//       });
//     } else {
//       setNotFound(true);
//     }
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const form = e.currentTarget;

//     if (form.checkValidity() === false) {
//       e.stopPropagation();
//       setValidated(true);
//       return;
//     }

//     const serviceData = {
//       ...formData,
//       price: parseFloat(formData.price),
//     };

//     updateService(id, serviceData);
//     setShowSuccess(true);

//     setTimeout(() => {
//       navigate('/');
//     }, 1500);
//   };

//   const handleCancel = () => {
//     navigate('/');
//   };

//   if (notFound) {
//     return (
//       <div>
//         <Alert variant="danger">
//           Service not found!
//         </Alert>
//         <Button variant="primary" onClick={() => navigate('/')}>
//           <ArrowLeft size={16} className="me-1" />
//           Back to List
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2 className="text-primary mb-0">Edit Service</h2>
//         <Button variant="outline-secondary" onClick={handleCancel}>
//           <ArrowLeft size={16} className="me-1" />
//           Back to List
//         </Button>
//       </div>

//       {showSuccess && (
//         <Alert variant="success">
//           Service updated successfully! Redirecting...
//         </Alert>
//       )}

//       <Card className="shadow-sm">
//         <Card.Body>
//           <Form noValidate validated={validated} onSubmit={handleSubmit}>
//             <Form.Group className="mb-3">
//               <Form.Label>Service Name *</Form.Label>
//               <Form.Control
//                 required
//                 type="text"
//                 name="name"
//                 placeholder="Enter service name"
//                 value={formData.name}
//                 onChange={handleChange}
//               />
//               <Form.Control.Feedback type="invalid">
//                 Please provide a service name.
//               </Form.Control.Feedback>
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Image URL *</Form.Label>
//               <Form.Control
//                 required
//                 type="url"
//                 name="image"
//                 placeholder="https://example.com/image.jpg"
//                 value={formData.image}
//                 onChange={handleChange}
//               />
//               <Form.Text className="text-muted">
//                 Enter a valid image URL (use stock photos from Pexels)
//               </Form.Text>
//               <Form.Control.Feedback type="invalid">
//                 Please provide a valid image URL.
//               </Form.Control.Feedback>
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Short Description *</Form.Label>
//               <Form.Control
//                 required
//                 as="textarea"
//                 rows={2}
//                 name="description"
//                 placeholder="Brief description (shown in card)"
//                 value={formData.description}
//                 onChange={handleChange}
//               />
//               <Form.Control.Feedback type="invalid">
//                 Please provide a short description.
//               </Form.Control.Feedback>
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Full Description *</Form.Label>
//               <Form.Control
//                 required
//                 as="textarea"
//                 rows={4}
//                 name="fullDescription"
//                 placeholder="Detailed description (shown in details page)"
//                 value={formData.fullDescription}
//                 onChange={handleChange}
//               />
//               <Form.Control.Feedback type="invalid">
//                 Please provide a full description.
//               </Form.Control.Feedback>
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Category *</Form.Label>
//               <Form.Select
//                 required
//                 name="category"
//                 value={formData.category}
//                 onChange={handleChange}
//               >
//                 <option value="">Select a category</option>
//                 {categories.map(cat => (
//                   <option key={cat} value={cat}>{cat}</option>
//                 ))}
//               </Form.Select>
//               <Form.Control.Feedback type="invalid">
//                 Please select a category.
//               </Form.Control.Feedback>
//             </Form.Group>

//             <Form.Group className="mb-4">
//               <Form.Label>Price ($) *</Form.Label>
//               <Form.Control
//                 required
//                 type="number"
//                 step="0.01"
//                 min="0"
//                 name="price"
//                 placeholder="0.00"
//                 value={formData.price}
//                 onChange={handleChange}
//               />
//               <Form.Control.Feedback type="invalid">
//                 Please provide a valid price.
//               </Form.Control.Feedback>
//             </Form.Group>

//             <div className="d-flex gap-2">
//               <Button variant="primary" type="submit">
//                 <Save size={16} className="me-1" />
//                 Update Service
//               </Button>
//               <Button variant="outline-secondary" type="button" onClick={handleCancel}>
//                 Cancel
//               </Button>
//             </div>
//           </Form>
//         </Card.Body>
//       </Card>
//     </div>
//   );
// }

// export default EditService;

import { useState, useEffect } from 'react';
import { ArrowLeft, Save, X, CheckCircle } from 'lucide-react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditService = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [categories, setCategories] = useState([]);
  const [serviceImg, setServiceImg] = useState(null);
  const [loading, setLoading] = useState(false);


  // Get service ID from URL (for demo, using a fixed ID)
  // const serviceId = 1; // You can get this from URL params in your actual app

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    fullDescription: '',
    price: '',
    category: '',
    //image: '',
  });

  const [errors, setErrors] = useState({});

  // const categories = ['CLEANING', 'PLUMBING', 'ELECTRICAL', 'PAINTING', 'CARPENTRY', 'AC_REPAIR', 'APPLIANCE_REPAIR', 'PEST_CONTROL', 'GARDENING'];

  useEffect(() => {
    const fetchServiceDetails = async () => {

      try {

        const response = await axios.get(`http://localhost:8080/admin/services/${id}`);
        const service = await response.data;
        const category = await axios.get(`http://localhost:8080/services/categories`);
        setCategories(category.data);
        setFormData({
          name: service.serviceName || '',
          description: service.shortDesc || '',
          fullDescription: service.longDesc || '',
          price: service.price?.toString() || '',
          category: service.category || '',
          //image: service.images?.[0] || '',
        });
      } catch (error) {
        console.error('Error fetching service deatils:', error);
        setNotFound(true);
      }
    };

    fetchServiceDetails();
  }, [id]);

  useEffect(() => {
    const fetchCategories = async () => {

      try {
        // Replace with your actual API endpoint
        //const response = await axios.get(`http://localhost:8080/admin/services/${serviceId}`);
        const response = await axios.get(`http://localhost:8080/services/categories`);
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

    if (!formData.name.trim()) newErrors.name = 'Service name is required';
    if (!formData.description.trim()) newErrors.description = 'Short description is required';
    if (!formData.fullDescription.trim()) newErrors.fullDescription = 'Full description is required';
    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }
    // if (!formData.category) newErrors.category = 'Category is required';
    // if (!formData.image.trim()) {
    //   newErrors.image = 'Image URL is required';
    // } else if (!/^https?:\/\/.+/.test(formData.image)) {
    //   newErrors.image = 'Please provide a valid URL';
    // }

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
        category: formData.category,
        // images: [formData.image],
      };

      const form = new FormData();

      // Replace with your actual API endpoint
      // const response = await axios.put(`http://localhost:8080/admin/service/${id}`, serviceData, {
      //   headers: {
      //     'Content-Type': 'application/json',
      //   }
      // });
      form.append('data', new Blob([JSON.stringify(servicesData)], { type: 'application/json' }));
      if (serviceImg) {
        form.append('image', serviceImg);
      }
      const response = await axios.put(`http://localhost:8080/admin/service/${id}`, form, {

      });


      setShowSuccess(true);
      setTimeout(() => {
        navigate('/admin-home/service-listing');
      }, 1500);
    } catch (error) {
      console.error('Error updating service:', error);
      setShowError(true);
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
              Your service has been updated successfully. You'll be redirected to the service listing page shortly.
            </p>
          </div>
        </div>
      )}
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.container}>
          <div style={styles.headerContent}>
            <h2 style={styles.title}>Edit Service</h2>
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
        {/* Success Alert */}
        {showSuccess && (
          <div style={{ ...styles.alert, ...styles.successAlert }}>
            <span>✓</span>
            Service updated successfully! Redirecting...
          </div>
        )}

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
                {loading ? 'Updating...' : 'Update Service'}
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

export default EditService;