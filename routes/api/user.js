const router = require("express").Router();
var passport = require("passport"); 
// const usersController = require("../../controllers/usersController");

router.get("/feed", passport.authenticate('jwt', { session: false }), function(req, res){
  res.json({
    1: "tweet-1",
    2: "tweet-2",
    3: "tweet-3"
  });
});

module.exports = router;