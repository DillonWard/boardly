"use client"
import { useProjects } from "@context/projects";
import { useRouter } from "next/navigation";


export default function Dashboard() {
  const { projects, hasProjects } = useProjects();
  const router = useRouter();

  function navigateToProjectCreation(){
    router.push('/projects/new')
  }

  return (
    <div className="h-full">
      <div className="text-slate-800 text-3xl pb-5">Dashboard</div>
      <div className="text-slate-700">
        {hasProjects &&
          <>
            <h1>Your projects</h1>
          </>
        }
        {!hasProjects && (
          <div className="h-[40vh] flex flex-col items-center justify-center">
            <div className="text-xl pb-5">It seems as though you do not have any projects</div>

            <button
              onClick={navigateToProjectCreation}
              className="cursor-pointer border border-slate-400 p-10 rounded-sm flex flex-col items-center justify-center text-slate-600"
            >
              <span className="text-lg pb-5">Create new project</span>
              <svg className="w-14 h-14" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>

  );
}