const bcrypt = require("bcrypt");
const ownerModel = require("../model/ownersmodel");
const { generateOwnerToken } = require("../utils/generatetoken");

module.exports.ownerDashboard = (req, res) => {
  res.send("Hey This is base route for owner router ");
};

module.exports.registerOwner = async (req, res) => {
  try {
    const owners = await ownerModel.find();
    if (owners.length > 0) {
      return res.status(403).json({
        success: false,
        message:
          "You do not have permission to create a new owner because only one owner is allowed",
      });
    }

    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const createdOwner = await ownerModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateOwnerToken(createdOwner);
    res.cookie("token", token);

    res.status(201).json({
      success: true,
      message: "Owner created successfully",
      owner: createdOwner,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports.loginOwner = async (req, res) => {
  try {
    const { email, password } = req.body;
    const owner = await ownerModel.findOne({ email });

    if (!owner) {
      return res.status(401).json({
        success: false,
        message: "Email or password incorrect",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, owner.password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Email or password incorrect",
      });
    }

    const token = generateOwnerToken(owner);
    res.cookie("token", token);

    res.status(200).json({
      success: true,
      message: "Owner logged in successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
