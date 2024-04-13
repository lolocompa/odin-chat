const asyncHandler = require("express-async-handler");
const user = require("../models/users_model");
const bcrypt = require("bcryptjs");
const passport = require("passport");

exports.sign_up = asyncHandler(async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const hashed_password = await bcrypt.hash(password, 10);

  const is_username = await user.find({ username: username });
  if (is_username.length > 0) {
    console.log("error fond")
    return res.status(400).json({ message: "Username already exists" });
  }

  const added_user = new user({
    username: username,
    password: hashed_password,
  });

  const result = await added_user.save();
  console.log("user")
  return res.status(200).json({ message: "User added correctly" });
});

exports.login = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
});

exports.is_auth = asyncHandler(async (req, res, next) => { 
  if( req.user ) {
    res.json(req.user)
  } else {
    return res.status(404)
  }
})


exports.logout = asyncHandler(async (req, res, next) => { 
  req.logout((err) => {
    if (err) {
      return next(err); // Pass any error to the error handling middleware
    }
    res.sendStatus(200); // Send a success response
  });
});
