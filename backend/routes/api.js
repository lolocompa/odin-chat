var express = require("express");
var router = express.Router();
const friends_controller = require("../controllers/friends_controller");
const users_controller = require("../controllers/users_controller");
const conversation_controller = require("../controllers/conversation_controller");
const message_controller = require("../controllers/message_controller");

// authentication routes
router.post("/sign-up", users_controller.sign_up);

router.post("/login", users_controller.login);

router.get("/is_auth", users_controller.is_auth);

router.delete("/logout", users_controller.logout);

// friends routes
router.get("/get_all_friends", friends_controller.get_all_friends);

router.delete("/delete_friend", friends_controller.delte_friend);

router.post("/add_friend", friends_controller.add_friend);

// conversation routes
router.post("/get_conversation", conversation_controller.get_conversation);

// message routes
router.post("/send_message", message_controller.send_message);

module.exports = router;
