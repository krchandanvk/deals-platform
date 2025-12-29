import { supabase } from '@/lib/supabase';
import { Product } from '@/types';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Clock, Tag, Share2 } from 'lucide-react';

export default async function ProductPage({ params }: { params: { slug: string } }) {
  // Fetch product details with category
  const { data: product } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(*)
    `)
    .eq('slug', params.slug)
    .eq('status', 'active')
    .single();

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Deal Not Found</h1>
          <p className="text-gray-600">The deal you're looking for doesn't exist or has expired.</p>
          <Link href="/" className="mt-4 inline-block text-blue-600 hover:underline">
            Browse All Deals
          </Link>
        </div>
      </div>
    );
  }

  const discountPercentage = product.original_price && product.discount_price
    ? Math.round(((product.original_price - product.discount_price) / product.original_price) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link
            href={product.category ? `/category/${product.category.slug}` : '/categories'}
            className="inline-flex items-center text-blue-600 hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to {product.category?.name || 'Categories'}
          </Link>
        </nav>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <span className="text-gray-400 text-xl">No image available</span>
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="flex flex-col">
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {product.is_featured && (
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                    ⭐ Featured Deal
                  </span>
                )}
                {discountPercentage > 0 && (
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                    {discountPercentage}% OFF
                  </span>
                )}
                {product.category && (
                  <Link
                    href={`/category/${product.category.slug}`}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-200"
                  >
                    {product.category.name}
                  </Link>
                )}
              </div>

              {/* Title */}
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.title}
              </h1>

              {/* Description */}
              {product.description && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                </div>
              )}

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-3">
                  {product.discount_price ? (
                    <>
                      <span className="text-4xl font-bold text-gray-900">
                        ${product.discount_price.toFixed(2)}
                      </span>
                      {product.original_price && (
                        <>
                          <span className="text-xl text-gray-500 line-through">
                            ${product.original_price.toFixed(2)}
                          </span>
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                            Save ${(product.original_price - product.discount_price).toFixed(2)}
                          </span>
                        </>
                      )}
                    </>
                  ) : product.original_price ? (
                    <span className="text-4xl font-bold text-gray-900">
                      ${product.original_price.toFixed(2)}
                    </span>
                  ) : (
                    <span className="text-4xl font-bold text-gray-900">
                      Free
                    </span>
                  )}
                </div>
              </div>

              {/* Deal Info */}
              <div className="mb-6 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Tag className="w-4 h-4" />
                  <span>Deal Type: {product.link_type === 'affiliate' ? 'Affiliate Deal' : 'Direct Buy'}</span>
                </div>
                {product.expiry_date && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>Expires: {new Date(product.expiry_date).toLocaleDateString()}</span>
                  </div>
                )}
              </div>

              {/* CTA Button */}
              <div className="mt-auto">
                <a
                  href={product.link_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors text-lg"
                >
                  {product.link_type === 'affiliate' ? 'Get This Deal' : 'Buy Now'}
                  <ExternalLink className="w-5 h-5" />
                </a>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  You will be redirected to our partner's website
                </p>
              </div>

              {/* Share Button */}
              <div className="mt-4 flex items-center justify-center gap-2">
                <Share2 className="w-4 h-4 text-gray-400" />
                <button className="text-blue-600 hover:underline text-sm">
                  Share this deal
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Deal Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Posted:</span>{' '}
              {new Date(product.created_at).toLocaleDateString()}
            </div>
            <div>
              <span className="font-medium text-gray-700">Last Updated:</span>{' '}
              {new Date(product.updated_at).toLocaleDateString()}
            </div>
            <div>
              <span className="font-medium text-gray-700">Status:</span>{' '}
              <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs">
                Active
              </span>
            </div>
            {product.category && (
              <div>
                <span className="font-medium text-gray-700">Category:</span>{' '}
                <Link href={`/category/${product.category.slug}`} className="text-blue-600 hover:underline">
                  {product.category.name}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}