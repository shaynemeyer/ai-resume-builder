import { Resume } from "@/types/resume";
import PersonalDetails from "../preview/PersonalDetails";
import Link from "next/link";

function ResumeCard({ resume }: { resume: Resume }) {
  return (
    <Link href={`/dashboard/resume/edit/${resume.id}`}>
      <div
        className="shadow-lg h-[175px] w-full rounded-xl p-5 border-t-[20px]"
        style={{ borderColor: resume.themeColor }}
      >
        <PersonalDetails resume={resume} />
      </div>
    </Link>
  );
}
export default ResumeCard;
