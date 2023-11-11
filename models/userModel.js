const mongoose = require("mongoose");

const schema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 3,
  },
  email: {
    type: String,
    required: true,
    minLength: 10,
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
  },
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  mobile: {
    type: Number,
    minLength: 10,
  },
  address: {
    type: String,
  },
  bio: {
    type: String,
    validate: {
      validator: function (value) {
        // Custom validator function to count words
        const wordCount = value.split(/\s+/).length;
        return wordCount <= 50;
      },
      message: "Bio should have a maximum of 50 words.",
    },
  },

  interest: {
    type: [String],
  },
  pic: {
    type: String,
    default: "",
  },
});

const User = mongoose.model("User", schema);

module.exports = User;
