export interface Resume {
  id?: number;
  name: string;
  job: string;
  address: string;
  phone: string;
  email: string;
  themeColor?: string;
  userEmail?: string;
  summary?: string;
}

export type ResumeContextType = {
  resume: Resume;
  setResume: React.Dispatch<React.SetStateAction<Resume>>;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  saveResume: () => Promise<void>;
  resumes?: Resume[];
  updateResume: () => Promise<void>;
};
