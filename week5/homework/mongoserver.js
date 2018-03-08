var express = require('express');
var request = require('request');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true }); // for parsing form data
app.use(urlencodedParser);


var mongojs = require('mongojs');
var config = require('./config.js');

var db = mongojs(mongojs(config.username + ":" + config.password + "@ds225078.mlab.com:25078/pratice0216", ["test1"]));

app.set('view engine', 'ejs');


app.get('/weather', function(req, res) {
  let clientName = req.query.textfield;
  let clientCity = req.query.city;

  request('http://api.openweathermap.org/data/2.5/weather?q=' + req.query.city + '&appid=f2d43e6c463d6cb45ded587e92dcf0ad&units=metric', function(error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.


    if (response.statusCode == 200) {
      // worked
      let currentTemp = JSON.parse(body).main.temp;
      let data = {
        name: clientName,
        city: clientCity,
        temp: currentTemp
      }
      db.submissions.save(data, function(err, saved) {
        if (err || !saved) console.log("Not saved");
        else console.log("Saved");
      });
      res.render("page1.ejs", data);

    } else {
      // didnt work
    }
  });

  // let clientName = req.query.textfield;
  // let clientCity = req.query.city;
  // let currentTemp = req.query.temp;
  // let data = {name: clientName, city: clientCity, temp: currentTemp}
  // // push data to database!
  // db.submissions.save(data, function(err, saved) {
  //   if( err || !saved ) console.log("Not saved");
  //   else console.log("Saved");
  // });
  // res.render("page1.ejs", data);
});

app.get('/see', function(req, res) {
  db.submissions.find({}, function(err, saved) {
    if (err || !saved) {
      console.log("No results");
    } else {
      res.render("results.ejs", {
        "data": saved
      });
      // res.send(saved);
    }
  });

});

////////////body-parser/////////////////
var scores = [];

app.post('/formpost', function(req, res) {
  var textvalue = Number(req.body.score);
  scores.push(textvalue);
  var sum = 0;
  for (var i = 0; i < scores.length; i++) {
    sum += scores[i];
  }
  var averageValue = (sum / scores.length);

  console.log("They submitted: " + textvalue);
  res.send("You submitted: " + textvalue + ",   " + "The average score is: " + averageValue);
});

app.use(express.static('public'));

app.listen(9090, function() {
  console.log('Example app listening on port 9090!');
});



// How to push temp to mongoDB?
// How to connect result.main.temp to req.query.temp?
