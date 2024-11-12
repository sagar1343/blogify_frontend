import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_API,
    headers: {
        'Content-Type': 'application/json'
    }
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers['Authorization'] = `JWT ${token}`;
    }
    return config;
})

