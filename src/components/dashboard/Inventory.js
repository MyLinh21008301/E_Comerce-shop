'use client';

import React, { useState, useRef } from "react";
import { mockProducts } from '@/data/mockData';
import { CATEGORIES } from '@/utils/constants';
import ProductDetailView from './ProductDetailView'; // Import component mới

export default function Inventory() {
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  const [selectedProductId, setSelectedProductId] = useState(null); // State mới

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Hàm xử lý khi click vào sản phẩm
  const handleProductClick = (productId) => {
    setSelectedProductId(productId);
  };

  // Hàm xử lý khi nhấn nút Back trong chi tiết sản phẩm
  const handleBackToList = () => {
    setSelectedProductId(null);
  };

  return (
    <div className="relative">
      {/* Thanh tìm kiếm và Tổng quan luôn hiển thị */}
      {/* Thanh tìm kiếm */}
      

      {/* Tổng quan kho */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-4 flex flex-col items-start">
          <span className="text-xs font-semibold text-blue-600 mb-1">Loại sản phẩm</span>
          <span className="text-2xl font-bold text-black">14</span>
          <span className="text-xs text-black mt-1">7 ngày gần đây</span>
        </div>
        <div className="bg-white rounded-lg shadow p-4 flex flex-col items-start">
          <span className="text-xs font-semibold text-orange-500 mb-1">Tổng số lượng sản phẩm</span>
          <span className="text-2xl font-bold text-black">868</span>
          <span className="text-xs text-black mt-1">7 ngày gần đây</span>
        </div>
        <div className="bg-white rounded-lg shadow p-4 flex flex-col items-start">
          <span className="text-xs font-semibold text-purple-600 mb-1">Top Selling</span>
          <span className="text-2xl font-bold text-black">5</span>
          <span className="text-xs text-black mt-1">7 ngày gần đây</span>
        </div>
        <div className="bg-white rounded-lg shadow p-4 flex flex-col items-start">
          <span className="text-xs font-semibold text-red-500 mb-1">Hàng tồn kho thấp</span>
          <span className="text-2xl font-bold text-black">12</span>
          <span className="text-xs text-gray-500 mt-1">2 không có trong kho</span>
        </div>
      </div>

      {/* Phần nội dung chính: Danh sách hoặc Chi tiết */}
      {selectedProductId ? (
        <ProductDetailView productId={selectedProductId} onBack={handleBackToList} />
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-black">Danh sách sản phẩm</h2>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition" onClick={() => setShowModal(true)}>Thêm sản phẩm</button>
              <button className="px-4 py-2 bg-white border border-gray-300 text-black rounded hover:bg-gray-100 transition">Filters</button>
              <button className="px-4 py-2 bg-white border border-gray-300 text-black rounded hover:bg-gray-100 transition">Tải xuống</button>
            </div>
          </div>
          <table className="w-full text-left border-t">
            <thead>
              <tr className="text-gray-600">
                <th className="py-3 text-black">Sản phẩm</th>
                <th className="py-3 text-black">Giá nhập</th>
                <th className="py-3 text-black">Số lượng</th>
                <th className="py-3 text-black">Loại</th>
                <th className="py-3 text-black">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {mockProducts.map((item) => (
                <tr key={item.id} className="border-t hover:bg-blue-50 transition cursor-pointer" onClick={() => handleProductClick(item.id)}>
                  <td className="py-3 text-black font-medium flex items-center gap-2">
                    <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded" />
                    {item.name}
                  </td>
                  <td className="py-3 text-black">₫{item.price.toLocaleString()}</td>
                  <td className="py-3 text-black">{item.stock}</td>
                  <td className="py-3 text-black">{CATEGORIES.find(c => item.name.toLowerCase().includes(c.name.toLowerCase()))?.name || 'Khác'}</td>
                  <td className="py-3">
                    {item.stock > 10 ? (
                      <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs">Còn hàng</span>
                    ) : item.stock > 0 ? (
                      <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-700 text-xs">Sắp hết</span>
                    ) : (
                      <span className="px-2 py-1 rounded bg-red-100 text-red-700 text-xs">Hết hàng</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-4">
            <button className="px-4 py-2 bg-white border border-gray-300 text-black rounded hover:bg-gray-100 transition">Trước</button>
            <span className="text-black">Trang 1 trong 10</span>
            <button className="px-4 py-2 bg-white border border-gray-300 text-black rounded hover:bg-gray-100 transition">Sau</button>
          </div>
        </div>
      )}

      {/* Modal thêm sản phẩm (giữ nguyên) */}
      {showModal && (
        <>
          {/* Overlay blur, không tối màu */}
          <div className="fixed inset-0 z-40 backdrop-blur-[3px] bg-white/40 transition-all"></div>
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-[26rem] border border-gray-100">
              <h2 className="text-xl font-semibold text-black mb-6 text-left">Sản phẩm mới</h2>
              <form>
                <div className="grid grid-cols-2 gap-4">
                  {/* Phần ảnh sản phẩm */}
                  <div className="flex flex-col items-center">
                    <label className="block text-black text-sm mb-1 w-full text-left">Ảnh sản phẩm</label>
                    <div
                      className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer bg-gray-50 mb-2"
                      onClick={() => fileInputRef.current.click()}
                    >
                      {image ? (
                        <img src={image} alt="preview" className="w-full h-full object-cover rounded-lg" />
                      ) : (
                        <span className="text-gray-400 text-xs text-center">Thả ảnh vào đây<br/>hoặc<br/><span className='text-blue-500 underline'>Tải ảnh lên</span></span>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                      />
                    </div>
                  </div>

                  {/* Phần điền thông tin */}
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <label className="block text-black text-sm mb-1">Tên sản phẩm</label>
                      <input className="w-full border border-gray-300 rounded px-2 py-1 text-black bg-gray-50" placeholder="Nhập tên sản phẩm" />
                    </div>
                    <div>
                      <label className="block text-black text-sm mb-1">Mã sản phẩm</label>
                      <input className="w-full border border-gray-300 rounded px-2 py-1 text-black bg-gray-50" placeholder="Nhập mã sản phẩm" />
                    </div>
                    <div>
                      <label className="block text-black text-sm mb-1">Loại sản phẩm</label>
                      <select className="w-full border border-gray-300 rounded px-2 py-1 text-black bg-gray-50">
                        <option>Chọn loại sản phẩm</option>
                        {CATEGORIES.map(c => (
                          <option key={c.id} value={c.name}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-black text-sm mb-1">Giá nhập</label>
                      <input className="w-full border border-gray-300 rounded px-2 py-1 text-black bg-gray-50" placeholder="Nhập giá nhập" />
                    </div>
                    <div>
                      <label className="block text-black text-sm mb-1">Số lượng</label>
                      <input className="w-full border border-gray-300 rounded px-2 py-1 text-black bg-gray-50" placeholder="Nhập số lượng" />
                    </div>
                    <div>
                      <label className="block text-black text-sm mb-1">Hạn sử dụng</label>
                      <input className="w-full border border-gray-300 rounded px-2 py-1 text-black bg-gray-50" placeholder="Nhập hạn sử dụng" />
                    </div>
                    <div>
                      <label className="block text-black text-sm mb-1">Giá trị giới hạn</label>
                      <input className="w-full border border-gray-300 rounded px-2 py-1 text-black bg-gray-50" placeholder="Nhập giá trị giới hạn" />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-6">
                  <button type="button" className="px-4 py-1 rounded border border-gray-300 bg-white text-black hover:bg-gray-100" onClick={() => setShowModal(false)}>Hủy</button>
                  <button type="submit" className="px-4 py-1 rounded bg-blue-600 text-white hover:bg-blue-700">Thêm sản phẩm</button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}


