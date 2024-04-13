var express = require("express");
var router = express.Router();
const users = require("../models/users_model");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("hi");
});

module.exports = router;
