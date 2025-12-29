import { supabaseServer } from '@/lib/supabase-server';
import { Product, Category } from '@/types';
import ProductCard from '@/components/ProductCard';
import CategoryCard from '@/components/CategoryCard';
import { Tag, TrendingUp, Clock, Sparkles } from 'lucide-react';

export const revalidate = 3600; // Revalidate every 1 hour

export default async function Home() {
  const supabase = supabaseServer();

  // Fetch featured products
  const { data: featuredProducts } = await supabase
    .from('products')
    .select(
      `
      *,
      category:categories(*)
    `
    )
    .eq('is_featured', true)
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(6);

  // Fetch all categories
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true });

  // Fetch latest deals
  const { data: latestDeals } = await supabase
    .from('products')
    .select(
      `
      *,
      category:categories(*)
    `
    )
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(8);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find the Best Deals & Discounts
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Save money on electronics, software, fashion, food, and more!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#featured"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Browse Featured Deals
              </a>
              <a
                href="/categories"
                className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors border-2 border-white"
              >
                View All Categories
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-8 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="flex items-center justify-center gap-2 text-blue-600 mb-1">
                <Tag className="w-6 h-6" />
                <span className="text-3xl font-bold">1000+</span>
              </div>
              <p className="text-gray-600">Active Deals</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 text-blue-600 mb-1">
                <Sparkles className="w-6 h-6" />
                <span className="text-3xl font-bold">50+</span>
              </div>
              <p className="text-gray-600">Categories</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 text-blue-600 mb-1">
                <TrendingUp className="w-6 h-6" />
                <span className="text-3xl font-bold">90%</span>
              </div>
              <p className="text-gray-600">Avg. Savings</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 text-blue-600 mb-1">
                <Clock className="w-6 h-6" />
                <span className="text-3xl font-bold">24/7</span>
              </div>
              <p className="text-gray-600">New Updates</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Browse by Category
            </h2>
            <p className="text-gray-600 text-lg">
              Find deals in your favorite categories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories?.map((category: Category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Deals */}
      <section id="featured" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Deals
            </h2>
            <p className="text-gray-600 text-lg">
              Hand-picked deals with the best savings
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts?.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Deals */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Latest Deals
            </h2>
            <p className="text-gray-600 text-lg">
              Fresh deals added just for you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestDeals?.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-8">
            <a
              href="/best-deals-today"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              View All Deals
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
