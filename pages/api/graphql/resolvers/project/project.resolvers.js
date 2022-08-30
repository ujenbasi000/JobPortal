const { MESSAGES } = require("../../../../../constants");
const isAuth = require("../../middleware/auth");
const Project = require("../../models/projects.model");
const User = require("../../models/user.model");

const ProjectResolvers = {
  createProject: async (_, { input }, ctx) => {
    try {
      const id = await isAuth(ctx);

      const user = await User.findById(id);

      if (!user) {
        return {
          message: MESSAGES.userNotFound,
          success: false,
        };
      } else {
        const newProject = await Project.create(input);

        user.projects.push(newProject._id);

        user.save();
        return {
          message: MESSAGES.projectCreated,
          success: true,
          data: newProject._id,
        };
      }
    } catch (err) {
      console.log(err.message);
    }
  },
};

module.exports = ProjectResolvers;
