// 'use strict'
var express = require('express');
var request = require('request');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({
  extended: true
});
app.use(urlencodedParser);


var mongojs = require('mongojs');
var config = require('./config.js');

var db = mongojs(mongojs(config.username + ":" + config.password + "@ds225078.mlab.com:25078/pratice0216", ["test1"]));

app.set('view engine', 'ejs');

var scores = [];
app.post('/weather', function(req, res) {
  var clientName = req.body.textfield;
  var clientCity = req.body.city;
  var clientMood = Number(req.body.score);

  scores.push(clientMood);
  var sum = 0;
  for (var i = 0; i < scores.length; i++) {
    sum += scores[i];
  }
  var averageValue = (sum / scores.length);

  request('http://api.openweathermap.org/data/2.5/weather?q=' + clientCity + '&appid=f2d43e6c463d6cb45ded587e92dcf0ad&units=metric', function(error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.


    if (response.statusCode == 200) {
      // worked
      var currentTemp = JSON.parse(body).main.temp;
      /////?????not reading it???
      var currentCondition = JSON.parse(body).weather.main;
      console.log(currentTemp);
      console.log(currentCondition);
      var data = {
        name: clientName,
        city: clientCity,
        con: currentCondition,
        temp: currentTemp,
        mood: clientMood,
        ave: averageValue
      }

      //////////////save data
      db.submissions.save(data, function(err, saved) {
        if (err || !saved) console.log("Not saved");
        else console.log("Saved");
      });
      res.render("page1.ejs", data);
      console.log("average score is" + averageValue);

    } else {
      // didnt work
    }
  });
});

//////////////display all data
app.get('/see', function(req, res) {
  db.submissions.find({}, function(err, saved) {
    if (err || !saved) {
      console.log("No results");
    } else {
      res.render("results.ejs", {
        "data": saved
      });
    }
  });
});

///////////////display all data sort by name
app.get('/sort', function(req, res) {
  db.submissions.find().sort({name: 1}, function(err, saved) {
    if (err || !saved) {
      console.log("No results");
    } else {
      res.render("sort.ejs", {
        "data": saved
      });
    }
  });
});

///////////////search for data with name Leon
app.get('/search', function(req, res) {
  db.mycollection.find({"name":"Leon"}, function(err, saved) {
  if( err || !saved) console.log("No results");
  else saved.forEach( function(record) {
    res.send(record);
  } );
});
});


app.use(express.static('public'));

app.listen(8000, function() {
  console.log('Example app listening on port 8000!');
});


// How to search for data?
// How to delete data?
