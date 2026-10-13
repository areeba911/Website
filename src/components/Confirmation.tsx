import { CheckCircle, Coffee, ArrowRight } from 'lucide-react';

interface ConfirmationProps {
  onContinueShopping: () => void;
}

export default function Confirmation({ onContinueShopping }: ConfirmationProps) {
  return (
    <div className="max-w-lg mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
      <div className="bg-white rounded-2xl p-8 sm:p-12 border border-latte/50 shadow-sm">
        {/* Success icon */}
        <div className="w-20 h-20 mx-auto mb-6 bg-sage/10 rounded-full flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-sage" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-espresso mb-3">
          Order Confirmed!
        </h1>
        <p className="text-mocha/60 mb-2">
          Thank you for your purchase. Your specialty coffee is being prepared with care.
        </p>
        <p className="text-sm text-mocha/40 mb-8">
          Order #EB-{Math.random().toString(36).substr(2, 8).toUpperCase()}
        </p>

        {/* What's next */}
        <div className="bg-cream-dark rounded-xl p-5 mb-8 text-left">
          <h3 className="text-sm font-semibold text-espresso mb-3">What happens next?</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-caramel/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-caramel">1</span>
              </div>
              <p className="text-sm text-mocha/70">We'll roast your beans fresh to order within 24 hours</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-caramel/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-caramel">2</span>
              </div>
              <p className="text-sm text-mocha/70">Your coffee ships via express delivery (2-3 business days)</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-caramel/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-caramel">3</span>
              </div>
              <p className="text-sm text-mocha/70">Enjoy the freshest coffee delivered to your door!</p>
            </div>
          </div>
        </div>

        <button
          onClick={onContinueShopping}
          className="btn-primary inline-flex items-center gap-2"
        >
          <Coffee className="w-4 h-4" />
          Continue Shopping
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
