import { Education } from "@/types/education";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CustomSheet } from "../sheets/CustomSheet";
import CustomAlertDialog from "../dialogs/CustomAlertDialog";
import { IconButton } from "../form/Button";
import EducationForm from "../education/EducationForm";
import {
  deleteEducationAction,
  getEducationByResumeId,
} from "@/actions/education";
import { toast } from "@/hooks/use-toast";

interface EducationCardProps {
  education: Education;
  setEducationList: React.Dispatch<React.SetStateAction<Education[]>>;
}

function EducationCard({ education, setEducationList }: EducationCardProps) {
  const [educationOpen, setEducationOpen] = React.useState(false);

  const refetchEducation = async () => {
    const educationList =
      (await getEducationByResumeId(
        parseInt(education.resumeId as unknown as string)
      )) || [];

    if (educationList?.length > 0) {
      setEducationList(educationList as Education[]);
    }
  };

  const handleDelete = (educationId: number) => {
    console.log(`Deleting ${educationId}`);
    async function deleteEducation() {
      await deleteEducationAction(educationId);
      toast({ description: "Education has been deleted" });
    }
    deleteEducation();
    refetchEducation();
    setEducationOpen(false);
  };

  if (!education) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-row justify-between">
          <div>
            <span className="block">{education.name}</span>
            <span className="text-xs text-muted-foreground">
              {education.address}
            </span>
          </div>

          <div>
            <CustomSheet
              trigger={
                <IconButton
                  actionType="edit"
                  className="p-0 "
                  onClick={() => setEducationOpen(true)}
                ></IconButton>
              }
              open={educationOpen}
              sheetTitle="Update Education"
              sheetDescription="Update your work education."
              onCloseAction={setEducationOpen}
            >
              <EducationForm
                educationId={education.id}
                resumeId={education.resumeId}
                closeAction={setEducationOpen}
              />
            </CustomSheet>
            <CustomAlertDialog
              trigger={<IconButton actionType="delete"></IconButton>}
              action={() => handleDelete(education.id as number)}
            />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {education.qualification && (
          <div className="mb-1">Qualification: {education.qualification}</div>
        )}
        {education.year && <div>Completed year: {education.year}</div>}
      </CardContent>
    </Card>
  );
}
export default EducationCard;
