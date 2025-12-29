export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  category_id: string;
  description?: string;
  image_url?: string;
  original_price?: number;
  discount_price?: number;
  link_url: string;
  link_type: 'affiliate' | 'buy';
  is_featured: boolean;
  status: 'active' | 'inactive' | 'expired';
  expiry_date?: string;
  created_at: string;
  updated_at: string;
  category?: Category;
}

export interface Click {
  id: string;
  product_id: string;
  clicked_at: string;
  source?: string;
  user_agent?: string;
  ip_address?: string;
}

export interface ProductWithCategory extends Product {
  category: Category;
}