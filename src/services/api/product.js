
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/product-service/api';

const productApi = {

  createProduct: async (productData) => {
    try {
      const formData = new FormData();
      Object.keys(productData).forEach((key) => {
        formData.append(key, productData[key]);
      });

      const response = await axios.post(`${API_BASE_URL}/products`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  getProduct: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product with id ${id}:`, error);
      throw error;
    }
  },

  // Cập nhật sản phẩm (PUT /api/products/{id})
  updateProduct: async (id, productData) => {
    try {
      const formData = new FormData();
      Object.keys(productData).forEach((key) => {
        formData.append(key, productData[key]);
      });

      const response = await axios.put(`${API_BASE_URL}/products/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating product with id ${id}:`, error);
      throw error;
    }
  },

  // Tăng số lượng tồn kho (PUT /api/products/{id}/increase-stock)
  increaseProductQuantity: async (id, quantity) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/products/${id}/increase-stock`, { quantity });
      return response.data;
    } catch (error) {
      console.error(`Error increasing stock for product with id ${id}:`, error);
      throw error;
    }
  },

  hideProduct: async (id) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/products/${id}/hide`);
      return response.data;
    } catch (error) {
      console.error(`Error hiding product with id ${id}:`, error);
      throw error;
    }
  },

  showProduct: async (id) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/products/${id}/show`);
      return response.data;
    } catch (error) {
      console.error(`Error showing product with id ${id}:`, error);
      throw error;
    }
  },

  //  Xóa sản phẩm (DELETE /api/products/{id})
  deleteProduct: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting product with id ${id}:`, error);
      throw error;
    }
  },

  //(PUT /api/products/{id}/update-avg-rating)
  updateAvgRating: async (id, avgRating) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/products/${id}/update-avg-rating`, { avgRating });
      return response.data;
    } catch (error) {
      console.error(`Error updating average rating for product with id ${id}:`, error);
      throw error;
    }
  },


  searchProducts: async ({
    productName = '',
    minPrice,
    maxPrice,
    isNew,
    minRating,
    sortKey,
    page = 0,
    size = 60,
  }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/search`, {
        params: {
          productName,
          minPrice,
          maxPrice,
          isNew,
          minRating,
          sortKey,
          page,
          size,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  },

  // Lấy sản phẩm theo vendorId (GET /api/products/vendors/{vendorId})
  getProductsByVendorId: async (vendorId, productName = '', page = 0, size = 10) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/vendors/${vendorId}`, {
        params: { productName, page, size },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching products for vendor ${vendorId}:`, error);
      throw error;
    }
  },
};

export default productApi; 