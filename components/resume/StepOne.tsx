"use client";

import { Resume } from "@/types/resume";
import FormInput from "../form/FormInput";
import { SubmitButton } from "../form/Button";
import { updateResumeAction } from "@/actions/resume";
import { useResume } from "@/context/resume";
import { toast } from "@/hooks/use-toast";
interface ResumeProps {
  resume: Resume;
  setResume?: React.Dispatch<React.SetStateAction<Resume>>;
}

function StepOne({ resume }: ResumeProps) {
  const resumeCtx = useResume();
  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const rawData = Object.fromEntries(formData) as unknown as Resume;
    await updateResumeAction(rawData);
    // go to next step
    resumeCtx?.setStep(2);
    toast({ description: "Resume updated successfully" });
  };
  return (
    <div className="w-full p-5 shadow-lg border-t-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-5">Personal Information</h2>

      {resume && (
        <form onSubmit={handleOnSubmit}>
          <input type="hidden" name="id" value={resume.id} />
          <FormInput
            name="name"
            type="text"
            placeholder="Your name"
            defaultValue={resume.name}
          />
          <FormInput
            name="job"
            type="text"
            placeholder="Job title"
            defaultValue={resume.job || ""}
          />
          <FormInput
            name="address"
            type="text"
            placeholder="Address"
            defaultValue={resume.address || ""}
          />
          <FormInput
            name="phone"
            type="text"
            placeholder="Phone number"
            defaultValue={resume.phone || ""}
          />
          <FormInput
            name="email"
            type="email"
            placeholder="Email address"
            defaultValue={resume.email}
          />
          <div className="flex justify-end">
            <SubmitButton text="Save" size="sm" />
          </div>
        </form>
      )}
    </div>
  );
}
export default StepOne;
