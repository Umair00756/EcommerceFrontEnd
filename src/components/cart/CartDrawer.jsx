import React from 'react';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { Offcanvas, Button } from 'react-bootstrap';

const CartDrawer = () => {
    const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal } = useCart();

    return (
        <Offcanvas
            show={isCartOpen}
            onHide={() => setIsCartOpen(false)}
            placement="end"
            style={{ width: '400px' }}
        >
            <Offcanvas.Header className="border-bottom p-4">
                <Offcanvas.Title className="font-serif fw-bold text-uppercase d-flex align-items-center gap-2" style={{ letterSpacing: '1px' }}>
                    <ShoppingBag size={20} /> Shopping Cart
                </Offcanvas.Title>
                <button
                    type="button"
                    className="btn-close shadow-none"
                    onClick={() => setIsCartOpen(false)}
                ></button>
            </Offcanvas.Header>
            <Offcanvas.Body className="d-flex flex-column p-0">
                <div className="flex-grow-1 overflow-auto p-4 no-scrollbar">
                    {cart.length === 0 ? (
                        <div className="h-100 d-flex flex-column align-items-center justify-content-center text-secondary py-5">
                            <ShoppingBag size={48} className="mb-3 opacity-25" />
                            <p className="mb-4">Your cart is empty.</p>
                            <Button
                                variant="dark"
                                className="text-uppercase rounded-0 px-4 py-2"
                                style={{ fontSize: '0.75rem', letterSpacing: '1px' }}
                                onClick={() => setIsCartOpen(false)}
                            >
                                Continue Shopping
                            </Button>
                        </div>
                    ) : (
                        <div className="d-flex flex-column gap-4">
                            {cart.map((item) => (
                                <div key={`${item.id}-${item.size}`} className="d-flex gap-3">
                                    <div className="bg-light flex-shrink-0" style={{ width: '90px', height: '120px' }}>
                                        <img
                                            src={item.images[0]}
                                            alt={item.name}
                                            className="w-100 h-100 object-fit-cover"
                                        />
                                    </div>
                                    <div className="flex-grow-1 d-flex flex-column justify-content-between">
                                        <div>
                                            <div className="d-flex justify-content-between align-items-start">
                                                <h3 className="h6 font-serif fw-bold mb-1 text-uppercase" style={{ fontSize: '0.85rem' }}>{item.name}</h3>
                                                <button
                                                    onClick={() => removeFromCart(item.id, item.size)}
                                                    className="btn btn-link p-0 text-secondary hover-text-danger shadow-none"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                            <p className="small text-muted mb-1" style={{ fontSize: '0.75rem' }}>Size: {item.size}</p>
                                            <p className="small fw-bold mb-0">PKR {item.price.toLocaleString()}</p>
                                        </div>

                                        <div className="d-flex align-items-center gap-3 border px-2 py-1 mt-2" style={{ width: 'fit-content' }}>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                                                className="btn btn-sm p-0 border-0 d-flex align-items-center shadow-none"
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="small fw-bold px-1" style={{ minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                                                className="btn btn-sm p-0 border-0 d-flex align-items-center shadow-none"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="p-4 border-top bg-beige">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <span className="small text-uppercase fw-bold text-muted" style={{ letterSpacing: '1px' }}>Subtotal</span>
                            <span className="h5 font-serif fw-bold mb-0">PKR {cartTotal.toLocaleString()}</span>
                        </div>
                        <p className="small text-secondary mb-4" style={{ fontSize: '0.7rem', lineHeight: '1.4' }}>
                            Taxes and shipping are calculated at checkout. Free shipping on orders over PKR 5,000.
                        </p>
                        <Button
                            as={Link}
                            to="/checkout"
                            variant="dark"
                            className="w-100 py-3 text-uppercase fw-bold rounded-0 d-flex align-items-center justify-content-center text-decoration-none"
                            style={{ letterSpacing: '2px', fontSize: '0.85rem' }}
                            onClick={() => setIsCartOpen(false)}
                        >
                            Proceed to Checkout
                        </Button>
                    </div>
                )}
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default CartDrawer;
