import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Link href="/resume/create">
        <Button>start creating your res with ai</Button>
      </Link>
    </div>
  );
}
