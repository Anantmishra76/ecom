const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hey This is user router ");
});

module.exports = router;
