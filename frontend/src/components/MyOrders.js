import React from 'react';
import { X, Package, Calendar, Truck, CheckCircle } from 'lucide-react';

function MyOrders({ isOpen, onClose, orders }) {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const formatOrderDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle size={18} style={{ color: 'var(--success)' }} />;
      case 'shipped':
        return <Truck size={18} style={{ color: 'var(--info)' }} />;
      case 'delivered':
        return <Package size={18} style={{ color: 'var(--primary)' }} />;
      default:
        return null;
    }
  };

  return (
    <div className="cart-drawer-overlay" onClick={handleOverlayClick}>
      <div className="cart-drawer my-orders-drawer">
        {/* Header */}
        <div className="cart-header">
          <div className="cart-header-content">
            <h2 className="cart-title">
              <Package size={28} />
              My Orders
            </h2>
            <button className="close-cart-btn" onClick={onClose}>
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="cart-body">
          {orders.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-cart-icon">
                <Package size={60} />
              </div>
              <h3>No orders yet!</h3>
              <p>Start shopping to see your orders here.</p>
              <button className="btn btn-primary" onClick={onClose}>
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="orders-list">
              {orders.map((order) => (
                <div key={order.orderId} className="order-card animate-fade-in">
                  <div className="order-header">
                    <div>
                      <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                        Order ID: {order.orderId}
                      </h3>
                      <p
                        style={{
                          fontSize: '0.875rem',
                          color: 'var(--gray)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                        }}
                      >
                        <Calendar size={14} /> {formatOrderDate(order.orderDate)}
                      </p>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 1rem',
                        background: 'var(--light-gray)',
                        borderRadius: 'var(--radius-full)',
                      }}
                    >
                      {getStatusIcon(order.status)}
                      <span
                        style={{
                          fontWeight: 600,
                          fontSize: '0.875rem',
                          textTransform: 'capitalize',
                        }}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>

                  <div className="order-items">
                    {order.items.map((item) => (
                      <div
                        key={item.productId}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                          padding: '0.75rem',
                          background: 'var(--light-gray)',
                          borderRadius: 'var(--radius)',
                          marginBottom: '0.5rem',
                        }}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{
                            width: '60px',
                            height: '60px',
                            objectFit: 'cover',
                            borderRadius: 'var(--radius)',
                          }}
                        />
                        <div style={{ flex: 1 }}>
                          <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>
                            {item.name}
                          </p>
                          <p style={{ fontSize: '0.875rem', color: 'var(--gray)' }}>
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <p style={{ fontWeight: 700, color: 'var(--primary)' }}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="order-footer">
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '1rem',
                        background: 'var(--light-gray)',
                        borderRadius: 'var(--radius)',
                      }}
                    >
                      <span style={{ fontWeight: 600 }}>Total:</span>
                      <span
                        style={{
                          fontSize: '1.5rem',
                          fontWeight: 800,
                          color: 'var(--primary)',
                        }}
                      >
                        ${order.totalAmount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyOrders;

