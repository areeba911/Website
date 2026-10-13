import { useState, useMemo, useCallback } from 'react';
import { Product, CartItem, ViewMode } from './types';
import { products } from './data/products';
import Header from './components/Header';
import ProductGrid from './components/ProductGrid';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Confirmation from './components/Confirmation';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('shop');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCart, setShowCart] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch =
        searchQuery === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.flavorNotes.some((note) =>
          note.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  // Cart operations
  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showNotification(`${product.name} added to cart!`);
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    }
  }, []);

  const removeItem = useCallback((productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  // Notification
  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 2500);
  };

  // Navigation
  const handleViewDetail = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('detail');
    window.scrollTo(0, 0);
  };

  const handleBackToShop = () => {
    setCurrentView('shop');
    setSelectedProduct(null);
  };

  const handleCheckout = () => {
    setShowCart(false);
    setCurrentView('checkout');
    window.scrollTo(0, 0);
  };

  const handleOrderComplete = () => {
    setCartItems([]);
    setCurrentView('confirmation');
    window.scrollTo(0, 0);
  };

  const handleContinueShopping = () => {
    setCurrentView('shop');
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-cream">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartItems={cartItems}
        onCartClick={() => setShowCart(true)}
        onLogoClick={handleBackToShop}
        currentView={currentView}
      />

      {/* Main content */}
      <main>
        {currentView === 'shop' && (
          <ProductGrid
            products={filteredProducts}
            onViewDetail={handleViewDetail}
            onAddToCart={(product) => addToCart(product, 1)}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        )}

        {currentView === 'detail' && selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            onBack={handleBackToShop}
            onAddToCart={addToCart}
          />
        )}

        {currentView === 'checkout' && (
          <Checkout
            items={cartItems}
            onBack={() => {
              setCurrentView('shop');
              setShowCart(true);
            }}
            onComplete={handleOrderComplete}
          />
        )}

        {currentView === 'confirmation' && (
          <Confirmation onContinueShopping={handleContinueShopping} />
        )}
      </main>

      {/* Cart drawer */}
      {showCart && (
        <Cart
          items={cartItems}
          onClose={() => setShowCart(false)}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeItem}
          onCheckout={handleCheckout}
        />
      )}

      {/* Toast notification */}
      {notification && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-fade-up">
          <div className="bg-espresso text-white px-5 py-3 rounded-full shadow-lg text-sm font-medium flex items-center gap-2">
            <span className="w-2 h-2 bg-sage rounded-full" />
            {notification}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-espresso text-cream/70 py-10 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-cream font-bold text-lg mb-3">Ember & Bloom</h3>
              <p className="text-sm text-cream/50 leading-relaxed">
                Specialty coffee roasted in small batches. We source directly from farmers who share our passion for quality.
              </p>
            </div>
            <div>
              <h4 className="text-cream font-semibold text-sm mb-3 uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><button className="hover:text-cream transition-colors cursor-pointer">Our Story</button></li>
                <li><button className="hover:text-cream transition-colors cursor-pointer">Brewing Guides</button></li>
                <li><button className="hover:text-cream transition-colors cursor-pointer">Subscriptions</button></li>
                <li><button className="hover:text-cream transition-colors cursor-pointer">Contact Us</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-cream font-semibold text-sm mb-3 uppercase tracking-wider">Stay Connected</h4>
              <p className="text-sm text-cream/50 mb-3">Get brewing tips and new arrivals in your inbox.</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-espresso-light border border-cream/10 rounded-l-lg text-sm text-cream placeholder:text-cream/30 focus:outline-none focus:border-caramel"
                />
                <button className="px-4 py-2 bg-caramel text-white text-sm font-medium rounded-r-lg hover:bg-caramel-light transition-colors cursor-pointer">
                  Join
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-cream/10 pt-6 text-center text-xs text-cream/30">
            © 2026 Ember & Bloom Coffee Co. All rights reserved. Crafted with care.
          </div>
        </div>
      </footer>
    </div>
  );
}
