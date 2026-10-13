import { ShoppingCart, Eye } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onViewDetail: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onViewDetail, onAddToCart }: ProductCardProps) {
  const roastLabels: Record<number, string> = {
    1: 'Ultra Light',
    2: 'Light',
    3: 'Medium',
    4: 'Medium-Dark',
    5: 'Dark',
  };

  const categoryColors: Record<string, string> = {
    light: 'bg-amber-100 text-amber-800',
    medium: 'bg-orange-100 text-orange-800',
    dark: 'bg-stone-200 text-stone-800',
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-latte/50 flex flex-col">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-cream-dark">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-espresso/0 group-hover:bg-espresso/20 transition-all duration-300 flex items-center justify-center">
          <button
            onClick={() => onViewDetail(product)}
            className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-white/95 backdrop-blur-sm text-espresso px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-white cursor-pointer"
          >
            <Eye className="w-4 h-4" />
            View Details
          </button>
        </div>
        {/* Category badge */}
        <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium ${categoryColors[product.category]}`}>
          {roastLabels[product.roastLevel]}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-espresso text-base leading-tight">
            {product.name}
          </h3>
          <span className="text-caramel font-bold text-base whitespace-nowrap">
            ${product.price.toFixed(2)}
          </span>
        </div>
        <p className="text-xs text-mocha/60 mb-3">{product.origin} · {product.weight}</p>

        {/* Flavor notes */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.flavorNotes.map((note) => (
            <span
              key={note}
              className="text-xs px-2 py-0.5 bg-cream-dark text-mocha/70 rounded-full"
            >
              {note}
            </span>
          ))}
        </div>

        {/* Roast level indicator */}
        <div className="flex items-center gap-1.5 mb-4 mt-auto">
          <span className="text-xs text-mocha/50">Roast:</span>
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((level) => (
              <div
                key={level}
                className={`w-3 h-3 rounded-full ${
                  level <= product.roastLevel
                    ? 'bg-mocha'
                    : 'bg-latte'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Add to cart */}
        <button
          onClick={() => onAddToCart(product)}
          className="btn-primary flex items-center justify-center gap-2 w-full text-sm"
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
