import { useResume } from "@/context/resume";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { SignInButton, useUser } from "@clerk/nextjs";

function StepOne() {
  const { isSignedIn } = useUser();
  const resumeCtx = useResume();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await resumeCtx?.updateResume();
    resumeCtx?.setStep(2);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // update the resume state
    resumeCtx?.setResume((prevState) => {
      const updatedResume = {
        ...prevState,
        [name]: value,
      };
      // save to local storage
      localStorage.setItem("resume", JSON.stringify(updatedResume));
      return updatedResume;
    });
  };

  return (
    <div className="w-full p-5 shadow-lg border-t-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-5">Personal Information</h2>

      <Input
        name="name"
        className="mb-3"
        onChange={handleChange}
        value={resumeCtx?.resume.name}
        placeholder="Your name"
        type="text"
        autoFocus
        required
      />
      <Input
        name="job"
        className="mb-3"
        onChange={handleChange}
        value={resumeCtx?.resume.job}
        placeholder="Job title"
        type="text"
        autoFocus
        required
      />
      <Input
        name="address"
        className="mb-3"
        onChange={handleChange}
        value={resumeCtx?.resume.address}
        placeholder="Address"
        type="text"
        autoFocus
        required
      />
      <Input
        name="phone"
        className="mb-3"
        onChange={handleChange}
        value={resumeCtx?.resume.phone}
        placeholder="Phone number"
        type="text"
        autoFocus
        required
      />
      <Input
        name="email"
        className="mb-3"
        onChange={handleChange}
        value={resumeCtx?.resume.email}
        placeholder="Email address"
        type="email"
        autoFocus
        required
      />
      <div className="flex justify-end">
        {!isSignedIn ? (
          <SignInButton>Sign in to save</SignInButton>
        ) : (
          <Button onClick={handleSubmit}>Save</Button>
        )}
      </div>
    </div>
  );
}
export default StepOne;
