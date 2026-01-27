import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

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
  
  // State for API data
  const [consumers, setConsumers] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [consumerOrders, setConsumerOrders] = useState([]);
  const [vendorOrders, setVendorOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ordersLoading, setOrdersLoading] = useState(false);

  // Fetch consumers data
  const fetchConsumers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/consumer/all');
      console.log('Consumers:', response.data);
      setConsumers(response.data);
    } catch (error) {
      console.error('Error fetching consumers:', error);
      toast.error('Failed to load consumers data');
      // Fallback to mock data if API fails
      setConsumers(mockData.consumers || []);
    } finally {
      setLoading(false);
    }
  };

  // Fetch vendors data
  const fetchVendors = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/admin/vendors');
      console.log('Vendors:', response.data);
      setVendors(response.data);
    } catch (error) {
      console.error('Error fetching vendors:', error);
      toast.error('Failed to load vendors data');
      // Fallback to mock data if API fails
      setVendors(mockData.vendors || []);
    } finally {
      setLoading(false);
    }
  };

  // Fetch consumer orders by consumer ID
  const fetchConsumerOrders = async (consumerId) => {
    setOrdersLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/consumer/${consumerId}/allOrders`);
      console.log('Consumer Orders:', response.data);
      setConsumerOrders(response.data);
    } catch (error) {
      console.error('Error fetching consumer orders:', error);
      toast.error('Failed to load consumer orders');
      // Fallback to mock data if API fails
      setConsumerOrders(mockData.consumerOrders || []);
    } finally {
      setOrdersLoading(false);
    }
  };

  // Fetch vendor orders by vendor ID
  const fetchVendorOrders = async (vendorId) => {
    setOrdersLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/admin/vendors/${vendorId}/orders`);
      console.log('Vendor Orders:', response.data);
      setVendorOrders(response.data);
    } catch (error) {
      console.error('Error fetching vendor orders:', error);
      toast.error('Failed to load vendor orders');
      // Fallback to mock data if API fails
      setVendorOrders(mockData.vendorOrders || []);
    } finally {
      setOrdersLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchConsumers();
    fetchVendors();
  }, []);

  // Refetch data when tab changes
  useEffect(() => {
    if (activeTab === 'consumers') {
      fetchConsumers();
    } else if (activeTab === 'vendors') {
      fetchVendors();
    }
  }, [activeTab]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setView('list');
    setSelectedConsumer(null);
    setSelectedVendor(null);
    setConsumerOrders([]);
    setVendorOrders([]);
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
      // Fetch orders for this consumer
      // Assuming consumer object has 'cid' or 'id' field
      const consumerId = item.consumerId;
      if (consumerId) {
        fetchConsumerOrders(consumerId);
      }
    } else {
      setSelectedVendor(item);
      // Fetch orders for this vendor
      // Assuming vendor object has 'vid' or 'id' field
      const vendorId = item.vendorId;
      if (vendorId) {
        fetchVendorOrders(vendorId);
      }
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
      setConsumerOrders([]);
      setVendorOrders([]);
    }
  };

  const currentItems = activeTab === 'consumers' ? consumers : vendors;

  return (
    <div className="min-vh-100 bg-light">
      <Header activeTab={activeTab} totalCount={currentItems.length} />

      <div className="container py-4">
        <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />

        {/* Loading State */}
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted">Loading data...</p>
          </div>
        )}

        {/* CONSUMER VIEWS */}
        {!loading && activeTab === 'consumers' && view === 'list' && (
          <ViewConsumerOrders
            consumers={consumers}
            onViewDetails={handleViewDetails}
            onViewOrders={handleViewOrders}
          />
        )}

        {!loading && activeTab === 'consumers' && view === 'details' && selectedConsumer && (
          <ConsumerDetails
            consumer={selectedConsumer}
            onBack={handleBack}
            onViewOrders={handleViewOrders}
          />
        )}

        {!loading && activeTab === 'consumers' && view === 'orders' && selectedConsumer && (
          <>
            {ordersLoading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading orders...</span>
                </div>
                <p className="mt-3 text-muted">Loading orders...</p>
              </div>
            ) : (
              <ConsumerOrders
                consumer={selectedConsumer}
                orders={consumerOrders}
                onBack={handleBack}
                onViewOrderDetails={handleViewOrderDetails}
              />
            )}
          </>
        )}

        {!loading && activeTab === 'consumers' && view === 'orderDetails' && (
          <ConsumerOrderDetails
            orderDetail={mockData.consumerOrderDetails}
            onBack={handleBack}
          />
        )}

        {/* VENDOR VIEWS */}
        {!loading && activeTab === 'vendors' && view === 'list' && (
          <ViewVendorOrders
            vendors={vendors}
            onViewDetails={handleViewDetails}
            onViewOrders={handleViewOrders}
          />
        )}

        {!loading && activeTab === 'vendors' && view === 'details' && selectedVendor && (
          <VendorDetails
            vendor={selectedVendor}
            onBack={handleBack}
            onViewOrders={handleViewOrders}
          />
        )}

        {!loading && activeTab === 'vendors' && view === 'orders' && selectedVendor && (
          <>
            {ordersLoading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading orders...</span>
                </div>
                <p className="mt-3 text-muted">Loading orders...</p>
              </div>
            ) : (
              <VendorOrders
                vendor={selectedVendor}
                orders={vendorOrders}
                onBack={handleBack}
                onViewOrderDetails={handleViewOrderDetails}
              />
            )}
          </>
        )}

        {!loading && activeTab === 'vendors' && view === 'orderDetails' && (
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