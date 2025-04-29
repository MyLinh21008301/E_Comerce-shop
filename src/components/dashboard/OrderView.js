'use client';

import React from 'react';

export default function OrderView() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Đơn hàng</h1>

      {/* Tổng quan đơn hàng */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-4 flex flex-col items-start">
          <span className="text-xs font-semibold text-blue-600 mb-1">Total Orders</span>
          <span className="text-2xl font-bold text-black">37</span>
          <span className="text-xs text-gray-500 mt-1">7 ngày gần đây</span>
        </div>
        <div className="bg-white rounded-lg shadow p-4 flex flex-col items-start">
          <span className="text-xs font-semibold text-orange-500 mb-1">Total Received</span>
          <span className="text-2xl font-bold text-black">32</span>
          <span className="text-xs text-gray-500 mt-1">Doanh thu</span>
        </div>
        <div className="bg-white rounded-lg shadow p-4 flex flex-col items-start">
          <span className="text-xs font-semibold text-purple-600 mb-1">Total Returned</span>
          <span className="text-2xl font-bold text-black">5</span>
          <span className="text-xs text-gray-500 mt-1">7 ngày gần đây</span>
        </div>
        <div className="bg-white rounded-lg shadow p-4 flex flex-col items-start">
          <span className="text-xs font-semibold text-red-500 mb-1">On the way</span>
          <span className="text-2xl font-bold text-black">12</span>
          <span className="text-xs text-gray-500 mt-1">Đã đặt</span>
        </div>
      </div>

      {/* Danh sách đơn hàng */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Đơn hàng</h2>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Add Order</button>
            <button className="px-4 py-2 bg-white border border-gray-300 text-black rounded hover:bg-gray-100 transition">Filters</button>
            <button className="px-4 py-2 bg-white border border-gray-300 text-black rounded hover:bg-gray-100 transition">Order History</button>
          </div>
        </div>
        <table className="w-full text-left border-t">
          <thead>
            <tr className="text-gray-600">
              <th className="py-3">Sản phẩm</th>
              <th className="py-3">Order Value</th>
              <th className="py-3">Số lượng</th>
              <th className="py-3">Order ID</th>
              <th className="py-3">Expected Delivery</th>
              <th className="py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t hover:bg-gray-50 transition">
              <td className="py-3 text-black">Maggi</td>
              <td className="py-3 text-black">₫4306</td>
              <td className="py-3 text-black">43 PCS</td>
              <td className="py-3 text-black">7535</td>
              <td className="py-3 text-black">11/12/22</td>
              <td className="py-3 text-red-500">Delayed</td>
            </tr>
            <tr className="border-t hover:bg-gray-50 transition">
              <td className="py-3 text-black">Bru</td>
              <td className="py-3 text-black">₫2557</td>
              <td className="py-3 text-black">22 PCS</td>
              <td className="py-3 text-black">5724</td>
              <td className="py-3 text-black">21/12/22</td>
              <td className="py-3 text-green-500">Confirmed</td>
            </tr>
            <tr className="border-t hover:bg-gray-50 transition">
              <td className="py-3 text-black">Red Bull</td>
              <td className="py-3 text-black">₫4075</td>
              <td className="py-3 text-black">36 PCS</td>
              <td className="py-3 text-black">2775</td>
              <td className="py-3 text-black">5/12/22</td>
              <td className="py-3 text-orange-500">Returned</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}