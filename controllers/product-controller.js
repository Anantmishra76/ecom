const productModel = require("../model/productmodel");

module.exports.getProducts = async (req, res) => {
  try {
    const products = await productModel.find();
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
};

module.exports.createProduct = async (req, res) => {
  try {
    const product = await productModel.create({
      productname: req.body.productname,
      image: "/uploads/" + req.file.filename,
      price: Number(req.body.price),
      discount: Number(req.body.discount),
      bgcolor: req.body.bgcolor,
      panelcolor: req.body.panelcolor,
      textcolor: req.body.textcolor,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};
