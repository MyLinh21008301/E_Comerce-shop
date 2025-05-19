import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/order-service/api';

const orderApi = {
  //Lấy tổng số đơn hàng (GET /api/orders/count)
  getCountOrder: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/orders/count`);
      return response.data;
    } catch (error) {
      console.error('Error fetching order count:', error);
      throw error;
    }
  },

  // Lấy chi tiết đơn hàng theo ID (GET /api/orders/{id})
  getOrder: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/orders/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching order with id ${id}:`, error);
      throw error;
    }
  },

  // Lấy danh sách đơn hàng theo vendorId (GET /api/orders/vendor/{vendorId})
  getOrdersByVendorId: async (vendorId, page = 0, size = 20, orderState = null, token = null) => {
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await axios.get(`${API_BASE_URL}/orders/vendor/${vendorId}`, {
        params: { page, size, orderState },
        headers,
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching orders for vendor ${vendorId}:`, error);
      throw error;
    }
  },

  // 4. Lấy danh sách đơn hàng theo customerId (GET /api/orders/customer/{customerId})
  getOrdersByCustomerId: async (customerId, page = 0, size = 20, orderState = null) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/orders/customer/${customerId}`, {
        params: { page, size, orderState },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching orders for customer ${customerId}:`, error);
      throw error;
    }
  },

  // Tạo đơn hàng mới (POST /api/orders)
  createOrder: async (orderData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/orders`, orderData, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  // Cập nhật trạng thái đơn hàng thành công (PUT /api/orders/{orderId}/handleSuccess)
  handleOrderSuccess: async (orderId) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/orders/${orderId}/handleSuccess`);
      return response.data;
    } catch (error) {
      console.error(`Error handling success for order ${orderId}:`, error);
      throw error;
    }
  },

  // Cập nhật trạng thái đơn hàng thất bại (PUT /api/orders/{orderId}/handleFail)
  handleOrderFail: async (orderId) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/orders/${orderId}/handleFail`);
      return response.data;
    } catch (error) {
      console.error(`Error handling fail for order ${orderId}:`, error);
      throw error;
    }
  },

  // Xóa đơn hàng (DELETE /api/orders/{orderId})
  deleteOrder: async (orderId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/orders/${orderId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting order with id ${orderId}:`, error);
      throw error;
    }
  },
};

export default orderApi;
