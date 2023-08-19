const { User } = require("../models");

module.exports = {
  // Add another user as a friend to the current user's friend list
  async addFriend(req, res) {
    try {
      // Find the current user by userId and push the friendId to its friends array
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $push: { friends: req.params.friendId } },
        { new: true, runValidators: true }
      );
      if (!user) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }
      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Remove a user from another user's friend list
  async deleteFriend(req, res) {
    try {
      // Find the user by id and pull the friend from its friends array based on the friend’s _id
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      if (!user) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }
      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
