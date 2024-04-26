const asyncHandler = require("express-async-handler");
const friends = require("../models/friends_model");

exports.get_all_friends = asyncHandler(async (req, res, next) => {
  const all_friends = await friends.find();
  res.json(all_friends);
});

exports.delte_friend = asyncHandler(async (req, res, next) => {
  const name = req.body.header_name;

  console.log(name);
  const friend_delete = await friends.findOneAndDelete({ name: name });
  await friend_delete.save();
});

exports.add_friend = asyncHandler(async (req, res, next) => {
  const name = req.body.friend_add;
  console.log(name);

  const new_friend = new friends({
    name: name,
    image:
      "https://static.vecteezy.com/system/resources/previews/014/554/760/original/man-profile-negative-photo-anonymous-silhouette-human-head-businessman-worker-support-illustration-vector.jpg",
  });

  new_friend.save();
});
