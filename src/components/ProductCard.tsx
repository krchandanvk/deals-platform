import { Product } from '@/types';
import { ExternalLink, Star } from 'lucide-react';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const discountPercentage = product.original_price && product.discount_price
    ? Math.round(((product.original_price - product.discount_price) / product.original_price) * 100)
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link href={`/product/${product.slug}`}>
        <div className="relative h-48 bg-gray-100">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <span className="text-gray-400">No image</span>
            </div>
          )}
          {product.is_featured && (
            <div className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              <Star className="w-3 h-3" />
              Featured
            </div>
          )}
          {discountPercentage > 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              {discountPercentage}% OFF
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-semibold text-lg text-gray-900 hover:text-blue-600 transition-colors line-clamp-2">
            {product.title}
          </h3>
        </Link>

        {product.category && (
          <Link
            href={`/category/${product.category.slug}`}
            className="text-sm text-blue-600 hover:underline"
          >
            {product.category.name}
          </Link>
        )}

        <div className="mt-2 flex items-center gap-2">
          {product.discount_price ? (
            <>
              <span className="text-2xl font-bold text-gray-900">
                ${product.discount_price.toFixed(2)}
              </span>
              {product.original_price && (
                <span className="text-sm text-gray-500 line-through">
                  ${product.original_price.toFixed(2)}
                </span>
              )}
            </>
          ) : product.original_price ? (
            <span className="text-2xl font-bold text-gray-900">
              ${product.original_price.toFixed(2)}
            </span>
          ) : (
            <span className="text-2xl font-bold text-gray-900">
              Free
            </span>
          )}
        </div>

        <a
          href={product.link_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          {product.link_type === 'affiliate' ? 'Get Deal' : 'Buy Now'}
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}