import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, ButtonGroup, Badge } from 'react-bootstrap';
import { 
  TrendingUp, DollarSign, ShoppingCart, Users, 
  Package, Store, Calendar, Download, Activity
} from 'lucide-react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import dayjs from 'dayjs';
import api from '../../api/api';

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalConsumers: 0,
    totalVendors: 0,
    activeVendors: 0,
    completedOrders: 0,
    pendingOrders: 0,
    inProgressOrders: 0,
    cancelledOrders: 0,
    averageOrderValue: 0
  });

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch from single admin dashboard endpoint
      const response = await api.get('/admin/dashboard');
      
      console.log('Admin Dashboard Data:', response.data);
      
      // Handle actual API response structure
      const data = response.data;
      const ordersData = data.orders || [];
      const usersData = data.users || [];

      // Separate users by role
      const vendors = usersData.filter(user => user.role === 'VENDOR');
      const consumers = usersData.filter(user => user.role === 'CONSUMER');

      console.log('📊 Parsed Data:', {
        totalOrders: ordersData.length,
        totalVendors: vendors.length,
        totalConsumers: consumers.length
      });

      setDashboardData({
        orders: ordersData,
        vendors: vendors,
        consumers: consumers,
        users: usersData
      });

      calculateStats(ordersData, vendors, consumers);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  // Calculate statistics from data
  const calculateStats = (orders, vendors, consumers) => {
    if (!orders || !Array.isArray(orders)) return;

    // Order statistics
    const completed = orders.filter(o => o.status === 'COMPLETED').length;
    const pending = orders.filter(o => o.status === 'ASSIGNED').length;
    const inProgress = orders.filter(o => o.status === 'INPROGRESS' || o.status === 'IN_PROGRESS').length;
    const cancelled = orders.filter(o => o.status === 'CANCELLED').length;

    // Revenue calculation (from completed orders)
    const totalRevenue = orders
      .filter(o => o.status === 'COMPLETED')
      .reduce((sum, o) => sum + (o.orderPrice || 0), 0);

    // Average order value
    const avgOrderValue = completed > 0 ? totalRevenue / completed : 0;

    // Active vendors (vendors who have completed at least one order)
    const activeVendorIds = new Set(
      orders.filter(o => o.status === 'COMPLETED').map(o => o.vendorId).filter(Boolean)
    );
    const activeVendors = activeVendorIds.size;

    console.log('📊 Stats Calculated:', {
      totalRevenue,
      totalOrders: orders.length,
      totalVendors: vendors.length,
      totalConsumers: consumers.length,
      activeVendors,
      completed,
      pending,
      inProgress
    });

    setStats({
      totalRevenue,
      totalOrders: orders.length,
      totalConsumers: consumers.length,  // From users with role CONSUMER
      totalVendors: vendors.length,      // From users with role VENDOR
      activeVendors,
      completedOrders: completed,
      pendingOrders: pending,
      inProgressOrders: inProgress,
      cancelledOrders: cancelled,
      averageOrderValue: avgOrderValue
    });
  };

  // Get revenue trend data (last 7 days)
  const getRevenueTrend = () => {
    if (!dashboardData || !dashboardData.orders) return [];

    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = dayjs().subtract(i, 'day');
      last7Days.push({
        date: date.format('ddd'),
        fullDate: date.format('YYYY-MM-DD'),
        revenue: 0,
        orders: 0
      });
    }

    dashboardData.orders.forEach(order => {
      const orderDate = dayjs(order.orderDate || order.orderDateTime).format('YYYY-MM-DD');
      const dayData = last7Days.find(d => d.fullDate === orderDate);
      if (dayData && order.status === 'COMPLETED') {
        dayData.revenue += order.total || order.orderPrice || 0;
        dayData.orders += 1;
      }
    });

    return last7Days;
  };

  // Get order status distribution
  const getOrderStatusData = () => {
    return [
      { name: 'Completed', value: stats.completedOrders, color: '#10B981' },
      { name: 'In Progress', value: stats.inProgressOrders, color: '#3B82F6' },
      { name: 'Pending', value: stats.pendingOrders, color: '#F59E0B' },
      { name: 'Cancelled', value: stats.cancelledOrders, color: '#EF4444' },
    ].filter(item => item.value > 0);
  };

  // Get service performance data
  const getServicePerformance = () => {
    if (!dashboardData || !dashboardData.orders) return [];

    const serviceMap = {};
    
    dashboardData.orders.forEach(order => {
      const serviceName = order.serviceName || 'Unknown Service';
      if (!serviceMap[serviceName]) {
        serviceMap[serviceName] = {
          name: serviceName,
          orders: 0,
          revenue: 0
        };
      }
      serviceMap[serviceName].orders += 1;
      if (order.status === 'COMPLETED') {
        serviceMap[serviceName].revenue += order.total || order.orderPrice || 0;
      }
    });

    return Object.values(serviceMap)
      .sort((a, b) => b.orders - a.orders)
      .slice(0, 6);
  };

  // Get top vendors
  const getTopVendors = () => {
    if (!dashboardData || !dashboardData.orders) return [];

    const vendorMap = {};
    
    dashboardData.orders.forEach(order => {
      const vendorId = order.vendorId;
      const vendorName = order.vendorFirstName && order.vendorLastName 
        ? `${order.vendorFirstName} ${order.vendorLastName}`
        : `Vendor ${vendorId}`;
      
      if (!vendorMap[vendorId]) {
        vendorMap[vendorId] = {
          id: vendorId,
          name: vendorName,
          orders: 0,
          revenue: 0,
          rating: order.vendorRating || 0
        };
      }
      vendorMap[vendorId].orders += 1;
      if (order.status === 'COMPLETED') {
        vendorMap[vendorId].revenue += order.total || order.orderPrice || 0;
      }
    });

    return Object.values(vendorMap)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
  };

  // Get payment status summary
  const getPaymentStatusData = () => {
    if (!dashboardData || !dashboardData.orders) return [];

    const paymentMap = {
      SUCCESS: 0,
      PENDING: 0,
      FAILED: 0
    };

    dashboardData.orders.forEach(order => {
      const status = order.paymentStatus || 'PENDING';
      if (paymentMap.hasOwnProperty(status)) {
        paymentMap[status] += 1;
      }
    });

    return [
      { name: 'Success', value: paymentMap.SUCCESS, color: '#10B981' },
      { name: 'Pending', value: paymentMap.PENDING, color: '#F59E0B' },
      { name: 'Failed', value: paymentMap.FAILED, color: '#EF4444' }
    ].filter(item => item.value > 0);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <Container fluid className="p-4" style={{ minHeight: '100vh', background: '#f8fafc' }}>
        <div className="text-center py-5">
          <div className="spinner-border" style={{ color: '#1e40af' }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading dashboard data...</p>
        </div>
      </Container>
    );
  }

  const revenueTrend = getRevenueTrend();
  const orderStatusData = getOrderStatusData();
  const servicePerformance = getServicePerformance();
  const topVendors = getTopVendors();
  const paymentStatusData = getPaymentStatusData();

  const summaryStats = [
    { 
      label: 'Total Revenue', 
      value: `₹${stats.totalRevenue.toLocaleString('en-IN')}`, 
      change: '+18.2%',
      icon: DollarSign, 
      color: '#10B981',
      bgColor: '#d1fae5',
      borderColor: '#6ee7b7'
    },
    { 
      label: 'Total Orders', 
      value: stats.totalOrders.toString(), 
      change: `${stats.completedOrders} completed`,
      icon: ShoppingCart, 
      color: '#1e40af',
      bgColor: '#dbeafe',
      borderColor: '#bfdbfe'
    },
    { 
      label: 'Total Consumers', 
      value: stats.totalConsumers.toString(), 
      change: `${stats.activeVendors} active vendors`,
      icon: Users, 
      color: '#8B5CF6',
      bgColor: '#ede9fe',
      borderColor: '#c4b5fd'
    },
    { 
      label: 'Avg Order Value', 
      value: `₹${Math.round(stats.averageOrderValue).toLocaleString('en-IN')}`, 
      change: `${stats.totalVendors} vendors`,
      icon: TrendingUp, 
      color: '#F59E0B',
      bgColor: '#fef3c7',
      borderColor: '#fde68a'
    },
  ];

  return (
    <Container fluid className="p-4" style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1" style={{ color: '#1e293b' }}>Admin Dashboard</h2>
          <p className="text-muted mb-0">Comprehensive business insights and metrics</p>
        </div>
        <div className="d-flex gap-2 align-items-center">
          <ButtonGroup size="sm">
            <Button 
              style={{
                background: timeRange === '7d' ? '#1e40af' : 'transparent',
                color: timeRange === '7d' ? '#ffffff' : '#64748b',
                border: `2px solid ${timeRange === '7d' ? '#1e40af' : '#e2e8f0'}`,
                fontWeight: 600
              }}
              onClick={() => setTimeRange('7d')}
            >
              7 Days
            </Button>
            <Button 
              style={{
                background: timeRange === '30d' ? '#1e40af' : 'transparent',
                color: timeRange === '30d' ? '#ffffff' : '#64748b',
                border: `2px solid ${timeRange === '30d' ? '#1e40af' : '#e2e8f0'}`,
                fontWeight: 600
              }}
              onClick={() => setTimeRange('30d')}
            >
              30 Days
            </Button>
            <Button 
              style={{
                background: timeRange === '90d' ? '#1e40af' : 'transparent',
                color: timeRange === '90d' ? '#ffffff' : '#64748b',
                border: `2px solid ${timeRange === '90d' ? '#1e40af' : '#e2e8f0'}`,
                fontWeight: 600
              }}
              onClick={() => setTimeRange('90d')}
            >
              90 Days
            </Button>
          </ButtonGroup>
          <Button 
            style={{
              background: 'transparent',
              color: '#1e40af',
              border: '2px solid #1e40af',
              fontWeight: 600
            }}
            size="sm"
          >
            <Download size={16} className="me-1" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <Row className="g-3 mb-4">
        {summaryStats.map((stat, index) => (
          <Col key={index} xs={12} sm={6} lg={3}>
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
                      backgroundColor: stat.bgColor,
                      borderRadius: '10px',
                      border: `2px solid ${stat.borderColor}`
                    }}
                  >
                    <stat.icon size={24} style={{ color: stat.color }} />
                  </div>
                  <Activity size={20} style={{ color: stat.color }} />
                </div>
                <h3 className="fw-bold mb-1" style={{ color: '#1e293b', fontSize: '28px' }}>
                  {stat.value}
                </h3>
                <p className="text-muted small mb-1">{stat.label}</p>
                <span className="small" style={{ color: stat.color, fontWeight: 600 }}>
                  {stat.change}
                </span>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="g-4 mb-4">
        {/* Revenue Trend */}
        <Col xs={12} lg={8}>
          <Card className="border-0 shadow-sm h-100" style={{ borderRadius: '12px' }}>
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h5 className="fw-bold mb-1" style={{ color: '#1e293b' }}>
                    Revenue & Orders Trend
                  </h5>
                  <p className="text-muted small mb-0">Daily performance over the last 7 days</p>
                </div>
                <Calendar size={20} style={{ color: '#64748b' }} />
              </div>
              
              {revenueTrend.length > 0 ? (
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={revenueTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis 
                      dataKey="date" 
                      stroke="#64748b" 
                      style={{ fontSize: '12px' }} 
                    />
                    <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#ffffff', 
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                      }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#10B981" 
                      strokeWidth={3}
                      dot={{ fill: '#10B981', r: 5 }}
                      activeDot={{ r: 7 }}
                      name="Revenue (₹)"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="orders" 
                      stroke="#1e40af" 
                      strokeWidth={3}
                      dot={{ fill: '#1e40af', r: 5 }}
                      activeDot={{ r: 7 }}
                      name="Orders"
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-center py-5 text-muted">
                  <Package size={48} className="mb-3" />
                  <p>No revenue data available</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Order Status Distribution */}
        <Col xs={12} lg={4}>
          <Card className="border-0 shadow-sm h-100" style={{ borderRadius: '12px' }}>
            <Card.Body className="p-4">
              <h5 className="fw-bold mb-3" style={{ color: '#1e293b' }}>Order Status</h5>
              
              {orderStatusData.length > 0 ? (
                <>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={orderStatusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {orderStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="mt-3">
                    {orderStatusData.map((item, index) => (
                      <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                        <div className="d-flex align-items-center gap-2">
                          <div 
                            style={{ 
                              width: 12, 
                              height: 12, 
                              backgroundColor: item.color,
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

              {/* Payment Status */}
              {paymentStatusData.length > 0 && (
                <div className="mt-4 pt-3" style={{ borderTop: '1px solid #e2e8f0' }}>
                  <h6 className="fw-bold mb-3 small" style={{ color: '#1e293b' }}>
                    Payment Status
                  </h6>
                  {paymentStatusData.map((item, index) => (
                    <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                      <div className="d-flex align-items-center gap-2">
                        <div 
                          style={{ 
                            width: 12, 
                            height: 12, 
                            backgroundColor: item.color,
                            borderRadius: '3px'
                          }}
                        />
                        <span className="small">{item.name}</span>
                      </div>
                      <span className="small fw-bold">{item.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-4 mb-4">
        {/* Service Performance */}
        <Col xs={12} lg={7}>
          <Card className="border-0 shadow-sm h-100" style={{ borderRadius: '12px' }}>
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h5 className="fw-bold mb-1" style={{ color: '#1e293b' }}>
                    Service Performance
                  </h5>
                  <p className="text-muted small mb-0">Orders by service category</p>
                </div>
                <Package size={20} style={{ color: '#64748b' }} />
              </div>
              
              {servicePerformance.length > 0 ? (
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={servicePerformance}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis 
                      dataKey="name" 
                      stroke="#64748b" 
                      style={{ fontSize: '11px' }}
                      angle={-15}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#ffffff', 
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Bar 
                      dataKey="orders" 
                      fill="#1e40af" 
                      name="Orders" 
                      radius={[8, 8, 0, 0]} 
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-center py-5 text-muted">
                  <Package size={48} className="mb-3" />
                  <p>No service data available</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Top Vendors */}
        <Col xs={12} lg={5}>
          <Card className="border-0 shadow-sm h-100" style={{ borderRadius: '12px' }}>
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h5 className="fw-bold mb-1" style={{ color: '#1e293b' }}>
                    Top Performing Vendors
                  </h5>
                  <p className="text-muted small mb-0">By total revenue</p>
                </div>
                <Store size={20} style={{ color: '#64748b' }} />
              </div>
              
              {topVendors.length > 0 ? (
                <div className="d-flex flex-column gap-3">
                  {topVendors.map((vendor, index) => (
                    <div 
                      key={vendor.id}
                      className="d-flex align-items-center justify-content-between p-3"
                      style={{ 
                        background: '#f8fafc',
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0'
                      }}
                    >
                      <div className="d-flex align-items-center gap-3">
                        <div 
                          className="d-flex align-items-center justify-content-center fw-bold"
                          style={{ 
                            width: 36, 
                            height: 36, 
                            background: index === 0 ? '#fef3c7' : '#dbeafe',
                            color: index === 0 ? '#F59E0B' : '#1e40af',
                            borderRadius: '8px',
                            fontSize: '14px'
                          }}
                        >
                          #{index + 1}
                        </div>
                        <div>
                          <p className="mb-0 fw-medium small">{vendor.name}</p>
                          <p className="mb-0 text-muted" style={{ fontSize: '12px' }}>
                            {vendor.orders} orders
                          </p>
                        </div>
                      </div>
                      <div className="text-end">
                        <p className="mb-0 fw-bold small" style={{ color: '#10B981' }}>
                          ₹{vendor.revenue.toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-5 text-muted">
                  <Store size={48} className="mb-3" />
                  <p>No vendor data available</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Quick Stats Summary */}
      <Row>
        <Col xs={12}>
          <Card className="border-0 shadow-sm" style={{ borderRadius: '12px' }}>
            <Card.Body className="p-4">
              <h5 className="fw-bold mb-4" style={{ color: '#1e293b' }}>Platform Overview</h5>
              <Row className="g-4">
                <Col xs={6} md={3}>
                  <div className="text-center">
                    <div 
                      className="d-inline-flex align-items-center justify-content-center mb-2"
                      style={{ 
                        width: 56, 
                        height: 56, 
                        background: '#dbeafe',
                        borderRadius: '12px',
                        border: '2px solid #bfdbfe'
                      }}
                    >
                      <ShoppingCart size={28} color="#1e40af" />
                    </div>
                    <h4 className="fw-bold mb-1" style={{ color: '#1e293b' }}>
                      {stats.completedOrders}
                    </h4>
                    <p className="text-muted small mb-0">Completed Orders</p>
                  </div>
                </Col>
                <Col xs={6} md={3}>
                  <div className="text-center">
                    <div 
                      className="d-inline-flex align-items-center justify-content-center mb-2"
                      style={{ 
                        width: 56, 
                        height: 56, 
                        background: '#fef3c7',
                        borderRadius: '12px',
                        border: '2px solid #fde68a'
                      }}
                    >
                      <Package size={28} color="#F59E0B" />
                    </div>
                    <h4 className="fw-bold mb-1" style={{ color: '#1e293b' }}>
                      {stats.inProgressOrders}
                    </h4>
                    <p className="text-muted small mb-0">In Progress</p>
                  </div>
                </Col>
                <Col xs={6} md={3}>
                  <div className="text-center">
                    <div 
                      className="d-inline-flex align-items-center justify-content-center mb-2"
                      style={{ 
                        width: 56, 
                        height: 56, 
                        background: '#ede9fe',
                        borderRadius: '12px',
                        border: '2px solid #c4b5fd'
                      }}
                    >
                      <Store size={28} color="#8B5CF6" />
                    </div>
                    <h4 className="fw-bold mb-1" style={{ color: '#1e293b' }}>
                      {stats.activeVendors}
                    </h4>
                    <p className="text-muted small mb-0">Active Vendors</p>
                  </div>
                </Col>
                <Col xs={6} md={3}>
                  <div className="text-center">
                    <div 
                      className="d-inline-flex align-items-center justify-content-center mb-2"
                      style={{ 
                        width: 56, 
                        height: 56, 
                        background: '#d1fae5',
                        borderRadius: '12px',
                        border: '2px solid #6ee7b7'
                      }}
                    >
                      <Users size={28} color="#10B981" />
                    </div>
                    <h4 className="fw-bold mb-1" style={{ color: '#1e293b' }}>
                      {stats.totalConsumers}
                    </h4>
                    <p className="text-muted small mb-0">Total Consumers</p>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;