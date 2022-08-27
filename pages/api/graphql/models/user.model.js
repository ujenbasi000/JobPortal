//! Normal user

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const { Schema, model: Model } = mongoose;

const UserSchema = new Schema(
  {
    modelType: {
      type: String,
      immutable: true,
      default: "normal",
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    gender: {
      type: String,
      default: null,
    },
    bio: {
      type: String,
      default: null,
    },

    profile: {
      url: { type: String, default: null },
      cloud_id: { type: String, default: null },
    },
    formal_education: {
      type: String,
      default: null,
    },
    degree_type: {
      type: String,
      default: null,
    },
    university: {
      type: String,
      default: null,
    },
    field_of_study: {
      type: String,
      default: null,
    },
    month_of_graduation: {
      type: String,
      default: null,
    },
    year_of_graduation: {
      type: String,
      default: null,
    },
    top_skills: {
      type: [String],
      default: [],
    },
    describes: {
      type: String,
      default: null,
    },
    resume: {
      type: String,
      default: null,
    },
    has_work_experience: {
      type: Boolean,
      default: false,
    },
    work_experience: {
      type: [
        {
          employer: String,
          role: String,
          from: {
            month: String,
            year: String,
          },
          to: {
            month: String,
            year: String,
          },
          description: {
            type: String,
          },
        },
      ],
      default: [],
    },
    links: {
      type: [
        {
          type: String,
        },
      ],
      default: [],
    },
    projects: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "projects",
        },
      ],
      default: [],
    },
    contact_name: { type: String, default: null },
    contact_number: { type: String, default: null },
  },
  { timestamps: true }
);

UserSchema.methods.createToken = function () {
  const token = jwt.sign(this._id.toString(), process.env.TOKEN_SECRET);
  console.log("New Token: ", token);
  return token;
};

const User = Model("User", UserSchema);
module.exports = User;
