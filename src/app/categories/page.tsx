import { supabaseServer } from "@/lib/supabase-server";
import CategoryCard from "@/components/CategoryCard";
import { Category } from "@/types";

export const revalidate = 3600;

export default async function CategoriesPage() {
  const supabase = supabaseServer();

  const { data: categories, error } = await supabase
    .from("categories")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    console.error("Category fetch error:", error.message);

    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-lg">Failed to load categories</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            All Categories
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse deals by category and find exactly what you&apos;re looking
            for.
          </p>
        </div>

        {/* Categories Grid */}
        {categories && categories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(categories as Category[]).map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                productCount={0} // SAFE default (we’ll add real counts later)
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No categories found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
