import React from 'react';
import { X, Heart, ShoppingCart, PackageX, Plus, Trash2 } from 'lucide-react';

function WishlistDrawer({ isOpen, onClose, wishlistItems, onAddToCart, onRemoveItem, isAdding }) {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="cart-drawer-overlay" onClick={handleOverlayClick}>
      <div className="cart-drawer wishlist-drawer">
        {/* Header */}
        <div className="cart-header">
          <div className="cart-header-content">
            <h2 className="cart-title">
              <Heart size={28} />
              My Wishlist
            </h2>
            <button className="close-cart-btn" onClick={onClose}>
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="cart-body">
          {wishlistItems.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-cart-icon">
                <PackageX size={60} />
              </div>
              <h3>Your wishlist is empty</h3>
              <p>Save your favorite products here!</p>
              <button className="btn btn-primary" onClick={onClose}>
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {wishlistItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-image"
                  />
                  <div className="cart-item-content">
                    <div className="cart-item-header">
                      <div>
                        <div className="cart-item-name">{item.name}</div>
                        <div className="cart-item-price">
                          ${item.price.toFixed(2)}
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 'auto',
                        gap: '0.5rem',
                      }}
                    >
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => onAddToCart(item, 1)}
                        disabled={isAdding === item.id}
                        style={{ flex: 1 }}
                      >
                        <Plus size={16} />
                        {isAdding === item.id ? 'Adding...' : 'Add to Cart'}
                      </button>
                      <button
                        className="remove-item-btn btn-sm"
                        onClick={() => onRemoveItem(item.id)}
                        style={{ flexShrink: 0 }}
                      >
                        <Trash2 size={16} />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default WishlistDrawer;

