import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { ArrowRight, Plus, X, Loader2Icon, Brain } from "lucide-react";
import { useResume } from "@/context/resume";
import { Button } from "../ui/button";
import FormInput from "../form/FormInput";

function StepThree() {
  const resumeCtx = useResume();

  console.log("ResumeID: " + resumeCtx?.resumeId);

  return (
    <div className="w-full p-5 shadow-lg border-t-4 rounded-lg overflow-y-auto">
      <h2 className="text-2xl font-bold mb-5">Experiences</h2>

      {/* Add experience component here */}
      <div className="mb-10">
        <input type="hidden" name="resumeId" value={resumeCtx?.resumeId} />

        <FormInput
          name="job"
          type="text"
          placeholder="Job title"
          defaultValue={""}
        />
        <FormInput
          name="company"
          type="text"
          placeholder="Company name"
          defaultValue={""}
        />
        <FormInput
          name="address"
          type="text"
          placeholder="Address"
          defaultValue={""}
        />
        <FormInput
          name="startDate"
          type="text"
          placeholder="Start date"
          defaultValue={""}
        />
        <FormInput
          name="endDate"
          type="text"
          placeholder="endDate"
          defaultValue={""}
        />
      </div>

      <div className="flex justify-between mt-3">
        <Button variant="outline">
          <Plus size={18} className="mr-2" /> Add
        </Button>

        {/* {experienceList?.length > 1 && (
          <Button variant="outline" onClick={removeExperience}>
            <X size={18} className="mr-2" /> Remove
          </Button>
        )} */}

        <Button variant="outline">
          <ArrowRight size={18} className="mr-2" /> Next
        </Button>
      </div>
    </div>
  );
}
export default StepThree;
