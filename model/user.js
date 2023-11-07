const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },

  gender: {
    type: String,
    
  },
  religion: {
    type: String,
  },
  profession: {
    type: String,
  },
  place: {
    type: String,
  },
  interests: {
    type: [String],
  },
  about: {
    type: String,
  },
});

module.exports = mongoose.model("users", userSchema);
