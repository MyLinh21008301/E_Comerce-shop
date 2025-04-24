export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice: number;
  discount: number;
  sold: number;
  rating: number;
  ratingCount: number;
  image: string;
  images: string[];
  colors: string[];
  sizes: string[];
  stock: number;
  description: string;
}

export interface ProductResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
} 