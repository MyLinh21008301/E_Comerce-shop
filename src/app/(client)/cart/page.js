"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { OrderContext } from "@/context/OrderContext";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function CartPage() {
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

  const [selectAll, setSelectAll] = useState(false);
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

  // Chuyển đến trang thanh toán
  const handleCheckout = () => {
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
      router.push("/order");
    } catch (error) {
      console.error("Lỗi chuyển trang:", error);
      alert("Đã xảy ra lỗi khi chuyển đến trang thanh toán.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-4">
          <h1 className="text-2xl font-bold text-orange-500">Giỏ hàng</h1>
        </div>

        <div className="bg-white rounded-sm shadow-md p-4">
          <label className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={(e) => setSelectAll(e.target.checked)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2 text-gray-700">Chọn tất cả ({cart.length})</span>
          </label>

          {cart.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Giỏ hàng trống</p>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b py-4"
                >
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={(e) => {}}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <img
                      src={item.image || "/images/product-placeholder.jpg"}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <h3 className="text-sm font-medium text-gray-700">{item.name}</h3>
                      <p className="text-gray-500 line-through">
                        {item.originalPrice?.toLocaleString("vi-VN") || "0"} ₫
                      </p>
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
                    <p className="text-red-500 font-bold">
                      {(item.price * item.quantity).toLocaleString("vi-VN")} ₫
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:underline"
                      disabled={isLoading}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tổng tiền */}
          <div className="mt-4 p-4 border-t">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Tổng tiền:</span>
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
              <div className="flex justify-between font-bold text-lg">
                <span>Thanh toán:</span>
                <span>{calculateTotal().toLocaleString("vi-VN")} ₫</span>
              </div>
            </div>
          </div>

          {/* Nút Mua hàng */}
          <button
            onClick={handleCheckout}
            className="mt-6 w-full bg-orange-500 text-white py-3 rounded-md hover:bg-orange-600 font-bold"
            disabled={cart.length === 0 || isLoading}
          >
            {isLoading ? "Đang xử lý..." : "Mua hàng"}
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}