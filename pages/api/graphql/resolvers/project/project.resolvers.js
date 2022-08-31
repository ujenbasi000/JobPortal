const { MESSAGES } = require("../../../../../constants");
const isAuth = require("../../middleware/auth");
const Project = require("../../models/projects.model");
const User = require("../../models/user.model");
const cloudinary = require("../../../../config/cloudinary");

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

  updateProject: async (_, { input }, ctx) => {
    const data = await isAuth(ctx);
    const user = await User.findById(data._id);

    if (user) {
      let response,
        response2 = [];
      if (input.cover_image) {
        const {
          file: { createReadStream },
        } = await input.cover_image;
        const fileStream = createReadStream();

        response = await new Promise((resolve, reject) => {
          const cloudStream = cloudinary.v2.uploader.upload_stream(
            {
              resource_type: "auto",
              folder: "jobportal/projects",
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
      }
      console.log(input.images);
      if (input.images && input.images.length > 0) {
        for (let i = 0; i < input.images.length; i++) {
          const {
            file: { createReadStream },
          } = await input.images[i];
          const fileStream = createReadStream();

          const response = await new Promise((resolve, reject) => {
            const cloudStream = cloudinary.v2.uploader.upload_stream(
              {
                resource_type: "auto",
                folder: "jobportal/projects",
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

          response2.push({
            secure_url: response.secure_url,
            cloud_id: response.public_id,
          });
        }
      }
      const project = await Project.findByIdAndUpdate(
        input._id,
        {
          $set: {
            ...input,
            cover_image: {
              url: response.secure_url || null,
              cloud_id: response.public_id || null,
            },
            images: response2 || [],
          },
        },
        { new: true }
      );
      console.log(project);
      return {
        message: MESSAGES.projectUpdated,
        success: true,
        data: "5as4df587sdf54sd68",
      };
    } else {
      return {
        message: MESSAGES.userNotFound,
        success: false,
      };
    }
  },
};

module.exports = ProjectResolvers;
