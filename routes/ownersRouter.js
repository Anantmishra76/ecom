const express = require("express");
const router = express.Router();
const ownerModel = require("../model/ownersmodel");

router.get("/", (req, res) => {
  res.send("Hey This is base route for owner router ");
});
router.post("/create", async (req, res) => {
  let owners = await ownerModel.find();
  if (owners.length > 0) {
    return res
      .status(504)
      .send("you have not permission to create a new owner ");
  }

  let { name, email, password } = req.body;
  let createdowner = await ownerModel.create({
    name,
    email,
    password,
  });
  res.status(201).send(createdowner);
});

module.exports = router;

