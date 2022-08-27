const User = require("../../models/user.model");
const bcryptjs = require("bcryptjs");
const { MESSAGES } = require("../../../../../constants");
const isAuth = require("../../middleware/auth");

const UserResolver = {
  registerUser: async (_, { input }, ctx) => {
    const { name, email, password } = input;

    try {
      if (name && email && password) {
        const userExist = await User.findOne({ email });

        if (!userExist) {
          const encryptPassword = await bcryptjs.hash(password, 10);
          const newUser = await User.create({
            ...input,
            password: encryptPassword,
            username: name.toLowerCase().trim().replaceAll(" ", ""),
          });

          if (newUser.email) {
            const token = newUser.createToken();

            if (token) {
              ctx.res.cookie("token", token, { maxAge: 8.64e7 });
              return {
                message: MESSAGES.register,
                success: true,
              };
            }
          }
        } else {
          return {
            success: false,
            message: MESSAGES.emailExist,
          };
        }
      }
    } catch (err) {
      console.log(err);
      return {
        message: MESSAGES.serverError,
        success: false,
      };
    }
  },

  loginUser: async (_, { input }, ctx) => {
    const { email, password } = input;
    try {
      if (email && password) {
        const userExist = await User.findOne({ email });

        if (userExist) {
          const passwordMatch = await bcryptjs.compare(
            password,
            userExist.password
          );

          if (passwordMatch) {
            const token = userExist.createToken();

            if (token) {
              ctx.res.cookie("token", token, { maxAge: 8.64e7 });
              return {
                message: MESSAGES.login,
                success: true,
              };
            }
          } else {
            return {
              message: MESSAGES.invalidCreate,
              success: false,
            };
          }
        } else {
          return {
            message: MESSAGES.userNotFound,
            success: false,
          };
        }
      }
    } catch (err) {
      console.log(err);
      return {
        message: MESSAGES.serverError,
        success: false,
      };
    }
  },

  updateUser: async (_, { input }, ctx) => {
    try {
      const id = await isAuth(ctx);
      const user = await User.findById(id);

      if (user === null) {
        return {
          message: MESSAGES.userNotFound,
          success: false,
        };
      } else {
        await User.findOneAndUpdate({ _id: id }, input);
        return {
          message: MESSAGES.updatedUser,
          success: true,
        };
      }
    } catch (err) {
      console.log(err);
      return {
        message: MESSAGES.serverError,
        success: false,
      };
    }
  },
};

module.exports = UserResolver;
