const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
require("dotenv").config();
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = process.env.JWT_SECRET; //  Use environment variable or default secret

router.options('/createuser', (req, res) => {
  res.sendStatus(200); // For preflight
});

// ROUTE 1: Create a User using: POST "/api/auth/createuser"   // No login required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false;
    // If there are errors, return Bad Request with errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    try {
      // Check if the user with this email already exists
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
          success,
          error: "Sorry a user with this email already exists",
        });
      }

      // Hash the password before saving it
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // Create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, process.env.JWT_SECRET);

      // Return the newly created user
      // res.json(user);
      success = true;
      res.status(200).json({ success, authtoken });

      // Catch errors and send a 500 status code
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 2 Authenticate a User using: POST "/api/auth/login"   // No login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    // If there are errors, return Bad Request with errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      // Check if the user with this email exists
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        // If the user does not exist, return an error
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }
      // Compare the password with the hashed password
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        // If the password does not match, return an error
        return res.status(400).json({
          success,
          error: "Please try to login with correct credentials",
        });
      }

      // If the credentials are correct, create a JWT token
      // and send it back to the client
      const payload = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(payload, process.env.JWT_SECRET);
      success = true;
      // Return the JWT token
      res.status(200).json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 3: Get logged in User details using: POST "/api/auth/getuser"   // Login required
router.post("/getuser", fetchuser, async (req, res) => {
  // Get the user from the JWT token and return user details
  try {
    userId = req.user.id;
    // Find the user by ID and exclude the password field
    const user = await User.findById(userId).select("-password");
    res.status(200).send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
