import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/payment-service/api';

const paymentApi = {
  // Gửi dữ liệu webhook (POST /api/payments/webhook)
  // Lưu ý: Thường không gọi từ frontend, nhưng cung cấp để test hoặc debug
  sendWebhook: async (billData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/payments/webhook`, billData, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data; // Webhook trả về void, nhưng giữ để xử lý nếu backend thay đổi
    } catch (error) {
      console.error('Error sending webhook:', error);
      throw error;
    }
  },
};
export default paymentApi;