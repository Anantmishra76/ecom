const jwt = require("jsonwebtoken");
const ownermodel = require("../model/ownersmodel");

module.exports = async function (req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const owner = await ownermodel.findById(decoded.id).select("-password");

    if (!owner) {
      return res.status(403).json({
        success: false,
        message:
          "Access denied because you not owner only owner can add the products",
      });
    }

    req.owner = owner;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
