"use client";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { mockProducts } from '@/data/mockData';
import { CATEGORIES } from '@/utils/constants';
import Image from 'next/image';

const supplierInfo = {
  name: 'Ronald Martin',
  phone: '98789 86757',
};

export default function DashboardProductDetail() {
  const params = useParams();
  const { id } = params;
  const [product, setProduct] = useState(null);
  const [tab, setTab] = useState('Tổng quan');

  useEffect(() => {
    const found = mockProducts.find(p => p.id === parseInt(id));
    setProduct(found);
  }, [id]);

  if (!product) return <div className="p-8 text-center text-gray-500">Không tìm thấy sản phẩm</div>;

  return (
    <div className="flex justify-center items-start min-h-[90vh] bg-transparent">
      <div className="bg-white rounded-2xl shadow max-w-4xl w-full mt-4 p-8 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-black">{product.name}</h1>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-300 rounded text-black bg-white hover:bg-gray-50 flex items-center gap-2">
              <i className="fas fa-pen"></i> Sửa
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded text-black bg-white hover:bg-gray-50 flex items-center gap-2">
              <i className="fas fa-download"></i> Tải xuống
            </button>
          </div>
        </div>
        {/* Tabs */}
        <div className="flex gap-8 border-b mb-8">
          {['Tổng quan', 'Nhập hàng', 'Điều chỉnh', 'Lịch sử'].map(t => (
            <button
              key={t}
              className={`py-2 px-1 border-b-2 text-base font-medium transition-all ${tab === t ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </div>
        {/* Tab content: Tổng quan */}
        {tab === 'Tổng quan' && (
          <div className="grid grid-cols-12 gap-0">
            {/* Thông tin chính + nhà cung cấp */}
            <div className="col-span-8">
              <div className="mb-8">
                <div className="font-semibold text-black mb-4">Thông tin chính</div>
                <div className="grid grid-cols-2 gap-y-2 text-gray-700 text-base">
                  <div className="text-gray-600">Tên sản phẩm</div>
                  <div className="text-black font-medium">{product.name}</div>
                  <div className="text-gray-600">Mã sản phẩm</div>
                  <div className="text-black font-medium">{product.id}</div>
                  <div className="text-gray-600">Loại sản phẩm</div>
                  <div className="text-black font-medium">{CATEGORIES.find(c => product.name.toLowerCase().includes(c.name.toLowerCase()))?.name || 'Khác'}</div>
                  <div className="text-gray-600">Hạn sử dụng</div>
                  <div className="text-black font-medium">--</div>
                  <div className="text-gray-600">Giá trị giới hạn</div>
                  <div className="text-black font-medium">12</div>
                </div>
              </div>
              <div className="font-semibold text-black mb-2">Thông tin nhà cung cấp</div>
              <div className="grid grid-cols-2 gap-y-2 text-gray-700 text-base mb-8">
                <div className="text-gray-600">Tên nhà cung cấp</div>
                <div className="text-black font-medium">{supplierInfo.name}</div>
                <div className="text-gray-600">Số điện thoại</div>
                <div className="text-black font-medium">{supplierInfo.phone}</div>
              </div>
            </div>
            {/* Ảnh và chỉ số kho */}
            <div className="col-span-4 flex flex-col items-center justify-start">
              <div className="border-2 border-dashed border-gray-300 rounded-lg mb-6 p-2 w-[160px] h-[160px] flex items-center justify-center bg-white">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded" />
              </div>
              <div className="grid grid-cols-1 gap-2 w-full text-gray-700 text-base">
                <div className="flex justify-between"><span>Opening Stock</span><span className="font-bold text-black">40</span></div>
                <div className="flex justify-between"><span>Remaining Stock</span><span className="font-bold text-black">{product.stock}</span></div>
                <div className="flex justify-between"><span>On the way</span><span className="font-bold text-black">15</span></div>
                <div className="flex justify-between"><span>Giá trị giới hạn</span><span className="font-bold text-black">12</span></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
