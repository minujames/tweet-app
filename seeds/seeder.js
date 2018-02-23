const seeder = require('mongoose-seed');
const mongoose = require("mongoose");
const _ = require("lodash");

const users = require("./../config/users")

seeder.connect(process.env.MONGODB_URI || "mongodb://localhost/intweet_db", function() {

  // Load Mongoose models
  seeder.loadModels([
    '../models/Users.js',
    '../models/Tweets.js',
    '../models/Feed.js'
  ]);
 
  // Clear specified collections
  seeder.clearModels(['Feed', 'Tweets', 'Users'], function() {
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function() {
      // console.log(data[0].documents);
      seeder.disconnect();
    });
  });
});

const user_id_minu = new mongoose.Types.ObjectId();
const user_id_jay = new mongoose.Types.ObjectId();
const user_id_jack = new mongoose.Types.ObjectId();
const user_id_jill = new mongoose.Types.ObjectId();
const user_id_nidhi = new mongoose.Types.ObjectId();

var usersData = {
  'model': 'Users',
  'documents': [
    {
      '_id': user_id_minu,
      'uuid': users[_.findIndex(users, {name: "minu"})].id,
      'userName': 'minu',
      'firstName': 'Minu',
      'lastName': 'James',
      'followers': [user_id_jay, user_id_nidhi],
      'following': [user_id_jack, user_id_jill, user_id_jay, user_id_nidhi]
    },
    {
      '_id': user_id_jay,
      'uuid': users[_.findIndex(users, {name: "jay"})].id,
      'userName': 'jay',
      'firstName': 'Jay',
      'lastName': 'Santhan',
      'followers': [user_id_minu, user_id_nidhi],
      'following': [user_id_jack, user_id_jill, user_id_minu]
    },
    {
      '_id': user_id_nidhi,
      'uuid': users[_.findIndex(users, {name: "nidhi"})].id,
      'userName': 'nidhi',
      'firstName': 'Nidhi',
      'lastName': 'Rose',
      'followers': [user_id_minu],
      'following': [user_id_minu, user_id_jay]
    },
    {
      '_id': user_id_jack,
      'uuid': users[_.findIndex(users, {name: "jack"})].id,
      'userName': 'jack',
      'firstName': 'Jack',
      'lastName': 'Smith',
      'followers': [user_id_minu, user_id_jay],
      'following': [user_id_jill]
    },
    {
      '_id': user_id_jill,
      'uuid': users[_.findIndex(users, {name: "jill"})].id,
      'userName': 'jill',
      'firstName': 'Jill',
      'lastName': 'Tom',
      'followers': [user_id_minu, user_id_jay, user_id_jack],
      'following': []
    }
  ]
};

const minus_tweets = [];
const jays_tweets = [];
const nidhis_tweets = [];
const jacks_tweets = [];
const jills_tweets = [];


for(let i = 0; i < 25; i++){
  let obj = {};
  obj.userId = user_id_minu;
  obj._id = new mongoose.Types.ObjectId();
  obj.tweet = `Minu's tweet - ${i+1}`;
  minus_tweets.push(obj);
}

for(let i=0; i< 25; i++){
  let obj = {};
  obj.userId = user_id_jay;
  obj._id = new mongoose.Types.ObjectId();
  obj.tweet = `jay's tweet - ${i+1}`;
  jays_tweets.push(obj);
}

for(let i=0; i< 25; i++){
  let obj = {};
  obj.userId = user_id_nidhi;
  obj._id = new mongoose.Types.ObjectId();
  obj.tweet = `Nidhi's tweet - ${i+1}`;
  nidhis_tweets.push(obj);
}

for(let i=0; i< 25; i++){
  let obj = {};
  obj.userId = user_id_jack;
  obj._id = new mongoose.Types.ObjectId();
  obj.tweet = `Jacks's tweet - ${i+1}`;
  jacks_tweets.push(obj);
}

for(let i=0; i< 25; i++){
  let obj = {};
  obj.userId = user_id_jill;
  obj._id = new mongoose.Types.ObjectId();
  obj.tweet = `Jill's tweet - ${i+1}`;
  jills_tweets.push(obj);
}

const tweets = [];
tweets.push(minus_tweets);
tweets.push(jays_tweets);
tweets.push(nidhis_tweets);
tweets.push(jacks_tweets);
tweets.push(jills_tweets);

var tweetsData = {
  model: 'Tweets',
  documents: tweets
}

// jay is following minu, nidhi, jack and jill
const jaysFeed = minus_tweets.map(tweet => tweet._id);

nidhis_tweets.map(tweet => {
  jaysFeed.push(tweet._id);
});

jacks_tweets.map(tweet => {
  jaysFeed.push(tweet._id);
});

jills_tweets.map(tweet => {
  jaysFeed.push(tweet._id);
});

console.log(jaysFeed.length);


// minu is following jack and jill
const minusFeed = jacks_tweets.map(tweet => tweet._id);
jills_tweets.map(tweet => {
  minusFeed.push(tweet._id);
});
console.log(minusFeed.length);

//nidhi is following minu and jay
const nidhisFeed = minus_tweets.map(tweet => tweet._id);
jays_tweets.map(tweet => {
  nidhisFeed.push(tweet._id);
});
console.log(nidhisFeed.length);


// jack is following jill
const jacksFeed = jills_tweets.map(tweet => tweet._id);
console.log(jacksFeed.length);

//jill is following jack
const jillsFeed = jacks_tweets.map(tweet => tweet._id);
console.log(jillsFeed.length);

var feedData = {
  model: 'Feed',
  documents: [
    {
      userId: user_id_minu,
      feed: minusFeed
    },
    {
      userId: user_id_jay,
      feed: jaysFeed
    },
    {
      userId: user_id_nidhi,
      feed: nidhisFeed
    },
    {
      userId: user_id_jack,
      feed: jacksFeed
    },
    {
      userId: user_id_jill,
      feed: jillsFeed
    }
  ]
};

var data = [ usersData, tweetsData, feedData];



