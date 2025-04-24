import React, { useState, useRef } from "react";

export default function Inventory() {
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

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

  return (
    <div className="relative">
      {/* Thanh tìm kiếm */}
      <div className="flex items-center justify-between mb-6">
        <input
          type="text"
          placeholder="Tìm sản phẩm, nhà cung cấp, đơn hàng"
          className="w-1/2 px-4 py-2 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition" onClick={() => setShowModal(true)}>Thêm sản phẩm</button>
          <button className="px-4 py-2 bg-white border border-gray-300 text-black rounded hover:bg-gray-100 transition">Filters</button>
          <button className="px-4 py-2 bg-white border border-gray-300 text-black rounded hover:bg-gray-100 transition">Tải xuống</button>
        </div>
      </div>

      {/* Tổng quan kho */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-4 flex flex-col items-start">
          <span className="text-xs font-semibold text-blue-600 mb-1">Loại sản phẩm</span>
          <span className="text-2xl font-bold text-black">14</span>
          <span className="text-xs text-gray-500 mt-1">7 ngày gần đây</span>
        </div>
        <div className="bg-white rounded-lg shadow p-4 flex flex-col items-start">
          <span className="text-xs font-semibold text-orange-500 mb-1">Tổng số lượng sản phẩm</span>
          <span className="text-2xl font-bold text-black">868</span>
          <span className="text-xs text-gray-500 mt-1">7 ngày gần đây</span>
        </div>
        <div className="bg-white rounded-lg shadow p-4 flex flex-col items-start">
          <span className="text-xs font-semibold text-purple-600 mb-1">Top Selling</span>
          <span className="text-2xl font-bold text-black">5</span>
          <span className="text-xs text-gray-500 mt-1">7 ngày gần đây</span>
        </div>
        <div className="bg-white rounded-lg shadow p-4 flex flex-col items-start">
          <span className="text-xs font-semibold text-red-500 mb-1">Hàng tồn kho thấp</span>
          <span className="text-2xl font-bold text-black">12</span>
          <span className="text-xs text-gray-500 mt-1">2 không có trong kho</span>
        </div>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-black">Danh sách sản phẩm</h2>
        </div>
        <table className="w-full text-left border-t">
          <thead>
            <tr className="text-gray-600">
              <th className="py-3 text-black">Sản phẩm</th>
              <th className="py-3 text-black">Giá nhập</th>
              <th className="py-3 text-black">Số lượng</th>
              <th className="py-3 text-black">Giá trị giới hạn</th>
              <th className="py-3 text-black">Hạn sử dụng</th>
              <th className="py-3 text-black">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: 'Maggi', price: 'đ430', quantity: '43 PCS', limit: '12 PCS', expiry: '11/12/22', status: 'in' },
              { name: 'Bru', price: 'đ257', quantity: '22 PCS', limit: '12 PCS', expiry: '21/12/22', status: 'out' },
              { name: 'Red Bull', price: 'đ405', quantity: '36 PCS', limit: '9 PCS', expiry: '5/12/22', status: 'in' },
              { name: 'Bourn Vita', price: 'đ502', quantity: '14 PCS', limit: '6 PCS', expiry: '8/12/22', status: 'out' },
              { name: 'Horlicks', price: 'đ530', quantity: '5 PCS', limit: '5 PCS', expiry: '9/1/23', status: 'in' },
              { name: 'Harpic', price: 'đ605', quantity: '10 PCS', limit: '5 PCS', expiry: '9/1/23', status: 'in' },
              { name: 'Ariel', price: 'đ408', quantity: '23 PCS', limit: '7 PCS', expiry: '15/12/23', status: 'out' },
              { name: 'Scotch Brite', price: 'đ359', quantity: '43 PCS', limit: '8 PCS', expiry: '6/6/23', status: 'in' },
              { name: 'Coca cola', price: 'đ205', quantity: '41 PCS', limit: '10 PCS', expiry: '11/11/22', status: 'low' },
            ].map((item, idx) => (
              <tr key={idx} className="border-t hover:bg-gray-50 transition">
                <td className="py-3 text-black font-medium">{item.name}</td>
                <td className="py-3 text-black">{item.price}</td>
                <td className="py-3 text-black">{item.quantity}</td>
                <td className="py-3 text-black">{item.limit}</td>
                <td className="py-3 text-black">{item.expiry}</td>
                <td className="py-3">
                  {item.status === 'in' && <span className="text-green-600 font-semibold">In- stock</span>}
                  {item.status === 'out' && <span className="text-red-500 font-semibold">Out of stock</span>}
                  {item.status === 'low' && <span className="text-yellow-500 font-semibold">Low stock</span>}
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

      {/* Overlay & Modal */}
      {showModal && (
        <>
          {/* Overlay blur, không tối màu */}
          <div className="fixed inset-0 z-40 backdrop-blur-[3px] bg-white/40 transition-all"></div>
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-xl border border-gray-100">
              <h2 className="text-2xl font-semibold text-black mb-8 text-left">Sản phẩm mới</h2>
              <form>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-black text-sm mb-1">Tên sản phẩm</label>
                    <input className="w-full border border-gray-300 rounded px-3 py-2 text-black bg-gray-50" placeholder="Nhập tên sản phẩm" />
                  </div>
                  <div>
                    <label className="block text-black text-sm mb-1">Mã sản phẩm</label>
                    <input className="w-full border border-gray-300 rounded px-3 py-2 text-black bg-gray-50" placeholder="Nhập mã sản phẩm" />
                  </div>
                  <div>
                    <label className="block text-black text-sm mb-1">Loại sản phẩm</label>
                    <select className="w-full border border-gray-300 rounded px-3 py-2 text-black bg-gray-50">
                      <option>Chọn loại sản phẩm</option>
                      <option>Đồ uống</option>
                      <option>Thực phẩm</option>
                      <option>Khác</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-black text-sm mb-1">Giá nhập</label>
                    <input className="w-full border border-gray-300 rounded px-3 py-2 text-black bg-gray-50" placeholder="Nhập giá nhập" />
                  </div>
                  <div>
                    <label className="block text-black text-sm mb-1">Số lượng</label>
                    <input className="w-full border border-gray-300 rounded px-3 py-2 text-black bg-gray-50" placeholder="Nhập số lượng" />
                  </div>
                  <div>
                    <label className="block text-black text-sm mb-1">Hạn sử dụng</label>
                    <input className="w-full border border-gray-300 rounded px-3 py-2 text-black bg-gray-50" placeholder="Nhập hạn sử dụng" />
                  </div>
                  <div>
                    <label className="block text-black text-sm mb-1">Giá trị giới hạn</label>
                    <input className="w-full border border-gray-300 rounded px-3 py-2 text-black bg-gray-50" placeholder="Nhập giá trị giới hạn" />
                  </div>
                  {/* Ảnh sản phẩm ở dưới cùng */}
                  <div className="flex flex-col items-center mt-2">
                    <label className="block text-black text-sm mb-1 w-full text-left">Ảnh sản phẩm</label>
                    <div
                      className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer bg-gray-50 mb-2"
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
                </div>
                <div className="flex justify-end gap-2 mt-8">
                  <button type="button" className="px-5 py-2 rounded border border-gray-300 bg-white text-black hover:bg-gray-100" onClick={() => setShowModal(false)}>Hủy</button>
                  <button type="submit" className="px-5 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Thêm sản phẩm</button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
