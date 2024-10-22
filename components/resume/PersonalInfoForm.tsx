import { Resume } from "@/types/resume";
import FormInput from "../form/FormInput";
import React from "react";
import { updateResumeAction } from "@/actions/resume";
import { toast } from "@/hooks/use-toast";
import { useResume } from "@/context/resume";
import { HexColorPicker } from "react-colorful";
import { SubmitButton } from "../form/Button";

function PersonalInfoForm({
  resume,
  setResume,
}: {
  resume: Resume;
  setResume: React.Dispatch<React.SetStateAction<Resume>>;
}) {
  const resumeCtx = useResume();

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await updateResumeAction(resume);
    // go to next step
    resumeCtx?.setStep(2);
    toast({ description: "Resume updated successfully" });
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <FormInput
        name="name"
        type="text"
        placeholder="Your name"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setResume({ ...resume, name: e.target.value })
        }
        defaultValue={resume?.name}
      />
      <FormInput
        name="job"
        type="text"
        placeholder="Job title"
        defaultValue={resume?.job || ""}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setResume({ ...resume, job: e.target.value })
        }
      />
      <FormInput
        name="address"
        type="text"
        placeholder="Address"
        defaultValue={resume?.address || ""}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setResume({ ...resume, address: e.target.value })
        }
      />
      <FormInput
        name="phone"
        type="text"
        placeholder="Phone number"
        defaultValue={resume?.phone || ""}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setResume({ ...resume, phone: e.target.value })
        }
      />
      <FormInput
        name="email"
        type="email"
        placeholder="Email address"
        defaultValue={resume?.email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setResume({ ...resume, email: e.target.value })
        }
      />

      <input type="hidden" name="themeColor" value={resume?.themeColor} />
      <HexColorPicker
        color={resume?.themeColor}
        onChange={(color) => {
          if (setResume) {
            setResume({ ...resume, themeColor: color });
          }
        }}
      />
      <div className="flex justify-end">
        <SubmitButton text="Save" size="sm" />
      </div>
    </form>
  );
}
export default PersonalInfoForm;
