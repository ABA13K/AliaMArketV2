"use client";
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

export const useProtectedRoute = (redirectUrl: string = '/login') => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push(redirectUrl);
        }
    }, [user, loading, router, redirectUrl]);

    return { user, loading };
};