import { useResume } from "@/context/resume";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

function StepOne() {
  const resumeCtx = useResume();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(resumeCtx?.resume);
    // save to db
    // go to next step
  };

  return (
    <div className="w-full lg:w-1/2 p-5 shadow-lg border-t-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-5">Personal Information</h2>
      <form onSubmit={handleSubmit}>
        <Input
          className="mb-3"
          onChange={(e) =>
            resumeCtx?.setResume({ ...resumeCtx?.resume, name: e.target.value })
          }
          value={resumeCtx?.resume.name}
          placeholder="Your name"
          type="text"
          autoFocus
          required
        />
        <Input
          className="mb-3"
          onChange={(e) =>
            resumeCtx?.setResume({ ...resumeCtx?.resume, job: e.target.value })
          }
          value={resumeCtx?.resume.job}
          placeholder="Job title"
          type="text"
          autoFocus
          required
        />
        <Input
          className="mb-3"
          onChange={(e) =>
            resumeCtx?.setResume({
              ...resumeCtx?.resume,
              address: e.target.value,
            })
          }
          value={resumeCtx?.resume.address}
          placeholder="Address"
          type="text"
          autoFocus
          required
        />
        <Input
          className="mb-3"
          onChange={(e) =>
            resumeCtx?.setResume({
              ...resumeCtx?.resume,
              phone: e.target.value,
            })
          }
          value={resumeCtx?.resume.phone}
          placeholder="Phone number"
          type="text"
          autoFocus
          required
        />
        <Input
          className="mb-3"
          onChange={(e) =>
            resumeCtx?.setResume({
              ...resumeCtx?.resume,
              email: e.target.value,
            })
          }
          value={resumeCtx?.resume.email}
          placeholder="Email address"
          type="email"
          autoFocus
          required
        />
        <div className="flex justify-end">
          <Button>Save</Button>
        </div>
      </form>
    </div>
  );
}
export default StepOne;
