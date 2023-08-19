const { Thought, User } = require("../models");

module.exports = {
  //Thought Controllers:
  // Get all thoughts
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Get all thoughts by user id
  async getThoughtsByUserId(req, res) {
    try {
      const thoughts = await Thought.find({ userId: req.params.userId });
      res.json(thoughts);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Get one thought by user id
  async getOneThoughtByUserId(req, res) {
    try {
      const thought = await Thought.findOne({ userId: req.params.userId });
      if (!thought) {
        res
          .status(404)
          .json({ message: "No thought found with this user id!" });
        return;
      }
      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Add new thought
  async addNewThought(req, res) {
    try {
      const thought = await Thought.create(req.body);

      // Find the associated User document using the userId from the newly created thought document
      const user = await User.findById(thought.userId);
      if (!user) {
        res
          .status(404)
          .json({ message: "No user found associated with this thought!" });
        return;
      }

      // Push the _id of the new thought to the thoughts array in the User document
      user.thoughts.push(thought._id);
      await user.save();

      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Edit thought by id
  async editThoughtById(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!thought) {
        res.status(404).json({ message: "No thought found with this id!" });
        return;
      }
      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Delete thought by id
  async deleteThoughtById(req, res) {
    try {
      // Find the thought to get the associated userId before deletion
      const thought = await Thought.findById(req.params.id);
      if (!thought) {
        res.status(404).json({ message: "No thought found with this id!" });
        return;
      }

      // Delete the thought
      await Thought.findByIdAndDelete(req.params.id);

      // Find the associated User document using the userId from the deleted thought document
      const user = await User.findById(thought.userId);
      if (user) {
        // Remove the reference of this thought from the thoughts array in the User document
        user.thoughts = user.thoughts.filter(
          (thoughtId) => thoughtId.toString() !== req.params.id
        );
        await user.save();
      }

      res.json({ message: "Thought deleted successfully!" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  //Reaction Controllers:
  // Add reaction to a thought
  async addReaction(req, res) {
    try {
      // Find the thought by id and push the new reaction to its reactions array
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $push: { reactions: req.body } },
        { new: true, runValidators: true }
      );
      if (!thought) {
        res.status(404).json({ message: "No thought found with this id!" });
        return;
      }
      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Get all reactions by thought id
  async getReactionsByThoughtId(req, res) {
    try {
      // Find the thought by id and retrieve its reactions array
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) {
        res.status(404).json({ message: "No thought found with this id!" });
        return;
      }
      res.json(thought.reactions);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Delete reaction from a thought
  async deleteReaction(req, res) {
    try {
      // Find the thought by id and pull the reaction from its reactions array based on the reaction’s _id
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $pull: { reactions: { _id: req.params.reactionId } } },
        { new: true }
      );
      if (!thought) {
        res.status(404).json({ message: "No thought found with this id!" });
        return;
      }
      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
