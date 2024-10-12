"use client";
import ResumeCard from "@/components/cards/ResumeCard";
import SkeletonCard from "@/components/cards/SkeletonCard";
import { useResume } from "@/context/resume";

function DashboardPage() {
  const resumeCtx = useResume();

  if (!resumeCtx?.resumes?.length) {
    return (
      <div>
        <p className="text-center my-5">Loading...</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-5 px-5">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-5 px-5">
      {resumeCtx.resumes?.map((resume) => (
        <ResumeCard key={resume.id} resume={resume} />
      ))}
    </div>
  );
}
export default DashboardPage;
