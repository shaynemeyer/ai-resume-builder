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

export interface ResumeOptionalFields {
  id?: number;
  summary?: string;
  themeColor?: string;
}

export type ResumeContextType = {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  resumeId: number;
  setResumeId: React.Dispatch<React.SetStateAction<number>>;
};
