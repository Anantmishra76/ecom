const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const CreateProduct = require("../controllers/CreateProduct");

router.post("/create", upload.single("image"), CreateProduct);

module.exports = router;
