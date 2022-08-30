import Image from "next/image";
import useContextHook from "../../pages/hooks/useContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { removeCookies } from "cookies-next";

const DashboardHeader = () => {
  const { user, headerMenu, setHeaderMenu } = useContextHook();
  const router = useRouter().asPath;

  return (
    <header className="w-full bg-white border-b border-border lightBoxShadow">
      <div className="container mx-auto px-2 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div>
            <a href="http://localhost:3000">
              <h1 className="text-4xl font-bold text-logoColor">Devfolio</h1>
            </a>
          </div>
          <ul className="flex items-start gap-2 justify-center">
            <li>
              <Link href="/dashboard">
                <button
                  className={
                    router === "/dashboard"
                      ? "dashboard-header-li-active"
                      : "dashboard-header-li"
                  }
                >
                  Jobs / Internships
                </button>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/hackathons">
                <button
                  className={
                    router === "/dashboard/hackathons"
                      ? "dashboard-header-li-active"
                      : "dashboard-header-li"
                  }
                >
                  Hackathons
                </button>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/projects">
                <button
                  className={
                    router === "/dashboard/projects"
                      ? "dashboard-header-li-active"
                      : "dashboard-header-li"
                  }
                >
                  Projects
                </button>
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center justify-center gap-6">
          {user?.modelType === "company" && (
            <>
              <button className="link-button">Create Job / Internships</button>
              <button className="link-button">Organize Hackathon</button>
            </>
          )}
          <div
            className="flex items-center justify-center gap-3 relative cursor-pointer"
            onClick={() => setHeaderMenu((prev) => !prev)}
          >
            <span className="text-lg font-semibold">{user?.username}</span>
            <Image
              src={"https://assets.devfolio.co/assets/avatar@2x.png"}
              alt="User"
              width={50}
              height={50}
            />
            {headerMenu && <HeaderOptions />}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;

export const HeaderOptions = () => {
  const logout = () => {
    removeCookies("token");
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };
  return (
    <div className="w-56 bg-white boxShadow rounded-md absolute top-full mt-3 p-3 right-0">
      <ul>
        <li>
          <button className="w-full px-3 py-2 hover:bg-blue rounded-md text-left  hover:text-white text-lg">
            My Devfolio
          </button>
        </li>
        <li>
          <button className="w-full px-3 py-2 hover:bg-blue rounded-md text-left  hover:text-white text-lg">
            Hackathons
          </button>
        </li>
        <li>
          <Link href={"/job-internships"}>
            <button className="w-full px-3 py-2 hover:bg-blue rounded-md text-left  hover:text-white text-lg">
              Jobs / Internships
            </button>
          </Link>
        </li>
        <li>
          <Link href={"/dashboard/projects"}>
            <button className="w-full px-3 py-2 hover:bg-blue rounded-md text-left  hover:text-white text-lg">
              Projects
            </button>
          </Link>
        </li>
        <hr className="my-2" />
        <li>
          <button className="w-full px-3 py-2 hover:bg-blue rounded-md text-left  hover:text-white text-lg">
            Settings
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={logout}
            className="w-full px-3 py-2 hover:bg-red rounded-md text-left  hover:text-white text-lg"
          >
            Log out
          </button>
        </li>
      </ul>
    </div>
  );
};
