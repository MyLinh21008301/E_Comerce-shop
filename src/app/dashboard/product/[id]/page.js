"use client";
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { mockProducts } from '@/data/mockData';
import { CATEGORIES } from '@/utils/constants';

// Dữ liệu nhà cung cấp
const supplierInfo = {
  name: 'Ronald Martin',
  phone: '98789 86757',
};

export default function DashboardProductDetail() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('Tổng quan');

  useEffect(() => {
    const found = mockProducts.find(p => p.id === parseInt(id));
    setProduct(found);
  }, [id]);

  if (!product) return <div className="p-8 text-center text-black">Đang tải sản phẩm...</div>;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-medium text-black">{product.name}</h1>
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
      <div className="flex border-b mb-6">
        <button 
          onClick={() => setActiveTab('Tổng quan')}
          className={`mr-8 py-2 px-1 border-b-2 ${activeTab === 'Tổng quan' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}
        >
          Tổng quan
        </button>
        <button 
          onClick={() => setActiveTab('Nhập hàng')}
          className={`mr-8 py-2 px-1 border-b-2 ${activeTab === 'Nhập hàng' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}
        >
          Nhập hàng
        </button>
        <button 
          onClick={() => setActiveTab('Điều chỉnh')}
          className={`mr-8 py-2 px-1 border-b-2 ${activeTab === 'Điều chỉnh' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}
        >
          Điều chỉnh
        </button>
        <button 
          onClick={() => setActiveTab('Lịch sử')}
          className={`mr-8 py-2 px-1 border-b-2 ${activeTab === 'Lịch sử' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}
        >
          Lịch sử
        </button>
      </div>

      {/* Nội dung tab */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        {activeTab === 'Tổng quan' && (
          <div className="grid grid-cols-3 gap-6">
            {/* Cột thông tin chính và nhà cung cấp */}
            <div className="col-span-2">
              {/* Thông tin chính */}
              <div className="mb-8">
                <h3 className="text-black font-semibold mb-4">Thông tin chính</h3>
                <div className="grid grid-cols-2 gap-y-3">
                  <div className="text-gray-500">Tên sản phẩm</div>
                  <div className="text-black">{product.name}</div>
                  
                  <div className="text-gray-500">Mã sản phẩm</div>
                  <div className="text-black">{product.id}</div>
                  
                  <div className="text-gray-500">Loại sản phẩm</div>
                  <div className="text-black">Technology</div>
                  
                  <div className="text-gray-500">Hạn sử dụng</div>
                  <div className="text-black">--</div>
                  
                  <div className="text-gray-500">Giá trị giới hạn</div>
                  <div className="text-black">12</div>
                </div>
              </div>

              {/* Thông tin nhà cung cấp */}
              <div>
                <h3 className="text-black font-semibold mb-4">Thông tin nhà cung cấp</h3>
                <div className="grid grid-cols-2 gap-y-3">
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
                <div className="border-2 border-dashed border-gray-300 rounded p-2">
                  <img src={product.image} alt={product.name} className="w-40 h-40 object-cover rounded" />
                </div>
              </div>
              
              {/* Số liệu kho */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Opening Stock</span>
                  <span className="text-black font-semibold">40</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Remaining Stock</span>
                  <span className="text-black font-semibold">34</span>
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

        {activeTab === 'Nhập hàng' && (
          <div className="py-4">
            <p className="text-gray-500">Thông tin nhập hàng sẽ hiển thị ở đây</p>
          </div>
        )}
        
        {activeTab === 'Điều chỉnh' && (
          <div className="py-4">
            <p className="text-gray-500">Thông tin điều chỉnh sẽ hiển thị ở đây</p>
          </div>
        )}
        
        {activeTab === 'Lịch sử' && (
          <div className="py-4">
            <p className="text-gray-500">Lịch sử sản phẩm sẽ hiển thị ở đây</p>
          </div>
        )}
      </div>
    </div>
  );
}
