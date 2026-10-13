import { Search, ShoppingBag, Coffee, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { CartItem, ViewMode } from '../types';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  cartItems: CartItem[];
  onCartClick: () => void;
  onLogoClick: () => void;
  currentView: ViewMode;
}

export default function Header({
  searchQuery,
  onSearchChange,
  cartItems,
  onCartClick,
  onLogoClick,
  currentView,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-latte">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <button
            onClick={onLogoClick}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <Coffee className="w-7 h-7 text-mocha group-hover:text-caramel transition-colors" />
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold text-espresso tracking-tight leading-tight">
                Ember & Bloom
              </span>
              <span className="text-[10px] sm:text-xs text-mocha/60 tracking-widest uppercase leading-tight hidden sm:block">
                Specialty Coffee
              </span>
            </div>
          </button>

          {/* Search - Desktop */}
          {currentView === 'shop' && (
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-mocha/40" />
                <input
                  type="text"
                  placeholder="Search coffees, origins, flavors..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-cream-dark border border-latte rounded-full text-sm text-espresso placeholder:text-mocha/40 focus:outline-none focus:ring-2 focus:ring-caramel/30 focus:border-caramel transition-all"
                />
              </div>
            </div>
          )}

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Mobile search toggle */}
            {currentView === 'shop' && (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-mocha hover:text-espresso transition-colors"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
              </button>
            )}

            {/* Cart button */}
            <button
              onClick={onCartClick}
              className="relative p-2 text-mocha hover:text-espresso transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-caramel text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        {mobileMenuOpen && currentView === 'shop' && (
          <div className="md:hidden pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-mocha/40" />
              <input
                type="text"
                placeholder="Search coffees..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-cream-dark border border-latte rounded-full text-sm text-espresso placeholder:text-mocha/40 focus:outline-none focus:ring-2 focus:ring-caramel/30 focus:border-caramel transition-all"
                autoFocus
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
