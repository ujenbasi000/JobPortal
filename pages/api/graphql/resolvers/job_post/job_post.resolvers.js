const { MESSAGES } = require("../../../../../constants");
const isAuth = require("../../middleware/auth");
const Company = require("../../models/company.model");
const JobPost = require("../../models/job_post.model");

const JobPostResolvers = {
  createJobPost: async (_, { input }, ctx) => {
    try {
      const id = await isAuth(ctx);
      const user = await Company.findById(id);

      if (!user) {
        return {
          message: MESSAGES.userNotFound,
          success: false,
        };
      } else {
        const newPost = await JobPost.create({
          ...input,
          slug: input.title.toLowerCase().replaceAll(/\W/g, "-").trim(),
          company: id,
        });
        user.all_job_offers.push(newPost._id);
        await user.save();
        return {
          message: MESSAGES.jobPostCreated,
          success: true,
        };
      }
    } catch (err) {
      return {
        message: MESSAGES.serverError,
        success: false,
      };
    }
  },
};

module.exports = JobPostResolvers;
