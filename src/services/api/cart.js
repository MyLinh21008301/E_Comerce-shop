import axios from 'axios';

// Cấu hình base URL cho Gateway
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/cart-service/api';

export const cartApi = {
  // 1. Lấy danh sách chi tiết giỏ hàng của người dùng (GET /api/cart-detail/customer/{userId})
  // Sử dụng EventSource cho Server-Sent Events
  getAllCartDetails: (userId, onMessage) => {
    return new Promise((resolve, reject) => {
      const source = new EventSource(`${API_BASE_URL}/cart-detail/customer/${userId}`);
      
      source.onmessage = (event) => {
        const data = JSON.parse(event.data);
        onMessage(data); // Gọi callback để xử lý dữ liệu
      };

      source.onerror = (error) => {
        console.error(`Error fetching cart details for user ${userId}:`, error);
        source.close();
        reject(error);
      };

      // Trả về đối tượng EventSource để có thể đóng kết nối khi cần
      resolve(source);
    });
  },

  // 2. Tạo chi tiết giỏ hàng mới (POST /api/cart-detail)
  createCartDetail: async (cartDetailData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/cart-detail`, cartDetailData, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating cart detail:', error);
      throw error;
    }
  },

  // 3. Cập nhật chi tiết giỏ hàng (PUT /api/cart-detail/{cartDetailId})
  updateCartDetail: async (cartDetailId, cartDetailData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/cart-detail/${cartDetailId}`, cartDetailData, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating cart detail with id ${cartDetailId}:`, error);
      throw error;
    }
  },

  // 4. Xóa chi tiết giỏ hàng (DELETE /api/cart-detail/{cartDetailId})
  deleteCartDetail: async (cartDetailId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/cart-detail/${cartDetailId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting cart detail with id ${cartDetailId}:`, error);
      throw error;
    }
  },

  // 5. Xóa tất cả chi tiết giỏ hàng của người dùng (DELETE /api/cart-detail/customer/{userId})
  deleteAllCartDetails: async (userId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/cart-detail/customer/${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting all cart details for user ${userId}:`, error);
      throw error;
    }
  },
};