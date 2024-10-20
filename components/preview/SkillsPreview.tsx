import { getSkillByResumeId } from '@/actions/skills';
import { Resume } from '@/types/resume';
import { Skill } from '@/types/skill';
import React from 'react';

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

      {skillList.map((sk, index) => {
        return (
          <div key={sk.id} className="my-5">
            <h3 className="font-bold text-sm">{sk.name}</h3>
            <div className="ml-2">
              <p className="text-sm">{sk.level}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SkillsPreview;
