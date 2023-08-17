const { Schema, model } = require("mongoose");

//Schema to create User model
const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: "Username is required",
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: "Email is required",
    match: [/.+@.+\..+/], 'Must be valid email address!'',
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Thought",
    },
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
},
    {
        toJSON: {
            virtuals: true,
        },
});

UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model("User", userSchema);

module.exports = User;