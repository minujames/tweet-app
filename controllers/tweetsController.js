const db = require("../models");
var mongoose = require('mongoose');

module.exports = {
  createTweet: function(req, res) {
    db.Tweets
    .create({tweet: req.body.tweet, userId: req.user._id})
    .then(tweet => {
      let bulk = db.Feed.collection.initializeOrderedBulkOp({useLegacyOps: true});
      bulk.find( { userId: {$in : req.user.followers}}).update({$addToSet: {"feed": tweet._id}});
      bulk.find( { userId: req.user._id } ).update({$addToSet: {"feed": tweet._id}});
      return bulk.execute();
    })
    .then(feed => {
      res.json(feed);
    })
    .catch(err => res.status(422).json(err));
  }
};