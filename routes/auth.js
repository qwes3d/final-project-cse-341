// src/routes/auth.js
const express = require("express");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0").Strategy;
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const router = express.Router();

const DOMAIN = process.env.AUTH0_DOMAIN;
const CLIENT_ID = process.env.AUTH0_CLIENT_ID;
const CLIENT_SECRET = process.env.AUTH0_CLIENT_SECRET;
const CALLBACK = process.env.AUTH0_CALLBACK_URL || "http://localhost:3000/auth/callback";

// ✅ Configure Passport strategy (only used for login callback)
if (DOMAIN && CLIENT_ID && CLIENT_SECRET) {
  passport.use(
    new Auth0Strategy(
      {
        domain: DOMAIN,
        clientID: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        callbackURL: CALLBACK,
      },
      async (accessToken, refreshToken, extraParams, profile, done) => {
        try {
          const data = profile._json || profile;

          // Upsert user in DB
          const user = await User.findOneAndUpdate(
            { oauthId: profile.id, oauthProvider: profile.provider },
            {
              oauthProvider: profile.provider,
              oauthId: profile.id,
              email: data.email || data.email_verified || data.name,
              name: profile.displayName || data.name,
            },
            { upsert: true, new: true, setDefaultsOnInsert: true }
          );

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  // 🔹 Login → redirect to Auth0
  router.get(
    "/login",
    passport.authenticate("auth0", { scope: "openid email profile" })
  );

  // 🔹 Callback → generate JWT
  router.get(
    "/callback",
    passport.authenticate("auth0", { failureRedirect: "/" }),
    (req, res) => {
      const token = jwt.sign(
        { sub: req.user._id.toString(), email: req.user.email },
        process.env.JWT_SECRET || "supersecretjwt",
        { expiresIn: "2h" }
      );

      // 🔥 Instead of setting a session, return JWT for client use
      res.json({ success: true, token });
    }
  );

  // 🔹 Logout (client just deletes token, no session needed)
  router.get("/logout", (req, res) => {
    res.json({ success: true, message: "Client should delete the token" });
  });
} else {
  // Fallback if not configured
  router.get("/login", (req, res) =>
    res.status(500).json({
      success: false,
      message:
        "Auth0 not configured. Set AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET",
    })
  );
}

module.exports = router;
