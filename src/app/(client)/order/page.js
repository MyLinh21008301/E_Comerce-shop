"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { OrderContext } from "@/context/OrderContext";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import orderApi from "@/services/api/order";

export default function OrderPage() {
  const {
    cart,
    promotions,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    calculateSubtotal,
    calculateTotal,
    applyPromotion,
  } = useContext(OrderContext);
  const { authState } = useAuth();
  const router = useRouter();

  const [paymentMethod, setPaymentMethod] = useState("cod"); // Mặc định
  const [promoCode, setPromoCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Áp dụng mã khuyến mãi
  const handleApplyPromo = () => {
    if (promoCode === "GIAM10") {
      applyPromotion({ type: "percent", value: 10 });
    } else if (promoCode === "GIAM50K") {
      applyPromotion({ type: "fixed", value: 50000 });
    } else {
      alert("Mã khuyến mãi không hợp lệ!");
    }
  };

  // Xử lý thanh toán
  const handleCheckout = async () => {
    if (!authState.isAuthenticated) {
      alert("Vui lòng đăng nhập để thanh toán!");
      router.push("/login");
      return;
    }

    if (cart.length === 0) {
      alert("Giỏ hàng trống!");
      return;
    }

    setIsLoading(true);
    try {
      // Tạo đơn hàng
      const orderData = {
        customerId: authState.user.id, // Giả định authState.user có id
        items: cart.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount: calculateTotal(),
        paymentMethod,
        status: "pending",
      };
      const response = await orderApi.createOrder(orderData);
      const orderId = response.id; // Giả định response trả về orderId

      // Cập nhật trạng thái thành công
      await orderApi.handleOrderSuccess(orderId);

      // Chuyển hướng đến trang thành công
      router.push(`/order-success?orderId=${orderId}`);
    } catch (error) {
      console.error("Lỗi thanh toán:", error);
      alert("Đã xảy ra lỗi khi thanh toán: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-700 mb-6">Chi tiết đơn hàng</h1>

        {/* Danh sách sản phẩm */}
        <div className="bg-white rounded-sm p-6 shadow-md mb-6">
          <h2 className="text-lg font-medium text-gray-700 mb-4">Sản phẩm</h2>
          {cart.length === 0 ? (
            <p className="text-gray-500">Giỏ hàng trống</p>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b py-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image || "/images/product-placeholder.jpg"}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <h3 className="text-sm font-medium text-gray-700">{item.name}</h3>
                      <p className="text-red-500 font-bold">
                        {(item.price || 0).toLocaleString("vi-VN")} ₫
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="text-gray-500 hover:text-blue-500"
                      disabled={isLoading}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="text-gray-500 hover:text-blue-500"
                      disabled={isLoading}
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:underline"
                      disabled={isLoading}
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Khuyến mãi */}
        <div className="bg-white rounded-sm p-6 shadow-md mb-6">
          <h2 className="text-lg font-medium text-gray-700 mb-4">Khuyến mãi</h2>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Nhập mã khuyến mãi"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
            <button
              onClick={handleApplyPromo}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              disabled={isLoading}
            >
              Áp dụng
            </button>
          </div>
          {promotions && (
            <p className="mt-2 text-green-500">
              Đã áp dụng: {promotions.type === "percent"
                ? `Giảm ${promotions.value}%`
                : `Giảm ${promotions.value.toLocaleString("vi-VN")} ₫`}
            </p>
          )}
        </div>

        {/* Tổng tiền */}
        <div className="bg-white rounded-sm p-6 shadow-md mb-6">
          <h2 className="text-lg font-medium text-gray-700 mb-4">Tổng thanh toán</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Tạm tính:</span>
              <span>{calculateSubtotal().toLocaleString("vi-VN")} ₫</span>
            </div>
            {promotions && (
              <div className="flex justify-between text-green-500">
                <span>Khuyến mãi:</span>
                <span>
                  -{(calculateSubtotal() - calculateTotal()).toLocaleString("vi-VN")} ₫
                </span>
              </div>
            )}
            <div className="flex justify-between font-bold">
              <span>Tổng cộng:</span>
              <span>{calculateTotal().toLocaleString("vi-VN")} ₫</span>
            </div>
          </div>
        </div>

        {/* Phương thức thanh toán */}
        <div className="bg-white rounded-sm p-6 shadow-md">
          <h2 className="text-lg font-medium text-gray-700 mb-4">Phương thức thanh toán</h2>
          <div className="space-y-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="form-radio"
                disabled={isLoading}
              />
              <span>Thanh toán khi nhận hàng (COD)</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="momo"
                checked={paymentMethod === "momo"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="form-radio"
                disabled={isLoading}
              />
              <img
                src="/images/momo.png"
                alt="MoMo"
                className="w-6 h-6 object-contain"
              />
              <span>Thanh toán qua MoMo</span>
            </label>
          </div>
          <button
            onClick={handleCheckout}
            className="mt-6 w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600"
            disabled={cart.length === 0 || isLoading}
          >
            {isLoading ? "Đang xử lý..." : "Thanh toán"}
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}