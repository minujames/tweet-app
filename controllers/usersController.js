const db = require("../models");

module.exports = {

  getFeed: function(req, res) {
    console.log('get feed', req.user.id)
    db.Feed
    .find({"userId": req.user._id})
    .populate("feed")
    .then(userFeed => {
      console.log(userFeed[0].feed.length, userFeed[0].feed.slice(-100).length);
      res.json(userFeed[0].feed.slice(-100));
    })
    .catch(err => res.status(422).json(err));
  }
};