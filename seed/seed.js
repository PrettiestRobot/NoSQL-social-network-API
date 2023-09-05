const { Thought, User } = require("../models");
const connection = require("../config/connection");

connection.on("error", (err) => console.error(err));

const usersData = [
  { username: "Alice123", email: "alice123@googles.com" },
  { username: "Bob456", email: "bob456@example.com" },
  { username: "Charlie789", email: "charlie789@example.com" },
];

const thoughtsData = [
  {
    thoughtText: "This is Alice's first thought!",
    username: "Alice123",
    reactions: [
      { reactionBody: "Great thought, Alice!", username: "Bob456" },
      { reactionBody: "I agree with Bob!", username: "Charlie789" },
      { reactionBody: "Thanks, both of you!", username: "Alice123" },
    ],
  },
  {
    thoughtText: "Bob's musings on a sunny day.",
    username: "Bob456",
    reactions: [
      { reactionBody: "Sunny days are the best.", username: "Charlie789" },
      { reactionBody: "Totally agree with you, Bob.", username: "Alice123" },
      { reactionBody: "Thanks, Alice and Charlie!", username: "Bob456" },
    ],
  },
  {
    thoughtText: "Charlie's reflections on the rainy evening.",
    username: "Charlie789",
    reactions: [
      { reactionBody: "Rain has its own beauty.", username: "Alice123" },
      { reactionBody: "Indeed, it's so calming.", username: "Bob456" },
      { reactionBody: "Glad you both feel the same.", username: "Charlie789" },
    ],
  },
];

connection.once("open", async () => {
  try {
    await User.deleteMany({});
    await Thought.deleteMany({});

    const users = await User.create(usersData);

    // Assigning userIds to the thoughts based on the created users
    thoughtsData[0].userId = users[0]._id; // Alice's thought
    thoughtsData[1].userId = users[1]._id; // Bob's thought
    thoughtsData[2].userId = users[2]._id; // Charlie's thought

    const thoughts = await Thought.insertMany(thoughtsData);

    // Adding friends and pushing thoughts to user's thoughts array
    await User.findByIdAndUpdate(users[0]._id, {
      $push: { friends: users[1]._id, thoughts: thoughts[0]._id },
    });
    await User.findByIdAndUpdate(users[1]._id, {
      $push: { friends: users[2]._id, thoughts: thoughts[1]._id },
    });
    await User.findByIdAndUpdate(users[2]._id, {
      $push: { friends: users[0]._id, thoughts: thoughts[2]._id },
    });

    console.log("Seeding completed!");
    process.exit(0);
  } catch (error) {
    console.warn(error);
    process.exit(1);
  }
});
