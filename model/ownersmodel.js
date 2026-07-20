const mongoose = require("mongoose");

const OwnerSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,

  products: {
    type: Array,
    default: [],
  },
  picture: String,
  gstin: String,
});
module.exports = mongoose.model("owner", OwnerSchema);
