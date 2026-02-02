import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { 
  Package, Users, ShoppingCart, Store, 
  TrendingUp, Clock, CheckCircle, AlertCircle,
  ArrowRight, DollarSign
} from 'lucide-react';

import api from '../../api/api';

const AdminCompactDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.get('/admin/dashboard');
      
      if (!response.data) {
        throw new Error('Failed to fetch dashboard data');
      }
      
      const data = response.data;
      setDashboardData(data);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError(err.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  // Calculate statistics from API data
  const calculateStats = () => {
    if (!dashboardData) return null;

    const { orders, users } = dashboardData;

    // Calculate total revenue (sum of all order prices)
    const totalRevenue = orders.reduce((sum, order) => sum + order.orderPrice, 0);

    // Count active orders (not completed/cancelled)
    const activeOrders = orders.filter(order => 
      order.status === 'ASSIGNED' || order.status === 'UNASSIGNED' || order.status === 'IN_PROGRESS'
    ).length;

    // Count vendors
    const vendors = users.filter(user => user.role === 'VENDOR');
    const totalVendors = vendors.length;

    // Count unique services
    const uniqueServices = [...new Set(orders.map(order => order.serviceId))].length;

    // Count completed today (simplified - checks payment status)
    const completedToday = orders.filter(order => order.paymentStatus === 'SUCCESS').length;

    // Count pending orders
    const pendingOrders = orders.filter(order => order.status === 'UNASSIGNED').length;

    // Count active consumers
    const activeConsumers = users.filter(user => 
      user.role === 'CONSUMER' && user.userStatus === 'ACTIVE'
    ).length;

    // Count issues (orders without vendors or failed payments)
    const issues = orders.filter(order => 
      order.paymentStatus === 'FAILED' || (order.status === 'UNASSIGNED' && order.vendorId === null)
    ).length;

    return {
      totalRevenue,
      activeOrders,
      totalVendors,
      uniqueServices,
      completedToday,
      pendingOrders,
      activeConsumers,
      issues,
      orders,
      vendors
    };
  };

  const stats = calculateStats();

  // Main stats
  const mainStats = stats ? [
    { 
      label: 'Total Revenue', 
      value: `₹${stats.totalRevenue.toLocaleString()}`, 
      icon: DollarSign, 
      color: '#10B981'
    },
    { 
      label: 'Active Orders', 
      value: stats.activeOrders.toString(), 
      icon: ShoppingCart, 
      color: '#F59E0B',
      change: `+${stats.pendingOrders}`,
      period: 'pending'
    },
    { 
      label: 'Total Vendors', 
      value: stats.totalVendors.toString(), 
      icon: Store, 
      color: '#8B5CF6'
    },
    { 
      label: 'Total Services', 
      value: stats.uniqueServices.toString(), 
      icon: Package, 
      color: '#3B82F6'
    },
  ] : [];

  // Quick metrics
  const quickMetrics = stats ? [
    { label: 'Completed Today', value: stats.completedToday.toString(), icon: CheckCircle, color: '#10B981' },
    { label: 'Pending', value: stats.pendingOrders.toString(), icon: Clock, color: '#F59E0B' },
    { label: 'Active Consumers', value: stats.activeConsumers.toString(), icon: Users, color: '#3B82F6' },
    { label: 'Issues', value: stats.issues.toString(), icon: AlertCircle, color: '#EF4444' },
  ] : [];

  // Recent orders - get last 3 orders
  const recentOrders = stats ? stats.orders.slice(-3).reverse().map(order => ({
    id: `#ORD-${order.orderId}`,
    customer: `${order.consumerId}`, // You might want to fetch consumer name separately
    service: order.serviceName,
    status: order.status === 'ASSIGNED' ? 'In Progress' : 
            order.status === 'UNASSIGNED' ? 'Pending' : 
            order.status === 'COMPLETED' ? 'Completed' : order.status,
    amount: `₹${order.orderPrice.toLocaleString()}`
  })) : [];

  // Top vendors - calculate from orders
  const calculateTopVendors = () => {
    if (!stats) return [];

    const vendorStats = {};
    
    stats.orders.forEach(order => {
      if (order.vendorId) {
        if (!vendorStats[order.vendorId]) {
          vendorStats[order.vendorId] = {
            id: order.vendorId,
            name: `${order.vendorFirstName || ''} ${order.vendorLastName || ''}`.trim() || `Vendor ${order.vendorId}`,
            orders: 0,
            revenue: 0,
            rating: order.rating || 0,
            ratingCount: 0
          };
        }
        vendorStats[order.vendorId].orders++;
        vendorStats[order.vendorId].revenue += order.orderPrice;
        if (order.rating) {
          vendorStats[order.vendorId].rating += order.rating;
          vendorStats[order.vendorId].ratingCount++;
        }
      }
    });

    // Calculate average ratings and sort by orders
    const vendorsArray = Object.values(vendorStats).map(vendor => ({
      ...vendor,
      rating: vendor.ratingCount > 0 ? (vendor.rating / vendor.ratingCount).toFixed(1) : '0.0',
      revenue: `₹${vendor.revenue.toLocaleString()}`
    }));

    return vendorsArray.sort((a, b) => b.orders - a.orders).slice(0, 3);
  };

  const topVendors = calculateTopVendors();

  // Loading state
  if (loading) {
    return (
      <Container fluid className="p-4 d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3 text-muted">Loading dashboard data...</p>
        </div>
      </Container>
    );
  }

  // Error state
  if (error) {
    return (
      <Container fluid className="p-4">
        <Alert variant="danger">
          <Alert.Heading>Error Loading Dashboard</Alert.Heading>
          <p>{error}</p>
          <button className="btn btn-outline-danger btn-sm mt-2" onClick={fetchDashboardData}>
            Retry
          </button>
        </Alert>
      </Container>
    );
  }

  // No data state
  if (!dashboardData || !stats) {
    return (
      <Container fluid className="p-4">
        <Alert variant="info">No dashboard data available</Alert>
      </Container>
    );
  }

  return (
    <Container fluid className="p-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Header */}
      <div className="mb-4">
        <h2 className="fw-bold mb-1" style={{ color: '#000000' }}>Dashboard Overview</h2>
        <p className="text-muted small mb-0">Real-time insights and key metrics</p>
      </div>

      {/* Main Stats Grid */}
      <Row className="g-3 mb-4">
        {mainStats.map((stat, index) => (
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
                    {recentOrders.length > 0 ? recentOrders.map((order, index) => (
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
                    )) : (
                      <tr>
                        <td colSpan="5" className="text-center text-muted small py-3">
                          No orders found
                        </td>
                      </tr>
                    )}
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
                {topVendors.length > 0 ? topVendors.map((vendor, index) => (
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
                        {vendor.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="mb-0 small fw-semibold">{vendor.name}</p>
                        <div className="d-flex align-items-center gap-2">
                          <span className="text-muted small">{vendor.orders} orders</span>
                          {parseFloat(vendor.rating) > 0 && (
                            <span className="text-warning small">★ {vendor.rating}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-end">
                      <p className="mb-0 small fw-bold" style={{ color: '#10B981' }}>
                        {vendor.revenue}
                      </p>
                    </div>
                  </div>
                )) : (
                  <p className="text-center text-muted small mb-0">No vendor data available</p>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminCompactDashboard;