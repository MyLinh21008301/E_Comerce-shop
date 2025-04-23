"use client";

import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from 'next/image';
import Link from 'next/link';
import { getProducts } from '@/data/mockData';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const categories = [
    { id: 1, name: "Ốp Lưng iPhone", image: "/images/categories/op-lung.png" },
    { id: 2, name: "Đẹp Nữ", image: "/images/categories/dep-nu.png" },
    { id: 3, name: "Kẹp Tóc", image: "/images/categories/kep-toc.png" },
    { id: 4, name: "Quạt Cầm Tay", image: "/images/categories/quat-cam-tay.png" },
    { id: 5, name: "Áo Phông Nữ", image: "/images/categories/ao-phong-nu.png" },
    { id: 6, name: "Túi Xách Nữ", image: "/images/categories/tui-xach-nu.png" },
    { id: 7, name: "Áo", image: "/images/categories/ao.png" },
    { id: 8, name: "Kem Chống Nắng", image: "/images/categories/kem-chong-nang.png" },
    { id: 9, name: "Dép Nam", image: "/images/categories/dep-nam.png" },
    { id: 10, name: "Quần Đùi Nữ", image: "/images/categories/quan-dui-nu.png" },
  ];

  const fetchProducts = (pageNumber) => {
    return getProducts(pageNumber);
  };

  const loadMoreProducts = () => {
    setTimeout(() => {
      const newProducts = fetchProducts(page);
      setProducts((prevProducts) => [...prevProducts, ...newProducts]);
      setPage((prevPage) => prevPage + 1);
      if (page >= 5) setHasMore(false);
    }, 1000);
  };

  useEffect(() => {
    loadMoreProducts();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Top Navigation */}
      <div className="bg-[#f53d2d]">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-white text-sm py-1">
            <div className="flex gap-4">
              <a href="#" className="hover:opacity-80">Kênh Người Bán</a>
              <a href="#" className="hover:opacity-80">Tải ứng dụng</a>
              <a href="#" className="hover:opacity-80">Kết nối</a>
              <div className="flex items-center gap-2">
                <a href="#"><img src="/images/facebook.png" alt="Facebook" className="h-4" /></a>
                <a href="#"><img src="/images/instagram.png" alt="Instagram" className="h-4" /></a>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <a href="#" className="hover:opacity-80 flex items-center gap-1">
                <img src="/images/notification.png" alt="Thông báo" className="h-4" />
                Thông Báo
              </a>
              <a href="#" className="hover:opacity-80 flex items-center gap-1">
                <img src="/images/help.png" alt="Hỗ trợ" className="h-4" />
                Hỗ Trợ
              </a>
              <a href="#" className="hover:opacity-80">Tiếng Việt</a>
              <div className="flex items-center gap-2">
                <a href="#" className="hover:opacity-80">Đăng Ký</a>
                <span>|</span>
                <a href="#" className="hover:opacity-80">Đăng Nhập</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Header */}
      <div className="bg-[#f53d2d] pb-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-8 py-4">
            <a href="/" className="text-white text-3xl font-bold">
              <img src="/images/logo.png" alt="Shopee" className="h-12" />
            </a>
            <div className="flex-1">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Tìm sản phẩm, thương hiệu và tên shop"
                  className="w-full px-4 py-2 rounded-l-sm text-sm"
                />
                <button className="bg-[#fb5533] text-white px-6 py-2 rounded-r-sm hover:bg-opacity-90">
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>
            <div className="text-white text-2xl relative">
              <img src="/images/cart.png" alt="Giỏ hàng" className="h-8" />
              <span className="absolute -top-2 -right-2 bg-white text-[#f53d2d] rounded-full text-xs w-5 h-5 flex items-center justify-center">0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Menu */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex gap-4 text-sm py-2">
            <a href="#" className="hover:text-[#f53d2d]">Ốp Lưng iPhone</a>
            <a href="#" className="hover:text-[#f53d2d]">Đẹp Nữ</a>
            <a href="#" className="hover:text-[#f53d2d]">Kẹp Tóc</a>
            <a href="#" className="hover:text-[#f53d2d]">Quạt Cầm Tay</a>
            <a href="#" className="hover:text-[#f53d2d]">Áo Phông Nữ</a>
            <a href="#" className="hover:text-[#f53d2d]">Túi Xách Nữ</a>
            <a href="#" className="hover:text-[#f53d2d]">Áo</a>
            <a href="#" className="hover:text-[#f53d2d]">Kem Chống Nắng</a>
            <a href="#" className="hover:text-[#f53d2d]">Dép Nam</a>
            <a href="#" className="hover:text-[#f53d2d]">Quần Đùi Nữ</a>
          </div>
        </div>
      </div>

      {/* Banner Section */}
      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-8">
            <img src="/images/banner/main-banner.jpg" alt="Bạn mới giảm 50.000Đ" className="w-full rounded-sm" />
          </div>
          <div className="col-span-4 space-y-4">
            <img src="/images/banner/food-banner.jpg" alt="ShopeeFood" className="w-full rounded-sm" />
            <img src="/images/banner/youtube-banner.jpg" alt="Mua hàng trên Youtube" className="w-full rounded-sm" />
          </div>
        </div>
      </div>

      {/* Flash Sale Banner */}
      <div className="container mx-auto px-4 py-4">
        <div className="bg-white rounded-sm p-4">
          <div className="flex items-center gap-4 mb-4">
            <img
              src="/images/banner/flash-sale-banner.jpg"
              alt="Flash Sale"
              className="h-8"
            />
            <div className="text-gray-500 text-sm">00 : 00 : 00</div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="container mx-auto px-4 py-4">
        <div className="bg-white rounded-sm p-4">
          <h3 className="text-gray-800 text-lg font-medium mb-4">DANH MỤC</h3>
          <div className="grid grid-cols-10 gap-2">
            {categories.map((category) => (
              <a
                key={category.id}
                href="#"
                className="flex flex-col items-center p-2 hover:shadow-md transition-shadow"
              >
                <div className="w-20 h-20 mb-2">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-xs text-center text-gray-600">{category.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Flash Sale */}
      <div className="container mx-auto px-4 py-4">
        <div className="bg-white rounded-sm p-4">
          <div className="flex items-center gap-4 mb-4">
            <h3 className="text-[#ee4d2d] text-lg font-medium">FLASH SALE</h3>
            <div className="text-gray-500 text-sm">00 : 00 : 00</div>
          </div>
          <div className="grid grid-cols-6 gap-4">
            {products.slice(0, 6).map((product) => (
              <Link 
                key={product.id}
                href={`/product/${product.id}`}
                className="relative group hover:shadow-lg transition-shadow"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full aspect-square object-cover"
                  />
                  <div className="absolute top-0 right-0 bg-[#ee4d2d] text-white text-xs px-1">
                    {product.discount}% GIẢM
                  </div>
                </div>
                <div className="p-2">
                  <h4 className="text-sm text-gray-800 line-clamp-2 mb-2">{product.name}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-[#ee4d2d] text-lg font-medium">₫{product.price.toLocaleString()}</span>
                    <span className="text-gray-500 text-xs">Đã bán {product.sold.toLocaleString()}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Product List */}
      <div className="container mx-auto px-4 py-4">
        <div className="bg-white rounded-sm p-4">
          <h3 className="text-gray-800 text-lg font-medium mb-4">GỢI Ý HÔM NAY</h3>
          <InfiniteScroll
            dataLength={products.length}
            next={loadMoreProducts}
            hasMore={hasMore}
            loader={<p className="text-center text-gray-500 py-4">Đang tải thêm sản phẩm...</p>}
            endMessage={<p className="text-center text-gray-500 py-4">Đã hiển thị tất cả sản phẩm</p>}
          >
            <div className="grid grid-cols-6 gap-4">
              {products.map((product) => (
                <Link 
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="relative group hover:shadow-lg transition-shadow"
                >
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full aspect-square object-cover"
                    />
                    <div className="absolute top-0 right-0 bg-[#ee4d2d] text-white text-xs px-1">
                      {product.discount}% GIẢM
                    </div>
                  </div>
                  <div className="p-2">
                    <h4 className="text-sm text-gray-800 line-clamp-2 mb-2">{product.name}</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-[#ee4d2d] text-lg font-medium">₫{product.price.toLocaleString()}</span>
                      <span className="text-gray-500 text-xs">Đã bán {product.sold.toLocaleString()}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white mt-8">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-5 gap-8">
            <div>
              <h4 className="font-medium mb-4">CHĂM SÓC KHÁCH HÀNG</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li><a href="#" className="hover:text-[#ee4d2d]">Trung Tâm Trợ Giúp</a></li>
                <li><a href="#" className="hover:text-[#ee4d2d]">Shopee Blog</a></li>
                <li><a href="#" className="hover:text-[#ee4d2d]">Shopee Mall</a></li>
                <li><a href="#" className="hover:text-[#ee4d2d]">Hướng Dẫn Mua Hàng</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">VỀ SHOPEE</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li><a href="#" className="hover:text-[#ee4d2d]">Giới Thiệu Về Shopee</a></li>
                <li><a href="#" className="hover:text-[#ee4d2d]">Tuyển Dụng</a></li>
                <li><a href="#" className="hover:text-[#ee4d2d]">Điều Khoản Shopee</a></li>
                <li><a href="#" className="hover:text-[#ee4d2d]">Chính Sách Bảo Mật</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">THANH TOÁN</h4>
              <div className="grid grid-cols-3 gap-2">
                <img src="/images/payment/visa.png" alt="Visa" className="w-12" />
                <img src="/images/payment/mastercard.png" alt="Mastercard" className="w-12" />
                <img src="/images/payment/jcb.png" alt="JCB" className="w-12" />
                <img src="/images/payment/momo.png" alt="Momo" className="w-12" />
                <img src="/images/payment/zalopay.png" alt="ZaloPay" className="w-12" />
                <img src="/images/payment/vnpay.png" alt="VNPay" className="w-12" />
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-4">THEO DÕI CHÚNG TÔI TRÊN</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li><a href="#" className="hover:text-[#ee4d2d]">Facebook</a></li>
                <li><a href="#" className="hover:text-[#ee4d2d]">Instagram</a></li>
                <li><a href="#" className="hover:text-[#ee4d2d]">LinkedIn</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">TẢI ỨNG DỤNG SHOPEE NGAY THÔI</h4>
              <div className="flex gap-4">
                <img src="/images/qr-code.png" alt="QR Code" className="w-24" />
                <div className="space-y-2">
                  <img src="/images/app-store.png" alt="App Store" className="w-32" />
                  <img src="/images/google-play.png" alt="Google Play" className="w-32" />
                  <img src="/images/app-gallery.png" alt="App Gallery" className="w-32" />
                </div>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-gray-600">
            <p>&copy; 2024 Shopee. Tất cả các quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
