import { ArrowRight, Plus } from "lucide-react";
import { useResume } from "@/context/resume";
import { Button } from "../ui/button";
import { Experience } from "@/types/experience";
import * as React from "react";
import { CustomSheet } from "../sheets/CustomSheet";
import ExperienceForm from "../experience/ExperienceForm";
import { getExperienceByResumeId } from "@/actions/experience";
import ExperienceCard from "../cards/ExperienceCard";

function StepThree() {
  const [experienceOpen, setExperienceOpen] = React.useState(false);
  const [experienceList, setExperienceList] = React.useState<Experience[]>([]);
  const resumeCtx = useResume();

  React.useEffect(() => {
    async function fetchAllExperiences() {
      const results = await getExperienceByResumeId(
        parseInt(resumeCtx?.resumeId as unknown as string)
      );
      if (results) {
        setExperienceList(results as Experience[]);
      }
    }
    fetchAllExperiences();
  }, []);

  return (
    <div className="w-full p-5 shadow-lg border-t-4 rounded-lg overflow-y-auto">
      <h2 className="text-2xl font-bold mb-5">Experiences</h2>

      {experienceList?.length > 0 &&
        experienceList.map((exp) => {
          return (
            <div className="mb-10" key={exp.id}>
              <ExperienceCard
                experience={exp}
                setExperienceList={setExperienceList}
              />
            </div>
          );
        })}

      <div className="flex justify-between mt-3">
        <CustomSheet
          trigger={
            <Button variant="outline" onClick={() => setExperienceOpen(true)}>
              <Plus size={18} className="mr-2" /> Add
            </Button>
          }
          open={experienceOpen}
          sheetTitle="Add Experience"
          sheetDescription="Add your most recent or relevant work experience."
          onCloseAction={setExperienceOpen}
        >
          <ExperienceForm
            resumeId={resumeCtx?.resumeId}
            closeAction={setExperienceOpen}
            setExperienceList={setExperienceList}
          />
        </CustomSheet>

        <Button variant="outline" onClick={() => resumeCtx?.setStep(4)}>
          <ArrowRight size={18} className="mr-2" /> Next
        </Button>
      </div>
    </div>
  );
}
export default StepThree;
