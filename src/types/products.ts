export interface Product {
  id: string;
  name: string;
  name_es?: string;
  name_en?: string;
  slug: string;
  price: number;
  description: string[];
  description_es?: string[];
  description_en?: string[];
  image: string;
  featured?: boolean;
  custom?: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  slug?: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  customPrice?: boolean;
}