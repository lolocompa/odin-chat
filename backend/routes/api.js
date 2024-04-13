var express = require("express");
var router = express.Router();
const users_controller = require("../controllers/users_controller");
const posts_controller = require("../controllers/post_controller");
const comments_controller = require("../controllers/comment_controller");

/* USER ROUTES */
router.post("/sign-up", users_controller.sign_up);

router.post("/login", users_controller.login);

router.get("/is_auth", users_controller.is_auth);

router.delete("/logout", users_controller.logout)


/* POSTS ROUTES */
router.get("/get_all_posts", posts_controller.get_all_posts);

router.post("/create_post", posts_controller.create_post);

router.delete("/delete_post/:id", posts_controller.delete_one_post);

router.get("/get_one_post/:id", posts_controller.get_one_post);


/* COMMENTS ROUTES */
router.get("/get_all_comments/:id", comments_controller.get_all_comments)

router.post("/make_comment/:id", comments_controller.make_comment)

router.get("/count_comments/:id", comments_controller.count_comments)



module.exports = router;
