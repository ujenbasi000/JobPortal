import CardPrimary from "../Cards/CardPrimary";

const JobInternshipsBody = () => {
  return (
    <section className="w-full my-10">
      <header className="flex items-center justify-between gap-4 mb-10">
        <h1 className="text-textcolor font-semibold text-4xl">Openings</h1>
        <span className="flex-1 h-[1px] bg-[#bdbdbd]"></span>
        <button className="btn-primary w-max border border-blue">
          All openings
        </button>
      </header>
      <main className="two-row-grid">
        <CardPrimary />
        <CardPrimary />
        <CardPrimary />
        <CardPrimary />
        <CardPrimary />
        <CardPrimary />
        <CardPrimary />
      </main>
    </section>
  );
};

export default JobInternshipsBody;
