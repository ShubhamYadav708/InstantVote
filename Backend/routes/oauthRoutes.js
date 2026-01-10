const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=google`,
  }),
  (req, res) => {
    const token = jwt.sign(
      {
        id: req.user._id,
        provider: req.user.provider,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.redirect(
      `${process.env.FRONTEND_URL}/oauth-success?token=${token}`
    );
  }
);

router.get(
  "/microsoft",
  passport.authenticate("microsoft", {
    scope: ["user.read"],
  })
);

router.get(
  "/microsoft/callback",
  passport.authenticate("microsoft", {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=microsoft`,
  }),
  (req, res) => {
    const token = jwt.sign(
      {
        id: req.user._id,
        provider: req.user.provider,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.redirect(
      `${process.env.FRONTEND_URL}/oauth-success?token=${token}`
    );
  }
);

module.exports = router;
