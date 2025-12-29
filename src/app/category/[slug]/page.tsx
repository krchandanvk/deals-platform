import { supabaseServer } from "@/lib/supabase-server";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const revalidate = 3600;

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = supabaseServer();

  const { data: category } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Category Not Found</h1>
          <Link href="/categories" className="text-blue-600 hover:underline">
            Browse All Categories
          </Link>
        </div>
      </div>
    );
  }

  const { data: products } = await supabase
    .from("products")
    .select(
      `
      *,
      category:categories(*)
    `
    )
    .eq("category_id", category.id)
    .eq("status", "active")
    .order("is_featured", { ascending: false })
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="mb-8">
          <Link
            href="/categories"
            className="inline-flex items-center text-blue-600 hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Categories
          </Link>
        </nav>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-gray-600 text-lg">{category.description}</p>
          )}
        </div>

        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-16 text-center">
            <p className="text-gray-500 text-lg">
              No deals found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
