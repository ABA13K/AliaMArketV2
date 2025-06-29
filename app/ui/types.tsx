// types/index.ts
export interface CartItem {
    id: string;
    name: string;
    img: string;
    price: number;
    quantity: number;
    color?: string;
    size?: string;
  }
  
  export interface CartContextType {
    cart: CartItem[];
    cartTotal: number;
    addToCart: (item: Omit<CartItem, 'quantity'>) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
  }