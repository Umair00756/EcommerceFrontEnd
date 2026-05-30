import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import ProductListing from './pages/ProductListing';
import ProductDetail from './pages/ProductDetail';
import CartDrawer from './components/cart/CartDrawer';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Auth from './pages/Auth';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Policies from './pages/Policies';

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<Home />} />
                            <Route path="category/:categoryId" element={<ProductListing />} />
                            <Route path="special-prices" element={<Navigate to="/category/special-prices" replace />} />
                            <Route path="product/:slug" element={<ProductDetail />} />
                            <Route path="auth" element={<Auth />} />
                            <Route path="checkout" element={<Checkout />} />
                            <Route path="about" element={<About />} />
                            <Route path="policies" element={<Policies />} />
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Route>
                    </Routes>
                    <CartDrawer />
                </Router>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;
