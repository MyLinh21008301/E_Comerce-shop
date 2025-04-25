// src/app/dashboard/layout.js
"use client"; // Layouts trong App Router cần 'use client' nếu có hooks hoặc tương tác

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'; // Import useRouter

// Giả sử bạn có các icon (cần import thư viện icon hoặc dùng SVG/Image)
// import { HomeIcon, BoxIcon, ChartBarIcon, UsersIcon, ShoppingCartIcon, StoreIcon, CogIcon, LogoutIcon } from './icons'; // Ví dụ

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter(); // Khởi tạo router

  const handleLogout = () => {
    // Logic đăng xuất (xóa token, etc.)
    router.push('/login'); // Chuyển hướng về trang login
  };

  const navigationItems = [
    { icon: "home", label: "Trang chủ", href: "/dashboard" },
    { icon: "box", label: "Kho hàng", href: "/dashboard/inventory" },
    { icon: "chart-bar", label: "Báo cáo", href: "/dashboard/report" },
    { icon: "users", label: "Nhà cung cấp", href: "/dashboard/supplier" }, // Cập nhật href
    { icon: "shopping-cart", label: "Đơn hàng", href: "#" },
    { icon: "store", label: "Quản lý cửa hàng", href: "#" },
    { icon: "cog", label: "Cài đặt", href: "#" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Navigation Sidebar */}
      <div className="w-64 bg-white shadow-sm flex flex-col"> {/* Thêm flex flex-col */}
        {/* Logo */}
        <div className="flex items-center gap-2 px-6 py-4 border-b">
          <div className="w-8 h-8">
            {/* Sử dụng Image component của Next.js nếu có thể */}
            <img src="/images/logo.png" alt="Shopee Logo" className="w-full h-full object-contain" />
          </div>
          <span className="text-[#ee4d2d] font-bold text-xl">KANBAN</span>
        </div>

        {/* Navigation Items */}
        <nav className="py-4 flex-grow"> {/* Thêm flex-grow */}
          {navigationItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`w-full text-left flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#ee4d2d] transition-colors ${
                // Highlight based on current pathname. Handle base /dashboard case.
                (pathname === item.href || (item.href === "/dashboard" && pathname === "/dashboard")) // Simplified active check
                ? 'text-[#ee4d2d] bg-gray-50 font-semibold' : ''
              }`}
            >
              {/* Thay thế bằng component Icon nếu có */}
              <i className={`fas fa-${item.icon} w-5`}></i>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="px-6 py-4 border-t"> {/* Đặt nút logout ở dưới cùng */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#ee4d2d] transition-colors"
          >
            {/* Thay thế bằng component Icon nếu có */}
            <i className="fas fa-sign-out-alt w-5"></i>
            <span>Đăng xuất</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 p-6 overflow-auto"> {/* Thêm overflow-auto */}
        {/* Thanh tìm kiếm (nếu có) có thể đặt ở đây */}
        {/* <div className="mb-4"> Search Bar Component </div> */}
        {children} {/* Đây là nơi nội dung của page.js sẽ được render */}
      </main>
    </div>
  );
}
