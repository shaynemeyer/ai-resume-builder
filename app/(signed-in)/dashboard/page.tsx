'use client';
import { getUserResumesFromDb } from '@/actions/resume';
import ResumeCard from '@/components/cards/ResumeCard';
import SkeletonCard from '@/components/cards/SkeletonCard';
import { Button } from '@/components/ui/button';
import { Resume } from '@/types/resume';
import Link from 'next/link';
import React from 'react';

function DashboardPage() {
  const [loadingResumes, setLoadingResumes] = React.useState(false);
  const [resumes, setResumes] = React.useState<Resume[]>([]);

  React.useEffect(() => {
    const fetchResumes = async () => {
      setLoadingResumes(true);
      const data = await getUserResumesFromDb();

      if (data) {
        setResumes(data as Resume[]);
      }
    };

    fetchResumes();
    setLoadingResumes(false);
  }, []);

  if (loadingResumes) {
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
      {resumes.length === 0 && (
        <div>
          No resumes yet
          <div className="mt-4">
            <Link href="/resume/create">
              <Button>start creating your res with ai</Button>
            </Link>
          </div>
        </div>
      )}
      {resumes?.map((resume) => (
        <ResumeCard key={resume.id} resume={resume} setResumes={setResumes} />
      ))}
    </div>
  );
}
export default DashboardPage;
