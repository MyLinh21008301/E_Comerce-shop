"use client";

import { useAuth } from '@/context/AuthContext';
import { useProducts } from '@/hooks/useProducts';
import { ProductCard } from '@/components/product/ProductCard';
import InfiniteScroll from "react-infinite-scroll-component";
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaShoppingCart, FaBell, FaQuestionCircle, FaSearch } from 'react-icons/fa';

export default function HomePage() {
  const { user, logout } = useAuth();
  const { products, hasMore, loadMoreProducts, loading } = useProducts();

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Top Navigation */}
      <div className="bg-[#f53d2d]">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-white text-sm py-1">
            <div className="flex gap-4">
              <Link href="/dashboard" className="hover:opacity-80">Kênh Người Bán</Link>
              <Link href="/dashboard" className="bg-white text-[#f53d2d] px-3 py-1 rounded hover:opacity-90">
                Dashboard
              </Link>
              <a href="#" className="hover:opacity-80">Tải ứng dụng</a>
              <a href="#" className="hover:opacity-80">Kết nối</a>
              <div className="flex items-center gap-2">
                <a href="#" className="hover:opacity-80"><FaFacebook size={16} /></a>
                <a href="#" className="hover:opacity-80"><FaInstagram size={16} /></a>
                <a href="#" className="hover:opacity-80"><FaTwitter size={16} /></a>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <a href="#" className="hover:opacity-80 flex items-center gap-1">
                <FaBell size={16} />
                Thông Báo
              </a>
              <a href="#" className="hover:opacity-80 flex items-center gap-1">
                <FaQuestionCircle size={16} />
                Hỗ Trợ
              </a>
              <a href="#" className="hover:opacity-80">Tiếng Việt</a>
              {user ? (
                <div className="flex items-center gap-2">
                  <span className="hover:opacity-80">{user.name}</span>
                  <button 
                    onClick={logout}
                    className="hover:opacity-80"
                  >
                    Đăng xuất
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link href="/register" className="hover:opacity-80">Đăng Ký</Link>
                  <span>|</span>
                  <Link href="/login" className="hover:opacity-80">Đăng Nhập</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Search Header */}
      <div className="bg-[#f53d2d] pb-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-8 py-4">
            <Link href="/" className="text-white text-3xl font-bold">
              <img src="/images/logo.png" alt="Shopee" className="h-12" />
            </Link>
            <div className="flex-1">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Tìm sản phẩm, thương hiệu và tên shop"
                  className="w-full px-4 py-2 rounded-l-sm text-sm bg-white text-gray-600 placeholder-gray-400"
                />
                <button className="bg-[#fb5533] text-white px-6 py-2 rounded-r-sm hover:bg-opacity-90">
                  <FaSearch size={16} />
                </button>
              </div>
            </div>
            <div className="text-white text-2xl relative">
              <FaShoppingCart size={24} />
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

      {/* Product List */}
      <div className="container mx-auto px-4 py-4">
        <div className="bg-white rounded-sm p-4">
          <h3 className="text-gray-800 text-lg font-medium mb-4">GỢI Ý HÔM NAY</h3>
          <InfiniteScroll
            dataLength={products.length}
            next={loadMoreProducts}
            hasMore={hasMore}
            loader={
              <div className="text-center py-4">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#ee4d2d] border-t-transparent"></div>
                <p className="text-gray-500 mt-2">Đang tải thêm sản phẩm...</p>
              </div>
            }
            endMessage={
              <p className="text-center text-gray-500 py-4">
                Đã hiển thị tất cả sản phẩm
              </p>
            }
          >
            <div className="grid grid-cols-6 gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white mt-8">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-4 gap-8">
            <div>
              <h4 className="font-medium mb-4">CHĂM SÓC KHÁCH HÀNG</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-[#ee4d2d]">Trung Tâm Trợ Giúp</a></li>
                <li><a href="#" className="hover:text-[#ee4d2d]">Shopee Blog</a></li>
                <li><a href="#" className="hover:text-[#ee4d2d]">Shopee Mall</a></li>
                <li><a href="#" className="hover:text-[#ee4d2d]">Hướng Dẫn Mua Hàng</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">VỀ SHOPEE</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-[#ee4d2d]">Giới Thiệu Về Shopee Việt Nam</a></li>
                <li><a href="#" className="hover:text-[#ee4d2d]">Tuyển Dụng</a></li>
                <li><a href="#" className="hover:text-[#ee4d2d]">Điều Khoản Shopee</a></li>
                <li><a href="#" className="hover:text-[#ee4d2d]">Chính Sách Bảo Mật</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">THANH TOÁN</h4>
              <div className="grid grid-cols-3 gap-4">
                <img src="/images/payment/visa.png" alt="Visa" className="h-8" />
                <img src="/images/payment/mastercard.png" alt="Mastercard" className="h-8" />
                <img src="/images/payment/jcb.png" alt="JCB" className="h-8" />
                <img src="/images/payment/momo.png" alt="Momo" className="h-8" />
                <img src="/images/payment/zalopay.png" alt="ZaloPay" className="h-8" />
                <img src="/images/payment/vnpay.png" alt="VNPay" className="h-8" />
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-4">TẢI ỨNG DỤNG SHOPEE NGAY THÔI</h4>
              <div className="flex gap-4">
                <img src="/images/qr-code.png" alt="QR Code" className="w-24" />
                <div className="space-y-2">
                  <img src="/images/app-store.png" alt="App Store" className="h-10" />
                  <img src="/images/google-play.png" alt="Google Play" className="h-10" />
                  <img src="/images/app-gallery.png" alt="App Gallery" className="h-10" />
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
