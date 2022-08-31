import React, { useEffect } from "react";
import NoLinkHeader from "../../../../components/Header/NoLinkHeader";
import { GET_LOGGEDIN_USER, GET_SINGLE_PROJECT } from "../../../gql";
import useContextHook from "../../../hooks/useContext";
import client from "../../../config/apollo";
import EditProject from "../../../../components/Projects/EditProject";
import Head from "next/head";

const ProjectEdit = ({ user, hasLoggedIn, projectData }) => {
  const { setUser, setHasLoggedIn } = useContextHook();

  useEffect(() => {
    setUser(user);
    setHasLoggedIn(hasLoggedIn);
  }, []);

  return (
    <>
      <Head>
        <title>{projectData.getSingleProject.data.name} | JobPortal</title>
      </Head>
      <NoLinkHeader />
      <EditProject details={projectData?.getSingleProject.data} />
    </>
  );
};

export default ProjectEdit;

export const getServerSideProps = async (context) => {
  const token = context.req.cookies.token;
  const { id } = context.params;
  console.log(id);

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

    const { data: projectData } = await client.query({
      query: GET_SINGLE_PROJECT,
      variables: {
        input: {
          id,
        },
      },
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
          projectData: projectData,
        },
      };
    } else {
      return {
        props: {
          user: null,
          hasLoggedIn: false,
          projectData: null,
        },
      };
    }
  }
};
