import { Resume } from "@/types/resume";
import PersonalDetails from "../preview/PersonalDetails";
import Link from "next/link";
import Summary from "../preview/Summary";
import { IconButton } from "../form/Button";

function ResumeCard({ resume }: { resume: Resume }) {
  return (
    <div
      className="shadow-lg w-full rounded-xl p-5 border-t-[20px] max-h-screen overflow-y-auto"
      style={{ borderColor: resume.themeColor }}
    >
      <div className="mt-[-20px] mb-[-30px]">
        <Link href={`/dashboard/resume/edit/${resume.id}`}>
          <IconButton actionType="edit"></IconButton>
        </Link>

        <IconButton
          actionType="delete"
          onClick={() => alert("delete")}
        ></IconButton>
      </div>

      <PersonalDetails resume={resume} />
      <Summary summary={resume.summary as string} />
    </div>
  );
}
export default ResumeCard;
