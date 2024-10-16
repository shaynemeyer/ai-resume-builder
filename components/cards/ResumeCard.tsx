import { Resume } from "@/types/resume";
import PersonalDetails from "../preview/PersonalDetails";
import Link from "next/link";
import Summary from "../preview/Summary";
import { IconButton } from "../form/Button";
import Alert from "../dialogs/CustomAlertDialog";
import { deleteResumeAction, getUserResumesFromDb } from "@/actions/resume";
import { toast } from "@/hooks/use-toast";

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

      <PersonalDetails resume={resume} />
      <Summary summary={resume.summary as string} />
    </div>
  );
}
export default ResumeCard;
