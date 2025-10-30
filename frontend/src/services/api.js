import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Products API
export const getProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};

// Cart API
export const getCart = async () => {
  const response = await api.get('/cart');
  return response.data;
};

export const addToCart = async (productId, quantity = 1) => {
  const response = await api.post('/cart', { productId, quantity });
  return response.data;
};

export const updateCartItem = async (productId, quantity) => {
  const response = await api.put(`/cart/${productId}`, { quantity });
  return response.data;
};

export const removeFromCart = async (productId) => {
  const response = await api.delete(`/cart/${productId}`);
  return response.data;
};

// Checkout API
export const checkout = async (customerName, customerEmail, cartItems, userId = null) => {
  const response = await api.post('/orders/checkout', {
    customerName,
    customerEmail,
    cartItems,
    userId,
  });
  return response.data;
};

// Orders API
export const getUserOrders = async (userId) => {
  const response = await api.get(`/orders/user/${userId}`);
  return response.data;
};

export default api;

