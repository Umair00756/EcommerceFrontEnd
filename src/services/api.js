import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['x-auth-token'] = token;
    }
    return config;
});

export const productApi = {
    getProducts: (params) => api.get('/products', { params }),
    getProductBySlug: (slug) => api.get(`/products/${slug}`),
};

export const categoryApi = {
    getCategories: () => api.get('/categories'),
};

export const authApi = {
    register: (userData) => api.post('/auth/register', userData),
    login: (credentials) => api.post('/auth/login', credentials),
};

export const orderApi = {
    createOrder: (orderData) => api.post('/orders', orderData),
    getUserOrders: () => api.get('/orders'),
};

export default api;
