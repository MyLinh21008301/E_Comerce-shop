import { useState, useEffect } from 'react';
import { productApi } from '@/services/api/product';

export const useProducts = (initialPage = 1, limit = 24) => {
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const MAX_PAGES = 4; // Giới hạn số trang tải về

  const loadMoreProducts = async () => {
    if (loading || page > MAX_PAGES) return;
    
    try {
      setLoading(true);
      const newProducts = await productApi.getProducts(page, limit);
      
      if (newProducts.length === 0 || page >= MAX_PAGES) {
        setHasMore(false);
      } else {
        setProducts(prev => [...prev, ...newProducts]);
        setPage(prev => prev + 1);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMoreProducts();
  }, []);

  return {
    products,
    hasMore,
    loading,
    error,
    loadMoreProducts
  };
}; 