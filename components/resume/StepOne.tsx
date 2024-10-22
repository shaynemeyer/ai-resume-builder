"use client";

import { Resume } from "@/types/resume";

import PersonalInfoForm from "./PersonalInfoForm";

interface ResumeProps {
  resume: Resume;
  setResume: React.Dispatch<React.SetStateAction<Resume>>;
}

function StepOne({ resume, setResume }: ResumeProps) {
  return (
    <div className="w-full p-5 shadow-lg border-t-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-5">Personal Information</h2>

      {resume && <PersonalInfoForm resume={resume} setResume={setResume} />}
    </div>
  );
}
export default StepOne;
