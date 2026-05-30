import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import clsx from 'clsx';
import Sidebar from './Sidebar';

const TopBanner = () => (
    <div className="bg-black text-white py-1 overflow-hidden position-relative" style={{ height: '35px' }}>
        <div className="scrolling-announcement d-flex align-items-center gap-5">
            {[1, 2, 3].map(i => (
                <span key={i} className="text-uppercase small fw-bold" style={{ letterSpacing: '2px', fontSize: '0.65rem' }}>
                    Free shipping on all orders above PKR 5,000 &bull; Shop the new Chantelle Collection &bull; Secure checkout &bull;
                </span>
            ))}
        </div>
    </div>
);

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { setIsCartOpen, cartCount } = useCart();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`fixed-top transition-all duration-300 ${isScrolled ? 'bg-white shadow-sm' : 'bg-transparent'}`}
            style={{ transition: 'background-color 0.3s ease' }}
        >
            <TopBanner />
            <div className="container-fluid px-4 px-lg-5 h-20 d-flex align-items-center justify-content-between position-relative" style={{ height: '80px' }}>
                <button
                    className={`btn btn-link p-2 text-decoration-none transition-colors ${isScrolled ? 'link-dark' : 'text-white'}`}
                    onClick={() => setIsMobileMenuOpen(true)}
                >
                    <Menu className="w-6 h-6" size={24} />
                </button>

                <Link
                    to="/"
                    className="position-absolute start-50 translate-middle-x d-flex align-items-center"
                    style={{ height: '40px' }}
                >
                    <img
                        src={isScrolled ? "https://baroque.pk/cdn/shop/files/Logo_Jpeg_v01.jpg" : "https://baroque.pk/cdn/shop/files/LOGO_PNG_white_v01.png"}
                        alt="BAROQUE"
                        className="h-100 w-auto object-fit-contain transition-all duration-300"
                        style={{ maxWidth: '180px' }}
                    />
                </Link>

                <div className="d-flex align-items-center gap-3 gap-lg-4">
                    <div className={`h-divider d-none d-lg-block border-end py-2 mx-1 ${isScrolled ? 'border-light' : 'border-white-50'}`} style={{ height: '20px' }}></div>

                    <button className={`btn btn-link p-0 text-decoration-none transition-colors ${isScrolled ? 'link-dark' : 'text-white'}`}>
                        <Search size={20} />
                    </button>
                    <Link to="/auth" className={`d-none d-lg-block btn btn-link p-0 text-decoration-none transition-colors ${isScrolled ? 'link-dark' : 'text-white'}`}>
                        <User size={20} />
                    </Link>
                    <button
                        className={`btn btn-link p-0 text-decoration-none position-relative transition-colors ${isScrolled ? 'link-dark' : 'text-white'}`}
                        onClick={() => setIsCartOpen(true)}
                    >
                        <ShoppingBag size={20} />
                        {cartCount > 0 && (
                            <span className={`position-absolute top-0 start-100 translate-middle badge rounded-pill border border-white ${isScrolled ? 'bg-dark text-white' : 'bg-white text-dark'}`} style={{ fontSize: '0.6rem', marginTop: '-5px', marginLeft: '-5px' }}>
                                {cartCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            <Sidebar
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
            />
        </header>
    );
};

export default Header;
