import React, { useState } from 'react';
import { X, Star, ShoppingCart, Plus, Minus } from 'lucide-react';

function ProductQuickView({ product, isOpen, onClose, onAddToCart, isAdding }) {
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !product) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal" style={{ maxWidth: '800px' }}>
        <div className="modal-body">
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'var(--light-gray)',
              border: 'none',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'var(--transition)',
            }}
          >
            <X size={24} />
          </button>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            {/* Product Image */}
            <div>
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: '100%',
                  height: '400px',
                  objectFit: 'cover',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--light-gray)',
                }}
              />
            </div>

            {/* Product Details */}
            <div>
              <div className="product-category" style={{ marginBottom: '0.5rem' }}>
                {product.category}
              </div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '1rem' }}>
                {product.name}
              </h2>

              {product.rating && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '1rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Star size={20} fill="currentColor" color="var(--warning)" />
                    <span style={{ fontWeight: 700 }}>{product.rating.rate}</span>
                  </div>
                  <span style={{ color: 'var(--gray)' }}>
                    ({product.rating.count} reviews)
                  </span>
                </div>
              )}

              <div
                style={{
                  fontSize: '2rem',
                  fontWeight: '800',
                  color: 'var(--primary)',
                  marginBottom: '1.5rem',
                }}
              >
                ${product.price.toFixed(2)}
              </div>

              <p
                style={{
                  color: 'var(--gray)',
                  lineHeight: '1.8',
                  marginBottom: '2rem',
                }}
              >
                {product.description}
              </p>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>
                  Quantity:
                </label>
                <div className="quantity-controls" style={{ display: 'inline-flex' }}>
                  <button className="quantity-btn" onClick={decrementQuantity}>
                    <Minus size={16} />
                  </button>
                  <span className="quantity-display">{quantity}</span>
                  <button className="quantity-btn" onClick={incrementQuantity}>
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <button
                className="btn btn-primary"
                onClick={handleAddToCart}
                disabled={isAdding}
                style={{ width: '100%' }}
              >
                <ShoppingCart size={20} />
                {isAdding ? 'Adding...' : `Add ${quantity} to Cart`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductQuickView;

