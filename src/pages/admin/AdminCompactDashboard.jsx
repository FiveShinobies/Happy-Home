import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { 
  Package, Users, ShoppingCart, Store, 
  TrendingUp, Clock, CheckCircle, AlertCircle,
  ArrowRight, DollarSign
} from 'lucide-react';

const AdminCompactDashboard = () => {
  // Main stats
  const stats = [
    { 
      label: 'Total Revenue', 
      value: '₹45,230', 
      icon: DollarSign, 
      color: '#10B981',
      change: '+12.5%',
      period: 'vs last month'
    },
    { 
      label: 'Active Orders', 
      value: '23', 
      icon: ShoppingCart, 
      color: '#F59E0B',
      change: '+5',
      period: 'pending'
    },
    { 
      label: 'Total Vendors', 
      value: '38', 
      icon: Store, 
      color: '#8B5CF6',
      change: '+3',
      period: 'this month'
    },
    { 
      label: 'Total Services', 
      value: '24', 
      icon: Package, 
      color: '#3B82F6',
      change: '+2',
      period: 'active'
    },
  ];

  // Quick metrics
  const quickMetrics = [
    { label: 'Completed Today', value: '12', icon: CheckCircle, color: '#10B981' },
    { label: 'Pending', value: '8', icon: Clock, color: '#F59E0B' },
    { label: 'Active Consumers', value: '156', icon: Users, color: '#3B82F6' },
    { label: 'Issues', value: '2', icon: AlertCircle, color: '#EF4444' },
  ];

  // Recent orders
  const recentOrders = [
    { id: '#ORD-1234', customer: 'John Doe', service: 'Plumbing', status: 'In Progress', amount: '₹1,200' },
    { id: '#ORD-1235', customer: 'Jane Smith', service: 'Electrical', status: 'Pending', amount: '₹2,500' },
    { id: '#ORD-1236', customer: 'Mike Johnson', service: 'Cleaning', status: 'Completed', amount: '₹800' },
  ];

  // Top vendors
  const topVendors = [
    { name: 'ABC Repairs', orders: 45, rating: 4.8, revenue: '₹12,500' },
    { name: 'Quick Fix Services', orders: 38, rating: 4.6, revenue: '₹9,800' },
    { name: 'Home Solutions', orders: 32, rating: 4.7, revenue: '₹8,200' },
  ];

  return (
    <Container fluid className="p-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Header */}
      <div className="mb-4">
        <h2 className="fw-bold mb-1" style={{ color: '#000000' }}>Dashboard Overview</h2>
        <p className="text-muted small mb-0">Real-time insights and key metrics</p>
      </div>

      {/* Main Stats Grid */}
      <Row className="g-3 mb-4">
        {stats.map((stat, index) => (
          <Col key={index} xs={12} sm={6} lg={3}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="p-3">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div 
                    className="d-flex align-items-center justify-content-center rounded-2"
                    style={{ 
                      width: 40, 
                      height: 40, 
                      backgroundColor: `${stat.color}20`
                    }}
                  >
                    <stat.icon size={20} style={{ color: stat.color }} />
                  </div>
                  <TrendingUp size={16} style={{ color: '#10B981' }} />
                </div>
                <h3 className="fw-bold mb-1" style={{ color: '#000000', fontSize: '24px' }}>
                  {stat.value}
                </h3>
                <p className="text-muted small mb-1">{stat.label}</p>
                <div className="d-flex align-items-center gap-1">
                  <span className="small fw-semibold" style={{ color: stat.color }}>
                    {stat.change}
                  </span>
                  <span className="small text-muted">{stat.period}</span>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Quick Metrics */}
      <Row className="g-3 mb-4">
        {quickMetrics.map((metric, index) => (
          <Col key={index} xs={6} lg={3}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-3">
                <div className="d-flex align-items-center gap-2">
                  <metric.icon size={18} style={{ color: metric.color }} />
                  <div>
                    <h5 className="fw-bold mb-0" style={{ color: '#000000' }}>{metric.value}</h5>
                    <p className="text-muted small mb-0">{metric.label}</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="g-3">
        {/* Recent Orders */}
        <Col xs={12} lg={7}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="p-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="fw-semibold mb-0">Recent Orders</h6>
                <Link 
                  to="/all-orders" 
                  className="text-decoration-none small fw-medium d-flex align-items-center gap-1"
                  style={{ color: '#0d6efd' }}
                >
                  View All <ArrowRight size={14} />
                </Link>
              </div>
              
              <div className="table-responsive">
                <table className="table table-sm table-hover mb-0">
                  <thead style={{ backgroundColor: '#f8f9fa' }}>
                    <tr>
                      <th className="border-0 small fw-semibold">Order ID</th>
                      <th className="border-0 small fw-semibold">Customer</th>
                      <th className="border-0 small fw-semibold">Service</th>
                      <th className="border-0 small fw-semibold">Status</th>
                      <th className="border-0 small fw-semibold text-end">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order, index) => (
                      <tr key={index}>
                        <td className="small fw-medium">{order.id}</td>
                        <td className="small">{order.customer}</td>
                        <td className="small">{order.service}</td>
                        <td>
                          <span 
                            className="badge small"
                            style={{ 
                              backgroundColor: 
                                order.status === 'Completed' ? '#D1FAE5' :
                                order.status === 'In Progress' ? '#DBEAFE' : '#FEF3C7',
                              color:
                                order.status === 'Completed' ? '#10B981' :
                                order.status === 'In Progress' ? '#3B82F6' : '#F59E0B'
                            }}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="small fw-semibold text-end">{order.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Top Vendors */}
        <Col xs={12} lg={5}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="p-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="fw-semibold mb-0">Top Vendors</h6>
                <Link 
                  to="/all-vendors" 
                  className="text-decoration-none small fw-medium d-flex align-items-center gap-1"
                  style={{ color: '#0d6efd' }}
                >
                  View All <ArrowRight size={14} />
                </Link>
              </div>
              
              <div className="d-flex flex-column gap-3">
                {topVendors.map((vendor, index) => (
                  <div 
                    key={index}
                    className="d-flex align-items-center justify-content-between p-2 rounded-2"
                    style={{ backgroundColor: '#f8f9fa' }}
                  >
                    <div className="d-flex align-items-center gap-2">
                      <div 
                        className="d-flex align-items-center justify-content-center rounded-circle fw-bold"
                        style={{ 
                          width: 36, 
                          height: 36, 
                          backgroundColor: '#0d6efd',
                          color: '#ffffff',
                          fontSize: '14px'
                        }}
                      >
                        {vendor.name.charAt(0)}
                      </div>
                      <div>
                        <p className="mb-0 small fw-semibold">{vendor.name}</p>
                        <div className="d-flex align-items-center gap-2">
                          <span className="text-muted small">{vendor.orders} orders</span>
                          <span className="text-warning small">★ {vendor.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-end">
                      <p className="mb-0 small fw-bold" style={{ color: '#10B981' }}>
                        {vendor.revenue}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminCompactDashboard;