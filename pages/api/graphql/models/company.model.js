//! Company owner -> user authentication

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const { Schema, model: Model } = mongoose;

const CompanySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    cover_image: {
      url: { type: String, default: null },
      cloud_id: { type: String, default: null },
    },
    about: {
      type: String,
      default: null,
    },
    logo: {
      url: { type: String, default: null },
      cloud_id: { type: String, default: null },
    },
    all_job_offers: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "jobOffers",
        },
      ],
      default: null,
    },
    location: {
      type: String,
      default: null,
    },
    company_size: {
      type: Number,
      default: 1,
    },
    social: {
      type: [
        {
          type: String,
        },
      ],
      default: [],
    },
    founded: {
      type: String,
      default: null,
    },
    contact: {
      type: String,
      default: null,
    },

    bookmark: {
      type: [
        {
          type: Schema.Types.ObjectId,
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

CompanySchema.methods.createToken = function () {
  const token = jwt.sign(this._id.toString(), process.env.TOKEN_SECRET);
  console.log("New Token: ", token);
  return token;
};

const Company = Model("Companies", CompanySchema);

module.exports = Company;
