"use client"
import { useMemo } from "react";
import { useProjects } from "@context/projects";


export default function Dashboard() {
    const { projects, hasProjects } = useProjects();

  return (
    <div className="h-full">
      <div>Dashboard content</div>
    </div>
  );
}