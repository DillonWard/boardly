"use client";

import { useSession } from "@/context/session";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";

const publicRoutes = ['/login', '/register'];

export const RouteProtection = ({ children }: { children: React.ReactNode }) => {
    const { isLoggedIn, isLoading } = useSession();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (isLoading) return;
        
        const isPublicRoute = publicRoutes.includes(pathname);
        
        if (!isLoggedIn?.() && !isPublicRoute) {
            router.push('/login');
        } else if (isLoggedIn?.() && isPublicRoute) {
            router.push('/dashboard');
        }
    }, [isLoggedIn, isLoading, router, pathname]);

    if (isLoading || 
        (isLoggedIn?.() && publicRoutes.includes(pathname)) ||
        (!isLoggedIn?.() && !publicRoutes.includes(pathname))) {
        return (
            <div className="flex h-screen w-screen items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

if (isLoggedIn?.()) {
    return (
        <div className="h-screen w-screen flex flex-col bg-gray-50 overflow-hidden">
            <Header />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-hidden relative z-10">
                    <div className="h-full w-full p-4 overflow-y-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
    return <div className="h-screen w-screen">{children}</div>;
};