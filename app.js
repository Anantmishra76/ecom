const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const expressSession = require("express-session");
const flash = require("connect-flash");
const cors = require("cors");

const usermodel = require("./model/usermodel");
const productmodel = require("./model/productmodel");
const ownersRouter = require("./routes/ownersRouter");
const usersRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouter");
const cartRouter = require("./routes/cartRouter");
const indexRouter = require("./routes/index");

require("dotenv").config();

const db = require("./config/mongoose-connection");
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  expressSession({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(flash());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

app.use("/api", indexRouter);
app.use("/api/auth", usersRouter);
app.use("/api/owner", ownersRouter);
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);

app.listen(PORT, (req, res) => {
  console.log(`Server is running on ${PORT}`);
});
