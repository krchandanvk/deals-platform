-- Categories table
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  icon VARCHAR(50),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products table
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  description TEXT,
  image_url TEXT,
  original_price DECIMAL(10, 2),
  discount_price DECIMAL(10, 2),
  link_url TEXT NOT NULL,
  link_type VARCHAR(50) DEFAULT 'affiliate' CHECK (link_type IN ('affiliate', 'buy')),
  is_featured BOOLEAN DEFAULT FALSE,
  status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'expired')),
  expiry_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Clicks table for tracking
CREATE TABLE clicks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  clicked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  source VARCHAR(255),
  user_agent TEXT,
  ip_address VARCHAR(45)
);

-- Create indexes for better performance
CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_is_featured ON products(is_featured);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_clicks_product_id ON clicks(product_id);
CREATE INDEX idx_clicks_clicked_at ON clicks(clicked_at);
CREATE INDEX idx_categories_slug ON categories(slug);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE clicks ENABLE ROW LEVEL SECURITY;

-- Create policies (you can adjust these based on your security requirements)
-- Categories policies
CREATE POLICY "Public read access for categories" ON categories
  FOR SELECT USING (true);

CREATE POLICY "Admin insert access for categories" ON categories
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin update access for categories" ON categories
  FOR UPDATE USING (true);

CREATE POLICY "Admin delete access for categories" ON categories
  FOR DELETE USING (true);

-- Products policies
CREATE POLICY "Public read access for products" ON products
  FOR SELECT USING (status = 'active');

CREATE POLICY "Admin insert access for products" ON products
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin update access for products" ON products
  FOR UPDATE USING (true);

CREATE POLICY "Admin delete access for products" ON products
  FOR DELETE USING (true);

-- Clicks policies
CREATE POLICY "Public insert access for clicks" ON clicks
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin read access for clicks" ON clicks
  FOR SELECT USING (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers to automatically update updated_at
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample categories
INSERT INTO categories (name, slug, icon, description) VALUES
('Electronics', 'electronics', 'laptop', 'Latest gadgets, smartphones, laptops and tech accessories'),
('Software', 'software', 'code', 'Productivity tools, development software, and digital solutions'),
('Digital Tools', 'digital-tools', 'tool', 'AI tools, hosting, marketing tools, and online services'),
('Fashion', 'fashion', 'shirt', 'Clothing, shoes, accessories and fashion trends'),
('Food', 'food', 'utensils', 'Food delivery, meal kits, restaurants and culinary experiences'),
('Services', 'services', 'briefcase', 'Courses, insurance, consulting and professional services');

-- Insert sample products
INSERT INTO products (title, slug, category_id, description, image_url, original_price, discount_price, link_url, link_type, is_featured, status) VALUES
('iPhone 15 Pro Max', 'iphone-15-pro-max', (SELECT id FROM categories WHERE slug = 'electronics'), 'The most powerful iPhone ever with A17 Pro chip, titanium design, and advanced camera system', 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500', 1199.00, 1049.00, 'https://amazon.com/iphone15', 'affiliate', true, 'active'),
('Canva Pro', 'canva-pro', (SELECT id FROM categories WHERE slug = 'software'), 'Professional design tool for creating stunning graphics, presentations, and social media content', 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500', 14.99, 12.99, 'https://canva.com/pro', 'affiliate', true, 'active'),
('ChatGPT Plus', 'chatgpt-plus', (SELECT id FROM categories WHERE slug = 'digital-tools'), 'Advanced AI assistant with GPT-4, faster response times, and priority access', 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500', 20.00, 20.00, 'https://chat.openai.com/plus', 'buy', true, 'active'),
('Nike Air Max', 'nike-air-max', (SELECT id FROM categories WHERE slug = 'fashion'), 'Comfortable running shoes with Air Max cushioning technology', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500', 150.00, 120.00, 'https://nike.com/airmax', 'affiliate', false, 'active'),
('HelloFresh', 'hellofresh', (SELECT id FROM categories WHERE slug = 'food'), 'Meal kit delivery service with fresh ingredients and easy recipes', 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500', 69.99, 59.99, 'https://hellofresh.com', 'affiliate', false, 'active'),
('Udemy Pro', 'udemy-pro', (SELECT id FROM categories WHERE slug = 'services'), 'Unlimited access to thousands of online courses and learning paths', 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500', 29.99, 19.99, 'https://udemy.com/pro', 'affiliate', false, 'active');