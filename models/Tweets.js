const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var TweetsSchema = new Schema({
  tweet: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  dateUpdated: {
    type: Date,
    default: Date.now
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: "Comments" 
  }],
  likes: [{
    type: Schema.Types.ObjectId,
    ref: "Users"
  }]
});

var Tweets = mongoose.model("Tweets", TweetsSchema);

module.exports = Tweets;