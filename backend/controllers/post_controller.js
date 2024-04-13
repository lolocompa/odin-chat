const asyncHandler = require("express-async-handler");
const posts = require("../models/post_model");

exports.get_all_posts = asyncHandler(async (req, res, next) => {
  const all_posts = await posts.find({}).populate("author", "username");
  res.json(all_posts);
});

exports.get_one_post = asyncHandler(async (req, res, next) => {
  const post_id = req.params.id;
  const single_post = await posts.findById(post_id).populate("author", "username");
  res.json(single_post)
});

exports.delete_one_post = asyncHandler(async (req, res, next) => {
  const post_id = req.params.id;
  await posts.findByIdAndDelete(post_id);
  return res.status(200).json({ message: "Post deleted successfully" });
});


exports.create_post = asyncHandler(async (req, res, next) => { 
    const new_post = new posts({
        author: req.user.id,
        title: req.body.title,
        content: req.body.content
    })
    await new_post.save()

    res.json(new_post);
})
