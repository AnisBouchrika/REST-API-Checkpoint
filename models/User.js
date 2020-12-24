const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
last_name: {
    type: String,
    required: true,

    },
  first_name: {
    type: String,
    required: true,
  },
 
  email: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);