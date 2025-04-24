// src/components/dashboard/ProductDetailView.js
"use client";
import { useEffect, useState } from 'react';
import { mockProducts } from '@/data/mockData';
import { CATEGORIES } from '@/utils/constants';

// Dữ liệu nhà cung cấp (ví dụ)
const supplierInfo = {
  name: 'Ronald Martin',
  phone: '98789 86757',
};

export default function ProductDetailView({ productId, onBack }) {
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('Tổng quan');

  useEffect(() => {
    const found = mockProducts.find(p => p.id === parseInt(productId));
    setProduct(found);
  }, [productId]);

  if (!product) return <div className="p-8 text-center text-gray-500">Đang tải sản phẩm...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
       {/* Nút quay lại */}
       <button onClick={onBack} className="mb-4 text-blue-600 hover:underline flex items-center gap-1">
         <i className="fas fa-arrow-left text-xs"></i> Quay lại danh sách
       </button>

      {/* Header và nút hành động */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-medium text-black">{product.name}</h1>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-300 rounded text-black bg-white hover:bg-gray-50 flex items-center gap-2 text-sm">
            <i className="fas fa-pen"></i> Sửa
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded text-black bg-white hover:bg-gray-50 flex items-center gap-2 text-sm">
            <i className="fas fa-download"></i> Tải xuống
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-6">
        {['Tổng quan', 'Nhập hàng', 'Điều chỉnh', 'Lịch sử'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`mr-8 py-2 px-1 border-b-2 text-sm ${activeTab === tab ? 'border-blue-600 text-blue-600 font-medium' : 'border-transparent text-gray-500'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Nội dung tab */}
      <div>
        {activeTab === 'Tổng quan' && (
          <div className="grid grid-cols-3 gap-6">
            {/* Cột thông tin chính và nhà cung cấp */}
            <div className="col-span-2">
              {/* Thông tin chính */}
              <div className="mb-8">
                <h3 className="text-black font-semibold mb-4 text-base">Thông tin chính</h3>
                <div className="grid grid-cols-2 gap-y-3 text-sm">
                  <div className="text-gray-500">Tên sản phẩm</div>
                  <div className="text-black">{product.name}</div>
                  <div className="text-gray-500">Mã sản phẩm</div>
                  <div className="text-black">{product.id}</div>
                  <div className="text-gray-500">Loại sản phẩm</div>
                  <div className="text-black">{CATEGORIES.find(c => product.name.toLowerCase().includes(c.name.toLowerCase()))?.name || 'Khác'}</div>
                  <div className="text-gray-500">Hạn sử dụng</div>
                  <div className="text-black">--</div>
                  <div className="text-gray-500">Giá trị giới hạn</div>
                  <div className="text-black">12</div>
                </div>
              </div>
              {/* Thông tin nhà cung cấp */}
              <div>
                <h3 className="text-black font-semibold mb-4 text-base">Thông tin nhà cung cấp</h3>
                <div className="grid grid-cols-2 gap-y-3 text-sm">
                  <div className="text-gray-500">Tên nhà cung cấp</div>
                  <div className="text-black">{supplierInfo.name}</div>
                  <div className="text-gray-500">Số điện thoại</div>
                  <div className="text-black">{supplierInfo.phone}</div>
                </div>
              </div>
            </div>
            {/* Cột ảnh và số liệu */}
            <div className="col-span-1">
              {/* Ảnh sản phẩm */}
              <div className="flex justify-center mb-6">
                <div className="border-2 border-dashed border-gray-300 rounded p-1 w-[160px] h-[160px]">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded" />
                </div>
              </div>
              {/* Số liệu kho */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Opening Stock</span>
                  <span className="text-black font-semibold">40</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Remaining Stock</span>
                  <span className="text-black font-semibold">{product.stock}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">On the way</span>
                  <span className="text-black font-semibold">15</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Giá trị giới hạn</span>
                  <span className="text-black font-semibold">12</span>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Placeholder cho các tab khác */}
        {activeTab !== 'Tổng quan' && (
          <div className="py-4">
            <p className="text-gray-500">Thông tin {activeTab.toLowerCase()} sẽ hiển thị ở đây</p>
          </div>
        )}
      </div>
    </div>
  );
}