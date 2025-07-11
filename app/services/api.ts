import axios from 'axios';

// Add these interfaces at the top of your file
interface User {
    id: string;
    name: string;
    email: string;
}

interface LoginResponse {
    token: string;
}

interface ApiResponse<T> {
    data?: T;
    error?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor for auth token
api.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Enhanced response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('authToken');
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

async function apiRequest<T>(config: any): Promise<ApiResponse<T>> {
    try {
        const response = await api(config);
        return { data: response.data };
    } catch (error: any) {
        console.error('API request failed:', error);
        return {
            error: error.response?.data?.message ||
                error.response?.data?.error ||
                error.message ||
                'Request failed'
        };
    }
}

export const authService = {
    async login(email: string, password: string): Promise<ApiResponse<LoginResponse>> {
        console.log('Attempting login with:', { email, password }); // Debug log
        const response = await apiRequest<LoginResponse>({
            url: '/api/login',
            method: 'POST',
            data: { email, password }, withCredentials: false // Explicitly disable if not needed

        });

        console.log('Login response:', response); // Debug log
        return response;
    },

    async logout(): Promise<ApiResponse<void>> {
        const response = await apiRequest<void>({
            url: '/auth/logout',
            method: 'POST'
        });
        if (typeof window !== 'undefined') {
            localStorage.removeItem('authToken');
        }
        return response;
    },

    async getCurrentUser(): Promise<ApiResponse<{ user: User }>> {
        if (typeof window === 'undefined') {
            return { error: 'Server-side user fetch not implemented' };
        }

        const token = localStorage.getItem('authToken');
        if (!token) {
            return { error: 'No authentication token found' };
        }

        console.log('Fetching current user with token'); // Debug log
        const response = await apiRequest<{ user: User }>({
            url: '/auth/me',
            method: 'GET'
        });
        console.log('Current user response:', response); // Debug log
        return response;
    }
};