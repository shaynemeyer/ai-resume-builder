"use client";

function Summary({ summary }: { summary: string }) {
  return (
    <div className="mt-5">
      <h2 className="font-bold mb-3">Summary</h2>
      {summary && <p className="text-xs">{summary}</p>}
    </div>
  );
}

export default Summary;
