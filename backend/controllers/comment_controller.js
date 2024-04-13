const asyncHandler = require("express-async-handler");
const comments = require("../models/comments_model");

exports.get_all_comments = asyncHandler(async (req, res, next) => {
  const post_id = req.params.id;
  const all_comments = await comments.find({ post_id: post_id }).populate("author", "username");
  res.json(all_comments);
});

exports.make_comment = asyncHandler(async (req, res, next) => {
  const new_comment = new comments({
    author: req.user.id,
    message: req.body.message,
    post_id: req.params.id,
  });
  await new_comment.save();

  res.json(new_comment);
});

exports.count_comments = asyncHandler(async (req, res, next) => {
  const post_id = req.params.id;
  const all_comments = await comments.find({ post_id: post_id });
  const comment_count = all_comments.length;
  res.json({ count: comment_count });
});
