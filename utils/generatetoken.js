const jwt = require("jsonwebtoken");

const generatetoken = (user) => {
  return jwt.sign({ email: user.email, id: user._id }, process.env.JWT_KEY);
};

const generateOwnerToken = (owner) => {
  return jwt.sign(
    {
      email: owner.email,
      id: owner._id,
      role: "owner",
    },
    process.env.JWT_KEY,
  );
};

module.exports.generatetoken = generatetoken;
module.exports.generateOwnerToken = generateOwnerToken;

