import { X, Minus, Plus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export default function Cart({ items, onClose, onUpdateQuantity, onRemoveItem, onCheckout }: CartProps) {
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-espresso/40 backdrop-blur-sm" onClick={onClose} />

      {/* Cart panel */}
      <div className="relative w-full max-w-md bg-cream shadow-2xl flex flex-col h-full animate-slide-in">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-latte">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-mocha" />
            <h2 className="text-lg font-bold text-espresso">Your Cart</h2>
            <span className="text-sm text-mocha/50">
              ({items.reduce((sum, item) => sum + item.quantity, 0)} items)
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-cream-dark rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-mocha" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-16 h-16 text-latte mb-4" />
              <p className="text-mocha/60 font-medium mb-1">Your cart is empty</p>
              <p className="text-sm text-mocha/40">Add some delicious coffee to get started!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-3 bg-white rounded-xl border border-latte/50"
                >
                  {/* Image */}
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-cream-dark">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-espresso truncate">
                      {item.product.name}
                    </h3>
                    <p className="text-xs text-mocha/50 mt-0.5">
                      {item.product.origin} · {item.product.weight}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity controls */}
                      <div className="flex items-center border border-latte rounded-md overflow-hidden">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1.5 hover:bg-cream-dark transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3 text-mocha" />
                        </button>
                        <span className="px-2 text-xs font-medium text-espresso">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1.5 hover:bg-cream-dark transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3 text-mocha" />
                        </button>
                      </div>

                      {/* Price */}
                      <span className="text-sm font-bold text-caramel">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => onRemoveItem(item.product.id)}
                    className="self-start p-1.5 text-mocha/30 hover:text-red-500 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-latte p-5 space-y-3">
            <div className="flex justify-between text-sm text-mocha/60">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-mocha/60">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
            </div>
            {shipping > 0 && (
              <p className="text-xs text-sage">
                Add ${(50 - subtotal).toFixed(2)} more for free shipping!
              </p>
            )}
            <div className="flex justify-between text-base font-bold text-espresso pt-2 border-t border-latte">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button
              onClick={onCheckout}
              className="btn-primary w-full flex items-center justify-center gap-2 mt-2"
            >
              Proceed to Checkout
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
