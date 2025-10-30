import React from 'react';
import { ShoppingCart, Star, Eye } from 'lucide-react';

function ProductCard({ product, onAddToCart, onQuickView, isAdding }) {
  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart(product, 1);
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    onQuickView(product);
  };

  return (
    <div className="product-card">
      <div className="product-image-container" onClick={handleQuickView}>
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />
        {product.rating && (
          <div className="product-badge">
            <Star size={14} fill="currentColor" />
            {product.rating.rate}
          </div>
        )}
        <div className="product-overlay">
          <button className="quick-view-btn" onClick={handleQuickView}>
            <Eye size={20} />
            Quick View
          </button>
        </div>
      </div>

      <div className="product-content">
        <div className="product-category">{product.category}</div>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>

        <div className="product-footer">
          <div className="product-price">${product.price.toFixed(2)}</div>
          {product.rating && (
            <div className="product-rating">
              <Star size={16} fill="currentColor" />
              <span>{product.rating.rate}</span>
              <span>({product.rating.count})</span>
            </div>
          )}
        </div>

        <button
          className="add-to-cart-btn"
          onClick={handleAddToCart}
          disabled={isAdding}
        >
          <ShoppingCart size={20} />
          {isAdding ? 'Adding...' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;

