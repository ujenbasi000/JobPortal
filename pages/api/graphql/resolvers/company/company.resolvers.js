const { MESSAGES } = require("../../../../../constants");
const Company = require("../../models/company.model");
const bcryptjs = require("bcryptjs");
const cloudinary = require("../../../../config/cloudinary");

const CompanyResolver = {
  registerOwner: async (_, { input }, ctx) => {
    const { name, email, password } = input;
    try {
      const emailExist = await Company.findOne({ email });

      if (emailExist) {
        return {
          message: MESSAGES.emailExist,
          success: false,
        };
      }

      const encryptPassword = await bcryptjs.hash(password, 10);

      const {
        file: { createReadStream },
      } = await input.logo;
      const fileStream = createReadStream();

      const response = await new Promise((resolve, reject) => {
        const cloudStream = cloudinary.v2.uploader.upload_stream(
          {
            resource_type: "auto",
            folder: "jobportal",
            upload_preset: "jobportal_preset",
          },
          (err, result) => {
            if (err) {
              return reject(err);
            }
            resolve(result);
          }
        );
        fileStream.pipe(cloudStream);
      });

      console.log({ response });

      const newCompany = await Company.create({
        ...input,
        username: name.toLowerCase().trim().replaceAll(" ", ""),
        password: encryptPassword,
        logo: {
          cloud_id: response.public_id,
          url: response.secure_url,
        },
      });

      const token = newCompany.createToken();

      ctx.res.cookie("token", token, { maxAge: 900000 });

      return {
        message: MESSAGES.register,
        success: true,
      };
    } catch (err) {
      console.log(err);
      return {
        message: err.message || MESSAGES.serverError,
        success: false,
      };
    }
  },

  loginOwner: async (_, { input }, ctx) => {
    const { email, password } = input;

    try {
      const findUser = await Company.findOne({ email });

      if (findUser) {
        const passwordMatch = await bcryptjs.compare(
          password,
          findUser.password
        );

        if (passwordMatch) {
          const token = findUser.createToken();

          ctx.res.cookie("token", token, { maxAge: 900000 });

          return {
            message: MESSAGES.login,
            success: true,
          };
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
    } catch (err) {
      console.log(err);

      return {
        messsage: MESSAGES.serverError,
        success: false,
      };
    }
  },
};

module.exports = CompanyResolver;
