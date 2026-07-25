const mongoose = require("mongoose");
const config = require("config");

const connect = mongoose
  // here we use config insted of env beacuse it himself watch that code is running on production or local machine then dynamically load the value from there
  .connect(`${config.get("MONGODB_URI")}/ecomdatabase`)
  .then(() => {
    console.log("Database connected Successfully");
  })
  .catch((err) => {
    console.log(` Database connection error ${err}`);
  });

module.exports = mongoose.connection;
