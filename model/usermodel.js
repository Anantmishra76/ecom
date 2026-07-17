const mongoose = require("mongoose");

const connect = mongoose
  .connect("mongodb://localhost:27017/ecomdatabase")
  .then(() => {
    console.log("Database connected Successfully");
  });

const UserSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  cart: {
    type: Array,
    default: [],
  },
  isadmin: Boolean,
  orders: {
    type: Array,
    default: [],
  },
  contact: Number,
  picture: String,
});
module.exports = mongoose.model("user", UserSchema);
