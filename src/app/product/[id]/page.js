"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getProduct } from '@/data/mockData';

export default function ProductDetail({ params }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    const productData = getProduct(params.id);
    setProduct(productData);
    if (productData) {
      setSelectedColor(productData.colors[0]);
      if (productData.sizes) {
        setSelectedSize(productData.sizes[0]);
      }
    }
  }, [params.id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-black">Đang tải...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white py-2">
        <div className="container mx-auto px-4">
          <div className="text-sm">
            <Link href="/" className="text-[#0055AA] hover:opacity-80">Shopee</Link>
            <span className="mx-1">›</span>
            <Link href="/category/thoi-trang" className="text-[#0055AA] hover:opacity-80">Thời Trang</Link>
            <span className="mx-1">›</span>
            <span className="text-black">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Detail */}
      <div className="container mx-auto px-4 py-4">
        <div className="bg-white p-4 rounded shadow-sm">
          <div className="grid grid-cols-12 gap-8">
            {/* Left: Product Images */}
            <div className="col-span-5">
              <div className="aspect-square relative">
                <img 
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-sm"
                />
              </div>
              <div className="grid grid-cols-5 gap-2 mt-4">
                {product.images.map((img, index) => (
                  <div 
                    key={index} 
                    className={`aspect-square border hover:border-[#ee4d2d] cursor-pointer ${
                      selectedImage === index ? 'border-[#ee4d2d]' : 'border-gray-200'
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img 
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-4 mt-4 border-t pt-4">
                <span className="text-black">Chia sẻ:</span>
                <div className="flex gap-2">
                  <button className="w-8 h-8 rounded-full bg-[#3b5998] text-white flex items-center justify-center">
                    <i className="fab fa-facebook-f"></i>
                  </button>
                  <button className="w-8 h-8 rounded-full bg-[#1da1f2] text-white flex items-center justify-center">
                    <i className="fab fa-twitter"></i>
                  </button>
                  <button className="w-8 h-8 rounded-full bg-[#e60023] text-white flex items-center justify-center">
                    <i className="fab fa-pinterest"></i>
                  </button>
                </div>
                <button className="ml-auto flex items-center gap-2 text-[#ee4d2d]">
                  <i className="far fa-heart"></i>
                  <span className="text-black">Đã thích (21)</span>
                </button>
              </div>
            </div>

            {/* Right: Product Info */}
            <div className="col-span-7">
              <div className="flex items-center gap-2">
                <span className="text-white bg-[#ee4d2d] px-1 text-xs">Yêu thích</span>
                <h1 className="text-xl font-bold text-black">{product.name}</h1>
              </div>

              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-1">
                  <span className="text-[#ee4d2d] text-lg">{product.rating}</span>
                  <div className="flex text-[#ee4d2d]">
                    {Array(5).fill(0).map((_, i) => (
                      <i key={i} className={`fas fa-star ${i < Math.floor(product.rating) ? 'text-[#ee4d2d]' : 'text-gray-300'}`}></i>
                    ))}
                  </div>
                </div>
                <div className="border-l border-gray-300 pl-4">
                  <span className="text-black">{product.ratingCount}</span>
                  <span className="text-black ml-1">Đánh Giá</span>
                </div>
                <div className="border-l border-gray-300 pl-4">
                  <span className="text-black">{product.sold.toLocaleString()}</span>
                  <span className="text-black ml-1">Đã bán</span>
                </div>
                <button className="ml-auto text-sm text-gray-500 hover:text-[#ee4d2d]">
                  Tố cáo
                </button>
              </div>

              <div className="bg-gray-50 p-4 mt-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-black line-through">₫{product.oldPrice.toLocaleString()}</span>
                  <span className="text-[#ee4d2d] text-3xl">₫{product.price.toLocaleString()}</span>
                  <span className="bg-[#ee4d2d] text-white px-1 text-xs">{product.discount}% GIẢM</span>
                </div>
              </div>

              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-4">
                  <span className="text-black w-24">Combo Khuyến Mãi</span>
                  <span className="text-[#ee4d2d] border border-[#ee4d2d] px-2 py-1 text-sm">
                    Mua 2 & giảm 1%
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-black w-24">Vận Chuyển</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <i className="fas fa-truck text-[#00bfa5]"></i>
                      <span className="text-black">Miễn phí vận chuyển</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <i className="fas fa-clock text-[#00bfa5]"></i>
                      <span className="text-black">Nhận vào 28 Th04</span>
                    </div>
                    <span className="text-gray-500 text-sm block mt-1">
                      Tặng Voucher ₫15.000 đơn giao sau thời gian trên
                    </span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="text-black w-24">Màu Sắc</span>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color, index) => (
                      <button
                        key={index}
                        className={`px-4 py-2 border rounded ${
                          selectedColor === color 
                            ? 'border-[#ee4d2d] text-[#ee4d2d]' 
                            : 'border-gray-300 hover:border-[#ee4d2d]'
                        }`}
                        onClick={() => setSelectedColor(color)}
                      >
                        <span className="text-black">{color}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {product.sizes && (
                  <div className="flex gap-4">
                    <span className="text-black w-24">Kích Thước</span>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size, index) => (
                        <button
                          key={index}
                          className={`px-4 py-2 border rounded ${
                            selectedSize === size 
                              ? 'border-[#ee4d2d] text-[#ee4d2d]' 
                              : 'border-gray-300 hover:border-[#ee4d2d]'
                          }`}
                          onClick={() => setSelectedSize(size)}
                        >
                          <span className="text-black">{size}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-4">
                  <span className="text-black w-24">Số Lượng</span>
                  <div className="flex items-center">
                    <button
                      className="w-8 h-8 border border-[#ee4d2d] text-[#ee4d2d] flex items-center justify-center hover:bg-[#fef6f5]"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="w-16 h-8 border-t border-b border-[#ee4d2d] text-center text-[#ee4d2d]"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    />
                    <button
                      className="w-8 h-8 border border-[#ee4d2d] text-[#ee4d2d] flex items-center justify-center hover:bg-[#fef6f5]"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </button>
                    <span className="ml-4 text-black">{product.stock} sản phẩm có sẵn</span>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button className="flex-1 px-4 py-3 border border-[#ee4d2d] text-[#ee4d2d] flex items-center justify-center gap-2 hover:bg-[#fef6f5]">
                    <i className="fas fa-cart-plus"></i>
                    Thêm Vào Giỏ Hàng
                  </button>
                  <button className="flex-1 px-4 py-3 bg-[#ee4d2d] text-white hover:bg-[#d73211]">
                    Mua Ngay
                  </button>
                </div>
              </div>

              {product.description && (
                <div className="mt-8 pt-8 border-t">
                  <h2 className="text-black text-lg font-medium mb-4">Mô tả sản phẩm</h2>
                  <p className="text-black whitespace-pre-line">{product.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}