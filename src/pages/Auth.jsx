import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const { login, register } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('login');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
        setSuccess('');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login({ email: formData.email, password: formData.password });
            setSuccess('Login successful! Redirecting...');
            setTimeout(() => navigate('/'), 1500);
        } catch (err) {
            console.error('Login Error:', err);
            const message = err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || err.message;
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await register(formData);
            setSuccess('Account created successfully! Redirecting...');
            setTimeout(() => navigate('/'), 1500);
        } catch (err) {
            console.error('Registration Error:', err);
            const message = err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || err.message;
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-5 mt-5 d-flex justify-content-center">
            <div className="w-100" style={{ maxWidth: '450px' }}>
                <h1 className="text-center mb-5 text-uppercase fw-bold" style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '4px', fontSize: '2.5rem' }}>ACCOUNT</h1>

                {error && <div className="alert alert-danger rounded-0 small text-uppercase py-2">{error}</div>}
                {success && <div className="alert alert-success rounded-0 small text-uppercase py-2">{success}</div>}

                <ul className="nav nav-tabs mb-5 border-bottom">
                    <li className="nav-item w-50 text-center">
                        <button
                            className={`nav-link w-100 text-uppercase fw-bold border-0 bg-transparent rounded-0 pb-3 transition-all ${activeTab === 'login' ? 'active text-dark border-bottom border-gold border-3' : 'text-secondary border-transparent hover-text-gold'}`}
                            style={{ letterSpacing: '2px', fontSize: '0.85rem' }}
                            onClick={() => setActiveTab('login')}
                        >
                            Login
                        </button>
                    </li>
                    <li className="nav-item w-50 text-center">
                        <button
                            className={`nav-link w-100 text-uppercase fw-bold border-0 bg-transparent rounded-0 pb-3 transition-all ${activeTab === 'register' ? 'active text-dark border-bottom border-gold border-3' : 'text-secondary border-transparent hover-text-gold'}`}
                            style={{ letterSpacing: '2px', fontSize: '0.85rem' }}
                            onClick={() => setActiveTab('register')}
                        >
                            Register
                        </button>
                    </li>
                </ul>

                {activeTab === 'login' ? (
                    <form className="d-grid gap-3" onSubmit={handleLogin}>
                        <div>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="form-control rounded-0 p-3"
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="form-control rounded-0 p-3"
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <button type="button" className="btn btn-link text-decoration-underline text-dark p-0">Forgot your password?</button>
                        </div>
                        <button
                            className="btn btn-dark w-100 py-3 text-uppercase fw-bold rounded-0"
                            style={{ letterSpacing: '1px' }}
                            disabled={loading}
                        >
                            {loading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>
                ) : (
                    <form className="d-grid gap-3" onSubmit={handleRegister}>
                        <div>
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                className="form-control rounded-0 p-3"
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                className="form-control rounded-0 p-3"
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="form-control rounded-0 p-3"
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="form-control rounded-0 p-3"
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <button
                            className="btn btn-dark w-100 py-3 text-uppercase fw-bold rounded-0"
                            style={{ letterSpacing: '1px' }}
                            disabled={loading}
                        >
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Auth;
