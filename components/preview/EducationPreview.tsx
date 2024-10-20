import { getEducationByResumeId } from "@/actions/education";
import { Education } from "@/types/education";
import { Resume } from "@/types/resume";
import React from "react";

function EducationPreview({ resume }: { resume: Resume }) {
  const [educationList, setEducationList] = React.useState<Education[]>([]);

  React.useEffect(() => {
    async function fetchAllEducations() {
      const results = await getEducationByResumeId(
        parseInt(resume?.id as unknown as string)
      );
      if (results) {
        setEducationList(results as Education[]);
      }
    }
    fetchAllEducations();
  }, []);

  return (
    <div className="my-6">
      <h2
        className="font-bold text-sm mb-2"
        style={{ color: resume.themeColor }}
      >
        Education
      </h2>
      <hr style={{ color: resume.themeColor }} />

      {educationList.map((edu, index) => {
        return (
          <div key={edu.id} className="my-5">
            <h3 className="font-bold text-sm">{edu.qualification}</h3>
            <div className="ml-2">
              <p className="text-sm">{edu.name}</p>
              <p className="text-sm">{edu.address}</p>
              <p className="text-sm">{edu.year}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default EducationPreview;
