"use client";

import PreviewCard from "@/components/cards/PreviewCard";
import ResumeCreateNav from "@/components/resume/ResumeCreateNav";
import StepFive from "@/components/resume/StepFive";
import StepFour from "@/components/resume/StepFour";
import StepOneCreate from "@/components/resume/StepOneCreate";
import StepThree from "@/components/resume/StepThree";
import StepTwo from "@/components/resume/StepTwo";
import { useResume } from "@/context/resume";

function CreatePage() {
  const resumeCtx = useResume();

  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-y-auto">
      <div className="flex flex-col p-4 lg:order-last lg:flex lg:justify-center lg:items-center">
        <PreviewCard />
      </div>

      <div className="flex flex-col p-4 lg:order-first lg:flex lg:justify-center lg:items-start">
        <ResumeCreateNav />
        {resumeCtx?.step === 1 && <StepOneCreate />}
        {resumeCtx?.step === 2 && <StepTwo />}
        {resumeCtx?.step === 3 && <StepThree />}
        {resumeCtx?.step === 4 && <StepFour />}
        {resumeCtx?.step === 5 && <StepFive />}
      </div>
    </div>
  );
}
export default CreatePage;
