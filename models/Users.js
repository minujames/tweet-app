const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UsersSchema = new Schema({
  uuid:{
    type: String,
    required: true,
    unique: true
  },
  userName: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  following: [{
    type: Schema.Types.ObjectId,
    ref: "Users"
  }],
  followers: [{
    type: Schema.Types.ObjectId,
    ref: "Users"
  }]
});

var Users = mongoose.model("Users", UsersSchema);

module.exports = Users;