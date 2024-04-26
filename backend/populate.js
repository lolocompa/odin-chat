const friends = require("./models/friends_model");
const message = require("./models/message_model");
const user = require("./models/users_model");
const conversation = require("./models/conversation_model");

// Import required libraries
const fs = require("fs"); // Node.js file system module

async function createAvatarAndSave() {
  // Dynamically import createAvatar and lorelei
  const { createAvatar } = await import("@dicebear/core");
  const { lorelei } = await import("@dicebear/collection");

  // Create an avatar with the lorelei style
  const avatar = createAvatar(lorelei, {
    seed: "John Doe", // Use the friend's name as seed
  });

  // Convert avatar to SVG string
  const svgString = avatar.toString();

  // Save the SVG to a file (You can also convert to PNG/JPEG if needed)
  fs.writeFileSync("avatar.svg", svgString);
}

const mongoose = require("mongoose");

async function main() {
  await mongoose.connect("mongodb://localhost:27017/message");
  await addItems();
  mongoose.connection.close();
}

async function addItems() {
  const add_friend = new friends({
    name: "Gojo Satoru",
    image:
      "https://wallpapers-clan.com/wp-content/uploads/2022/09/gojo-pfp-17.jpg",
  });

  const add_friend2 = new friends({
    name: "Sukuna",
    image:
      "https://i.pinimg.com/736x/d2/77/54/d27754cbf0bb5c852fccf833d2dee9ca.jpg ",
  });

  const add_friend3 = new friends({
    name: "Walter White",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmLJe5akyjfo_ZiRxmGym0uXemt6FzlZD1zdZQdgovyg&s",
  });

  const add_friend4 = new friends({
    name: "Jesse Pinkman",
    image: "https://avatarfiles.alphacoders.com/167/167062.jpg",
  });

  const add_friend5 = new friends({
    name: "Kratos",
    image:
      "https://i.pinimg.com/474x/61/07/67/610767e002b129169f8e8cba0ab35987.jpg",
  });

  const add_friend6 = new friends({
    name: "Naruto",
    image:
      "https://i.pinimg.com/236x/41/9d/e1/419de13b9028f58dad8bce905ff7477d.jpg",
  });

  const add_friend7 = new friends({
    name: "Jon Snow",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfsGrJtXO4_4tEIFuVFlxlv-vvyMNuPEbqGpS6Mx-ZJQ&s",
  });

  const add_message = new message({
    sender: "Walter White",
    recipient: "lolocomparetto",
    content: "luffy, we need to cook",
  });

  const add_conversatiom = new conversation({
    participants: ["lolocomparetto", "Walter White"],
    messages: [add_message],
  });

  await add_conversatiom.save();
  await add_message.save();
  await add_friend.save();
  await add_friend2.save();
  await add_friend3.save();
  await add_friend4.save();
  await add_friend5.save();
  await add_friend6.save();
  await add_friend7.save();
}

async function startScript() {
  try {
    await createAvatarAndSave();
    await main();
  } catch (error) {
    console.error("Error:", error);
  }
}

startScript();
