import { supabaseServer } from "@/lib/supabase-server";
import CategoryCard from "@/components/CategoryCard";
import { Category } from "@/types";

export const revalidate = 3600;

type CategoryWithCount = Category & {
  products?: { count: number }[];
};

export default async function CategoriesPage() {
  const supabase = supabaseServer();

  const { data: categories } = await supabase
    .from("categories")
    .select(
      `
      *,
      products(count)
    `
    )
    .order("name", { ascending: true });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            All Categories
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse deals by category and find exactly what you&apos;re looking for.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(categories as CategoryWithCount[])?.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              productCount={category.products?.[0]?.count ?? 0}
            />
          ))}
        </div>

        {categories && categories.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No categories found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
