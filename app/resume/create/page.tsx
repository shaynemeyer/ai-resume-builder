"use client";

import * as React from "react";

import PreviewCard from "@/components/cards/PreviewCard";
import ResumeCreateNav from "@/components/resume/ResumeCreateNav";
import StepOneCreate from "@/components/resume/StepOneCreate";
import { useResume } from "@/context/resume";
import { Resume } from "@/types/resume";

function CreatePage() {
  const [resume, setResume] = React.useState<Resume>({
    name: "",
    job: "",
    address: "",
    phone: "",
    email: "",
    themeColor: "",
    summary: "",
  });
  const resumeCtx = useResume();

  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-y-auto">
      <div className="flex flex-col lg:w-1/2 p-4 lg:order-last lg:flex lg:justify-center lg:items-center">
        <PreviewCard resume={resume} />
      </div>

      <div className="flex flex-col lg:w-1/2 p-4 lg:order-first lg:flex lg:justify-center lg:items-start">
        <ResumeCreateNav />
        {resumeCtx?.step === 1 && (
          <StepOneCreate resume={resume} setResume={setResume} />
        )}
      </div>
    </div>
  );
}
export default CreatePage;
