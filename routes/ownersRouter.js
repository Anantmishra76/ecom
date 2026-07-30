const express = require("express");
const router = express.Router();
const {
  ownerDashboard,
  registerOwner,
  loginOwner,
} = require("../controllers/owner-controller");

router.get("/dashboard", ownerDashboard);
router.post("/register", registerOwner);
router.post("/login", loginOwner);

module.exports = router;
