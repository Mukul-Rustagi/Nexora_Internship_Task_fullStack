import React from 'react';

function ProductSkeleton() {
  return (
    <div className="card">
      <div className="skeleton skeleton-image" />
      <div style={{ padding: '1.5rem' }}>
        <div className="skeleton skeleton-text" style={{ width: '40%', marginBottom: '0.5rem' }} />
        <div className="skeleton skeleton-text" style={{ marginBottom: '0.5rem' }} />
        <div className="skeleton skeleton-text short" style={{ marginBottom: '1rem' }} />
        <div className="skeleton skeleton-text" style={{ width: '30%', marginBottom: '1rem' }} />
        <div className="skeleton skeleton-button" />
      </div>
    </div>
  );
}

export default ProductSkeleton;

