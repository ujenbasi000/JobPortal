import Header from "../components/Header";
import Offers from "../components/Home/Offers";
import Section1 from "../components/Home/Section1";
import { GET_ALL_JOB_OFFERS, GET_LOGGEDIN_USER } from "./gql";
import client from "./config/apollo";
import useContextHook from "./hooks/useContext";
import { useEffect } from "react";
import { useQuery } from "@apollo/client";

export default function Home({ user, hasLoggedIn, posts }) {
  const { setUser, setHasLoggedIn } = useContextHook();
  const { data, loading, error } = useQuery(GET_ALL_JOB_OFFERS, {
    variables: { input: { limit: 3, skip: 0 } },
  });

  console.log({ data });

  useEffect(() => {
    setUser(user);
    setHasLoggedIn(hasLoggedIn);
  }, []);

  const hackathon_offers = [
    {
      title: "Hacfest 2022",
      type: "hackathon",
      deadline: "3rd March 2022",
      slug: "/hackathon/hackfest-2022-5a1s6df84a2e1f6s5d",
    },
    {
      title: "Hack TU",
      type: "hackathon",
      deadline: "3rd March 2022",
      slug: "/hackathon/hack-tu-as35df168we1ffwefasdsd4f",
    },
    {
      title: "MesoHacks 2022",
      type: "hackathon",
      deadline: "2rd September 2022",
      slug: "/hackathon/mesohacks-as5df45wae4fa1s6d84f",
    },
  ];

  const job_offers = [
    {
      title: "React/Nextjs Developer",
      type: "Job",
      deadline: "3rd April 2022",
      slug: "/jobs/hackfest-2022-5a1s6df84a2e1f6s5d",
    },
    {
      title: "Lavarel Developer",
      type: "Internship",
      deadline: "16rd May 2022",
      slug: "/jobs/hack-tu-as35df168we1ffwefasdsd4f",
    },
    {
      title: "UI/UX designer",
      type: "Freelancing",
      deadline: "20rd October 2022",
      slug: "/jobs/mesohacks-as5df45wae4fa1s6d84f",
    },
  ];

  return (
    <div>
      <Header />
      <Section1 />
      <Offers
        type="jobs"
        details={data?.getAllPosts?.posts}
        color={"rgb(55, 112, 255)"}
      />
      {/* <Offers
        type="hackathon"
        details={hackathon_offers}
        color={"rgb(88, 209, 189)"}
      /> */}
    </div>
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
          user: data.getUser.user,
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
