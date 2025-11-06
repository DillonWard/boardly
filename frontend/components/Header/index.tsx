"use client";

import { useSession } from "@/context/session";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const Header = () => {
    const { user, logout } = useSession();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    return (
        <header className="bg-white border-b border-gray-200 shadow-sm shrink-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link href="/dashboard">
                            <h1 className="text-xl font-bold text-gray-900 cursor-pointer">Boardly</h1>
                        </Link>
                    </div>

                    <nav className="hidden md:flex space-x-8">
                        <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                            Dashboard
                        </Link>
                        <Link href="/projects" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                            Projects
                        </Link>
                        <Link href="/teams" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                            Teams
                        </Link>
                    </nav>

                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-700">
                            Welcome, {user?.firstName}
                        </span>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 transition duration-150"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};