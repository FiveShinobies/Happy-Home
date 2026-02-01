import api  from '../../../api/api';
const adminService = {
  // ============== CONSUMER ENDPOINTS ==============

  // Fetch all consumers
  getAllConsumers: async () => {
    try {
      const response = await api.get(`/admin/consumers`);
      if (!response.data) {
        throw new Error('Failed to fetch consumers');
      }
      return await response.data;
    } catch (error) {
      console.error('Error fetching consumers:', error);
      throw error;
    }
  },

  // Fetch specific consumer details by ID
  getConsumerDetails: async (consumerId) => {
    try {
      const response = await api.get(`/admin/consumer/${consumerId}`);
      if (!response.data) {
        throw new Error('Failed to fetch consumer details');
      }
      return await response.data;
    } catch (error) {
      console.error('Error fetching consumer details:', error);
      throw error;
    }
  },

  // Fetch all orders for a specific consumer
  getConsumerOrders: async (consumerId) => {
    try {
      const response = await api.get(`/consumer/${consumerId}/allOrders`);
      if (!response.data) {
        throw new Error('Failed to fetch consumer orders');
      }
      return await response.data;
    } catch (error) {
      console.error('Error fetching consumer orders:', error);
      throw error;
    }
  },

  // ============== VENDOR ENDPOINTS ==============

  // Fetch all vendors
  getAllVendors: async () => {
    try {
      const response = await api.get(`/admin/vendors`);
      if (!response.data) {
        throw new Error('Failed to fetch vendors');
      }
      return await response.data;
    } catch (error) {
      console.error('Error fetching vendors:', error);
      throw error;
    }
  },

  // Fetch specific vendor details by ID
  getVendorDetails: async (vendorId) => {
    try {
      const response = await api.get(`/admin/vendors/${vendorId}`);
      if (!response.data) {
        throw new Error('Failed to fetch vendor details');
      }
      return await response.data;
    } catch (error) {
      console.error('Error fetching vendor details:', error);
      throw error;
    }
  },

  // Fetch all orders for a specific vendor
  getVendorOrders: async (vendorId) => {
    try {
      const response = await api.get(`/admin/vendors/${vendorId}/orders`);
      if (!response.data) {
        throw new Error('Failed to fetch vendor orders');
      }
      return await response.data;
    } catch (error) {
      console.error('Error fetching vendor orders:', error);
      throw error;
    }
  },

  // ============== ORDER ENDPOINTS ==============

  // Fetch specific order details by order ID
  getOrderDetails: async (orderId) => {
    try {
      const response = await api.get(`/order/${orderId}`);
      if (!response.data) {
        throw new Error('Failed to fetch order details');
      }
      return await response.data;
    } catch (error) {
      console.error('Error fetching order details:', error);
      throw error;
    }
  }
};

export default adminService;