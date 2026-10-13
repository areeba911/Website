import { ArrowLeft, CreditCard, Lock, CheckCircle } from 'lucide-react';
import { CartItem } from '../types';
import { useState } from 'react';

interface CheckoutProps {
  items: CartItem[];
  onBack: () => void;
  onComplete: () => void;
}

export default function Checkout({ items, onBack, onComplete }: CheckoutProps) {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      onComplete();
    }, 2000);
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-mocha hover:text-espresso transition-colors mb-6 sm:mb-8 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Back to Cart</span>
      </button>

      <h1 className="text-2xl sm:text-3xl font-bold text-espresso mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-6">
          {/* Contact */}
          <div className="bg-white rounded-xl p-5 sm:p-6 border border-latte/50">
            <h2 className="text-base font-semibold text-espresso mb-4">Contact Information</h2>
            <input
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={(e) => updateField('email', e.target.value)}
              required
              className="w-full px-4 py-3 bg-cream-dark border border-latte rounded-lg text-sm text-espresso placeholder:text-mocha/40 focus:outline-none focus:ring-2 focus:ring-caramel/30 focus:border-caramel transition-all"
            />
          </div>

          {/* Shipping */}
          <div className="bg-white rounded-xl p-5 sm:p-6 border border-latte/50">
            <h2 className="text-base font-semibold text-espresso mb-4">Shipping Address</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="First name"
                value={formData.firstName}
                onChange={(e) => updateField('firstName', e.target.value)}
                required
                className="px-4 py-3 bg-cream-dark border border-latte rounded-lg text-sm text-espresso placeholder:text-mocha/40 focus:outline-none focus:ring-2 focus:ring-caramel/30 focus:border-caramel transition-all"
              />
              <input
                type="text"
                placeholder="Last name"
                value={formData.lastName}
                onChange={(e) => updateField('lastName', e.target.value)}
                required
                className="px-4 py-3 bg-cream-dark border border-latte rounded-lg text-sm text-espresso placeholder:text-mocha/40 focus:outline-none focus:ring-2 focus:ring-caramel/30 focus:border-caramel transition-all"
              />
              <input
                type="text"
                placeholder="Address"
                value={formData.address}
                onChange={(e) => updateField('address', e.target.value)}
                required
                className="sm:col-span-2 px-4 py-3 bg-cream-dark border border-latte rounded-lg text-sm text-espresso placeholder:text-mocha/40 focus:outline-none focus:ring-2 focus:ring-caramel/30 focus:border-caramel transition-all"
              />
              <input
                type="text"
                placeholder="City"
                value={formData.city}
                onChange={(e) => updateField('city', e.target.value)}
                required
                className="px-4 py-3 bg-cream-dark border border-latte rounded-lg text-sm text-espresso placeholder:text-mocha/40 focus:outline-none focus:ring-2 focus:ring-caramel/30 focus:border-caramel transition-all"
              />
              <input
                type="text"
                placeholder="ZIP code"
                value={formData.zipCode}
                onChange={(e) => updateField('zipCode', e.target.value)}
                required
                className="px-4 py-3 bg-cream-dark border border-latte rounded-lg text-sm text-espresso placeholder:text-mocha/40 focus:outline-none focus:ring-2 focus:ring-caramel/30 focus:border-caramel transition-all"
              />
            </div>
          </div>

          {/* Payment */}
          <div className="bg-white rounded-xl p-5 sm:p-6 border border-latte/50">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="w-5 h-5 text-mocha" />
              <h2 className="text-base font-semibold text-espresso">Payment Details</h2>
            </div>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Card number"
                value={formData.cardNumber}
                onChange={(e) => updateField('cardNumber', e.target.value)}
                required
                className="w-full px-4 py-3 bg-cream-dark border border-latte rounded-lg text-sm text-espresso placeholder:text-mocha/40 focus:outline-none focus:ring-2 focus:ring-caramel/30 focus:border-caramel transition-all"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={formData.expiry}
                  onChange={(e) => updateField('expiry', e.target.value)}
                  required
                  className="px-4 py-3 bg-cream-dark border border-latte rounded-lg text-sm text-espresso placeholder:text-mocha/40 focus:outline-none focus:ring-2 focus:ring-caramel/30 focus:border-caramel transition-all"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  value={formData.cvv}
                  onChange={(e) => updateField('cvv', e.target.value)}
                  required
                  className="px-4 py-3 bg-cream-dark border border-latte rounded-lg text-sm text-espresso placeholder:text-mocha/40 focus:outline-none focus:ring-2 focus:ring-caramel/30 focus:border-caramel transition-all"
                />
              </div>
            </div>
            <div className="flex items-center gap-1.5 mt-3 text-xs text-mocha/40">
              <Lock className="w-3 h-3" />
              <span>Your payment information is secure and encrypted</span>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isProcessing}
            className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 text-base disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                Place Order — ${total.toFixed(2)}
              </>
            )}
          </button>
        </form>

        {/* Order summary */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-5 sm:p-6 border border-latte/50 sticky top-24">
            <h2 className="text-base font-semibold text-espresso mb-4">Order Summary</h2>
            <div className="space-y-3 mb-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-cream-dark flex-shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-espresso truncate">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-mocha/50">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-sm font-medium text-espresso">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-latte pt-3 space-y-2">
              <div className="flex justify-between text-sm text-mocha/60">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-mocha/60">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-espresso pt-2 border-t border-latte">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
