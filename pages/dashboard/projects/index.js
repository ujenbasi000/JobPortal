import React, { useEffect } from "react";
import DashboardHeader from "../../../components/Header/DashboardHeader";
import { GET_ALL_PROJECTS, GET_LOGGEDIN_USER } from "../../gql";
import client from "../../config/apollo";
import useContextHook from "../../hooks/useContext";
import { getCookies } from "cookies-next";
import { useQuery } from "@apollo/client";
import ProjectsBody from "../../../components/Projects/ProjectsBody";
import Head from "next/head";

const Projects = ({ user, hasLoggedIn }) => {
  const { setUser, setHasLoggedIn } = useContextHook();

  const { data, loading, error } = useQuery(GET_ALL_PROJECTS, {
    context: {
      headers: {
        authorization: `Bearer ${getCookies("token").token}`,
      },
    },
  });

  useEffect(() => {
    setUser(user);
    setHasLoggedIn(hasLoggedIn);
  }, []);

  return (
    <>
      <Head>
        <title>Projects | JobPortal</title>
      </Head>
      <DashboardHeader />
      <ProjectsBody details={data?.getAllProjects?.projects} />
    </>
  );
};

export default Projects;

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
