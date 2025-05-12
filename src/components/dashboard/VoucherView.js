"use client";

import { useState } from "react";

export default function VoucherView() {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    startDate: "",
    endDate: "",
    discountType: "amount", // or 'percentage'
    discountValue: "",
    minOrderValue: "",
    maxUsage: "",
    maxUsagePerUser: "",
    applicableProducts: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle form submission
    console.log("Form Data:", formData);
  };

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-4 text-black">Tạo mã giảm giá</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-black-700 text-black">Tên chương trình giảm giá</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 block w-full border-black-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-black-700 text-black">Mã voucher</label>
          <input
            type="text"
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
            className="mt-1 block w-full border-black-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 text-black">
          <div>
            <label className="block text-sm font-medium text-black-700">Thời gian bắt đầu</label>
            <input
              type="datetime-local"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Thời gian kết thúc</label>
            <input
              type="datetime-local"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 text-black">Loại giảm giá</label>
          <select
            value={formData.discountType}
            onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
          >
            <option value="amount">Giảm theo số tiền</option>
            <option value="percentage">Giảm theo %</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Giá trị giảm giá</label>
          <input
            type="number"
            value={formData.discountValue}
            onChange={(e) => setFormData({ ...formData, discountValue: e.target.value })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Giá trị đơn hàng tối thiểu</label>
          <input
            type="number"
            value={formData.minOrderValue}
            onChange={(e) => setFormData({ ...formData, minOrderValue: e.target.value })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Tổng lượt sử dụng tối đa</label>
          <input
            type="number"
            value={formData.maxUsage}
            onChange={(e) => setFormData({ ...formData, maxUsage: e.target.value })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Lượt sử dụng tối đa/Người mua</label>
          <input
            type="number"
            value={formData.maxUsagePerUser}
            onChange={(e) => setFormData({ ...formData, maxUsagePerUser: e.target.value })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 text-black">Sản phẩm áp dụng (nếu có)</label>
          <input
            type="text"
            value={formData.applicableProducts.join(", ")}
            onChange={(e) => setFormData({ ...formData, applicableProducts: e.target.value.split(", ") })}
            placeholder="Nhập ID sản phẩm, cách nhau bởi dấu phẩy"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Tạo mã giảm giá
        </button>
      </form>
    </div>
  );
}
