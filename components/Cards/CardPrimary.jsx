const CardPrimary = () => {
  return (
    <div className="w-full rounded-md boxShadow p-4">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl text-black font-bold hover:text-blue">
          Hackodisha 2.0
        </h1>
        <div className="flex gap-2 items-center">
          <button className="btn-rounded-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.2rem"
              height="1.2rem"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"></path>
              <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"></path>
            </svg>
          </button>
          <button className="btn-rounded-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.2rem"
              height="1.2rem"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
            </svg>
          </button>
        </div>
      </header>
      <section className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-sm font-extrabold text-textcolor mb-2">SALARY</h3>
          <div className="flex gap-2">
            <button className="border border-border text-textcolor px-3 py-1 bg-whiteColor rounded-xl text-sm font-semibold">
              $90k - $150k USD
            </button>
            <button className="border border-border text-textcolor px-3 py-1 bg-whiteColor rounded-xl text-sm font-semibold">
              Negotiable
            </button>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-extrabold text-textcolor mb-2">
            APPLICANTS
          </h3>
          <h1 className="text-xl text-end font-bold text-blue">+9</h1>
        </div>
      </section>
      <section className="flex justify-end gap-3">
        <button className="px-6 text-base w-fit btn-primary">Save</button>
        <button className="px-6 text-base w-fit btn-secondary py-3">
          Apply
        </button>
      </section>
    </div>
  );
};

export default CardPrimary;
