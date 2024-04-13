const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

const user = require("../models/users_model");

function initialize(passport) {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const search_user = await user.findOne({ username: username });
        if (!search_user) {
          return done(null, false, { message: "Incorrect username" });
        }
        const match = await bcrypt.compare(password, search_user.password);
        if (!match) return done(null, false, { message: "Incorrect password" });

        return done(null, search_user);
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user2 = await user.findById(id);
      done(null, user2);
    } catch (err) {
      done(err);
    }
  });
}

module.exports = initialize;
