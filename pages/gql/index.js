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

module.exports = {
  CREATE_BUSINESS_ACCOUNT,
  CREATE_NORMAL_ACCOUNT,
  LOGIN_BUSINESS_ACCOUNT,
  LOGIN_NORMAL_ACCOUNT,
};
