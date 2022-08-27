import Image from "next/image";
import JOIN_US from "../../public/join_us.svg";
import Shape1 from "../../public/shapes/shape1.svg";
import Shape2 from "../../public/shapes/shape2.svg";
import Shape3 from "../../public/shapes/shape3.svg";
import Shape4 from "../../public/shapes/shape4.svg";
import Shape5 from "../../public/shapes/shape5.svg";
import Shape6 from "../../public/shapes/shape6.svg";
import Shape7 from "../../public/shapes/shape7.svg";
import Shape8 from "../../public/shapes/shape8.svg";
import Shape9 from "../../public/shapes/shape9.svg";

const Section1 = () => {
  return (
    <div className="w-full">
      <section className="py-32 container mx-auto relative">
        <div>
          <h1 className="text-center leading-tight text-6xl w-7/12 mx-auto text-black">
            We are <strong className="font-extrabold">Nepal’s largest*</strong>{" "}
            and fastest growing{" "}
            <strong className="font-extrabold underline-green">
              community
            </strong>{" "}
            of{" "}
            <strong className="font-extrabold underline-green">builders</strong>
            .
          </h1>
          <div className="shape-container">
            <div className="shape s1">
              <Image src={Shape1} alt="" width={100} height={100} />
            </div>
            <div className="shape s2">
              <Image src={Shape2} alt="" width={100} height={100} />
            </div>
            <div className="shape s3">
              <Image src={Shape3} alt="" width={100} height={100} />
            </div>
            <div className="shape s4">
              <Image src={Shape4} alt="" width={100} height={100} />
            </div>
            <div className="shape s5">
              <Image src={Shape5} alt="" width={100} height={100} />
            </div>
            <div className="shape s6">
              <Image src={Shape6} alt="" width={60} height={60} />
            </div>
            <div className="shape s7 animated-circle">
              <Image src={Shape7} alt="" width={100} height={100} />
            </div>
            <div className="shape s8 animated-up-down">
              <Image src={Shape8} alt="" width={40} height={40} />
            </div>
            <div className="shape s9 animated-circle">
              <Image src={Shape9} alt="" width={100} height={100} />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center mt-16">
          <div>
            <Image src={JOIN_US} width={70} alt="" height={20} />
            <div className="flex gap-8 justify-center items-start my-4">
              <div>
                <input
                  type="email"
                  placeholder="Your email"
                  autoCorrect="off"
                  autoComplete="off"
                  className="input-field w-96"
                />
                <p className="mt-4 text-textcolor text-lg text-center">
                  *No, there is no catch, we actually are.
                </p>
              </div>
              <button className="btn-rounded">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Section1;
