import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    X,
    ChevronRight,
    Facebook,
    Instagram,
    Youtube,
    Twitter,
    Send,
    MessageCircle,
    Globe
} from 'lucide-react';
import { categoryApi } from '../../services/api';

const Sidebar = ({ isOpen, onClose }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await categoryApi.getCategories();
                setCategories(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setCategories([]);
            }
        };
        if (isOpen) {
            fetchCategories();
        }
    }, [isOpen]);

    const sidebarItems = [
        { name: 'SPECIAL PRICES', path: '/special-prices', highlight: true },
        ...categories.map(cat => ({
            name: cat.name.toUpperCase(),
            path: `/category/${cat.id}`
        }))
    ];
    return (
        <>
            <div
                className={`sidebar-overlay ${isOpen ? 'show' : ''}`}
                onClick={onClose}
            />

            <div className={`sidebar-drawer ${isOpen ? 'show' : ''}`}>
                <div className="sidebar-header">
                    <button
                        className="btn btn-link link-dark p-0 shadow-none"
                        onClick={onClose}
                    >
                        <X size={28} strokeWidth={1} />
                    </button>
                </div>

                <div className="sidebar-content no-scrollbar">
                    <nav className="d-flex flex-column">
                        {sidebarItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`sidebar-nav-item ${item.highlight ? 'highlight' : ''}`}
                                onClick={onClose}
                            >
                                {item.name}
                                <ChevronRight size={18} strokeWidth={1} />
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="sidebar-footer">
                    <div className="social-icons-row">
                        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon-link">
                            <Facebook size={20} strokeWidth={1.5} />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon-link">
                            <Instagram size={20} strokeWidth={1.5} />
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noreferrer" className="social-icon-link">
                            <Youtube size={20} strokeWidth={1.5} />
                        </a>
                        <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="social-icon-link">
                            <MessageCircle size={20} strokeWidth={1.5} />
                        </a>
                        <a href="https://whatsapp.com" target="_blank" rel="noreferrer" className="social-icon-link">
                            <Send size={20} strokeWidth={1.5} />
                        </a>
                        <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="social-icon-link">
                            <Globe size={20} strokeWidth={1.5} />
                        </a>
                    </div>

                    <div className="country-selector">
                        <span>PAKISTAN</span>
                        <ChevronRight size={14} className="rotate-90" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
