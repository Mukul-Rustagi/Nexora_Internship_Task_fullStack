import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingCart, PackageX, CreditCard } from 'lucide-react';

function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="cart-drawer-overlay" onClick={handleOverlayClick}>
      <div className="cart-drawer">
        {/* Header */}
        <div className="cart-header">
          <div className="cart-header-content">
            <h2 className="cart-title">
              <ShoppingCart size={28} />
              Shopping Cart
            </h2>
            <button className="close-cart-btn" onClick={onClose}>
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="cart-body">
          {cart.items.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-cart-icon">
                <PackageX size={60} />
              </div>
              <h3>Your cart is empty</h3>
              <p>Add some products to get started!</p>
              <button className="btn btn-primary" onClick={onClose}>
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {cart.items.map((item) => (
                <div key={item.productId} className="cart-item">
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
                          ${item.price.toFixed(2)} each
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 'auto',
                      }}
                    >
                      <div className="quantity-controls">
                        <button
                          className="quantity-btn"
                          onClick={() =>
                            onUpdateQuantity(item.productId, item.quantity - 1)
                          }
                          disabled={item.quantity === 1}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="quantity-display">{item.quantity}</span>
                        <button
                          className="quantity-btn"
                          onClick={() =>
                            onUpdateQuantity(item.productId, item.quantity + 1)
                          }
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <button
                        className="remove-item-btn"
                        onClick={() => onRemoveItem(item.productId)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: '1.125rem',
                        color: 'var(--primary)',
                        marginTop: '0.5rem',
                      }}
                    >
                      Total: ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Footer */}
        {cart.items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total:</span>
              <span className="cart-total-amount">
                ${cart.totalAmount.toFixed(2)}
              </span>
            </div>
            <button className="checkout-btn" onClick={onCheckout}>
              <CreditCard size={24} />
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartDrawer;

