"use client";

import { getResumeFromDb } from "@/actions/resume";
import PreviewCard from "@/components/cards/PreviewCard";
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
    <div className="flex flex-col lg:flex-row h-screen overflow-y-auto">
      <div className="flex flex-col lg:w-1/2 p-4 lg:order-last lg:flex lg:justify-center lg:items-center">
        <PreviewCard resume={resume} />
      </div>

      <div className="flex flex-col lg:w-1/2 p-4 lg:order-first lg:flex lg:justify-center lg:items-start">
        <ResumeCreateNav />
        {resumeCtx?.step === 1 && (
          <StepOne
            resume={resume}
            setResume={
              setResume as React.Dispatch<React.SetStateAction<Resume>>
            }
          />
        )}
        {resumeCtx?.step === 2 && (
          <StepTwo
            resume={resume}
            setResume={
              setResume as React.Dispatch<React.SetStateAction<Resume>>
            }
          />
        )}
        {resumeCtx?.step === 3 && <StepThree />}
        {resumeCtx?.step === 4 && <StepFour />}
        {resumeCtx?.step === 5 && <StepFive />}
      </div>
    </div>
  );
}
export default ResumeEditPage;
