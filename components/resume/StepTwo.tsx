import { useResume } from "@/context/resume";
import { Button } from "../ui/button";
import { Brain, Loader2Icon } from "lucide-react";
import React from "react";
import { toast } from "@/hooks/use-toast";
import { runAi } from "@/actions/ai";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

function StepTwo() {
  const resumeCtx = useResume();

  const [loading, setLoading] = React.useState(false);

  const handleSumbit = async (e: React.FormEvent) => {
    e.preventDefault();
    // save the resume to the database
    await resumeCtx?.updateResume();
    // go to next step
    resumeCtx?.setStep(3);
  };

  const handleGenerateWithAi = async () => {
    setLoading(true);
    if (!resumeCtx?.resume.job) {
      toast({
        variant: "destructive",
        description:
          "Please fill in your personal details or write something about yourself.",
      });
      setLoading(false);
      return;
    }

    const response = await runAi(
      `Generate a resume summary for a person with the following details: ${JSON.stringify(
        resumeCtx.resume
      )} in plain text format`
    );

    resumeCtx?.setResume({
      ...resumeCtx.resume,
      summary: response,
    });
    setLoading(false);
  };

  return (
    <div className="w-full p-5 shadow-lg border-t-4 rounded-lg">
      <div className="flex justify-between">
        <h2
          className="text-2xl font-bold mb-5"
          style={{ color: resumeCtx?.resume.themeColor }}
        >
          Summary
        </h2>

        <Button
          variant="destructive"
          onClick={handleGenerateWithAi}
          disabled={loading}
        >
          {loading ? (
            <Loader2Icon size={18} className="mr-2 animate-spin" />
          ) : (
            <Brain size={18} className="mr-2" />
          )}
          Generate with AI
        </Button>
      </div>

      <ReactQuill
        value={resumeCtx?.resume.summary}
        onChange={(value) =>
          resumeCtx?.setResume({ ...resumeCtx.resume, summary: value })
        }
        theme="snow"
      />

      <div className="flex justify-end mt-3">
        <Button onClick={handleSumbit}>Next</Button>
      </div>
    </div>
  );
}
export default StepTwo;
