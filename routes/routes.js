const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const auth = require("../middleware/auth");
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).send("User not found");
    }
    const verifyPass = await bcrypt.compare(req.body.password, user.password);
    if (!verifyPass) {
      return res.status(401).send("Incorrect credentials");
    } else {
      const token = jwt.sign(
        { userId: user._id, username: req.body.username },
        process.env.JWT_KEY,
        {
          expiresIn: "24h",
        }
      );

      return res.send({ msg: "Login successful", token });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/register", async (req, res) => {
  try {
    const { username, email, password, pic } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = User({ username, email, password: hashedPassword, pic });
    const result = await user.save();
    res.send("User registered successfully");
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/registerMail", async (req, res) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    let MailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Mailgen",
        link: "https://mailgen.js/",
      },
    });

    const { username, userEmail, text, subject } = req.body;

    let email = {
      body: {
        name: username,
        intro: text || "Welcome to our site!",
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };

    let emailBody = MailGenerator.generate(email);

    let info = await transporter.sendMail({
      from: process.env.EMAIL,
      to: userEmail,
      subject: subject || "Signup successful",
      html: emailBody,
    });
    if (!info) {
      return res.status(500).send("Email not sent");
    } else {
      return res.send("Email sent successfully");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/update", auth, async (req, res) => {
  try {
    const result = await User.updateOne(
      { username: req.token.username },
      req.body
    );
    res.send("User updated successfully");
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put("/resetpass", async (req, res) => {
  try {
    const { username, pass, confpass } = req.body;
    if (pass !== confpass) {
      return res.status(400).send("Passwords do not match");
    }
    const hashedPassword = await bcrypt.hash(pass, 10);
    const result = await User.updateOne(
      { username },
      { password: hashedPassword }
    );
    res.send("Password updated successfully");
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/user/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username }).select("-password");
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/getOTP", async (req, res) => {
  try {
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });
    req.app.locals.otp = otp;
    res.send(otp);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/verifyOTP", async (req, res) => {
  try {
    if (req.app.locals.otp !== req.query.otp) {
      return res.status(401).send("Invalid OTP");
    }
    req.app.locals.otp = null;
    res.send("Correct OTP");
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
