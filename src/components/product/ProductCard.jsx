import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import clsx from 'clsx';

const ProductCard = ({ product }) => {
    const [isHovered, setIsHovered] = useState(false);
    const { addToCart } = useCart();

    const handleQuickAdd = (e) => {
        e.preventDefault();
        addToCart(product, product.sizes[0]);
    };

    return (
        <Link to={`/product/${product.slug}`} className="d-block text-decoration-none text-dark"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="position-relative overflow-hidden mb-3">
                <div className="ratio" style={{ '--bs-aspect-ratio': '150%' }}> {/* 2/3 aspect ratio is 150% height/width, wait aspect-ratio w/h. 2/3 = width/height? No aspect-[2/3] usually means width/height is 2/3. So height is 1.5 * width. */}
                    <img
                        src={product.images[0]}
                        alt={product.name}
                        className={`position-absolute top-0 start-0 w-100 h-100 object-fit-cover`}
                        style={{ transition: 'opacity 0.5s ease', opacity: isHovered ? 0 : 1 }}
                    />
                    <img
                        src={product.images[1] || product.images[0]}
                        alt={product.name}
                        className={`position-absolute top-0 start-0 w-100 h-100 object-fit-cover`}
                        style={{ transition: 'opacity 0.5s ease', opacity: isHovered ? 1 : 0 }}
                    />
                </div>

                {/* Quick Add Button - Slide up on hover */}
                <button
                    onClick={handleQuickAdd}
                    className="btn btn-light position-absolute bottom-0 start-0 w-100 text-uppercase fw-bold border-0 rounded-0"
                    style={{
                        letterSpacing: '1px',
                        fontSize: '0.75rem',
                        transform: isHovered ? 'translateY(0)' : 'translateY(100%)',
                        transition: 'transform 0.3s ease',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)'
                    }}
                >
                    Quick Add
                </button>

                {/* New Badge */}
                {product.isNew && (
                    <span className="position-absolute top-0 start-0 bg-white px-2 py-1 text-uppercase fw-bold" style={{ fontSize: '10px', top: '10px', left: '10px', letterSpacing: '1px' }}>
                        New
                    </span>
                )}
            </div>

            <div className="text-center">
                <h3 className="h6 text-uppercase mb-1" style={{ letterSpacing: '1.5px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                    <span className={clsx('transition-all', isHovered ? 'text-gold' : 'text-dark')}>{product.name}</span>
                </h3>
                <p className="small mb-0 fw-bold" style={{ color: '#B59410', fontSize: '0.8rem' }}>PKR {product.price.toLocaleString()}</p>
            </div>
        </Link>
    );
};

export default ProductCard;
