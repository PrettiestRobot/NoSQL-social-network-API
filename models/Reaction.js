const mongoose = require("mongoose");

const ReactionSchema = new mongoose.Schema(
  {
    reactionId: {
      type: mongoose.Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => {
        // Format the date to mm/dd/yy
        return createdAtVal.toLocaleDateString("en-US", {
          year: "2-digit",
          month: "2-digit",
          day: "2-digit",
        });
      },
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

module.exports = ReactionSchema;
