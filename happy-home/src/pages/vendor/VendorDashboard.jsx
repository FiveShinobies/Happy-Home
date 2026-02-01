import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { 
  Wallet, DollarSign, TrendingUp, Clock, 
  CheckCircle, Star, Calendar, Package,
  ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import dayjs from 'dayjs';
import api from '../../api/api';

const VendorDashboard = () => {
  const vendorId = JSON.parse(sessionStorage.getItem('user')).userId;
  
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalEarnings: 0,
    completedOrders: 0,
    pendingOrders: 0,
    inProgressOrders: 0,
    averageRating: 0,
    totalOrders: 0
  });

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/vendor/dashboard/${vendorId}`);
      console.log('Dashboard Data:', response.data);
      setDashboardData(response.data);
      calculateStats(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  // Calculate statistics from order data
  const calculateStats = (data) => {
    if (!data || !data.order) return;

    const orders = data.order;
    const completed = orders.filter(o => o.status === 'COMPLETED').length;
    const pending = orders.filter(o => o.status === 'ASSIGNED').length;
    const inProgress = orders.filter(o => o.status === 'INPROGRESS' || o.status === 'IN_PROGRESS').length;
    
    // Calculate average rating from orders with ratings
    const ratedOrders = orders.filter(o => o.rating !== null && o.rating > 0);
    const avgRating = ratedOrders.length > 0 
      ? (ratedOrders.reduce((sum, o) => sum + o.rating, 0) / ratedOrders.length).toFixed(1)
      : 0;

    setStats({
      totalEarnings: data.balance || 0,
      completedOrders: completed,
      pendingOrders: pending,
      inProgressOrders: inProgress,
      averageRating: avgRating,
      totalOrders: orders.length
    });
  };

  // Get earnings by day (last 7 days)
  const getEarningsData = () => {
    if (!dashboardData || !dashboardData.order) return [];

    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = dayjs().subtract(i, 'day');
      last7Days.push({
        day: date.format('ddd'),
        fullDate: date.format('YYYY-MM-DD'),
        earnings: 0
      });
    }

    // Sum earnings for each day
    dashboardData.order.forEach(order => {
      if (order.status === 'COMPLETED') {
        const orderDate = dayjs(order.orderDateTime).format('YYYY-MM-DD');
        const dayData = last7Days.find(d => d.fullDate === orderDate);
        if (dayData) {
          dayData.earnings += order.orderPrice;
        }
      }
    });

    return last7Days;
  };

  // Get status distribution for pie chart
  const getStatusDistribution = () => {
    if (!dashboardData || !dashboardData.order) return [];

    const statusCount = {
      COMPLETED: 0,
      ASSIGNED: 0,
      INPROGRESS: 0
    };

    dashboardData.order.forEach(order => {
      const status = order.status === 'IN_PROGRESS' ? 'INPROGRESS' : order.status;
      if (statusCount.hasOwnProperty(status)) {
        statusCount[status]++;
      }
    });

    return [
      { name: 'Completed', value: statusCount.COMPLETED, color: '#10B981' },
      { name: 'In Progress', value: statusCount.INPROGRESS, color: '#3B82F6' },
      { name: 'Assigned', value: statusCount.ASSIGNED, color: '#F59E0B' }
    ].filter(item => item.value > 0);
  };

  // Get recent orders (last 5)
  const getRecentOrders = () => {
    if (!dashboardData || !dashboardData.order) return [];
    
    return [...dashboardData.order]
      .sort((a, b) => new Date(b.orderDateTime) - new Date(a.orderDateTime))
      .slice(0, 5);
  };

  // Get payment status summary
  const getPaymentSummary = () => {
    if (!dashboardData || !dashboardData.order) return { success: 0, pending: 0, failed: 0 };

    const summary = {
      success: 0,
      pending: 0,
      failed: 0
    };

    dashboardData.order.forEach(order => {
      if (order.paymentStatus === 'SUCCESS') summary.success++;
      else if (order.paymentStatus === 'PENDING') summary.pending++;
      else if (order.paymentStatus === 'FAILED') summary.failed++;
    });

    return summary;
  };

  useEffect(() => {
    fetchDashboardData();
  }, [vendorId]);

  if (loading) {
    return (
      <Container fluid className="p-4" style={{ minHeight: '100vh', background: '#f8fafc' }}>
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading dashboard...</p>
        </div>
      </Container>
    );
  }

  const earningsData = getEarningsData();
  const statusDistribution = getStatusDistribution();
  const recentOrders = getRecentOrders();
  const paymentSummary = getPaymentSummary();

  return (
    <Container fluid className="p-4" style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1" style={{ color: '#1e293b' }}>Vendor Dashboard</h2>
          <p className="text-muted mb-0">Welcome back! Here's your performance overview</p>
        </div>
        <Link to="/work">
          <Button 
            style={{ 
              background: '#1e40af',
              border: 'none',
              borderRadius: '8px'
            }}
          >
            <Calendar size={16} className="me-2" />
            View All Orders
          </Button>
        </Link>
      </div>

      {/* Wallet Balance Card */}
      <Card 
        className="border-0 shadow-sm mb-4"
        style={{ 
          background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
          borderRadius: '16px'
        }}
      >
        <Card.Body className="p-4">
          <Row className="align-items-center">
            <Col md={8}>
              <div className="d-flex align-items-center gap-3 mb-3">
                <div 
                  className="d-flex align-items-center justify-content-center"
                  style={{ 
                    width: 64, 
                    height: 64, 
                    background: 'rgba(255,255,255,0.15)',
                    borderRadius: '12px',
                    border: '2px solid rgba(255,255,255,0.2)'
                  }}
                >
                  <Wallet size={32} color="#ffffff" />
                </div>
                <div>
                  <p className="mb-1" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>
                    Total Wallet Balance
                  </p>
                  <h1 className="mb-0 fw-bold" style={{ color: '#ffffff', fontSize: '42px' }}>
                    ₹{stats.totalEarnings.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </h1>
                </div>
              </div>
              
              <Row className="g-3">
                <Col xs={6} md={4}>
                  <div 
                    className="p-3"
                    style={{ 
                      background: 'rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      border: '1px solid rgba(255,255,255,0.15)'
                    }}
                  >
                    <p className="mb-1 small" style={{ color: 'rgba(255,255,255,0.8)' }}>
                      Completed Orders
                    </p>
                    <h4 className="mb-0 fw-bold" style={{ color: '#ffffff' }}>
                      {stats.completedOrders}
                    </h4>
                  </div>
                </Col>
                <Col xs={6} md={4}>
                  <div 
                    className="p-3"
                    style={{ 
                      background: 'rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      border: '1px solid rgba(255,255,255,0.15)'
                    }}
                  >
                    <p className="mb-1 small" style={{ color: 'rgba(255,255,255,0.8)' }}>
                      In Progress
                    </p>
                    <h4 className="mb-0 fw-bold" style={{ color: '#ffffff' }}>
                      {stats.inProgressOrders}
                    </h4>
                  </div>
                </Col>
                <Col xs={6} md={4}>
                  <div 
                    className="p-3"
                    style={{ 
                      background: 'rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      border: '1px solid rgba(255,255,255,0.15)'
                    }}
                  >
                    <p className="mb-1 small" style={{ color: 'rgba(255,255,255,0.8)' }}>
                      Pending
                    </p>
                    <h4 className="mb-0 fw-bold" style={{ color: '#ffffff' }}>
                      {stats.pendingOrders}
                    </h4>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col md={4} className="mt-3 mt-md-0">
              <div className="d-grid gap-2">
                <Button 
                  variant="light" 
                  size="lg"
                  style={{ borderRadius: '8px', fontWeight: 600 }}
                >
                  <Wallet size={18} className="me-2" />
                  Withdraw Money
                </Button>
                <Button 
                  variant="outline-light" 
                  style={{ borderRadius: '8px', fontWeight: 600 }}
                >
                  Transaction History
                </Button>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Stats Cards */}
      <Row className="g-3 mb-4">
        <Col xs={12} sm={6} lg={3}>
          <Card 
            className="border-0 shadow-sm h-100"
            style={{ borderRadius: '12px' }}
          >
            <Card.Body className="p-3">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div 
                  className="d-flex align-items-center justify-content-center"
                  style={{ 
                    width: 48, 
                    height: 48, 
                    background: '#dbeafe',
                    borderRadius: '10px',
                    border: '2px solid #bfdbfe'
                  }}
                >
                  <DollarSign size={24} color="#1e40af" />
                </div>
                <TrendingUp size={20} color="#10B981" />
              </div>
              <h3 className="fw-bold mb-1" style={{ color: '#1e293b', fontSize: '28px' }}>
                ₹{stats.totalEarnings.toFixed(2)}
              </h3>
              <p className="text-muted small mb-0">Total Earnings</p>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} lg={3}>
          <Card 
            className="border-0 shadow-sm h-100"
            style={{ borderRadius: '12px' }}
          >
            <Card.Body className="p-3">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div 
                  className="d-flex align-items-center justify-content-center"
                  style={{ 
                    width: 48, 
                    height: 48, 
                    background: '#d1fae5',
                    borderRadius: '10px',
                    border: '2px solid #6ee7b7'
                  }}
                >
                  <CheckCircle size={24} color="#10B981" />
                </div>
              </div>
              <h3 className="fw-bold mb-1" style={{ color: '#1e293b', fontSize: '28px' }}>
                {stats.completedOrders}
              </h3>
              <p className="text-muted small mb-0">Completed Orders</p>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} lg={3}>
          <Card 
            className="border-0 shadow-sm h-100"
            style={{ borderRadius: '12px' }}
          >
            <Card.Body className="p-3">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div 
                  className="d-flex align-items-center justify-content-center"
                  style={{ 
                    width: 48, 
                    height: 48, 
                    background: '#fef3c7',
                    borderRadius: '10px',
                    border: '2px solid #fde68a'
                  }}
                >
                  <Clock size={24} color="#F59E0B" />
                </div>
              </div>
              <h3 className="fw-bold mb-1" style={{ color: '#1e293b', fontSize: '28px' }}>
                {stats.pendingOrders}
              </h3>
              <p className="text-muted small mb-0">Pending Orders</p>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} lg={3}>
          <Card 
            className="border-0 shadow-sm h-100"
            style={{ borderRadius: '12px' }}
          >
            <Card.Body className="p-3">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div 
                  className="d-flex align-items-center justify-content-center"
                  style={{ 
                    width: 48, 
                    height: 48, 
                    background: '#fce7f3',
                    borderRadius: '10px',
                    border: '2px solid #fbcfe8'
                  }}
                >
                  <Star size={24} color="#EC4899" />
                </div>
              </div>
              <h3 className="fw-bold mb-1" style={{ color: '#1e293b', fontSize: '28px' }}>
                {stats.averageRating || 'N/A'}
              </h3>
              <p className="text-muted small mb-0">Average Rating</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-4 mb-4">
        {/* Earnings Chart */}
        <Col xs={12} lg={8}>
          <Card className="border-0 shadow-sm h-100" style={{ borderRadius: '12px' }}>
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h5 className="fw-bold mb-1" style={{ color: '#1e293b' }}>
                    Weekly Earnings
                  </h5>
                  <p className="text-muted small mb-0">Last 7 days performance</p>
                </div>
                <DollarSign size={20} color="#64748b" />
              </div>
              
              {earningsData.length > 0 ? (
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={earningsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis 
                      dataKey="day" 
                      stroke="#64748b"
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis 
                      stroke="#64748b"
                      style={{ fontSize: '12px' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        background: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                      }}
                      formatter={(value) => [`₹${value}`, 'Earnings']}
                    />
                    <Bar 
                      dataKey="earnings" 
                      fill="#1e40af"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-center py-5 text-muted">
                  <Package size={48} className="mb-3" />
                  <p>No earnings data available</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Order Status Distribution */}
        <Col xs={12} lg={4}>
          <Card className="border-0 shadow-sm h-100" style={{ borderRadius: '12px' }}>
            <Card.Body className="p-4">
              <h5 className="fw-bold mb-3" style={{ color: '#1e293b' }}>
                Order Status
              </h5>
              
              {statusDistribution.length > 0 ? (
                <>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={statusDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {statusDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  
                  <div className="mt-3">
                    {statusDistribution.map((item, index) => (
                      <div 
                        key={index}
                        className="d-flex justify-content-between align-items-center mb-2"
                      >
                        <div className="d-flex align-items-center gap-2">
                          <div 
                            style={{ 
                              width: 12, 
                              height: 12, 
                              background: item.color,
                              borderRadius: '3px'
                            }}
                          />
                          <span className="small">{item.name}</span>
                        </div>
                        <span className="small fw-bold">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-4 text-muted">
                  <p className="small">No order data available</p>
                </div>
              )}

              {/* Payment Summary */}
              <div className="mt-4 pt-3" style={{ borderTop: '1px solid #e2e8f0' }}>
                <h6 className="fw-bold mb-3 small" style={{ color: '#1e293b' }}>
                  Payment Status
                </h6>
                <div className="d-flex justify-content-between mb-2">
                  <span className="small text-muted">Successful</span>
                  <span className="small fw-bold" style={{ color: '#10B981' }}>
                    {paymentSummary.success}
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="small text-muted">Pending</span>
                  <span className="small fw-bold" style={{ color: '#F59E0B' }}>
                    {paymentSummary.pending}
                  </span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="small text-muted">Failed</span>
                  <span className="small fw-bold" style={{ color: '#EF4444' }}>
                    {paymentSummary.failed}
                  </span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent Orders */}
      <Row>
        <Col xs={12}>
          <Card className="border-0 shadow-sm" style={{ borderRadius: '12px' }}>
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold mb-0" style={{ color: '#1e293b' }}>
                  Recent Orders
                </h5>
                <Link 
                  to="/work"
                  className="text-decoration-none d-flex align-items-center gap-1"
                  style={{ color: '#1e40af', fontSize: '14px', fontWeight: 600 }}
                >
                  View All <ArrowUpRight size={16} />
                </Link>
              </div>

              {recentOrders.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead style={{ background: '#f8fafc' }}>
                      <tr>
                        <th className="border-0 small fw-bold py-3">Order ID</th>
                        <th className="border-0 small fw-bold py-3">Service</th>
                        <th className="border-0 small fw-bold py-3">Date & Time</th>
                        <th className="border-0 small fw-bold py-3">Status</th>
                        <th className="border-0 small fw-bold py-3">Payment</th>
                        <th className="border-0 small fw-bold py-3 text-end">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr key={order.orderId}>
                          <td className="small fw-medium py-3">#{order.orderId}</td>
                          <td className="py-3">
                            <div>
                              <p className="mb-0 small fw-medium">{order.serviceName}</p>
                              <p className="mb-0 text-muted" style={{ fontSize: '12px' }}>
                                {order.serviceShortDesc}
                              </p>
                            </div>
                          </td>
                          <td className="small py-3">
                            {dayjs(order.orderDateTime).format('MMM DD, YYYY HH:mm')}
                          </td>
                          <td className="py-3">
                            <Badge 
                              bg={
                                order.status === 'COMPLETED' ? 'success' : 
                                order.status === 'INPROGRESS' || order.status === 'IN_PROGRESS' ? 'primary' : 
                                'warning'
                              }
                              style={{ 
                                fontSize: '11px',
                                fontWeight: 600,
                                padding: '4px 8px'
                              }}
                            >
                              {order.status}
                            </Badge>
                          </td>
                          <td className="py-3">
                            <Badge 
                              bg={order.paymentStatus === 'SUCCESS' ? 'success' : 'warning'}
                              style={{ 
                                fontSize: '11px',
                                fontWeight: 600,
                                padding: '4px 8px'
                              }}
                            >
                              {order.paymentStatus}
                            </Badge>
                          </td>
                          <td className="small fw-bold py-3 text-end" style={{ color: '#1e40af' }}>
                            ₹{order.orderPrice}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-5 text-muted">
                  <Package size={48} className="mb-3" />
                  <p>No recent orders</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default VendorDashboard;