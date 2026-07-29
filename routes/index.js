const express = require("express");
const router = express.Router();
const isLoggedin = require("../middlewares/isLoggedin");
const productmodel = require("../model/productmodel");
const usermodel = require("../model/usermodel");

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

// here we findout the user first then we use .cart to fint the cart data from that logged in user data
// but wecan use populate that help me to get the detail of the product  by using refernce in usermodel and that think like this that poduct is realted to product model and then it search that id in pruduct model and then if we use populate then get all data from product model

router.get("/cart", isLoggedin, async (req, res) => {
  const user = await usermodel.findById(req.user.id);
  const UserCart = await usermodel.findById(req.user.id).populate("cart");

  console.log(UserCart.cart);
  res.send(UserCart.cart);
});

router.post("/addtocart/:productid", isLoggedin, async (req, res) => {
  try {
    const user = await usermodel.findById(req.user.id);
    user.cart.push(req.params.productid); // in the  usermodel cart  push or add productid
    await user.save(); // save

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
