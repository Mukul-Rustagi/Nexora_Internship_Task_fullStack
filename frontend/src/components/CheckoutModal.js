import React, { useState } from 'react';
import { X, CreditCard, User, Mail } from 'lucide-react';

function CheckoutModal({ isOpen, onClose, cart, onSubmit }) {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.customerName || !formData.customerEmail) {
      alert('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      setFormData({ customerName: '', customerEmail: '' });
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal">
        <div className="modal-header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 className="modal-title">
              <CreditCard size={28} style={{ marginRight: '0.5rem' }} />
              Checkout
            </h2>
            <button
              onClick={onClose}
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'white',
              }}
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1rem' }}>
              Order Summary
            </h3>
            
            <div style={{
              background: 'var(--light-gray)',
              padding: '1rem',
              borderRadius: 'var(--radius)',
              marginBottom: '1.5rem',
            }}>
              {cart.items.map((item) => (
                <div
                  key={item.productId}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '0.5rem 0',
                  }}
                >
                  <span>{item.name} × {item.quantity}</span>
                  <span style={{ fontWeight: 600 }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
              <div
                style={{
                  borderTop: '2px solid var(--border)',
                  marginTop: '0.75rem',
                  paddingTop: '0.75rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '1.25rem',
                  fontWeight: '800',
                }}
              >
                <span>Total:</span>
                <span style={{ color: 'var(--primary)' }}>
                  ${cart.totalAmount.toFixed(2)}
                </span>
              </div>
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1rem' }}>
              Your Information
            </h3>

            <div className="form-group">
              <label className="form-label">
                <User size={18} style={{ marginRight: '0.5rem' }} />
                Full Name
              </label>
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                className="form-input"
                placeholder="John Doe"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <Mail size={18} style={{ marginRight: '0.5rem' }} />
                Email Address
              </label>
              <input
                type="email"
                name="customerEmail"
                value={formData.customerEmail}
                onChange={handleChange}
                className="form-input"
                placeholder="john@example.com"
                required
              />
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CheckoutModal;

