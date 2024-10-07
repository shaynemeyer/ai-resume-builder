import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import Image from "next/image";

function TopNav() {
  return (
    <nav className="flex justify-between py-1 mx-2">
      <Link href="/">
        <Image src="/images/logo.svg" height={50} width={50} alt="Logo" />
      </Link>
      <ModeToggle />
    </nav>
  );
}
export default TopNav;
