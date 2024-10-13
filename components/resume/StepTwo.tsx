import { useResume } from "@/context/resume";
import { Textarea } from "../ui/textarea";

function StepTwo() {
  const resumeCtx = useResume();
  return (
    <div className="w-full md:w-1/2 p-5 shadow-lg border-t-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-5">
        <Textarea
          onChange={(e) =>
            resumeCtx?.setResume({
              ...resumeCtx.resume,
              summary: e.target.value,
            })
          }
          value={resumeCtx?.resume.summary}
          className="mb-3"
          placeholder=""
        />
      </h2>
    </div>
  );
}
export default StepTwo;
