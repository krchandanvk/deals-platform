import { Category } from '@/types';
import Link from 'next/link';

interface CategoryCardProps {
  category: Category;
  productCount?: number;
}

export default function CategoryCard({ category, productCount = 0 }: CategoryCardProps) {
  const categoryColors: Record<string, string> = {
    'electronics': 'from-blue-500 to-blue-600',
    'software': 'from-purple-500 to-purple-600',
    'digital-tools': 'from-green-500 to-green-600',
    'fashion': 'from-pink-500 to-pink-600',
    'food': 'from-orange-500 to-orange-600',
    'services': 'from-indigo-500 to-indigo-600',
  };

  const gradientColor = categoryColors[category.slug] || 'from-gray-500 to-gray-600';

  return (
    <Link href={`/category/${category.slug}`}>
      <div className="bg-gradient-to-br ${gradientColor} rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">{category.name}</h3>
            {category.description && (
              <p className="text-white/80 text-sm line-clamp-2">{category.description}</p>
            )}
          </div>
          <div className="text-4xl">{getCategoryEmoji(category.slug)}</div>
        </div>
        {productCount > 0 && (
          <div className="mt-4 text-white/90 text-sm font-medium">
            {productCount} {productCount === 1 ? 'deal' : 'deals'}
          </div>
        )}
      </div>
    </Link>
  );
}

function getCategoryEmoji(slug: string): string {
  const emojis: Record<string, string> = {
    'electronics': '📱',
    'software': '💻',
    'digital-tools': '🛠️',
    'fashion': '👕',
    'food': '🍕',
    'services': '💼',
  };
  return emojis[slug] || '📦';
}