const express = require("express");
const router = express.Router();
const isLoggedin = require("../middlewares/isLoggedin");

router.get("/", (req, res) => {
  let error = req.flash("error");
  req.render("index", { error });
});

router.get("/shop", isLoggedin, (req, res) => {
  res.render("shop ");
});

module.exports = router;
