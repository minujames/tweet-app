const router = require("express").Router();
const passport = require("passport"); 
const usersController = require("../../controllers/usersController");
const tweetsController = require("../../controllers/tweetsController");


router.route("/feed")
  .get(passport.authenticate('jwt', { session: false }), usersController.getFeed);

router.route("/tweet")
  .post(passport.authenticate('jwt', { session: false }), tweetsController.createTweet);

module.exports = router;