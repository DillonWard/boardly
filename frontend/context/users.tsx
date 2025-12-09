"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode, useMemo } from 'react';
import { User, getUsers } from '@/services/api/users';

interface UserContextType {
    users: User[];
    loading: boolean;
    error: string | null;
    fetchUsers: () => Promise<void>;

}

const UsersContext = createContext<UserContextType | undefined>(undefined);

interface UsersProviderProps {
    children: ReactNode;
}

export const UsersProvider: React.FC<UsersProviderProps> = ({ children }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const usersData = await getUsers<User[]>();
            console.log(usersData);
            setUsers(usersData);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch users');
            console.error('Error fetching users:', err);
        } finally {
            setLoading(false);
        }
    }, []);
    
    const value: UserContextType = {
        users,
        loading,
        error,
        fetchUsers
    }
    return (
        <UsersContext.Provider value={value}>
            {children}
        </UsersContext.Provider>
    )
}

export const useUsers = (): UserContextType => {
  const context = useContext(UsersContext);
  if (context === undefined) {
        throw new Error('useUsers must be used within a UsersProvider');
  }
  return context;
};