"use client";

import { useState } from 'react';
import Link from 'next/link';
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
import { Bar } from 'react-chartjs-2';

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

export default function DashboardHomePage() {
  const businessOverview = {
    revenue: 18300,
  };

  const inventoryOverview = {
    total_stock: 868,
    delivered: 200,
  };

  const voucherOverview = {
    total_vouchers: 50,
  };

  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Số lượng sản phẩm bán ra',
        data: [480, 470, 520, 420, 430, 400, 470, 420, 430, 420, 450, 460],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Revenue Overview */}
      <div className="col-span-4 bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-medium mb-4 text-black">Doanh thu</h2>
        <div className="flex items-center gap-3">
          <div className="bg-purple-100 p-3 rounded">
            <i className="fas fa-chart-line text-purple-500"></i>
          </div>
          <div>
            <div className="text-lg font-medium text-green-600">đ {businessOverview.revenue}</div>
            <div className="text-sm text-black">Tổng doanh thu</div>
          </div>
        </div>
      </div>

      {/* Inventory Overview */}
      <div className="col-span-4 bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-medium mb-4 text-black">Tổng quan kho hàng</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-orange-100 p-3 rounded">
              <i className="fas fa-box text-orange-500"></i>
            </div>
            <div>
              <div className="text-lg font-medium text-black">{inventoryOverview.total_stock}</div>
              <div className="text-sm text-black">Số lượng tồn kho</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-indigo-100 p-3 rounded">
              <i className="fas fa-truck text-indigo-500"></i>
            </div>
            <div>
              <div className="text-lg font-medium text-black">{inventoryOverview.delivered}</div>
              <div className="text-sm text-black">Số lượng đã giao</div>
            </div>
          </div>
        </div>
      </div>

      {/* Voucher Overview */}
      <div className="col-span-4 bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-medium mb-4 text-black">Tổng quan voucher</h2>
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-3 rounded">
            <i className="fas fa-ticket-alt text-blue-500"></i>
          </div>
          <div>
            <div className="text-lg font-medium text-black">{voucherOverview.total_vouchers}</div>
            <div className="text-sm text-black">Số lượng voucher hiện có</div>
          </div>
        </div>
      </div>

      {/* Sales Chart */}
      <div className="col-span-12 bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-medium mb-4 text-black">Số lượng sản phẩm bán ra trong năm</h2>
        <div className="h-[300px]">
          <Bar
            data={salesData}
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
    </div>
  );
}