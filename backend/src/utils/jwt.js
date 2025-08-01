const jsonwebtoken = require("jsonwebtoken");

const jwt = {
  generateAccessToken: (payload) => {
    return jsonwebtoken.sign(payload, process.env.JWT_ACCESS_KEY, {
      expiresIn: "5m",
    });
  },
  generateRefreshToken: (payload) => {
    return jsonwebtoken.sign(payload, process.env.JWT_REFRESH_KEY, {
      expiresIn: "7d",
    });
  },
};

module.exports = jwt;
