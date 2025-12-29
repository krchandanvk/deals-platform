import { supabaseServer } from "@/lib/supabase-server";
import { Product } from "@/types";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Clock, Tag } from "lucide-react";

export const revalidate = 3600;

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = supabaseServer();

  const { data: product } = await supabase
    .from("products")
    .select(
      `
      *,
      category:categories(*)
    `
    )
    .eq("slug", params.slug)
    .eq("status", "active")
    .single();

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Deal Not Found</h1>
          <Link href="/" className="text-blue-600 hover:underline">
            Browse Deals
          </Link>
        </div>
      </div>
    );
  }

  const dealUrl =
    product.link_type === "affiliate"
      ? `/go/${product.id}`
      : product.link_url;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="mb-8">
          <Link
            href={
              product.category
                ? `/category/${product.category.slug}`
                : "/categories"
            }
            className="inline-flex items-center text-blue-600 hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Link>
        </nav>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

          <a
            href={dealUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            {product.link_type === "affiliate" ? "Get Deal" : "Buy Now"}
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
}
