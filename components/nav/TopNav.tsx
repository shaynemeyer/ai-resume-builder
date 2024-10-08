"use client";

import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import Image from "next/image";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";

function TopNav() {
  const { isSignedIn, user } = useUser();
  return (
    <nav className="flex justify-between p-1 shadow">
      <Link href="/">
        <Image src="/images/logo.svg" height={50} width={50} alt="Logo" />
      </Link>
      <div className="flex justify-end items-center gap-2">
        {isSignedIn && (
          <Link href="/dashboard">{user?.fullName}&apos;s Dashboard</Link>
        )}
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>

        <ModeToggle />
      </div>
    </nav>
  );
}
export default TopNav;
