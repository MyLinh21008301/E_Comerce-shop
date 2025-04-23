// Hàm tạo sản phẩm mẫu
export const generateProduct = (id) => ({
  id,
  name: `Tông đơ cắt tóc cao cấp T9 Pro ${id}`,
  price: Math.floor(Math.random() * (100000 - 40000) + 40000),
  oldPrice: Math.floor(Math.random() * (150000 - 100000) + 100000),
  discount: Math.floor(Math.random() * 70),
  sold: Math.floor(Math.random() * 1000),
  rating: 5.0,
  ratingCount: "3,5k",
  soldCount: "11,3k",
  images: [
    `https://picsum.photos/800/800?random=${id}_1`,
    `https://picsum.photos/800/800?random=${id}_2`,
    `https://picsum.photos/800/800?random=${id}_3`,
    `https://picsum.photos/800/800?random=${id}_4`,
    `https://picsum.photos/800/800?random=${id}_5`,
  ],
  colors: [
    "Đã nâng cấp Golden Panlong",
    "Đã nâng cấp Black Panlong",
    "Đã nâng cấp đồng Panlong"
  ],
  stock: 325,
  image: `https://picsum.photos/300/300?random=${id}`, // Ảnh thumbnail cho trang chủ
});

// Tạo danh sách sản phẩm mẫu
export const generateProducts = (pageNumber, pageSize = 24) => {
  return Array.from({ length: pageSize }, (_, index) => {
    const id = pageNumber * pageSize + index + 1;
    return generateProduct(id);
  });
}; 