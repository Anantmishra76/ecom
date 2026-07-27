const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../model/productmodel");

router.post("/create", upload.single("image"), async (req, res) => {
  try {
    const product = await productModel.create({
      productname: req.body.productname,
      image: req.file.buffer,
      price: Number(req.body.price),
      discount: Number(req.body.discount),
      bgcolor: req.body.bgcolor,
      panelcolor: req.body.panelcolor,
      textcolor: req.body.textcolor,
    });
    res.status(201).json({
      message: "Product Created Successully",
      product,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Something Went Wrong",
    });
  }
});

module.exports = router;
