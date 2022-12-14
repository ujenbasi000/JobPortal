import Header from "../components/Header";
import Offers from "../components/Home/Offers";
import Section1 from "../components/Home/Section1";
import { GET_ALL_JOB_OFFERS, GET_LOGGEDIN_USER } from "./gql";
import client from "./config/apollo";
import useContextHook from "./hooks/useContext";
import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { toast } from "react-toastify";
import Head from "next/head";

export default function Home({ user, hasLoggedIn }) {
  const { setUser, setHasLoggedIn } = useContextHook();
  const { data, loading } = useQuery(GET_ALL_JOB_OFFERS, {
    variables: { input: { limit: 3, skip: 0 } },
  });

  useEffect(() => {
    setUser(user);
    setHasLoggedIn(hasLoggedIn);
  }, []);

  return (
    <>
      <Head>
        <title>Home | JobPortal</title>
      </Head>
      <Header />
      <Section1 />
      <Offers
        type="jobs"
        loading={loading}
        details={data?.getAllPosts?.posts}
        color={"rgb(55, 112, 255)"}
      />
      {/* <Offers
        type="hackathon"
        details={hackathon_offers}
        color={"rgb(88, 209, 189)"}
      /> */}
    </>
  );
}

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
