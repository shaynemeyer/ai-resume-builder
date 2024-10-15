import { useResume } from "@/context/resume";
import PersonalDetails from "../preview/PersonalDetails";
import Summary from "../preview/Summary";
import { Resume } from "@/types/resume";

function ResumeCard() {
  const resumeCtx = useResume();

  return (
    <div
      className="shadow-lg max-h-screen w-full rounded-xl p-5 border-t-[20px] overflow-y-auto"
      style={{ borderColor: resumeCtx?.resume.themeColor }}
    >
      <PersonalDetails resume={resumeCtx?.resume as Resume} />
      <Summary summary={resumeCtx?.resume.summary as string} />
    </div>
  );
}
export default ResumeCard;
