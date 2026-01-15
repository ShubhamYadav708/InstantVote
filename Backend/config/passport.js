const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const { Strategy: MicrosoftStrategy } = require("passport-microsoft");
const User = require("../models/user");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,

      callbackURL: "https://instantvote-backend.onrender.com/auth/google/callback"
    },
    async (_, __, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        if (!email) return done(new Error("No email from Google"), null);

        let user = await User.findOne({ email, provider: "google" });

        if (!user) {
          user = await User.create({
            name: profile.displayName,
            email,
            provider: "google",
            providerId: profile.id,
            password: null
          });
        }

        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

passport.use(
  new MicrosoftStrategy(
    {
      clientID: process.env.MICROSOFT_CLIENT_ID,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET,

      callbackURL:
        "https://instantvote-backend.onrender.com/auth/microsoft/callback",

      tenant: process.env.MICROSOFT_TENANT_ID,
      scope: ["user.read"],
      authorizationURL:
        "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
      tokenURL:
        "https://login.microsoftonline.com/common/oauth2/v2.0/token"
    },
    async (_, __, profile, done) => {
      try {
        const email =
          profile.emails?.[0]?.value ||
          profile._json?.mail ||
          profile._json?.userPrincipalName;

        if (!email) return done(new Error("No email from Microsoft"), null);

        let user = await User.findOne({ email, provider: "microsoft" });

        if (!user) {
          user = await User.create({
            name: profile.displayName,
            email,
            provider: "microsoft",
            providerId: profile.id,
            password: null
          });
        }

        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

module.exports = passport;
