import Header from "../components/Header";
import Link from "next/link";
import { GET_LOGGEDIN_USER, GET_SINGLE_JOB_OFFER } from "./gql";
import client from "./config/apollo";
import useContextHook from "./hooks/useContext";
import { useEffect } from "react";
import Head from "next/head";
import { formatDistance } from "date-fns";

const DetailPage = ({ user, hasLoggedIn, postData }) => {
  const { setUser, setHasLoggedIn } = useContextHook();

  useEffect(() => {
    setUser(user);
    setHasLoggedIn(hasLoggedIn);
  }, []);

  return (
    <>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <Header />
      <CompanyDetails detail={postData.getSingleJobOffer.post} />
      <PostDetails detail={postData.getSingleJobOffer.post} />
    </>
  );
};

export default DetailPage;

export const getServerSideProps = async (context) => {
  const token = context.req.cookies.token;

  const { slug } = context.params;
  const { data: postData } = await client.query({
    query: GET_SINGLE_JOB_OFFER,
    variables: { input: { slug } },
  });

  if (token === undefined) {
    return {
      props: {
        user: null,
        postData: postData,
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
          postData: postData,
        },
      };
    } else {
      return {
        props: {
          user: null,
          hasLoggedIn: false,
          postData: postData,
        },
      };
    }
  }
};

