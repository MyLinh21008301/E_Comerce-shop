import axios from 'axios';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/review-service/api';


export const reviewApi = {
  // 1. Tạo đánh giá mới (POST /api/reviews)
  createReview: async (reviewData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/reviews`, reviewData, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating review:', error);
      throw error;
    }
  },

  // 2. Lấy danh sách đánh giá theo productId (GET /api/reviews/product/{productId})
  getReviewsByProductId: async (productId, page = 0, size = 10) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/reviews/product/${productId}`, {
        params: { page, size },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching reviews for product ${productId}:`, error);
      throw error;
    }
  },

  // 3. Lấy đánh giá trung bình theo productId (GET /api/reviews/product/{productId}/avg-rating)
  getAverageRatingByProductId: async (productId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/reviews/product/${productId}/avg-rating`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching average rating for product ${productId}:`, error);
      throw error;
    }
  },

  // 4. Xóa đánh giá (DELETE /api/reviews/{reviewId})
  deleteReview: async (reviewId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/reviews/${reviewId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting review with id ${reviewId}:`, error);
      throw error;
    }
  },

  // 5. Cập nhật đánh giá (PUT /api/reviews/{reviewId})
  updateReview: async (reviewId, reviewData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/reviews/${reviewId}`, reviewData, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating review with id ${reviewId}:`, error);
      throw error;
    }
  },

  // 6. Lấy chi tiết đánh giá theo reviewId (GET /api/reviews/{reviewId})
  getReviewById: async (reviewId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/reviews/${reviewId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching review with id ${reviewId}:`, error);
      throw error;
    }
  },
};

