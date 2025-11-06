"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  HomeIcon,
  FolderIcon,
  UsersIcon,
  DocumentTextIcon,
  CogIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { name: "Projects", href: "/projects", icon: FolderIcon },
  { name: "Teams", href: "/teams", icon: UsersIcon },
  { name: "Tasks", href: "/tasks", icon: DocumentTextIcon },
  { name: "Settings", href: "/settings", icon: CogIcon },
];

const projects = [
  { name: "Website Redesign", href: "/projects/1" },
  { name: "Mobile App", href: "/projects/2" },
  { name: "API Development", href: "/projects/3" },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className={`w-64 h-full bg-white border-r border-gray-200 flex flex-col transition-all duration-300`}>

      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-700 "
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3 shrink-0" />
                  {<span>{item.name}</span>}
                </Link>
              </li>
            );
          })}
        </ul>

          <div className="mt-8">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Projects
              </h3>
              <button className="p-1 rounded-md hover:bg-gray-100">
                <PlusIcon className="w-4 h-4 text-gray-400" />
              </button>
            </div>
            <ul className="space-y-1">
              {projects.map((project) => {
                const isActive = pathname === project.href;
                return (
                  <li key={project.name}>
                    <Link
                      href={project.href}
                      className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                        isActive
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3 shrink-0"></div>
                      <span className="truncate">{project.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
      </nav>

    </div>
  );
};