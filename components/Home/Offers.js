import Link from "next/link";
import CardLoading from "../Loadings/CardLoading";
import Card from "./Card";

const Offers = ({ type = "jobs", loading, details, link = "/", color }) => {
  return (
    <section className="w-full">
      <div className="py-16 container mx-auto">
        <h1 className="text-4xl mb-10 font-extrabold text-center">
          Apply for <span>{type.toUpperCase()} </span>
        </h1>

        <section className="flex gap-6 w-10/12 mx-auto">
          {loading ? (
            <>
              <CardLoading />
              <CardLoading />
              <CardLoading />
            </>
          ) : (
            details?.map((detail) => <Card key={detail._id} detail={detail} />)
          )}
        </section>
        <footer className="text-center">
          <Link href={link}>
            <button className="link-button hover:underline mx-auto my-10 block">
              See all
            </button>
          </Link>
        </footer>
      </div>
    </section>
  );
};

export default Offers;
