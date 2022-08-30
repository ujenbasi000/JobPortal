/* eslint-disable @next/next/no-img-element */
import CreateProject from "./CreateProject";
import MyProjects from "./MyProjects";

const ProjectsBody = ({ details }) => {
  return (
    <section className="bg-whiteColor min-h-screen w-full">
      <div className="container mx-auto">
        <div className="py-16 text-center">
          <h1 className="text-4xl mb-4 font-extrabold text-black">
            Share what you built
          </h1>
          <p className="text-textcolor w-7/12 mx-auto text-lg font-normal">
            Give your weekend projects, side projects, hobby projects, serious
            ventures a place to breathe, invite collaborators and inspire other
            builders.
          </p>
        </div>
        <CreateProject />
        <MyProjects details={details} />
      </div>
    </section>
  );
};

export default ProjectsBody;
