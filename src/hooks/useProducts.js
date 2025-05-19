// import { useState, useEffect } from 'react';
// import { productApi } from '@/services/api/product';

// export const useProducts = (initialPage = 1, limit = 24) => {
//   const [products, setProducts] = useState([]);
//   const [hasMore, setHasMore] = useState(true);
//   const [page, setPage] = useState(initialPage);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const MAX_PAGES = 4; // Giới hạn số trang tải về

//   const loadMoreProducts = async () => {
//     if (loading || page > MAX_PAGES) return;
    
//     try {
//       setLoading(true);
//       const newProducts = await productApi.getProducts(page, limit);
      
//       if (newProducts.length === 0 || page >= MAX_PAGES) {
//         setHasMore(false);
//       } else {
//         setProducts(prev => [...prev, ...newProducts]);
//         setPage(prev => prev + 1);
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadMoreProducts();
//   }, []);

//   return {
//     products,
//     hasMore,
//     loading,
//     error,
//     loadMoreProducts
//   };
// }; 


// hooks/useProducts.js
import { useState, useEffect } from 'react';
import productApi from '@/services/api/product'; // Đảm bảo import đúng productApi

export const useProducts = (initialPage = 0, size = 12) => {
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadMoreProducts = async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      const data = await productApi.searchProducts({
        productName: '', // Lấy tất cả sản phẩm
        page,
        size,
        sortKey: 'createdAt', // Sắp xếp theo sản phẩm mới nhất
      });

      // data.content chứa danh sách sản phẩm
      if (page === 0) {
        setProducts(data.content);
      } else {
        setProducts((prev) => [...prev, ...data.content]);
      }

      // Kiểm tra xem còn dữ liệu để tải thêm không
      setHasMore(!data.last); // data.last = true nếu đây là trang cuối
      setPage((prev) => prev + 1);
    } catch (err) {
      setError(err.message);
      setHasMore(false);
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
    loadMoreProducts,
  };
};