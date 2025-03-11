"use client";

import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function HomePage() {
  const [products, setProducts] = useState([]); // Danh sách sản phẩm
  const [hasMore, setHasMore] = useState(true); // Kiểm tra còn sản phẩm không
  const [page, setPage] = useState(1); // Trang hiện tại

  // Hàm giả lập API gọi sản phẩm
  const fetchProducts = (pageNumber) => {
    const pageSize = 8; // Số lượng sản phẩm mỗi lần tải
    const newProducts = Array.from({ length: pageSize }, (_, index) => ({
      id: pageNumber * pageSize + index + 1,
      name: `Sản phẩm ${pageNumber * pageSize + index + 1}`,
      price: `${(Math.random() * 1000000).toFixed(0)}₫`,
      oldPrice: `${(Math.random() * 1000000 + 100000).toFixed(0)}₫`,
      image: `https://picsum.photos/300/200?random=${pageNumber * pageSize + index + 1}`,
    }));
    return newProducts;
  };

  // Hàm tải thêm sản phẩm
  const loadMoreProducts = () => {
    setTimeout(() => {
      const newProducts = fetchProducts(page);
      setProducts((prevProducts) => [...prevProducts, ...newProducts]);
      setPage((prevPage) => prevPage + 1);

      if (page >= 5) setHasMore(false); // Dừng tải thêm khi hết sản phẩm
    }, 1000); // Giả lập thời gian tải
  };

  // Gọi tải sản phẩm lần đầu
  useEffect(() => {
    loadMoreProducts();
  }, []);

  return (
    <div className="bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-red-500">Shopee Demo</h1>
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            className="border border-gray-300 rounded-lg p-3 w-1/2"
          />
          <button className="bg-red-500 text-white p-3 rounded-lg hover:bg-red-600">
            Tìm kiếm
          </button>
        </div>
      </header>

      {/* Banner */}
      <section className="bg-yellow-400 py-8">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-bold">Super Mall Sale!</h2>
          <p className="text-xl mt-2">Ưu đãi lớn nhất năm với hàng loạt mã giảm giá!</p>
        </div>
      </section>

      {/* Product Categories */}
      <section className="container mx-auto px-4 py-8">
        <h3 className="text-2xl font-bold mb-6 text-black">Danh mục sản phẩm</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <img
              src="https://picsum.photos/300/200?random=1"
              alt="Thời trang"
              className="rounded-lg mb-4"
            />
            <h4 className="font-bold text-black text-lg">Thời trang</h4>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <img
              src="https://picsum.photos/300/200?random=2"
              alt="Điện tử"
              className="rounded-lg mb-4"
            />
            <h4 className="font-bold text-black text-lg">Điện tử</h4>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <img
              src="https://picsum.photos/300/200?random=3"
              alt="Sách vở"
              className="rounded-lg mb-4"
            />
            <h4 className="font-bold text-black text-lg">Sách vở</h4>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <img
              src="https://picsum.photos/300/200?random=4"
              alt="Giày dép"
              className="rounded-lg mb-4"
            />
            <h4 className="font-bold text-black text-lg">Giày dép</h4>
          </div>
        </div>
      </section>

      {/* Product List */}
      <section className="container mx-auto px-4 py-8">
        <h3 className="text-2xl font-bold mb-6 text-black">Sản phẩm hot</h3>
        <InfiniteScroll
          dataLength={products.length}
          next={loadMoreProducts}
          hasMore={hasMore}
          loader={<p className="text-center text-gray-500">Đang tải sản phẩm...</p>}
          endMessage={
            <p className="text-center text-gray-500">Đã hiển thị toàn bộ sản phẩm.</p>
          }
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white shadow-lg rounded-lg p-6 text-center"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="rounded-lg mb-4"
                />
                <h4 className="font-bold text-black text-lg">{product.name}</h4>
                <p className="text-red-500 font-bold text-base">{product.price}</p>
                <p className="text-gray-500 line-through text-sm">{product.oldPrice}</p>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </section>

      {/* Footer */}
      <footer className="bg-white py-4 mt-8 shadow-md">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2025 Shopee Demo. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
