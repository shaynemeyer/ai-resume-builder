import { Resume } from "@/types/resume";
import PersonalDetails from "../preview/PersonalDetails";

function ResumeCard({ resume }: { resume: Resume }) {
  return (
    <div
      className="shadow-lg h-[175px] w-full rounded-xl p-5 border-t-[20px]"
      style={{ borderColor: resume.themeColor }}
    >
      <PersonalDetails resume={resume} />
    </div>
  );
}
export default ResumeCard;
