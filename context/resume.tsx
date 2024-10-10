"use client";
import { saveResumeToDb } from "@/actions/resume";
import { Resume, ResumeContextType } from "@/types/resume";
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
};

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [resume, setResume] = React.useState<Resume>(intitialState);
  const [step, setStep] = React.useState(1);

  React.useEffect(() => {
    const saveResume = localStorage.getItem("resume");
    if (saveResume) {
      setResume(JSON.parse(saveResume));
    }
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
        // setStep(2);
      }
    } catch (error) {
      console.error(error);
      // todo: add toast notification
    }
  };

  return (
    <ResumeContext.Provider
      value={{ step, setStep, resume, setResume, saveResume }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export const useResume = () => React.useContext(ResumeContext);
