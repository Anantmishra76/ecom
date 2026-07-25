const express = require("express");
const router = express.Router();
const usermodel = require("../model/usermodel");
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  res.send("This Base route is for user");
});

router.post("/register", async (req, res) => {
  try {
    let { name, email, password } = req.body;

    bcrypt.genSalt(10, (err, salt) => {
      if (err) return res.send(err.message);

      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) return res.send(err.message);

        try {
          let createdUser = await usermodel.create({
            name,
            email,
            password: hash,
          });
          res.status(201).send(createdUser);
        } 
        catch (error) {
          res.send(error.message);
        }
      });
    });
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
