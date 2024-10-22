import { Resume } from "@/types/resume";
import PersonalDetails from "../preview/PersonalDetails";
import Link from "next/link";
import Summary from "../preview/Summary";
import { IconButton } from "../form/Button";
import Alert from "../dialogs/CustomAlertDialog";
import { deleteResumeAction, getUserResumesFromDb } from "@/actions/resume";
import { toast } from "@/hooks/use-toast";

import ExperiencePreview from "../preview/ExperiencePreview";
import EducationPreview from "../preview/EducationPreview";
import SkillsPreview from "../preview/SkillsPreview";

interface ResumeCardProps {
  resume: Resume;
  setResumes: React.Dispatch<React.SetStateAction<Resume[]>>;
}

function ResumeCard({ resume, setResumes }: ResumeCardProps) {
  const refetchResumes = async () => {
    const resumes = (await getUserResumesFromDb()) || [];

    if (resumes?.length > 0) {
      setResumes(resumes as Resume[]);
    }
  };

  const handleDelete = (resumeId: number) => {
    async function deleteResume() {
      await deleteResumeAction(resumeId);
      toast({ description: "Resume has been deleted" });
    }
    deleteResume();
    refetchResumes();
  };

  return (
    <div
      className="shadow-lg w-full rounded-xl p-5 border-t-[20px] max-h-screen overflow-y-auto"
      style={{ borderColor: resume.themeColor }}
    >
      <div className="mt-[-20px] mb-[-30px]">
        <Link href={`/dashboard/resume/edit/${resume.id}`}>
          <IconButton actionType="edit"></IconButton>
        </Link>

        <Alert
          trigger={<IconButton actionType="delete"></IconButton>}
          action={() => handleDelete(resume.id as number)}
        />
      </div>

      <div className="line-clamp-3">
        <PersonalDetails resume={resume} />
      </div>
      <div className="line-clamp-4">
        <Summary
          summary={resume.summary as string}
          themeColor={resume.themeColor as string}
        />
      </div>
      <div className="line-clamp-4">
        <ExperiencePreview resume={resume as Resume} />
      </div>
      <div className="line-clamp-4">
        <EducationPreview resume={resume as Resume} />
      </div>
      <div className="line-clamp-4">
        <SkillsPreview resume={resume as Resume} />
      </div>
    </div>
  );
}
export default ResumeCard;
