import { getProducts, getProduct } from '@/services/mock/products';

export const productApi = {
  getProducts: async (page = 1, limit = 24) => {
    // Trong tương lai sẽ thay bằng API call thực tế
    return getProducts(page, limit);
  },

  getProduct: async (id) => {
    // Trong tương lai sẽ thay bằng API call thực tế
    return getProduct(id);
  }
}; 