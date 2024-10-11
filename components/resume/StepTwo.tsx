import { useResume } from "@/context/resume";

function StepTwo() {
  const resumeCtx = useResume();
  return <div>StepTwo {resumeCtx?.resume.id}</div>;
}
export default StepTwo;
