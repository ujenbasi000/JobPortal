/* eslint-disable @next/next/no-img-element */

import { reduceText } from "../../pages/utils/handlers";

const MyProjects = ({ details }) => {
  return (
    <section className="py-16">
      <header className="mb-4">
        <h1 className="text-4xl font-extrabold text-black mb-10">
          My Projects
        </h1>
      </header>
      <main className="flex flex-wrap gap-4">
        {details?.map((e) => {
          return (
            <div
              key={e._id}
              className="w-[calc(100%/4-16px)] rounded-md boxShadow bg-white"
            >
              <img
                src={
                  "https://www.freecodecamp.org/news/content/images/2022/01/youtube-clone-repeation.PNG"
                }
                className="w-full object-cover"
                alt=""
              />
              <div className="p-4">
                <h1 className="text-xl mb-3 font-bold text-black">{e.name}</h1>
                <p className="text-md mb-4 h-12 font-normal text-black">
                  {reduceText(e.tagline)}
                </p>
                <div className="flex flex-wrap gap-3">
                  {e?.technologies?.map((e) => {
                    return (
                      <span
                        key={e}
                        className="bg-whiteColor px-3 py-1 border border-border rounded-md"
                      >
                        {e}
                      </span>
                    );
                  })}
                </div>
                <div className="flex gap-3 mt-4">
                  <button className="btn-secondary flex gap-2 items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1rem"
                      height="1rem"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                    <span>Github</span>
                  </button>
                  <button className="btn-primary text-sm flex gap-2 items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1rem"
                      height="1rem"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"></path>
                      <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"></path>
                    </svg>
                    <span>Live Preview</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </main>
    </section>
  );
};

export default MyProjects;
