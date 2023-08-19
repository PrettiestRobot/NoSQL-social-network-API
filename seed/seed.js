
const User = require('./models/User');
const Thought = require('./models/Thought');

const usersData = [{'username': 'Alice123', 'email': 'alice123@example.com'}, {'username': 'Bob456', 'email': 'bob456@example.com'}, {'username': 'Charlie789', 'email': 'charlie789@example.com'}];
const thoughtsData = [{'thoughtText': "This is Alice's first thought!", 'username': 'Alice123', 'reactions': [{'reactionBody': 'Great thought, Alice!', 'username': 'Bob456'}, {'reactionBody': 'I agree with Bob!', 'username': 'Charlie789'}, {'reactionBody': 'Thanks, both of you!', 'username': 'Alice123'}]}, {'thoughtText': "Bob's musings on a sunny day.", 'username': 'Bob456', 'reactions': [{'reactionBody': 'Sunny days are the best.', 'username': 'Charlie789'}, {'reactionBody': 'Totally agree with you, Bob.', 'username': 'Alice123'}, {'reactionBody': 'Thanks, Alice and Charlie!', 'username': 'Bob456'}]}, {'thoughtText': "Charlie's reflections on the rainy evening.", 'username': 'Charlie789', 'reactions': [{'reactionBody': 'Rain has its own beauty.', 'username': 'Alice123'}, {'reactionBody': "Indeed, it's so calming.", 'username': 'Bob456'}, {'reactionBody': 'Glad you both feel the same.', 'username': 'Charlie789'}]}];

const seedDatabase = async () => {
    await User.deleteMany({});
    await Thought.deleteMany({});

    const users = await User.create(usersData);

    // Assign friends based on the relationships defined above
    const alice = users.find(user => user.username === 'Alice123');
    const bob = users.find(user => user.username === 'Bob456');
    const charlie = users.find(user => user.username === 'Charlie789');

    alice.friends.push(bob._id, charlie._id);
    bob.friends.push(alice._id);
    charlie.friends.push(alice._id);

    await alice.save();
    await bob.save();
    await charlie.save();

    await Thought.create(thoughtsData);

    console.log('Database seeded with friends!');
    process.exit(0);
};

seedDatabase();
