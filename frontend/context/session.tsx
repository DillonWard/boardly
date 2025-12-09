"use client";
import { createContext, useState, useContext, ReactNode, useEffect, useCallback } from "react";
import * as auth from '@/services/api/auth';

type User = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}

type SessionContextType = {
    user: User | null
    login: (userData: User) => void;
    logout: () => void;
    isLoggedIn?: () => boolean;
    isLoading: boolean;
    error: string | null;

}

const SessionContext = createContext<SessionContextType>({
    user: null,
    login: () => { },
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
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const login = useCallback(async (userData: { email: string; password: string }) => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await auth.login(userData)
            console.log(response);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to login');
            console.error('Error logging in:', err);
        } finally {
            setIsLoading(false)
        }
    }, [])

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    const isLoggedIn = () => {
        return user !== null;
    };

    return (
        <SessionContext.Provider value={{ user, login, logout, isLoggedIn, isLoading }}>
            {children}
        </SessionContext.Provider>
    );
}

export const useSession = () => {
    const context = useContext(SessionContext);
    if (!context) {
        throw new Error('useSession must be used within a SessionProvider');
    }
    return context;
};