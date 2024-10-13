import { useResume } from "@/context/resume";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

function StepTwo() {
  const resumeCtx = useResume();

  const handleSumbit = async (e: React.FormEvent) => {
    e.preventDefault();
    // save the resume to the database
    await resumeCtx?.updateResume();
    // go to next step
    resumeCtx?.setStep(3);
  };
  return (
    <div className="w-full p-5 shadow-lg border-t-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-5">Summary</h2>
      <Textarea
        onChange={(e) =>
          resumeCtx?.setResume({
            ...resumeCtx.resume,
            summary: e.target.value,
          })
        }
        value={resumeCtx?.resume.summary}
        className="mb-3"
        placeholder="Write a summary about yourself"
        rows={10}
      />
      <div className="flex justify-end">
        <Button onClick={handleSumbit}>Next</Button>
      </div>
    </div>
  );
}
export default StepTwo;
