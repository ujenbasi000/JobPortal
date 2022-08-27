const mongoose = require("mongoose");

const { Schema, model: Model } = mongoose;

const JobPostSchema = new Schema(
  {
    cover_image: {
      cloud_id: { type: String, default: null },
      url: { type: String, default: null },
    },
    about: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    deadline: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "Job",
      enum: ["Job", "Internship", "Freelancing"],
    },
    remote_job: {
      type: Boolean,
      default: false,
    },
    contract_role: {
      type: String,
      default: "1 year",
      required: false,
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: "companies",
    },
    tags: {
      type: [{ type: String }],
      default: [],
    },
    faqs: {
      type: [
        {
          question: {
            type: String,
          },
          answer: {
            type: String,
          },
        },
      ],
      default: [],
    },
    links: {
      website: { type: String, default: null },
      twitter: { type: String, default: null },
      linkedin: { type: String, default: null },
      discord: { type: String, default: null },
      instagram: { type: String, default: null },
    },
  },
  { timestamps: true }
);

const JobPost = Model("Jobposts", JobPostSchema);

module.exports = JobPost;
