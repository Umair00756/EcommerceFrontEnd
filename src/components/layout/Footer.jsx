import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white border-top border-light pt-5 pb-4 text-dark mt-auto">
            <div className="container py-4">
                <div className="row g-4 mb-5">
                    {/* About */}
                    <div className="col-12 col-md-6 col-lg-3">
                        <h3 className="h6 font-serif fw-bold mb-4 text-uppercase" style={{ letterSpacing: '1px' }}>ABOUT</h3>
                        <ul className="list-unstyled d-flex flex-column gap-2 small text-secondary">
                            <li><Link to="/about#who-we-are" className="text-decoration-none text-secondary hover-text-gold">Who We Are</Link></li>
                            <li><Link to="/about#our-responsibility" className="text-decoration-none text-secondary hover-text-gold">Our Responsibility</Link></li>
                            <li><Link to="/about#services" className="text-decoration-none text-secondary hover-text-gold">Service We Provide</Link></li>
                            <li><Link to="/about#careers" className="text-decoration-none text-secondary hover-text-gold">Careers</Link></li>
                            <li><Link to="/about#legal-policy" className="text-decoration-none text-secondary hover-text-gold">Legal Policy</Link></li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div className="col-12 col-md-6 col-lg-3">
                        <h3 className="h6 font-serif fw-bold mb-4 text-uppercase" style={{ letterSpacing: '1px' }}>CUSTOMER SERVICE</h3>
                        <ul className="list-unstyled d-flex flex-column gap-2 small text-secondary">
                            <li><Link to="/policies#contact-us" className="text-decoration-none text-secondary hover-text-gold">Contact Us</Link></li>
                            <li><Link to="/policies#dispatch-timeline" className="text-decoration-none text-secondary hover-text-gold">Dispatch Timeline</Link></li>
                            <li><a href="mailto:info@baroque.pk" className="text-decoration-none text-secondary hover-text-gold">Email: info@baroque.pk</a></li>
                            <li><a href="tel:+923001234567" className="text-decoration-none text-secondary hover-text-gold">Call: +92 300 1234567</a></li>
                        </ul>
                    </div>

                    {/* Policy */}
                    <div className="col-12 col-md-6 col-lg-3">
                        <h3 className="h6 font-serif fw-bold mb-4 text-uppercase" style={{ letterSpacing: '1px' }}>POLICIES</h3>
                        <ul className="list-unstyled d-flex flex-column gap-2 small text-secondary">
                            <li><Link to="/policies#privacy-policy" className="text-decoration-none text-secondary hover-text-gold">Privacy Policy</Link></li>
                            <li><Link to="/policies#refund-policy" className="text-decoration-none text-secondary hover-text-gold">Refund Policy</Link></li>
                            <li><Link to="/policies#shipping-policy" className="text-decoration-none text-secondary hover-text-gold">Shipping Policy</Link></li>
                            <li><Link to="/policies#terms-of-service" className="text-decoration-none text-secondary hover-text-gold">Terms of Service</Link></li>
                            <li><Link to="/policies#exchange-information" className="text-decoration-none text-secondary hover-text-gold">Exchange Information</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="col-12 col-md-6 col-lg-3">
                        <h3 className="h6 font-serif fw-bold mb-4 text-uppercase" style={{ letterSpacing: '1px' }}>NEWSLETTER</h3>
                        <p className="small text-secondary mb-4">
                            Sign up for exclusive offers, original stories, events and more.
                        </p>
                        <div className="d-flex border-bottom border-dark pb-2 mb-4">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="form-control border-0 bg-transparent p-0 shadow-none small"
                            />
                            <button className="btn btn-link text-dark text-decoration-none fw-bold text-uppercase p-0 small">
                                Subscribe
                            </button>
                        </div>
                        <div className="d-flex gap-3">
                            <a href="#" className="text-dark hover:text-secondary"><Facebook size={20} /></a>
                            <a href="#" className="text-dark hover:text-secondary"><Instagram size={20} /></a>
                            <a href="#" className="text-dark hover:text-secondary"><Youtube size={20} /></a>
                        </div>
                    </div>
                </div>

                <div className="text-center small text-secondary pt-4 border-top border-light">
                    <p className="mb-0">© {new Date().getFullYear()} BAROQUE. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
