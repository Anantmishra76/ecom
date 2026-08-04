const jwt = require("jsonwebtoken");

const ExpireIN = "7d";

const generatetoken = (user) => {
  return (
    jwt.sign({ email: user.email, id: user._id }, process.env.JWT_KEY),
    { expiresIn: ExpireIN }
  );
};

const generateOwnerToken = (owner) => {
  return (
    jwt.sign(
      {
        email: owner.email,
        id: owner._id,
        role: "owner",
      },
      process.env.JWT_KEY,
    ),
    { expiresIn: ExpireIN }
  );
};

module.exports.generatetoken = generatetoken;
module.exports.generateOwnerToken = generateOwnerToken;
