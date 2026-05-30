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

const About = () => {
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
                    <h1 className="display-4 font-serif text-center text-uppercase mb-5 fw-bold" style={{ letterSpacing: '4px' }}>ABOUT US</h1>

                    <Section id="who-we-are" title="Who We Are">
                        <p>BAROQUE is a high-end luxury brand that represents a fusion of traditional aesthetics and modern flair. For years, we have been dedicated to providing our customers with timeless pieces that celebrate the rich heritage of craftsmanship while embracing contemporary fashion trends.</p>
                        <p>Our journey began with a vision to create garments that make every wearer feel empowered and elegant. Today, BAROQUE is recognized globally for its intricate embroideries, premium fabrics, and impeccable designs.</p>
                    </Section>

                    <Section id="our-responsibility" title="Our Responsibility">
                        <p>At BAROQUE, we believe in ethical fashion. Our responsibility extends beyond just creating beautiful clothes; we are committed to sustainable practices, fair labor conditions, and supporting the artisan communities that make our brand possible.</p>
                        <p>We strive to minimize our environmental footprint by optimizing our production processes and sourcing materials responsibly. Every step we take is a step towards a more beautiful and sustainable future.</p>
                    </Section>

                    <Section id="services" title="Service We Provide">
                        <p>We offer a comprehensive range of fashion services to ensure a seamless shopping experience:</p>
                        <ul>
                            <li>Expertly crafted Unstitched Collections</li>
                            <li>Premium Ready-to-Wear ensembles</li>
                            <li>Occasion-based luxury wear (Chantelle)</li>
                            <li>Global shipping to over 200 countries</li>
                            <li>Personalized customer support and styling advice</li>
                        </ul>
                    </Section>

                    <Section id="careers" title="Careers">
                        <p>Join the BAROQUE family. We are always looking for passionate, creative, and driven individuals to join our team across design, marketing, operations, and retail.</p>
                        <p>We offer a dynamic work environment where innovation is encouraged and talent is nurtured. If you believe you have what it takes to contribute to our success, reach out to our HR department at careers@baroque.pk.</p>
                    </Section>

                    <Section id="legal-policy" title="Legal Policy">
                        <p>All content included on this site, such as text, graphics, logos, images, and software, is the property of BAROQUE and is protected by international copyright laws.</p>
                        <p>Unauthorized use of our intellectual property is strictly prohibited. For legal inquiries, please contact our legal department at legal@baroque.pk.</p>
                    </Section>
                </div>
            </div>
        </div>
    );
};

export default About;
