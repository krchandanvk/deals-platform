import { supabase } from '@/lib/supabase';
import { Product } from '@/types';
import ProductCard from '@/components/ProductCard';
import { TrendingUp, Filter, SortDesc } from 'lucide-react';

export default async function BestDealsTodayPage() {
  // Fetch all active products, ordered by discount percentage
  const { data: products } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(*)
    `)
    .eq('status', 'active')
    .order('created_at', { ascending: false });

  // Calculate discount percentage and sort
  const productsWithDiscount = products?.map((product: Product) => {
    const discountPercentage = product.original_price && product.discount_price
      ? Math.round(((product.original_price - product.discount_price) / product.original_price) * 100)
      : 0;
    return { ...product, discountPercentage };
  }).sort((a, b) => b.discountPercentage - a.discountPercentage) || [];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full mb-4">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Best Deals Today
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the hottest deals with the biggest discounts, handpicked for maximum savings
          </p>
        </div>

        {/* Filters Bar */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">
              Showing {productsWithDiscount.length} deals
            </span>
          </div>
          <div className="flex items-center gap-2">
            <SortDesc className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-600">
              Sorted by: Best Discount
            </span>
          </div>
        </div>

        {/* Products Grid */}
        {productsWithDiscount.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {productsWithDiscount.map((product: Product & { discountPercentage: number }) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-16 text-center">
            <p className="text-gray-500 text-lg mb-4">No deals available at the moment.</p>
            <p className="text-gray-400">Check back later for new deals!</p>
          </div>
        )}

        {/* CTA Section */}
        {productsWithDiscount.length > 0 && (
          <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Don't Miss Out on These Deals!
            </h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Act fast! These deals are available for a limited time and may expire soon.
              Bookmarked your favorites and check back daily for new offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#featured"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Scroll to Top
              </a>
              <a
                href="/categories"
                className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors border-2 border-white"
              >
                Browse by Category
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}