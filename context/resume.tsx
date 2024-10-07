"use client";
import { Resume, ResumeContextType } from "@/types/resume";
import React from "react";

const ResumeContext = React.createContext<ResumeContextType | null>(null);

const intitialState: Resume = {
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

  return (
    <ResumeContext.Provider value={{ step, setStep, resume, setResume }}>
      {children}
    </ResumeContext.Provider>
  );
}

export const useResume = () => React.useContext(ResumeContext);
