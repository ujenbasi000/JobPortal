const DashboardHackathon = () => {
  return (
    <section className="container py-16 px-2 mx-auto">
      <h1 className="text-4xl mb-14 font-black text-black">Your Hackathons</h1>
      <ZeroApplies />
    </section>
  );
};

export default DashboardHackathon;

const ZeroApplies = () => {
  return (
    <section className="py-20 text-center rounded-md boxShadow bg-[#01e77a80] flex flex-col items-center justify-center">
      <h1 className="text-3xl leading-relaxed font-extrabold">
        You have Applied to
      </h1>
      <h1 className="text-6xl leading-relaxed font-black">0</h1>
      <p className="text-2xl leading-relaxed font-medium">Hackathons</p>
      <button className="btn-secondary w-fit mt-10">Explore Hackathons</button>
    </section>
  );
};
