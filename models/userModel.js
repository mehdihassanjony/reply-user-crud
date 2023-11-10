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
  pic: {
    type: String,
    default: "",
  },
});

const User = mongoose.model("User", schema);

module.exports = User;
