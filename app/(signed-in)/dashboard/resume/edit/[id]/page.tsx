"use client";

import { getResumeFromDb } from "@/actions/resume";
import ResumeCreateNav from "@/components/resume/ResumeCreateNav";
import StepFive from "@/components/resume/StepFive";
import StepFour from "@/components/resume/StepFour";
import StepOne from "@/components/resume/StepOne";
import StepThree from "@/components/resume/StepThree";
import StepTwo from "@/components/resume/StepTwo";
import { useResume } from "@/context/resume";
import { Resume } from "@/types/resume";
import React from "react";

function ResumeEditPage() {
  const [resume, setResume] = React.useState<Resume>();
  const resumeCtx = useResume();

  React.useEffect(() => {
    const fetchResume = async () => {
      if (resumeCtx?.resumeId) {
        const data = await getResumeFromDb(resumeCtx.resumeId);

        if (data) {
          setResume(data as Resume);
        }
      }
    };
    fetchResume();
  }, [resumeCtx?.resumeId]);

  if (!resume) return null;

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <ResumeCreateNav />
      {resumeCtx?.step === 1 && (
        <StepOne resume={resume} setResume={setResume} />
      )}
      {resumeCtx?.step === 2 && (
        <StepTwo resume={resume} setResume={setResume} />
      )}{" "}
      {/*
      {resumeCtx?.step === 3 && <StepThree />}
      {resumeCtx?.step === 4 && <StepFour />}
      {resumeCtx?.step === 5 && <StepFive />} */}
    </div>
  );
}
export default ResumeEditPage;
