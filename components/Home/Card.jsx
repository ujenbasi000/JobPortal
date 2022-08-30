import { format } from "date-fns";
import Link from "next/link";

const Card = ({ color, detail }) => {
  return (
    <div className="card rounded-md border border-border boxShadow card-three hover:-translate-y-1 transition duration-200">
      <div
        className={`rounded-md flex flex-col justify-between h-full border-t-[10px] card-border p-10`}
        style={{ borderColor: color }}
      >
        <div>
          <h1 className="text-3xl mb-4 font-semibold text-clip break-word">
            <Link href={detail.slug}>{detail.title}</Link>
          </h1>
          <p className="text-lg text-textcolor font-medium">
            Apply before{" "}
            <span className="font-semibold">
              {format(
                new Date(
                  +detail.deadline.split("-")[0],
                  +detail.deadline.split("-")[1],
                  +detail.deadline.split("-")[2].split("T")[0]
                ),
                "LLLL dd yyyy"
              )}
            </span>
          </p>
        </div>

        <div>
          <span className="block mt-16 font-medium text-lg text-textcolor">
            Type: {detail.type}
          </span>
          <button className="btn-primary mt-4">Apply</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
