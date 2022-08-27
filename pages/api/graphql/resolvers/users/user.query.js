const { MESSAGES } = require("../../../../../constants");
const isAuth = require("../../middleware/auth");
const User = require("../../models/user.model");

const UserQuery = {
  getUser: async (_, __, ctx) => {
    const token = await isAuth(ctx);

    if (token) {
      const user = await User.findById({ _id: token });

      if (user) {
        return {
          user,
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
