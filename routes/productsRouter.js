const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const isOwnerLoggedIn = require("../middlewares/isownerLogged");
const isLoggedin = require("../middlewares/isLoggedin");
const {
  getProducts,
  createProduct,
} = require("../controllers/product-controller");

router.get("/", isLoggedin, getProducts);
// only owner can create products
router.post("/add", isOwnerLoggedIn, upload.single("image"), createProduct);

module.exports = router;
