import { useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, ProgressBar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { 
  Wallet, DollarSign, TrendingUp, Clock, 
  CheckCircle, Package, Star, ArrowUpRight,
  ArrowDownRight, Calendar, Award, Users
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const VendorDashboard = () => {
  const [walletBalance] = useState(12450.50);
  const [pendingAmount] = useState(3200.00);

  // Earnings data for chart
  const earningsData = [
    { day: 'Mon', earnings: 850 },
    { day: 'Tue', earnings: 1200 },
    { day: 'Wed', earnings: 980 },
    { day: 'Thu', earnings: 1450 },
    { day: 'Fri', earnings: 1800 },
    { day: 'Sat', earnings: 2100 },
    { day: 'Sun', earnings: 1650 },
  ];

  // Recent transactions
  const transactions = [
    { id: 'TXN-001', type: 'credit', amount: 1200, description: 'Order #1234 - Plumbing Service', date: '2 hours ago', status: 'completed' },
    { id: 'TXN-002', type: 'credit', amount: 850, description: 'Order #1233 - Electrical Work', date: '5 hours ago', status: 'completed' },
    { id: 'TXN-003', type: 'debit', amount: 500, description: 'Withdrawal to Bank', date: '1 day ago', status: 'processed' },
    { id: 'TXN-004', type: 'credit', amount: 1450, description: 'Order #1231 - AC Repair', date: '2 days ago', status: 'completed' },
  ];

  // Active orders
  const activeOrders = [
    { id: '#ORD-1240', customer: 'John Doe', service: 'Plumbing', status: 'In Progress', payment: 1200, time: '2 hours ago' },
    { id: '#ORD-1239', customer: 'Sarah Smith', service: 'Electrical', status: 'Scheduled', payment: 1500, time: 'Tomorrow 10 AM' },
    { id: '#ORD-1238', customer: 'Mike Johnson', service: 'AC Repair', status: 'In Progress', payment: 2000, time: '1 hour ago' },
  ];

  // Stats
  const stats = [
    { label: 'Total Earnings', value: `₹${walletBalance.toLocaleString()}`, icon: DollarSign, color: '#10B981', change: '+12.5%' },
    { label: 'Pending Amount', value: `₹${pendingAmount.toLocaleString()}`, icon: Clock, color: '#F59E0B', change: '3 orders' },
    { label: 'Completed Orders', value: '156', icon: CheckCircle, color: '#3B82F6', change: '+8 this week' },
    { label: 'Customer Rating', value: '4.8', icon: Star, color: '#8B5CF6', change: '234 reviews' },
  ];

  return (
    <Container fluid className="p-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1" style={{ color: '#000000' }}>Vendor Dashboard</h2>
          <p className="text-muted small mb-0">Manage your services, orders, and earnings</p>
        </div>
        <Button variant="primary" size="sm">
          <Calendar size={16} className="me-2" />
          View Schedule
        </Button>
      </div>

      {/* Wallet Card - Featured */}
      <Card className="border-0 shadow-lg mb-4" style={{ background: 'linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%)' }}>
        <Card.Body className="p-4">
          <Row className="align-items-center">
            <Col xs={12} md={8}>
              <div className="d-flex align-items-center gap-3 mb-3">
                <div 
                  className="d-flex align-items-center justify-content-center rounded-3"
                  style={{ width: 56, height: 56, backgroundColor: 'rgba(255,255,255,0.2)' }}
                >
                  <Wallet size={28} style={{ color: '#ffffff' }} />
                </div>
                <div>
                  <p className="mb-1 small" style={{ color: 'rgba(255,255,255,0.8)' }}>Total Wallet Balance</p>
                  <h1 className="mb-0 fw-bold" style={{ color: '#ffffff', fontSize: '36px' }}>
                    ₹{walletBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </h1>
                </div>
              </div>
              <div className="d-flex gap-3">
                <div>
                  <p className="mb-0 small" style={{ color: 'rgba(255,255,255,0.8)' }}>Pending Clearance</p>
                  <p className="mb-0 fw-semibold" style={{ color: '#ffffff' }}>
                    ₹{pendingAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div className="ms-4">
                  <p className="mb-0 small" style={{ color: 'rgba(255,255,255,0.8)' }}>This Month</p>
                  <p className="mb-0 fw-semibold d-flex align-items-center gap-1" style={{ color: '#ffffff' }}>
                    +15.2% <TrendingUp size={16} />
                  </p>
                </div>
              </div>
            </Col>
            <Col xs={12} md={4} className="mt-3 mt-md-0">
              <div className="d-grid gap-2">
                <Button variant="light" size="lg">
                  Withdraw Money
                </Button>
                <Button variant="outline-light" size="sm">
                  Transaction History
                </Button>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Stats Cards */}
      <Row className="g-3 mb-4">
        {stats.map((stat, index) => (
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
                  <TrendingUp size={16} style={{ color: '#10B981' }} />
                </div>
                <h3 className="fw-bold mb-1" style={{ color: '#000000', fontSize: '24px' }}>
                  {stat.value}
                </h3>
                <p className="text-muted small mb-1">{stat.label}</p>
                <span className="small fw-semibold" style={{ color: stat.color }}>
                  {stat.change}
                </span>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="g-4 mb-4">
        {/* Earnings Chart */}
        <Col xs={12} lg={8}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h5 className="fw-semibold mb-1">Weekly Earnings</h5>
                  <p className="text-muted small mb-0">Your earnings over the last 7 days</p>
                </div>
                <DollarSign size={20} style={{ color: '#6c757d' }} />
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={earningsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="day" stroke="#6c757d" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#6c757d" style={{ fontSize: '12px' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#ffffff', 
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="earnings" fill="#10B981" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>

        {/* Quick Stats */}
        <Col xs={12} lg={4}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="p-4">
              <h5 className="fw-semibold mb-4">Performance</h5>
              
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="small fw-medium">Completion Rate</span>
                  <span className="small fw-bold" style={{ color: '#10B981' }}>92%</span>
                </div>
                <ProgressBar now={92} style={{ height: '8px' }} variant="success" />
              </div>

              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="small fw-medium">Response Time</span>
                  <span className="small fw-bold" style={{ color: '#3B82F6' }}>85%</span>
                </div>
                <ProgressBar now={85} style={{ height: '8px' }} />
              </div>

              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="small fw-medium">Customer Satisfaction</span>
                  <span className="small fw-bold" style={{ color: '#8B5CF6' }}>96%</span>
                </div>
                <ProgressBar now={96} style={{ height: '8px' }} variant="info" />
              </div>

              <div className="p-3 rounded-3" style={{ backgroundColor: '#FEF3C7' }}>
                <div className="d-flex align-items-center gap-2 mb-2">
                  <Award size={20} style={{ color: '#F59E0B' }} />
                  <span className="fw-semibold small" style={{ color: '#F59E0B' }}>Achievement Unlocked!</span>
                </div>
                <p className="small mb-0" style={{ color: '#92400E' }}>
                  You've completed 150+ orders. Keep up the great work!
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-4">
        {/* Active Orders */}
        <Col xs={12} lg={7}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="p-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="fw-semibold mb-0">Active Orders</h6>
                <Link 
                  to="/work" 
                  className="text-decoration-none small fw-medium d-flex align-items-center gap-1"
                  style={{ color: '#0d6efd' }}
                >
                  View All <ArrowUpRight size={14} />
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
                      <th className="border-0 small fw-semibold text-end">Payment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeOrders.map((order, index) => (
                      <tr key={index}>
                        <td className="small fw-medium">{order.id}</td>
                        <td className="small">{order.customer}</td>
                        <td className="small">{order.service}</td>
                        <td>
                          <Badge 
                            bg={order.status === 'In Progress' ? 'primary' : 'warning'}
                            className="small"
                          >
                            {order.status}
                          </Badge>
                        </td>
                        <td className="small fw-semibold text-end">₹{order.payment}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Recent Transactions */}
        <Col xs={12} lg={5}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="p-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="fw-semibold mb-0">Recent Transactions</h6>
                <Wallet size={18} style={{ color: '#6c757d' }} />
              </div>
              
              <div className="d-flex flex-column gap-2">
                {transactions.map((txn, index) => (
                  <div 
                    key={index}
                    className="d-flex align-items-center justify-content-between p-2 rounded-2"
                    style={{ backgroundColor: '#f8f9fa' }}
                  >
                    <div className="d-flex align-items-center gap-2">
                      <div 
                        className="d-flex align-items-center justify-content-center rounded-circle"
                        style={{ 
                          width: 36, 
                          height: 36, 
                          backgroundColor: txn.type === 'credit' ? '#D1FAE5' : '#FEE2E2'
                        }}
                      >
                        {txn.type === 'credit' ? 
                          <ArrowDownRight size={18} style={{ color: '#10B981' }} /> :
                          <ArrowUpRight size={18} style={{ color: '#EF4444' }} />
                        }
                      </div>
                      <div>
                        <p className="mb-0 small fw-medium">{txn.description}</p>
                        <p className="mb-0 small text-muted">{txn.date}</p>
                      </div>
                    </div>
                    <span 
                      className="small fw-bold"
                      style={{ color: txn.type === 'credit' ? '#10B981' : '#EF4444' }}
                    >
                      {txn.type === 'credit' ? '+' : '-'}₹{txn.amount}
                    </span>
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

export default VendorDashboard;