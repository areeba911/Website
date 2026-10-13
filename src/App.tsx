import { useState, useMemo } from 'react';
import { ShoppingCart, Search, Coffee, X, Minus, Plus, ArrowLeft, Eye } from 'lucide-react';
import { Product, CartItem } from './types';
import { products } from './data/products';

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // Filter products
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
  const addToCart = (product: Product, quantity: number = 1) => {
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
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const removeItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  // Order complete
  if (orderComplete) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#FDF8F3', padding: '40px 20px' }}>
        <div style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center', backgroundColor: 'white', padding: '40px', borderRadius: '16px', border: '1px solid #E8D5C4' }}>
          <div style={{ width: '80px', height: '80px', margin: '0 auto 20px', backgroundColor: '#7A8B6F20', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '40px' }}>✓</span>
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#2C1810', marginBottom: '12px' }}>Order Confirmed!</h1>
          <p style={{ color: '#6B4226', marginBottom: '24px' }}>Thank you for your purchase. Your specialty coffee is being prepared with care.</p>
          <button
            onClick={() => { setOrderComplete(false); setCartItems([]); setSelectedProduct(null); }}
            style={{ backgroundColor: '#6B4226', color: 'white', padding: '12px 24px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 500 }}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  // Checkout
  if (showCheckout) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#FDF8F3', padding: '20px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <button
            onClick={() => setShowCheckout(false)}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6B4226', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '20px', fontSize: '14px' }}
          >
            <ArrowLeft size={16} /> Back to Cart
          </button>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#2C1810', marginBottom: '24px' }}>Checkout</h1>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
            <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #E8D5C480' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#2C1810', marginBottom: '16px' }}>Contact Information</h2>
              <input type="email" placeholder="Email address" style={{ width: '100%', padding: '12px', backgroundColor: '#F5EDE4', border: '1px solid #E8D5C4', borderRadius: '8px', fontSize: '14px' }} />
            </div>
            <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #E8D5C480' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#2C1810', marginBottom: '16px' }}>Shipping Address</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <input type="text" placeholder="First name" style={{ padding: '12px', backgroundColor: '#F5EDE4', border: '1px solid #E8D5C4', borderRadius: '8px', fontSize: '14px' }} />
                <input type="text" placeholder="Last name" style={{ padding: '12px', backgroundColor: '#F5EDE4', border: '1px solid #E8D5C4', borderRadius: '8px', fontSize: '14px' }} />
                <input type="text" placeholder="Address" style={{ gridColumn: '1 / -1', padding: '12px', backgroundColor: '#F5EDE4', border: '1px solid #E8D5C4', borderRadius: '8px', fontSize: '14px' }} />
                <input type="text" placeholder="City" style={{ padding: '12px', backgroundColor: '#F5EDE4', border: '1px solid #E8D5C4', borderRadius: '8px', fontSize: '14px' }} />
                <input type="text" placeholder="ZIP code" style={{ padding: '12px', backgroundColor: '#F5EDE4', border: '1px solid #E8D5C4', borderRadius: '8px', fontSize: '14px' }} />
              </div>
            </div>
            <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #E8D5C480' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#2C1810', marginBottom: '16px' }}>Payment Details</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input type="text" placeholder="Card number" style={{ padding: '12px', backgroundColor: '#F5EDE4', border: '1px solid #E8D5C4', borderRadius: '8px', fontSize: '14px' }} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <input type="text" placeholder="MM/YY" style={{ padding: '12px', backgroundColor: '#F5EDE4', border: '1px solid #E8D5C4', borderRadius: '8px', fontSize: '14px' }} />
                  <input type="text" placeholder="CVV" style={{ padding: '12px', backgroundColor: '#F5EDE4', border: '1px solid #E8D5C4', borderRadius: '8px', fontSize: '14px' }} />
                </div>
              </div>
            </div>
            <button
              onClick={() => { setShowCheckout(false); setOrderComplete(true); }}
              style={{ backgroundColor: '#6B4226', color: 'white', padding: '14px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 500, fontSize: '16px' }}
            >
              Place Order — ${total.toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Product detail
  if (selectedProduct) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#FDF8F3' }}>
        {/* Header */}
        <header style={{ backgroundColor: '#FDF8F3F0', borderBottom: '1px solid #E8D5C4', padding: '16px 20px', position: 'sticky', top: 0, zIndex: 50 }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button onClick={() => setSelectedProduct(null)} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6B4226', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 500 }}>
              <ArrowLeft size={16} /> Back
            </button>
            <button onClick={() => setShowCart(true)} style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}>
              <ShoppingCart size={24} color="#6B4226" />
              {totalItems > 0 && (
                <span style={{ position: 'absolute', top: 0, right: 0, width: '20px', height: '20px', backgroundColor: '#C4813D', color: 'white', fontSize: '12px', fontWeight: 'bold', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </header>

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px' }}>
            <div style={{ aspectRatio: '1', borderRadius: '16px', overflow: 'hidden', backgroundColor: '#F5EDE4' }}>
              <img src={selectedProduct.image} alt={selectedProduct.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <p style={{ fontSize: '12px', fontWeight: 500, color: '#C4813D', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>{selectedProduct.origin}</p>
              <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#2C1810', marginBottom: '8px' }}>{selectedProduct.name}</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <span style={{ fontSize: '28px', fontWeight: 'bold', color: '#C4813D' }}>${selectedProduct.price.toFixed(2)}</span>
                <span style={{ fontSize: '14px', color: '#6B422699' }}>/ {selectedProduct.weight}</span>
              </div>
              <p style={{ color: '#6B4226B3', lineHeight: 1.6, marginBottom: '24px' }}>{selectedProduct.description}</p>
              <div style={{ marginBottom: '24px' }}>
                <p style={{ fontSize: '12px', color: '#6B422680', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Flavor Notes</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {selectedProduct.flavorNotes.map((note) => (
                    <span key={note} style={{ padding: '6px 12px', backgroundColor: 'white', border: '1px solid #E8D5C4', borderRadius: '9999px', fontSize: '14px', color: '#6B4226' }}>{note}</span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => { addToCart(selectedProduct, 1); setSelectedProduct(null); }}
                style={{ backgroundColor: '#6B4226', color: 'white', padding: '12px 24px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px', width: '100%', justifyContent: 'center' }}
              >
                <ShoppingCart size={16} /> Add to Cart — ${selectedProduct.price.toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main shop view
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FDF8F3' }}>
      {/* Header */}
      <header style={{ backgroundColor: '#FDF8F3F0', borderBottom: '1px solid #E8D5C4', padding: '16px 20px', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Coffee size={28} color="#6B4226" />
            <div>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#2C1810', lineHeight: 1.2 }}>Ember & Bloom</div>
              <div style={{ fontSize: '10px', color: '#6B422699', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Specialty Coffee</div>
            </div>
          </div>
          <div style={{ flex: 1, maxWidth: '400px', position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6B422666' }} />
            <input
              type="text"
              placeholder="Search coffees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', paddingLeft: '40px', paddingRight: '16px', paddingTop: '10px', paddingBottom: '10px', backgroundColor: '#F5EDE4', border: '1px solid #E8D5C4', borderRadius: '9999px', fontSize: '14px', color: '#2C1810' }}
            />
          </div>
          <button onClick={() => setShowCart(true)} style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}>
            <ShoppingCart size={24} color="#6B4226" />
            {totalItems > 0 && (
              <span style={{ position: 'absolute', top: 0, right: 0, width: '20px', height: '20px', backgroundColor: '#C4813D', color: 'white', fontSize: '12px', fontWeight: 'bold', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Hero */}
      <div style={{ textAlign: 'center', padding: '48px 20px 32px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#2C1810', marginBottom: '12px' }}>Our Collection</h1>
        <p style={{ color: '#6B422699', maxWidth: '500px', margin: '0 auto' }}>Hand-selected beans from the world's finest growing regions, roasted to perfection in small batches.</p>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', padding: '0 20px', marginBottom: '32px' }}>
        {['all', 'light', 'medium', 'dark'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '8px 20px',
              borderRadius: '9999px',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
              border: selectedCategory === cat ? 'none' : '1px solid #E8D5C4',
              backgroundColor: selectedCategory === cat ? '#6B4226' : 'white',
              color: selectedCategory === cat ? 'white' : '#6B4226',
            }}
          >
            {cat === 'all' ? 'All Coffees' : cat.charAt(0).toUpperCase() + cat.slice(1) + ' Roast'}
          </button>
        ))}
      </div>

      {/* Products */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px 60px' }}>
        {filteredProducts.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            {filteredProducts.map((product) => (
              <div key={product.id} style={{ backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', border: '1px solid #E8D5C480', display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', aspectRatio: '1', overflow: 'hidden', backgroundColor: '#F5EDE4' }}>
                  <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '4px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#2C1810' }}>{product.name}</h3>
                    <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#C4813D' }}>${product.price.toFixed(2)}</span>
                  </div>
                  <p style={{ fontSize: '12px', color: '#6B422699', marginBottom: '12px' }}>{product.origin} · {product.weight}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                    {product.flavorNotes.map((note) => (
                      <span key={note} style={{ fontSize: '12px', padding: '2px 8px', backgroundColor: '#F5EDE4', color: '#6B4226B3', borderRadius: '9999px' }}>{note}</span>
                    ))}
                  </div>
                  <button
                    onClick={() => addToCart(product, 1)}
                    style={{ backgroundColor: '#6B4226', color: 'white', padding: '10px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 500, fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: 'auto' }}
                  >
                    <ShoppingCart size={16} /> Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p style={{ color: '#6B422680', fontSize: '18px' }}>No coffees found matching your search.</p>
          </div>
        )}
      </div>

      {/* Cart Drawer */}
      {showCart && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', justifyContent: 'flex-end' }}>
          <div onClick={() => setShowCart(false)} style={{ position: 'absolute', inset: 0, backgroundColor: '#2C181066' }} />
          <div style={{ position: 'relative', width: '100%', maxWidth: '400px', backgroundColor: '#FDF8F3', display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px', borderBottom: '1px solid #E8D5C4' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShoppingCart size={20} color="#6B4226" />
                <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#2C1810' }}>Your Cart</h2>
                <span style={{ fontSize: '14px', color: '#6B422680' }}>({totalItems})</span>
              </div>
              <button onClick={() => setShowCart(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}>
                <X size={20} color="#6B4226" />
              </button>
            </div>
            <div style={{ flex: 1, overflow: 'auto', padding: '20px' }}>
              {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                  <ShoppingCart size={64} color="#E8D5C4" style={{ margin: '0 auto 16px' }} />
                  <p style={{ color: '#6B422699', fontWeight: 500, marginBottom: '4px' }}>Your cart is empty</p>
                  <p style={{ fontSize: '14px', color: '#6B422666' }}>Add some delicious coffee!</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {cartItems.map((item) => (
                    <div key={item.product.id} style={{ display: 'flex', gap: '16px', padding: '12px', backgroundColor: 'white', borderRadius: '12px', border: '1px solid #E8D5C480' }}>
                      <div style={{ width: '80px', height: '80px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, backgroundColor: '#F5EDE4' }}>
                        <img src={item.product.image} alt={item.product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#2C1810', marginBottom: '2px' }}>{item.product.name}</h3>
                        <p style={{ fontSize: '12px', color: '#6B422680', marginBottom: '8px' }}>{item.product.origin}</p>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #E8D5C4', borderRadius: '6px', overflow: 'hidden' }}>
                            <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} style={{ padding: '6px', background: 'none', border: 'none', cursor: 'pointer' }}>
                              <Minus size={12} color="#6B4226" />
                            </button>
                            <span style={{ padding: '0 8px', fontSize: '12px', fontWeight: 500, color: '#2C1810' }}>{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} style={{ padding: '6px', background: 'none', border: 'none', cursor: 'pointer' }}>
                              <Plus size={12} color="#6B4226" />
                            </button>
                          </div>
                          <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#C4813D' }}>${(item.product.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                      <button onClick={() => removeItem(item.product.id)} style={{ alignSelf: 'start', background: 'none', border: 'none', cursor: 'pointer', padding: '6px', color: '#6B42264D' }}>
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {cartItems.length > 0 && (
              <div style={{ borderTop: '1px solid #E8D5C4', padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#6B422699', marginBottom: '8px' }}>
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#6B422699', marginBottom: '12px' }}>
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: 'bold', color: '#2C1810', paddingTop: '12px', borderTop: '1px solid #E8D5C4', marginBottom: '16px' }}>
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => { setShowCart(false); setShowCheckout(true); }}
                  style={{ backgroundColor: '#6B4226', color: 'white', padding: '12px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 500, width: '100%', fontSize: '14px' }}
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
