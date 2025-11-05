"use client";

import { useSession } from "@/context/session";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const RouteProtection = ({ children }: { children: React.ReactNode }) => {
    const { isLoggedIn } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (!isLoggedIn?.()) {
            router.push('/login');
        }
    }, [isLoggedIn, router]);

    return <>{children}</>;
};
