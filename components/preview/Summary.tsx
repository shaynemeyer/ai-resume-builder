"use client";
import parse from "html-react-parser";

function Summary({
  summary,
  themeColor,
}: {
  summary: string;
  themeColor: string;
}) {
  return (
    <div className="mt-5">
      <h2 className="font-bold mb-3" style={{ color: themeColor }}>
        Summary
      </h2>
      {summary && <p className="text-xs">{parse(summary)}</p>}
    </div>
  );
}

export default Summary;
