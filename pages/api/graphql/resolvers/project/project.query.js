const { gql } = require("apollo-server-express");
const { MESSAGES } = require("../../../../../constants");
const isAuth = require("../../middleware/auth");
const Project = require("../../models/projects.model");
const User = require("../../models/user.model");

const ProjectQuery = {
  getAllProjects: async (_, __, context) => {
    const data = await isAuth(context);

    if (data.modelType === "normal") {
      const user = await User.findById(data._id).populate({
        path: "projects",
        model: "Projects",
      });

      if (user) {
        return {
          message: MESSAGES.userfound,
          success: true,
          projects: user.projects,
        };
      }
      return {
        message: MESSAGES.userNotFound,
        success: true,
        data: null,
      };
    } else {
      return {
        message: "Not allowed to access",
        success: false,
        data: null,
      };
    }
  },
  getSingleProject: async (_, { input }, context) => {
    const data = await isAuth(context);

    if (data.modelType === "normal") {
      const project = await Project.findById(input.id);
      if (project) {
        return {
          success: true,
          message: "Project found",
          data: project,
        };
      } else {
        return {
          success: false,
          message: "Project not found",
          data: null,
        };
      }
    } else {
      return {
        message: "Not allowed to access",
        success: false,
        data: null,
      };
    }
  },
};

module.exports = ProjectQuery;
