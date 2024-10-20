"use client";

import { ArrowRight, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { CustomSheet } from "../sheets/CustomSheet";
import EducationForm from "../education/EducationForm";
import { useResume } from "@/context/resume";
import React from "react";
import { Education } from "@/types/education";
import EducationCard from "../cards/EducationCard";
import { getEducationByResumeId } from "@/actions/education";

function StepFour() {
  const [educationOpen, setEducationOpen] = React.useState(false);
  const [educationList, setEducationList] = React.useState<Education[]>([]);
  const resumeCtx = useResume();

  React.useEffect(() => {
    async function fetchAllEducations() {
      const results = await getEducationByResumeId(
        parseInt(resumeCtx?.resumeId as unknown as string)
      );
      if (results) {
        setEducationList(results as Education[]);
      }
    }
    fetchAllEducations();
  }, []);

  return (
    <div className="w-full p-5 shadow-lg border-t-4 rounded-lg overflow-y-auto">
      <h2 className="text-2xl font-bold mb-5">Education</h2>
      {educationList?.length > 0 &&
        educationList.map((ed) => {
          return (
            <div className="mb-10" key={ed.id}>
              <EducationCard
                education={ed}
                setEducationList={setEducationList}
              />
            </div>
          );
        })}
      <div className="flex justify-between mt-3">
        <CustomSheet
          trigger={
            <Button variant="outline" onClick={() => setEducationOpen(true)}>
              <Plus size={18} className="mr-2" /> Add
            </Button>
          }
          open={educationOpen}
          sheetTitle="Add Education"
          sheetDescription="Add your most recent or relevant education."
          onCloseAction={setEducationOpen}
        >
          <EducationForm
            resumeId={resumeCtx?.resumeId}
            closeAction={setEducationOpen}
            setEducationList={setEducationList}
          />
        </CustomSheet>

        <Button variant="outline">
          <ArrowRight size={18} className="mr-2" /> Next
        </Button>
      </div>
    </div>
  );
}
export default StepFour;
