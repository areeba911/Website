export interface Product {
  id: string;
  name: string;
  origin: string;
  category: 'light' | 'medium' | 'dark';
  price: number;
  weight: string;
  roastLevel: number; // 1-5
  flavorNotes: string[];
  description: string;
  image: string;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type ViewMode = 'shop' | 'detail' | 'cart' | 'checkout' | 'confirmation';
