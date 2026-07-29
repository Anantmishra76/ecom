const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
  ],

  orders: {
    type: Array,
    default: [],
  },
  contact: Number,
  picture: String,
});
module.exports = mongoose.model("user", UserSchema);
