const { gql } = require("@apollo/client");

const CREATE_BUSINESS_ACCOUNT = gql`
  mutation CREATE_BUSINESS_ACCOUNT($input: RegisterCompanyInput!) {
    registerOwner(input: $input) {
      message
      success
    }
  }
`;

const CREATE_NORMAL_ACCOUNT = gql`
  mutation CREATE_NORMAL_ACCOUNT($input: RegisterInput!) {
    registerUser(input: $input) {
      message
      success
    }
  }
`;
const LOGIN_BUSINESS_ACCOUNT = gql`
  mutation LOGIN_BUSINESS_ACCOUNT($input: LoginCompanyInput!) {
    loginOwner(input: $input) {
      message
      success
    }
  }
`;

const LOGIN_NORMAL_ACCOUNT = gql`
  mutation LOGIN_NORMAL_ACCOUNT($input: LoginInput!) {
    loginUser(input: $input) {
      message
      success
    }
  }
`;

const GET_LOGGEDIN_USER = gql`
  query GET_LOGGEDIN_USER {
    getUser {
      message
      success
      companyUser {
        name
        username
        modelType
      }
      user {
        name
        username
        modelType
      }
    }
  }
`;

const GET_ALL_JOB_OFFERS = gql`
  query GET_ALL_JOB_OFFERS($input: LimitSkipInput!) {
    getAllPosts(input: $input) {
      message
      success
      posts {
        title
        deadline
        slug
        type
      }
    }
  }
`;

const GET_SINGLE_JOB_OFFER = gql`
  query GET_SINGLE_JOB_OFFER($input: SingleJobOfferInput!) {
    getSingleJobOffer(input: $input) {
      message
      success
      post {
        _id
        title
        deadline
        company {
          name
        }
      }
    }
  }
`;

const GET_ALL_PROJECTS = gql`
  query GET_ALL_PROJECTS {
    getAllProjects {
      message
      success
      projects {
        _id
        name
        technologies
        tagline
      }
    }
  }
`;

const CREATE_PROJECT = gql`
  mutation CREATE_PROJECT($input: CreateProjectInput!) {
    createProject(input: $input) {
      message
      success
      data
    }
  }
`;

const GET_SINGLE_PROJECT = gql`
  query GET_SINGLE_PROJECT($input: SingleProjectInput!) {
    getSingleProject(input: $input) {
      message
      success
      data {
        _id
        name
        tagline
        technologies
      }
    }
  }
`;

module.exports = {
  CREATE_BUSINESS_ACCOUNT,
  CREATE_NORMAL_ACCOUNT,
  LOGIN_BUSINESS_ACCOUNT,
  LOGIN_NORMAL_ACCOUNT,

  GET_LOGGEDIN_USER,

  GET_ALL_JOB_OFFERS,
  GET_SINGLE_JOB_OFFER,
  GET_ALL_PROJECTS,

  CREATE_PROJECT,
  GET_SINGLE_PROJECT,
};
