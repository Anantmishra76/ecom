const mongoose = require("mongoose");

const connect = mongoose
  .connect("mongodb://localhost:27017/ecomdatabase")
  .then(() => {
    console.log("Database connected Successfully");
  })
  .catch((err) => {
    console.log(` Database connection error ${err}`);
  });

module.exports = mongoose.connection;
