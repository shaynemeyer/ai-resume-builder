"use client";

import { getResumeFromDb } from "@/actions/resume";
import ResumeCard from "@/components/cards/ResumeCard";
import { Button } from "@/components/ui/button";
import { useResume } from "@/context/resume";
import { toast } from "@/hooks/use-toast";
import { Resume } from "@/types/resume";
import { FileDown, Printer, Share2 } from "lucide-react";
import React from "react";

function ResumeDownloadPage({ params }: { params: { id: string } }) {
  const [resume, setResume] = React.useState<Resume>();
  const [_, setResumes] = React.useState<Resume[]>([]);
  const resumeCtx = useResume();
  const { id } = params;

  React.useEffect(() => {
    resumeCtx?.setStep(1);
    const fetchResume = async () => {
      if (id) {
        const data = await getResumeFromDb(parseInt(id));

        if (data) {
          setResume(data as Resume);
        }
      }
    };
    fetchResume();
  }, [resumeCtx, id]);

  const printResume = () => {
    if (typeof window !== "undefined") {
      const newWindow = window.open(`/resume/${id}`, "_blank");

      if (newWindow) {
        newWindow.onload = () => {
          setTimeout(() => {
            newWindow?.print();
          }, 300);
        };
      }
    }
  };

  if (!resume) return null;

  return (
    <div className="flex justify-center items-center min-h-screen mx-5 my-20 overflow-auto">
      <div className="text-center w-full md:w-1/3">
        <h2 className="font-bold text-lg">
          🎉 Congrats! Your AI powered resume is ready!
        </h2>
        <p>You can now download, print or share it with anyone.</p>
        <div className="flex justify-between my-5">
          <Button onClick={printResume}>
            Download <FileDown size={16} className="ml-2" />
          </Button>
          <Button onClick={printResume}>
            Print <Printer size={16} className="ml-2" />
          </Button>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(
                `${window.location.origin}/resume/${id}`
              );
              toast({
                description:
                  "Link copied to clipboard to share with anyone, anywhere!",
              });
            }}
          >
            Share <Share2 size={16} className="ml-2" />
          </Button>
        </div>
        {resume ? <ResumeCard resume={resume} setResumes={setResumes} /> : null}
        <div className="mb-10"></div>
      </div>
    </div>
  );
}
export default ResumeDownloadPage;
