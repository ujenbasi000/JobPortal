import Link from "next/link";

const Header = () => {
  const hasLoggedIn = false;

  return (
    <header className="w-full">
      <div className="container mx-auto flex items-center justify-between py-6 px-2">
        <div className="">
          <a href="https://devfolio.co/home/">
            <h1 className="text-4xl font-bold text-logoColor">Devfolio</h1>
          </a>
        </div>
        <div className="flex gap-16 items-center">
          <ul className="flex gap-6 items-center">
            <li>
              <button className="text-xl font-normal text-textcolor hover:text-black">
                Job / Internship
              </button>
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
            <li>
              <button className="link-button">Organize a Hackathon</button>
            </li>
            {hasLoggedIn ? (
              <li>
                <button className="link-button">Go to dashboard</button>
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
