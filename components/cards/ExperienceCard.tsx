import { Experience } from "@/types/experience";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { IconButton } from "../form/Button";
import parse from "html-react-parser";
import { CustomSheet } from "../sheets/CustomSheet";
import ExperienceForm from "../experience/ExperienceForm";
import React from "react";
import { toast } from "@/hooks/use-toast";
import {
  deleteExperienceAction,
  getExperienceByResumeId,
} from "@/actions/experience";
import CustomAlertDialog from "../dialogs/CustomAlertDialog";

interface ExperienceCardProps {
  experience: Experience;
  setExperienceList: React.Dispatch<React.SetStateAction<Experience[]>>;
}

function ExperienceCard({
  experience,
  setExperienceList,
}: ExperienceCardProps) {
  const [experienceOpen, setExperienceOpen] = React.useState(false);

  const refetchExperience = async () => {
    const experienceList =
      (await getExperienceByResumeId(
        parseInt(experience.resumeId as unknown as string)
      )) || [];

    if (experienceList?.length > 0) {
      setExperienceList(experienceList as Experience[]);
    }
  };

  const handleDelete = (experienceId: number) => {
    async function deleteExperience() {
      await deleteExperienceAction(experienceId);
      toast({ description: "Experience has been deleted" });
    }
    deleteExperience();
    refetchExperience();
    setExperienceOpen(false);
  };

  if (!experience) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-row justify-between">
          <div>{experience.title}</div>

          <div>
            <CustomSheet
              trigger={
                <IconButton
                  actionType="edit"
                  className="p-0 "
                  onClick={() => setExperienceOpen(true)}
                ></IconButton>
              }
              open={experienceOpen}
              sheetTitle="Update Experience"
              sheetDescription="Update your work experience."
              onCloseAction={setExperienceOpen}
            >
              <ExperienceForm
                experienceId={experience.id}
                resumeId={experience.resumeId}
                closeAction={setExperienceOpen}
              />
            </CustomSheet>
            <CustomAlertDialog
              trigger={<IconButton actionType="delete"></IconButton>}
              action={() => handleDelete(experience.id as number)}
            />
          </div>
        </CardTitle>
        <CardDescription>
          <span className="block">{experience.company}</span>
          <span className="text-xs">{experience.address}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {experience.startDate && (
          <div className="mb-4">Start Date: {experience.startDate}</div>
        )}
        {experience.endDate && <div>End Date: {experience.endDate}</div>}
        {experience.summary && <div>Summary: {parse(experience.summary)}</div>}
      </CardContent>
    </Card>
  );
}
export default ExperienceCard;
