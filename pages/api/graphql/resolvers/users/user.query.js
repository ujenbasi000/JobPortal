const { MESSAGES } = require("../../../../../constants");
const isAuth = require("../../middleware/auth");
const Company = require("../../models/company.model");
const User = require("../../models/user.model");

const UserQuery = {
  getUser: async (_, __, ctx) => {
    const data = await isAuth(ctx);
    if (data._id) {
      let user;
      if (data.modelType === "normal") {
        console.log("Normal User");
        user = await User.findById({ _id: data._id });
      } else {
        console.log("Company User");
        user = await Company.findById({ _id: data._id });
      }

      if (user) {
        return {
          user: data.modelType === "normal" ? user : null,
          companyUser: data.modelType === "company" ? user : null,
          message: MESSAGES.userfound,
          success: true,
        };
      } else {
        return {
          message: MESSAGES.userNotFound,
          success: false,
          user: null,
        };
      }
    }
  },
};

module.exports = UserQuery;
