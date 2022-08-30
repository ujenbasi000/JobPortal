const { UserResolver, UserQuery } = require("./users");
const { ProjectResolvers } = require("./project");
const { CompanyResolver } = require("./company");
const { JobPostQuery, JobPostResolver } = require("./job_post");
const ProjectQuery = require("./project/project.query");

const resolvers = {
  Query: {
    ...UserQuery,
    ...JobPostQuery,
    ...ProjectQuery,
  },
  Mutation: {
    ...UserResolver,
    ...ProjectResolvers,
    ...CompanyResolver,
    ...JobPostResolver,
  },
};

module.exports = resolvers;
