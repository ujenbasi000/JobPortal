const jwt = require("jsonwebtoken");
const { MESSAGES } = require("../../../../constants");

const isAuth = async (context) => {
  try {
    const inpureToken = context.req.headers.authorization;
    if (inpureToken) {
      const pureToken = inpureToken.split(" ")[1];
      return jwt.verify(pureToken, process.env.TOKEN_SECRET);
    } else {
      throw new Error(MESSAGES.notAuthenticated);
    }
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      throw new Error(MESSAGES.notAuthenticated);
    }
  }
};

module.exports = isAuth;
