"use client";

import { useSession } from "@/context/session";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

const publicRoutes = ['/login', '/register'];

export const RouteProtection = ({ children }: { children: React.ReactNode }) => {
    const { isLoggedIn } = useSession();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const isPublicRoute = publicRoutes.includes(pathname);
        
        if (!isLoggedIn?.() && !isPublicRoute) {
            router.push('/login');
        } else if (isLoggedIn?.() && isPublicRoute) {
            router.push('/');
        }
    }, [isLoggedIn, router, pathname]);

    return <>{children}</>;
};