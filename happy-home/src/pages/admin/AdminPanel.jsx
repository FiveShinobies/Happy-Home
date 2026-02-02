import React, { useState, useEffect } from 'react';

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

import adminService from './consumer/AdminService';

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
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch consumers on component mount
  useEffect(() => {
    fetchConsumers();
    fetchVendors();
  }, []);

  const fetchConsumers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await adminService.getAllConsumers();
      setConsumers(data);
    } catch (err) {
      setError('Failed to load consumers');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchVendors = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await adminService.getAllVendors();
      setVendors(data);
    } catch (err) {
      setError('Failed to load vendors');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchConsumerOrders = async (consumerId) => {
    try {
      setLoading(true);
      setError(null);
      const data = await adminService.getConsumerOrders(consumerId);
      setConsumerOrders(data);
    } catch (err) {
      setError('Failed to load consumer orders');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchVendorOrders = async (vendorId) => {
    try {
      setLoading(true);
      setError(null);
      const data = await adminService.getVendorOrders(vendorId);
      setVendorOrders(data);
    } catch (err) {
      setError('Failed to load vendor orders');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderDetails = async (orderId) => {
    try {
      setLoading(true);
      setError(null);
      const data = await adminService.getOrderDetails(orderId);
      setOrderDetails(data);
    } catch (err) {
      setError('Failed to load order details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setView('list');
    setSelectedConsumer(null);
    setSelectedVendor(null);
    setError(null);
  };

  const handleViewDetails = async (item) => {
    try {
      setLoading(true);
      setError(null);

      if (activeTab === 'consumers') {
        // Fetch full consumer details
        const consumerDetails = await adminService.getConsumerDetails(item.consumerId);
        // CRITICAL FIX: Ensure consumerId is preserved in the details object
        setSelectedConsumer({
          ...consumerDetails,
          consumerId: item.consumerId // Preserve the original consumerId
        });
      } else {
        // Fetch full vendor details
        const vendorDetails = await adminService.getVendorDetails(item.vendorId);
        // CRITICAL FIX: Ensure vendorId is preserved in the details object
        setSelectedVendor({
          ...vendorDetails,
          vendorId: item.vendorId // Preserve the original vendorId
        });
      }

      setView('details');
    } catch (err) {
      setError(`Failed to load ${activeTab === 'consumers' ? 'consumer' : 'vendor'} details`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewOrders = async (item) => {
    try {
      setLoading(true);
      setError(null);

      if (activeTab === 'consumers') {
        // Use the existing selectedConsumer if available, otherwise use the passed item
        const consumer = item.consumerId ? item : selectedConsumer;
        setSelectedConsumer(consumer);
        await fetchConsumerOrders(consumer.consumerId);
      } else {
        // Use the existing selectedVendor if available, otherwise use the passed item
        const vendor = item.vendorId ? item : selectedVendor;
        setSelectedVendor(vendor);
        await fetchVendorOrders(vendor.vendorId);
      }

      setView('orders');
    } catch (err) {
      setError(`Failed to load ${activeTab === 'consumers' ? 'consumer' : 'vendor'} orders`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewOrderDetails = async (orderId) => {
    try {
      setLoading(true);
      setError(null);
      await fetchOrderDetails(orderId);
      setView('orderDetails');
    } catch (err) {
      setError('Failed to load order details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (view === 'orderDetails') {
      setView('orders');
    } else {
      setView('list');
      setSelectedConsumer(null);
      setSelectedVendor(null);
    }
    setError(null);
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
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
            <button
              type="button"
              className="btn-close float-end"
              onClick={() => setError(null)}
              aria-label="Close"
            ></button>
          </div>
        )}

        {/* CONSUMER VIEWS */}
        {!loading && activeTab === 'consumers' && view === 'list' && (
          <ViewConsumerOrders
            consumers={consumers}
            onViewDetails={handleViewDetails}
            onViewOrders={handleViewOrders}
            consumer={selectedConsumer}
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
          <ConsumerOrders
            consumer={selectedConsumer}
            orders={consumerOrders}
            onBack={handleBack}
            onViewOrderDetails={handleViewOrderDetails}
            consumers={consumers}
          />
        )}

        {!loading && activeTab === 'consumers' && view === 'orderDetails' && orderDetails && (
          <ConsumerOrderDetails
            orderDetail={orderDetails}
            onBack={handleBack}
            consumers={consumers}
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
          <VendorOrders
            vendor={selectedVendor}
            orders={vendorOrders}
            onBack={handleBack}
            onViewOrderDetails={handleViewOrderDetails}
            consumers={consumers}
          />
        )}

        {!loading && activeTab === 'vendors' && view === 'orderDetails' && orderDetails && (
          <VendorOrderDetails
            orderDetail={orderDetails}
            onBack={handleBack}
            consumers={consumers}
          />
        )}
      </div>
    </div>
  );
};

export default AdminPanel;