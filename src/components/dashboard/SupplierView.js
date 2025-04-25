"use client";

import React, { useState, useRef } from 'react';

const mockSuppliers = [
  { id: 1, name: 'Richard Martin', product: 'Kit Kat', contact: '7687764556', email: 'richard@gmail.com', type: 'Taking Return', onTheWay: 13 },
  { id: 2, name: 'Tom Homan', product: 'Maaza', contact: '9867545368', email: 'tomhoman@gmail.com', type: 'Taking Return', onTheWay: null },
  { id: 3, name: 'Veandir', product: 'Dairy Milk', contact: '9867545566', email: 'veandier@gmail.com', type: 'Not Taking Return', onTheWay: null },
  { id: 4, name: 'Charin', product: 'Tomato', contact: '9267545457', email: 'charin@gmail.com', type: 'Taking Return', onTheWay: 12 },
  { id: 5, name: 'Hoffman', product: 'Milk Bikis', contact: '9367546531', email: 'hoffman@gmail.com', type: 'Taking Return', onTheWay: null },
  { id: 6, name: 'Fainden Juke', product: 'Marie Gold', contact: '9667545982', email: 'fainden@gmail.com', type: 'Not Taking Return', onTheWay: 9 },
  { id: 7, name: 'Martin', product: 'Saffola', contact: '9867545457', email: 'martin@gmail.com', type: 'Taking Return', onTheWay: null },
  { id: 8, name: 'Joe Nike', product: 'Good day', contact: '9567545769', email: 'joenike@gmail.com', type: 'Taking Return', onTheWay: null },
  { id: 9, name: 'Dender Luke', product: 'Apple', contact: '9667545980', email: 'dender@gmail.com', type: 'Taking Return', onTheWay: 7 },
];

const SupplierView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const fileInputRef = useRef(null);
  const [newSupplier, setNewSupplier] = useState({
    name: '',
    product: '',
    productType: '',
    purchasePrice: '',
    contactNumber: '',
    type: 'Not taking return',
    image: null,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewSupplier((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSupplierSubmit = (e) => {
    e.preventDefault();
    console.log('Adding supplier:', newSupplier);
    setShowModal(false);
    setNewSupplier({
      name: '',
      product: '',
      productType: '',
      purchasePrice: '',
      contactNumber: '',
      type: 'Not taking return',
      image: null,
    });
  };

  const filteredSuppliers = mockSuppliers.filter((supplier) =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`p-6 bg-gray-50 min-h-screen ${showModal ? 'opacity-60' : ''}`}>
      

      {/* Search Bar with Buttons */}
      <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Nhà cung cấp</h1>
        <div className="flex gap-2">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            onClick={() => setShowModal(true)}
          >
            Thêm nhà cung cấp
          </button>
          <button
            className="px-4 py-2 bg-white border border-gray-300 text-black rounded hover:bg-gray-100 transition"
            onClick={() => alert('Hiển thị bộ lọc')}
          >
            Filters
          </button>
          <button
            className="px-4 py-2 bg-white border border-gray-300 text-black rounded hover:bg-gray-100 transition"
            onClick={() => alert('Tải xuống dữ liệu')}
          >
            Tải xuống
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 font-medium text-gray-600">Supplier Name</th>
              <th className="px-4 py-3 font-medium text-gray-600">Product</th>
              <th className="px-4 py-3 font-medium text-gray-600">Contact Number</th>
              <th className="px-4 py-3 font-medium text-gray-600">Email</th>
              <th className="px-4 py-3 font-medium text-gray-600">Type</th>
              <th className="px-4 py-3 font-medium text-gray-600">On the way</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredSuppliers.map((supplier) => (
              <tr key={supplier.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-800">{supplier.name}</td>
                <td className="px-4 py-3 text-gray-800">{supplier.product}</td>
                <td className="px-4 py-3 text-gray-800">{supplier.contact}</td>
                <td className="px-4 py-3 text-gray-800">{supplier.email}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    supplier.type === 'Taking Return'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {supplier.type}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-800">{supplier.onTheWay ?? '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button className="px-4 py-2 bg-white border border-gray-300 text-black rounded hover:bg-gray-100 transition">
          Trước
        </button>
        <span className="text-sm text-gray-700">Trang 1 trong 10</span>
        <button className="px-4 py-2 bg-white border border-gray-300 text-black rounded hover:bg-gray-100 transition">
          Sau
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">New Supplier</h2>
            <form onSubmit={handleAddSupplierSubmit}>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex flex-col items-center mb-4">
                  <div
                    className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center cursor-pointer bg-gray-50 mb-2 text-center text-xs text-black"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {newSupplier.image ? (
                      <img src={newSupplier.image} alt="Preview" className="w-full h-full object-cover rounded-full" />
                    ) : (
                      <span>Thả ảnh vào đây<br />hoặc<br /><span className="text-blue-500 underline">Tải ảnh lên</span></span>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-1">Supplier Name</label>
                  <input
                    type="text"
                    value={newSupplier.name}
                    onChange={(e) => setNewSupplier((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter supplier name"
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 text-black bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-1">Product</label>
                  <input
                    type="text"
                    value={newSupplier.product}
                    onChange={(e) => setNewSupplier((prev) => ({ ...prev, product: e.target.value }))}
                    placeholder="Enter product"
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 text-black bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-1">Loại sản phẩm</label>
                  <select
                    value={newSupplier.productType}
                    onChange={(e) => setNewSupplier((prev) => ({ ...prev, productType: e.target.value }))}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 text-black bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="" disabled>Chọn loại sản phẩm</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Groceries">Groceries</option>
                    <option value="Home Goods">Home Goods</option>
                    <option value="Toys">Toys</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-1">Giá nhập</label>
                  <input
                    type="number"
                    value={newSupplier.purchasePrice}
                    onChange={(e) => setNewSupplier((prev) => ({ ...prev, purchasePrice: e.target.value }))}
                    placeholder="Nhập giá nhập"
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 text-black bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-1">Contact Number</label>
                  <input
                    type="tel"
                    value={newSupplier.contactNumber}
                    onChange={(e) => setNewSupplier((prev) => ({ ...prev, contactNumber: e.target.value }))}
                    placeholder="Enter supplier contact number"
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 text-black bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-1">Type</label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setNewSupplier((prev) => ({ ...prev, type: 'Not taking return' }))}
                      className={`px-4 py-2 rounded border ${newSupplier.type === 'Not taking return' ? 'bg-red-100 text-red-700 border-red-300' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                    >
                      Not taking return
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewSupplier((prev) => ({ ...prev, type: 'Taking Return' }))}
                      className={`px-4 py-2 rounded border ${newSupplier.type === 'Taking Return' ? 'bg-green-100 text-green-700 border-green-300' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                    >
                      Taking return
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                >
                  Add Supplier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplierView;