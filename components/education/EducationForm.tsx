"use client";

import React from "react";
import { Education } from "@/types/education";
import FormInput from "../form/FormInput";
import { Button } from "../ui/button";
import {
  createEducation,
  getEducationFromDb,
  updateEducation,
} from "@/actions/education";
import { toast } from "@/hooks/use-toast";

interface EducationFormProps {
  resumeId?: number;
  educationId?: number;
  actionButtonText?: string;
  closeAction?: React.Dispatch<React.SetStateAction<boolean>>;
  setEducationList?: React.Dispatch<React.SetStateAction<Education[]>>;
}

const initEducation: Education = {
  name: "",
  address: "",
  qualification: "",
  year: "",
};

function EducationForm({
  resumeId = 0,
  educationId = 0,
  closeAction,
  setEducationList,
}: EducationFormProps) {
  const [loading, setLoading] = React.useState(false);
  const [education, setEducation] = React.useState<Education>(initEducation);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (resumeId && educationId === 0) {
      console.log("Create education");
      const result = await createEducation({
        ...education,
        resumeId: resumeId,
      });
      console.log(`education created: ${result}`);
      toast({ description: "Education has been created" });
    } else {
      console.log("Update education");
      const result = await updateEducation(education);
      console.log(`education updated: ${result}`);
      toast({ description: "Education has been updated" });
    }

    if (closeAction) closeAction(false);
  };

  React.useEffect(() => {
    async function fetchEducation() {
      if (educationId) {
        const data = await getEducationFromDb(educationId);
        if (data) {
          setEducation(data as Education);
        }
      }
    }
    fetchEducation();
  }, [educationId]);

  return (
    <>
      <form onSubmit={handleSubmit} id="form">
        <FormInput
          name="name"
          type="text"
          placeholder="School/College/University name"
          defaultValue={education?.name || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEducation({ ...education, name: e.target.value })
          }
          required={true}
        />
        <FormInput
          name="address"
          type="text"
          placeholder="Address"
          defaultValue={education?.address || ""}
          required={true}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEducation({ ...education, address: e.target.value })
          }
        />
        <FormInput
          name="qualification"
          type="text"
          placeholder="Qualification"
          defaultValue={education?.qualification || ""}
          required={true}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEducation({ ...education, qualification: e.target.value })
          }
        />
        <FormInput
          name="year"
          type="text"
          placeholder="Completed year"
          defaultValue={education?.year || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEducation({ ...education, year: e.target.value })
          }
        />
        <Button type="submit" form="form">
          {educationId === 0 ? "Save" : "Update"}
        </Button>
      </form>
    </>
  );
}
export default EducationForm;
