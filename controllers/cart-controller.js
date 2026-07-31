const usermodel = require("../model/usermodel");

module.exports.getCart = async (req, res) => {
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
};

module.exports.addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await usermodel.findById(req.user.id);
    user.cart.push(productId);
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
};
