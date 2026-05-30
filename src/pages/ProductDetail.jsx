import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productApi } from '../services/api';
import { useCart } from '../context/CartContext';
import { Minus, Plus, Heart, Share2, Loader2 } from 'lucide-react';

const ProductDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(0);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const response = await productApi.getProductBySlug(slug);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [slug]);

    if (loading) {
        return (
            <div className="vh-100 d-flex align-items-center justify-content-center">
                <Loader2 className="animate-spin" size={48} />
            </div>
        );
    }

    if (!product) {
        return <div className="pt-5 mt-5 text-center">Product not found</div>;
    }

    const handleAddToCart = () => {
        if (!selectedSize && product.sizes.length > 0) {
            alert('Please select a size');
            return;
        }
        addToCart(product, selectedSize || 'One Size', quantity);
    };

    return (
        <div className="container py-5 mt-5">
            <div className="row g-5">
                <div className="col-12 col-lg-8">
                    <div className="d-flex flex-column-reverse flex-lg-row gap-3">
                        <div className="d-none d-lg-flex flex-column gap-3" style={{ width: '80px' }}>
                            {product.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImage(idx)}
                                    className={`border p-0 ${activeImage === idx ? 'border-dark' : 'border-transparent'}`}
                                >
                                    <img src={img} alt={`Thumb ${idx}`} className="w-100 object-fit-cover" style={{ height: '100px' }} />
                                </button>
                            ))}
                        </div>

                        <div className="flex-grow-1 bg-light position-relative">
                            <img src={product.images[activeImage]} alt={product.name} className="w-100 h-auto object-fit-cover" />
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-4">
                    <div className="sticky-top" style={{ top: '100px', zIndex: 1 }}>
                        <div className="mb-4">
                            <h1 className="h1 font-serif text-uppercase mb-2" style={{ letterSpacing: '4px', fontWeight: '600' }}>{product.name}</h1>
                            <p className="h3 mb-2 text-gold fw-bold">PKR {product.price.toLocaleString()}</p>
                            <p className="small text-secondary text-uppercase" style={{ letterSpacing: '1px' }}>SKU: {product.id}</p>
                        </div>

                        <div className="mb-4">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="small fw-bold text-uppercase">Size</span>
                                <button className="btn btn-link p-0 text-dark small text-decoration-none border-bottom border-dark rounded-0">Size Guide</button>
                            </div>
                            <div className="d-flex gap-2">
                                {product.sizes.map(size => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`btn rounded-0 d-flex align-items-center justify-content-center border ${selectedSize === size ? 'btn-dark' : 'btn-outline-secondary text-dark'}`}
                                        style={{ width: '45px', height: '45px', fontSize: '0.8rem' }}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="d-grid gap-3 mb-4">
                            <div className="d-flex align-items-center border px-3 py-2 w-auto justify-content-between" style={{ maxWidth: '120px' }}>
                                <button className="btn btn-link p-0 text-dark" onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={16} /></button>
                                <span className="mx-2">{quantity}</span>
                                <button className="btn btn-link p-0 text-dark" onClick={() => setQuantity(quantity + 1)}><Plus size={16} /></button>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                className="btn btn-dark py-3 text-uppercase fw-bold rounded-0"
                                style={{ letterSpacing: '2px' }}
                            >
                                Add to Cart
                            </button>
                            <div className="d-flex justify-content-center gap-4 mt-3">
                                <button className="btn btn-link link-dark text-decoration-none small d-flex align-items-center gap-2 hover-text-gold transition-colors"><Heart size={16} /> Wishlist</button>
                                <button className="btn btn-link link-dark text-decoration-none small d-flex align-items-center gap-2 hover-text-gold transition-colors"><Share2 size={16} /> Share</button>
                            </div>
                        </div>

                        <div className="border-top pt-3">
                            <details className="group mb-3 cursor-pointer">
                                <summary className="d-flex justify-content-between align-items-center fw-bold small text-uppercase list-unstyled">
                                    Description <Plus className="group-open-hidden" size={16} />
                                </summary>
                                <div className="small text-secondary mt-3 lh-lg">
                                    <p>Elevate your style with our premium collection. Featured intricate embroidery and high-quality fabric ensuring comfort and elegance.</p>
                                    <ul className="ps-3 mt-2">
                                        <li>Fabric: Pure Chiffon</li>
                                        <li>Embroidered Front & Back</li>
                                        <li>Dyed Trouser</li>
                                    </ul>
                                </div>
                            </details>
                            <div className="border-bottom mb-3"></div>
                            <details className="group cursor-pointer">
                                <summary className="d-flex justify-content-between align-items-center fw-bold small text-uppercase list-unstyled">
                                    Delivery & Returns <Plus size={16} />
                                </summary>
                                <div className="small text-secondary mt-3">
                                    <p>Free shipping on orders above PKR 5000. Easy 7-day exchange policy.</p>
                                </div>
                            </details>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
