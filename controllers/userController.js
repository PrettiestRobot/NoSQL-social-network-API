const { User, Thought } = require("../models");

module.exports = {
  // GET all users
  async getAllUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  //get one user by _id and populate thought and friend data
  async getUserById(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id });
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
  //POST new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  //PUT too update user by its _id
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userID },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!user) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //DELETE to remove user by its _id and associate thoughts when deleted
  async deleteUser(req, res) {
    try {
      // Find the user by its _id
      const user = await User.findOne({ _id: req.params.id });
      if (!user) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }

      // Delete all thoughts associated with this user
      await Thought.deleteMany({ userId: user._id });

      // Delete the user
      await User.deleteOne({ _id: req.params.id });

      res.json({ message: "User and associated thoughts have been deleted." });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
