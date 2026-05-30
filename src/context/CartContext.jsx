import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Load cart from local storage on mount
    useEffect(() => {
        try {
            const savedCart = localStorage.getItem('baroque-cart');
            if (savedCart) {
                setCart(JSON.parse(savedCart));
            }
        } catch (error) {
            console.error("Failed to parse cart from localStorage", error);
        }
    }, []);

    // Save cart to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem('baroque-cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product, size, quantity = 1) => {
        setCart((prevCart) => {
            const existingItemIndex = prevCart.findIndex(
                (item) => item.id === product.id && item.size === size
            );

            if (existingItemIndex > -1) {
                const newCart = [...prevCart];
                newCart[existingItemIndex].quantity += quantity;
                return newCart;
            } else {
                return [...prevCart, { ...product, size, quantity }];
            }
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (productId, size) => {
        setCart((prevCart) =>
            prevCart.filter((item) => !(item.id === productId && item.size === size))
        );
    };

    const updateQuantity = (productId, size, quantity) => {
        if (quantity < 1) return;
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === productId && item.size === size
                    ? { ...item, quantity }
                    : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('baroque-cart');
    };

    const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cart,
                isCartOpen,
                setIsCartOpen,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartTotal,
                cartCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
