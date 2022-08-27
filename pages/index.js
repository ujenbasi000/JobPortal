import Header from "../components/Header";
import Offers from "../components/Home/Offers";
import Section1 from "../components/Home/Section1";

export default function Home() {
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
      <Offers type="jobs" details={job_offers} color={"rgb(55, 112, 255)"} />
      <Offers
        type="hackathon"
        details={hackathon_offers}
        color={"rgb(88, 209, 189)"}
      />
    </div>
  );
}
