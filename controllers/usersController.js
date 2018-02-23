const db = require("../models");

module.exports = {

  getFeed: function(req, res) {
    console.log('get feed', req.user.id)
    db.Feed
    .find({"userId": req.user._id})
    .populate("feed")
    .then(userFeed => {
      res.json({feed: feed.slice(-100)});
    })
    .catch(err => res.status(422).json(err));
  }
};