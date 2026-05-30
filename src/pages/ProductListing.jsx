import React, { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/product/ProductCard';
import { Filter } from 'lucide-react';
import clsx from 'clsx';
import { productApi, categoryApi } from '../services/api';

const ProductListing = () => {
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [sortBy, setSortBy] = useState('newest');
    const [priceRange, setPriceRange] = useState('all');
    const [selectedSize, setSelectedSize] = useState('all');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [prodRes, catRes] = await Promise.all([
                    productApi.getProducts({ category: categoryId !== 'special-prices' ? categoryId : '' }),
                    categoryApi.getCategories()
                ]);
                setProducts(prodRes.data);
                setCategories(catRes.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [categoryId]);

    const categoryData = categories.find(c => c.slug === categoryId);

    const categoryName = categoryData ? categoryData.name : (categoryId === 'special-prices' ? 'Special Prices' : 'Collection');

    const filteredProducts = useMemo(() => {
        let base = [...products];

        if (categoryId === 'special-prices') {
            base = base.filter(p => p.price < 5000);
        }

        if (priceRange !== 'all') {
            const parts = priceRange.split('-');
            const min = Number(parts[0]);
            const max = parts[1] ? Number(parts[1]) : Infinity;
            base = base.filter(p => p.price >= min && p.price <= max);
        }

        if (selectedSize !== 'all') {
            base = base.filter(p => p.sizes.includes(selectedSize));
        }

        if (sortBy === 'price-low') {
            base.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-high') {
            base.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'newest') {
            base.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }

        return base;
    }, [categoryId, products, priceRange, selectedSize, sortBy]);

    const resetFilters = () => {
        setPriceRange('all');
        setSelectedSize('all');
        setSortBy('newest');
    };

    if (loading) {
        return (
            <div className="container py-5 mt-5 text-center">
                <div className="spinner-border text-dark" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-5 mt-5">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-5">
                <div>
                    <h1 className="h1 font-serif text-uppercase mb-1" style={{ letterSpacing: '4px', fontWeight: '600' }}>{categoryName}</h1>
                    <p className="text-secondary small text-uppercase mb-0" style={{ letterSpacing: '1px' }}>{filteredProducts.length} Items found</p>
                </div>
                <div className="d-none d-lg-block">
                    <select
                        className="form-select rounded-0 border-0 border-bottom small text-uppercase fw-bold shadow-none"
                        style={{ width: '220px', cursor: 'pointer' }}
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="newest">Sort By: Newest</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                    </select>
                </div>
            </div>

            <div className="row g-5">
                <aside className="col-lg-3 d-none d-lg-block">
                    <div className="sticky-top" style={{ top: '100px', zIndex: 1, paddingRight: '20px' }}>
                        <div className="mb-5">
                            <h3 className="h6 fw-bold text-uppercase mb-3 border-bottom pb-2" style={{ letterSpacing: '1px' }}>
                                PRICE RANGE
                            </h3>
                            <div className="d-flex flex-column gap-2">
                                {[
                                    { label: 'All', value: 'all' },
                                    { label: 'Below 5,000', value: '0-5000' },
                                    { label: '5,000 - 10,000', value: '5000-10000' },
                                    { label: '10,000 - 15,000', value: '10000-15000' },
                                    { label: 'Above 15,000', value: '15000-1000000' }
                                ].map(p => (
                                    <div className="form-check" key={p.value}>
                                        <input
                                            className="form-check-input rounded-0 cursor-pointer"
                                            type="radio"
                                            name="price"
                                            id={`price-${p.value}`}
                                            checked={priceRange === p.value}
                                            onChange={() => setPriceRange(p.value)}
                                        />
                                        <label className="form-check-label small text-uppercase cursor-pointer" htmlFor={`price-${p.value}`}>
                                            {p.label}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mb-5">
                            <h3 className="h6 fw-bold text-uppercase mb-3 border-bottom pb-2" style={{ letterSpacing: '1px' }}>
                                SIZE
                            </h3>
                            <div className="d-flex flex-wrap gap-2">
                                {['XS', 'S', 'M', 'L', 'XL', 'One Size', 'Standard'].map(size => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(selectedSize === size ? 'all' : size)}
                                        className={clsx(
                                            "btn btn-sm rounded-0 border text-uppercase small",
                                            selectedSize === size ? "btn-dark" : "btn-outline-dark"
                                        )}
                                        style={{ minWidth: '40px', fontSize: '0.65rem' }}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            className="btn btn-link link-dark text-decoration-none small text-uppercase fw-bold p-0 mt-2"
                            onClick={resetFilters}
                        >
                            Reset All Filters
                        </button>
                    </div>
                </aside>

                <div className="col-12 d-lg-none mb-4">
                    <button
                        className="btn btn-dark w-100 text-uppercase fw-bold d-flex align-items-center justify-content-center gap-2 rounded-0 py-3"
                        style={{ letterSpacing: '1px' }}
                        onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                    >
                        <Filter size={18} /> Filters ({(priceRange !== 'all' ? 1 : 0) + (selectedSize !== 'all' ? 1 : 0)})
                    </button>

                    {mobileFiltersOpen && (
                        <div className="bg-light p-4 mb-4 border border-dark animate-fade-in">
                            <div className="mb-4 text-end">
                                <button className="btn-close" onClick={() => setMobileFiltersOpen(false)} aria-label="Close"></button>
                            </div>
                            <div className="mb-4">
                                <h4 className="h6 fw-bold text-uppercase mb-3">Sort By</h4>
                                <select
                                    className="form-select rounded-0 border-dark small text-uppercase fw-bold"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option value="newest">Newest</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <h4 className="h6 fw-bold text-uppercase mb-3 border-bottom pb-2">Price Range</h4>
                                <div className="d-flex flex-wrap gap-2 pt-2">
                                    {[
                                        { label: 'All', value: 'all' },
                                        { label: '< 5k', value: '0-5000' },
                                        { label: '5-10k', value: '5000-10000' },
                                        { label: '10-15k', value: '10000-15000' },
                                        { label: '> 15k', value: '15000-1000000' }
                                    ].map(p => (
                                        <button
                                            key={p.value}
                                            onClick={() => setPriceRange(p.value)}
                                            className={clsx(
                                                "btn btn-sm rounded-0 border text-uppercase small",
                                                priceRange === p.value ? "btn-dark" : "btn-outline-dark"
                                            )}
                                        >
                                            {p.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-4">
                                <h4 className="h6 fw-bold text-uppercase mb-3 border-bottom pb-2">Size</h4>
                                <div className="d-flex flex-wrap gap-2 pt-2">
                                    {['XS', 'S', 'M', 'L', 'XL', 'One Size', 'Standard'].map(size => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(selectedSize === size ? 'all' : size)}
                                            className={clsx(
                                                "btn btn-sm rounded-0 border text-uppercase small",
                                                selectedSize === size ? "btn-dark" : "btn-outline-dark"
                                            )}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="d-flex gap-2">
                                <button
                                    className="btn btn-dark flex-grow-1 rounded-0 small text-uppercase py-3 fw-bold"
                                    onClick={() => setMobileFiltersOpen(false)}
                                >
                                    Apply Results
                                </button>
                                <button
                                    className="btn btn-outline-dark flex-grow-1 rounded-0 small text-uppercase py-3 fw-bold"
                                    onClick={resetFilters}
                                >
                                    Clear
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="col-12 col-lg-9">
                    {filteredProducts.length > 0 ? (
                        <div className="row g-4 g-lg-5">
                            {filteredProducts.map(product => (
                                <div key={product.id} className="col-6 col-md-4">
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-5 border-top border-bottom mt-4">
                            <p className="lead font-serif mb-4">No products found for the selected filters.</p>
                            <button
                                className="btn btn-dark rounded-0 px-5 py-3 text-uppercase"
                                onClick={resetFilters}
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductListing;
