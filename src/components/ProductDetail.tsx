import { ArrowLeft, ShoppingCart, Minus, Plus, Star } from 'lucide-react';
import { Product } from '../types';
import { useState } from 'react';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export default function ProductDetail({ product, onBack, onAddToCart }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);

  const roastLabels: Record<number, string> = {
    1: 'Ultra Light',
    2: 'Light',
    3: 'Medium',
    4: 'Medium-Dark',
    5: 'Dark',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-mocha hover:text-espresso transition-colors mb-6 sm:mb-8 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Back to Collection</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">
        {/* Image */}
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-cream-dark">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <div className="mb-2">
            <span className="text-xs font-medium text-caramel uppercase tracking-wider">
              {product.origin}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-espresso mb-2">
            {product.name}
          </h1>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl sm:text-3xl font-bold text-caramel">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-sm text-mocha/50">/ {product.weight}</span>
          </div>

          {/* Rating mock */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-4 h-4 fill-caramel text-caramel" />
              ))}
            </div>
            <span className="text-sm text-mocha/60">(4.8 · 124 reviews)</span>
          </div>

          {/* Description */}
          <p className="text-mocha/70 leading-relaxed mb-6 text-sm sm:text-base">
            {product.description}
          </p>

          {/* Details grid */}
          <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-cream-dark rounded-xl">
            <div>
              <span className="text-xs text-mocha/50 uppercase tracking-wider">Roast Level</span>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className={`w-4 h-4 rounded-full ${
                        level <= product.roastLevel ? 'bg-mocha' : 'bg-latte'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-espresso">{roastLabels[product.roastLevel]}</span>
              </div>
            </div>
            <div>
              <span className="text-xs text-mocha/50 uppercase tracking-wider">Weight</span>
              <p className="text-sm font-medium text-espresso mt-1">{product.weight}</p>
            </div>
            <div>
              <span className="text-xs text-mocha/50 uppercase tracking-wider">Origin</span>
              <p className="text-sm font-medium text-espresso mt-1">{product.origin}</p>
            </div>
            <div>
              <span className="text-xs text-mocha/50 uppercase tracking-wider">Process</span>
              <p className="text-sm font-medium text-espresso mt-1">Washed / Natural</p>
            </div>
          </div>

          {/* Flavor notes */}
          <div className="mb-6">
            <span className="text-xs text-mocha/50 uppercase tracking-wider mb-2 block">Flavor Notes</span>
            <div className="flex flex-wrap gap-2">
              {product.flavorNotes.map((note) => (
                <span
                  key={note}
                  className="px-3 py-1.5 bg-white border border-latte rounded-full text-sm text-mocha"
                >
                  {note}
                </span>
              ))}
            </div>
          </div>

          {/* Quantity + Add to cart */}
          <div className="flex items-center gap-4 mt-auto pt-4 border-t border-latte">
            <div className="flex items-center border border-latte rounded-lg overflow-hidden">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3 hover:bg-cream-dark transition-colors cursor-pointer"
              >
                <Minus className="w-4 h-4 text-mocha" />
              </button>
              <span className="px-4 text-sm font-medium text-espresso min-w-[2.5rem] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-3 hover:bg-cream-dark transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4 text-mocha" />
              </button>
            </div>
            <button
              onClick={() => onAddToCart(product, quantity)}
              className="btn-primary flex items-center gap-2 flex-1 justify-center"
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart — ${(product.price * quantity).toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
