"use client";
import { createContext, useState, useContext, useEffect } from "react";

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
}

const SessionContext = createContext<SessionContextType>({
    user: null,
    login: () => {},
    logout: () => {},
    isLoggedIn: () => false,
});

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (userData: User) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };
    
    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    const isLoggedIn = () => {
        return user !== null;
    }
    return (
        <SessionContext.Provider value={{ user, login, logout, isLoggedIn }}>
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