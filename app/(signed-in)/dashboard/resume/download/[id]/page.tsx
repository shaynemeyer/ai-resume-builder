"use client";

import { Button } from "@/components/ui/button";
import { useResume } from "@/context/resume";
import { FileDown, Printer, Share2 } from "lucide-react";
import React from "react";

function ResumeDownloadPage() {
  const resumeCtx = useResume();

  React.useEffect(() => {
    resumeCtx?.setStep(1);
  }, [resumeCtx]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <h2 className="font-bold text-lg">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam,
          laboriosam!
        </h2>
        <div className="flex justify-between my-5">
          <Button>
            Download <FileDown size={16} className="ml-2" />
          </Button>
          <Button>
            Print <Printer size={16} className="ml-2" />
          </Button>
          <Button>
            Share <Share2 size={16} className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
export default ResumeDownloadPage;
