"use client";
import { getUserResumesFromDb, saveResumeToDb } from "@/actions/resume";
import { useToast } from "@/hooks/use-toast";
import { Resume, ResumeContextType } from "@/types/resume";
import { useRouter } from "next/navigation";
import React from "react";

const ResumeContext = React.createContext<ResumeContextType | null>(null);

const intitialState: Resume = {
  id: 0,
  name: "",
  job: "",
  address: "",
  phone: "",
  email: "",
  themeColor: "",
  userEmail: "",
};

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [resume, setResume] = React.useState<Resume>(intitialState);
  const [resumes, setResumes] = React.useState<Resume[]>([]);
  const [step, setStep] = React.useState(1);
  const { toast } = useToast();
  const router = useRouter();

  React.useEffect(() => {
    const saveResume = localStorage.getItem("resume");
    if (saveResume) {
      setResume(JSON.parse(saveResume));
    }
  }, []);

  React.useEffect(() => {
    getUserResumes();
  }, []);

  const saveResume = async () => {
    try {
      const data = await saveResumeToDb(resume);

      if (data) {
        alert("Resume saved successfully");
        setResume({
          id: data[0].id,
          name: data[0].name as string,
          job: data[0].job as string,
          address: data[0].address as string,
          phone: data[0].phone as string,
          email: data[0].userEmail as string,
        });
        toast({
          variant: "default",
          description: "Resume saved. Keep building.",
        });
        router.push(`/dashboard/resume/edit/${data[0].id!}`);
        setStep(2);
      }
    } catch (error) {
      console.error(error);
      toast({ variant: "destructive", description: "Failed to save resume" });
    }
  };

  const getUserResumes = async () => {
    try {
      const data = await getUserResumesFromDb();

      if (data) {
        setResumes(data as Resume[]);
      }
    } catch (error) {
      console.error(error);
      toast({ variant: "destructive", description: "Failed to save resume" });
    }
  };

  return (
    <ResumeContext.Provider
      value={{ step, setStep, resume, setResume, saveResume, resumes }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export const useResume = () => React.useContext(ResumeContext);
