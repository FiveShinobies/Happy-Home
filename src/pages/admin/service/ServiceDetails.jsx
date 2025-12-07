import { useState, useEffect } from 'react';
import { Card, Button, Badge, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Edit, Calendar, DollarSign, Tag } from 'lucide-react';
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

function ServiceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const foundService = getServiceById(id);
    if (foundService) {
      setService(foundService);
    } else {
      setNotFound(true);
    }
  }, [id]);

  const handleBack = () => {
    navigate('/');
  };

  const handleEdit = () => {
    navigate(`/edit-service/${id}`);
  };

  if (notFound) {
    return (
      <div>
        <Alert variant="danger">
          Service not found!
        </Alert>
        <Button variant="primary" onClick={handleBack}>
          <ArrowLeft size={16} className="me-1" />
          Back to List
        </Button>
      </div>
    );
  }

  if (!service) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary mb-0">Service Details</h2>
        <div className="d-flex gap-2">
          <Button variant="outline-primary" onClick={handleEdit}>
            <Edit size={16} className="me-1" />
            Edit Service
          </Button>
          <Button variant="outline-secondary" onClick={handleBack}>
            <ArrowLeft size={16} className="me-1" />
            Back to List
          </Button>
        </div>
      </div>

      <Card className="shadow-sm">
        <Card.Img
          variant="top"
          src={service.image}
          alt={service.name}
          style={{ height: '400px', objectFit: 'cover' }}
        />
        <Card.Body>
          <div className="d-flex justify-content-between align-items-start mb-3">
            <div>
              <h3 className="text-primary mb-2">{service.name}</h3>
              <Badge bg="secondary" className="me-2">
                <Tag size={14} className="me-1" />
                {service.category}
              </Badge>
            </div>
            <div className="text-end">
              <div className="text-muted small">Price</div>
              <h4 className="text-primary mb-0">
                <DollarSign size={20} className="d-inline" />
                {service.price.toFixed(2)}
              </h4>
            </div>
          </div>

          <hr />

          <h5 className="text-dark mb-3">Description</h5>
          <p className="text-muted" style={{ lineHeight: '1.8' }}>
            {service.fullDescription}
          </p>

          <hr />

          <Row className="mt-4">
            <Col md={6}>
              <div className="d-flex align-items-center text-muted mb-2">
                <Calendar size={18} className="me-2" />
                <div>
                  <small className="d-block">Created</small>
                  <strong className="text-dark">
                    {dayjs(service.createdAt).format('MMM DD, YYYY')}
                  </strong>
                  <small className="d-block text-muted">
                    {dayjs(service.createdAt).format('h:mm A')}
                  </small>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className="d-flex align-items-center text-muted mb-2">
                <Calendar size={18} className="me-2" />
                <div>
                  <small className="d-block">Last Updated</small>
                  <strong className="text-dark">
                    {dayjs(service.updatedAt).format('MMM DD, YYYY')}
                  </strong>
                  <small className="d-block text-muted">
                    {dayjs(service.updatedAt).format('h:mm A')}
                  </small>
                </div>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ServiceDetails;
