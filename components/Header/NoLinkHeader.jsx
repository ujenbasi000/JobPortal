import Image from "next/image";
import useContextHook from "../../pages/hooks/useContext";
import { HeaderOptions } from "./DashboardHeader";

const NoLinkHeader = () => {
  const { user, headerMenu, setHeaderMenu } = useContextHook();

  return (
    <header className="w-full">
      <div className="container mx-auto flex items-center justify-between py-6 px-2">
        <div className="">
          <a href="http://localhost:3000">
            <h1 className="text-4xl font-bold text-logoColor">Devfolio</h1>
          </a>
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

export default NoLinkHeader;
