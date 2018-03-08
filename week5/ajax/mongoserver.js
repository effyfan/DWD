var express = require('express');
var app = express();
var mongojs = require('mongojs');
var config = require('./config.js');

var db = mongojs(mongojs(config.username+":"+config.password+"@ds225078.mlab.com:25078/pratice0216", ["test1"]));

app.set('view engine', 'ejs');


app.get('/weather', function (req, res) {
  let clientName = req.query.textfield;
  let clientCity = req.query.city;
  let currentTemp = req.query.temp;
  let data = {name: clientName, city: clientCity, temp: currentTemp}
  // push data to database!
  db.submissions.save(data, function(err, saved) {
    if( err || !saved ) console.log("Not saved");
    else console.log("Saved");
  });

app.get('/see', function (req, res) {
    db.submissions.find({}, function(err, saved) {
    if (err || !saved) {
    	console.log("No results");
    } else {
      res.render("results.ejs", {"data": saved});
    }
  });
});

  res.render("page1.ejs", data);
});


app.use(express.static('public'));

app.listen(9090, function () {
  console.log('Example app listening on port 9090!');
});



// How to push temp to mongoDB?
// How to connect result.main.temp to req.query.temp?
