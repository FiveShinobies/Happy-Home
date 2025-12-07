import { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Eye, Edit, Trash2 } from 'lucide-react';
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

function ServiceListing() {
  const [services, setServices] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = () => {
    const allServices = getAllServices();
    setServices(allServices);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      deleteService(id);
      loadServices();
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin-home/edit-service/${id}`);
  };

  const handleViewDetails = (id) => {
    navigate(`/admin-home/view-service/${id}`);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary mb-0">All Services</h2>
        <Button variant="primary" onClick={() => navigate('/admin-home/add-service')}>
          Add New Service
        </Button>
      </div>

      {showAlert && (
        <Alert variant="success" dismissible onClose={() => setShowAlert(false)}>
          Service deleted successfully!
        </Alert>
      )}

      {services.length === 0 ? (
        <Alert variant="info">
          No services available. Start by adding a new service.
        </Alert>
      ) : (
        <Row>
          {services.map((service) => (
            <Col key={service.id} lg={4} md={6} className="mb-4">
              <Card className="h-100 shadow-sm service-card">
                <Card.Img
                  variant="top"
                  src={service.image}
                  alt={service.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="text-primary">{service.name}</Card.Title>
                  <Card.Text className="text-muted flex-grow-1">
                    {service.description}
                  </Card.Text>
                  <div className="mb-3">
                    <span className="badge bg-secondary me-2">{service.category}</span>
                    <span className="fw-bold text-primary">${service.price.toFixed(2)}</span>
                  </div>
                  <div className="d-flex gap-2">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="flex-fill"
                      onClick={() => handleViewDetails(service.id)}
                    >
                      <Eye size={16} className="me-1" />
                      View
                    </Button>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      className="flex-fill"
                      onClick={() => handleEdit(service.id)}
                    >
                      <Edit size={16} className="me-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(service.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default ServiceListing;