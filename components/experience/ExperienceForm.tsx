"use client";
import { Experience } from "@/types/experience";
import FormInput from "../form/FormInput";
import { Button } from "../ui/button";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import React from "react";
import {
  createExperience,
  getExperienceByResumeId,
  getExperienceFromDb,
  updateExperience,
} from "@/actions/experience";
import { toast } from "@/hooks/use-toast";
import "react-quill/dist/quill.snow.css";

interface ExperienceFormProps {
  resumeId?: number;
  experienceId?: number;
  actionButtonText?: string;
  closeAction?: React.Dispatch<React.SetStateAction<boolean>>;
  setExperienceList?: React.Dispatch<React.SetStateAction<Experience[]>>;
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
  setExperienceList,
}: ExperienceFormProps) {
  const [experience, setExperience] =
    React.useState<Experience>(initExperience);

  const refetchExperience = async () => {
    const experienceList =
      (await getExperienceByResumeId(
        parseInt(experience.resumeId as unknown as string)
      )) || [];

    if (experienceList?.length > 0 && setExperienceList) {
      setExperienceList(experienceList as Experience[]);
    }
  };

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
      console.log("Update experience");
      const result = await updateExperience(experience);
      console.log(`experience updated: ${result}`);
      toast({ description: "Experience has been updated" });
    }
    // todo: refetch experience
    // if (resumeId) {
    //   console.log("Refetch experience");
    //   await refetchExperience();
    // }

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
  console.log(`experienceId: ${experienceId}`);
  console.log(`resumeId: ${resumeId}`);
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
