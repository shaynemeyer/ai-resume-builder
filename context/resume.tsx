"use client";

import { ResumeContextType } from "@/types/resume";
import { useParams, usePathname } from "next/navigation";
import React from "react";

const ResumeContext = React.createContext<ResumeContextType | null>(null);

// const experienceField: Experience = {
//   id: 0,
//   title: "",
//   company: "",
//   address: "",
//   startDate: "",
//   endDate: "",
//   summary: "",
// };

// const intitialState: Resume = {
//   id: 0,
//   name: "",
//   job: "",
//   address: "",
//   phone: "",
//   email: "",
//   themeColor: "",
//   userEmail: "",
//   summary: "",
// };

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [step, setStep] = React.useState(1);
  const [resumeId, setResumeId] = React.useState(0);

  const { id } = useParams();
  const pathname = usePathname();

  React.useEffect(() => {
    if (pathname.includes("/resume/create")) {
      setStep(1);
    }
  }, [pathname]);

  // React.useEffect(() => {
  //   const saveResume = localStorage.getItem("resume");
  //   if (saveResume) {
  //     setResume(JSON.parse(saveResume));
  //   }
  // }, []);

  // React.useEffect(() => {
  //   getUserResumes();
  // }, []);

  React.useEffect(() => {
    if (id) {
      setResumeId(parseInt(id as string));
    }
  }, [id]);

  return (
    <ResumeContext.Provider
      value={{
        step,
        setStep,
        resumeId,
        setResumeId,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export const useResume = () => React.useContext(ResumeContext);
