const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar Upload

  type BooleanResponse {
    success: Boolean!
    message: String!
  }

  type PostsResponse {
    success: Boolean!
    message: String!
    posts: [Post!]
  }
  type PostResponse {
    success: Boolean!
    message: String!
    post: Post!
  }

  type CreateProjectResponse {
    success: Boolean!
    message: String!
    data: ID!
  }

  type Post {
    _id: ID
    title: String
    slug: String
    cover_image: File
    about: String
    location: String
    deadline: String
    num_of_employee: Int
    tags: [String]
    company: CompanyUser
    faqs: FAQ
    links: Links
    type: String
  }

  type CompanyUser {
    _id: ID
    name: String
    username: String
    email: String
    verified: Boolean
    cover_image: File
    about: String
    profile_image: File
    all_job_offers: [Post]
    location: String
    company_size: Int
    social: [String]
    founded: String
    contact: String

    modelType: String
  }

  type User {
    _id: ID
    name: String
    verified: Boolean
    gender: String
    bio: String
    email: String
    profile: File
    username: String

    formal_education: String
    degree_type: String
    university: String
    field_of_study: String
    month_of_graduation: String
    year_of_graduation: String

    top_skills: [String]
    describes: String
    resume: File
    has_work_experience: Boolean
    work_experience: [WorkExperience]

    contact_name: String
    contact_number: String

    modelType: String
  }

  type Project {
    _id: ID
    name: String
    tagline: String
    problem: String
    challenges: String
    technologies: [String!]
    links: [String!]
    demo_video: File
    cover_image: File
    images: File
    logo: File
    platform: [String]
  }

  type Links {
    website: String
    twitter: String
    linkedin: String
    discord: String
    instagram: String
    number: String
  }

  input LinksInput {
    website: String
    twitter: String
    linkedin: String
    discord: String
    instagram: String
    number: String
  }

  type FAQ {
    question: String
    answer: String
  }

  input FAQInput {
    question: String!
    answer: String!
  }

  type UserResponse {
    success: Boolean!
    message: String!
    user: User
    companyUser: CompanyUser
  }
  type ProjectResponse {
    success: Boolean!
    message: String!
    projects: [Project]
  }
  type SingleProjectResponse {
    success: Boolean!
    message: String!
    data: Project
  }

  type Date {
    month: String
    year: String
  }

  input DateInput {
    month: String
    year: String
  }

  type File {
    url: String
    cloud_id: String
  }

  input FileInput {
    url: String
    cloud_id: String
  }

  input UserInput {
    name: String
    verified: Boolean
    gender: String
    bio: String
    email: String
    profile: FileInput
    username: String

    formal_education: String
    degree_type: String
    university: String
    field_of_study: String
    month_of_graduation: String
    year_of_graduation: String

    top_skills: [String!]
    describes: String
    resume: FileInput
    has_work_experience: Boolean
    work_experience: [WorkExperienceInput!]

    contact_name: String
    contact_number: String
  }

  type WorkExperience {
    employer: String
    role: String
    from: Date
    to: Date
    description: String
  }

  input WorkExperienceInput {
    employer: String
    role: String
    from: DateInput
    to: DateInput
    description: String!
  }

  input RegisterInput {
    name: String
    email: String
    password: String
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input CreateProjectInput {
    _id: String
    name: String!
    tagline: String
    problem: String
    challenges: String
    technologies: [String]
    links: [String]
    demo_video: Upload
    cover_image: Upload
    images: [Upload]
    logo: Upload
    platform: [String!]
  }

  input RegisterCompanyInput {
    email: String!
    name: String!
    password: String!
    logo: Upload!
  }

  input LoginCompanyInput {
    email: String!
    password: String!
  }

  input LimitSkipInput {
    limit: Int
    skip: Int
  }

  input CreateJobInput {
    cover_image: FileInput
    about: String
    location: String
    title: String
    deadline: String
    num_of_employee: Int
    tags: [String!]
    faqs: [FAQInput!]
    links: LinksInput
  }

  input SingleJobOfferInput {
    slug: String!
  }

  input SingleProjectInput {
    id: ID!
  }

  type Query {
    getUser: UserResponse!
    getAllPosts(input: LimitSkipInput!): PostsResponse!
    getSingleJobOffer(input: SingleJobOfferInput!): PostResponse!
    getAllProjects: ProjectResponse!
    getSingleProject(input: SingleProjectInput!): SingleProjectResponse!
  }

  type Mutation {
    # @normal_user
    registerUser(input: RegisterInput!): BooleanResponse!
    loginUser(input: LoginInput!): BooleanResponse!
    updateUser(input: UserInput!): BooleanResponse!

    createProject(input: CreateProjectInput!): CreateProjectResponse!
    updateProject(input: CreateProjectInput!): CreateProjectResponse!

    # @company_owner
    registerOwner(input: RegisterCompanyInput!): BooleanResponse!
    loginOwner(input: LoginCompanyInput!): BooleanResponse!
    createJobPost(input: CreateJobInput!): BooleanResponse!
  }
`;

module.exports = typeDefs;
