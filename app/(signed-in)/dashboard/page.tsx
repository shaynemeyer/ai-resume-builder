"use client";
import { getUserResumesFromDb } from "@/actions/resume";
import ResumeCard from "@/components/cards/ResumeCard";
import SkeletonCard from "@/components/cards/SkeletonCard";
import { Resume } from "@/types/resume";
import React from "react";

function DashboardPage() {
  const [resumes, setResumes] = React.useState<Resume[]>([]);

  React.useEffect(() => {
    const fetchResumes = async () => {
      const data = await getUserResumesFromDb();

      if (data) {
        setResumes(data as Resume[]);
      }
    };

    fetchResumes();
  }, []);

  if (!resumes?.length) {
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
      {resumes?.map((resume) => (
        <ResumeCard key={resume.id} resume={resume} />
      ))}
    </div>
  );
}
export default DashboardPage;
