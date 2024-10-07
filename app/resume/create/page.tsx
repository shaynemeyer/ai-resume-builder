"use client";

import ResumeCreateNav from "@/components/resume/ResumeCreateNav";
import StepFive from "@/components/resume/StepFive";
import StepFour from "@/components/resume/StepFour";
import StepOne from "@/components/resume/StepOne";
import StepThree from "@/components/resume/StepThree";
import StepTwo from "@/components/resume/StepTwo";
import { useResume } from "@/context/resume";

function CreatePage() {
  const resumeCtx = useResume();

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <ResumeCreateNav />
      {resumeCtx?.step === 1 && <StepOne />}
      {resumeCtx?.step === 2 && <StepTwo />}
      {resumeCtx?.step === 3 && <StepThree />}
      {resumeCtx?.step === 4 && <StepFour />}
      {resumeCtx?.step === 5 && <StepFive />}
    </div>
  );
}
export default CreatePage;
