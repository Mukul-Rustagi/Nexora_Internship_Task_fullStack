import React from 'react';
import { X, CheckCircle, Calendar, Mail, User } from 'lucide-react';

function ReceiptModal({ isOpen, onClose, receipt }) {
  if (!isOpen || !receipt) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal">
        <div className="modal-body">
          <div className="receipt-header">
            <div className="receipt-icon">
              <CheckCircle size={40} />
            </div>
            <h2 className="receipt-title">Order Confirmed!</h2>
            <p className="receipt-order-id">Order ID: {receipt.orderId}</p>
            <p style={{ color: 'var(--success)', fontWeight: 600, marginTop: '0.5rem' }}>
              {receipt.message}
            </p>
          </div>

          <div
            style={{
              background: 'var(--light-gray)',
              padding: '1.5rem',
              borderRadius: 'var(--radius-lg)',
              marginBottom: '2rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <User size={18} color="var(--primary)" />
              <span style={{ fontWeight: 600 }}>Customer:</span>
              <span>{receipt.customerName}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <Mail size={18} color="var(--primary)" />
              <span style={{ fontWeight: 600 }}>Email:</span>
              <span>{receipt.customerEmail}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calendar size={18} color="var(--primary)" />
              <span style={{ fontWeight: 600 }}>Order Date:</span>
              <span>{formatDate(receipt.orderDate)}</span>
            </div>
          </div>

          <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1rem' }}>
            Order Items
          </h3>

          <div className="receipt-items">
            {receipt.items.map((item, index) => (
              <div key={index} className="receipt-item">
                <div>
                  <div style={{ fontWeight: 600 }}>{item.name}</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--gray)' }}>
                    ${item.price.toFixed(2)} × {item.quantity}
                  </div>
                </div>
                <div style={{ fontWeight: 700, color: 'var(--primary)' }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="receipt-total">
            <span>Total Amount:</span>
            <span style={{ color: 'var(--primary)' }}>
              ${receipt.totalAmount.toFixed(2)}
            </span>
          </div>

          <div
            style={{
              background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
              color: 'white',
              padding: '1.5rem',
              borderRadius: 'var(--radius-lg)',
              marginTop: '2rem',
              textAlign: 'center',
            }}
          >
            <p style={{ fontWeight: 600, marginBottom: '0.5rem' }}>
              Estimated Delivery
            </p>
            <p style={{ fontSize: '1.25rem', fontWeight: '700' }}>
              {formatDate(receipt.estimatedDelivery)}
            </p>
          </div>

          <button
            className="btn btn-primary"
            onClick={onClose}
            style={{ width: '100%', marginTop: '1.5rem' }}
          >
            <X size={20} />
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReceiptModal;

