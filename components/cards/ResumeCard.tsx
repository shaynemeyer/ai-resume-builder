import { Resume } from "@/types/resume";
import PersonalDetails from "../preview/PersonalDetails";
import Link from "next/link";
import Summary from "../preview/Summary";

function ResumeCard({ resume }: { resume: Resume }) {
  return (
    <Link href={`/dashboard/resume/edit/${resume.id}`}>
      <div
        className="shadow-lg h-[175px] w-full rounded-xl p-5 border-t-[20px]"
        style={{ borderColor: resume.themeColor }}
      >
        <PersonalDetails resume={resume} />
        <Summary summary={resume.summary as string} />
      </div>
    </Link>
  );
}
export default ResumeCard;
