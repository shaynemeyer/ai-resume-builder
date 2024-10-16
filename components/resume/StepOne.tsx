import { Resume } from "@/types/resume";
import FormContainer from "../form/FormContainer";
import { createResumeAction } from "@/actions/resume";
import FormInput from "../form/FormInput";
import { SubmitButton } from "../form/Button";
interface ResumeProps {
  resume: Resume;
  setResume: React.Dispatch<React.SetStateAction<Resume>>;
}

function StepOne({ resume, setResume }: ResumeProps) {
  return (
    <div className="w-full p-5 shadow-lg border-t-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-5">Personal Information</h2>

      {resume && (
        <FormContainer action={createResumeAction}>
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
        </FormContainer>
      )}
    </div>
  );
}
export default StepOne;
