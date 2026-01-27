import { useState } from 'react';
import { Container, Row, Col, Card, Button, ButtonGroup } from 'react-bootstrap';
import { 
  TrendingUp, DollarSign, ShoppingCart, Users, 
  Package, Store, Calendar, Download
} from 'lucide-react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');

  // Revenue data for line chart
  const revenueData = [
    { date: 'Mon', revenue: 4200, orders: 12 },
    { date: 'Tue', revenue: 3800, orders: 10 },
    { date: 'Wed', revenue: 5100, orders: 15 },
    { date: 'Thu', revenue: 4600, orders: 13 },
    { date: 'Fri', revenue: 6200, orders: 18 },
    { date: 'Sat', revenue: 7800, orders: 22 },
    { date: 'Sun', revenue: 6500, orders: 19 },
  ];

  // Services performance data for bar chart
  const servicesData = [
    { name: 'Plumbing', orders: 45, revenue: 12500 },
    { name: 'Electrical', orders: 38, revenue: 10200 },
    { name: 'Cleaning', orders: 52, revenue: 8900 },
    { name: 'Painting', orders: 28, revenue: 7800 },
    { name: 'Carpentry', orders: 35, revenue: 9400 },
    { name: 'AC Repair', orders: 42, revenue: 11200 },
  ];

  // Order status data for pie chart
  const orderStatusData = [
    { name: 'Completed', value: 156, color: '#10B981' },
    { name: 'In Progress', value: 45, color: '#3B82F6' },
    { name: 'Pending', value: 23, color: '#F59E0B' },
    { name: 'Cancelled', value: 8, color: '#EF4444' },
  ];

  // Vendor performance data
  const vendorData = [
    { name: 'Week 1', activeVendors: 32, newVendors: 5 },
    { name: 'Week 2', activeVendors: 34, newVendors: 3 },
    { name: 'Week 3', activeVendors: 36, newVendors: 4 },
    { name: 'Week 4', activeVendors: 38, newVendors: 2 },
  ];

  // Summary stats
  const summaryStats = [
    { 
      label: 'Total Revenue', 
      value: '₹38,420', 
      change: '+18.2%',
      icon: DollarSign, 
      color: '#10B981' 
    },
    { 
      label: 'Total Orders', 
      value: '232', 
      change: '+12.5%',
      icon: ShoppingCart, 
      color: '#3B82F6' 
    },
    { 
      label: 'Active Users', 
      value: '156', 
      change: '+8.1%',
      icon: Users, 
      color: '#8B5CF6' 
    },
    { 
      label: 'Avg Order Value', 
      value: '₹1,656', 
      change: '+4.3%',
      icon: TrendingUp, 
      color: '#F59E0B' 
    },
  ];

  return (
    <Container fluid className="p-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1" style={{ color: '#000000' }}>Analytics Dashboard</h2>
          <p className="text-muted small mb-0">Comprehensive business insights and metrics</p>
        </div>
        <div className="d-flex gap-2 align-items-center">
          <ButtonGroup size="sm">
            <Button 
              variant={timeRange === '7d' ? 'primary' : 'outline-secondary'}
              onClick={() => setTimeRange('7d')}
            >
              7 Days
            </Button>
            <Button 
              variant={timeRange === '30d' ? 'primary' : 'outline-secondary'}
              onClick={() => setTimeRange('30d')}
            >
              30 Days
            </Button>
            <Button 
              variant={timeRange === '90d' ? 'primary' : 'outline-secondary'}
              onClick={() => setTimeRange('90d')}
            >
              90 Days
            </Button>
          </ButtonGroup>
          <Button variant="outline-primary" size="sm">
            <Download size={16} className="me-1" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <Row className="g-3 mb-4">
        {summaryStats.map((stat, index) => (
          <Col key={index} xs={12} sm={6} lg={3}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="p-3">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div 
                    className="d-flex align-items-center justify-content-center rounded-2"
                    style={{ 
                      width: 44, 
                      height: 44, 
                      backgroundColor: `${stat.color}20`
                    }}
                  >
                    <stat.icon size={22} style={{ color: stat.color }} />
                  </div>
                  <span 
                    className="badge small fw-semibold"
                    style={{ 
                      backgroundColor: '#D1FAE5',
                      color: '#10B981'
                    }}
                  >
                    {stat.change}
                  </span>
                </div>
                <h3 className="fw-bold mb-1" style={{ color: '#000000', fontSize: '26px' }}>
                  {stat.value}
                </h3>
                <p className="text-muted small mb-0">{stat.label}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="g-4 mb-4">
        {/* Revenue Trend */}
        <Col xs={12} lg={8}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h5 className="fw-semibold mb-1">Revenue & Orders Trend</h5>
                  <p className="text-muted small mb-0">Daily performance over the last 7 days</p>
                </div>
                <Calendar size={20} style={{ color: '#6c757d' }} />
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="date" stroke="#6c757d" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#6c757d" style={{ fontSize: '12px' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#ffffff', 
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px'
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
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    dot={{ fill: '#3B82F6', r: 5 }}
                    activeDot={{ r: 7 }}
                    name="Orders"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>

        {/* Order Status Distribution */}
        <Col xs={12} lg={4}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="p-4">
              <h5 className="fw-semibold mb-3">Order Status</h5>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={orderStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={90}
                    fill="#8884d8"
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
                          borderRadius: '2px'
                        }}
                      />
                      <span className="small">{item.name}</span>
                    </div>
                    <span className="small fw-semibold">{item.value}</span>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-4">
        {/* Service Performance */}
        <Col xs={12} lg={7}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h5 className="fw-semibold mb-1">Service Performance</h5>
                  <p className="text-muted small mb-0">Orders by service category</p>
                </div>
                <Package size={20} style={{ color: '#6c757d' }} />
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={servicesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="name" stroke="#6c757d" style={{ fontSize: '11px' }} />
                  <YAxis stroke="#6c757d" style={{ fontSize: '12px' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#ffffff', 
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="orders" fill="#3B82F6" name="Orders" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>

        {/* Vendor Growth */}
        <Col xs={12} lg={5}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h5 className="fw-semibold mb-1">Vendor Growth</h5>
                  <p className="text-muted small mb-0">Monthly vendor statistics</p>
                </div>
                <Store size={20} style={{ color: '#6c757d' }} />
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={vendorData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="name" stroke="#6c757d" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#6c757d" style={{ fontSize: '12px' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#ffffff', 
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="activeVendors" fill="#8B5CF6" name="Active Vendors" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="newVendors" fill="#10B981" name="New Vendors" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;