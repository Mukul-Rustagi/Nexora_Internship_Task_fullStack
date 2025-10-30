import React, { useState, useEffect, useRef } from 'react';
import {
  ShoppingBag,
  ShoppingCart,
  Menu,
  X,
  Heart,
  User,
  Sparkles,
  LogOut,
  Package,
  ChevronDown,
} from 'lucide-react';

function Navbar({
  cartItemCount,
  onCartClick,
  categories,
  selectedCategory,
  onCategoryChange,
  user,
  onSignInClick,
  onWishlistClick,
  onOrdersClick,
  onLogout,
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  // Close user dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserMenuOpen]);

  return (
    <header className="navbar">
      {/* Top Bar */}
      <div className="navbar-top">
        <div className="container">
          <div className="navbar-top-content">
            <div className="navbar-promo">
              <Sparkles size={16} />
              <span>Free shipping on orders over $50!</span>
            </div>
            <div className="navbar-links">
              {user ? (
                <div className="user-menu" ref={userMenuRef}>
                  <button className="user-button" onClick={toggleUserMenu}>
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="user-avatar"
                    />
                    <span className="user-name">{user.name}</span>
                    <ChevronDown size={16} />
                  </button>
                  {isUserMenuOpen && (
                    <div className="user-dropdown">
                      <button
                        className="user-dropdown-item"
                        onClick={() => {
                          onWishlistClick();
                          setIsUserMenuOpen(false);
                        }}
                      >
                        <Heart size={18} />
                        Wishlist ({user.wishlist?.length || 0})
                      </button>
                      <button
                        className="user-dropdown-item"
                        onClick={() => {
                          onOrdersClick();
                          setIsUserMenuOpen(false);
                        }}
                      >
                        <Package size={18} />
                        My Orders
                      </button>
                      <div className="user-dropdown-divider"></div>
                      <button
                        className="user-dropdown-item user-dropdown-logout"
                        onClick={() => {
                          onLogout();
                          setIsUserMenuOpen(false);
                        }}
                      >
                        <LogOut size={18} />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <button className="navbar-link" onClick={onSignInClick}>
                    <User size={16} />
                    Sign In
                  </button>
                  <button className="navbar-link" onClick={onWishlistClick}>
                    <Heart size={16} />
                    Wishlist
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="navbar-main">
        <div className="container">
          <div className="navbar-content">
            <div className="navbar-left">
              {/* Logo */}
              <div className="logo">
                <div className="logo-icon">
                  <ShoppingBag size={28} />
                </div>
                <div className="logo-text">
                  <span className="logo-title">Vibe</span>
                  <span className="logo-subtitle">Commerce</span>
                </div>
              </div>

              {/* Category Navigation */}
              <nav className="navbar-nav">
                <button
                  className={`nav-item ${
                    selectedCategory === 'all' ? 'active' : ''
                  }`}
                  onClick={() => onCategoryChange('all')}
                >
                  All Products
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`nav-item ${
                      selectedCategory === category ? 'active' : ''
                    }`}
                    onClick={() => onCategoryChange(category)}
                  >
                    {category}
                  </button>
                ))}
              </nav>
            </div>

            {/* Right Side Actions */}
            <div className="navbar-right">
              {/* Cart Button */}
              <button className="cart-button" onClick={onCartClick}>
                <ShoppingCart size={24} />
                {cartItemCount > 0 && (
                  <span className="cart-badge">{cartItemCount}</span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-header">
            <div className="logo">
              <div className="logo-icon">
                <ShoppingBag size={24} />
              </div>
              <div className="logo-text">
                <span className="logo-title">Vibe</span>
                <span className="logo-subtitle">Commerce</span>
              </div>
            </div>
            <button className="mobile-menu-close" onClick={toggleMobileMenu}>
              <X size={24} />
            </button>
          </div>

          <nav className="mobile-nav">
            <button
              className={`mobile-nav-item ${
                selectedCategory === 'all' ? 'active' : ''
              }`}
              onClick={() => {
                onCategoryChange('all');
                setIsMobileMenuOpen(false);
              }}
            >
              All Products
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className={`mobile-nav-item ${
                  selectedCategory === category ? 'active' : ''
                }`}
                onClick={() => {
                  onCategoryChange(category);
                  setIsMobileMenuOpen(false);
                }}
              >
                {category}
              </button>
            ))}
          </nav>

          <div className="mobile-menu-footer">
            {user ? (
              <>
                <div
                  style={{
                    padding: '1rem',
                    borderBottom: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                  }}
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="user-avatar"
                  />
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--dark)' }}>
                      {user.name}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--gray)' }}>
                      {user.email}
                    </div>
                  </div>
                </div>
                <button
                  className="mobile-menu-link"
                  onClick={() => {
                    onWishlistClick();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <Heart size={18} />
                  Wishlist
                </button>
                <button
                  className="mobile-menu-link"
                  onClick={() => {
                    onOrdersClick();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <Package size={18} />
                  My Orders
                </button>
                <button
                  className="mobile-menu-link"
                  onClick={() => {
                    onLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  style={{ color: 'var(--danger)' }}
                >
                  <LogOut size={18} />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button
                  className="mobile-menu-link"
                  onClick={() => {
                    onSignInClick();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <User size={18} />
                  Sign In
                </button>
                <button
                  className="mobile-menu-link"
                  onClick={() => {
                    onWishlistClick();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <Heart size={18} />
                  Wishlist
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;

