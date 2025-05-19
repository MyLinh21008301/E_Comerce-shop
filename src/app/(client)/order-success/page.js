"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import orderApi from "@/services/api/order";

export default function OrderSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const orderId = searchParams.get("orderId");

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId) {
        setError("Không tìm thấy mã đơn hàng!");
        setLoading(false);
        return;
      }

      try {
        const data = await orderApi.getOrder(orderId);
        setOrder(data);
      } catch (err) {
        setError("Không thể tải thông tin đơn hàng: " + err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) return <div className="text-center py-10">Đang tải...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!order) return null;

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg p-6 shadow-md text-center">
          <h1 className="text-3xl font-bold text-green-600 mb-4">Đặt hàng thành công!</h1>
          <p className="text-gray-700 mb-6">
            Cảm ơn bạn đã đặt hàng. Mã đơn hàng của bạn là: <strong>{order.id}</strong>
          </p>

          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-700 mb-2">Thông tin đơn hàng</h2>
            <p>
              <strong>Tổng tiền:</strong> {order.totalAmount.toLocaleString("vi-VN")} ₫
            </p>
            <p>
              <strong>Phương thức thanh toán:</strong>{" "}
              {order.paymentMethod === "cod" ? "Thanh toán khi nhận hàng" : "Thanh toán qua MoMo"}
            </p>
            <p>
              <strong>Trạng thái:</strong> {order.status}
            </p>
          </div>

          <div className="space-x-4">
            <button
              onClick={() => router.push("/")}
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
            >
              Về trang chủ
            </button>
            <button
              onClick={() => router.push(`/order/${order.id}`)}
              className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600"
            >
              Xem chi tiết
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}