import { useResume } from "@/context/resume";
import { Button } from "../ui/button";

function ResumeCreateNav() {
  const resumeCtx = useResume();

  return (
    <nav className="flex justify-center w-full py-4">
      <div className="flex space-x-4">
        {[1, 2, 3, 4, 5].map((item) => (
          <Button
            key={item}
            className={`w-10 h-10 flex items-center justify-center rounded-full transition hover:bg-primary hover:text-slate-200  ${
              resumeCtx?.step === item
                ? "bg-primary text-slate-200 dark:text-slate-800"
                : "bg-secondary text-gray-700 dark:text-gray-400"
            }`}
            onClick={() => resumeCtx?.setStep(item)}
            disabled={resumeCtx?.step < item}
          >
            {item}
          </Button>
        ))}
      </div>
    </nav>
  );
}
export default ResumeCreateNav;
