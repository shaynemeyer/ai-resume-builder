import { getSkillByResumeId } from "@/actions/skills";
import { useResume } from "@/context/resume";
import { Skill } from "@/types/skill";
import React from "react";
import SkillCard from "../cards/SkillCard";
import { CustomSheet } from "../sheets/CustomSheet";
import { Button } from "../ui/button";
import { ArrowRight, Plus } from "lucide-react";
import SkillForm from "../skill/SkillForm";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

function StepFive() {
  const [skillOpen, setSkillOpen] = React.useState(false);
  const [skillList, setSkillList] = React.useState<Skill[]>([]);
  const resumeCtx = useResume();
  const router = useRouter();

  React.useEffect(() => {
    async function fetchAllSkills() {
      const results = await getSkillByResumeId(
        parseInt(resumeCtx?.resumeId as unknown as string)
      );
      if (results) {
        setSkillList(results as Skill[]);
      }
    }
    fetchAllSkills();
  }, []);

  return (
    <div className="w-full p-5 shadow-lg border-t-4 rounded-lg overflow-y-auto">
      <h2 className="text-2xl font-bold mb-5">Skills</h2>

      {skillList?.length > 0 &&
        skillList.map((ed) => {
          return (
            <div className="mb-4" key={ed.id}>
              <SkillCard skill={ed} setSkillList={setSkillList} />
            </div>
          );
        })}

      <div className="flex justify-between mt-3">
        <CustomSheet
          trigger={
            <Button variant="outline" onClick={() => setSkillOpen(true)}>
              <Plus size={18} className="mr-2" /> Add
            </Button>
          }
          open={skillOpen}
          sheetTitle="Add Skill"
          sheetDescription="Add your most recent or relevant skill."
          onCloseAction={setSkillOpen}
        >
          <SkillForm
            resumeId={resumeCtx?.resumeId}
            closeAction={setSkillOpen}
            setSkillList={setSkillList}
          />
        </CustomSheet>

        <Button
          variant="outline"
          onClick={() => {
            toast({ description: "Resume has been updated." });
            router.push("/dashboard");
          }}
        >
          <ArrowRight size={18} className="mr-2" /> Resume Complete
        </Button>
      </div>
    </div>
  );
}
export default StepFive;
