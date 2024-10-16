import PersonalDetails from "../preview/PersonalDetails";
import Summary from "../preview/Summary";
import { Resume } from "@/types/resume";

function PreviewCard({ resume }: { resume: Resume }) {
  return (
    <div
      className="shadow-lg max-h-screen w-full rounded-xl p-5 border-t-[20px] overflow-y-auto"
      style={{ borderColor: resume?.themeColor }}
    >
      <PersonalDetails resume={resume} />
      <Summary summary={resume.summary as string} />
    </div>
  );
}
export default PreviewCard;
