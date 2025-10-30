import React, { useState, useEffect, useMemo } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { PackageX, Sparkles } from 'lucide-react';

// Components
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import ReceiptModal from './components/ReceiptModal';
import SearchBar from './components/SearchBar';
import FilterSort from './components/FilterSort';
import ProductQuickView from './components/ProductQuickView';
import ProductSkeleton from './components/ProductSkeleton';
import AuthModal from './components/AuthModal';
import WishlistDrawer from './components/WishlistDrawer';
import MyOrders from './components/MyOrders';

// Services
import {
  getProducts,
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  checkout,
  getUserOrders,
} from './services/api';
import {
  login as loginAPI,
  register as registerAPI,
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from './services/authService';

// Styles
import './App.css';

function App() {
  // Product and Cart State
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [], totalAmount: 0, itemCount: 0 });
  const [loading, setLoading] = useState(true);
  const [addingProductId, setAddingProductId] = useState(null);

  // UI State
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [receipt, setReceipt] = useState(null);

  // Search, Filter, Sort State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Authentication State
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Wishlist and Orders State
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);

  // Initialize - Fetch products and cart, load user from localStorage
  useEffect(() => {
    fetchProducts();
    fetchCart();

    // Load user from localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error loading user:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Fetch Products
  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
    } catch (error) {
      toast.error('Failed to load products');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Cart
  const fetchCart = async () => {
    try {
      const response = await getCart();
      setCart(response.data);
    } catch (error) {
      console.error('Failed to load cart:', error);
    }
  };

  // Get unique categories from products
  const categories = useMemo(() => {
    return [...new Set(products.map((p) => p.category))];
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      default:
        break;
    }

    return filtered;
  }, [products, searchQuery, selectedCategory, sortBy]);

  // Add to Cart Handler
  const handleAddToCart = async (product, quantity) => {
    setAddingProductId(product.id);
    try {
      const response = await addToCart(product.id, quantity);
      setCart(response.data);
      toast.success(`${quantity}x ${product.name} added to cart!`, {
        icon: '🛒',
      });
    } catch (error) {
      toast.error('Failed to add item to cart');
      console.error(error);
    } finally {
      setAddingProductId(null);
    }
  };

  // Update Cart Quantity
  const handleUpdateQuantity = async (productId, quantity) => {
    try {
      const response = await updateCartItem(productId, quantity);
      setCart(response.data);
      toast.success('Cart updated!', { icon: '👍' });
    } catch (error) {
      toast.error('Failed to update cart');
      console.error(error);
    }
  };

  // Remove Item from Cart
  const handleRemoveItem = async (productId) => {
    try {
      const response = await removeFromCart(productId);
      setCart(response.data);
      toast.success('Item removed from cart', { icon: '🗑️' });
    } catch (error) {
      toast.error('Failed to remove item');
      console.error(error);
    }
  };

  // Checkout Handler
  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Checkout Submit
  const handleCheckoutSubmit = async (formData) => {
    try {
      const response = await checkout(
        formData.customerName,
        formData.customerEmail,
        cart.items,
        user?.id || null
      );

      setReceipt(response.data);
      setIsCheckoutOpen(false);
      setCart({ items: [], totalAmount: 0, itemCount: 0 });

      toast.success('Order placed successfully!', {
        icon: '🎉',
        duration: 3000,
      });
    } catch (error) {
      toast.error('Failed to process checkout');
      console.error(error);
    }
  };

  // Authentication Success Handler
  const handleAuthSuccess = async (formData, isLogin) => {
    try {
      const response = isLogin
        ? await loginAPI(formData.email, formData.password)
        : await registerAPI(formData.name, formData.email, formData.password);

      if (response.success) {
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
        setIsAuthModalOpen(false);

        toast.success(isLogin ? 'Welcome back!' : 'Account created successfully!', {
          icon: '👋',
          duration: 3000,
        });
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          (isLogin ? 'Failed to sign in' : 'Failed to create account')
      );
      throw error;
    }
  };

  // Logout Handler
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.success('Signed out successfully', {
      icon: '👋',
    });
  };

  // Wishlist Click Handler
  const handleWishlistClick = async () => {
    if (!user) {
      toast.error('Please sign in to access wishlist', {
        icon: '🔒',
      });
      setIsAuthModalOpen(true);
    } else {
      try {
        const response = await getWishlist(user.id);
        setWishlistItems(response.data);
        setIsWishlistOpen(true);
      } catch (error) {
        toast.error('Failed to load wishlist');
        console.error(error);
      }
    }
  };

  // Orders Click Handler
  const handleOrdersClick = async () => {
    if (!user) {
      toast.error('Please sign in to view orders', {
        icon: '🔒',
      });
      setIsAuthModalOpen(true);
    } else {
      try {
        const response = await getUserOrders(user.id);
        setOrders(response.data);
        setIsOrdersOpen(true);
      } catch (error) {
        toast.error('Failed to load orders');
        console.error(error);
      }
    }
  };

  // Add to Wishlist Handler
  const handleAddToWishlist = async (productId) => {
    if (!user) {
      toast.error('Please sign in to add to wishlist');
      return;
    }

    try {
      await addToWishlist(user.id, productId);
      const updatedUser = {
        ...user,
        wishlist: [...(user.wishlist || []), productId],
      };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      toast.success('Added to wishlist!', { icon: '❤️' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add to wishlist');
    }
  };

  // Remove from Wishlist Handler
  const handleRemoveFromWishlist = async (productId) => {
    if (!user) return;

    try {
      await removeFromWishlist(user.id, productId);
      setWishlistItems(wishlistItems.filter((item) => item.id !== productId));
      const updatedUser = {
        ...user,
        wishlist: user.wishlist.filter((id) => id !== productId),
      };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      toast.success('Removed from wishlist');
    } catch (error) {
      toast.error('Failed to remove from wishlist');
    }
  };

  return (
    <div className="App">
      <Toaster position="top-right" />

      {/* Navbar */}
      <Navbar
        cartItemCount={cart.itemCount}
        onCartClick={() => setIsCartOpen(true)}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        user={user}
        onSignInClick={() => setIsAuthModalOpen(true)}
        onWishlistClick={handleWishlistClick}
        onOrdersClick={handleOrdersClick}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <main className="main-content">
        <div className="container">
          <section className="products-section">
            {/* Section Header */}
            <div className="section-header">
              <h2 className="section-title">
                <Sparkles size={28} style={{ marginRight: '0.5rem' }} />
                Discover Amazing Products
              </h2>
              <p className="section-subtitle">
                Explore our curated collection of premium products
              </p>

              {/* Search and Filter Controls */}
              <div className="product-controls" style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <SearchBar
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                />
                <FilterSort sortBy={sortBy} onSortChange={setSortBy} />
              </div>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="products-grid">
                {[...Array(8)].map((_, index) => (
                  <ProductSkeleton key={index} />
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="empty-state">
                <PackageX size={60} />
                <h3>No products found</h3>
                <p>Try adjusting your search or filters.</p>
              </div>
            ) : (
              <div className="products-grid">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    onQuickView={setQuickViewProduct}
                    isAdding={addingProductId === product.id}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <p className="footer-text">
              © 2025 Vibe Commerce. Built with ❤️ for amazing shopping experiences.
            </p>
            <p className="footer-text text-sm">
              Full Stack E-Commerce Demo | React + Node.js + MongoDB
            </p>
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        onSubmit={handleCheckoutSubmit}
      />

      {/* Receipt Modal */}
      <ReceiptModal
        isOpen={!!receipt}
        onClose={() => setReceipt(null)}
        receipt={receipt}
      />

      {/* Product Quick View */}
      <ProductQuickView
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={(product, quantity) => {
          handleAddToCart(product, quantity);
          setQuickViewProduct(null);
        }}
        isAdding={addingProductId === quickViewProduct?.id}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistItems={wishlistItems}
        onAddToCart={(product, quantity) => {
          handleAddToCart(product, quantity);
        }}
        onRemoveItem={handleRemoveFromWishlist}
        isAdding={addingProductId}
      />

      {/* My Orders Drawer */}
      <MyOrders
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
        orders={orders}
      />
    </div>
  );
}

export default App;
