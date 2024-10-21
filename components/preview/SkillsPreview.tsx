import { getSkillByResumeId } from "@/actions/skills";
import { Resume } from "@/types/resume";
import { Skill, skillLevels } from "@/types/skill";
import React from "react";
import { Progress } from "../ui/progress";

function SkillsPreview({ resume }: { resume: Resume }) {
  const [skillList, setSkillList] = React.useState<Skill[]>([]);

  React.useEffect(() => {
    async function fetchAllSkills() {
      if (resume.id) {
        const results = await getSkillByResumeId(
          parseInt(resume?.id as unknown as string)
        );
        if (results) {
          setSkillList(results as Skill[]);
        }
      }
    }
    fetchAllSkills();
  }, []);

  return (
    <div className="my-6">
      <h2
        className="font-bold text-sm mb-2"
        style={{ color: resume.themeColor }}
      >
        Skills
      </h2>
      <hr style={{ color: resume.themeColor }} />

      <div className="flex flex-row gap-2">
        {skillList.map((sk, index) => {
          return (
            <div key={sk.id} className="grid grid-cols-2 gap-3 my-4">
              <h3 className="font-bold text-sm">{sk.name}</h3>
              <div className="flex-1 ml-2">
                <Progress value={Number(sk.level) * 20} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SkillsPreview;
