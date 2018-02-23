const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var FeedSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true
  },
  feed: [{
    type: Schema.Types.ObjectId,
    ref: "Tweets"
  }],
  dateUpdated: {
    type: Date,
    default: Date.now
  }
});

var Feed = mongoose.model("Feed", FeedSchema);

module.exports = Feed;
