import { toast } from "@/hooks/use-toast";
import CustomAlertDialog from "../dialogs/CustomAlertDialog";
import { IconButton } from "../form/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { deleteSkillAction, getSkillByResumeId } from "@/actions/skills";
import { Skill, skillLevels } from "@/types/skill";
import React from "react";
import { CustomSheet } from "../sheets/CustomSheet";
import SkillForm from "../skill/SkillForm";

interface SkillCardProps {
  skill: Skill;
  setSkillList: React.Dispatch<React.SetStateAction<Skill[]>>;
}

function SkillCard({ skill, setSkillList }: SkillCardProps) {
  const [skillOpen, setSkillOpen] = React.useState(false);

  const refetchSkill = async () => {
    const skillList =
      (await getSkillByResumeId(
        parseInt(skill.resumeId as unknown as string)
      )) || [];

    if (skillList?.length > 0) {
      setSkillList(skillList as Skill[]);
    }
  };

  const handleDelete = (skillId: number) => {
    console.log(`Deleting ${skillId}`);
    async function deleteSkill() {
      await deleteSkillAction(skillId);
      toast({ description: "Skill has been deleted" });
    }
    deleteSkill();
    refetchSkill();
    setSkillOpen(false);
  };

  if (!skill) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-row justify-between">
          <div>
            <span className="block">{skill.name}</span>
            <span className="text-xs text-muted-foreground">
              {
                skillLevels.find((sk) => sk.value.toString() === skill.level)
                  ?.label
              }
            </span>
          </div>

          <div>
            <CustomSheet
              trigger={
                <IconButton
                  actionType="edit"
                  className="p-0 "
                  onClick={() => setSkillOpen(true)}
                ></IconButton>
              }
              open={skillOpen}
              sheetTitle="Update Skill"
              sheetDescription="Update your work skill."
              onCloseAction={setSkillOpen}
            >
              <SkillForm
                skillId={skill.id}
                resumeId={skill.resumeId}
                closeAction={setSkillOpen}
              />
            </CustomSheet>
            <CustomAlertDialog
              trigger={<IconButton actionType="delete"></IconButton>}
              action={() => handleDelete(skill.id as number)}
            />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* {education.qualification && (
      <div className="mb-1">Qualification: {education.qualification}</div>
    )}
    {education.year && <div>Completed year: {education.year}</div>} */}
      </CardContent>
    </Card>
  );
}
export default SkillCard;
