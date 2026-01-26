import { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import dayjs from 'dayjs';

let services = [
  {
    id: 1,
    name: 'Home Cleaning',
    description: 'Professional deep cleaning service for your entire home',
    fullDescription: 'Our comprehensive home cleaning service includes dusting, vacuuming, mopping, bathroom sanitization, kitchen cleaning, and more. Our trained professionals use eco-friendly products to ensure your home is spotless and safe for your family.',
    price: 99.99,
    category: 'Cleaning',
    image: 'https://images.pexels.com/photos/4108715/pexels-photo-4108715.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: dayjs().subtract(30, 'day').format(),
    updatedAt: dayjs().subtract(5, 'day').format(),
  },
  {
    id: 2,
    name: 'Plumbing Services',
    description: 'Expert plumbing solutions for all your household needs',
    fullDescription: 'From fixing leaky faucets to installing new fixtures, our licensed plumbers handle all plumbing tasks with precision. We offer emergency services, pipe repairs, drain cleaning, water heater installation, and complete bathroom renovations.',
    price: 150.00,
    category: 'Maintenance',
    image: 'https://images.pexels.com/photos/8860752/pexels-photo-8860752.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: dayjs().subtract(25, 'day').format(),
    updatedAt: dayjs().subtract(10, 'day').format(),
  },
  {
    id: 3,
    name: 'Electrical Repair',
    description: 'Safe and reliable electrical services by certified electricians',
    fullDescription: 'Our certified electricians provide comprehensive electrical services including wiring installation, circuit breaker repairs, lighting fixture installation, electrical panel upgrades, and safety inspections. We ensure all work meets local codes and safety standards.',
    price: 120.00,
    category: 'Maintenance',
    image: 'https://images.pexels.com/photos/5691621/pexels-photo-5691621.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: dayjs().subtract(20, 'day').format(),
    updatedAt: dayjs().subtract(8, 'day').format(),
  },
  {
    id: 4,
    name: 'Lawn Care',
    description: 'Keep your lawn green and beautiful all year round',
    fullDescription: 'Our lawn care specialists provide mowing, edging, fertilization, weed control, aeration, and seasonal cleanup services. We create customized maintenance plans to keep your lawn healthy and attractive throughout the year.',
    price: 75.00,
    category: 'Gardening',
    image: 'https://images.pexels.com/photos/1453499/pexels-photo-1453499.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: dayjs().subtract(15, 'day').format(),
    updatedAt: dayjs().subtract(3, 'day').format(),
  },
  {
    id: 5,
    name: 'Pest Control',
    description: 'Eliminate pests safely and effectively from your home',
    fullDescription: 'Our pest control experts use safe, environmentally-friendly methods to eliminate and prevent infestations of insects, rodents, and other pests. We offer one-time treatments and ongoing maintenance plans with guaranteed results.',
    price: 130.00,
    category: 'Maintenance',
    image: 'https://images.pexels.com/photos/5217915/pexels-photo-5217915.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: dayjs().subtract(12, 'day').format(),
    updatedAt: dayjs().subtract(2, 'day').format(),
  },
  {
    id: 6,
    name: 'HVAC Service',
    description: 'Heating and cooling system installation and maintenance',
    fullDescription: 'Stay comfortable year-round with our HVAC services. We install, repair, and maintain heating and air conditioning systems, perform seasonal tune-ups, replace filters, and provide emergency repairs to ensure optimal performance and energy efficiency.',
    price: 180.00,
    category: 'Maintenance',
    image: 'https://images.pexels.com/photos/5463577/pexels-photo-5463577.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: dayjs().subtract(8, 'day').format(),
    updatedAt: dayjs().subtract(1, 'day').format(),
  },
];

export const getAllServices = () => {
  return [...services];
};

export const getServiceById = (id) => {
  return services.find(service => service.id === parseInt(id));
};

export const addService = (serviceData) => {
  const newService = {
    ...serviceData,
    id: Math.max(...services.map(s => s.id), 0) + 1,
    createdAt: dayjs().format(),
    updatedAt: dayjs().format(),
  };
  services.push(newService);
  return newService;
};

export const updateService = (id, serviceData) => {
  const index = services.findIndex(service => service.id === parseInt(id));
  if (index !== -1) {
    services[index] = {
      ...services[index],
      ...serviceData,
      id: services[index].id,
      createdAt: services[index].createdAt,
      updatedAt: dayjs().format(),
    };
    return services[index];
  }
  return null;
};

export const deleteService = (id) => {
  const index = services.findIndex(service => service.id === parseInt(id));
  if (index !== -1) {
    services.splice(index, 1);
    return true;
  }
  return false;
};


function AddService() {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    fullDescription: '',
    price: '',
    category: '',
    image: '',
  });

  const categories = ['Cleaning', 'Maintenance', 'Gardening', 'Repairs', 'Installation'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    const serviceData = {
      ...formData,
      price: parseFloat(formData.price),
    };

    addService(serviceData);
    setShowSuccess(true);

    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary mb-0">Add New Service</h2>
        <Button variant="outline-secondary" onClick={handleCancel}>
          <ArrowLeft size={16} className="me-1" />
          Back to List
        </Button>
      </div>

      {showSuccess && (
        <Alert variant="success">
          Service added successfully! Redirecting...
        </Alert>
      )}

      <Card className="shadow-sm">
        <Card.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Service Name *</Form.Label>
              <Form.Control
                required
                type="text"
                name="name"
                placeholder="Enter service name"
                value={formData.name}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a service name.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image URL *</Form.Label>
              <Form.Control
                required
                type="url"
                name="image"
                placeholder="https://example.com/image.jpg"
                value={formData.image}
                onChange={handleChange}
              />
              <Form.Text className="text-muted">
                Enter a valid image URL (use stock photos from Pexels)
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                Please provide a valid image URL.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Short Description *</Form.Label>
              <Form.Control
                required
                as="textarea"
                rows={2}
                name="description"
                placeholder="Brief description (shown in card)"
                value={formData.description}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a short description.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Full Description *</Form.Label>
              <Form.Control
                required
                as="textarea"
                rows={4}
                name="fullDescription"
                placeholder="Detailed description (shown in details page)"
                value={formData.fullDescription}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a full description.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category *</Form.Label>
              <Form.Select
                required
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please select a category.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Price ($) *</Form.Label>
              <Form.Control
                required
                type="number"
                step="0.01"
                min="0"
                name="price"
                placeholder="0.00"
                value={formData.price}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid price.
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-flex gap-2">
              <Button variant="primary" type="submit">
                <Save size={16} className="me-1" />
                Add Service
              </Button>
              <Button variant="outline-secondary" type="button" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default AddService;