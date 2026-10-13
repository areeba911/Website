import { Product } from '../types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  onViewDetail: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function ProductGrid({
  products,
  onViewDetail,
  onAddToCart,
  selectedCategory,
  onCategoryChange,
}: ProductGridProps) {
  const categories = [
    { id: 'all', label: 'All Coffees' },
    { id: 'light', label: 'Light Roast' },
    { id: 'medium', label: 'Medium Roast' },
    { id: 'dark', label: 'Dark Roast' },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Hero section */}
      <div className="text-center mb-10 sm:mb-14">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-espresso mb-3 tracking-tight">
          Our Collection
        </h1>
        <p className="text-mocha/60 max-w-xl mx-auto text-sm sm:text-base">
          Hand-selected beans from the world's finest growing regions, roasted to perfection in small batches.
        </p>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-mocha text-white shadow-md'
                : 'bg-white text-mocha border border-latte hover:border-mocha/30 hover:bg-cream-dark'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Products grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetail={onViewDetail}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-mocha/50 text-lg">No coffees found matching your search.</p>
          <p className="text-mocha/40 text-sm mt-2">Try adjusting your filters or search terms.</p>
        </div>
      )}
    </section>
  );
}
