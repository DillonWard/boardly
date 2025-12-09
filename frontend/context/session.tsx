"use client";
import { createContext, useState, useContext, ReactNode, useEffect, useCallback } from "react";
import * as auth from '@/services/api/auth';
import { api } from '@/services/api';

type User = {
    id: string;
    firstName: string;
    lastName: string;
    role: string;
    email: string;
    token: string;
}

type LoginResponse = {
    access_token: string;
    user: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        role: string;
    };
};

type SessionContextType = {
    user: User | null
    login: (userData: { email: string; password: string }) => Promise<void>;
    logout: () => void;
    isLoggedIn?: () => boolean;
    isLoading: boolean;
    error: string | null;
}

const SessionContext = createContext<SessionContextType>({
    user: null,
    login: async () => { },
    logout: () => { },
    isLoggedIn: () => false,
    isLoading: true,
    error: null
});

interface SessionProviderProps {
    children: ReactNode;
}

export const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
                api.setToken(parsedUser.token);
            }
        } catch (error) {
            console.error('Error loading user from localStorage:', error);
            localStorage.removeItem("user");
        }
        setIsLoading(false);
    }, []);

    const login = useCallback(async (userData: { email: string; password: string }) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await auth.login(userData) as LoginResponse;
            const userWithToken: User = {
                ...response.user,
                token: response.access_token
            };
            setUser(userWithToken);
            localStorage.setItem("user", JSON.stringify(userWithToken));
            api.setToken(userWithToken.token);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to login');
            console.error('Error logging in:', err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        localStorage.removeItem("user");
        api.setToken(null);
    }, []);

    const isLoggedIn = () => {
        return user !== null;
    };

    return (
        <SessionContext.Provider value={{ user, login, logout, isLoggedIn, isLoading, error }}>
            {children}
        </SessionContext.Provider>
    );
};

export const useSession = () => {
    const context = useContext(SessionContext);
    if (!context) {
        throw new Error('useSession must be used within a SessionProvider');
    }
    return context;
};