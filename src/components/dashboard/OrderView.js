'use client';

import React, { useState } from 'react';

export default function OrderView() {
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});

  const handleOrderClick = (order) => {
    setSelectedOrder({ ...order }); // Ensure a copy of the order is used
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleUpdateOrder = () => {
    // Logic to update the order
    setShowModal(false);
  };

  return (
    <div className={`p-6 bg-gray-100 min-h-screen ${showModal ? 'opacity-60' : ''}`}>
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
          <span className="text-2xl font-bold text-black">₫25000</span>
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

      {/* Nút Add Order và Order History */}
      <div className="flex justify-end gap-2 mb-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Add Order
        </button>
        <button className="px-4 py-2 bg-white border border-gray-300 text-black rounded hover:bg-gray-100 transition">
          Order History
        </button>
        <button className="px-4 py-2 bg-white border border-gray-300 text-black rounded hover:bg-gray-100 transition">
          Filters
        </button>
      </div>

      {/* Danh sách đơn hàng */}
      <div className="bg-white rounded-lg shadow p-6">
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
            <tr className="border-t hover:bg-gray-50 transition" onClick={() => handleOrderClick({ product: 'Maggi', value: '₫4306', quantity: '43 PCS', id: '7535', delivery: '11/12/22', status: 'Delayed' })}>
              <td className="py-3 text-black">Maggi</td>
              <td className="py-3 text-black">₫4306</td>
              <td className="py-3 text-black">43 PCS</td>
              <td className="py-3 text-black">7535</td>
              <td className="py-3 text-black">11/12/22</td>
              <td className="py-3 text-red-500">Delayed</td>
            </tr>
            <tr className="border-t hover:bg-gray-50 transition" onClick={() => handleOrderClick({ product: 'Bru', value: '₫2557', quantity: '22 PCS', id: '5724', delivery: '21/12/22', status: 'Confirmed' })}>
              <td className="py-3 text-black">Bru</td>
              <td className="py-3 text-black">₫2557</td>
              <td className="py-3 text-black">22 PCS</td>
              <td className="py-3 text-black">5724</td>
              <td className="py-3 text-black">21/12/22</td>
              <td className="py-3 text-green-500">Confirmed</td>
            </tr>
            <tr className="border-t hover:bg-gray-50 transition" onClick={() => handleOrderClick({ product: 'Red Bull', value: '₫4075', quantity: '36 PCS', id: '2775', delivery: '5/12/22', status: 'Returned' })}>
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-[3px] bg-white/40 transition-all">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Cập nhật đơn hàng</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Sản phẩm</label>
              <input
                type="text"
                value={selectedOrder.product}
                onChange={(e) => setSelectedOrder({ ...selectedOrder, product: e.target.value })}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Order Value</label>
              <input
                type="text"
                value={selectedOrder.value}
                onChange={(e) => setSelectedOrder({ ...selectedOrder, value: e.target.value })}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Số lượng</label>
              <input
                type="text"
                value={selectedOrder.quantity}
                onChange={(e) => setSelectedOrder({ ...selectedOrder, quantity: e.target.value })}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Order ID</label>
              <input
                type="text"
                value={selectedOrder.id}
                readOnly
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Expected Delivery</label>
              <input
                type="text"
                value={selectedOrder.delivery}
                onChange={(e) => setSelectedOrder({ ...selectedOrder, delivery: e.target.value })}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Trạng thái</label>
              <select
                value={selectedOrder.status}
                onChange={(e) => setSelectedOrder({ ...selectedOrder, status: e.target.value })}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="Delayed">Delayed</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Returned">Returned</option>
              </select>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={handleModalClose}
                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition"
              >
                Hủy
              </button>
              <button
                onClick={handleUpdateOrder}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}