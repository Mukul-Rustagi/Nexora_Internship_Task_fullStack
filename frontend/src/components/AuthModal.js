import React, { useState } from 'react';
import { X, User, Mail, Lock, Eye, EyeOff, LogIn, UserPlus } from 'lucide-react';

function AuthModal({ isOpen, onClose, onSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isLogin) {
      if (!formData.email || !formData.password) {
        alert('Please fill in all fields');
        return;
      }
    } else {
      if (!formData.name || !formData.email || !formData.password) {
        alert('Please fill in all fields');
        return;
      }
      if (formData.password.length < 6) {
        alert('Password must be at least 6 characters');
        return;
      }
    }

    setIsSubmitting(true);
    try {
      await onSuccess(formData, isLogin);
      setFormData({ name: '', email: '', password: '' });
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ name: '', email: '', password: '' });
    setShowPassword(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal" style={{ maxWidth: '480px' }}>
        <div className="auth-modal-header">
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
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
          <div style={{ marginBottom: '1rem' }}>
            {isLogin ? <LogIn size={48} /> : <UserPlus size={48} />}
          </div>
          <h2 className="auth-modal-title">
            {isLogin ? 'Welcome Back!' : 'Create Account'}
          </h2>
          <p className="auth-modal-subtitle">
            {isLogin
              ? 'Sign in to access your wishlist and orders'
              : 'Join us for an amazing shopping experience'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <label className="form-label">
                <User size={18} style={{ marginRight: '0.5rem' }} />
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                placeholder="John Doe"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label">
              <Mail size={18} style={{ marginRight: '0.5rem' }} />
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              placeholder="john@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <Lock size={18} style={{ marginRight: '0.5rem' }} />
              Password
            </label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                placeholder="••••••••"
                required
                minLength={6}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {!isLogin && (
              <p className="form-hint">Password must be at least 6 characters</p>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
            style={{ width: '100%', marginTop: '1rem' }}
          >
            {isSubmitting
              ? 'Processing...'
              : isLogin
              ? 'Sign In'
              : 'Create Account'}
          </button>
        </form>

        <div className="auth-toggle">
          <p>
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              type="button"
              className="auth-toggle-btn"
              onClick={toggleMode}
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthModal;

