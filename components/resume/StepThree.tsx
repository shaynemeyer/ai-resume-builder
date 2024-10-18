import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { ArrowRight, Plus, X, Loader2Icon, Brain } from "lucide-react";
import { useResume } from "@/context/resume";
import { Button } from "../ui/button";
import FormInput from "../form/FormInput";
import { Experience } from "@/types/experience";
import * as React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CustomSheet } from "../sheets/CustomSheet";
import ExperienceForm from "../experience/ExperienceForm";

const initExperience: Experience = {
  title: "",
  company: "",
  address: "",
  startDate: "",
  endDate: "",
  summary: "",
};

function StepThree() {
  const [experienceList, setExperienceList] = React.useState<Experience[]>([]);
  const resumeCtx = useResume();

  console.log("ResumeID: " + resumeCtx?.resumeId);

  const removeExperience = async () => {
    console.log("removeExperience");
  };

  return (
    <div className="w-full p-5 shadow-lg border-t-4 rounded-lg overflow-y-auto">
      <h2 className="text-2xl font-bold mb-5">Experiences</h2>

      {experienceList?.length > 0 && <div className="mb-10"></div>}

      <div className="flex justify-between mt-3">
        <CustomSheet
          data={initExperience}
          trigger={
            <Button variant="outline">
              <Plus size={18} className="mr-2" /> Add
            </Button>
          }
          open={false}
          sheetTitle="Add Experience"
          sheetDescription="Add your most recent or relevant work experience."
        >
          <ExperienceForm resumeId={resumeCtx?.resumeId} />
        </CustomSheet>

        {/* {experienceList?.length > 1 && (
          <Button variant="outline" onClick={removeExperience}>
            <X size={18} className="mr-2" /> Remove
          </Button>
        )} */}

        {/* <Button variant="outline">
          <ArrowRight size={18} className="mr-2" /> Next
        </Button> */}
      </div>
    </div>
  );
}
export default StepThree;
