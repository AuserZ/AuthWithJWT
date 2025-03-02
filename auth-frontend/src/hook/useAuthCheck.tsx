// hooks/useAuthCheck.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from "jwt-decode";
import { getNewToken } from '@/be/api';

const useAuthCheck = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const checkAuth = async () => {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        // No tokens: redirect to login
        if (!accessToken || !refreshToken) {
            router.push('/');
            return;
        }

        // Decode the access token to check expiry
        const decodedToken = jwtDecode(accessToken);

        if (!decodedToken.exp) {
            router.push('/');
            return;
        }

        const isTokenExpired = decodedToken.exp * 1000 < Date.now();

        // Token is valid: allow access
        if (!isTokenExpired) {
            setIsLoading(false);
            return;
        }

        // Token expired: attempt to refresh
        try {
            // Check expiry refresh token
            const decodedRefreshToken = jwtDecode(refreshToken);
            if (!decodedRefreshToken.exp) {
                router.push('/');
                return;
            }
            const isTokenExpired = decodedRefreshToken?.exp * 1000 < Date.now();
            if (isTokenExpired) {
                router.push('/');
                return;
            }

            const response = await getNewToken(refreshToken);

            if (!(response.status == 201)) throw new Error('Token refresh failed');

            const newToken = response.data;
            localStorage.setItem('accessToken', newToken.accessToken);
            localStorage.setItem('accessToken', newToken.refreshToken);
            setIsLoading(false);
        } catch (error) {
            if (error instanceof Error) {
                console.error('Invalid token:', error.message);
            } else {
                console.error('An unknown error occurred:', error);
            }
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            router.push('/');
        }
    };

    useEffect(() => {
        checkAuth();
    }, [router]);

    return { isLoading, error };
};

export default useAuthCheck;