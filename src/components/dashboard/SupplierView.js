// src/components/dashboard/SupplierView.js
'use client';

import React, { useState, useRef } from 'react'; // Thêm useRef

// --- Dữ liệu giả ---
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
  { id: 10, name: 'Martin', product: 'Saffola', contact: '9867545457', email: 'martin@gmail.com', type: 'Taking Return', onTheWay: null },
  { id: 11, name: 'Joe Nike', product: 'Good day', contact: '9567545769', email: 'joenike@gmail.com', type: 'Taking Return', onTheWay: null },
  { id: 12, name: 'Dender Luke', product: 'Apple', contact: '9667545980', email: 'dender@gmail.com', type: 'Not Taking Return', onTheWay: 7 },
  { id: 13, name: 'Joe Nike', product: 'Good day', contact: '9567545769', email: 'joenike@gmail.com', type: 'Taking Return', onTheWay: null },
  { id: 14, name: 'Joe Nike', product: 'Good day', contact: '9567545769', email: 'joenike@gmail.com', type: 'Taking Return', onTheWay: null },
];
// --- Kết thúc dữ liệu giả ---

// Giả sử có danh sách loại sản phẩm
const productTypes = ["Electronics", "Clothing", "Groceries", "Home Goods", "Toys"];

const SupplierView = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // State cho form thêm mới
  const [newSupplierName, setNewSupplierName] = useState('');
  const [newProduct, setNewProduct] = useState('');
  const [newProductType, setNewProductType] = useState('');
  const [newPurchasePrice, setNewPurchasePrice] = useState('');
  const [newContactNumber, setNewContactNumber] = useState('');
  const [newSupplierType, setNewSupplierType] = useState('Not taking return'); // Giá trị mặc định
  const [newImage, setNewImage] = useState(null);
  const fileInputRef = useRef(null);

  // Logic phân trang cơ bản
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSuppliers = mockSuppliers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(mockSuppliers.length / itemsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : totalPages));
  };

  // Xử lý tải ảnh
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Xử lý submit form (tạm thời chỉ đóng modal)
  const handleAddSupplierSubmit = (e) => {
    e.preventDefault(); // Ngăn form submit mặc định
    // *** Logic gọi API thêm nhà cung cấp sẽ ở đây ***
    console.log("Adding supplier:", {
      name: newSupplierName,
      product: newProduct,
      productType: newProductType,
      purchasePrice: newPurchasePrice,
      contact: newContactNumber,
      type: newSupplierType,
      image: newImage ? 'Image selected' : 'No image'
    });
    // Reset form và đóng modal
    setNewSupplierName('');
    setNewProduct('');
    setNewProductType('');
    setNewPurchasePrice('');
    setNewContactNumber('');
    setNewSupplierType('Not taking return');
    setNewImage(null);
    if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Reset file input
    }
    setShowAddModal(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen relative"> {/* Thêm relative */}
      {/* Header: Title and Buttons */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Nhà cung cấp</h1>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowAddModal(true)} // Mở modal khi click
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            <i className="fas fa-plus mr-2"></i>Add Supplier
          </button>
          <button className="px-4 py-2 bg-white border border-gray-300 text-black rounded hover:bg-gray-100 transition">
            <i className="fas fa-filter mr-2"></i>Filters
          </button>
          <button className="px-4 py-2 bg-white border border-gray-300 text-black rounded hover:bg-gray-100 transition">
            <i className="fas fa-download mr-2"></i>Tải xuống
          </button>
        </div>
      </div>

      {/* Supplier Table */}
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
            {currentSuppliers.map((supplier) => (
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

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-white border border-gray-300 text-black rounded hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Trước
        </button>
        <span className="text-sm text-gray-700">
          Trang {currentPage} trong {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-white border border-gray-300 text-black rounded hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Sau
        </button>
      </div>

      {/* Add Supplier Modal */}
      {showAddModal && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm" 
            onClick={() => setShowAddModal(false)} // Đóng modal khi click overlay
          ></div>
          
          {/* Modal Content */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">New Supplier</h2>
              
              <form onSubmit={handleAddSupplierSubmit}>
                <div className="grid grid-cols-1 gap-4">
                  {/* Image Upload */}
                  <div className="flex flex-col items-center mb-4">
                    <div 
                      className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center cursor-pointer bg-gray-50 mb-2 text-center text-xs text-gray-500"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {newImage ? (
                        <img src={newImage} alt="Preview" className="w-full h-full object-cover rounded-full" />
                      ) : (
                        <span>Thả ảnh vào đây<br/>hoặc<br/><span className='text-blue-500 underline'>Tải ảnh lên</span></span>
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

                  {/* Form Fields */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Supplier Name</label>
                    <input 
                      type="text" 
                      value={newSupplierName}
                      onChange={(e) => setNewSupplierName(e.target.value)}
                      placeholder="Enter supplier name"
                      required
                      className="w-full border border-gray-300 rounded px-3 py-2 text-black bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product</label>
                    <input 
                      type="text" 
                      value={newProduct}
                      onChange={(e) => setNewProduct(e.target.value)}
                      placeholder="Enter product"
                      required
                      className="w-full border border-gray-300 rounded px-3 py-2 text-black bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Loại sản phẩm</label>
                    <select 
                      value={newProductType}
                      onChange={(e) => setNewProductType(e.target.value)}
                      required
                      className="w-full border border-gray-300 rounded px-3 py-2 text-black bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="" disabled>Chọn loại sản phẩm</option>
                      {productTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Giá nhập</label>
                    <input 
                      type="number" // Hoặc text nếu cần đơn vị tiền tệ
                      value={newPurchasePrice}
                      onChange={(e) => setNewPurchasePrice(e.target.value)}
                      placeholder="Nhập giá nhập"
                      required
                      className="w-full border border-gray-300 rounded px-3 py-2 text-black bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                    <input 
                      type="tel" 
                      value={newContactNumber}
                      onChange={(e) => setNewContactNumber(e.target.value)}
                      placeholder="Enter supplier contact number"
                      required
                      className="w-full border border-gray-300 rounded px-3 py-2 text-black bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <div className="flex gap-4">
                      <button 
                        type="button"
                        onClick={() => setNewSupplierType('Not taking return')}
                        className={`px-4 py-2 rounded border ${newSupplierType === 'Not taking return' ? 'bg-red-100 text-red-700 border-red-300' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                      >
                        Not taking return
                      </button>
                      <button 
                        type="button"
                        onClick={() => setNewSupplierType('Taking Return')}
                        className={`px-4 py-2 rounded border ${newSupplierType === 'Taking Return' ? 'bg-green-100 text-green-700 border-green-300' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                      >
                        Taking return
                      </button>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 mt-6">
                  <button 
                    type="button" 
                    onClick={() => setShowAddModal(false)} 
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
        </>
      )}
    </div>
  );
};

export default SupplierView;