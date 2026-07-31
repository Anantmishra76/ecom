const express = require("express");
const router = express.Router();
const isLoggedin = require("../middlewares/isLoggedin");
const { getCart, addToCart } = require("../controllers/cart-controller");

router.get("/", isLoggedin, getCart);
router.post("/items", isLoggedin, addToCart);
// router.post("/items/:productId", isLoggedin, addToCart);

module.exports = router;
