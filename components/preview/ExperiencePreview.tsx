"use client";

import { Experience } from "@/types/experience";
import { Resume } from "@/types/resume";
import * as React from "react";
import parse from "html-react-parser";
import { getExperienceByResumeId } from "@/actions/experience";

function ExperiencePreview({ resume }: { resume: Resume }) {
  const [experienceList, setExperienceList] = React.useState<Experience[]>([]);
  const { id } = resume;

  React.useEffect(() => {
    async function fetchAllExperiences() {
      if (id) {
        const results = await getExperienceByResumeId(
          parseInt(id as unknown as string)
        );
        if (results) {
          setExperienceList(results as Experience[]);
        }
      }
    }
    fetchAllExperiences();
  }, [id]);

  return (
    <div className="my-6">
      <h2
        className="font-bold text-sm mb-2"
        style={{ color: resume.themeColor }}
      >
        Professional Experience
      </h2>
      <hr style={{ color: resume.themeColor }} />
      {experienceList.map((exp) => {
        return (
          <div key={exp.id} className="my-5">
            <h2 className="text-sm font-bold">{exp?.title}</h2>
            <h3 className="text-sm">{exp?.company}</h3>
            <div className="text-xs text-gray-600">{exp?.address}</div>

            {exp?.summary && (
              <div className="mt-4">
                {parse(exp?.summary as unknown as string)}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
export default ExperiencePreview;
