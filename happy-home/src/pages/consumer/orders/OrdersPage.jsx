import React, { useState } from 'react';
import { useBootstrap } from './useBootstrap';
import { styles } from './styles';
import Header from './Header';
import OrdersList from './OrdersList';
import ViewOrderDetails from './ViewOrderDetails';
import EditOrderDetails from './EditOrderDetails';

const OrdersPage = () => {
  useBootstrap();

  const [orders, setOrders] = useState([
    {
      id: 1,
      service: 'Pest Control',
      date: '2024-12-15',
      time: '10:00 AM',
      address: '123 Main St, Apartment 4B, New York',
      status: 'Scheduled',
      price: 1500,
      technician: 'John Doe',
      description: 'Complete pest control treatment for cockroaches and ants'
    },
    {
      id: 2,
      service: 'AC Servicing',
      date: '2024-12-10',
      time: '2:00 PM',
      address: '123 Main St, Apartment 4B, New York',
      status: 'Completed',
      price: 2000,
      technician: 'Sarah Smith',
      description: 'Full AC cleaning and gas refill service'
    },
    {
      id: 3,
      service: 'Deep Cleaning',
      date: '2024-12-20',
      time: '9:00 AM',
      address: '123 Main St, Apartment 4B, New York',
      status: 'Scheduled',
      price: 3500,
      technician: 'Mike Johnson',
      description: 'Deep cleaning service for 2BHK apartment'
    },
    {
      id: 4,
      service: 'Plumbing',
      date: '2024-12-08',
      time: '11:00 AM',
      address: '123 Main St, Apartment 4B, New York',
      status: 'Completed',
      price: 800,
      technician: 'David Lee',
      description: 'Kitchen sink leak repair'
    }
  ]);

  const [currentPage, setCurrentPage] = useState('list');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setCurrentPage('details');
  };

  const handleEditOrder = (order) => {
    setSelectedOrder(order);
    setCurrentPage('edit');
  };

  const handleBackToList = () => {
    setCurrentPage('list');
    setSelectedOrder(null);
  };

  const handleSaveOrder = (updatedOrder) => {
    setOrders(orders.map(order => 
      order.id === updatedOrder.id ? updatedOrder : order
    ));
    setSelectedOrder(updatedOrder);
    setCurrentPage('details');
  };

  return (
    <div style={styles.pageContainer}>
      <div className="container">
        {currentPage === 'list' && (
          <>
            <Header 
              title="My Orders" 
              subtitle="Manage all your household service bookings"
              icon="🏠"
            />
            <OrdersList 
              orders={orders}
              onViewOrder={handleViewOrder}
              onEditOrder={handleEditOrder}
            />
          </>
        )}

        {currentPage === 'details' && selectedOrder && (
          <>
            <Header onBack={handleBackToList} />
            <ViewOrderDetails 
              order={selectedOrder}
              onBack={handleBackToList}
              onEdit={handleEditOrder}
            />
          </>
        )}

        {currentPage === 'edit' && selectedOrder && (
          <>
            <Header onBack={handleBackToList} />
            <EditOrderDetails 
              order={selectedOrder}
              onSave={handleSaveOrder}
              onCancel={() => setCurrentPage('details')}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;