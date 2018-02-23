const router = require("express").Router();
// const usersController = require("../../controllers/usersController");
const _ = require("lodash");

const jwt = require('jsonwebtoken');
const passport = require("passport");
const passportJWT = require("passport-jwt");

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const keys = require("./../../config/keys");
const users = require("./../../seeds/users");

const jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
jwtOptions.secretOrKey = keys.jwtSecret;

const strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
  // usually this would be a database call:
  const user = users[_.findIndex(users, {id: jwt_payload.id})];
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});

passport.use(strategy);

router.route('/login')
 .post(function(req, res) {

  let user;

  if(req.body.name && req.body.password){

    user = users[_.findIndex(users, {name: req.body.name})];
    if( !user ){
      res.status(401).json({message:"no such user found"});
    }
  }

  if(user.password === req.body.password) {
    const payload = {
      id: user.id
    };
    const token = jwt.sign(payload, jwtOptions.secretOrKey, { expiresIn: 60 });
    res.json({message: "ok",
      username: user.name,
      token: 'JWT ' + token});
  } else {
    res.status(401).json({message:"passwords did not match"});
  }
});

module.exports = router;
