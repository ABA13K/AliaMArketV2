'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type CartItem = {
  id: string | number;
  name: string;
  price: string;
  img: string;
  quantity: number;
  color?: string;
  size?: string;
  oldPrice?: string;
  category?: string;
};

type FavoriteItem = {
  id: string | number;
  name: string;
  price: string;
  img: string;
  oldPrice?: string;
  category?: string;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (productId: string | number, color?: string, size?: string) => void;
  updateQuantity: (productId: string | number, color: string | undefined, size: string | undefined, newQuantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  applyDiscount: (percentage: number) => void;
  discount: number;
  favorites: FavoriteItem[];
  toggleFavorite: (product: FavoriteItem) => void;
  isFavorite: (productId: string | number) => boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [discount, setDiscount] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart and favorites from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedFavorites = localStorage.getItem('favorites');

    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed)) {
          setCart(parsed);
        }
      } catch (e) {
        console.error('Failed to parse cart data:', e);
        localStorage.removeItem('cart');
      }
    }

    if (savedFavorites) {
      try {
        const parsed = JSON.parse(savedFavorites);
        if (Array.isArray(parsed)) {
          setFavorites(parsed);
        }
      } catch (e) {
        console.error('Failed to parse favorites data:', e);
        localStorage.removeItem('favorites');
      }
    }

    setIsInitialized(true);
  }, []);

  // Save cart and favorites to localStorage
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('cart', JSON.stringify(cart));
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [cart, favorites, isInitialized]);

  const addToCart = (product: CartItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => 
        item.id === product.id && 
        item.color === product.color && 
        item.size === product.size
      );
      
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id && 
          item.color === product.color && 
          item.size === product.size
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      } else {
        return [...prevCart, {
          ...product,
          color: product.color || 'default',
          size: product.size || 'default'
        }];
      }
    });
  };

  const removeFromCart = (productId: string | number, color?: string, size?: string) => {
    setCart(prevCart => 
      prevCart.filter(item => 
        !(item.id === productId && 
          item.color === color && 
          item.size === size)
      )
    );
  };

  const updateQuantity = (productId: string | number, color: string | undefined, size: string | undefined, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId && 
        item.color === color && 
        item.size === size
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setDiscount(0);
    localStorage.setItem('cart', JSON.stringify([]));
  };

  const applyDiscount = (percentage: number) => {
    setDiscount(percentage);
  };

  const toggleFavorite = (product: FavoriteItem) => {
    setFavorites(prevFavorites => {
      const isFavorite = prevFavorites.some(item => item.id === product.id);
      if (isFavorite) {
        return prevFavorites.filter(item => item.id !== product.id);
      } else {
        return [...prevFavorites, product];
      }
    });
  };

  const isFavorite = (productId: string | number) => {
    return favorites.some(item => item.id === productId);
  };

  const parsePrice = (priceString: string): number => {
    return parseFloat(priceString.replace(/[^0-9.]/g, ''));
  };

  const cartTotal = cart.reduce(
    (total, item) => total + (parsePrice(item.price) * item.quantity),
    0
  );

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart,
        cartTotal,
        cartCount,
        applyDiscount,
        discount,
        favorites,
        toggleFavorite,
        isFavorite
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}