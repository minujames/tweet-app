const _ = require("lodash");
const jwt = require('jsonwebtoken');
const passport = require("passport");
const passportJWT = require("passport-jwt");

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const keys = require("./../config/keys");
const users = require("./../config/users");

const db = require("../models");

const jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
jwtOptions.secretOrKey = keys.jwtSecret;

const strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  // should be a database call
  console.log(jwt_payload.id);
  db.Users
    .findById(jwt_payload.id)
    .then(appUser => {
      console.log(appUser);
      if (appUser) {
        next(null, appUser);
      } else {
        next(null, false);
      }
    })
    .catch(err => next(null, false));
});

passport.use(strategy);

module.exports = {
  login: function(req, res){
    let user;

    if(req.body.username && req.body.password){

      //mocking ldap with local object
      user = users[_.findIndex(users, {name: req.body.username})];
      if( !user ){
        res.status(401).json({message:"no such user found"});
      }

      if(user.password === req.body.password) {   
        db.Users
        .findOne({uuid: user.id})
        .then(appUser => {
          if(!appUser){
             appUser = db.Users
            .create({
              uuid: user.id, 
              userName: user.name
            })
          }
          return appUser;
        })
        .then(appUser =>{
          db.Feed
          .findOne({userId: appUser.id})
          .then(feed => {
            if(!feed){
              db.Feed
              .create({
                userId: appUser._id
              })
            }
          })
          return appUser;
        })
        .then(appUser => {
          const payload = {
            id: appUser.id
          };
          const token = jwt.sign(payload, jwtOptions.secretOrKey, { expiresIn: 60 * 60 });
          res.json({message: "ok",
            username: appUser.userName,
            token: 'JWT ' + token
          });
        })
        .catch(err => res.status(422).json(err));

      } else {
        res.status(401).json({message:"passwords did not match"});
      }
    }
    else{
      res.status(401).json({message: "Username or password is missing"});
    }
  }
};
