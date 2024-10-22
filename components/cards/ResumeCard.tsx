import { Resume } from "@/types/resume";
import PersonalDetails from "../preview/PersonalDetails";
import Summary from "../preview/Summary";
import Alert from "../dialogs/CustomAlertDialog";
import { deleteResumeAction, getUserResumesFromDb } from "@/actions/resume";
import { toast } from "@/hooks/use-toast";

import ExperiencePreview from "../preview/ExperiencePreview";
import EducationPreview from "../preview/EducationPreview";
import SkillsPreview from "../preview/SkillsPreview";
import { Button } from "../ui/button";
import { Download, Trash2, UserPen } from "lucide-react";
import { useRouter } from "next/navigation";

interface ResumeCardProps {
  resume: Resume;
  setResumes: React.Dispatch<React.SetStateAction<Resume[]>>;
}

function ResumeCard({ resume, setResumes }: ResumeCardProps) {
  const router = useRouter();
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
      className="relative shadow-lg w-full rounded-xl p-5 border-t-[20px] max-h-screen overflow-y-auto"
      style={{ borderColor: resume.themeColor }}
    >
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

      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
        <div className="flex space-x-4">
          <Button
            onClick={() => router.push(`/dashboard/resume/edit/${resume.id}`)}
          >
            <UserPen />
          </Button>
          <Button
            onClick={() =>
              router.push(`/dashboard/resume/download/${resume.id}`)
            }
          >
            <Download />
          </Button>
          <Alert
            trigger={
              <Button>
                <Trash2 />
              </Button>
            }
            action={() => handleDelete(resume.id as number)}
          />
        </div>
      </div>
    </div>
  );
}
export default ResumeCard;
