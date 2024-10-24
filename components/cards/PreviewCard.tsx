import EducationPreview from "../preview/EducationPreview";
import ExperiencePreview from "../preview/ExperiencePreview";
import PersonalDetails from "../preview/PersonalDetails";
import SkillsPreview from "../preview/SkillsPreview";
import Summary from "../preview/Summary";
import { Resume } from "@/types/resume";

function PreviewCard({ resume }: { resume: Resume }) {
  return (
    <div
      className="shadow-lg max-h-screen w-full rounded-xl p-5 border-t-[20px] overflow-y-auto"
      style={{ borderColor: resume?.themeColor }}
    >
      <PersonalDetails resume={resume} />
      <Summary
        summary={resume.summary as string}
        themeColor={resume.themeColor as string}
      />
      <ExperiencePreview resume={resume as Resume} />
      <EducationPreview resume={resume as Resume} />
      <SkillsPreview resume={resume as Resume} />
    </div>
  );
}
export default PreviewCard;
