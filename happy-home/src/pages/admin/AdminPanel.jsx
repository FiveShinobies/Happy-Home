import React, { useState } from 'react';

import Header from './shared/Header';
import TabNavigation from './shared/TabNavigation';

import ViewConsumerOrders from './consumer/ViewConsumerOrders';
import ConsumerDetails from './consumer/ConsumerDetails';
import ConsumerOrders from './consumer/ConsumerOrders';
import ConsumerOrderDetails from './consumer/ConsumerOrderDetails';

import ViewVendorOrders from './vendor/ViewVendorOrders';
import VendorDetails from './vendor/VendorDetails';
import VendorOrders from './vendor/VendorOrders';
import VendorOrderDetails from './vendor/VendorOrderDetails';

import mockData from './data/mockData';

const varOcg = true; // __define-ocg__

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('consumers');
  const [selectedConsumer, setSelectedConsumer] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [view, setView] = useState('list');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setView('list');
    setSelectedConsumer(null);
    setSelectedVendor(null);
  };

  const handleViewDetails = (item) => {
    if (activeTab === 'consumers') {
      setSelectedConsumer(item);
    } else {
      setSelectedVendor(item);
    }
    setView('details');
  };

  const handleViewOrders = (item) => {
    if (activeTab === 'consumers') {
      setSelectedConsumer(item);
    } else {
      setSelectedVendor(item);
    }
    setView('orders');
  };

  const handleViewOrderDetails = () => {
    setView('orderDetails');
  };

  const handleBack = () => {
    if (view === 'orderDetails') {
      setView('orders');
    } else {
      setView('list');
      setSelectedConsumer(null);
      setSelectedVendor(null);
    }
  };

  const currentItems =
    activeTab === 'consumers' ? mockData.consumers : mockData.vendors;

  return (
    <div className="min-vh-100 bg-light">
      <Header activeTab={activeTab} totalCount={currentItems.length} />

      <div className="container py-4">
        <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />

        {/* CONSUMER VIEWS */}
        {activeTab === 'consumers' && view === 'list' && (
          <ViewConsumerOrders
            consumers={mockData.consumers}
            onViewDetails={handleViewDetails}
            onViewOrders={handleViewOrders}
          />
        )}

        {activeTab === 'consumers' && view === 'details' && selectedConsumer && (
          <ConsumerDetails
            consumer={selectedConsumer}
            onBack={handleBack}
            onViewOrders={handleViewOrders}
          />
        )}

        {activeTab === 'consumers' && view === 'orders' && selectedConsumer && (
          <ConsumerOrders
            consumer={selectedConsumer}
            orders={mockData.consumerOrders}
            onBack={handleBack}
            onViewOrderDetails={handleViewOrderDetails}
          />
        )}

        {activeTab === 'consumers' && view === 'orderDetails' && (
          <ConsumerOrderDetails
            orderDetail={mockData.consumerOrderDetails}
            onBack={handleBack}
          />
        )}

        {/* VENDOR VIEWS */}
        {activeTab === 'vendors' && view === 'list' && (
          <ViewVendorOrders
            vendors={mockData.vendors}
            onViewDetails={handleViewDetails}
            onViewOrders={handleViewOrders}
          />
        )}

        {activeTab === 'vendors' && view === 'details' && selectedVendor && (
          <VendorDetails
            vendor={selectedVendor}
            onBack={handleBack}
            onViewOrders={handleViewOrders}
          />
        )}

        {activeTab === 'vendors' && view === 'orders' && selectedVendor && (
          <VendorOrders
            vendor={selectedVendor}
            orders={mockData.vendorOrders}
            onBack={handleBack}
            onViewOrderDetails={handleViewOrderDetails}
          />
        )}

        {activeTab === 'vendors' && view === 'orderDetails' && (
          <VendorOrderDetails
            orderDetail={mockData.vendorOrderDetails}
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
