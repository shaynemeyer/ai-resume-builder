import { createSkill, getSkillFromDb, updateSkill } from "@/actions/skills";
import { Skill } from "@/types/skill";
import React from "react";
import FormInput from "../form/FormInput";
import { Button } from "../ui/button";
import { toast } from "@/hooks/use-toast";

interface SkillFormProps {
  resumeId?: number;
  skillId?: number;
  actionButtonText?: string;
  closeAction?: React.Dispatch<React.SetStateAction<boolean>>;
  setSkillList?: React.Dispatch<React.SetStateAction<Skill[]>>;
}

const initSkill: Skill = {
  name: "",
  level: "",
};

function SkillForm({
  resumeId = 0,
  skillId = 0,
  closeAction,
  setSkillList,
}: SkillFormProps) {
  const [loading, setLoading] = React.useState(false);
  const [skill, setSkill] = React.useState<Skill>(initSkill);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (resumeId && skillId === 0) {
      console.log("Create skill");
      const result = await createSkill({
        ...skill,
        resumeId: resumeId,
      });
      console.log(`skill created: ${result}`);
      toast({ description: "Skill has been created" });
    } else {
      console.log("Update skill");
      const result = await updateSkill(skill);
      console.log(`skill updated: ${result}`);
      toast({ description: "Skill has been updated" });
    }

    if (closeAction) closeAction(false);
  };

  React.useEffect(() => {
    async function fetchSkill() {
      if (skillId) {
        const data = await getSkillFromDb(skillId);
        if (data) {
          setSkill(data as Skill);
        }
      }
    }
    fetchSkill();
  }, [skillId]);

  return (
    <>
      <form onSubmit={handleSubmit} id="form">
        <FormInput
          name="name"
          type="text"
          placeholder="Skill name"
          defaultValue={skill?.name || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSkill({ ...skill, name: e.target.value })
          }
          required={true}
        />
        <FormInput
          name="level"
          type="text"
          placeholder="Level"
          defaultValue={skill?.level || ""}
          required={true}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSkill({ ...skill, level: e.target.value })
          }
        />
        <Button type="submit" form="form">
          {skillId === 0 ? "Save" : "Update"}
        </Button>
      </form>
    </>
  );
}
export default SkillForm;
