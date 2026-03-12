import React, { createContext, useState, useContext, useEffect } from 'react';
import API from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load cart from DB if user is logged in, otherwise from localStorage
  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        setLoading(true);
        try {
          const { data } = await API.get('/cart');
          setCartItems(data.items || []);
        } catch (error) {
          console.error('Error fetching cart:', error);
        }
        setLoading(false);
      } else {
        const localCart = localStorage.getItem('cart')
          ? JSON.parse(localStorage.getItem('cart'))
          : [];
        setCartItems(localCart);
      }
    };

    fetchCart();
  }, [user]);

  // Save to localStorage if not logged in
  useEffect(() => {
    if (!user) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems, user]);

  const addToCart = async (product, quantity = 1) => {
    if (user) {
      try {
        const { data } = await API.post('/cart', { productId: product._id, quantity });
        setCartItems(data.items);
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    } else {
      setCartItems((prev) => {
        const existItem = prev.find((x) => x.product === product._id);
        if (existItem) {
          return prev.map((x) =>
            x.product === product._id ? { ...x, quantity: x.quantity + quantity } : x
          );
        } else {
          return [...prev, { 
            product: product._id, 
            quantity, 
            price: product.price, 
            title: product.title, 
            image: product.images[0]?.url 
          }];
        }
      });
    }
  };

  const removeFromCart = async (productId) => {
    if (user) {
      try {
        const { data } = await API.delete(`/cart/${productId}`);
        setCartItems(data.items);
      } catch (error) {
        console.error('Error removing from cart:', error);
      }
    } else {
      setCartItems((prev) => prev.filter((x) => x.product !== productId));
    }
  };

  const clearCart = () => {
    setCartItems([]);
    if (!user) localStorage.removeItem('cart');
  };

  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, loading, addToCart, removeFromCart, clearCart, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
