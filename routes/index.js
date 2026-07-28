const express = require("express");
const router = express.Router();
const isLoggedin = require("../middlewares/isLoggedin");
const productmodel = require("../model/productmodel");

router.get("/", (req, res) => {
  res.json({
    message: "Backend is running successfully",
  });
});

router.get("/shop", isLoggedin, async (req, res) => {
  try {
    const products = await productmodel.find();
    res.status(200).json({
      success: true,
      message: "All Products Fetched Successfully",
      products,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: err.message,
    });
  }
});

module.exports = router;