const CompanyDetails = ({ detail }) => {
  return (
    <div className="w-full border-y border-border">
      <div className="container mx-auto py-6 ">
        <div className="flex flex-col items-center">
          <h1 className="text-black text-3xl font-semibold mb-4">
            {detail?.title}
          </h1>
          <p className="text-textcolor text-xl font-medium">
            Hosted by
            <Link href="/">
              <span className="inline ml-1 text-blue hover:underline cursor-pointer">
                {detail.company.name}
              </span>
            </Link>
          </p>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container mx-auto py-2 flex justify-center ">
          <ul className="flex gap-2">
            <li>
              <button className="btn-secondary py-3 text-sm uppercase">
                Overview
              </button>
            </li>
            <li>
              <button className="btn-primary text-sm uppercase">Grantes</button>
            </li>
            <li>
              <button className="btn-primary text-sm uppercase">
                Projects
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const PostDetails = ({ detail }) => {
  return (
    <section className="bg-whiteColor min-h-screen">
      <div className="container mx-auto py-32 px-48 flex gap-8">
        <div className="flex-1">
          <div className="text-md mb-3">
            <h4 className="font-semibold text-2xl mb-3">
              What we&apos;re looking for
            </h4>
            <p className="text-md mb-3">
              We&apos;re a small team of technologists passionate about building
              a better experience for content consumption—and we’re looking for
              a mission-driven engineer who shares our ideals.
            </p>
            <ul className="list-disc mb-6">
              <li>
                You will serve as a lead full-time engineer. You will work
                closely with the CEO and hand-in-hand with our designer.
              </li>
              <li>
                There will be a lot to code. We&apos;re looking for someone who
                has experience setting up and working in production systems that
                isn&apos;t afraid to build and deploy products from scratch.
              </li>
              <li>
                Management opportunities will come over the next few years. You
                will be contributing a tremendous amount to the founding culture
                and DNA of the company, especially as we build and scale our
                engineering team. We&apos;re looking for someone who&apos;s seen
                what it&apos;s like to grow a team and product from tiny to
                moderate or large—and who isn&apos;t afraid to grow just as
                fast.
              </li>
              <li>
                You&apos;re a full-stack engineer with robust web experience.
                Our MVP is a Google Chrome extension and a NodeJS + Express
                backend, so familiarity with web-based products is required. You
                will also be designing system architecture across both desktop
                and mobile, so experience building products on multiple
                platforms is a major plus.
              </li>
            </ul>
            <h4 className="font-semibold text-2xl mb-3">About the company</h4>
            <p className="text-md mb-3">
              Zette is a venture-backed, early-stage media tech startup whose
              mission is to bring down the barriers to real news by increasing
              access to journalism for all, while empowering publishers and
              creators to continue producing high quality work. Founded by
              Yehong Zhu, ex-Forbes journalist and Twitter PM.
            </p>
            <ul className="list-disc mb-6">
              <li>
                The problem: Fake news is free, but real news is not. In 2020,
                media outlets are forced to churn out clickbait headlines,
                surviving off razor-thin online ad margins—or to gate their
                content behind paywalls, effectively turning the internet into a
                walled garden.
              </li>
              <li>
                The solution: Product innovation in the media technology
                industry has been anemic for a very long time. To access
                information, you have to subscribe to dozens of publishers at
                once—even if you don&apos;t regularly read most of them. Until
                now. Our product solves this problem by providing one paid
                account to access all the news you&apos;d want to read.
              </li>
              <li>
                Our mission is to democratize information by making high-quality
                online content accessible to everyone. We believe that better
                access starts with 1) bringing down paywalls for individual
                articles, 2) giving readers access to a wide variety of vetted
                journalistic sources, and 3) compensating publishers fairly in
                the process.
              </li>
            </ul>
            <h4 className="font-semibold text-2xl mb-3">About the job</h4>
            <p className="text-md mb-3">Beep, boop...</p>
            <ul className="list-disc mb-6">
              <li>Excellence in JavaScript, ReactJS, NodeJS, and ExpressJS.</li>
              <li>
                Experience in NextJS and either Firebase, Google Cloud, or AWS.
              </li>
              <li>Experience with scaling one or more applications.</li>
              <li>Working with our team on our Google Chrome extension.</li>
              <li>Guiding leadership in making technical product decisions.</li>
              <li>Scaling our engineering team and culture as we grow.</li>
            </ul>
            <h4 className="font-semibold text-2xl mb-3">Required skills</h4>
            <ul className="list-disc mb-6">
              <li>
                You&apos;re a fast learner with a demonstrated history of
                technical excellence, and you&apos;re as excited about the
                future of consumer media as we are.
              </li>
              <li>
                You&apos;re passionate about the future of media—and you&apos;re
                interested in building products for both publishers and indie
                creators.
              </li>
              <li>You have 2-5+ years of experience as a software engineer.</li>
              <li>
                You&apos;re a full-stack generalist who loves a good challenge.
                You can build features end-to-end and reliably ship well-tested
                code, with an eye towards maintainability.
              </li>
              <li>
                You like building new products and systems entirely from
                scratch. You&apos;re not afraid to get deep into the
                nitty-gritty of implementation. You&apos;re also comfortable
                designing system architecture and can point to examples where
                you&apos;ve done so in industry.
              </li>
              <li>
                You have an entrepreneurial streak and/or demonstrated history
                of technical leadership. You&apos;ve done cool things in the
                past, both at work and outside the office.
              </li>
            </ul>
            <h4 className="font-semibold text-2xl mb-3">Bonus points</h4>
            <h4 className="font-semibold text-2xl mb-3">Benefits</h4>
            <p className="text-md mb-3">We like to treat our employees well.</p>
            <ul className="list-disc mb-6">
              <li>Meaningful early equity stake.</li>
              <li>Competitive salary for startups at our stage.</li>
              <li>Generous benefits (healthcare, vision, dental, 401k).</li>
              <li>
                The opportunity to see a startup scale from pre-seed upwards.
              </li>
              <li>
                The ability to shape the early team culture around values that
                matter to you.
              </li>
              <li>
                Awesome coworkers and fun social events (i.e. company offsites,
                virtual game nights).
              </li>
              <li>
                For anything else—just ask and we&apos;ll see what we can do 😉
              </li>
            </ul>
          </div>
        </div>
        <div className="w-96 relative">
          <div className="sticky top-4 left-0 rounded-md boxShadow p-8">
            <div className="bg-lightBlue rounded-md w-full p-4">
              <h2 className="text-md mb-2 font-extrabold text-[#4b60d2]">
                APPLICATION CLOSE IN
              </h2>
              {console.log(detail.deadline.split("-")[2].split("T")[0])}
              {/* {console.log(
                +detail.deadline.split("-")[0],
                +detail.deadline.split("-")[1],
                +detail.deadline.split("T")[1].split(":")[0],
                +detail.deadline.split("T")[1].split(":")[1]
              )} */}
              <h1 className="text-xl font-bold text-blue">
                {formatDistance(
                  new Date(
                    +detail.deadline.split("-")[0],
                    +detail.deadline.split("-")[1],
                    +detail.deadline.split("-")[2].split("T")[0],
                    +detail.deadline.split("T")[1].split(":")[0],
                    +detail.deadline.split("T")[1].split(":")[1]
                  ),
                  new Date(),
                  { includeSeconds: true, addSuffix: true }
                )}
              </h1>
            </div>
            <button className="btn-secondary text-lg mt-4">Apply now</button>
          </div>
        </div>
      </div>
    </section>
  );
};
