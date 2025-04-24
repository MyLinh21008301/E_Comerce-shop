"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import Image from 'next/image';
import Inventory from '@/components/dashboard/Inventory';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('Weekly');
  const [activeTab, setActiveTab] = useState('Trang chủ');
  const router = useRouter();

  const handleLogout = () => {
    // Trong thực tế, bạn sẽ xóa token, session, etc.
    router.push('/login');
  };

  const navigationItems = [
    { icon: "home", label: "Trang chủ", href: "#" },
    { icon: "box", label: "Kho hàng", href: "#" },
    { icon: "chart-bar", label: "Báo cáo", href: "#" },
    { icon: "users", label: "Nhà cung cấp", href: "#" },
    { icon: "shopping-cart", label: "Đơn hàng", href: "#" },
    { icon: "store", label: "Quản lý cửa hàng", href: "#" },
    { icon: "cog", label: "Cài đặt", href: "#" },
  ];

  const businessOverview = {
    sales: 832,
    revenue: 18300,
    profit: 868,
    expenses: 17432,
  };

  const inventoryOverview = {
    total_stock: 868,
    delivered: 200,
  };

  const purchaseOverview = {
    purchase_orders: 82,
    expenses: 13573,
    cancelled: 5,
    refunded: 17432,
  };

  const productOverview = {
    suppliers: 31,
    products: 21,
  };

  const salesPurchaseData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    datasets: [
      {
        label: 'Nhập hàng',
        data: [50000, 55000, 45000, 35000, 45000, 30000, 55000, 45000, 42000, 35000],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Bán hàng',
        data: [48000, 47000, 52000, 42000, 43000, 40000, 47000, 42000, 43000, 42000],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  const orderOverviewData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Đã giao hàng',
        data: [3500, 2800, 3600, 2900, 3200],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        tension: 0.4,
      },
      {
        label: 'Đã đặt',
        data: [3800, 1800, 2500, 1900, 2200],
        borderColor: 'rgb(255, 159, 64)',
        backgroundColor: 'rgba(255, 159, 64, 0.5)',
        tension: 0.4,
      },
    ],
  };

  const bestSellers = [
    { name: 'Surf Excel', sold: 30, remaining: 12, price: 100 },
    { name: 'Rin', sold: 21, remaining: 15, price: 207 },
    { name: 'Parle G', sold: 19, remaining: 17, price: 105 },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Navigation Sidebar */}
      <div className="w-64 bg-white shadow-sm">
        {/* Logo */}
        <div className="flex items-center gap-2 px-6 py-4 border-b">
          <div className="w-8 h-8">
            <img src="/images/logo.png" alt="Shopee" className="w-full h-full object-contain" />
          </div>
          <span className="text-[#ee4d2d] font-bold text-xl">SHOPEE</span>
        </div>

        {/* Navigation Items */}
        <nav className="py-4 flex flex-col h-[calc(100vh-80px)] justify-between">
          <div>
            {navigationItems.map((item, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(item.label)}
                className={`w-full text-left flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#ee4d2d] transition-colors ${
                  activeTab === item.label ? 'text-[#ee4d2d] bg-gray-50 font-semibold' : ''
                }`}
              >
                <i className={`fas fa-${item.icon} w-5`}></i>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
          
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#ee4d2d] transition-colors mt-auto"
          >
            <i className="fas fa-sign-out-alt w-5"></i>
            <span>Đăng xuất</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {activeTab === 'Kho hàng' ? (
          <Inventory />
        ) : (
          <div className="grid grid-cols-12 gap-6">
            {/* Business Overview */}
            <div className="col-span-8 bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-medium mb-4">Tổng quan kinh doanh</h2>
              <div className="grid grid-cols-4 gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-3 rounded">
                    <i className="fas fa-shopping-bag text-blue-500"></i>
                  </div>
                  <div>
                    <div className="text-lg font-medium">đ {businessOverview.sales}</div>
                    <div className="text-sm text-gray-500">Sales</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 p-3 rounded">
                    <i className="fas fa-chart-line text-purple-500"></i>
                  </div>
                  <div>
                    <div className="text-lg font-medium">đ {businessOverview.revenue}</div>
                    <div className="text-sm text-gray-500">Doanh thu</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-3 rounded">
                    <i className="fas fa-dollar-sign text-green-500"></i>
                  </div>
                  <div>
                    <div className="text-lg font-medium">đ {businessOverview.profit}</div>
                    <div className="text-sm text-gray-500">Lợi nhuận</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-yellow-100 p-3 rounded">
                    <i className="fas fa-wallet text-yellow-500"></i>
                  </div>
                  <div>
                    <div className="text-lg font-medium">đ {businessOverview.expenses}</div>
                    <div className="text-sm text-gray-500">Chi phí</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Inventory Overview */}
            <div className="col-span-4 bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-medium mb-4">Tổng quan kho hàng</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-orange-100 p-3 rounded">
                    <i className="fas fa-box text-orange-500"></i>
                  </div>
                  <div>
                    <div className="text-lg font-medium">{inventoryOverview.total_stock}</div>
                    <div className="text-sm text-gray-500">Số lượng tồn kho</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-indigo-100 p-3 rounded">
                    <i className="fas fa-truck text-indigo-500"></i>
                  </div>
                  <div>
                    <div className="text-lg font-medium">{inventoryOverview.delivered}</div>
                    <div className="text-sm text-gray-500">Số lượng đã giao</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Purchase Overview */}
            <div className="col-span-8 bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-medium mb-4">Tổng quan nhập hàng</h2>
              <div className="grid grid-cols-4 gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-3 rounded">
                    <i className="fas fa-shopping-cart text-blue-500"></i>
                  </div>
                  <div>
                    <div className="text-lg font-medium">{purchaseOverview.purchase_orders}</div>
                    <div className="text-sm text-gray-500">Đã nhập</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-3 rounded">
                    <i className="fas fa-money-bill text-green-500"></i>
                  </div>
                  <div>
                    <div className="text-lg font-medium">đ {purchaseOverview.expenses}</div>
                    <div className="text-sm text-gray-500">Chi phí</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-red-100 p-3 rounded">
                    <i className="fas fa-times-circle text-red-500"></i>
                  </div>
                  <div>
                    <div className="text-lg font-medium">{purchaseOverview.cancelled}</div>
                    <div className="text-sm text-gray-500">Đã hủy</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-yellow-100 p-3 rounded">
                    <i className="fas fa-undo text-yellow-500"></i>
                  </div>
                  <div>
                    <div className="text-lg font-medium">đ {purchaseOverview.refunded}</div>
                    <div className="text-sm text-gray-500">Hoàn trả</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Overview */}
            <div className="col-span-4 bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-medium mb-4">Tổng quan sản phẩm</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 p-3 rounded">
                    <i className="fas fa-users text-purple-500"></i>
                  </div>
                  <div>
                    <div className="text-lg font-medium">{productOverview.suppliers}</div>
                    <div className="text-sm text-gray-500">Số lượng nhà cung cấp</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-indigo-100 p-3 rounded">
                    <i className="fas fa-box-open text-indigo-500"></i>
                  </div>
                  <div>
                    <div className="text-lg font-medium">{productOverview.products}</div>
                    <div className="text-sm text-gray-500">Số lượng Mặt hàng</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sales & Purchase Chart */}
            <div className="col-span-8 bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium">Bán hàng & Nhập hàng</h2>
                <select 
                  className="border rounded px-3 py-1"
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                >
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Yearly">Yearly</option>
                </select>
              </div>
              <div className="h-[300px]">
                <Bar
                  data={salesPurchaseData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        grid: {
                          display: true,
                          color: 'rgba(0, 0, 0, 0.1)',
                        },
                      },
                      x: {
                        grid: {
                          display: false,
                        },
                      },
                    },
                    plugins: {
                      legend: {
                        position: 'bottom',
                      },
                    },
                  }}
                />
              </div>
            </div>

            {/* Order Overview Chart */}
            <div className="col-span-4 bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-medium mb-6">Tổng quan đơn hàng</h2>
              <div className="h-[300px]">
                <Line
                  data={orderOverviewData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        grid: {
                          display: true,
                          color: 'rgba(0, 0, 0, 0.1)',
                        },
                      },
                      x: {
                        grid: {
                          display: false,
                        },
                      },
                    },
                    plugins: {
                      legend: {
                        position: 'bottom',
                      },
                    },
                  }}
                />
              </div>
            </div>

            {/* Best Sellers Table */}
            <div className="col-span-6 bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">Sản phẩm bán chạy</h2>
                <Link href="#" className="text-blue-500 text-sm hover:underline">
                  Xem tất cả
                </Link>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-600">
                    <th className="pb-3">Tên sản phẩm</th>
                    <th className="pb-3">Số lượng đã bán</th>
                    <th className="pb-3">Số lượng còn lại</th>
                    <th className="pb-3">Giá</th>
                  </tr>
                </thead>
                <tbody>
                  {bestSellers.map((product, index) => (
                    <tr key={index} className="border-t">
                      <td className="py-3">{product.name}</td>
                      <td className="py-3">{product.sold}</td>
                      <td className="py-3">{product.remaining}</td>
                      <td className="py-3">đ {product.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Low Stock Products */}
            <div className="col-span-6 bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">Sản phẩm sắp hết</h2>
                <Link href="#" className="text-blue-500 text-sm hover:underline">
                  Xem tất cả
                </Link>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-600">
                    <th className="pb-3">Tên sản phẩm</th>
                    <th className="pb-3">Số lượng đã bán</th>
                    <th className="pb-3">Số lượng còn lại</th>
                    <th className="pb-3">Giá</th>
                  </tr>
                </thead>
                <tbody>
                  {bestSellers.map((product, index) => (
                    <tr key={index} className="border-t">
                      <td className="py-3">{product.name}</td>
                      <td className="py-3">{product.sold}</td>
                      <td className="py-3">{product.remaining}</td>
                      <td className="py-3">đ {product.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}