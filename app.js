const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");

const usermodel = require("./model/usermodel");
const productmodel = require("./model/productmodel");
const ownersRouter = require("./routes/ownersRouter");
const usersRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouter");

const db = require("./config/mongoose-connection");
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

app.listen(PORT, (req, res) => {
  console.log(`Server is running on ${PORT}`);
});
