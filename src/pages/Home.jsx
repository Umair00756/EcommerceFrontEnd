import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { categoryApi, productApi } from '../services/api';
import ProductCard from '../components/product/ProductCard';

const HeroBanner = ({ title, subtitle, image, link, dark = true, hideText = false, alignBottomLeft = false }) => (
    <div
        className="position-relative vh-100 w-100 overflow-hidden mb-1"
        onMouseOver={e => {
            const img = e.currentTarget.querySelector('.banner-zoom-img');
            if (img) img.style.transform = 'scale(1.05)';
        }}
        onMouseOut={e => {
            const img = e.currentTarget.querySelector('.banner-zoom-img');
            if (img) img.style.transform = 'scale(1)';
        }}
    >
        <img
            src={image}
            alt={title}
            className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover banner-zoom-img"
            style={{ transition: 'transform 1.2s ease' }}
        />
        <div className={`position-absolute top-0 start-0 w-100 h-100 d-flex flex-column ${alignBottomLeft ? 'align-items-start justify-content-end p-lg-5 p-4' : 'align-items-center justify-content-center text-center p-4'} ${dark ? 'bg-black bg-opacity-10 text-white' : 'text-dark'}`}>
            {!hideText && (
                <>
                    <h2 className="text-uppercase mb-2" style={{ letterSpacing: '0.4em', fontSize: '0.8rem', fontWeight: '400' }}>{subtitle}</h2>
                    <h1 className="display-2 mb-4" style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '6px', fontWeight: '600' }}>{title}</h1>
                </>
            )}
            <Link
                to={link}
                className={`btn bg-white text-dark border border-dark px-5 py-3 text-uppercase rounded-0 ${alignBottomLeft ? 'mb-4' : ''}`}
                style={{ letterSpacing: '3px', fontSize: '0.75rem', fontWeight: '600', transition: 'all 0.3s ease' }}
                onMouseOver={e => {
                    e.currentTarget.style.backgroundColor = '#f8f8f8';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={e => {
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.transform = 'translateY(0)';
                }}
            >
                Shop Now
            </Link>
        </div>
    </div>
);

const CategoryCard = ({ title, image, link }) => (
    <div className="col-md-6 mb-4 px-2">
        <Link to={link} className="text-decoration-none text-dark">
            <div className="position-relative overflow-hidden" style={{ height: '650px' }}>
                <img
                    src={image}
                    alt={title}
                    className="w-100 h-100 object-fit-cover shadow-sm"
                    style={{ transition: 'transform 0.8s ease' }}
                    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                />
                <div className="position-absolute bottom-0 start-0 w-100 d-flex justify-content-center pb-5">
                    <div
                        className="bg-white border border-dark px-5 py-3 text-uppercase"
                        style={{ letterSpacing: '4px', fontSize: '0.8rem', fontWeight: '500', minWidth: '260px', textAlign: 'center', color: '#1a1a1a' }}
                    >
                        {title}
                    </div>
                </div>
            </div>
        </Link>
    </div>
);

const Home = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [catRes] = await Promise.all([
                    categoryApi.getCategories()
                ]);
                setCategories(Array.isArray(catRes.data) ? catRes.data : []);
            } catch (error) {
                console.error('Error fetching data:', error);
                setCategories([]);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    const heroCategoryIds = ['chantelle', 'unstitched', 'ready-to-wear'];

    const heroes = heroCategoryIds
        .map(slug => categories.find(cat => cat.slug === slug))
        .filter(Boolean);

    // Categories for the grid, excluding heroes and dupatta
    const gridCategories = categories.filter(cat => !heroCategoryIds.includes(cat.slug) && cat.slug !== 'dupatta');

    // Find "Bottoms" to pair with "Special Prices"
    const bottomsCategory = gridCategories.find(cat => cat.slug === 'bottoms' || cat.name.toLowerCase() === 'bottoms');
    const remainingCards = gridCategories.filter(cat => cat.slug !== bottomsCategory?.slug);

    if (loading) {
        return <div className="vh-100 d-flex align-items-center justify-content-center text-secondary small text-uppercase fw-bold" style={{ letterSpacing: '2px' }}>Loading Collection...</div>;
    }

    return (
        <div className="bg-white">
            {heroes.map((cat) => (
                <React.Fragment key={cat.id}>
                    {cat.id === 'unstitched' && (
                        <div className="py-5 bg-white text-center">
                            <h2 className="text-uppercase mb-0" style={{ letterSpacing: '0.4em', fontSize: '1.25rem', fontWeight: '400', color: '#1a1a1a', fontFamily: 'Playfair Display, serif' }}>
                                OWN YOUR NEW LOOK
                            </h2>
                        </div>
                    )}
                    {cat.id === 'ready-to-wear' && (
                        <div className="py-5 bg-white text-center">
                            <h2 className="text-uppercase mb-0" style={{ letterSpacing: '0.4em', fontSize: '1.25rem', fontWeight: '400', color: '#1a1a1a', fontFamily: 'Playfair Display, serif' }}>
                                READY TO WEAR
                            </h2>
                        </div>
                    )}
                    <HeroBanner
                        title={cat.name.toUpperCase()}
                        subtitle={cat.id === 'chantelle' ? "OWN YOUR NEW LOOK" : cat.id === 'unstitched' ? "EMBROIDERED COLLECTION" : "EVERYDAY ELEGANCE"}
                        image={cat.id === 'ready-to-wear'
                            ? "https://baroque.pk/cdn/shop/files/MAin_BAnner51_76592998-65c9-43f0-b109-bc79829ebe95.jpg?v=1771241205&width=1400"
                            : cat.id === 'unstitched'
                                ? "https://baroque.pk/cdn/shop/files/MAin_BAnner50.jpg?v=1771057778&width=1400"
                                : cat.image}
                        link={`/category/${cat.id}`}
                        dark={cat.id !== 'unstitched'}
                        hideText={cat.id === 'unstitched' || cat.id === 'ready-to-wear'}
                        alignBottomLeft={cat.id === 'unstitched' || cat.id === 'ready-to-wear'}
                    />
                </React.Fragment>
            ))}

            <div className="container-fluid px-lg-5 px-4 mt-5">
                <div className="py-5 bg-white text-center">
                    <h2 className="text-uppercase mb-0" style={{ letterSpacing: '0.5em', fontSize: '1.5rem', fontWeight: '400', color: '#1a1a1a', fontFamily: 'Playfair Display, serif' }}>
                        SPECIAL PRICES
                    </h2>
                </div>
                <div className="row gx-lg-5 gx-4 gy-4 m-0">
                    <CategoryCard
                        title="SHOP NOW"
                        image="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1500&auto=format&fit=crop"
                        link="/special-prices"
                    />
                    {bottomsCategory && (
                        <CategoryCard
                            title={bottomsCategory.name.toUpperCase()}
                            image={bottomsCategory.image}
                            link={`/category/${bottomsCategory.id}`}
                        />
                    )}
                </div>

                <div className="row gx-lg-5 gx-4 gy-4 m-0 mt-2">
                    {remainingCards.map(cat => (
                        <CategoryCard
                            key={cat.id}
                            title={cat.name.toUpperCase()}
                            image={cat.image}
                            link={`/category/${cat.id}`}
                        />
                    ))}
                </div>
            </div>

            <section className="py-5 bg-white border-top">
                <div className="container text-center py-5">
                    <h2 className="h4 mb-2 text-uppercase fw-bold" style={{ letterSpacing: '3px', color: '#1a1a1a' }}>FOLLOW US ON INSTAGRAM</h2>
                    <p className="text-muted mb-0 small text-uppercase fw-bold" style={{ letterSpacing: '2px' }}>@baroque_official</p>
                </div>
            </section>
        </div>
    );
};

export default Home;
