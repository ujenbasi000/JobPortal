import Image from "next/image";
import useContextHook from "../../pages/hooks/useContext";
import Link from "next/link";
import { useRouter } from "next/router";

const DashboardHeader = () => {
  const { user } = useContextHook();
  const router = useRouter().asPath;

  return (
    <header className="w-full bg-white lightBoxShadow">
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
          </ul>
        </div>
        <div className="flex items-center justify-center gap-6">
          {user?.modelType === "company" && (
            <>
              <button className="link-button">Create Job / Internships</button>
              <button className="link-button">Organize Hackathon</button>
            </>
          )}
          <div className="flex items-center justify-center gap-3">
            <span className="text-lg font-semibold">{user?.username}</span>
            <Image
              src={"https://assets.devfolio.co/assets/avatar@2x.png"}
              alt="User"
              width={50}
              height={50}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
