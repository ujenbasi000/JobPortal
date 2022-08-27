const { MESSAGES } = require("../../../../../constants");
const JobPost = require("../../models/job_post.model");

const JobPostQuery = {
  getAllPosts: async (_, { input }) => {
    const { skip, limit } = input;
    try {
      const posts = await JobPost.find()
        .skip(skip)
        .limit(limit)
        .populate({
          path: "company",
          model: "Companies",
        })
        .populate({
          path: "company",
          model: "Companies",
          populate: {
            path: "all_job_offers",
            model: "Jobposts",
          },
        });
      return {
        message: MESSAGES.foundPosts,
        success: true,
        posts,
      };
    } catch (err) {
      console.log(err);
      return {
        message: MESSAGES.serverError,
        success: false,
      };
    }
  },
};

module.exports = JobPostQuery;
