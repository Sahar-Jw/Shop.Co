import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return action.payload;
    case 'UPDATE_ITEM':
      return state.map(item => item.id === action.payload.id ? action.payload : item);
    case 'REMOVE_ITEM':
      return state.filter(item => item.id !== action.payload.id);
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, [], () => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const updateCartItem = (id, newQuantity) => {
    const item = cart.find(item => item.id === id);
    if (item) {
      dispatch({ type: 'UPDATE_ITEM', payload: { ...item, quantity: newQuantity } });
    }
  };

  const removeCartItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const setCart = (newCart) => {
    dispatch({ type: 'SET_CART', payload: newCart });
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, totalItems, updateCartItem, removeCartItem, clearCart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

