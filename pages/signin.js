import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { LOGIN_BUSINESS_ACCOUNT, LOGIN_NORMAL_ACCOUNT } from "./gql";
import { loginBusinessAccount, loginNormalAccount } from "./utils/async";
import { handleInputs } from "./utils/handlers";
import { useMutation } from "@apollo/client/react";
import { toast } from "react-toastify";

const Signup = () => {
  const router = useRouter();
  const { varient } = useRouter().query;
  const [businessGraphql] = useMutation(LOGIN_BUSINESS_ACCOUNT);
  const [normalGraphql] = useMutation(LOGIN_NORMAL_ACCOUNT);
  const [loading, setLoading] = useState(false);
  const [normalUser, setNormalUser] = useState({
    email: "",
    password: "",
  });
  const [companyUser, setCompanyUser] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    if (varient === "business") {
      if (!companyUser.email && !companyUser.password) {
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
      // async code ...
      setLoading(true);
      await loginBusinessAccount(companyUser, businessGraphql, toast);
      router.push("/");
      setLoading(false);
    }
  };

  const submitNormal = async () => {
    if (varient === "normal" || varient === undefined) {
      if (!normalUser.email && !normalUser.password) {
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
      await loginNormalAccount(normalUser, normalGraphql, toast);
      router.push("/");
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Devfolio | Signin</title>
      </Head>
      <section className="bg-whiteColor min-h-screen flex items-center justify-center">
        <div>
          <div className="w-96 px-2 py-2 mb-6 bg-white boxShadow rounded-md border-border">
            <ul className="flex gap-2 items-center">
              <li className="w-full">
                <Link href="/signin?varient=normal">
                  <button
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
                <Link href="/signin?varient=business">
                  <button
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

          <div className="w-96 px-8 py-6 bg-white boxShadow rounded-md border-border relative">
            <div className="w-20 ml-auto rounded-md flex items-center gap-3">
              <span className="">
                <button
                  className="btn-secondary"
                  onClick={() => {
                    setNormalUser({
                      email: "test@basi.com",
                      password: "test@basi.com",
                    });
                    setCompanyUser({
                      email: "jihyo@twice.com.com",
                      password: "jihyo9818123191",
                    });
                  }}
                >
                  1
                </button>
              </span>
              <span className="">
                <button
                  className="btn-secondary"
                  onClick={() => {
                    setNormalUser({
                      email: "test@test.com",
                      password: "test@test.com",
                    });
                    setCompanyUser({
                      email: "sana@twice.com",
                      password: "sana9818123191",
                    });
                  }}
                >
                  2
                </button>
              </span>
            </div>
            <div className="mb-6">
              <label className="text-textcolor" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={
                  varient === "business" ? companyUser.email : normalUser.email
                }
                onChange={(e) =>
                  varient === "business"
                    ? handleInputs(e, companyUser, setCompanyUser)
                    : handleInputs(e, normalUser, setNormalUser)
                }
                className="secondary-input"
              />
            </div>
            <div className="mb-6">
              <label className="text-textcolor" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={
                  varient === "business"
                    ? companyUser.password
                    : normalUser.password
                }
                onChange={(e) =>
                  varient === "business"
                    ? handleInputs(e, companyUser, setCompanyUser)
                    : handleInputs(e, normalUser, setNormalUser)
                }
                className="secondary-input"
              />
            </div>
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

          <button className="btn-link text-center w-full my-6 block">
            Forgot Password?
          </button>

          <p className="text-center text-sm text-textcolor">
            Don&apos;t have an account? Create one
            <Link href="/signup">
              <span className="text-blue inline ml-1 cursor-pointer">here</span>
            </Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default Signup;
