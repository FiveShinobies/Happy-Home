const mockData = {
  consumers: [
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1234567890', address: '123 Main St', city: 'New York', joinDate: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+1234567891', address: '456 Oak Ave', city: 'Los Angeles', joinDate: '2024-02-20' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', phone: '+1234567892', address: '789 Pine Rd', city: 'Chicago', joinDate: '2024-03-10' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', phone: '+1234567893', address: '321 Elm St', city: 'Houston', joinDate: '2024-04-05' }
  ],
  vendors: [
    { id: 1, name: 'Tech Solutions Inc', email: 'info@techsolutions.com', phone: '+1987654321', address: '100 Business Plaza', city: 'San Francisco', rating: 4.5, joinDate: '2023-06-10' },
    { id: 2, name: 'Global Services Ltd', email: 'contact@globalservices.com', phone: '+1987654322', address: '200 Commerce St', city: 'Seattle', rating: 4.8, joinDate: '2023-07-15' },
    { id: 3, name: 'Prime Vendors Co', email: 'support@primevendors.com', phone: '+1987654323', address: '300 Market Ave', city: 'Boston', rating: 4.2, joinDate: '2023-08-20' },
    { id: 4, name: 'Elite Supply Group', email: 'info@elitesupply.com', phone: '+1987654324', address: '400 Trade Blvd', city: 'Miami', rating: 4.6, joinDate: '2023-09-05' }
  ],
  consumerOrders: [
    { id: 1, orderNumber: 'ORD-2024-001', date: '2024-11-01', total: '$299.99', status: 'Delivered', items: 3 },
    { id: 2, orderNumber: 'ORD-2024-002', date: '2024-11-15', total: '$149.50', status: 'Shipped', items: 2 },
    { id: 3, orderNumber: 'ORD-2024-003', date: '2024-11-28', total: '$89.99', status: 'Processing', items: 1 },
    { id: 4, orderNumber: 'ORD-2024-004', date: '2024-12-05', total: '$450.00', status: 'Pending', items: 5 }
  ],
  vendorOrders: [
    { id: 1, orderNumber: 'VORD-2024-001', date: '2024-10-20', total: '$1,299.99', status: 'Completed', items: 8 },
    { id: 2, orderNumber: 'VORD-2024-002', date: '2024-11-10', total: '$899.50', status: 'In Progress', items: 6 },
    { id: 3, orderNumber: 'VORD-2024-003', date: '2024-11-25', total: '$2,150.00', status: 'Confirmed', items: 12 },
    { id: 4, orderNumber: 'VORD-2024-004', date: '2024-12-01', total: '$750.00', status: 'Pending', items: 4 }
  ],
  consumerOrderDetails: {
    id: 1,
    orderNumber: 'ORD-2024-001',
    customer: 'John Doe',
    date: '2024-11-01',
    status: 'Delivered',
    items: [
      { name: 'Wireless Headphones', quantity: 1, price: '$149.99' },
      { name: 'USB-C Cable', quantity: 2, price: '$25.00' },
      { name: 'Phone Case', quantity: 1, price: '$99.99' }
    ],
    subtotal: '$274.98',
    shipping: '$15.00',
    tax: '$10.01',
    total: '$299.99'
  },
  vendorOrderDetails: {
    id: 1,
    orderNumber: 'VORD-2024-001',
    vendor: 'Tech Solutions Inc',
    date: '2024-10-20',
    status: 'Completed',
    items: [
      { name: 'Laptop Stand', quantity: 10, price: '$299.90' },
      { name: 'Keyboard', quantity: 15, price: '$750.00' },
      { name: 'Mouse Pad', quantity: 20, price: '$200.00' }
    ],
    subtotal: '$1,249.90',
    shipping: '$30.00',
    tax: '$20.09',
    total: '$1,299.99'
  }
};

export default mockData;