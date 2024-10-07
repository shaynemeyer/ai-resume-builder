export interface Resume {
  name: string;
  job: string;
  address: string;
  phone: string;
  email: string;
  themeColor: string;
}

export type ResumeContextType = {
  resume: Resume;
  setResume: React.Dispatch<React.SetStateAction<Resume>>;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
};
