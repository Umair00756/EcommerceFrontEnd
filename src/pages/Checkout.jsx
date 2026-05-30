import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { ChevronRight, CreditCard, Truck, ShieldCheck } from 'lucide-react';
import { orderApi } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Checkout = () => {
    const { cart, cartTotal, clearCart } = useCart();
    const { user, isAuthenticated } = useAuth();
    const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Review
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        address: '',
        city: '',
        phone: ''
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError('');

        if (!isAuthenticated) {
            setError('Please login to place an order');
            setLoading(false);
            return;
        }

        try {
            await orderApi.createOrder({
                items: cart.map(item => ({
                    productId: item.id,
                    quantity: item.quantity,
                    price: item.price,
                    size: item.size
                })),
                totalAmount: cartTotal,
                shippingAddress: `${formData.address}, ${formData.city}. Phone: ${formData.phone}`
            });

            setStep(3);
            clearCart();
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    };

    if (cart.length === 0 && step !== 3) {
        return (
            <div className="container py-5 mt-5 text-center">
                <h2 className="font-serif mb-4">Your basket is empty</h2>
                <Link to="/" className="btn btn-dark rounded-0 px-5 py-3">CONTINUE SHOPPING</Link>
            </div>
        );
    }

    return (
        <div className="bg-white min-vh-100 py-5 mt-5">
            <div className="container">
                <div className="row g-5">
                    {/* Left Side: Forms */}
                    <div className="col-lg-7">
                        {error && <div className="alert alert-danger rounded-0 small text-uppercase mb-4">{error}</div>}

                        <div className="d-flex align-items-center gap-2 mb-5 small text-uppercase fw-bold text-muted">
                            <span className={step >= 1 ? 'text-dark' : ''}>Shipping</span>
                            <ChevronRight size={14} />
                            <span className={step >= 2 ? 'text-dark' : ''}>Payment</span>
                            <ChevronRight size={14} />
                            <span className={step >= 3 ? 'text-dark' : ''}>Review</span>
                        </div>

                        {step === 1 && (
                            <div className="fade-in">
                                <h2 className="h4 text-uppercase fw-bold mb-4 font-serif" style={{ letterSpacing: '1px' }}>Shipping Information</h2>
                                <form className="row g-3" onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                                    <div className="col-md-6">
                                        <label className="form-label small text-uppercase fw-bold">First Name</label>
                                        <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="form-control rounded-0 border-dark py-2" required />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small text-uppercase fw-bold">Last Name</label>
                                        <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="form-control rounded-0 border-dark py-2" required />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label small text-uppercase fw-bold">Address</label>
                                        <input type="text" name="address" value={formData.address} onChange={handleInputChange} className="form-control rounded-0 border-dark py-2" placeholder="Street address, P.O. box, etc." required />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small text-uppercase fw-bold">City</label>
                                        <input type="text" name="city" value={formData.city} onChange={handleInputChange} className="form-control rounded-0 border-dark py-2" required />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small text-uppercase fw-bold">Phone</label>
                                        <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="form-control rounded-0 border-dark py-2" placeholder="03-- -------" required />
                                    </div>
                                    <div className="col-12 mt-5">
                                        <button
                                            type="submit"
                                            className="btn btn-dark w-100 rounded-0 py-3 text-uppercase fw-bold"
                                            style={{ letterSpacing: '2px' }}
                                        >
                                            Continue to Payment
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="fade-in">
                                <h2 className="h4 text-uppercase fw-bold mb-4 font-serif" style={{ letterSpacing: '1px' }}>Payment Method</h2>
                                <div className="border border-dark p-4 mb-4 bg-beige border-opacity-25">
                                    <div className="form-check mb-3">
                                        <input className="form-check-input border-dark" type="radio" name="payment" id="cod" checked readOnly />
                                        <label className="form-check-label fw-bold text-uppercase small" htmlFor="cod">
                                            Cash on Delivery (COD)
                                        </label>
                                    </div>
                                    <div className="form-check opacity-50">
                                        <input className="form-check-input border-dark" type="radio" name="payment" id="card" disabled />
                                        <label className="form-check-label fw-bold text-uppercase small" htmlFor="card">
                                            Credit/Debit Card (Coming Soon)
                                        </label>
                                    </div>
                                </div>
                                <div className="d-flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="btn btn-outline-dark w-50 rounded-0 py-3 text-uppercase fw-bold"
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleSubmit}
                                        className="btn btn-dark w-50 rounded-0 py-3 text-uppercase fw-bold"
                                        disabled={loading}
                                    >
                                        {loading ? 'Processing...' : 'Complete Purchase'}
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="fade-in text-center py-5 shadow-sm border p-4">
                                <ShieldCheck size={64} className="text-success mb-4" />
                                <h2 className="h3 font-serif fw-bold mb-3">THANK YOU FOR YOUR ORDER</h2>
                                <p className="text-muted mb-5">Your order has been placed successfully. A confirmation email has been sent to you.</p>
                                <Link to="/" className="btn btn-dark rounded-0 px-5 py-3 text-uppercase fw-bold" style={{ letterSpacing: '2px' }}>
                                    Back to Home
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Right Side: Order Summary */}
                    <div className="col-lg-5">
                        <div className="bg-beige p-4 sticky-top border-gold border-opacity-25" style={{ top: '100px', border: '1px solid' }}>
                            <h3 className="h6 text-uppercase fw-bold mb-4 font-serif" style={{ letterSpacing: '1px' }}>Order Summary</h3>
                            <div className="d-flex flex-column gap-3 mb-4">
                                {cart.map(item => (
                                    <div key={`${item.id}-${item.size}`} className="d-flex gap-3 align-items-center">
                                        <div className="position-relative">
                                            <img src={item.images[0]} alt={item.name} className="object-fit-cover border" width="60" height="80" />
                                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
                                                {item.quantity}
                                            </span>
                                        </div>
                                        <div className="flex-grow-1">
                                            <h4 className="small fw-bold text-uppercase mb-0" style={{ fontSize: '0.75rem' }}>{item.name}</h4>
                                            <p className="small text-muted mb-0">{item.size}</p>
                                        </div>
                                        <span className="small fw-bold">PKR {item.price.toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>

                            <hr className="border-dark opacity-10" />

                            <div className="d-flex justify-content-between mb-2">
                                <span className="small text-uppercase">Subtotal</span>
                                <span className="small fw-bold">PKR {cartTotal.toLocaleString()}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-4">
                                <span className="small text-uppercase">Shipping</span>
                                <span className="small fw-bold text-success">FREE</span>
                            </div>

                            <div className="d-flex justify-content-between align-items-center pt-3 border-top border-dark">
                                <span className="text-uppercase fw-bold">Total</span>
                                <span className="h4 font-serif fw-bold mb-0">PKR {cartTotal.toLocaleString()}</span>
                            </div>

                            <div className="mt-5 d-flex flex-column gap-3">
                                <div className="d-flex align-items-center gap-3 text-muted" style={{ fontSize: '0.75rem' }}>
                                    <Truck size={18} />
                                    <span>Fast delivery within 3-5 working days.</span>
                                </div>
                                <div className="d-flex align-items-center gap-3 text-muted" style={{ fontSize: '0.75rem' }}>
                                    <CreditCard size={18} />
                                    <span>Secure checkout with SSL encryption.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
