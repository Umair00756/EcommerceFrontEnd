import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Section = ({ id, title, children }) => (
    <section id={id} className="mb-5 scroll-margin-top" style={{ scrollMarginTop: '100px' }}>
        <h2 className="h4 font-serif text-uppercase mb-4 fw-bold" style={{ letterSpacing: '2px' }}>{title}</h2>
        <div className="text-secondary lh-lg">
            {children}
        </div>
    </section>
);

const Policies = () => {
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const element = document.getElementById(hash.substring(1));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            window.scrollTo(0, 0);
        }
    }, [hash]);

    return (
        <div className="container py-5 mt-5">
            <div className="row justify-content-center">
                <div className="col-12 col-lg-8">
                    <h1 className="display-4 font-serif text-center text-uppercase mb-5 fw-bold" style={{ letterSpacing: '4px' }}>POLICIES</h1>

                    <Section id="privacy-policy" title="Privacy Policy">
                        <p>Your privacy is important to us. This policy outlines how we collect, use, and protect your personal information when you visit and shop at BAROQUE.</p>
                        <p>We only collect information necessary to process your orders and provide a personalized experience. We do not sell or share your data with third parties for marketing purposes.</p>
                    </Section>

                    <Section id="refund-policy" title="Refund Policy">
                        <p>We want you to be completely satisfied with your purchase. If you are not happy with an item, you may request a refund within 7 days of delivery, provided the item is in its original condition with tags intact.</p>
                        <p>Please note that certain items, such as sale products or custom-stitched garments, may not be eligible for a refund.</p>
                    </Section>

                    <Section id="shipping-policy" title="Shipping Policy">
                        <p>We offer global shipping. Domestic orders are typically delivered within 3-5 working days, while international orders take 7-10 working days.</p>
                        <p>Free shipping is available on domestic orders above PKR 5,000. Shipping costs for international orders are calculated at checkout based on destination and weight.</p>
                    </Section>

                    <Section id="terms-of-service" title="Terms of Service">
                        <p>By using our website, you agree to comply with our terms and conditions. These terms govern your use of the site, purchases, and interactions with our brand.</p>
                        <p>We reserve the right to update these terms at any time. Any changes will be posted on this page.</p>
                    </Section>

                    <Section id="exchange-information" title="Exchange Information">
                        <p>Exchanges are allowed within 14 days of purchase. If you wish to exchange an item for a different size or design, please contact our customer service team.</p>
                        <p>The item must be unused, unwashed, and in its original packaging. Differences in price will be adjusted at the time of exchange.</p>
                    </Section>
                </div>
            </div>
        </div>
    );
};

export default Policies;
