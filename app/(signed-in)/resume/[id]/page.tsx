import { getResumeFromDb } from "@/actions/resume";
import EducationPreview from "@/components/preview/EducationPreview";
import ExperiencePreview from "@/components/preview/ExperiencePreview";
import PersonalDetails from "@/components/preview/PersonalDetails";
import SkillsPreview from "@/components/preview/SkillsPreview";
import Summary from "@/components/preview/Summary";
import { Resume } from "@/types/resume";

async function ResumePage({ params }: { params: { id: string } }) {
  const { id } = params;

  const resume = await getResumeFromDb(parseInt(id));

  if (!resume) return null;

  return (
    <div className="m-20">
      <PersonalDetails resume={resume as Resume} />
      <Summary
        summary={resume.summary as string}
        themeColor={resume.themeColor as string}
      />
      <ExperiencePreview resume={resume as Resume} />
      <EducationPreview resume={resume as Resume} />
      <SkillsPreview resume={resume as Resume} print={true} />
    </div>
  );
}
export default ResumePage;
