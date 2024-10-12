"use client";
import SkeletonCard from "@/components/cards/SkeletonCard";
import { useResume } from "@/context/resume";

function DashboardPage() {
  const resumeCtx = useResume();

  if (!resumeCtx?.resumes?.length) {
    return (
      <div>
        <p className="text-center">Loading...</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-5 px-5">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    );
  }

  return (
    <div>
      <pre>{JSON.stringify(resumeCtx?.resumes, null, 4)}</pre>
    </div>
  );
}
export default DashboardPage;
