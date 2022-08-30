//! Normal user
const mongoose = require("mongoose");

const { Schema, model: Model } = mongoose;

const ProjectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    tagline: {
      type: String,
    },
    problem: {
      type: String,
    },
    challenges: {
      type: String,
    },
    technologies: [{ type: String }],
    links: [{ type: String }],
    demo_video: {
      url: String,
      cloud_id: String,
    },
    cover_image: {
      url: String,
      cloud_id: String,
    },
    images: [{ url: String, cloud_id: String }],
    logo: { url: String, cloud_id: String },
    platform: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const Project = Model("Projects", ProjectSchema);

module.exports = Project;
