import { getCookies } from "cookies-next";
import React, { useState } from "react";
import { CREATE_PROJECT } from "../../pages/gql";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const CreateProject = () => {
  const rotuer = useRouter();
  const [step, setStep] = useState(0);
  const [CreateProject] = useMutation(CREATE_PROJECT);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const changeStep = (num) => {
    setStep(num);
  };

  const createProject = async () => {
    if (name) {
      setLoading(true);
      const { data } = await CreateProject({
        variables: {
          input: {
            name,
          },
        },
        context: {
          headers: {
            authorization: `Bearer ${getCookies("token").token}`,
          },
        },
      });

      if (data && data.createProject && data.createProject.success) {
        toast.success("Project Created successfully");
        setTimeout(() => {
          rotuer.push(`/dashboard/projects/edit/${data.createProject.data}`);
        }, 500);
      }
      setLoading(false);
    }
  };

  return (
    <section className="add_a_project py-8 relative h-[350px]">
      <div
        className="bg-white boxShadow p-8 rounded-md absolute top-1/2 left-1/2"
        style={{ transform: "translate(-50%,-50%)" }}
      >
        {step === 0 && (
          <>
            <div className="p-4 rounded-md boxShadow relative">
              <svg width="133" height="159" xmlns="http://www.w3.org/2000/svg">
                <g fill="#ECECEC" fillRule="nonzero">
                  <rect width="133" height="79.987" rx="4"></rect>
                  <rect y="85.05" width="133" height="11.137" rx="4"></rect>
                  <rect y="101.25" width="133" height="39.487" rx="4"></rect>
                  <rect y="147.825" width="27" height="11.137" rx="5.5"></rect>
                  <rect
                    x="32"
                    y="147.825"
                    width="11"
                    height="11.137"
                    rx="5.5"
                  ></rect>
                </g>
              </svg>
              <button
                onClick={() => changeStep(1)}
                className="absolute top-1/2 left-1/2 btn-rounded p-3"
                style={{ transform: "translate(-50%, -50%)" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5rem"
                  height="1.5rem"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  strokLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 5v14M5 12h14"></path>
                </svg>
              </button>
            </div>
            <p className="text-md font-bold uppercase mt-6">
              Add a new project
            </p>
          </>
        )}
        {step === 1 && (
          <div className="text-center py-8 flex flex-col items-center animate-step-1">
            <h1 className="text-3xl font-bold mb-6">
              Let&apos;s get you started.
            </h1>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col items-center w-full"
            >
              <input
                type="text"
                placeholder="What are you calling your project?"
                className="w-96 secondary-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <div className="flex gap-4 mt-8 items-center">
                <button
                  disabled={loading}
                  className={`w-fit btn-secondary flex items-center gap-1 ${
                    loading ? "hover:bg-blue cursor-not-allowed" : ""
                  }`}
                  onClick={createProject}
                >
                  {loading && (
                    <span className="loading block">
                      <i className=" uil uil-spinner-alt"></i>
                    </span>
                  )}
                  <span>Begin</span>
                </button>
                <button
                  disabled={loading}
                  type="button"
                  className={`w-fit btn-primary py-2 text-base ${
                    loading
                      ? "hover:bg-lightBlue hover:text-blue cursor-not-allowed"
                      : ""
                  }`}
                  onClick={() => changeStep(0)}
                >
                  Maybe Later
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default CreateProject;
