import Link from "next/link";
import useContextHook from "../../pages/hooks/useContext";

const Header = () => {
  const { hasLoggedIn } = useContextHook();

  return (
    <header className="w-full">
      <div className="container mx-auto flex items-center justify-between py-6 px-2">
        <div className="">
          <a href="http://localhost:3000">
            <h1 className="text-4xl font-bold text-logoColor">Devfolio</h1>
          </a>
        </div>
        <div className="flex gap-16 items-center">
          <ul className="flex gap-6 items-center">
            <li>
              <Link href="/job-internships">
                <button className="text-xl font-normal text-textcolor hover:text-black">
                  Job / Internship
                </button>
              </Link>
            </li>
            <li>
              <button className="text-xl font-normal text-textcolor hover:text-black">
                Hackathons
              </button>
            </li>
            <li>
              <button className="text-xl font-normal text-textcolor hover:text-black">
                About
              </button>
            </li>
          </ul>
          <ul className="flex gap-4 items-center">
            {hasLoggedIn ? (
              <li>
                <button className="link-button">
                  <Link href="/dashboard">Go to dashboard</Link>
                </button>
              </li>
            ) : (
              <li>
                <button className="link-button">
                  <Link href="/signin">Sign in</Link>
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
