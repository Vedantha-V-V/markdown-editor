const express = require('express');
const app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// public folder to store assets
app.use(express.static(__dirname + '/public'));

// routes for app
app.get('/', function(req, res) {
  res.render('home');
});

app.get('/:id', function(req, res) {
  res.render('pad');
});

// get sharejs dependencies
const share = require('share');
const redis = require('redis');

// Create Redis client and connect
const redisClient = redis.createClient({
  url: process.env.REDISTOGO_URL || 'redis://localhost:6379'
});

redisClient.connect().then(() => {
  console.log('Redis client connected');

  const options = {
    db: { type: 'redis', client: redisClient }
  };

  // Attach to Express server (assuming you have app defined)
  share.server.attach(app, options);
}).catch(err => {
  console.error('Failed to connect to Redis:', err);
});


// listen on port 8000 (for localhost) or the port defined for heroku
var port = process.env.PORT || 8000;
app.listen(port);