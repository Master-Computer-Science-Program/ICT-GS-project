import { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart(prevCart => {
            const existing = prevCart.find(item => item.id === product.id);
            if (existing) {
            // Increase quantity by 1
            return prevCart.map(item =>
                item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
            } else {
            // Add new product with quantity 1
            return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (id) => {
        setCart(prev => prev.filter(p => p.id !== id));
        console.log('Product removed from cart:', id, cart);
    };

    const clearCart = () => {
        setCart([]);
        console.log('Cart cleared');
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
