import Link from "next/link";
import Image from "next/image";
import Logo from "./dojo-logo.png";
import LogoutButton from "./LogoutButton";

export default function Navbar({ user }) {
  return (
    <nav>
      <Image
        src={Logo}
        alt="Helpdesk Logo"
        width={70}
        quality={100}
        placeholder="blur"
        className="w-0 invisible md:visible md:w-auto "
      />
      <h1>HelpDesk </h1>
      <Link href="/">Dashboard</Link>
      <Link href="/tickets" className="mr-auto">
        Tickets
      </Link>
      <div className="w-0 invisible md:visible md:w-auto ">
        {user && <span>Hello, {user.email}</span>}
      </div>

      <LogoutButton />
    </nav>
  );
}
