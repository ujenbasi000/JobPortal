import { useMutation } from "@apollo/client";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import { CREATE_BUSINESS_ACCOUNT, CREATE_NORMAL_ACCOUNT } from "./gql";
import { createBusinessAccount, createNormalAccount } from "./utils/async";
import { handleImage, handleInputs } from "./utils/handlers";

const Signup = () => {
  const router = useRouter();
  const { varient } = useRouter().query;
  const [businessGraphql] = useMutation(CREATE_BUSINESS_ACCOUNT);
  const [normalGraphql] = useMutation(CREATE_NORMAL_ACCOUNT);
  const [passwordShow, setPasswordShow] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [normalUser, setNormalUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [companyUser, setCompanyUser] = useState({
    name: "",
    email: "",
    logo: "",
    password: "",
  });

  const submit = async () => {
    if (varient === "business") {
      if (!companyUser.email && !companyUser.password && !companyUser.name) {
        toast.warning("Please enter all required fields");
        return;
      }
      if (
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(companyUser.email)
      ) {
        toast.warning("Invalid Email");
        return;
      }
      if (companyUser.password.length < 8) {
        toast.warning("Password must be at least 8 characters long");
        return;
      }
      if (!previewImage) {
        toast.warning("Please upload Logo of the company");
        return;
      }
      // async code ...
      setLoading(true);
      await createBusinessAccount(companyUser, businessGraphql, toast, router);
      setLoading(false);
    }
  };

  const submitNormal = async () => {
    if (varient === "normal" || varient === undefined) {
      if (!normalUser.email && !normalUser.password && !normalUser.name) {
        toast.warning("Please enter all required fields");
        return;
      }
      if (
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(normalUser.email)
      ) {
        toast.warning("Invalid Email");
        return;
      }
      if (normalUser.password.length < 8) {
        toast.warning("Password must be at least 8 characters long");
        return;
      }
      // async code ...
      setLoading(true);
      await createNormalAccount(normalUser, normalGraphql, toast, router);
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Devfolio | Signup</title>
      </Head>

      <section className="bg-whiteColor min-h-screen flex items-center justify-center py-10">
        <div>
          <div className="w-96 px-2 py-2 mb-6 bg-white boxShadow rounded-md border-border">
            <ul className="flex gap-2 items-center">
              <li className="w-full">
                <Link href="/signup?varient=normal">
                  <button
                    type="button"
                    className={`w-full py-2 rounded-md ${
                      varient === "normal" || varient === undefined
                        ? "bg-blue text-white"
                        : "bg-whiteColor text-black"
                    } border border-border block`}
                  >
                    Normal
                  </button>
                </Link>
              </li>
              <li className="w-full">
                <Link href="/signup?varient=business">
                  <button
                    type="button"
                    className={`w-full py-2 rounded-md ${
                      varient === "business"
                        ? "bg-blue text-white"
                        : "bg-whiteColor text-black"
                    } border border-border block`}
                  >
                    Business
                  </button>
                </Link>
              </li>
            </ul>
          </div>

          <div className="w-96 px-8 py-6 bg-white boxShadow rounded-md border-border">
            <div className="mb-6">
              <label className="text-textcolor" htmlFor="name">
                Full Name:{" "}
              </label>
              <input
                autoComplete="off"
                type="text"
                name="name"
                id="name"
                onChange={(e) =>
                  varient === "business"
                    ? handleInputs(e, companyUser, setCompanyUser)
                    : handleInputs(e, normalUser, setNormalUser)
                }
                className="secondary-input"
              />
            </div>
            <div className="mb-6">
              <label className="text-textcolor" htmlFor="email">
                Email Address:
              </label>
              <input
                autoComplete="off"
                type="email"
                name="email"
                id="email"
                onChange={(e) =>
                  varient === "business"
                    ? handleInputs(e, companyUser, setCompanyUser)
                    : handleInputs(e, normalUser, setNormalUser)
                }
                className="secondary-input"
              />
            </div>
            <div className="mb-6 relative">
              <button
                type="button"
                className="absolute bottom-2 right-2"
                onClick={() => setPasswordShow((prev) => !prev)}
              >
                {passwordShow ? (
                  <i className="uil uil-eye text-lg text-textcolor"></i>
                ) : (
                  <i className="uil uil-eye-slash text-lg text-textcolor"></i>
                )}
              </button>
              <label className="text-textcolor" htmlFor="password">
                Password:
              </label>
              <input
                autoComplete="off"
                type={passwordShow ? "text" : "password"}
                id="password"
                name="password"
                onChange={(e) =>
                  varient === "business"
                    ? handleInputs(e, companyUser, setCompanyUser)
                    : handleInputs(e, normalUser, setNormalUser)
                }
                className="secondary-input"
              />
            </div>
            {varient === "business" && (
              <div className="mb-10">
                <label className="text-textcolor" htmlFor="logo">
                  Logo:
                </label>
                <input
                  autoComplete="off"
                  type="file"
                  onChange={(event) =>
                    handleImage(
                      event,
                      companyUser,
                      setCompanyUser,
                      setPreviewImage
                    )
                  }
                  name="logo"
                  accept="image/*"
                  hidden
                  id="logo"
                />
                <label
                  htmlFor="logo"
                  className="rounded-full flex items-center cursor-pointer justify-center flex-col border-[3px] border-border border-dashed w-40 h-40"
                >
                  {previewImage ? (
                    <Image
                      src={previewImage}
                      alt="Unavailable"
                      width={160}
                      height={160}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <>
                      <i className="uil uil-image-upload text-textcolor text-2xl"></i>
                      <span className="text-center block text-lg font-medium text-textcolor">
                        Upload
                      </span>
                    </>
                  )}
                </label>
              </div>
            )}
            <button
              type="button"
              className={`btn-secondary ${
                loading ? `opacity-70 cursor-not-allowed hover:bg-blue` : ""
              }`}
              onClick={varient === "business" ? submit : submitNormal}
              disabled={loading}
            >
              {loading ? (
                <div className="loading">
                  <i className="uil uil-spinner-alt"></i>
                </div>
              ) : (
                "Sign in"
              )}
            </button>
          </div>

          <button
            type="button"
            className="btn-link text-center w-full my-6 block"
          >
            Forgot Password?
          </button>

          <p className="text-center text-sm text-textcolor">
            Already have an account? Signin
            <Link href="/signin">
              <span className="text-blue inline ml-1 cursor-pointer">here</span>
            </Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default Signup;
