const bcrypt = require("bcrypt");
const usermodel = require("../model/usermodel");
const { generatetoken } = require("../utils/generatetoken");

module.exports.registerUser = async (req, res) => {
  try {
    let { name, email, password } = req.body;

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
