import { getSkillByResumeId } from "@/actions/skills";
import { Resume } from "@/types/resume";
import { Skill } from "@/types/skill";
import React from "react";
import { Progress } from "../ui/progress";
import { Star } from "lucide-react";

function SkillsPreview({
  resume,
  print = false,
}: {
  resume: Resume;
  print?: boolean;
}) {
  const [skillList, setSkillList] = React.useState<Skill[]>([]);
  const themeColor = resume?.themeColor || "#333";
  const defaultColor = "#d3d3d3";

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
      <h2 className="font-bold text-sm mb-2" style={{ color: themeColor }}>
        Skills
      </h2>
      <hr style={{ borderColor: themeColor }} />

      <div className="grid grid-cols-2 gap-3 my-4">
        {skillList.map((sk) => {
          return (
            <div key={sk.id} className="flex items-center justify-between">
              <h3 className="font-bold text-sm">{sk?.name}</h3>
              <div className="flex-1 ml-2">
                {print ? (
                  <div className="flex items-center">
                    {[...Array(5)].map((_, idx) => (
                      <Star
                        key={idx}
                        className="w-5 h-5"
                        style={{
                          color:
                            idx < parseInt(sk.level)
                              ? themeColor
                              : defaultColor,
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <Progress value={parseInt(sk.level) * 20} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SkillsPreview;
