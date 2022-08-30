import { useEffect } from "react";
import Header from "../components/Header";
import JobInternshipsBody from "../components/JobInternships";
import Search from "../components/Search";
import client from "./config/apollo";
import { useQuery } from "@apollo/client";
import { GET_ALL_JOB_OFFERS, GET_LOGGEDIN_USER } from "./gql";
import useContextHook from "./hooks/useContext";
import Head from "next/head";

const JobInternships = ({ user, hasLoggedIn }) => {
  const { setUser, setHasLoggedIn } = useContextHook();
  const { data } = useQuery(GET_ALL_JOB_OFFERS, {
    variables: { input: { limit: 10, skip: 0 } },
  });

  useEffect(() => {
    setUser(user);
    setHasLoggedIn(hasLoggedIn);
  }, []);

  return (
    <>
      <Head>
        <title>Job - Internships | JobPortal</title>
      </Head>
      <section>
        <Header />
        <div className="container py-16 px-32 mx-auto">
          <Search />
          <JobInternshipsBody data={data?.getAllPosts?.posts} />
        </div>
      </section>
    </>
  );
};

export default JobInternships;

export const getServerSideProps = async (context) => {
  const token = context.req.cookies.token;

  if (token === undefined) {
    return {
      props: {
        user: null,
        hasLoggedIn: false,
      },
    };
  } else {
    const { data } = await client.query({
      query: GET_LOGGEDIN_USER,
      context: {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    });

    if (data && data.getUser && data.getUser.success) {
      return {
        props: {
          user: data.getUser.user || data.getUser.companyUser,
          hasLoggedIn: true,
        },
      };
    } else {
      return {
        props: {
          user: null,
          hasLoggedIn: false,
        },
      };
    }
  }
};
