const express = require("express");
const router = express.Router();
const usermodel = require("../model/usermodel");

router.get("/", (req, res) => {
  res.send("This Base route is for user");
});

router.post("/register", async (req, res) => {
  try {
    let { name, email, password } = req.body;
    let createdUser = await usermodel.create({
      name,
      email,
      password,
    });
    res.status(201).send(createdUser);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
