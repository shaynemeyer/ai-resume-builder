"use client";
import { useResume } from "@/context/resume";

function DashboardPage() {
  const resumeCtx = useResume();

  // Implement your dashboard page logic here
  return (
    <div>
      <pre>{JSON.stringify(resumeCtx?.resumes, null, 4)}</pre>
    </div>
  );
}
export default DashboardPage;
