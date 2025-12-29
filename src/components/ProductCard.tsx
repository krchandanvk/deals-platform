"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Star } from "lucide-react";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const discountPercentage =
    product.original_price && product.discount_price
      ? Math.round(
          ((product.original_price - product.discount_price) /
            product.original_price) *
            100
        )
      : 0;

  const dealUrl =
    product.link_type === "affiliate"
      ? `/go/${product.id}`
      : product.link_url;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/product/${product.slug}`}>
        <div className="relative h-48 bg-gray-100">
          <Image
            src={product.image_url || "/images/placeholder.png"}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/images/placeholder.png";
            }}
          />

          {product.is_featured && (
            <span className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <Star className="w-3 h-3" />
              Featured
            </span>
          )}

          {discountPercentage > 0 && (
            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {discountPercentage}% OFF
            </span>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-semibold text-lg hover:text-blue-600 line-clamp-2">
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
              <span className="text-2xl font-bold">
                ₹{product.discount_price}
              </span>
              <span className="line-through text-gray-400">
                ₹{product.original_price}
              </span>
            </>
          ) : (
            <span className="text-2xl font-bold">
              ₹{product.original_price}
            </span>
          )}
        </div>

        <a
          href={dealUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded-lg flex items-center justify-center gap-2"
        >
          Get Deal <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
