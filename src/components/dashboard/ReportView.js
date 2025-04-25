// src/components/dashboard/ReportView.js
import React from 'react';

// Placeholder data - replace with actual data fetching later
const overviewData = {
  totalProfit: '₫21,190',
  revenue: '₫18,300',
  sales: '₫17,432',
  netPurchaseValue: '₫1,17,432',
  netSalesValue: '₫80,432',
  momProfit: '₫30,432',
  yoyProfit: '₫1,10,432',
};

const topProductTypes = [
  { name: 'Vegetable', turnover: '₫26,000', growth: '3.2%' },
  { name: 'Instant Food', turnover: '₫22,000', growth: '2%' },
  { name: 'Households', turnover: '₫22,000', growth: '1.5%' },
];

const topProducts = [
  { name: 'Áo thun', id: '23567', type: 'Thời trang', remaining: '225 kg', turnover: '₫17,000', increase: '2.3%' },
  { name: 'Áo sơ mi', id: '25831', type: 'Thời trang', remaining: '200 kg', turnover: '₫12,000', increase: '1.3%' },
  { name: 'Áo khoác', id: '56841', type: 'Thời trang', remaining: '200 Packet', turnover: '₫10,000', increase: '1.3%' },
  { name: 'Mũ', id: '23567', type: 'Thời trang', remaining: '125 Packet', turnover: '₫9,000', increase: '1%' },
];

const ReportView = () => {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Overview Section */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Tổng quan</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-sm text-gray-500">Tổng Lợi nhuận</p>
            <p className="text-xl font-bold text-gray-800">{overviewData.totalProfit}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Doanh thu</p>
            <p className="text-xl font-bold text-blue-600">{overviewData.revenue}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Sales</p>
            <p className="text-xl font-bold text-gray-800">{overviewData.sales}</p>
          </div>
          <div>
            {/* Placeholder for potential 4th item or adjust grid cols */}
          </div>
          <div>
            <p className="text-sm text-gray-500">Net purchase value</p>
            <p className="text-xl font-bold text-gray-800">{overviewData.netPurchaseValue}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Net sales value</p>
            <p className="text-xl font-bold text-gray-800">{overviewData.netSalesValue}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">MoM Profit</p>
            <p className="text-xl font-bold text-gray-800">{overviewData.momProfit}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">YoY Profit</p>
            <p className="text-xl font-bold text-gray-800">{overviewData.yoyProfit}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Product Types Section */}
        <div className="lg:col-span-1 bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Loại sản phẩm bán chạy nhất</h2>
            <a href="#" className="text-sm text-blue-600 hover:underline">Xem tất cả</a>
          </div>
          <table className="w-full text-sm text-left text-gray-600">
            <thead>
              <tr className="border-b">
                <th className="py-2">Loại sản phẩm</th>
                <th className="py-2 text-right">Turn Over</th>
                <th className="py-2 text-right">Tăng trưởng</th>
              </tr>
            </thead>
            <tbody>
              {topProductTypes.map((item, index) => (
                <tr key={index} className="border-b last:border-b-0">
                  <td className="py-2">{item.name}</td>
                  <td className="py-2 text-right">{item.turnover}</td>
                  <td className={`py-2 text-right ${parseFloat(item.growth) > 0 ? 'text-green-600' : 'text-red-600'}`}>{item.growth}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Profit & Revenue Chart Section */}
        <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Lợi nhuận & Doanh thu</h2>
            <button className="text-sm border rounded px-2 py-1 hover:bg-gray-100">Weekly</button>
          </div>
          {/* Chart Placeholder */}
          <div className="h-64 bg-gray-100 flex items-center justify-center rounded">
            <p className="text-gray-500">Biểu đồ Lợi nhuận & Doanh thu (Cần tích hợp thư viện biểu đồ)</p>
            {/* TODO: Integrate a chart library like Chart.js or Recharts here */}
          </div>
           <div className="flex justify-center items-center space-x-4 mt-4 text-sm">
              <span className="flex items-center"><span className="w-3 h-3 bg-blue-500 rounded-full mr-1"></span>Doanh thu</span>
              <span className="flex items-center"><span className="w-3 h-3 bg-orange-300 rounded-full mr-1"></span>Lợi nhuận</span>
          </div>
        </div>
      </div>

      {/* Top Selling Products Section */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">Sản phẩm bán chạy nhất</h2>
          <a href="#" className="text-sm text-blue-600 hover:underline">Xem tất cả</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="bg-gray-50">
              <tr className="border-b">
                <th className="py-2 px-3">Product</th>
                <th className="py-2 px-3">Mã sản phẩm</th>
                <th className="py-2 px-3">Loại sản phẩm</th>
                <th className="py-2 px-3 text-right">Số lượng còn lại</th>
                <th className="py-2 px-3 text-right">Turn Over</th>
                <th className="py-2 px-3 text-right">Increase By</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product, index) => (
                <tr key={index} className="border-b last:border-b-0 hover:bg-gray-50">
                  <td className="py-2 px-3">{product.name}</td>
                  <td className="py-2 px-3">{product.id}</td>
                  <td className="py-2 px-3">{product.type}</td>
                  <td className="py-2 px-3 text-right">{product.remaining}</td>
                  <td className="py-2 px-3 text-right">{product.turnover}</td>
                  <td className={`py-2 px-3 text-right ${parseFloat(product.increase) > 0 ? 'text-green-600' : 'text-red-600'}`}>{product.increase}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportView;
