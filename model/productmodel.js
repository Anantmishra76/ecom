const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  productname: String,
  images: String,
  price: Number,
  discout: {
    type: Number,
    default: 0,
  },
  bgcolor: String,
  panelcolor: String,
  textcolor: String,
});

module.exports = mongoose.model("product", ProductSchema);
