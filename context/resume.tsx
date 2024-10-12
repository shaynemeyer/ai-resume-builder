"use client";
import {
  getResumeFromDb,
  getUserResumesFromDb,
  saveResumeToDb,
  updateResumeFromDb,
} from "@/actions/resume";
import { useToast } from "@/hooks/use-toast";
import { Resume, ResumeContextType } from "@/types/resume";
import { useParams, useRouter } from "next/navigation";
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
  const { id } = useParams();

  React.useEffect(() => {
    const saveResume = localStorage.getItem("resume");
    if (saveResume) {
      setResume(JSON.parse(saveResume));
    }
  }, []);

  React.useEffect(() => {
    getUserResumes();
  }, []);

  React.useEffect(() => {
    if (id) {
      getResume();
    }
  }, [id]);

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
          email: data[0].email as string,
          userEmail: data[0].userEmail as string,
        });

        localStorage.removeItem("resume");

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

  const getResume = async () => {
    try {
      const data = await getResumeFromDb(parseInt(id as string));
      setResume(data as Resume);
    } catch (error) {
      console.error(error);
      toast({ variant: "destructive", description: "Failed to fetch resume" });
    }
  };

  const updateResume = async () => {
    try {
      const data = await updateResumeFromDb(resume);
      if (data) {
        setResume(data as unknown as Resume);
        toast({
          variant: "default",
          description: "Resume updated. Keep building.",
        });
        setStep(3);
      }
    } catch (error) {
      console.error(error);
      toast({ variant: "destructive", description: "Failed to update resume" });
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
