const express = require("express");
const router = express.Router();
const isLoggedin = require("../middlewares/isLoggedin");
const usermodel = require("../model/usermodel");

router.get("/", isLoggedin, async (req, res) => {
  try {
    const userCart = await usermodel.findById(req.user.id).populate("cart");
    const totalprice = userCart.cart.reduce((total, product) => {
      return total + product.price;
    }, 0);

    res.status(200).json({
      message: "User Cart fetched successfully",
      success: true,
      cart: userCart.cart,
      totalprice,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

router.post("/items/:productId", isLoggedin, async (req, res) => {
  try {
    const user = await usermodel.findById(req.user.id);
    user.cart.push(req.params.productId);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Product added to cart",
      cart: user.cart,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
