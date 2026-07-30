const bcrypt = require("bcrypt");
const usermodel = require("../model/usermodel");
const { generatetoken } = require("../utils/generatetoken");

module.exports.registerUser = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    let user = await usermodel.findOne({ email: email });
    if (user)
      return res.status(401).send("You already have an account plsss login");

    bcrypt.genSalt(10, (err, salt) => {
      if (err) return res.status(500).send(err.message);

      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) return res.status(500).send(err.message);

        try {
          let createdUser = await usermodel.create({
            name,
            email,
            password: hash,
          });

          let token = generatetoken(createdUser);

          // Set cookie in the browser
          res.cookie("token", token);
          return res.status(201).json({
            message: "User Created Successfully",
            user: createdUser,
          });
        } catch (error) {
          return res.status(400).send(error.message);
        }
      });
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports.loginUser = async (req, res) => {
  let { email, password } = req.body;
  let user = await usermodel.findOne({ email: email });
  if (!user) return res.send("email or password inccorect");
  bcrypt.compare(password, user.password, function (err, result) {
    if (result) {
      let token = generatetoken(user);
      res.cookie("token", token);
      res.send("logged in successfully  ");
    } else {
      return res.send("email or password inccorect");
    }
  });
};

module.exports.logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "logout successfully ",
  });
};
