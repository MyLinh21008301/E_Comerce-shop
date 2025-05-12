"use client";

import { useState } from "react";

export default function VoucherManagement() {
  const [vouchers, setVouchers] = useState([
    {
      id: 1,
      name: "Giảm giá 10%",
      code: "SALE10",
      startDate: "2025-05-01",
      endDate: "2025-05-31",
      discountType: "percentage",
      discountValue: 10,
      minOrderValue: 100000,
      maxUsage: 100,
      maxUsagePerUser: 1,
      totalUsed: 50, // New field for total usage
    },
    // Thêm các mã giảm giá khác nếu cần
  ]);

  const handleDelete = (id) => {
    setVouchers(vouchers.filter((voucher) => voucher.id !== id));
  };

  const getMostUsedVoucher = () => {
    return vouchers.reduce((max, voucher) => (voucher.totalUsed > max.totalUsed ? voucher : max), vouchers[0]);
  };

  const mostUsedVoucher = getMostUsedVoucher();

  return (
    <div className="p-6 bg-gray-100">
      {/* Search and Summary Section */}
      <div className="flex items-center justify-between mb-6">
        {/* Removed duplicate search bar */}
        <div className="flex items-center gap-4">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Thêm mã giảm giá</button>
          <button className="bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400">Tải xuống</button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm font-medium text-gray-500">Loại giảm giá</p>
          <p className="text-2xl font-bold text-blue-500">{vouchers.length}</p>
          <p className="text-xs text-gray-400">7 ngày gần đây</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm font-medium text-gray-500">Tổng số lượng mã giảm giá</p>
          <p className="text-2xl font-bold text-orange-500">{vouchers.reduce((sum, v) => sum + v.maxUsage, 0)}</p>
          <p className="text-xs text-gray-400">7 ngày gần đây</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm font-medium text-gray-500">Mã giảm giá được sử dụng nhiều nhất</p>
          <p className="text-2xl font-bold text-purple-500">{mostUsedVoucher.name}</p>
          <p className="text-xs text-gray-400">{mostUsedVoucher.totalUsed} lần</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm font-medium text-gray-500">Mã giảm giá sắp hết hạn</p>
          <p className="text-2xl font-bold text-red-500">12</p>
          <p className="text-xs text-gray-400">2 mã hết hạn trong 7 ngày</p>
        </div>
      </div>

      {/* Voucher Table */}
      <div className="bg-white p-4 rounded shadow">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Tên chương trình</th>
              <th className="px-4 py-2 border-b">Mã voucher</th>
              <th className="px-4 py-2 border-b">Thời gian</th>
              <th className="px-4 py-2 border-b">Loại giảm giá</th>
              <th className="px-4 py-2 border-b">Giá trị</th>
              <th className="px-4 py-2 border-b">Tổng lượt sử dụng</th>
              <th className="px-4 py-2 border-b">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {vouchers.map((voucher) => (
              <tr key={voucher.id}>
                <td className="px-4 py-2 border-b">{voucher.name}</td>
                <td className="px-4 py-2 border-b">{voucher.code}</td>
                <td className="px-4 py-2 border-b">
                  {voucher.startDate} - {voucher.endDate}
                </td>
                <td className="px-4 py-2 border-b">
                  {voucher.discountType === "percentage" ? "Giảm %" : "Giảm tiền"}
                </td>
                <td className="px-4 py-2 border-b">
                  {voucher.discountType === "percentage"
                    ? `${voucher.discountValue}%`
                    : `${voucher.discountValue} VND`}
                </td>
                <td className="px-4 py-2 border-b">{voucher.totalUsed}</td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => handleDelete(voucher.id)}
                    className="text-red-500 hover:underline"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
