const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account"
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=google`
  }),
  (req, res) => {
    try {
      const token = jwt.sign(
        {
          id: req.user._id,
          email: req.user.email,
          provider: "google"
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );
      res.redirect(
        `${process.env.FRONTEND_URL}/oauth-success?token=${token}`
      );
    } catch (err) {
      console.error("Google OAuth Error:", err);
      res.redirect(`${process.env.FRONTEND_URL}/login?error=google`);
    }
  }
);


router.get(
  "/microsoft",
  passport.authenticate("microsoft", {
    scope: ["user.read"]
  })
);

router.get(
  "/microsoft/callback",
  passport.authenticate("microsoft", {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=microsoft`
  }),
  (req, res) => {
    try {
      const token = jwt.sign(
        {
          id: req.user._id,
          email: req.user.email,
          provider: "microsoft"
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.redirect(
        `${process.env.FRONTEND_URL}/oauth-success?token=${token}`
      );
    } catch (err) {
      console.error("Microsoft OAuth Error:", err);
      res.redirect(`${process.env.FRONTEND_URL}/login?error=microsoft`);
    }
  }
);

module.exports = router;
