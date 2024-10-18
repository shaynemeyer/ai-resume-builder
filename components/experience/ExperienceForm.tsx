"use client";
import { Experience } from "@/types/experience";
import FormInput from "../form/FormInput";
import { Button } from "../ui/button";
import ReactQuill from "react-quill";
import React from "react";
import { createExperience, getExperienceFromDb } from "@/actions/experience";
import { toast } from "@/hooks/use-toast";

interface ExperienceFormProps {
  resumeId?: number;
  experienceId?: number;
  actionButtonText?: string;
  closeAction?: React.Dispatch<React.SetStateAction<boolean>>;
}

const initExperience: Experience = {
  title: "",
  company: "",
  address: "",
  startDate: "",
  endDate: "",
  summary: "",
};

function ExperienceForm({
  resumeId = 0,
  experienceId = 0,
  closeAction,
}: ExperienceFormProps) {
  const [experience, setExperience] =
    React.useState<Experience>(initExperience);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (resumeId && experienceId === 0) {
      console.log("Create experience");
      const result = await createExperience({
        ...experience,
        resumeId: resumeId,
      });
      console.log(`experience created: ${result}`);
      toast({ description: "Experience has been created" });
    } else {
      // TODO: call API to update experience
      console.log("Update experience");
    }

    // todo: if api succeeds and a close action has been passed in, close the sheet.
    if (closeAction) closeAction(false);
  };

  React.useEffect(() => {
    async function fetchExperience() {
      if (experienceId) {
        const data = await getExperienceFromDb(experienceId);
        if (data) {
          setExperience(data as Experience);
        }
      }
    }
    fetchExperience();
  }, [experienceId]);

  return (
    <>
      <form onSubmit={handleSubmit} id="form">
        <FormInput
          name="title"
          type="text"
          placeholder="Job title"
          defaultValue={experience?.title || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setExperience({ ...experience, title: e.target.value })
          }
          required={true}
        />
        <FormInput
          name="company"
          type="text"
          placeholder="Company name"
          defaultValue={experience?.company || ""}
          required={true}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setExperience({ ...experience, company: e.target.value })
          }
        />
        <FormInput
          name="address"
          type="text"
          placeholder="Address"
          defaultValue={experience?.address || ""}
          required={true}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setExperience({ ...experience, address: e.target.value })
          }
        />
        <FormInput
          name="startDate"
          type="text"
          placeholder="Start date"
          defaultValue={experience?.startDate || ""}
          required={true}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setExperience({ ...experience, startDate: e.target.value })
          }
        />
        <FormInput
          name="endDate"
          type="text"
          placeholder="endDate"
          defaultValue={experience?.endDate || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setExperience({ ...experience, endDate: e.target.value })
          }
        />

        <ReactQuill
          value={experience?.summary}
          onChange={(value) => setExperience({ ...experience, summary: value })}
          theme="snow"
          className="mb-4"
          id="summary"
        />
        <Button type="submit" form="form">
          {experienceId === 0 ? "Save" : "Update"}
        </Button>
      </form>
    </>
  );
}
export default ExperienceForm;
