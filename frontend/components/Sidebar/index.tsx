"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import {
  HomeIcon,
  UsersIcon,
  DocumentTextIcon,
  CogIcon,
  PlusIcon,
  FolderIcon,
  UserIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { useProjects } from '@/context/projects';

export const Sidebar = () => {
  const pathname = usePathname();
  const [openDropdowns, setOpenDropdowns] = useState<string[]>([]);
  const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number } | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  const { projects, loading } = useProjects();

  const toggleDropdown = (itemName: string, event: React.MouseEvent) => {
    if (openDropdowns.includes(itemName)) {
      setOpenDropdowns([]);
      setDropdownPosition(null);
    } else {
      const button = event.currentTarget as HTMLButtonElement;
      const rect = button.getBoundingClientRect();
      
      setDropdownPosition({
        top: rect.top,
        left: rect.right + 8
      });
      
      setOpenDropdowns([itemName]);
    }
  };

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
    { 
      name: "Projects", 
      icon: FolderIcon, 
      isDropdown: true,
      children: [
        { name: "Add New Project", href: "/projects/new", icon: PlusIcon, isAddButton: true },
        ...projects.map(project => ({ 
          name: project.name, 
          href: `/projects/${project.id}`, 
          icon: null, 
          isAddButton: false 
        }))
      ]
    },
    { name: "Teams", href: "/teams", icon: UsersIcon },
    { name: "Users", href: "/users", icon: UserIcon },
    { name: "Tasks", href: "/tasks", icon: DocumentTextIcon },
    { name: "Settings", href: "/settings", icon: CogIcon },
  ];

  const isDropdownOpen = (itemName: string) => openDropdowns.includes(itemName);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpenDropdowns([]);
        setDropdownPosition(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="w-64 h-full bg-white border-r border-gray-200 flex flex-col transition-all duration-300">
      <nav className="flex-1 overflow-y-auto p-4">
        {loading && (
          <div className="flex items-center justify-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          </div>
        )}
        <ul className="space-y-2">
          {navigation.map((item) => {
            if (item.isDropdown) {
              const isOpen = isDropdownOpen(item.name);
              const hasActiveChild = item.children?.some(child => pathname === child.href);
              
              return (
                <li key={item.name} className="relative">
                  <button
                    ref={buttonRef}
                    onClick={(e) => toggleDropdown(item.name, e)}
                    className={`flex items-center justify-between w-full px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      hasActiveChild
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center">
                      <item.icon className="w-5 h-5 mr-3 shrink-0" />
                      <span>{item.name}</span>
                    </div>
                    <ChevronRightIcon className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                  </button>
                  
                  {isOpen && dropdownPosition && (
                    <div 
                      ref={dropdownRef}
                      className="fixed w-56 bg-white border border-gray-200 rounded-lg shadow-xl"
                      style={{ 
                        top: `${dropdownPosition.top}px`,
                        left: `${dropdownPosition.left}px`,
                        zIndex: 9999 
                      }}
                    >
                      <ul className="py-2">
                        {item.children?.map((child) => {
                          const isActive = pathname === child.href;
                          return (
                            <li key={child.name}>
                              <Link
                                href={child.href}
                                className={`flex items-center px-4 py-2 text-sm transition-colors ${
                                  isActive
                                    ? "bg-blue-50 text-blue-700"
                                    : child.isAddButton
                                    ? "text-blue-600 hover:bg-blue-50"
                                    : "text-gray-600 hover:bg-gray-50"
                                }`}
                                onClick={() => {
                                  setOpenDropdowns([]);
                                  setDropdownPosition(null);
                                }}
                              >
                                {child.icon ? (
                                  <child.icon className="w-4 h-4 mr-3 shrink-0" />
                                ) : (
                                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3 shrink-0"></div>
                                )}
                                <span className="truncate">{child.name}</span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </li>
              );
            }

            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href || '#'}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3 shrink-0" />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};