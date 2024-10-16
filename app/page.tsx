"use client";

import { Button } from "@/components/ui/button";
import { useUser, SignInButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  const { isSignedIn } = useUser();

  return (
    <div className="flex justify-center items-center h-screen">
      {!isSignedIn ? (
        <SignInButton>
          <Button>Sign in to create a resume</Button>
        </SignInButton>
      ) : (
        <Link href="/resume/create">
          <Button>start creating your res with ai</Button>
        </Link>
      )}
    </div>
  );
}
