import axios from "axios";
import dotenv from 'dotenv'

dotenv.config()

export const api = axios.create({
    baseURL: process.env.BASE_API,
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

