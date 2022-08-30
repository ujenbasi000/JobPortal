import React, { useEffect } from "react";
import DashboardHeader from "../../components/Header/DashboardHeader";
import { GET_LOGGEDIN_USER } from "../gql";
import client from "../config/apollo";
import useContextHook from "../hooks/useContext";
import DashboardBody from "../../components/Dashboard/DashboardBody";

const Dashboard = ({ hasLoggedIn, user }) => {
  const { setUser, setHasLoggedIn } = useContextHook();

  useEffect(() => {
    setUser(user);
    setHasLoggedIn(hasLoggedIn);
  }, []);

  return (
    <section className="bg-whiteColor min-h-screen">
      <DashboardHeader />
      <DashboardBody />
    </section>
  );
};

export default Dashboard;

export const getServerSideProps = async (context) => {
  const token = context.req.cookies.token;

  if (token === undefined) {
    return {
      props: {
        user: null,
        hasLoggedIn: false,
      },
      redirect: {
        permanent: false,
        destination: "/signin",
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
        redirect: {
          permanent: false,
          destination: "/signin",
        },
      };
    }
  }
};
